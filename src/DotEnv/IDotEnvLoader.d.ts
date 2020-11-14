declare interface IDotEnvLoader {
  source: EDotEnvLoaderSource;
  populate(data: any, fileName: string): any;
}
