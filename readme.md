# jpeg-recompress-bin ![GitHub Actions Status](https://github.com/imagemin/jpeg-recompress-bin/workflows/test/badge.svg?branch=main)

> Compress JPEGs by re-encoding to the smallest JPEG quality while keeping perceived visual quality the same and by making sure huffman tables are optimized

You probably want [`imagemin-jpeg-recompress`](https://github.com/imagemin/imagemin-jpeg-recompress) instead.


## Install

```
$ npm install --save jpeg-recompress-bin
```


## Usage

```js
import {execFile} from 'node:child_process';
import jpegRecompress from 'jpeg-recompress-bin';

execFile(jpegRecompress, ['--quality high', '--min 60', 'input.jpg', 'output.jpg'], error => {
	console.log('Image minified');
});
```


## CLI

```
$ npm install --global jpeg-recompress-bin
```

```
$ jpeg-recompress --help
```


## License

MIT © [Imagemin](https://github.com/imagemin)
