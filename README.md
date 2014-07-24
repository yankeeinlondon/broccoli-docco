#broccoli-docco
*[Broccoli](https://github.com/joliss/broccoli) plugin for generating code documentation using [Docco](https://github.com/joliss/broccoli) styled documentation blocks*

## Installation ##

At the root of your development project type:

````bash
npm install broccoli-docco --save
````

## Usage
This plugin leverages the popular [Docco](http://jashkenas.github.io/docco/) documentation generator. The signature of the plugin is:

````js
var tree = docco(inputTree, options) { }
````

- Where the `inputTree` is either a broccoli tree or a string representing a directory which should be converted to a tree
- There are two options that can be specified currently -- *output* and *layout* -- see the example below for an illustration of their use


This plugin should be used in your `brocfile.js` in manner similar to this:

````js
var docco = require('broccoli-docco');
var docs  = docco('src', {
	output: 'docs', // this is the default value
	layout: 'parallel' // this is default value, values could also be 'linear' or 'classic'
});
module.exports = docs;
````

In the example above all supported document types in the `src` directory would be processed into HTML documentation in the `docs` directory using the `parallel` design layout.

## Code Documentation
It would be odd to write code that documents code and then *not* document it ... so if you want to see the resultant documented code you can find it here:

> [broccoli-docco](http://htmlpreview.github.io/?https://github.com/ksnyde/broccoli-docco/blob/master/docs/index.html)

----
Happy trails,

*Ken Snyder*