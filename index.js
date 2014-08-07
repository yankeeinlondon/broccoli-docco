// ![ ](docco.png)
// #broccoli-docco plugin 
// > a subclass of [broccoli-writer](https://github.com/broccolijs/broccoli-writer) 
//
// *Auto-generate documentation for your code, leveraging the Broccoli build pipeline and the [Docco](http://jashkenas.github.io/docco/) documentation generator*
var 
	Writer = require('broccoli-writer'),
	fs = require('fs'),
	path = require('path'),
	pickFiles = require('broccoli-static-compiler'),
	RSVP = require('rsvp'),
	spawn = require('child_process').spawn,
	debug = require('debug')('broccoli:docco');

// ##Class Prototype##
// Parameters:
// 
// - `inputTree` - the input tree that is being processed
// - `options` - an options hash to configure behaviour, key hash options include:
//      - `destDir` - the base directory to write the documentation to; defaults to '/docs'
//      - `docco` - the Docco package provides an options hash which is proxied to this property
function DoccoWriter(inputTree, options) {
	'use strict';

	if (!(this instanceof DoccoWriter)) {
		return new DoccoWriter(inputTree, options);
	}
  
	if (typeof inputTree === 'string') {
		debug('Input tree is a string, converting to tree');
		this.inputTree = pickFiles(inputTree, {
			srcDir: '/',
			destDir: '/'
		});
	} else {
		this.inputTree = inputTree; // assumed to be a tree object
	}
	/* TODO: make this defaulting pattern prettier ... must be a common way of doing this in JS-land */
	options = options || {};
	this.settings = {};
	this.settings.output = options.hasOwnProperty('output') ? options.output : 'docs';
	this.settings.layout = options.hasOwnProperty('layout') ? options.layout : 'parallel'; // built-in are 'parallel','linear', or 'classic'
	
	debug('settings are ', this.settings);
}

// Extends `broccoli-writer` class
DoccoWriter.prototype = Object.create(Writer.prototype);
DoccoWriter.prototype.constructor = DoccoWriter;
DoccoWriter.prototype.description = 'Docco documentation generator';
// Modules Export
module.exports = DoccoWriter;

// ##getFiles##
// helper function which gets the full path to all files in given directory (and subdirectories)
function getFiles(dir,files_) {
	'use strict';
    files_ = files_ || [];
    if (typeof files_ === 'undefined') {
		files_=[];
	}
    var files = fs.readdirSync(dir);
	debug('Processing change; files include: ', files);
    for(var i in files){
        if (!files.hasOwnProperty(i)) { 
			continue;
		}
        var name = dir+'/'+files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name,files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

// ## write ##
// extending the broccoli-writer's required `write` method
DoccoWriter.prototype.write = function(readTree, destDir) {
	'use strict';
	var self = this;
	debug('Options:', destDir);
	// wait for event/file change and then respond
	return readTree(this.inputTree).then(function (srcDir) {
		// return a promise to Broccoli so that it waits for the async processes to complete 
		return new RSVP.Promise(function(resolve,reject) {
			debug('Operating directory: ' + path.resolve('.'));
			debug('Source directory: ' + srcDir);
			// get all files in the temporary directories/subdirectories
			// that broccoli has created for us
			var files = getFiles(srcDir); 
			// Set Docco params
			var doccoParams = [
				// > **Docco Output**
				// Output is all directed to the Broccoli temporary directory which has been given to us
				// so that it will be available as a tree in the downstream broccoli processing
				'-o', path.join(destDir, self.settings.output), 
				// > **Docco Layout**
				// setting the layout is a macro design change for the resultant design documentation
				'-l', self.settings.layout
			// > **File(s)**
			// The final input to Docco is an array of files that are to be processed into documentation
			].concat(files);
			// spawn a child process of docco (*using local npm install*)
			debug('Docco parameters:\n', doccoParams);
			var doccoCmd = spawn(path.join(__dirname,'node_modules/.bin/docco'), doccoParams);
			// Listen for docco's completion
			doccoCmd.on('exit', function() {
				resolve();
			});
			// Consider any error as broken promise
			doccoCmd.stderr.setEncoding('utf8');
			doccoCmd.stderr.on('data', function (data) {
				console.error(data);
				if (data.indexOf('unknown type') > -1) {
					// unknown files are ok, this is not a failure state
					/* do nothing */
				} else {
					// reject all other errors
					reject(data);					
				}
			});
			// Log stdout if debugging is on
			doccoCmd.stdout.setEncoding('utf8');
			doccoCmd.stdout.on('data', function (data) {
				debug(data);
			});
		});
	});
};
