var index = require('express').Router();
var Member = require('../models/Member');
var baseUrl = require('../configs/config').baseUrl;
var utils = require('../middlewares/utils');

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

index.route('/lib/login')
  .get(function (req, res) {
    res.render('admin/login');
  })
  .post(function (req, res) {
    var username = utils.changeToDBStr(req.body.username);
    var password = req.body.password;
    Member.checkAccount(username, password, function (err, result) {
      if (result == null) return res.render('admin/login', {
        error: '用户名或密码错误'
      });

      req.session.user = result;
      res.redirect(baseUrl + 'lib/admin/index');
    })
  });

index.get('/lib/contact-us', function (req, res) {
  res.render('contactUs');
});

module.exports = index;