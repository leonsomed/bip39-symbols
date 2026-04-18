const fs = require('fs/promises');
const { promptForInput } = require('./input');
const { randomUInt16Factory } = require('./random');

async function run() {
  const seed = await promptForInput('Enter a seed to generate the symbol map');
  const getRandomUInt16 = randomUInt16Factory(seed);
  const arr = Array.from({ length: 2048 }).map((_, i) => i + 1);

  for (let i = arr.length - 1; i > 0; i--) {
    const index = getRandomUInt16(i);
    const temp = arr[i];

    arr[i] = arr[index];
    arr[index] = temp;
  }

  const dups = new Set();
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < arr.length; i++) {
    if (dups.has(arr[i])) {
      throw new Error(`Duplicated value ${arr[i]}`);
    }

    dups.add(arr[i]);

    if (arr[i] > max) {
      max = arr[i];
    }

    if (arr[i] < min) {
      min = arr[i];
    }
  }

  if (arr.length !== 2048 || dups.size !== 2048 || min !== 1 || max !== 2048) {
    console.log({ max, min, dupsSize: dups.size, arrLength: arr.length });
    throw new Error(`Invalid run`);
  }

  const filename = `symbol-map-deterministic-${new Date().toISOString()}-${Math.floor(
    getRandomUInt16(1000) + 1000,
  )}`;
  await fs.writeFile(filename, JSON.stringify(arr));
  console.log(`Created map symbol file: ${filename}`);
}

run();
