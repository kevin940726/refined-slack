const MESSAGE_INPUT_ID = 'msg_input';
const BACKSPACE_REGEX = /\b/g;

function handleInput(e) {
  e.target.textContent = e.target.textContent.replace(BACKSPACE_REGEX, '');
}

const noBackspaceCharacter = () => {
  const messageInput = document
    .getElementById(MESSAGE_INPUT_ID)
    .querySelector('ql-editor');

  messageInput.addEventListener('input', handleInput);
};

export default noBackspaceCharacter;
