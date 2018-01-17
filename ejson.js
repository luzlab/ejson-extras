const tryRequire = require('try-require');
const {
  checkMeteor,
  ensureDependencies,
  getGlobal,
} = require('meteor-globals');

if (checkMeteor()) {
  ensureDependencies(['mongo']);
}

const npmEJSON = tryRequire('ejson');
const meteorEJSON = checkMeteor() ? getGlobal('meteor', 'ejson') : null;

module.exports = meteorEJSON || npmEJSON;
