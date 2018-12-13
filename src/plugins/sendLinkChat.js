import { patchSendChat } from '../helpers/patchRequest';

const MD_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const SLACK_LINK = /<((?!#C|@U|@W|!)[^|]+)\|([^>]+)>/g;

const replaceMDLinkToSlackLink = text =>
  text.replace(MD_LINK, (match, text, url) => `<${url}|${text}>`);
const replaceSlackLinkToMDLink = text =>
  text.replace(SLACK_LINK, (match, url, text) => `[${text}](${url})`);

const sendLinkChat = async () => {
  patchSendChat(({ data }) => {
    const text = data.get('text');

    data.set('text', replaceMDLinkToSlackLink(text));
  });

  console.log(window.TS.boot_data.feature_modern_edit_format);

  // normal editing
  const formatWithOptions = window.TS.format.formatWithOptions;
  // window.TS.format.formatWithOptions = function(text, _, flag) {
  //   if (flag && flag.for_edit) {
  //     return formatWithOptions.call(
  //       this,
  //       replaceSlackLinkToMDLink(text),
  //       ...Array.from(arguments).slice(1)
  //     );
  //   }

  //   return formatWithOptions.apply(this, arguments);
  // };

  // when feature_modern_edit_format is true
  const getTokensArray = window.TSF.getTokensArray;
  window.TSF.getTokensArray = function(text) {
    console.log(...arguments);
    return getTokensArray.call(
      this,
      replaceSlackLinkToMDLink(text),
      ...Array.from(arguments).slice(1)
    );
  };
};

export default sendLinkChat;
