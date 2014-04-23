'use strict';

var assert = require('assert');
var Bin = require('bin-wrapper');
var fs = require('fs');
var options = require('../lib/jpeg-recompress').options;
var path = require('path');

describe('jpeg-recompress.build()', function () {
  it('should rebuild the jpeg-recompress binaries', function (callback) {
    this.timeout(false);
    var bin = new Bin(options);

    bin.path = path.join(__dirname, '../vendor', bin.bin);
    bin.buildScript = 'make && mv ./jpeg-recompress ' + path.join(__dirname, '../vendor/jpeg-recompress');

    bin.build(function () {
      var origCTime = fs.statSync(bin.path).ctime;
      var actualCTime = fs.statSync(bin.path).ctime;

      assert(actualCTime !== origCTime);
      callback();
    });
  });
});