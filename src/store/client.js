import { STORE_NAME, SET_PLUGIN_EVENT } from './shared';

export const getPlugins = () => window[STORE_NAME].plugins || [];

export const setPlugins = plugins => {
  window.RSDispatchEvent(SET_PLUGIN_EVENT, plugins);
  window[STORE_NAME].plugins = plugins;
};
