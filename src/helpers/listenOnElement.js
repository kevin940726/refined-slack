const listenOnElement = async (selector, callback) => {
  const observer = new MutationObserver(() => {
    const elements = document.querySelectorAll(selector);

    Array.from(elements).forEach(callback);
  });

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
  });
};

export default listenOnElement;
