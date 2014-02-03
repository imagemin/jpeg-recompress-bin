'use strict';

var bin = require('./jpeg-recompress').bin;
var chalk = require('chalk');

bin.build(function (error) {
  if (error) {
    return console.log(chalk.red('✗ ' + error.message));
  }

  console.log(chalk.green('✓ jpeg-recompress built successfully'));
});