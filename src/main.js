import opn from 'opn';
import getPort from 'get-port';
import CDP from 'chrome-remote-interface';
import { waitForApp } from './utils';
import {
  createEvaluate,
  createAddScriptToEvaluateOnNewDocument,
  createAddEventListener,
} from './helpers';

import highlightShy from './plugins/highlightShy';
import takeScreenshot from './plugins/takeScreenshot';

const plugins = [highlightShy, takeScreenshot];

(async () => {
  const port = await getPort({ port: 9222 });

  console.log(`Connected to ${port}`);

  await opn('', {
    app: ['Slack 2', `--remote-debugging-port=${port}`],
    wait: false,
  });

  const Protocol = await waitForApp(() => CDP({ port }));

  await Protocol.Runtime.enable();
  await Protocol.Page.enable();

  Protocol.Runtime.consoleAPICalled(({ type, args }) => {
    if (type === 'log') {
      console.log(...args);
    } else if (type === 'error') {
      console.error(...args);
    }
  });

  Protocol.Runtime.exceptionThrown(({ exceptionDetails }) => {
    console.error(exceptionDetails);
  });

  const apis = {
    evaluate: createEvaluate(Protocol),
    addScriptToEvaluateOnNewDocument: createAddScriptToEvaluateOnNewDocument(
      Protocol
    ),
    addEventListener: createAddEventListener(Protocol),
  };

  plugins.forEach(async plugin => {
    await plugin(apis, Protocol);
  });
})();
