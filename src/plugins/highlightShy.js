const MEMBER_ID = 'U4VAMTQ5V';
const COLOR = 'orange';

const highlightShy = ({ userID = MEMBER_ID, color = COLOR }) => {
  document.head
    .appendChild(document.createElement('style'))
    .sheet.insertRule(
      `[data-member-id="${userID}"] { background-color: ${color} !important; }`
    );
};

export default highlightShy;
