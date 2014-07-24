'use strict';
// ![ ](broccoli.png)
// ##Brocfile##
// this `Brocfile` is used by the *broccoli-docco* unit tests

var docco = require('./index.js');
var documents = docco('fixtures', { output: "temp" });

module.exports = documents;