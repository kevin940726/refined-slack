import { screenshotEvent } from './shared';

const addButtonToMessageActions = () => {
  const makeToggleHighlighted = isActive =>
    function() {
      const method = isActive ? 'add' : 'remove';
      this.classList[method]('c-menu_item__li--highlighted');
      this.querySelector('button').classList[method](
        'c-menu_item__button--highlighted'
      );
    };

  const handleClick = messageContainer => {
    document.querySelector('.ReactModal__Overlay').click();

    messageContainer.scrollIntoView();

    const messageBox = messageContainer.getBoundingClientRect();
    const scrollAreaBox = document
      .getElementById('messages_container')
      .getBoundingClientRect();

    const messageHeader = messageContainer.querySelector(
      '.c-message__content_header'
    );
    const messageSender = messageHeader.querySelector('.c-message__sender_link')
      .textContent;
    const messageTimestamp = messageHeader.querySelector('.c-timestamp')
      .textContent;
    const fileName = `${messageSender}-${messageTimestamp}`;

    const box = {
      x: messageBox.x,
      y: messageBox.y,
      width: messageBox.width,
      height: messageBox.height,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      scrollAreaHeight: scrollAreaBox.height,
      scrollAreaWidth: scrollAreaBox.width,
      ratio: window.devicePixelRatio,
      fileName,
    };

    screenshotEvent.dispatch(box);
  };

  const addScreenShotButton = (message, actionsMenu) => {
    const actionScreenshot = document.querySelector(
      '[data-rs-id="screenshot"]'
    );

    if (actionScreenshot) {
      // already injected, clear out and re-inject
      actionScreenshot.remove();
    } else {
      // don't need to reset style and separator

      // apply margin bottom to parent
      const { marginBottom } = getComputedStyle(actionsMenu);
      actionsMenu.style.marginBottom = '0';
      actionsMenu.parentNode.style.marginBottom = marginBottom;

      // insert new separator
      const separatorTarget = actionsMenu.querySelector(
        '.c-menu_separator__li'
      );
      const separator = separatorTarget.cloneNode(true);
      actionsMenu.insertAdjacentElement('afterend', separator);
    }

    // insert new action
    const actionTarget = actionsMenu.querySelector('.c-menu_item__li');
    const action = actionTarget.cloneNode(true);
    action.dataset.rsId = 'screenshot';
    action.querySelector('.c-menu_item__label').textContent = 'Take screenshot';

    // apply hover highlight effect
    action.addEventListener('mouseover', makeToggleHighlighted(true), false);
    action.addEventListener('mouseout', makeToggleHighlighted(false), false);

    // inject click listener
    action.addEventListener('click', () => handleClick(message), false);

    actionsMenu.parentNode.appendChild(action);
  };

  const mutationHandler = addedNode => {
    if (addedNode.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const message = (
      document.querySelector(
        '.c-message__actions--menu-showing[aria-label="Message actions"]'
      ) || document.body
    ).closest('[data-qa="message_container"]');
    const actionsMenu = addedNode.querySelector('[data-qa="menu_items"]');

    if (!actionsMenu || !message) {
      return;
    }

    addScreenShotButton(message, actionsMenu);
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (!mutation.addedNodes || !mutation.addedNodes.length) {
        return;
      }

      mutation.addedNodes.forEach(mutationHandler);
    });
  });

  mutationHandler(document.body);

  observer.observe(document.body, { childList: true });
};

export default addButtonToMessageActions;
