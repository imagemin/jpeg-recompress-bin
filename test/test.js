/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
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

  it('should return path to binary and verify that it is working', function (callback) {
    var binPath = require('../').path;

    binCheck(binPath, ['--version'], function (error, works) {
      assert(!error);
      assert.equal(works, true);
      callback();
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

    execFile(binPath, args, function (error) {
      var src = fs.statSync(path.join(__dirname, 'fixtures/test.jpg')).size;
      var dest = fs.statSync(path.join(__dirname, 'tmp/test.jpg')).size;

      assert(!error);
      assert(dest < src);
      callback();
    });
  });
});
