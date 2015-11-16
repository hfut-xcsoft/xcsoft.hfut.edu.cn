var memberRoute = require('express').Router();
//var article = require('../models/article');

memberRoute.get('/', function (req, res) {


  res.render('memberList', {
    tab: 2
  })


});

memberRoute.get('/:memberName', function (req, res) {
  var memberName = req.params.memberName;
  res.render('memberDetail', {
    tab: 2
  })
});

module.exports = memberRoute;