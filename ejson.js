const debug = require('debug')('ejson');
const tryRequire = require('try-require');
const {
  checkMeteor,
  ensureDependencies,
  getGlobal,
} = require('meteor-globals');

if (checkMeteor()) {
  ensureDependencies(['ejson'], { name: 'ejson-extras npm module' });
}

debug('-> Are we running inside Meteor? %o', checkMeteor());

const npmEJSON = tryRequire('ejson');
const meteorEJSON = checkMeteor() ? getGlobal('ejson', 'EJSON') : null;

const EJSON = meteorEJSON || npmEJSON;

debug('-> Found EJSON to use %O.', EJSON);

module.exports = EJSON;
