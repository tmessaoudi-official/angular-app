const fs = require('fs');
let dotenv = require('dotenv');

let Loader = {
  load: function (fileName = './.env', included = '') {
    if (typeof fileName !== 'string' || fileName === '') {
      fileName = './.env';
    }
    if (typeof included !== 'string' || included === '') {
      included = false;
    }
    try {
      if (Object.keys(Loader.data.APP_ENV_FILES_ALL_LOADED.included).includes(fileName)) {
        console.warn('File \'' + fileName + '\' already loaded !!');
        return;
      }
      // eslint-disable-next-line max-len
      const envIncludes = Loader.populate(dotenv.parse(fs.readFileSync(fileName), {debug: Loader.handlers.processors.boolean.isTrue(process.env.NODE_DEBUG)}), fileName);
      Loader.debug.status.debugFileLoad(fileName, 'success', included);
      //Loader.log('Loaded ' + fileName + ' vars successfully !!', 'info');
      Loader.include(envIncludes, fileName);
    } catch (exception) {
      //Loader.log('there was an exception loading ' + fileName + ' vars !!', 'error');
      Loader.debug.status.debugFileLoad(fileName, 'failure', included, exception);
      //Loader.log(exception);
    }
  },
  debug: {
    status: {
      debugFileLoad: function (fileName, status, parent, exception = false) {
        if (typeof exception === 'undefined' || exception === null) {
          exception = false;
        }
        if (!Object.keys(Loader.data.APP_ENV_FILES_ALL_LOADED.used).includes(fileName)) {
          Loader.data.APP_ENV_FILES_ALL_LOADED.used[fileName] = {status: status, from: parent, error: exception};
        }
        if (parent !== '' && parent !== false) {
          if (!Loader.data.APP_ENV_FILES_ALL_LOADED.used.includes(fileName)) {
            Loader.data.APP_ENV_FILES_ALL_LOADED.included[fileName] = Loader.data.APP_ENV_FILES_ALL_LOADED.used[fileName];
          }
        }
      }
    },
    canDebug: function () {
      // eslint-disable-next-line max-len
      return Loader.handlers.processors.boolean.isTrue(process.env.NODE_DEBUG) && (!Loader.handlers.processors.boolean.isFalse(process.env.NODE_DEBUG_FORCE) || typeof process.env.NODE_DEBUG_FORCE !== 'string')
    }
  },
  include: function (includes, parentFile) {
    if (typeof parentFile !== 'string' || parentFile === '') {
      parentFile = '';
    }
    if (typeof includes === 'string' && includes !== '') {
      includes.split(',').forEach(function (item, index) {
        item = item.replace('${NODE_ENV}', Loader.unquote.value(process.env.NODE_ENV));
        if (item === parentFile) {
          console.error('Circular reference detected, file \'' + item + '\' trying to include itself !!');
          process.exit(1);
        }
        Loader.load(item, parentFile);
      });
    }
  },
  populate: function (data, fileName = '') {
    if (typeof fileName !== 'string' || fileName === '') {
      fileName = '';
    }
    let keys = Object.keys(data);
    let envIncludes = '';
    Object.values(data).forEach(function (item, index) {
      if (!Loader.data.APP_ENV_KEYS.includes(keys[index])) {
        Loader.data.APP_ENV_KEYS.push(keys[index]);
      }
      if (keys[index] === 'env_includes') {
        envIncludes = item;
      } else {
        let handlers = Loader.handlers.getHandlers(item);
        if (typeof handlers.handlers !== 'undefined' && handlers.handlers.indexOf('process.env.get') !== -1) {
          // eslint-disable-next-line max-len
          let newHandlers = handlers.handlers.replace('|process.env.get', '').replace('process.env.get|', '').replace('process.env.get', '');
          if (newHandlers !== '') {
            newHandlers += ':';
          }
          if (handlers.unHandledValue === '~APP_PROCESS_ENV_INCLUDES') {
            // eslint-disable-next-line max-len
            item = typeof process.env[handlers.unHandledValue.replace('~', '')] === 'string' ? process.env[handlers.unHandledValue.replace('~', '')] : '';
          } else {
            // eslint-disable-next-line max-len
            item = newHandlers + (typeof process.env[handlers.unHandledValue] !== 'undefined' && process.env[handlers.unHandledValue] !== null ? process.env[handlers.unHandledValue] : 'environment.processors.empty:' + process.env[handlers.unHandledValue]);
          }
        }
        if (typeof item === 'undefined' || item === null) {
          process.env[keys[index]] = 'environment.processors.empty:' + item;
        } else if (Loader.handlers.processors.boolean.isBoolean(item)) {
          process.env[keys[index]] = Loader.handlers.processors.boolean.getValue(item);
        } else {
          process.env[keys[index]] = Loader.quote.value(item);
        }
      }
    });

    return envIncludes;
  },
  quote: {
    all: function () {
      Loader.data.APP_ENV_KEYS.forEach(function (item, index, arr) {
        process.env[item] = Loader.quote.value(process.env[item]);
      });
    },
    value: function (value) {
      if (typeof value === 'string') {
        const regex = new RegExp(
          // eslint-disable-next-line max-len
          '^([\'\"])(.*)([\'\"])$',
          'ig');
        const matches = regex.exec(value);
        if (matches === null) {
          if (value.indexOf('"') !== -1) {
            value = '\'' + value + '\'';
          } else {
            value = '"' + value + '"';
          }
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
    APP_ENV_FILES_ALL_LOADED: {
      included: [],
      used: []
    },
  },
  log: function (message, format = 'log') {
    if (typeof format !== 'string' || format === '') {
      format = 'log';
    }
    // eslint-disable-next-line max-len
    if (Loader.debug.canDebug()) {
      switch (format) {
        case 'warn': {
          console.warn(message);
          break;
        }
        case 'info': {
          console.warn(message);
          break;
        }
        case 'error': {
          console.error(message);
          break;
        }
        case 'log':
        default: {
          console.log(message);
        }
      }
    }
  },
  run: function (nodeEnv = '', force = false) {
    if (typeof nodeEnv !== 'string' || nodeEnv === '') {
      nodeEnv = '';
    }
    if (typeof force !== 'boolean') {
      force = false;
    }
    if (typeof process.env.APP_ENV_FORCE_REBUILD == 'string' && process.env.APP_ENV_FORCE_REBUILD === 'true') {
      force = true;
    }
    if (!force) {
      try {
        if (fs.existsSync('./.env.local.build')) {
          Loader.load('./.env.local.build');
          Loader.log('using generated file ./.env.local.build', 'warn');
          return;
        }
      } catch(err) {
        console.error(err)
      }
    }
    Loader.load();
    Loader.load('./.env.local');

    if (nodeEnv !== '') {
      Loader.load('./.env.' + Loader.unquote.value(nodeEnv) );
      Loader.load('./.env.' + Loader.unquote.value(nodeEnv)  + '.local');
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
        if (typeof process.env[item] === 'undefined' || process.env[item] === 'undefined' || process.env[item] === null) {
          process.env[item] = 'environment.processors.empty:' + process.env[item];
        }
      });
    }
    Loader.include(Loader.unquote.value(process.env['process_env_includes']));
    Loader.log(' ***** Environment : ');
    Loader.data.APP_ENV_KEYS.forEach(function (item, index, arr) {
      Loader.log('    - ' + item);
      Loader.log('        ** : \'' + process.env[item] + '\'');
      Loader.log('        ** type : ' + typeof process.env[item]);
    });
    Loader.log('     ----- All Used Files : ');
    Object.keys(Loader.data.APP_ENV_FILES_ALL_LOADED.used).forEach(function (item, index, arr) {
      // eslint-disable-next-line max-len
      Loader.log('            -- ' + item + ' : ' + Loader.data.APP_ENV_FILES_ALL_LOADED.used[item].status + (Loader.data.APP_ENV_FILES_ALL_LOADED.used[item].from !== false ? (' , included by : ' + Loader.data.APP_ENV_FILES_ALL_LOADED.used[item].from) : ''), 'warn');
    });
    Loader.log('     ----- Includes : ');
    Object.keys(Loader.data.APP_ENV_FILES_ALL_LOADED.included).forEach(function (item, index, arr) {
      // eslint-disable-next-line max-len
      Loader.log('            -- ' + item + ' : ' + Loader.data.APP_ENV_FILES_ALL_LOADED.included[item].status + ' , included by : ' + Loader.data.APP_ENV_FILES_ALL_LOADED.included[item].from, 'warn');
    });
  }
}

if (typeof process.env.APP_ENV_RUN_BUILD == 'string' && process.env.APP_ENV_RUN_BUILD === 'true') {
  try {
    fs.unlinkSync('./.env.local.build');
  } catch(err) {
  }
  if (typeof process.env.NODE_ENV_FORCE === 'string' && process.env.NODE_ENV_FORCE !== '') {
    process.env.NODE_ENV = process.env.NODE_ENV_FORCE;
  }
  // eslint-disable-next-line max-len
  Loader.run(typeof process.env.NODE_ENV_FORCE === 'string' && process.env.NODE_ENV_FORCE !== '' ? process.env.NODE_ENV_FORCE : (typeof process.env.NODE_ENV === 'string' && process.env.NODE_ENV !== '' ? process.env.NODE_ENV : ''), (typeof process.env.APP_ENV_FORCE_REBUILD === 'undefined' || (typeof process.env.APP_ENV_FORCE_REBUILD === 'string' && (process.env.APP_ENV_FORCE_REBUILD === '' || process.env.APP_ENV_FORCE_REBUILD === 'true'))));
  let data = '';
  Loader.data.APP_ENV_KEYS.forEach(function (item, index, arr) {
    if (item !== 'env_includes' && item !== 'process_env_includes') {
      data += item + '=' + process.env[item] + '\n';
    } else {
      data += item + '=\n';
    }
  });
  fs.writeFile('./.env.local.build', data, function (err) {
    if (err) return console.log(err);
    console.log('Generated env created succussfully ./.env.local.build');
  });
}
module.exports = Loader;
