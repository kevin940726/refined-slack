import { patchSendChat } from '../helpers/patchRequest';
import listenOnElement from '../helpers/listenOnElement';
import monkey from '../helpers/monkey';

const SLACK_LINK = /<([^|]+)\|([^>]+)>/g;
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

  // This is really expensive..., need some other way to do the same thing
  monkey(window.TS.redux, 'getState', (getState, thisArg, ...args) => {
    const state = getState.apply(thisArg, args);

    try {
      const editChannel = Object.keys(state.messageEdit)[0];
      const editMessage = Object.keys(state.messageEdit[editChannel])[0];
      const message = state.messages[editChannel][editMessage];

      message.text = message.text.replace(
        SLACK_LINK,
        (link, url, label) => `[${label}](${url})`
      );
    } catch (e) {
      // do nothing
    }

    return state;
  });

  listenOnElement('[data-qa="message_container"]', ele => {
    const messageBody =
      // in infinite list messages
      ele.querySelector('.c-message__body') ||
      // in thread
      ele.querySelector('.message_body');

    if (!messageBody) {
      return;
    }

    // find all <a> tags
    const links = messageBody.querySelectorAll('a');

    Array.from(links).forEach(link => {
      const pre = link.previousSibling;
      const next = link.nextSibling;
      let labelGroup;

      // it should be in form of [label](<a>url</a>)
      // (TODO: missing support of having other nodes in label)
      if (
        pre &&
        pre.nodeName === '#text' &&
        next &&
        next.nodeName === '#text' &&
        (labelGroup = pre.textContent.match(/\[(.*?)\]\($/)) &&
        next.textContent.startsWith(')')
      ) {
        pre.textContent = pre.textContent.slice(0, labelGroup.index);
        next.textContent = next.textContent.slice(1);

        link.textContent = labelGroup[1];
      }
    });
  });
};

export default sendLinkChat;
