"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fs = require('fs');

var fsx = require('fs-extra');

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var bluzelleHandler = require('./bluzelle.js');

var nknHandler = require('./nkn.js');

var noiaHandler = require('./noia.js');

var iconHandler = require('./icon.js');

function builder(yargs) {
  return yargs.positional('plugin', {
    alias: 'p',
    type: 'string',
    describe: 'plugin name',
    require: true
  }).example('kaizen plugins uninstall bluzelle').example('kaizen plugins uninstall nkn').demandOption(['plugin'], '');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var plugin, kaizenJson;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            plugin = argv.plugin;
            _context.next = 4;
            return readKaizenJson();

          case 4:
            kaizenJson = _context.sent;

            if (plugin) {
              _context.next = 8;
              break;
            }

            Log.NormalLog('Missing plugin statement.\nPlease using \'kaizen plugins uninstall [plugin]\'');
            return _context.abrupt("return");

          case 8:
            if (!(fs.existsSync(path.resolve('./', 'package.json')) === false)) {
              _context.next = 11;
              break;
            }

            Log.NormalLog("Missing " + "'package.json'".yellow + ", please make sure you are in the project folder.");
            return _context.abrupt("return");

          case 11:
            _context.t0 = plugin;
            _context.next = _context.t0 === 'bluzelle' ? 14 : _context.t0 === 'nkn' ? 22 : _context.t0 === 'noia' ? 30 : _context.t0 === 'icon' ? 38 : 46;
            break;

          case 14:
            Log.NormalLog('Uninstalling plugin, please wait a second...');
            Spinner.start();
            _context.next = 18;
            return bluzelleHandler();

          case 18:
            updateKaizenJson(kaizenJson, 'bluzelle');
            Spinner.stop();
            Log.SuccessLog("Remove plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 47);

          case 22:
            Log.NormalLog('Uninstalling plugin, please wait a second...');
            Spinner.start();
            _context.next = 26;
            return nknHandler();

          case 26:
            updateKaizenJson(kaizenJson, 'nkn');
            Spinner.stop();
            Log.SuccessLog("Remove plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 47);

          case 30:
            Log.NormalLog('Uninstalling plugin, please wait a second...');
            Spinner.start();
            _context.next = 34;
            return noiaHandler();

          case 34:
            updateKaizenJson(kaizenJson, 'noia');
            Spinner.stop();
            Log.SuccessLog("Remove plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 47);

          case 38:
            Log.NormalLog('Uninstalling plugin, please wait a second...');
            Spinner.start();
            _context.next = 42;
            return iconHandler();

          case 42:
            updateKaizenJson(kaizenJson, 'icon');
            Spinner.stop();
            Log.SuccessLog("Remove plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 47);

          case 46:
            Log.NormalLog('Plugin not support yet');

          case 47:
            _context.next = 54;
            break;

          case 49:
            _context.prev = 49;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 54:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 49]]);
  }));
  return _handler.apply(this, arguments);
}

function readKaizenJson() {
  return new Promise(function (resolve, reject) {
    fsx.readJson(path.resolve('./', 'kaizen.json'), function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function updateKaizenJson(kaizenConfig, plugin) {
  var newKaizenConfig = _objectSpread({}, kaizenConfig, {
    plugins: kaizenConfig.plugins.filter(function (x) {
      x !== plugin;
    })
  });

  fsx.writeJson(path.resolve('./', 'kaizen.json'), newKaizenConfig);
}

module.exports = function (yargs) {
  var command = 'uninstall [plugin]';
  var commandDescription = 'Uninstall and remove a plugin to your project';
  yargs.command(command, commandDescription, builder, handler);
};