const webpack = require('webpack');

let Loader = require('./webpack/dotenv/Loader.js');

let processNodeEnv = typeof process.env.NODE_ENV === 'string' && process.env.NODE_ENV !== '' ? process.env.NODE_ENV : '';
// eslint-disable-next-line max-len
let forceEnvRebuild = ((typeof process.env.APP_ENV_RUN_BUILD === 'string' && process.env.APP_ENV_RUN_BUILD === 'true') || (typeof process.env.APP_ENV_FORCE_REBUILD === 'string' && process.env.APP_ENV_FORCE_REBUILD === 'true'));
Loader.run(processNodeEnv, forceEnvRebuild);

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.env
    })
  ]
};
