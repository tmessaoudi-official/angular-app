import DotEnvLoader from '../DotEnv/DotEnvLoader.dotenv';

let dotEnvLoader = new DotEnvLoader();

console.log(dotEnvLoader.process('hello world from inside', 'testing'));

import { EnvironmentVariableHandler } from '../DotEnv/deprecated/variable/EnvironmentVariableHandler';
import { processEnv } from '../DotEnv/processEnv';
import { EnvironmentNaming } from '../DotEnv/deprecated/EnvironmentNaming';

const environmentVariableHandler = new EnvironmentVariableHandler();
const environmentNaming = new EnvironmentNaming();

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let environment: IEnvironment = {};
Object.keys(processEnv).forEach((item, index, arr) =>
{
  environment[environmentNaming.camelize(item)] = environmentVariableHandler.process(processEnv[item], item);
});

environment.production = environment.nodeEnv === 'production';
environment.appI18nIsLocaleDummy = false;
environment.appI18nIsLocaleLanding = false;

if (environment.appDebug === true) {
  console.log('***** Environment : ');
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
