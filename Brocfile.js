'use strict';
// ![ ](broccoli.png)
// ##Brocfile##
// this `Brocfile` is used by the *broccoli-docco* unit tests

var docco = require('./index.js');
var documents = docco('fixtures'); // note: output refers to both where Docco will put output files, and tree offset returned to Brocolli

module.exports = documents;