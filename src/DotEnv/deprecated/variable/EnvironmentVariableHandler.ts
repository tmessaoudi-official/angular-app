import {Inject, Injectable} from '@angular/core';
import {EnvironmentVariableProcessors} from './EnvironmentVariableProcessors';
import {EnvironmentVariableValidators} from './EnvironmentVariableValidators';
import {processEnv} from '../../processEnv';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentVariableHandler {
  @Inject(EnvironmentVariableProcessors) public environmentVariableProcessors: EnvironmentVariableProcessors;
  @Inject(EnvironmentVariableValidators) public environmentVariableValidators: EnvironmentVariableValidators;
  envHandlerSeparator = '|';

  constructor() {
    this.environmentVariableProcessors = new EnvironmentVariableProcessors();
    this.environmentVariableValidators = new EnvironmentVariableValidators();
    if (typeof process.env.APP_ENV_HANDLER_SEPARATOR === 'string' && process.env.APP_ENV_HANDLER_SEPARATOR !== '') {
      this.envHandlerSeparator = process.env.APP_ENV_HANDLER_SEPARATOR;
    }
  }

  public process(value: any|string|undefined|never, name: string|undefined = '', fail?: any): any|string|undefined|never {
    const handlers = this.getHandlers(value);

    let unHandled: any|undefined|null = value;
    if (typeof handlers.handlers !== 'undefined') {
      unHandled = handlers.unHandledValue;
    }
    unHandled = this.eval(unHandled);
    if (typeof handlers.handlers !== 'undefined') {
      handlers.handlers.split(this.envHandlerSeparator).forEach((item, index, arr) => {
        unHandled = this.environmentVariableProcessors.process([item.split('~'), unHandled, handlers.rawValue], name, fail);
        unHandled = this.environmentVariableValidators.process([item.split('~'), unHandled, handlers.rawValue], name, fail);
      });

      return unHandled;
    }

    return unHandled;
  }

  private getHandlers(value: any|string|undefined|never): IEnvironmentVariableHandlerPreProcess {
    const regex = new RegExp(
      // eslint-disable-next-line max-len
      '^(((?<quote>[\'\"]?)(?<handlers>environment\.(processors|validators)\.[a-zA-Z\~\=\.\\' + this.envHandlerSeparator + ']*)(\\' + this.envHandlerSeparator + ')?)*:)?(?<value>.*)$',
      'ig');
    const matches = regex.exec(value);

    const handlersString = matches.groups.handlers;

    if (typeof handlersString !== 'undefined') {
      let toBeProcessed = matches.groups.value;
      if (typeof matches.groups.quote !== 'undefined') {
        if (toBeProcessed.lastIndexOf(matches.groups.quote) === (toBeProcessed.length - 1)) {
          toBeProcessed = toBeProcessed.substring(0, toBeProcessed.length - 1);
        }
      }

      return {
        handlers: handlersString,
        unHandledValue: toBeProcessed,
        rawValue: value
      };
    }

    return {handlers: undefined, unHandledValue: value, rawValue: value};
  }

  getDefaultValue(value: any|undefined|null): any|undefined|null {
    return typeof value === 'string' ? value.split('~')[1] : null;
  }

  getUnprocessedValue(value: any|undefined|null): any|undefined|null {
    return typeof value === 'string' ? value.split('~')[0] : null;
  }

  eval(value: any|undefined|null): any|undefined|null {
    const regex = new RegExp(
      // eslint-disable-next-line max-len
      '^(.*)?(?<placeHolder>(\\$\{(?<varName>[^\}]+)\}))(.*)?$',
      'i');

    let doWhile = true;
    while (doWhile) {
      const matches = regex.exec(value);

      if (matches === null || typeof matches === 'undefined' || typeof matches.groups.varName === 'undefined') {
        doWhile = false;
        break;
      }

      let varValue = this.process(processEnv[this.getUnprocessedValue(matches.groups.varName)]);

      if (typeof varValue === 'undefined') {
        const defaultValue = this.getDefaultValue(matches.groups.varName);
        if (defaultValue !== null && typeof defaultValue !== 'undefined') {
          varValue = this.process(processEnv[defaultValue]);
          if (typeof varValue === 'undefined') {
            varValue = this.process(defaultValue);
          }
        } else {
          varValue = this.process(this.getUnprocessedValue(matches.groups.varName));
        }
      }

      if (varValue === this.getUnprocessedValue(matches.groups.varName) && this.getDefaultValue(matches.groups.varName) === undefined) {
        if (processEnv.APP_DEBUG === 'true') {
          console.warn(' ** Environment variable \'' + varValue + '\' is undefined, going to use an empty string instead !!');
        }
        varValue = '';
      }

      if (typeof varValue !== 'string') {
        // eslint-disable-next-line max-len
        throw new Error('Environment variable has an invalid refenrece (it should only refence a string but it is referencing this \'' + matches.groups.varName + '\') -- value \'' + value + '\'');
      }

      value = value.replace(matches.groups.placeHolder, '' + varValue + '');
    }

    return value;
  }
}
