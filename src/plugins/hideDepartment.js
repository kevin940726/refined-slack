import monkey from '../helpers/monkey';

function trimDepart(name) {
  return name.replace(/\s*\(.*\)\s*$/, '');
}

const hideDepartment = () => {
  monkey(
    window.TS.interop.members,
    'getMemberById',
    (getMemberById, thisArg, ...args) => {
      const member = getMemberById.apply(thisArg, args);

      if (member && member.profile) {
        member.profile.display_name =
          member.name || trimDepart(member.profile.display_name);
        member.profile.real_name =
          member.name || trimDepart(member.profile.real_name);
      }

      return member;
    }
  );
};

export default hideDepartment;
