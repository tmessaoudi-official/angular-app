import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';

let Loader = require('./webpack/dotenv/Loader.js');

let processNodeEnv = typeof process.env.NODE_ENV === 'string' && process.env.NODE_ENV !== '' ? process.env.NODE_ENV : '';
// eslint-disable-next-line max-len
let forceEnvRebuild = ((typeof process.env.APP_ENV_RUN_BUILD === 'string' && process.env.APP_ENV_RUN_BUILD === 'true') || (typeof process.env.APP_ENV_FORCE_REBUILD === 'string' && process.env.APP_ENV_FORCE_REBUILD === 'true'));
Loader.run(processNodeEnv, forceEnvRebuild);

let tsLoader = require('./src/DotEnv/loader.ts');

export default (
  config: webpack.Configuration,
  options: CustomWebpackBrowserSchema,
  targetOptions: TargetOptions
) => {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': process.env
    })
  );

  return config;
};
