const path = require('path');
const fs = require('fs');
const CDP = require('chrome-remote-interface');
const { waitForApp } = require('./utils');

const takeScreenshot = require('./plugins/takeScreenshot/server');

const plugins = [takeScreenshot];

const connect = async port => {
  const Protocol = await waitForApp(() => CDP({ port, local: true }));

  Protocol.Page.domContentEventFired(() => {
    Protocol.Runtime.evaluate({
      expression: fs.readFileSync(
        path.resolve(__dirname, '../build/client.js'),
        'utf8'
      ),
    });
  });

  plugins.forEach(async plugin => {
    await plugin(Protocol);
  });

  return Protocol;
};

module.exports = connect;
