const DotEnvLoader: IDotEnvLoader = require('./DotEnvLoader.dotenv');

module.exports =
  // @ts-ignore
  class DotEnvLoaderRun extends DotEnvLoader implements IDotEnvLoaderRun {
    source: EDotEnvLoaderSource;

    constructor()

    constructor(source?: EDotEnvLoaderSource) {
      if (typeof source === 'undefined' || source === null) {
        source = EDotEnvLoaderSource.Process;
      }
      super(source);
      this.source = source;
    }

    run(x: string): string {
      return x + ' !! run DotEnvLoaderRun, source : ' + this.source;
    }

    load(x: string): string {
      return '';
    }

    populate(x: string): string {
      return '';
    }
  };
