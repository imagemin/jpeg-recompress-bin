'use strict';
const path = require('path');
const BinWrapper = require('bin-wrapper');

const url = 'https://github.com/imagemin/jpeg-recompress-bin/releases/latest/download/';

module.exports = new BinWrapper()
	.src(`${url}darwin-jpeg-recompress`, 'darwin')
	.src(`${url}linux-jpeg-recompress`, 'linux')
	.src(`${url}jpeg-recompress.exe`, 'win32')
	.dest(path.resolve(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'jpeg-recompress.exe' : `${process.platform}-jpeg-recompress`);
