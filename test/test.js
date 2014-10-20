'use strict';

var binCheck = require('bin-check');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var test = require('ava');
var tmp = path.join(__dirname, 'tmp');

test('return path to binary and verify that it is working', function (t) {
	t.plan(2);

	binCheck(require('../').path, ['--version'], function (err, works) {
		t.assert(!err);
		t.assert(works);
	});
});

test('minify a JPG', function (t) {
	t.plan(4);

	var args = [
		'--quality', 'high',
		'--min', '60',
		path.join(__dirname, 'fixtures/test.jpg'),
		path.join(tmp, 'test.jpg')
	];

	execFile(require('../').path, args, function (err) {
		t.assert(!err);

		fs.stat(path.join(__dirname, 'fixtures/test.jpg'), function (err, a) {
			t.assert(!err);

			fs.stat(path.join(tmp, 'test.jpg'), function (err, b) {
				t.assert(!err);
				t.assert(b.size < a.size);
			});
		});
	});
});
