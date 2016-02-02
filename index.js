'use strict';

const fs = require('fs');
const Transform = require('readable-stream/transform');

const PLUGIN_NAME = 'gulp-tumblr';

const blocks = {
	all: /{\/?block:\w+}/gm,
	generic: /{\/?block:(Description|ShowDescription)}/gm
};

function action(act, file, options) {
	options = options || {};
	options.dataFile = options.dataFile || './data.json';
	options.postFolder = options.postFolder || './post/';

	let data = JSON.parse(fs.readFileSync(options.dataFile, 'utf8'));
	let chunk = String(file.contents);

	Object.keys(data).forEach(post => {
		if (post === 'Basic') {
			if (act === 'preview') chunk = chunk.replace(blocks.generic, '');
		}
		else {
			let postTemplate = fs.readFileSync(`${options.postFolder + post.toLowerCase()}.html`, 'utf-8');
			let regexBlock = new RegExp(`{block:${post}}{/block:${post}}`, 'gm');

			if (act === 'preview') postTemplate = postTemplate.replace(blocks.all, '');
			chunk = chunk.replace(regexBlock, postTemplate);
		}

		if (act === 'preview') {
			Object.keys(data[post]).forEach(item => {
				let regex = new RegExp(`{${item}}`, 'gm');
				chunk = chunk.replace(regex, data[post][item]);
			});
		}
	});

	return chunk;
}

module.exports.preview = function preview(options) {
	return new Transform({
		objectMode: true,

		transform: (file, encoding, next) => {
			file.contents = new Buffer(action('preview', file, options));
			next(null, file);
		}
	});
};

module.exports.build = function build(options) {
	return new Transform({
		objectMode: true,

		transform: (file, encoding, next) => {
			file.contents = new Buffer(action('build', file, options));
			next(null, file);
		}
	});
};
