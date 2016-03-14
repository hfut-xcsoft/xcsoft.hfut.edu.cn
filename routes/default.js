var index = require('express').Router();
var Member = require('../models/Member');
var sitemap = require('../middlewares/sitemap');
var utils = require('../middlewares/utils');

index.get('/', function (req, res) {
  res.redirect('/article');
});

index.get('/lang', function (req, res) {
  var setLang;
  if (req.cookies.lang == undefined || req.cookies.lang == 'zh-cn') {
    setLang = 'en-us';
  } else {
    setLang = 'zh-cn';
  }
  res.cookie('lang', setLang);
  res.redirect('/');

});

index.get('/lib/contact-us', function (req, res) {
  res.render('contactUs', {
    description: '身为工大学子的你，如果对软件开发或是产品设计有兴趣，欢迎向我们投递简历。'
  });
});

index.get('/lib/sitemap.xml', function (req, res) {
  sitemap.createXml(function (xml) {
    res.contentType('text/xml');
    res.send(xml);
    res.end();
  });
});

module.exports = index;