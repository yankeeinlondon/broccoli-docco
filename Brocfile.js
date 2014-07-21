'use strict';
var docco = require('./index.js');
var rsvp = require('rsvp');
var pickFiles = require('broccoli-static-compiler');

var target = pickFiles('fixtures',{
	srcDir: '/',
	files: ['*.js'],
	destDir: '/'
});
console.log("target", target);
var documents = docco(target);

module.exports = documents;