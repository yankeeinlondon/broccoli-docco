#broccoli-docco
*[Broccoli](https://github.com/joliss/broccoli) plugin for generating code documentation using [Docco](https://github.com/joliss/broccoli) styled documentation blocks*

> NOTE: this is still a WIP, please not for use just yet :)

## Installation ##

````bash
npm install --save-dev broccoli-docco

## Overview
This plugin leverages the popular [docco](http://jashkenas.github.io/docco/) documentation generator. This plugin can be used in your `brocfile.js` to identify tree's which should be documented. The primary method that will be exposed on this class is the `document` function:

````js
function document(inputTree, options) {  }
````

Usage would look something like:

````js
var docco = require('broccoli-docco').DoccoBroc;
docco.document('src');
````
	
In the example above this would look for all supported document types in the `src` directory and create documentation in the `docs` directory (the default location). In this example we simply put in a string representations of the source tree which is fine for single-homed tree's but there's nothing preventing you from targetting multiple homes.


## Options
**broccoli-docco**'s document method proxies the `options` hash to Docco. So you might have something like:

	var docco = require('broccoli-docco').DoccoBroc;
	var doccoOptions = {
		layout: 'parallel',
		output: 'docs',
		css: 'myCustomCSS.css'
	};
	docco.document('src', doccoOptions);
	
For more information about options parameteres refer to the [Docco documentation](http://jashkenas.github.io/docco/). 

## Code Documentation
It would be odd to write code that documents code and then *not* document it ... so if you want to see the resultant documented code you can find it here:

> [broccoli-docco](docs/index.html)

----
Happy trails,

*Ken Snyder*