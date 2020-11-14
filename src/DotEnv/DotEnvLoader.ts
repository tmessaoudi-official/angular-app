module.exports = class DotEnvLoader implements IDotEnvLoader {
  source: EDotEnvLoaderSource;

  constructor(source?: EDotEnvLoaderSource) {
    if (typeof source === 'undefined') {
      // @ts-ignore
      source = 'app';
    }
    this.source = source;
  }

  load(x: string): string {
    return x + ' !! , source : ' + this.source;
  }

  populate(data: any, fileName: string): any {
  }
}
