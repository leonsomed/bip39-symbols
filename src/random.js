const crypto = require('node:crypto');

function randomUInt16Factory(seed) {
  let hash = crypto.hash('sha256', seed);
  let buff = Buffer.from(hash, 'hex');
  let index = 0;

  return (max) => {
    if (index + 1 >= buff.length) {
      hash = crypto.hash('sha256', hash);
      buff = Buffer.from(hash, 'hex');
      index = 0;
    }

    const temp = buff.readUInt16BE(index);
    index += 2;
    return temp % max;
  };
}

module.exports = { randomUInt16Factory };
