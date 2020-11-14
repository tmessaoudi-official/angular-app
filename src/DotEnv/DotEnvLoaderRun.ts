// @ts-ignore
const DotEnvLoader = require('./DotEnvLoader');

module.exports = class DotEnvLoaderRun extends DotEnvLoader implements IDotEnvLoaderRun {
  constructor() {
    super('process');
  }

  run(x: string): string {
    return x + ' !! source : ' + this.source;
  }
}
