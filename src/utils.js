const REFINED_SLACK_PROTOCOL = '__REFINED_SLACK_PROTOCOL__';

exports.waitForApp = (reachApp, timeout = 20000) =>
  new Promise((resolve, reject) => {
    const recursiveWait = () => {
      setTimeout(async () => {
        try {
          const result = await reachApp();

          resolve(result);
        } catch (err) {
          recursiveWait();
        }
      }, 1000);
    };

    setTimeout(reject, timeout);

    recursiveWait();
  }).then(async Protocol => {
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

    return Protocol;
  });

exports.evaluate = Protocol => (fn, ...args) =>
  Protocol.Runtime.evaluate({
    expression: `(async () => await (${fn.toString()})(${args
      .map(JSON.stringify)
      .join(',')}))()`,
    includeCommandLineAPI: true,
    awaitPromise: true,
  });

exports.addEventListener = Protocol => (eventName, listener) => {
  Protocol.Runtime.consoleAPICalled(({ type, args }) => {
    if (
      type === 'debug' &&
      args[0].value === REFINED_SLACK_PROTOCOL &&
      args[1].value === eventName
    ) {
      listener(...args.slice(2).map(arg => JSON.parse(arg.value)));
    }
  });

  Protocol.Runtime.evaluate({
    expression: `window.RSDispatchEvent = (eventName, ...args) => console.debug(${JSON.stringify(
      REFINED_SLACK_PROTOCOL
    )}, eventName, ...args.map(JSON.stringify))`,
  });
};

exports.callFunctionOn = Protocol => (remoteObject, fn, ...args) =>
  Protocol.Runtime.callFunctionOn({
    objectId: remoteObject.objectId,
    functionDeclaration: fn.toString(),
    arguments: args.map(value => ({ value: JSON.stringify(value) })),
    returnByValue: true,
  });
