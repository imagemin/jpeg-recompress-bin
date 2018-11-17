'use strict';
const log = require('logalot');
const bin = require('.');

bin.run(['--version']).then(() => {
	log.success('jpeg-recompress pre-build test passed successfully');
}).catch(error => {
	log.error(error.stack);
});
