var Config = require('../configs/config');

module.exports = function (req, res) {

  var language;
  if (req.cookies.lang === undefined) {
    language = Config.defaultLanguage;
    req.cookies.lang = Config.defaultLanguage;
    res.cookie('lang', Config.defaultLanguage);
  } else {
    language = req.cookies.lang;
  }
  return language;
}