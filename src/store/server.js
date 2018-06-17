const { evaluate, callFunctionOn, addEventListener } = require('../utils');
const { STORE_NAME, SET_PLUGIN_EVENT } = require('./shared');

const getElectronStore = Protocol =>
  evaluate(Protocol)(
    (storeName, requirePath) => {
      const Store = require(requirePath);
      const store = new Store({
        name: storeName,
      });

      return store;
    },
    STORE_NAME,
    require.resolve('electron-store')
  );

function getStore() {
  return JSON.stringify(this.store);
}

function setStore(nextStore) {
  return this.set(JSON.parse(nextStore));
}

exports.injectPlugins = async (remoteProtocol, clientProtocol) => {
  const { result: remoteStore } = await getElectronStore(remoteProtocol);

  const store =
    JSON.parse(
      (await callFunctionOn(remoteProtocol)(remoteStore, getStore)).result.value
    ) || {};

  await evaluate(clientProtocol)(
    (storeName, storeValueString) => {
      window[storeName] = JSON.parse(storeValueString);
    },
    STORE_NAME,
    JSON.stringify(store)
  );

  await addEventListener(clientProtocol)(SET_PLUGIN_EVENT, plugins => {
    const nextStore = { plugins };
    callFunctionOn(remoteProtocol)(remoteStore, setStore, nextStore);
  });
};
