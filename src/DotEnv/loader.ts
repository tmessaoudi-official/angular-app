// @ts-ignore
const fs = require('fs');
// @ts-ignore
let dotenv = require('dotenv');

const DotEnvLoaderRun: IDotEnvLoaderRun = require('./DotEnvLoaderRun.dotenv.run');

// @ts-ignore
let dotEnvLoaderRun = new DotEnvLoaderRun();

console.log(dotEnvLoaderRun.run('hello world'));
