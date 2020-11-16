
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const processEnv: IProcessEnv = {
  APP_ENV_HANDLER_SEPARATOR: process.env.APP_ENV_HANDLER_SEPARATOR,
  APP_ENV_VAR_WORD_SEPARATOR: process.env.APP_ENV_VAR_WORD_SEPARATOR,
  NODE_ENV: process.env.NODE_ENV,
  APP_DEBUG: process.env.APP_DEBUG,
  NODE_DEBUG: process.env.NODE_DEBUG,
  APP_I18N_LOCALE_DEFAULT: process.env.APP_I18N_LOCALE_DEFAULT,
  APP_I18N_LOCALE_DUMMY: process.env.APP_I18N_LOCALE_DUMMY,
  APP_I18N_SUPPORTED_LOCALES: process.env.APP_I18N_SUPPORTED_LOCALES,
  APP_I18N_SWITCHER_BEHAVIOUR: process.env.APP_I18N_SWITCHER_BEHAVIOUR,
  // eslint-disable-next-line max-len
  APP_I18N_SWITCHER_CHECK_PATH_LOCALE: process.env.APP_I18N_SWITCHER_CHECK_PATH_LOCALE,
  APP_ENV_MISSABLE: process.env.APP_ENV_MISSABLE,
  APP_ENV_TEST: process.env.APP_ENV_TEST,
  APP_ENV_TEST_SECOND: process.env.APP_ENV_TEST_SECOND,
  APP_ENV_TEST_THIRD: process.env.APP_ENV_TEST_THIRD,
  // eslint-disable-next-line max-len
  APP_E2E_PROTRACTOR_DIRECT_CONNECT: process.env.APP_E2E_PROTRACTOR_DIRECT_CONNECT,
  APP_E2E_PROTRACTOR_BASE_URL: process.env.APP_E2E_PROTRACTOR_BASE_URL,
  // eslint-disable-next-line max-len
  APP_E2E_PROTRACTOR_SELENIUM_ADDRESS: process.env.APP_E2E_PROTRACTOR_SELENIUM_ADDRESS
};

export {processEnv};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
