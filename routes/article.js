var articleRoute = require('express').Router();
//var article = require('../models/article');

articleRoute.get('/', function (req, res) {
    res.render('articleList', {
      tab: 0
  })
});

articleRoute.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.render('articleDetail', {
    tab:0
  })
});

module.exports = articleRoute;