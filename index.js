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
	this.options = options || {};
	this.settings = {
		output: options.output || 'docs',
		layout: options.layout || 'parallel', // built-in are 'parallel','linear', or 'classic'
	};
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
DoccoWriter.prototype.write = function(readTree, options) {
	'use strict';
	debug('Tree: ', readTree);
	debug('Options:', options);
	// wait for event/file change and then respond
	return readTree(this.inputTree).then(function (srcDir) {
		// make sure Broccoli waits for the promise to be fulfilled
		return new RSVP.Promise(function(resolve,reject) {
			debug('Operating directory: ' + path.resolve('.'));
			debug('Source directory: ' + srcDir);
			// get all files in the temporary directories/subdirectories
			// that broccoli has created for us
			var files = getFiles(srcDir); 
			// set Docco params
			var doccoParams = [
				'-o', 'temp',
				'-l', 'parallel'
			].concat(files);
			// spawn a child process of docco (*using local npm install*)
			debug('Docco parameters:\n', doccoParams);
			var spawn = require('child_process').spawn;
			var doccoCmd = spawn('node_modules/.bin/docco', doccoParams);
			doccoCmd.on('exit', function(code,signal) {
				debug('Docco complete: ', code, signal);
				resolve(fs.readdirSync('temp'));
			});
			doccoCmd.stderr.setEncoding('utf8');
			doccoCmd.stderr.on('data', function (data) {
				console.log(data);
				if (/^execvp\(\)/.test(data)) {
					debug('Failed to start Docco process.');
					reject(data);
				}
			});
			doccoCmd.stdout.on('data', function (data) {
				debug('Docco output', data);
			});
			debug('exiting write function', fs.readdirSync(srcDir));
		});
	});
};
