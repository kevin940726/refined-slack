const MEMBER_ID = 'U4VAMTQ5V';
const COLOR = 'orange';

const highlightShy = () => {
  document.head
    .appendChild(document.createElement('style'))
    .sheet.insertRule(
      `[data-member-id="${MEMBER_ID}"] { background-color: ${COLOR} !important; }`
    );
};

export default highlightShy;
