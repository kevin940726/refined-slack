// Github
import linkify from '../helpers/linkify';

const GITHUB_HOST_URL = 'https://github.com/';
const GITHUB_REGEX = /(?:([\w@-]+)\/)?([\w-]+)?#(\d+)/;

const DEFAULT_OWNER = '17media';
const DEFAULT_REPO = '17live';

const linkifyGithub = ({
  defaultOwner = DEFAULT_OWNER,
  defaultRepo = DEFAULT_REPO,
}) =>
  linkify(
    GITHUB_REGEX,
    (match, owner = defaultOwner, repo = defaultRepo, issue) =>
      `${GITHUB_HOST_URL}${owner}/${repo}/issues/${issue}`
  );

export default linkifyGithub;
