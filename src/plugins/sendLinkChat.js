const MD_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;
const POST_MESSAGE_API_ENDPOINT = '/api/chat.postMessage';
const UPDATE_MESSAGE_API_ENDPOINT = '/api/chat.update';

const sendLinkChat = () => {
  const originalOpen = window.XMLHttpRequest.prototype.open;

  window.XMLHttpRequest.prototype.open = function(...args) {
    if (
      args[0] === 'POST' &&
      (args[1].startsWith(POST_MESSAGE_API_ENDPOINT) ||
        args[1].startsWith(UPDATE_MESSAGE_API_ENDPOINT))
    ) {
      const originalSend = this.send;

      this.send = function(data) {
        if (data instanceof FormData) {
          const text = data.get('text');
          const replacedText = text.replace(
            MD_LINK,
            (_, text, url) => `<${url}|${text}>`
          );

          data.set('text', replacedText);
        }

        return originalSend.call(this, data);
      };
    }

    return originalOpen.call(this, ...args);
  };
};

export default sendLinkChat;
