// Jira
import linkify from '../helpers/linkify';

const JIRA_HOST_URL = 'https://17media.atlassian.net/browse/';
const JIRA_REGEX = /(?:APP|PROD|BUG|SRE)-\d+/;

const linkifyJira = ({ host = JIRA_HOST_URL }) =>
  linkify(JIRA_REGEX, match => `${host}${match}`);

export default linkifyJira;
