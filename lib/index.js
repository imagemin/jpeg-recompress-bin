import fs from 'node:fs';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import BinWrapper from 'bin-wrapper';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const url = `https://raw.github.com/imagemin/jpeg-recompress-bin/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}osx/jpeg-recompress`, 'darwin')
	.src(`${url}linux/jpeg-recompress`, 'linux')
	.src(`${url}win/jpeg-recompress.exe`, 'win32')
	.dest(fileURLToPath(new URL('../vendor', import.meta.url)))
	.use(process.platform === 'win32' ? 'jpeg-recompress.exe' : 'jpeg-recompress');

export default binWrapper;
