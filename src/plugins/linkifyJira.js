// Jira
import linkify from '../helpers/linkify';

const JIRA_HOST_URL = 'https://17media.atlassian.net/browse/';
const JIRA_REGEX = /(?:APP|PROD|BUG|SRE)-\d+/;

const linkifyJira = linkify(JIRA_REGEX, match => `${JIRA_HOST_URL}${match}`);

export default linkifyJira;
