const linkify = (regex, replacer) => {
  const iterateLink = root => {
    const nodeIterator = document.createNodeIterator(
      root,
      NodeFilter.SHOW_TEXT,
      node => regex.test(node.textContent)
    );

    let currentNode;
    while ((currentNode = nodeIterator.nextNode())) {
      const currentElement =
        currentNode &&
        (currentNode.nodeType !== 1 ? currentNode.parentElement : currentNode);

      // don't linkify node under <a> tag
      if (currentElement && !currentElement.closest('a')) {
        let group;

        regex.lastIndex = 0;

        while ((group = regex.exec(currentNode.textContent))) {
          const replaced = currentNode.splitText(group.index);
          replaced.splitText(group[0].length);

          const link = document.createElement('a');
          link.textContent = group[0];
          link.href = replacer(...group);
          link.target = '_blank';

          replaced.replaceWith(link);
        }
      }
    }
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (
        mutation.target &&
        (document
          .getElementById('messages_container')
          .contains(mutation.target) ||
          document.getElementById('flex_contents').contains(mutation.target))
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
      iterateLink(document.body);
    },
    false
  );
};

export default linkify;
