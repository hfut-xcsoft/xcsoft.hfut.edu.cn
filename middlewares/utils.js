var utils = {}

utils.changeToDBStr = function (str) {
  return str.toLowerCase().replace(/\s+/g, '-')
};

module.exports = utils;