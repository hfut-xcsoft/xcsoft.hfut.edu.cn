var crypto = require('crypto');

var utils = {};

utils.changeToDBStr = function (str) {
  return str.toLowerCase().replace(/\s+/g, '-')
};

utils.md5 = function (str) {
  return crypto.createHash('md5').update(str).digest('hex');
};

module.exports = utils;