# mozjpeg-bin [![Build Status](https://secure.travis-ci.org/imagemin/mozjpeg-bin.svg?branch=master)](http://travis-ci.org/imagemin/mozjpeg-bin)

> Compress JPEGs by re-encoding to the smallest JPEG quality while keeping perceived visual quality the same and by making sure huffman tables are optimized


## Install

```sh
$ npm install --save jpeg-recompress-bin
```


## Usage

```js
var execFile = require('child_process').execFile;
var jpegRecompress = require('jpeg-recompress-bin').path;

execFile(jpegRecompress, ['--quality high', '--min 60', 'input.jpg', 'output.jpg'], function (err) {
	if (err) {
		throw err;
	}

	console.log('Image minified');
});
```


## CLI

```sh
$ npm install --global jpeg-recompress-bin
```

```sh
$ jpeg-recompress --help
```


## License

MIT © [imagemin](https://github.com/imagemin)
