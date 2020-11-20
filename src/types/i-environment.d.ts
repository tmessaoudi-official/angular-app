// eslint-disable-next-line no-unused-vars
declare interface IEnvironment {
	production: boolean;
	appEnv: string;
	appDebug: boolean;
	appI18nLocaleDefault: string;
	appI18nLocaleDummy: string;
	appI18nIsLocaleDummy?: boolean;
	appI18nIsLocaleLanding?: boolean;
	appI18nSupportedLocales: Array<I18nLocale>;
	appI18nSwitcherBehaviour: string;
	appI18nSwitcherCheckPathLocale: boolean;
}
