var index = require('express').Router();

index.get('/', function (req, res) {
  res.render('index');
});

index.get('/lang', function (req, res) {
  var setLang;
  if (req.cookies.lang == undefined || req.cookies.lang == 'zh-cn') {
    setLang = 'en-us';
  } else {
    setLang = 'zh-cn';
  }
  res.cookie('lang', setLang);
  res.redirect(req.headers.referer);
});

module.exports = index;