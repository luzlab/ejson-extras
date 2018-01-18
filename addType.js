const debug = require('debug')('ejson');
const {
  checkMeteor,
  ensureDependencies,
  getGlobal,
} = require('meteor-globals');
const tryRequire = require('try-require');

if (checkMeteor()) {
  ensureDependencies(['ejson'], { name: 'ejson-extras npm module' });
}

const EJSONs = [];
const npmEJSON = tryRequire('ejson');
const meteorEJSON = checkMeteor() ? getGlobal('ejson', 'EJSON') : null;

debug('In meteor? %o', checkMeteor());

if (npmEJSON) {
  debug('found npm.ejson');
  EJSONs.push(npmEJSON);
}
if (meteorEJSON) {
  debug('found meteor.ejson');
  EJSONs.push(meteorEJSON);
}

module.exports = function addType(name, factory) {
  EJSONs.forEach(EJSON => {
    try {
      EJSON.addType(name, factory);
    } catch (error) {
      debug(
        'Failed to add %o. There was probably already a custom type defined with the same name.',
        name,
      );
    }
  });
};
