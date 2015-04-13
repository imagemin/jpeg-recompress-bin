'use strict';

var BinWrapper = require('bin-wrapper');
var path = require('path');
var pkg = require('../package.json');

var BASE_URL = 'https://raw.github.com/imagemin/jpeg-recompress-bin/v' + pkg.version + '/vendor/';

var bin = new BinWrapper({ progress: false })
	.src(BASE_URL + 'osx/jpeg-recompress', 'darwin')
	.src(BASE_URL + 'linux/jpeg-recompress', 'linux')
	.src(BASE_URL + 'win/jpeg-recompress.exe', 'win32')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'jpeg-recompress.exe' : 'jpeg-recompress');

module.exports = bin;
