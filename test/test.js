'use strict';
const fs = require('fs');
const path = require('path');
const test = require('ava');
const execa = require('execa');
const tempy = require('tempy');
const binCheck = require('bin-check');
const binBuild = require('bin-build');
const compareSize = require('compare-size');
const jpegRecompress = require('..');

test('rebuild the jpeg-recompress binaries', async t => {
	if (process.platform === 'win32' || process.platform === 'linux') {
		t.pass('Build for win32 and linux is not supported');
		return;
	}

	const temporary = tempy.directory();

	await binBuild.file(path.resolve(__dirname, '../vendor/source/jpeg-archive-2.2.0.tar.gz'), [
		`mkdir -p ${temporary}`,
		`make && mv jpeg-recompress ${path.join(temporary, 'jpeg-recompress')}`
	]);

	t.true(fs.existsSync(path.join(temporary, 'jpeg-recompress')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(jpegRecompress, ['--version']));
});

test('minify a JPG', async t => {
	const temporary = tempy.directory();
	const src = path.join(__dirname, 'fixtures/test.jpg');
	const dest = path.join(temporary, 'test.jpg');
	const args = [
		'--quality',
		'high',
		'--min',
		'60',
		src,
		dest
	];

	await execa(jpegRecompress, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
