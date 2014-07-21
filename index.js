// #broccoli-docco plugin
// *Auto-generate documentation for your code leveraging the Broccoli build pipeline and the Docco documentation generator*
var 
	brocWriter = require('broccoli-writer'),
	rsvp = require('rsvp'),
	docco = require('docco');

// Class Prototype
var DoccoBroc = function Docco() {
  if (!(this instanceof Docco)) {
    return new Docco();
  }
  this.inTree = inTree;
  this.options = options || {};
};
// Extends the `broccoli-writer` class
DoccoBroc.prototype = Object.create(brocWriter.prototype);
DoccoBroc.prototype.constructor = DoccoBroc;
DoccoBroc.prototype.description = 'docco documentation generator';
// Modules Export
module.exports = DoccoBroc;

// ## document ##
// Parameters:
// 
// - `inputTree` - the input tree that is being processed
// - `options` - an options hash to configure behaviour, key hash options include:
//      - `destDir` - the base directory to write the documentation to; defaults to '/docs'
//      - `docco` - the Docco package provides an options hash which is proxied to this property
DoccoBroc.prototype.document = function(inputTree, options) {
  var self = this;
  // Return a promise to a promise
  return inputTree(this.inTree).then(function (srcDir) {	
	  var promise = new rsvp.Promise(function(resolvePromise, rejectPromise) {
		  // Proxy to Docco
		  docco.document(options.docco, function(err,data) {
			  if (err) {
				  rejectPromise(err);
			  }
			  else {
				  resolvePromise(data);
			  }	
		  });
	  });
	  // Return Docco promise
	  return promise;
  });
}; 
// end *write*
