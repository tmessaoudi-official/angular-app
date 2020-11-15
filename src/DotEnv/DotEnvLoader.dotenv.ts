module.exports = class DotEnvLoader implements IDotEnvLoader {
  source: EDotEnvLoaderSource;

  constructor()
  constructor(source?: EDotEnvLoaderSource) {
    if (typeof source === 'undefined' || source === null) {
      source = EDotEnvLoaderSource.App;
    }
    if (source !== EDotEnvLoaderSource.Process && source !== EDotEnvLoaderSource.App && source !== EDotEnvLoaderSource.DummyProcess) {
      throw new Error(' - DotEnvLoader : Unknown execution source \'' + source + '\' provided');
    }
    this.source = source;
  }

  process(x: string, from: string): string {
    return x + ' !! process DotEnvLoader , source : ' + this.source;
  }
};
