import { patchSendChat } from '../helpers/patchRequest';

const MD_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

const sendLinkChat = () => {
  patchSendChat(({ data }) => {
    const text = data.get('text');
    const replacedText = text.replace(
      MD_LINK,
      (match, text, url) => `<${url}|${text}>`
    );

    data.set('text', replacedText);
  });
};

export default sendLinkChat;
