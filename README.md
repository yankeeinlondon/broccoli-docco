#broccoli-docco
*Broccoli plugin for generating code documentation*

## Overview
This plugin leverages the popular [docco](http://jashkenas.github.io/docco/) documentation generator. This plugin can be used in your `brocfile.js` to identify tree's which should be documented. The primary method that will be exposed on this class is the `document` function:

	function document(inputTree, outputTarget, options) {  }


Usage would look something like:

	var docco = require('broccoli-docco').DoccoBroc;
	docco.document('src','docs');
	
In the example above this would look for all supported document types in the `src` directory and create documentation in the `docs` directory. In this example we simply put in a string representations of the source tree which is fine for single-homed tree's but there's nothing preventing you from targetting multiple homes.

## Configuration
Docco provides configuration via an `options` hash which you have access to on the **document** function which proxies this hash as an offset to it's own **options** hash: 

	var docco = require('broccoli-docco').DoccoBroc;
	var doccoOptions = {
		layout: 'parallel',
		output: 'docs',
		css: 'myCustomCSS.css'
	};
	docco.document('src','docs',{docco: doccoOptions});
	
This allows for other options -- besides just proxying the Docco options hash -- but at the current release there are no other options that are used.

## Code Documentation
It would be odd to write code that documents code and then *not* document it ... so if you want to see the resultant documented code you can find it here:

> [broccoli-docco](docs/index.html)

----
Happy trails,

*Ken Snyder*