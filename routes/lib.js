var lib = require('express').Router();
var Member = require('../models/Member');
var baseUrl = require('../configs/config').baseUrl;
var utils = require('../middlewares/utils');

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

lib.route('/login')
  .get(function (req, res) {
    Member.findOne({}, function (err, member) {
      var isEmpty = member == null;
      res.render('admin/login', {
        isEmpty: isEmpty
      });
    })
  })
  .post(function (req, res) {

    Member.findOne({}, function (err, member_before) {
      if (member_before == null) {
        var memberForm = req.body;
        var _member = new Member({
          username: memberForm.username,
          password: memberForm.password,
          role: 0,
          user_type: 'admin',
          status: 1
        });
        _member.save(function (err, member) {
          if (err) {
            console.log(err);
            return;
          }
          res.redirect(baseUrl + 'lib/admin/member');
        });

      } else {
        var username = utils.changeToDBStr(req.body.username);
        var password = req.body.password;
        Member.checkAccount(username, password, function (err, result) {
          if (result == null) return res.render('admin/login', {
            error: '用户名或密码错误'
          });

          req.session.user = result;
          res.redirect(baseUrl + 'lib/admin/index');
        })
      }
    })
  });

module.exports = lib;