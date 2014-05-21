'use strict';

var BinBuild = require('bin-build');
var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/**
 * Initialize a new BinWrapper
 */
var bin = new BinWrapper()
  .src('https://raw.github.com/1000ch/node-jpeg-recompress-bin/master/vendor/osx/jpeg-recompress', 'darwin')
  .src('https://raw.github.com/1000ch/node-jpeg-recompress-bin/master/vendor/linux/jpeg-recompress', 'linux')
  .src('https://raw.github.com/1000ch/node-jpeg-recompress-bin/master/vendor/win/jpeg-recompress.exe', 'win32')
  .dest(path.join(__dirname, 'vendor'))
  .use('jpeg-recompress');

/**
 * Only run check if binary doesn't already exist
 */
fs.exists(bin.use(), function (exists) {
  if (!exists) {
    bin.run(['--version'], function (err) {
      if (err) {
        console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

        var builder = new BinBuild()
          .src('https://github.com/danielgtaylor/jpeg-archive/archive/1.0.1.zip')
          .make('make && mkdir -p ' + bin.dest() + ' && mv ./jpeg-recompress ' + bin.use());

        return builder.build(function (error) {
          if (error) {
            return console.log(chalk.red('✗ ' + error));
          }

          console.log(chalk.green('✓ jpeg-recompress built successfully'));
        });
      }

      console.log(chalk.green('✓ pre-build test passed successfully'));
    });
  }
});

/**
 * Module exports
 */
module.exports.path = bin.use();
