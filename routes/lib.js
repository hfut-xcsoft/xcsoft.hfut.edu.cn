var lib = require('express').Router();

lib.get('/lang', function (req, res) {
  var setLang;
  if (req.cookies.lang == undefined || req.cookies.lang == 'zh-cn') {
    setLang = 'en-us';
  } else {
    setLang = 'zh-cn';
  }
  res.cookie('lang', setLang);
  res.redirect(req.headers.referer || '../');
});

lib.get('/login', function (req, res) {
  res.render('admin/login');
});

module.exports = lib;