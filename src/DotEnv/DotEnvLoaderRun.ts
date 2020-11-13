// @ts-ignore
const DotEnvLoader = require('./DotEnvLoader');

module.exports = class DotEnvLoaderRun extends DotEnvLoader{
  constructor() {
    super();
  }

  // eslint-disable-next-line no-unused-vars
  run(x: string): string {
    return x + 'running !!!';
  }
}
