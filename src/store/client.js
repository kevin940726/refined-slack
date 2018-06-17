import { STORE_NAME, setPluginEvent } from './shared';

export const getPlugins = () => window[STORE_NAME].plugins || [];

export const setPlugins = plugins => {
  setPluginEvent.dispatch(plugins);
  window[STORE_NAME].plugins = plugins;
};
