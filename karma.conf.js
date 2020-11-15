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
    instrumenterOptions: {
      istanbul: { noCompact: true }
    },
    basePath: '/',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      // specify a common output directory
      dir: require('path').join(__dirname, './coverage'),
      reporters: [
        // reporters not supporting the `file` property
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
        // reporters supporting the `file` property, use `subdir` to directly
        // output them in the `dir` directory
        { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
        { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
