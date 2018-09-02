const opn = require('opn');
const getPort = require('get-port');

const connect = require('./connect');
const remote = require('./remote');

async function main() {
  const port = await getPort({ port: 9222 });

  console.log(`Connected to ${port}`);

  await opn('', {
    app: ['Slack', `--remote-debugging-port=${port}`],
    wait: false,
  });

  await remote(port);
  await connect(port);
}

main();
