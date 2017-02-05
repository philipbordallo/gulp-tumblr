# gulp-tumblr
> Better tumblr theming with gulp


## Install

With [**npm**](https://www.npmjs.com/package/gulp-tumblr):

```
npm install --save-dev gulp-tumblr
```


## Usage

```javascript
const gulp = require('gulp');
const tumblr = require('gulp-tumblr');

gulp.src(['./template.html'])
	.pipe(tumblr.preview())
	.pipe(gulp.dest('./export/'));
```

## Requirements

* A JSON file (`options.dataFile`) that has the variable data of what to show.

	Example: _data.json_

	```json
	{
		"Basic": {
			"Title": "Demo Theme",
			"MetaDescription": "This is a meta description",
			"Description": "This is a description",
			"BlogURL": "http://demo.tumblr.com/"
		},
		"Text": {
			"Title": "An example post",
			"Body": "<p>Lorem ipsum dolor sit amet, consectetuer <a target=\"_blank\" href=\"/\">adipiscing elit</a>. Aliquam nisi lorem, pulvinar id, commodo feugiat, vehicula et, mauris. Aliquam mattis porta urna. Maecenas dui neque, rhoncus sed, vehicula vitae, auctor at, nisi. Aenean id massa ut lacus molestie porta. Curabitur sit amet quam id libero suscipit venenatis.</p>\n\t<ul>\n\t\t<li>Lorem ipsum dolor sit amet.</li>\n\t\t<li>Consectetuer adipiscing elit. </li>\n\t\t<li>Nam at tortor quis ipsum tempor aliquet.</li>\n\t</ul>\n\t<p>Cum sociis <a target=\"_blank\" href=\"/\">natoque penatibus</a> et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse sed ligula. Sed volutpat odio non turpis gravida luctus. Praesent elit pede, iaculis facilisis, vehicula mattis, tempus non, arcu.</p>\n\t<blockquote>Donec placerat mauris commodo dolor. Nulla tincidunt. Nulla vitae augue.</blockquote>\n\t<p>Suspendisse ac pede. Cras <a target=\"_blank\" href=\"/\">tincidunt pretium</a> felis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque porttitor mi id felis. Maecenas nec augue. Praesent a quam pretium leo congue accumsan.</p>"
		},
		"Quote": {
			"Quote": "It does not matter how slow you go so long as you do not stop.",
			"Source": "Wisdom of <a target=\"_blank\" href=\"http://en.wikipedia.org/wiki/Confucius\">Confucius</a>",
			"Length": "short",
			"Tags": "wisdom"
		}
	}
	```

* A main template file that contains [Tumblr variables and blocks](https://www.tumblr.com/docs/en/custom_themes) and will be streamed in.

	Example: _template.html_

	```html
	<!DOCTYPE html>
	<html>
	<head>
		<title>{Title}</title>

		{block:Description}
			<meta name="description" content="{MetaDescription}" />
		{/block:Description}

		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
		<h1>{Title}</h1>
		<h2>{Description}</h2>

		{block:Posts}
			{block:Quote}{/block:Quote}
			{block:Text}{/block:Text}
		{/block:Posts}
	</body>
	</html>

	```

* A directory (`options.postFolder`) with individual templates for each post type.

	Example: _post/text.html_

	```html
	<!-- block:Text -->
		{block:Text}
		{block:Title}{Title}{/block:Title}
		{Body}
		{/block:Text}
	<!-- /block:Text -->
	```

	Example: _post/quote.html_

	```html
	<!-- block:Quote -->
		{block:Quote}
		<article>
			<blockquote class="{Length}">
				{Quote}
			</blockquote>

		</article>
		{block:Source}<div class="source">{Source}</div>{/block:Source}
		{/block:Quote}
	<!-- /block:Quote -->

	```

## API

### `.preview([options])`

Takes a file with [Tumblr variables and blocks](https://www.tumblr.com/docs/en/custom_themes) and streams out a compiled file with data taken from a JSON file and separate post files.

### `.build([options])`

Takes a file with [Tumblr variables and blocks](https://www.tumblr.com/docs/en/custom_themes) and streams out a compiled file with blocks from separate post files ready to be upload to Tumblr.

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
