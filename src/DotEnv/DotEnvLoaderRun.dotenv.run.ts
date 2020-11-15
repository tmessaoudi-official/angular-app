import DotEnvLoader from './DotEnvLoader.dotenv';

export default class DotEnvLoaderRun extends DotEnvLoader implements IDotEnvLoaderRun {
    source: EDotEnvLoaderSource;

    constructor()

    constructor(source?: EDotEnvLoaderSource) {
      if (typeof source === 'undefined' || source === null) {
        source = EDotEnvLoaderSource.Process;
      }
      // @ts-ignore
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
