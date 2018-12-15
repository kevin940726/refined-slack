function monkeyPatch(parent, method, patcher) {
  const original = parent[method];
  parent[method] = function() {
    const real = original.apply(this, arguments);
    return patcher(real);
  };
  parent[method].name = method;
}

function trimDepart(name) {
  return name.replace(/\s*\(.*\)\s*$/, '');
}

const hideDepartment = () => {
  monkeyPatch(window.TS.interop.members, 'getMemberById', member => {
    if (member && member.profile) {
      member.profile.display_name =
        member.name || trimDepart(member.profile.display_name);
      member.profile.real_name =
        member.name || trimDepart(member.profile.real_name);
    }

    return member;
  });
};

export default hideDepartment;
