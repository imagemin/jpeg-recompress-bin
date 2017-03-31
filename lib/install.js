'use strict';
const log = require('logalot');
const bin = require('.');

bin.run(['--version'], err => {
	if (err) {
		log.error(err.stack);
		return;
	}

	log.success('jpeg-recompress pre-build test passed successfully');
});
