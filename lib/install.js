import process from 'node:process';
import {fileURLToPath} from 'node:url';
import binBuild from 'bin-build';
import bin from './index.js';

bin.run(['--version']).then(() => {
	console.log('jpeg-recompress pre-build test passed successfully');
}).catch(async error => {
	console.warn(error.message);
	console.warn('jpeg-recompress pre-build test failed');

	if (process.platform === 'win32' || process.platform === 'linux') {
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}

	console.info('compiling from source');

	try {
		const source = fileURLToPath(new URL('../vendor/source/jpeg-archive-2.2.0.tar.gz', import.meta.url));

		await binBuild.file(source, [
			`mkdir -p ${bin.dest()}`,
			`make && mv ${bin.use()} ${bin.path()}`,
		]);

		console.log('jpeg-recompress built successfully');
	} catch (error) {
		console.error(error.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	}
});
