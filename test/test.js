'use strict';

var binCheck = require('bin-check');
var compareSize = require('compare-size');
var execFile = require('child_process').execFile;
var mkdir = require('mkdirp');
var path = require('path');
var rm = require('rimraf');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../'), ['--version'], function (err, works) {
		t.assert(!err);
		t.assert(works);
	});
});

test('minify a JPG', function (t) {
	t.plan(5);

	var src = path.join(__dirname, 'fixtures/test.jpg');
	var dest = path.join(tmp, 'test.jpg');
	var args = [
		'--quality', 'high',
		'--min', '60',
		src,
		dest
	];

	mkdir(tmp, function (err) {
		t.assert(!err, err);

		execFile(require('../'), args, function (err) {
			t.assert(!err, err);

			compareSize(src, dest, function (err, res) {
				t.assert(!err, err);
				t.assert(res[dest] < res[src]);

				rm(tmp, function (err) {
					t.assert(!err, err);
				});
			});
		});
	});
});
