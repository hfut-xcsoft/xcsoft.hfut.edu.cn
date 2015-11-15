var projectRoute = require('express').Router();
var Project = require('../models/Project');

projectRoute.get('/', function (req, res) {


    res.render('articleList', {
      tab: 0
  })


});

module.exports = projectRoute;