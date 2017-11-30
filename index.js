const EJSON = require('ejson');
const assign = Object.assign || require('object.assign');

const types = require('./types');

Object.values(types).forEach(({ prototype, shims, typeName, factory }) => {
  assign(prototype, shims);
  if (typeof typeName === 'string') {
    EJSON.addType(typeName, factory);
  } else {
    typeName.forEach(typeName => EJSON.addType(typeName, factory));
  }
});
