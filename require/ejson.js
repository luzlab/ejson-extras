'use strict';
const fs = require('fs');
const stripBom = require('strip-bom');
const EJSON = require('../ejson');

module.exports = (module, filename) => {
  const content = fs.readFileSync(filename, 'utf8');

  try {
    module.exports = EJSON.parse(stripBom(content));
  } catch (err) {
    err.message = `${filename}: ${err.message}`;
    throw err;
  }
};
