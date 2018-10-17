/**
 * @file This script "builds" documentation. It gets html files in docs/ replaces
 * certain urls and saves them to www/ which is then published to gh-pages
 */

const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);
const glob = promisify(require('glob'));

const replacementsMap = {
  '../README.md':
    'https://raw.githubusercontent.com/obedm503/bootmark/master/README.md',
  '../CHANGELOG.md':
    'https://raw.githubusercontent.com/obedm503/bootmark/development/CHANGELOG.md',
  '../dist/bootmark.js': 'https://unpkg.com/bootmark@next/dist/bootmark.js',
};

const replacementKeys = Object.keys(replacementsMap);

/** @param {string} fileString */
const replace = fileString => {
  let file = fileString;
  replacementKeys.forEach(pattern => {
    file = file.replace(pattern, replacementsMap[pattern]);
  });
  return file;
};

async function ensureWWW() {
  if (await exists('./www')) {
    return true;
  }
  await mkdir('./www');
}

(async () => {
  const names = await glob('./docs/*.html');
  const files = await Promise.all(
    names.map(name => readFile(name, { encoding: 'utf-8' })),
  );
  const newNames = names.map(name => name.replace('docs', 'www'));
  const builtFiles = files.map(replace);
  await ensureWWW();
  await Promise.all(builtFiles.map((file, i) => writeFile(newNames[i], file)));
})();
