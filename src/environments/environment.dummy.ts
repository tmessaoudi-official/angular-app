// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment: IEnvironment = {
	appI18nIsLocaleDummy: true,
	appI18nIsLocaleLanding: false,
	// @ts-ignore : APP_ENV comes from webpack
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	production: APP_ENV.APP_ENV === `production`,
	// @ts-ignore : APP_ENV comes from webpack
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	appEnv: APP_ENV.APP_ENV,
	// @ts-ignore : APP_ENV comes from webpack
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	appDebug: APP_ENV.APP_DEBUG,
	// @ts-ignore : APP_ENV comes from webpack
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	appI18nLocaleDefault: APP_ENV.APP_I18N_LOCALE_DEFAULT,
	// @ts-ignore : APP_ENV comes from webpack
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	appI18nLocaleDummy: APP_ENV.APP_I18N_LOCALE_DUMMY,
	// @ts-ignore : APP_ENV comes from webpack
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	appI18nSingleLocale: APP_ENV.APP_I18N_SINGLE_LOCALE,
	// @ts-ignore : APP_ENV comes from webpack
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	appI18nSupportedLocales: APP_ENV.APP_I18N_SUPPORTED_LOCALES,
	// @ts-ignore : APP_ENV comes from webpack
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	appI18nSwitcherBehaviour: APP_ENV.APP_I18N_SWITCHER_BEHAVIOUR,
	// @ts-ignore : APP_ENV comes from webpack
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
	appI18nSwitcherCheckPathLocale: APP_ENV.APP_I18N_SWITCHER_CHECK_PATH_LOCALE
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
if (environment.appDebug) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
	console.log(`***** Environment : `);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
	console.log(environment);
}

export { environment };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
