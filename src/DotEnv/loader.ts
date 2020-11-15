// @ts-ignore
const fs = require('fs');
// @ts-ignore
let dotenv = require('dotenv');

const DotEnvLoaderRun: IDotEnvLoaderRun = require('./DotEnvLoaderRun.dotenv.run');

// @ts-ignore
let dotEnvLoaderRun = new DotEnvLoaderRun(EDotEnvLoaderSource.DummyProcess);

console.log(dotEnvLoaderRun.run('hello world'));
console.log(dotEnvLoaderRun.process('hello world', 'from hello world'));
