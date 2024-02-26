const repl = require('repl');
// repl.start();
const local = repl.start('$ ');
local.on('exit', () => {
  console.log('exiting repl');
  process.exit();
});