'use strict';

var execFile = require('child_process').execFile;
var path = require('path');
var binCheck = require('bin-check');
var compareSize = require('compare-size');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../'), ['--version'], function (err, works) {
		t.assert(!err, err);
		t.assert(works);
	});
});

test('minify a JPG', function (t) {
	t.plan(3);

	var src = path.join(__dirname, 'fixtures/test.jpg');
	var dest = path.join(tmp, 'test.jpg');
	var args = [
		'--quality', 'high',
		'--min', '60',
		src,
		dest
	];

	mkdirp.sync(tmp);
	execFile(require('../'), args, function (err) {
		t.assert(!err, err);

		compareSize(src, dest, function (err, res) {
			t.assert(!err, err);
			t.assert(res[dest] < res[src]);
			rimraf.sync(tmp);
		});
	});
});
