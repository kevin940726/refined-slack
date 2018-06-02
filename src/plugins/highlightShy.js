const highlightShy = () => {
  const MEMBER_ID = 'U4VAMTQ5V';
  const COLOR = 'orange';

  document.head
    .appendChild(document.createElement('style'))
    .sheet.insertRule(
      `[data-member-id="${MEMBER_ID}"] { background-color: ${COLOR} !important; }`
    );
};

export default ({ addScriptToEvaluateOnNewDocument }) =>
  addScriptToEvaluateOnNewDocument(highlightShy);
