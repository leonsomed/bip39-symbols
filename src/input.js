const readline = require('node:readline');
const Writable = require('node:stream').Writable;

const mutedStdout = new Writable({
  write: (chunk, encoding, callback) => {
    callback();
  },
});

async function promptForInput(label, confirm) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: mutedStdout,
    terminal: true,
  });
  console.log(label);
  let input;

  for await (const line of rl) {
    if (!input) {
      input = line;
      if (!confirm) {
        rl.close();
        break;
      }
      console.log('Confirm the input:');
    } else if (input !== line) {
      console.log('inputs missmatch, aborting');
      rl.close();
      throw new Error('INPUT_MISSMATCH');
    } else {
      rl.close();
      break;
    }
  }

  return Buffer.from(input);
}

module.exports = {
  promptForInput,
};
