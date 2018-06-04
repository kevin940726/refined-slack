import highlightShy from './plugins/highlightShy';
import takeScreenshot from './plugins/takeScreenshot';
import linkifyJira from './plugins/linkifyJira';
import linkifyGithub from './plugins/linkifyGithub';

const plugins = [highlightShy, takeScreenshot, linkifyJira, linkifyGithub];

plugins.forEach(plugin => plugin());
