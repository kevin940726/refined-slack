const linkify = (regex, replacer) => {
  const iterateLink = root => {
    const nodeIterator = document.createNodeIterator(
      root,
      NodeFilter.SHOW_TEXT,
      node => regex.test(node.textContent)
    );

    const nodes = [];

    let currentNode;
    while ((currentNode = nodeIterator.nextNode())) {
      // don't linkify <a> tag
      if (!currentNode.parentNode || currentNode.parentNode.nodeName !== 'A') {
        nodes.push(currentNode);
      }
    }

    nodes.forEach(node => {
      let group;

      regex.lastIndex = 0;

      while ((group = regex.exec(node.textContent))) {
        const replaced = node.splitText(group.index);
        replaced.splitText(group[0].length);

        const link = document.createElement('a');
        link.textContent = group[0];
        link.href = replacer(group[0]);
        link.target = '_blank';

        replaced.replaceWith(link);
      }
    });
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (
        mutation.target &&
        mutation.target.classList &&
        mutation.target.classList.contains('c-virtual_list__scroll_container')
      ) {
        iterateLink(mutation.target);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  });

  window.addEventListener(
    'load',
    () => {
      const messageContainer = document.querySelector(
        '.c-virtual_list__scroll_container'
      );

      if (messageContainer) {
        iterateLink(messageContainer);
      }
    },
    false
  );
};

export default linkify;
