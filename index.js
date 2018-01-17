const addType = require('./addType');
const assign = Object.assign || require('object.assign');
const debug = require('debug')('ejson');

const types = require('./types');
const requireEJSON = require('./require/ejson');
let initialized = false;

module.exports = {
  apply: function() {
    debug('Applying EJSON-extras...');
    if (initialized) {
      debug('Already initialized...');
      return;
    }
    Object.values(types).forEach(({ prototype, shims, typeName, factory }) => {
      if (!prototype.__noSupportForEJSON) {
        debug(`-> adding support for "${typeName}"`);
        assign(prototype, shims);
        if (typeof typeName === 'string') {
          addType(typeName, factory);
        } else {
          typeName.forEach(name => addType(name, factory));
        }
      } else {
        debug(`-> skipping "${typeName}". Probably missing a peer dependancy.`);
      }
    });

    if (typeof require === 'function') {
      require.extensions['.json'] = requireEJSON;
    }
  },
};
