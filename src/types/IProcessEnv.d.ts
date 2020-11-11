interface IProcessEnv {
  APP_ENV_HANDLER_SEPARATOR: string;
  APP_ENV_VAR_WORD_SEPARATOR: string;
  NODE_ENV: string;
  APP_DEBUG: boolean|string;
  NODE_DEBUG: boolean|string;
  APP_I18N_LOCALE_DEFAULT: string;
  APP_I18N_LOCALE_DUMMY: string;
  APP_I18N_SUPPORTED_LOCALES: any;
  APP_I18N_SWITCHER_BEHAVIOUR: string;
  APP_I18N_SWITCHER_CHECK_PATH_LOCALE: boolean|string;
  APP_ENV_MISSABLE: any;
  APP_ENV_TEST: any;
  APP_ENV_TEST_SECOND: any;
  APP_ENV_TEST_THIRD: any;
  APP_E2E_PROTRACTOR_DIRECT_CONNECT?: boolean|string|undefined|null|never;
  APP_E2E_PROTRACTOR_BASE_URL?: string|undefined|null|never;
  APP_E2E_PROTRACTOR_SELENIUM_ADDRESS?: string|undefined|null|never;
}
