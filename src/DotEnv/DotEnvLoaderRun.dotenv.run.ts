const DotEnvLoader: IDotEnvLoader = require('./DotEnvLoader.dotenv');

module.exports =
  // @ts-ignore
  class DotEnvLoaderRun extends DotEnvLoader implements IDotEnvLoaderRun {
    source: EDotEnvLoaderSource;

    constructor() {
      super(EDotEnvLoaderSource.Process);
    }

    run(x: string): string {
      return x + ' !! source : ' + this.source;
    }
  };
