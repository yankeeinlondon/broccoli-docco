'use strict';
// ![ ](broccoli.png)
// ##Brocfile##
// this `Brocfile` is used by the *broccoli-docco* unit tests

var docco = require('./index.js'),
	pickFiles = require('broccoli-static-compiler'),
	mergeTrees = require('broccoli-merge-trees');

// Add the Brocfile to the output of the test
var rootJs = pickFiles('.',{
	srcDir: '/',
	files: ['Brocfile.js'],
	destDir: '/'
});
// Primary output is the contents of the fixtures directory
var source = 'fixtures';
var documents = docco(mergeTrees([source,rootJs]));

module.exports = documents;