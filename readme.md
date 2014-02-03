# [node-jpeg-recompress-bin](https://npmjs.org/package/jpeg-recompress-bin)

## About

jpeg-recompress (part of [JPEG Archive](https://github.com/danielgtaylor/jpeg-archive)) Node.js wrapper that optimize JPEG images.

> Compress JPEGs by re-encoding to the smallest JPEG quality while keeping perceived visual quality the same and by making sure huffman tables are optimized. This is a lossy operation, but the images are visually identical and it usually saves 30-70% of the size for JPEGs coming from a digital camera, particularly DSLRs. By default all EXIF/IPTC/XMP and color profile metadata is copied over, but this can be disabled to save more space if desired.

[![Build Status](https://travis-ci.org/1000ch/node-jpeg-recompress-bin.png?branch=master)](https://travis-ci.org/1000ch/node-jpeg-recompress-bin)
[![NPM version](https://badge.fury.io/js/jpeg-recompress-bin.png)](http://badge.fury.io/js/jpeg-recompress-bin)
[![Dependency Status](https://david-dm.org/1000ch/node-jpeg-recompress-bin.png)](https://david-dm.org/1000ch/node-jpeg-recompress-bin)
[![devDependency Status](https://david-dm.org/1000ch/node-jpeg-recompress-bin/dev-status.png)](https://david-dm.org/1000ch/node-jpeg-recompress-bin#info=devDependencies)

[![NPM](https://nodei.co/npm/jpeg-recompress-bin.png)](https://nodei.co/npm/jpeg-recompress-bin/)

## Dependency

It requires libjpeg (or libjpeg-turbo is recommended).

- https://github.com/danielgtaylor/jpeg-archive#building

### Ubuntu

```sh
$ sudo apt-get install build-essential libjpeg-turbo8 libjpeg-turbo8-dev
```

### Mac OS X

```sh
$ brew install libjpeg
```

## Install

```sh
$ npm install -g jpeg-recompress-bin
```

## Usage with Node.js

```js
var execFile = require('child_process').execFile;
var jpegRecompressPath = require('jpeg-recompress-bin').path;

execFile(jpegRecompressPath, ['--quality high', '--min 60', 'input.jpg', 'output.jpg'], function() {
  console.log('Image minified');
});
```

## License

This is MIT.
[JPEG Archive](https://github.com/danielgtaylor/jpeg-archive) is also licensed under [MIT](https://github.com/danielgtaylor/jpeg-archive#license).
