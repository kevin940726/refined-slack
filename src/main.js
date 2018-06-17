const opn = require('opn');
const getPort = require('get-port');

const connect = require('./connect');
const remote = require('./remote');
const { injectPlugins } = require('./store/server');

async function main() {
  const port = await getPort({ port: 9222 });

  console.log(`Connected to ${port}`);

  await opn('', {
    app: ['Slack', `--remote-debugging-port=${port}`],
    wait: false,
  });

  const remoteProtocol = await remote(port);
  const clientProtocol = await connect(port);

  await injectPlugins(remoteProtocol, clientProtocol);
}

main();
