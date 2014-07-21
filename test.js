'use strict';
var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');

afterEach(function () {
	rimraf.sync('temp'); // the directory that is the target of the unit test
	// rimraf.sync('tmp'); // the broccoli temporary directory
});

it('should create documentation for Javascript source', function () {
	var jsDocumentation = fs.readFileSync('./docs/index.html');
	assert.notEqual(jsDocumentation,null,"document should not be empty");
});