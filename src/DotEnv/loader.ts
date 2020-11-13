// @ts-ignore
const fs = require('fs');
// @ts-ignore
let dotenv = require('dotenv');

const DotEnvLoaderRun = require('./DotEnvLoaderRun');

let dotEnvLoaderRun = new DotEnvLoaderRun();

console.log(dotEnvLoaderRun.run('hello world'));
console.log('hello here from ts env loader running !!! ... WIP !');
