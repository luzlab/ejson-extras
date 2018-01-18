const debug = require('debug')('ejson');
const tryRequire = require('try-require');
const { checkMeteor, getGlobal } = require('meteor-globals');

debug('-> Are we running inside Meteor? %o', checkMeteor());

const npmEJSON = tryRequire('ejson');
const meteorEJSON = checkMeteor() ? getGlobal('ejson', 'EJSON') : null;

const EJSON = meteorEJSON || npmEJSON;

debug('-> Found EJSON to use %O.', EJSON);

module.exports = EJSON;
