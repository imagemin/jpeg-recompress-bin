'use strict';
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const compareSize = require('compare-size');
const jpegRecompress = require('..');

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(jpegRecompress, ['--version']));
});

test('minify a JPG', async t => {
	const tmp = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.jpg');
	const dest = path.join(tmp, 'test.jpg');
	const args = [
		'--quality',
		'high',
		'--min',
		'60',
		src,
		dest
	];

	await execa(jpegRecompress, args);
	const res = await compareSize(src, dest);

	t.true(res[dest] < res[src]);
});
