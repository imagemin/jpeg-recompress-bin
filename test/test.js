/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var rm = require('rimraf');

describe('jpegRecompress()', function () {
  afterEach(function (callback) {
    rm(path.join(__dirname, 'tmp'), callback);
  });

  beforeEach(function () {
    fs.mkdirSync(path.join(__dirname, 'tmp'));
  });

  it('should rebuild the jpeg-recompress binaries', function (callback) {
    var tmp = path.join(__dirname, 'tmp');
    var builder = new BinBuild()
      .src('https://github.com/danielgtaylor/jpeg-archive/archive/1.0.1.zip')
      .make('make && mv ./jpeg-recompress ' + path.join(tmp, 'jpeg-recompress'));

    builder.build(function (error) {
      assert(!error);
      assert(fs.existsSync(path.join(tmp, 'jpeg-recompress')));
      callback();
    });
  });

  it('should return path to binary and verify that it is working', function (callback) {
    var binPath = require('../').path;

    binCheck(binPath, ['--version'], function (error, works) {
      callback(assert.equal(works, true));
    });
  });

  it('should minify a JPEG', function (callback) {
    var binPath = require('../').path;
    var args = [
      '--quality',
      'high',
      '--min',
      '60',
      path.join(__dirname, 'fixtures/test.jpg'),
      path.join(__dirname, 'tmp/test.jpg')
    ];

    execFile(binPath, args, function () {
      var src = fs.statSync(path.join(__dirname, 'fixtures/test.jpg')).size;
      var dest = fs.statSync(path.join(__dirname, 'tmp/test.jpg')).size;

      callback(assert(dest < src));
    });
  });
});