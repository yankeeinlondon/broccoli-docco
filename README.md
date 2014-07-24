#broccoli-docco
*[Broccoli](https://github.com/joliss/broccoli) plugin for generating code documentation using [Docco](https://github.com/joliss/broccoli) styled documentation blocks*

## Installation ##

At the root of your development project type:

````bash
npm install broccoli-docco --save
````

## Usage
This plugin leverages the popular [Docco](http://jashkenas.github.io/docco/) documentation generator. This plugin can be used in your `brocfile.js` to identify tree's which should be documented. 
Usage in the Brocfile would look something like:

````js
var docco = require('broccoli-docco');
docco.document('src', {
	output: 'docs', // this is the default value
	layout: 'parallel' // this is default value, values could also be 'linear' or 'classic'
});
````

In the example above this would look for all supported document types in the `src` directory and create documentation in the `docs` directory using the "parallel" design layout. 

> **Note**: as of this release we are allowing Docco to generate the documentation directory (which is probably a good thing) but we're being a bad plugin by *not* passing a tree back to Broccoli so 
> no further processing in Broccoli is possible. This will be fixed in a future release (or feel free to send me a PR).

## Code Documentation
It would be odd to write code that documents code and then *not* document it ... so if you want to see the resultant documented code you can find it here:

> [broccoli-docco](http://htmlpreview.github.io/?https://github.com/ksnyde/broccoli-docco/blob/master/docs/index.html)

----
Happy trails,

*Ken Snyder*