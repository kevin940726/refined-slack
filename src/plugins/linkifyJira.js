// Jira
import linkify from '../helpers/linkify';
import { patchSendChat } from '../helpers/patchRequest';

const JIRA_HOST_URL = 'https://17media.atlassian.net/browse/';
const JIRA_REGEX = /(?:APP|PROD|BUG|SRE)-\d+/g;

const linkifyJira = ({ host = JIRA_HOST_URL }) => {
  // linkify(JIRA_REGEX, match => `${host}${match}`);

  patchSendChat(({ data }) => {
    const text = data.get('text');

    const replacedText = text.replace(
      JIRA_REGEX,
      match => `<${host}${match}|${match}>`
    );

    data.set('text', replacedText);
  });
};

export default linkifyJira;
