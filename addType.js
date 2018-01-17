const debug = require('debug')('ejson');
const {
  checkMeteor,
  ensureDependencies,
  getGlobal,
} = require('meteor-globals');
const tryRequire = require('try-require');

if (checkMeteor()) {
  ensureDependencies(['mongo']);
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
    EJSON.addType(name, factory);
  });
};
