// #broccoli-docco plugin
// > a subclass of [broccoli-filter](https://github.com/broccolijs/broccoli-filter) 
//
// *Auto-generate documentation for your code, leveraging the Broccoli build pipeline and the Docco documentation generator*
var 
	Filter = require('broccoli-filter'),
	chalk = require('chalk'),
	RSVP = require('rsvp'),
	docco = require('docco');

// Class Prototype
function DoccoFilter(inputTree, options) {
  if (!(this instanceof DoccoFilter)) {
	  console.log('about to instantiate');
    return new DoccoFilter(inputTree, options);
  }
  
  this.inputTree = inputTree;
  this.options = options || {};
  console.log('inputTree is ',inputTree);
};

// Extends the `broccoli-filter` class
DoccoFilter.prototype = Object.create(Filter.prototype);
DoccoFilter.prototype.constructor = DoccoFilter;
DoccoFilter.prototype.description = 'docco documentation generator using broccoli build pipeline';
// Modules Export
module.exports = DoccoFilter;

// ## processString ##
// Parameters:
// 
// - `inputTree` - the input tree that is being processed
// - `options` - an options hash to configure behaviour, key hash options include:
//      - `destDir` - the base directory to write the documentation to; defaults to '/docs'
//      - `docco` - the Docco package provides an options hash which is proxied to this property
DoccoFilter.prototype.processString = function(str, relativePath) {
	var self = this;
	return new RSVP.Promise(function(resolve,reject) {
		docco.document(str, function(err, data) {
			if(err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	}.bind(self));
}; 
