var articleRoute = require('express').Router();
var Article = require('../models/Article');
var step = require('step');

articleRoute.get('/', function (req, res) {

  step(
    function () {
      Article.getAllArticles(this.parallel());
      Article.getClickRankList(this.parallel());
    },
    function (err, articleList, clickRankList) {
      res.render('articleList', {
        articleList: articleList,
        clickRankList: clickRankList,
        tab: 0
      })
    }
  )
  Article.getAllArticles(function (err, articleList) {

  })

});

articleRoute.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  Article.getArticleByName(articleName, function (err, article) {

    if (article == null) return res.render('404.jade');

    Article.addClickByName(articleName, article.click);
    res.render('articleDetail', {
      article: article,
      tab:0
    })
  })

});

module.exports = articleRoute;