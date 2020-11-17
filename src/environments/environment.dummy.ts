import DotEnvLoader from '../dot-env/dot-env-loader.dotenv';

const dotEnvLoader = new DotEnvLoader();

console.log(dotEnvLoader.process(`hello world from inside`, `testing`));

import { EnvironmentVariableHandler } from '../dot-env/deprecated/variable/environment-variable-handler';
import { processEnv } from '../dot-env/process-env';
import { EnvironmentNaming } from '../dot-env/deprecated/environment-naming';

const environmentVariableHandler = new EnvironmentVariableHandler();
const environmentNaming = new EnvironmentNaming();

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment: IEnvironment = {};
Object.keys(processEnv).forEach((item) => {
	environment[
		environmentNaming.camelize(item) as keyof IEnvironment
	] = environmentVariableHandler.process(
		processEnv[item as keyof IProcessEnv],
		item
	);
});

environment.production = environment.nodeEnv === `production`;
environment.appI18nIsLocaleDummy = true;
environment.appI18nIsLocaleLanding = false;

if (environment.appDebug === true) {
	console.log(`***** Environment : `);
	console.log(environment);
	console.log(processEnv);
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
