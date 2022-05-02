import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {execa} from 'execa';
import {temporaryDirectory} from 'tempy';
import binCheck from 'bin-check';
import binBuild from 'bin-build';
import compareSize from 'compare-size';
import jpegRecompress from '../index.js';

test('rebuild the jpeg-recompress binaries', async t => {
	if (process.platform === 'win32' || process.platform === 'linux') {
		t.pass('Build for win32 and linux is not supported');
		return;
	}

	const temporary = temporaryDirectory();
	const source = fileURLToPath(new URL('../vendor/source/jpeg-archive-2.2.0.tar.gz', import.meta.url));

	await binBuild.file(source, [
		`mkdir -p ${temporary}`,
		`make && mv jpeg-recompress ${path.join(temporary, 'jpeg-recompress')}`,
	]);

	t.true(fs.existsSync(path.join(temporary, 'jpeg-recompress')));
});

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(jpegRecompress, ['--version']));
});

test('minify a JPG', async t => {
	const temporary = temporaryDirectory();
	const src = fileURLToPath(new URL('fixtures/test.jpg', import.meta.url));
	const dest = path.join(temporary, 'test.jpg');
	const args = [
		'--quality',
		'high',
		'--min',
		'60',
		src,
		dest,
	];

	await execa(jpegRecompress, args);
	const result = await compareSize(src, dest);

	t.true(result[dest] < result[src]);
});
