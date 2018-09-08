const appConfig = require('application-config');
const pkg = require('../../package.json');
const { evaluate } = require('../utils');
const { STORE_NAME, setPluginEvent } = require('./shared');

const store = appConfig(pkg.name);

console.log(store.filePath);

async function getStore() {
  return new Promise((resolve, reject) => {
    store.read((err, data) => {
      if (err) {
        return reject(err);
      }

      try {
        resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function setStore(nextStore) {
  return new Promise((resolve, reject) => {
    try {
      store.write(JSON.stringify(nextStore, null, 2), err => {
        if (err) {
          reject(err);
        }

        resolve(nextStore);
      });
    } catch (error) {
      reject(error);
    }
  });
}

exports.injectPlugins = async (remoteProtocol, clientProtocol) => {
  const store = await getStore();

  await evaluate(clientProtocol)(
    (storeName, storeValueString) => {
      window[storeName] = JSON.parse(storeValueString);
    },
    STORE_NAME,
    JSON.stringify(store)
  );

  await setPluginEvent.listen(clientProtocol, async plugins => {
    const currentStore = await getStore();

    return setStore(Object.assign(currentStore, { plugins }));
  });
};
