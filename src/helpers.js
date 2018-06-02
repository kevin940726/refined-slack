const REFINED_SLACK_PROTOCOL = '__REFINED_SLACK_PROTOCOL__';

export const createEvaluate = Protocol => (fn, ...args) =>
  Protocol.Runtime.evaluate({
    expression: `(async () => await (${fn.toString()})(${args
      .map(JSON.stringify)
      .join(',')}))()`,
    includeCommandLineAPI: true,
    returnByValue: true,
    awaitPromise: true,
  });

export const createAddScriptToEvaluateOnNewDocument = Protocol => (
  fn,
  ...args
) => {
  Protocol.Page.addScriptToEvaluateOnNewDocument({
    source: `window.addEventListener('load', () => (${fn.toString()})(${args
      .map(JSON.stringify)
      .join(',')}))`,
  });
};

export const createAddEventListener = Protocol => (eventName, listener) => {
  Protocol.Runtime.consoleAPICalled(({ type, args }) => {
    if (
      type === 'debug' &&
      args[0].value === REFINED_SLACK_PROTOCOL &&
      args[1].value === eventName
    ) {
      listener(...args.slice(2).map(arg => JSON.parse(arg.value)));
    }
  });

  Protocol.Page.addScriptToEvaluateOnNewDocument({
    source: `window.RSDispatchEvent = (eventName, ...args) => console.debug(${JSON.stringify(
      REFINED_SLACK_PROTOCOL
    )}, eventName, ...args.map(JSON.stringify))`,
  });
};
