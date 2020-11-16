import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentVariableValidators {
  constructor() {
  }

  public process(value: any|string|undefined|never, name: string|undefined = '', fail?: any): any|string|undefined|never {
    if (typeof value[0] !== 'undefined' && typeof value[0][0] !== 'undefined') {
      if (value[0][0] === 'environment.validators.none') {
        return value[1];
      } else if (value[0][0].indexOf('environment.validators.') === 0)  {
        throw new Error('Environment variable validator \'' + value[0][0] + '\' does not exist');
      }
    }

    return value[1];
  }
}
