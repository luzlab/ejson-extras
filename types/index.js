const requireDirectory = require('require-directory');
const tryRequire = require('try-require');
const Qty = tryRequire('js-quantities');

const blacklist = [];

if (!Qty) {
  blacklist.push('jsQuantities.js');
}

const exclude = function exclude(filename) {
  return !blacklist.includes(filename);
};

module.exports = requireDirectory(module, { exclude });
