"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var Spinner = require('../../../lib/Spinner');

var Log = require('../../../lib/Log');

require('colors');

function builder(yargs) {
  return yargs.option('key', {
    alias: 'k',
    type: 'string',
    describe: 'Configuration key',
    choices: ['privateKey', 'provider', 'networkId']
  }).example('kaizen config unset --key provider').demandOption(['key'], '');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var key, kaizenrc, configuration;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              key = argv.key;
              Spinner.start();
              kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
              configuration = _objectSpread({}, kaizenrc, _defineProperty({}, key, ''));
              fsx.writeJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'), configuration);
              Spinner.stop(); //Log.SuccessLog('Unset config successfully');

              Log.NormalLog('Unset ' + key.yellow + ' success');
            } catch (error) {
              Spinner.stop();
              Log.ErrorLog('something went wrong!');
              console.error(error);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'unset';
  var commandDescription = 'Unset config variable';
  yargs.command(command, commandDescription, builder, handler);
};