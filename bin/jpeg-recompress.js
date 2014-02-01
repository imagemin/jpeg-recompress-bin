#!/usr/bin/env node
'use strict';

var binPath = require('../lib/jpeg-recompress').path;
var spawn = require('child_process').spawn;

spawn(binPath, process.argv.slice(2), {
  stdio: 'inherit'
}).on('exit', process.exit);