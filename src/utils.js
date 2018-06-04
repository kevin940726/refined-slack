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
  });
