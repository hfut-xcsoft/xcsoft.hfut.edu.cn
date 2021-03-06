var language = require('./language.js');
var zh_cn = require('../language/zh-cn');
var en_us = require('../language/en-us');
var config = require('../configs/config');

module.exports = function (req, res, app) {

  app.locals.language = language(req, res);
  app.locals.lang = app.locals.language == 'en-us' ? en_us : zh_cn;

  var env = process.env.NODE_ENV || 'development';
  env = env == 'production' ? 'production' : 'development';
  app.locals.cdn = config.cdn[env];

  app.locals.dateFormat = function (date) {
    if (date.getFullYear() == new Date().getFullYear()) {
      return app.locals.language == 'en-us' ?
        app.locals.moment(date).format('MMM D'):
        app.locals.moment(date).format('M月D日');
    } else {
      return app.locals.language == 'en-us' ?
        app.locals.moment(date).format('MMM YYYY'):
        app.locals.moment(date).format('YYYY年M月');
    }
  }

  app.locals.user = req.session.user;
}