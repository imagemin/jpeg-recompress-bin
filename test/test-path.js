'use strict';

var assert = require('assert');
var execFile = require('child_process').execFile;
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');

describe('jpeg-recompress()', function () {
  this.timeout(0);

  after(function () {
    fs.unlinkSync('test/fixtures/minified.jpg');
  });

  it('should return path to jpeg-recompress binary', function (callback) {
    var binPath = require('../lib/jpeg-recompress').path;

    execFile(binPath, ['-h'], function (err, stdout, stderr) {
      assert(stdout.toString().indexOf('jpeg-recompress') !== -1);
      callback();
    });
  });

  it('should successfully proxy jpeg-recompress', function (callback) {
    var binPath = path.join(__dirname, '../bin/jpeg-recompress.js');

    execFile('node', [binPath, '-h'], function (err, stdout, stderr) {
      assert(stdout.toString().indexOf('jpeg-recompress') !== -1);
      callback();
    });
  });

  it('should minify a .png', function (callback) {
    var binPath = path.join(__dirname, '../bin/jpeg-recompress.js');
    var args = [
      //'-m',
      //'-y',
      //'--iterations=500',
      //'--splitting=3',
      //'--filters=01234mepb',
      //'--lossy_8bit',
      //'--lossy_transparent',
      path.join(__dirname, 'fixtures', 'test.jpg'),
      path.join(__dirname, 'fixtures', 'minified.jpg')
    ];

    exec('node ' + [binPath].concat(args).join(' '), function () {
      var actual = fs.statSync('test/fixtures/minified.jpg').size;
      var original = fs.statSync('test/fixtures/test.jpg').size;

      assert(actual < original);
      callback();
    });
  });
});