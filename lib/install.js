'use strict';

var bin = require('./');
var logSymbols = require('log-symbols');

/**
 * Install binary and check whether it works
 */

bin.run(['--version'], function (err) {
	if (err) {
		console.log(logSymbols.warning + ' pre-build test failed');
		return;
	}

	console.log(logSymbols.success + ' pre-build test passed successfully!');
});
