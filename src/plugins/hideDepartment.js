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
  monkeyPatch(window.TS.redux, 'getState', state => {
    Object.values(state.members).forEach(m => {
      m.profile.display_name = m.name || trimDepart(m.profile.display_name);
      m.profile.real_name = m.name || trimDepart(m.profile.real_name);
    });
    return state;
  });
};

export default hideDepartment;
