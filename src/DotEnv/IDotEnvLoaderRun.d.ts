declare interface IDotEnvLoaderRun extends IDotEnvLoader{
  populate(x: string): string
  load(x: string): string
  run(x: string): string;
}
