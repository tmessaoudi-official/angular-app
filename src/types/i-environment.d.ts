// eslint-disable-next-line no-unused-vars
declare interface IEnvironment {
	appEnvHandlerSeparator?: string;
	appEnvVarWordSeparator?: string;
	production?: boolean;
	nodeEnv?: string;
	appDebug?: boolean;
	nodeDebug?: boolean;
	appI18nLocaleDefault?: string;
	appI18nLocaleDummy?: string;
	appI18nIsLocaleDummy?: boolean;
	appI18nIsLocaleLanding?: boolean;
	appI18nSupportedLocales?: Array<I18nLocale>;
	appI18nSwitcherBehaviour?: string;
	appI18nSwitcherCheckPathLocale?: boolean;
	appEnvMissable?: Array<string>;
	appEnvTest?: any;
	appEnvTestSecond?: any;
	appEnvTestThird?: any;
	appTestE2eProtractorDirectConnect?: boolean | undefined | null | never;
	appTestE2eProtractorBaseUrl?: string | undefined | null | never;
	appTestE2eProtractorSeleniumAddress?: string | undefined | null | never;
}
