const MESSAGE_INPUT_ID = 'msg_input';
const BACKSPACE_REGEX = /\b/g;

function handleInput(e) {
  e.target.textContent = e.target.textContent.replace(BACKSPACE_REGEX, '');
}

const noBackspaceCharacter = () => {
  document.addEventListener(
    'input',
    e => {
      if (
        e.target ===
        document.getElementById(MESSAGE_INPUT_ID).querySelector('ql-editor')
      ) {
        handleInput(e);
      }
    },
    false
  );
};

export default noBackspaceCharacter;
