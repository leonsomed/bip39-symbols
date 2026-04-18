const fs = require('fs/promises');
const { wordlist } = require('./wordlist.js');

const argList = {
  recover: '--recover',
  backup: '--backup',
};
const argValueList = new Set();

Object.values(argList).forEach((arg) => {
  argValueList.add(arg);
});

async function getArgs() {
  const args = process.argv.slice(2);
  const argSet = new Set();

  const filepath = args[args.length - 1];

  if (!filepath) {
    throw new Error('missing filepath');
  }

  await fs.stat(filepath);

  for (let i = 0; i < args.length - 1; i++) {
    const arg = args[i];

    if (!argValueList.has(arg)) {
      throw new Error(`Unknown arg ${arg}`);
    }

    argSet.add(arg);
  }

  if (argSet.has(argList.backup) && argSet.has(argList.recover)) {
    throw new Error('Multiple modes not supported specify only one');
  }

  return { argSet, filepath };
}

async function getArrFromFile(filepath) {
  const text = await fs.readFile(filepath, 'utf8');
  return JSON.parse(text);
}

async function run() {
  const { argSet, filepath } = await getArgs();
  const arr = await getArrFromFile(filepath);

  // there are two modes: backup | recovery
  if (argSet.has(argList.backup)) {
    console.log('Running backup mode');
    // backup: sort by word (easier to lookup word)

    const result = arr.map((symbol, i) => ({
      word: i + 1,
      bipWord: wordlist[i],
      symbol,
    }));

    result.sort((a, b) => a.word - b.word);

    console.log(JSON.stringify(result, null, 2));
  } else if (argSet.has(argList.recover)) {
    console.log('Running recover mode');
    // recovery: sort by symbol (easier to lookup symbols)

    const result = arr.map((symbol, i) => ({
      symbol,
      bipWord: wordlist[i],
      word: i + 1,
    }));

    result.sort((a, b) => a.symbol - b.symbol);

    console.log(JSON.stringify(result, null, 2));
  } else {
    throw new Error('Unsupported mode');
  }
}

run();
