'use strict';

var bin = require('./');
var logSymbols = require('log-symbols');

/**
 * Install binary and check whether it works.
 * If the test fails, try to build it.
 */

bin.run(['--version'], function (err) {
  if (err) {
    return console.log(logSymbols.warning + ' pre-build test failed');
  }

  console.log(logSymbols.success + ' pre-build test passed successfully!');
});
