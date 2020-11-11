// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
let Loader = require('./webpack/dotenv/Loader.js');

// eslint-disable-next-line max-len
const processNodeEnv = (typeof process.env.NODE_ENV === 'undefined' || (typeof process.env.NODE_ENV === 'string' && (process.env.NODE_ENV !== ''))) ? process.env.NODE_ENV : 'test';
// eslint-disable-next-line max-len
const forceEnvRebuild = ((typeof process.env.APP_ENV_RUN_BUILD === 'undefined' || (typeof process.env.APP_ENV_RUN_BUILD === 'string' && (process.env.APP_ENV_RUN_BUILD === '' || process.env.APP_ENV_RUN_BUILD === 'true'))) || (typeof process.env.APP_ENV_FORCE_REBUILD === 'undefined' || (typeof process.env.APP_ENV_FORCE_REBUILD === 'string' && (process.env.APP_ENV_FORCE_REBUILD === '' || process.env.APP_ENV_FORCE_REBUILD === 'true'))));
Loader.run(processNodeEnv, forceEnvRebuild);

module.exports = function (config) {
  config.set({
    basePath: '/',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-phantomjs-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
