# gulp-tumblr
> Better tumblr theming with gulp

## Usage

```javascript
const gulp = require('gulp');
const tumblr = require('gulp-tumblr');

gulp.src(['./template.html'])
	.pipe(tumblr.preview())
	.pipe(gulp.dest('./export/'));
```

## API

### `.preview([options])`

Takes a file with [Tumblr variables and blocks](https://www.tumblr.com/docs/en/custom_themes) and streams out a compiled file with data taken from a json file and separate post files.

### `.build([options])`

Takes a file with [Tumblr variables and blocks](https://www.tumblr.com/docs/en/custom_themes) and streams out a compiled file with blocks from separate post files.

#### `options`

Type: `object`

#### `options.dataFile`

Type: `string`  
Default: `'./data.json'`;

Location of json file that stores variable data.

#### `options.postFolder`

Type: `string`  
Default: `'./post/'`;

Location of folder that holds individual post files.
