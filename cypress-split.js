// Ref: https://echobind.com/post/running-cypress-tests-in-parallel

const fs = require('fs/promises');

const specDir = './cypress/e2e';
const testPattern = /(^|\s)(it|test)\(/g;

const [ totalRunners, thisRunner ] = process.argv.splice(2);

fs.readdir(specDir).then(async files => {
  const nbTests = {};

  for (const file of files) {
    nbTests[file] = await testCount(file);
  }

  const chunks = [];

  Object
    .entries(nbTests)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .map(file => `${specDir}/${file}`)
    .forEach((file, index) => {
      const chunk = index % totalRunners;
      chunks[chunk] = chunks[chunk] || [];
      chunks[chunk].push(file);
    });

  const output = chunks[thisRunner].join(',');
  return console.log(output);
});

async function testCount(filename) {
  const content = await fs.readFile(`${specDir}/${filename}`, 'utf8');
  return content.match(testPattern).length;
}
