const debug = require('debug')('ejson');
const fs = require('fs');
const stripBom = require('strip-bom');
const EJSON = require('../ejson');

debug('-> Building replacement parser for require with %O', EJSON);

module.exports = (module, filename) => {
  const content = fs.readFileSync(filename, 'utf8');
  try {
    module.exports = EJSON.parse(stripBom(content));
  } catch (err) {
    err.message = `${filename}: ${err.message}`;
    throw err;
  }
};
