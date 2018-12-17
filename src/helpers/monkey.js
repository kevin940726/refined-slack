function monkey(parent, method, patcher) {
  const original = parent[method];
  parent[method] = function() {
    return patcher(original, this, ...arguments);
  };
  parent[method].name = method;
}

export default monkey;
