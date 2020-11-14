declare interface IDotEnvLoader {
  source: EDotEnvLoaderSource;
  process(data: any, from: string): any;
}
