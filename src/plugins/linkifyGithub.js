// Github
import linkify from '../helpers/linkify';

const GITHUB_HOST_URL = 'https://github.com/17media/17live/issues/';
const GITHUB_REGEX = /#\d+/g;

const linkifyGithub = linkify(
  GITHUB_REGEX,
  match => `${GITHUB_HOST_URL}${match.slice(1)}`
);

export default linkifyGithub;
