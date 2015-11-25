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

      var titleList = [];
      for (var i in articleList) {
        titleList.push(articleList[i].title);
      }

      var description = '合肥工业大学(宣城校区)软件工程创新实验室, 最新文章: ' + titleList.join(', ');
      var keywords = ['article', '文章'];

      res.render('articleList', {
        articleList: articleList,
        clickRankList: clickRankList,
        description: description,
        keywords: keywords,
        tab: 0
      })
    }
  )
});

articleRoute.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  Article.getArticleByName(articleName, function (err, article) {

    if (article == null) return res.render('404.jade');

    Article.addClickByName(articleName, article.click);
    res.render('articleDetail', {
      description: article.content.html.substr(0, 150).replace(/(<[^>]+?>|\s+)/g, ' '),
      keywords: [article.title],
      article: article,
      tab:0
    })
  })

});

module.exports = articleRoute;