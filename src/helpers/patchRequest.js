const POST_MESSAGE_API_ENDPOINT = '/api/chat.postMessage';
const UPDATE_MESSAGE_API_ENDPOINT = '/api/chat.update';

const patchRequest = patch => {
  const originalOpen = window.XMLHttpRequest.prototype.open;

  window.XMLHttpRequest.prototype.open = function(method, path, ...args) {
    const originalSend = this.send;

    this.send = function(data) {
      const request = {
        method,
        path,
        data,
      };

      patch(request);

      return originalSend.call(this, data);
    };

    return originalOpen.call(this, method, path, ...args);
  };
};

export const patchSendChat = patch => {
  patchRequest(({ method, path, data }) => {
    if (
      method === 'POST' &&
      (path.startsWith(POST_MESSAGE_API_ENDPOINT) ||
        path.startsWith(UPDATE_MESSAGE_API_ENDPOINT)) &&
      data instanceof FormData
    ) {
      patch({ data });
    }
  });
};

export default patchRequest;
