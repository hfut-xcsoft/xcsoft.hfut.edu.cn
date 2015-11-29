var memberRoute = require('express').Router();
var Member = require('../models/Member');
var Project = require('../models/Project');
var step = require('step');

memberRoute.get('/', function (req, res) {

  Member.getAllMembers(function (err, memberList) {

    var nameList = [];
    for (var i in memberList) {
      nameList.push(memberList[i].username);
    }

    res.render('memberList', {
      description: '合肥工业大学(宣城校区)软件工程创新实验室, 成员: ' + nameList.join(','),
      keywords: ['成员', 'member'],
      memberList: memberList,
      tab: 2
    })
  })
});

memberRoute.get('/:memberName', function (req, res) {
  var memberName = req.params.memberName;
  Member.getMemberByName(memberName, function (err, member) {
    Project.getProjectByUser(member._id, function (err, projectList) {

      var titleList = [];
      for (var i in projectList) {
        titleList.push(projectList[i].name);
      }

      res.render('memberDetail', {
        description: '合肥工业大学(宣城校区)软件工程创新实验室, 成员介绍: 昵称: ' + member.username + ' 姓名: ' + member.real_name + ' 参与项目: ' + titleList.join(','),
        keywords: [member.username, member.real_name],
        member: member,
        projectList: projectList,
        tab: 2
      })
    })
  })
});

module.exports = memberRoute;