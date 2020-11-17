// @ts-ignore
// eslint-disable-next-line no-unused-vars
const fs = require(`fs`);
// @ts-ignore
// eslint-disable-next-line no-unused-vars
const dotenv = require(`dotenv`);

import DotEnvLoaderRun from './dot-env-loader-run.dotenv.run';

// @ts-ignore
const dotEnvLoaderRun = new DotEnvLoaderRun(EDotEnvLoaderSource.DummyProcess);

console.log(dotEnvLoaderRun.run(`hello world`));
console.log(dotEnvLoaderRun.process(`hello world`, `from hello world`));
