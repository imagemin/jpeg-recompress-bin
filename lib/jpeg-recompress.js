'use strict';

var Bin = require('bin-wrapper');
var path = require('path');

var options = {
  name: 'jpeg-recompress',
  bin: 'jpeg-recompress',
  path: path.join(__dirname, '../vendor'),
  url: 'https://raw.github.com/1000ch/node-jpeg-recompress-bin/master/vendor/osx/jpeg-recompress',
  src: 'https://github.com/danielgtaylor/jpeg-archive/archive/1.0.1.tar.gz',
  buildScript: 'make && mv ./jpeg-recompress ' + path.join(__dirname, '../vendor'),
  platform: {
    osx: {
      url: 'https://raw.github.com/1000ch/node-jpeg-recompress-bin/master/vendor/osx/jpeg-recompress'
    },
    linux: {
      url: 'https://raw.github.com/1000ch/node-jpeg-recompress-bin/master/vendor/linux/jpeg-recompress'
    },
    win: {
      url: 'https://raw.github.com/1000ch/node-jpeg-recompress-bin/master/vendor/win/jpeg-recompress.exe'
    }
  }
};
var bin = new Bin(options);

exports.bin = bin;
exports.options = options;
exports.path = bin.path;