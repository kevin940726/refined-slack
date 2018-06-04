const path = require('path');
const fs = require('fs');
const opn = require('opn');
const getPort = require('get-port');
import CDP from 'chrome-remote-interface';
import { waitForApp } from './utils';

import takeScreenshot from './plugins/takeScreenshot/server';

const plugins = [takeScreenshot];

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

  Protocol.Page.domContentEventFired(() => {
    Protocol.Runtime.evaluate({
      expression: fs.readFileSync(
        path.resolve(__dirname, '../build/client.js'),
        'utf8'
      ),
    });
  });

  plugins.forEach(async plugin => {
    await plugin(Protocol);
  });
})();
