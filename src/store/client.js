import { STORE_NAME, setPluginEvent } from './shared';

export const getStore = () => window[STORE_NAME] || {};

export const getPlugins = () => window[STORE_NAME] || {};

export const setPlugins = plugins => {
  setPluginEvent.dispatch(plugins);
  window[STORE_NAME].plugins = plugins;
};
