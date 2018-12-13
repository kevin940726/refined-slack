const listenOnElement = async (selector, callback) => {
  let found = false;

  const observer = new MutationObserver(() => {
    const element = document.querySelector(selector);

    if (element) {
      if (!found) {
        found = true;

        callback(element);
      }
    } else {
      found = false;
    }
  });

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
  });
};

export default listenOnElement;
