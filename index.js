const assign = Object.assign || require('object.assign');
const debug = require('debug')('ejson');

debug('Loading EJSON-extras...');

const requireEJSON = require('./require/ejson');
const EJSON = require('./ejson');
const addType = require('./addType');
const types = require('./types');

module.exports = {
  apply: function() {
    debug('Applying EJSON-extras...');
    debug('-> Found custom types %O', EJSON._getTypes());
    if (EJSON._getTypes().extras) {
      debug('00 Already initialized. Exiting');
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
      debug(`-> adding support for EJSON to 'require'`);
      require.extensions['.json'] = requireEJSON;
    }

    debug('00 Finished. Exiting');
  },
};
