var memberRoute = require('express').Router();
var Member = require('../models/Member');
var Project = require('../models/Project');
var step = require('step');

memberRoute.get('/', function (req, res) {

  Member.getAllMembers(function (err, memberList) {
    res.render('memberList', {
      memberList: memberList,
      tab: 2
    })
  })
});

memberRoute.get('/:memberName', function (req, res) {
  var memberName = req.params.memberName;
  Member.getMemberByName(memberName, function (err, member) {
    Project.getProjectByUser(member._id, function (err, projectList) {
      res.render('memberDetail', {
        member: member,
        projectList: projectList,
        tab: 2
      })
    })
  })
});

module.exports = memberRoute;