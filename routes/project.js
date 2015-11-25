var projectRoute = require('express').Router();
var Project = require('../models/Project');

projectRoute.get('/', function (req, res) {

  Project.getAllProjects(function (err, projectList) {
    if (err) {
      console.log(err);
      return;
    }

    var titleList = [];
    for (var i in projectList) {
      titleList.push(projectList[i].name);
    }

    res.render('projectList', {
      description: '合肥工业大学(宣城校区)软件工程创新实验室, 项目成果: ' + titleList.join(','),
      keywords: ['项目', 'project'],
      tab: 1,
      projectList: projectList
    });
  })
});

projectRoute.get('/:projectName', function (req, res) {
  var projectName = req.params.projectName;
  Project.getProjectByName(projectName, function (err, project) {
    if (project == null) {
      return res.render('404');
    }

    res.render('projectDetail', {
      description: '项目名: ' + project.name + ' 介绍: ' + project.description.html.substr(150).replace(/(<[^>]+?>|\s+)/g, ' '),
      keywords: [project.name],
      project: project,
      tab: 1
    })
  })

});

projectRoute.route('/new')
  .get(function (req, res) {
    res.render('newProject');
  })
  .post(function (req, res) {
    var projectForm = req.body;
    var project = new Project({
      name: projectForm.projectName,
      description: projectForm.description,
      finishTime: Date.now(),
      picture: projectForm.picture,
      status: 1
    });
    project.save(function (err, project) {
      if (err) {
        console.log(err);
        return;
      }

      res.redirect('/project/');
    })
  });

module.exports = projectRoute;