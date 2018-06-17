const CDP = require('chrome-remote-interface');
const { waitForApp } = require('./utils');

const remote = async port => {
  const Protocol = await waitForApp(() =>
    CDP({
      port,
      local: true,
      target: list => list.find(target => target.url.startsWith('file://')),
    })
  );

  return Protocol;
};

module.exports = remote;
