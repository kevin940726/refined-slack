import highlightShy from './plugins/highlightShy';
import takeScreenshot from './plugins/takeScreenshot';
import linkifyJira from './plugins/linkifyJira';
import linkifyGithub from './plugins/linkifyGithub';
import noBackspaceCharacter from './plugins/noBackspaceCharacter';

const plugins = [
  highlightShy,
  takeScreenshot,
  linkifyJira,
  linkifyGithub,
  noBackspaceCharacter,
];

plugins.forEach(plugin => plugin());
