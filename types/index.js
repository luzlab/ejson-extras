// Reading the directory and adding all the files automatically won't work when this module is run on the browser.
// This is a problem is you're using frameworks like Meteor or Browerify
// For now, we'll just require all the types manually.

// const requireDirectory = require('require-directory');
const qty = require('./jsQuantities.js');
const map = require('./map.js');

// module.exports = requireDirectory(module, { exclude: /.+test\.js/ });
module.exports = { qty, map };
