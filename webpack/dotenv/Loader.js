const fs = require('fs');
let dotenv = require('dotenv');

let Loader = {
  load: function (fileName = './.env') {
    if (typeof fileName !== 'string' || fileName === '') {
      fileName = './.env';
    }
    try {
      if (Loader.data.APP_ENV_LOADED_FILES.includes(fileName)) {
        console.warn('File \'' + fileName + '\' already loaded !!');
        return;
      }
      // eslint-disable-next-line max-len
      const includes = Loader.populate(dotenv.parse(fs.readFileSync(fileName), {debug: Loader.handlers.processors.boolean.isTrue(process.env.NODE_DEBUG)}), fileName);
      Loader.log('Loaded ' + fileName + ' vars successfully !!');
      if (includes.length > 0) {
        includes.forEach(function (item, index) {
          if (item === fileName) {
            console.error('Circular reference detected, file \'' + item + '\' trying to include itself !!');
            process.exit(1);
          }
          Loader.load(item);
          if (!Loader.data.APP_ENV_LOADED_FILES.includes(item)) {
            Loader.data.APP_ENV_LOADED_FILES.push(item);
          }
        });
      }
    } catch (exception) {
      Loader.log('there was an exception loading ' + fileName + ' vars !!');
      //Loader.log(exception);
    }
  },
  populate: function (data, fileName = '') {
    if (typeof fileName !== 'string' || fileName === '') {
      fileName = '';
    }
    let keys = Object.keys(data);
    let includes = [];
    Object.values(data).forEach(function (item, index) {
      if (!Loader.data.APP_ENV_KEYS.includes(keys[index])) {
        Loader.data.APP_ENV_KEYS.push(keys[index]);
      }
      if (keys[index] === 'includes') {
        if (item !== '') {
          includes = item.split(',');
        }
      } else {
        let handlers = Loader.handlers.getHandlers(item);
        if (typeof handlers.handlers !== 'undefined' && handlers.handlers.indexOf('process.env.get') !== -1) {
          // eslint-disable-next-line max-len
          let newHandlers = handlers.handlers.replace('|process.env.get', '').replace('process.env.get|', '').replace('process.env.get', '');
          if (newHandlers !== '') {
            newHandlers += ':';
          }
          // eslint-disable-next-line max-len
          item = newHandlers + (typeof process.env[handlers.unHandledValue] !== 'undefined' && process.env[handlers.unHandledValue] !== null ? process.env[handlers.unHandledValue] : 'environment.processors.empty:' + process.env[handlers.unHandledValue]);
        }
        if (typeof item === 'undefined' || item === null) {
          process.env[keys[index]] = item;
        } else if (Loader.handlers.processors.boolean.isBoolean(item)) {
          process.env[keys[index]] = Loader.handlers.processors.boolean.getValue(item);
        } else {
          process.env[keys[index]] = Loader.quote.value(item);
        }
      }
    });

    return includes;
  },
  quote: {
    all: function () {
      Loader.data.APP_ENV_KEYS.forEach(function (item, index, arr) {
        process.env[item] = Loader.quote.value(process.env[item]);
      });
    },
    value: function (value) {
      if (typeof value === 'string') {
        if (value.indexOf('"') !== -1) {
          value = '\'' + value + '\'';
        } else {
          value = '"' + value + '"';
        }
      }
      return value;
    }
  },
  unquote: {
    value: function (value, quote = '') {
      value = value.replace(/^"|'/g, '').replace(/"|'$/g, '');
      return value;
    }
  },
  handlers: {
    getHandlers: function (value) {
      let envHandlerSeparator = '|';
      if (typeof process.env.APP_ENV_HANDLER_SEPARATOR === 'string' && process.env.APP_ENV_HANDLER_SEPARATOR !== '') {
        envHandlerSeparator = process.env.APP_ENV_HANDLER_SEPARATOR;
      }
      const regex = new RegExp(
        // eslint-disable-next-line max-len
        '^(((?<quote>[\'\"]?)(?<handlers>(environment|process)\.(processors|validators|env)\.[a-zA-Z\~\=\.\\' + envHandlerSeparator + ']*)(\\' + envHandlerSeparator + ')?)*:)?(?<value>.*)$',
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
    },
    processors: {
      boolean: {
        isBoolean: function (value) {
          return Loader.handlers.processors.boolean.isTrue(value) || Loader.handlers.processors.boolean.isFalse(value);
        },
        getValue: function (value) {
          if (Loader.handlers.processors.boolean.isBoolean(value)) {
            return Loader.handlers.processors.boolean.isTrue(value);
          }

          throw new Error('Trying to get boolean from : "' + value + '"');
        },
        isTrue: function (value) {
          return value === true ||
            value === 'true' ||
            value === '"true"' ||
            value === '\'true\'';

        },
        isFalse: function (value) {
          return value === false ||
            value === 'false' ||
            value === '"false"' ||
            value === '\'false\'';
        },
      },
    },
  },
  data: {
    APP_ENV_KEYS: [],
    APP_ENV_LOADED_FILES: []
  },
  log: function (message, format = 'log') {
    if (typeof format !== 'string' || format === '') {
      format = 'log';
    }
    if (Loader.handlers.processors.boolean.isTrue(process.env.NODE_DEBUG)) {
      switch (format) {
        case 'log':
        default: {
          console.log(message);
        }
      }
    }
  },
  run: function (nodeEnv = '') {
    if (typeof nodeEnv !== 'string' || nodeEnv === '') {
      nodeEnv = '';
    }
    Loader.load();
    Loader.load('./.env.local');

    if (nodeEnv !== '') {
      Loader.load('./.env.' + nodeEnv );
      Loader.load('./.env.' + nodeEnv  + '.local');
      process.env.NODE_ENV = Loader.quote.value(nodeEnv);
    } else {
      Loader.load('./.env.' + Loader.unquote.value(process.env.NODE_ENV));
      Loader.load('./.env.' + Loader.unquote.value(process.env.NODE_ENV) + '.local');
    }

    if (typeof process.env.APP_ENV_MISSABLE !== 'undefined') {
      JSON.parse(Loader.handlers.getHandlers(process.env.APP_ENV_MISSABLE).unHandledValue).forEach(function (item, index, arr) {
        if (!Loader.data.APP_ENV_KEYS.includes(item)) {
          Loader.data.APP_ENV_KEYS.push(item);
        }
        if (typeof process.env[item] === 'undefined') {
          process.env[item] = undefined;
        }
      });
    }
    Loader.log(' ***** Environment : ');
    Loader.data.APP_ENV_KEYS.forEach(function (item, index, arr) {
      Loader.log('    - ' + item);
      Loader.log('        ** : ' + process.env[item]);
    });
    Loader.log('     ----- Includes : ');
    Loader.data.APP_ENV_LOADED_FILES.forEach(function (item, index, arr) {
      Loader.log('            -- ' + item);
    });
  }
}
module.exports = Loader;
