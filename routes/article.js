var articleRoute = require('express').Router();
//var article = require('../models/article');

articleRoute.get('/', function (req, res) {


    res.render('articleList', {
      tab: 0
  })


});

module.exports = articleRoute;