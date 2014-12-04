'use strict';

var bin = require('./');
var log = require('logalot');

/**
 * Install binary and check whether it works
 */

bin.run(['--version'], function (err) {
	if (err) {
		log.error(err.stack);
		return;
	}

	log.success('jpeg-recompress pre-build test passed successfully');
});
