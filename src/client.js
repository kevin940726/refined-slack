import highlightShy from './plugins/highlightShy';
import takeScreenshot from './plugins/takeScreenshot';
import linkifyJira from './plugins/linkifyJira';
import linkifyGithub from './plugins/linkifyGithub';
import noBackspaceCharacter from './plugins/noBackspaceCharacter';
import sendLinkChat from './plugins/sendLinkChat';
import hideDepartment from './plugins/hideDepartment';

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
  'sendLinkChat',
  'hideDepartment',
];

const mapPlugins = pluginName => {
  return {
    highlightShy,
    takeScreenshot,
    linkifyJira,
    linkifyGithub,
    noBackspaceCharacter,
    sendLinkChat,
    hideDepartment,
  }[pluginName];
};

(async () => {
  // TODO: implement config preference
  const plugins = defaultPlugins;

  plugins.forEach(plugin => {
    if (typeof plugin === 'string') {
      return mapPlugins(plugin)();
    }

    const [pluginName, options] = plugin;

    mapPlugins(pluginName)(options);
  });
})();
