// Github
import linkify from '../helpers/linkify';
import { patchSendChat } from '../helpers/patchRequest';

const GITHUB_HOST_URL = 'https://github.com/';
const GITHUB_REGEX = /(?:([\w@-]+)\/)?([\w-]+)?#(\d+)/g;

const DEFAULT_OWNER = '17media';
const DEFAULT_REPO = '17live';

const linkifyGithub = ({
  defaultOwner = DEFAULT_OWNER,
  defaultRepo = DEFAULT_REPO,
}) => {
  linkify(
    GITHUB_REGEX,
    (match, owner = defaultOwner, repo = defaultRepo, issue) =>
      `${GITHUB_HOST_URL}${owner}/${repo}/issues/${issue}`
  );

  patchSendChat(({ data }) => {
    const text = data.get('text');

    const replacedText = text.replace(
      GITHUB_REGEX,
      (match, owner = defaultOwner, repo = defaultRepo, issue) =>
        `<${GITHUB_HOST_URL}${owner}/${repo}/issues/${issue}|${match}>`
    );

    data.set('text', replacedText);
  });
};

export default linkifyGithub;
