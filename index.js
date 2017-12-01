const EJSON = require('ejson');
const assign = Object.assign || require('object.assign');
const debug = require('debug')('ejson');

const types = require('./types');

debug('EJSON-extras...');
Object.values(types).forEach(({ prototype, shims, typeName, factory }) => {
  if (!prototype.__noSupportForEJSON) {
    debug(`-> adding support for "${typeName}"`);
    assign(prototype, shims);
    if (typeof typeName === 'string') {
      EJSON.addType(typeName, factory);
    } else {
      typeName.forEach(typeName => EJSON.addType(typeName, factory));
    }
  } else {
    debug(`-> skipping "${typeName}". Probably missing a peer dependancy.`);
  }
});
