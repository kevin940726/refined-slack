import highlightShy from './plugins/highlightShy';
import takeScreenshot from './plugins/takeScreenshot';
import linkifyJira from './plugins/linkifyJira';
import linkifyGithub from './plugins/linkifyGithub';
import noBackspaceCharacter from './plugins/noBackspaceCharacter';
import { getPlugins, setPlugins } from './store/client';

const defaultPlugins = [
  [
    'highlightShy',
    {
      userID: 'U4VAMTQ5V',
      color: 'orange',
    },
  ],
  'takeScreenshot',
  [
    'linkifyJira',
    {
      host: 'https://17media.atlassian.net/browse/',
    },
  ],
  [
    'linkifyGithub',
    {
      defaultOwner: '17media',
      defaultRepo: '17live',
    },
  ],
  'noBackspaceCharacter',
];

const mapPlugins = pluginName => {
  return {
    highlightShy,
    takeScreenshot,
    linkifyJira,
    linkifyGithub,
    noBackspaceCharacter,
  }[pluginName];
};

(async () => {
  let plugins = await getPlugins();

  if (!plugins || !Object.keys(plugins).length) {
    plugins = defaultPlugins;

    await setPlugins(plugins);
  }

  plugins.forEach(plugin => {
    if (typeof plugin === 'string') {
      return mapPlugins(plugin)();
    }

    const [pluginName, options] = plugin;

    mapPlugins(pluginName)(options);
  });
})();
