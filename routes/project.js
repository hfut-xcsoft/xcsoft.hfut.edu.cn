var projectRoute = require('express').Router();
var Project = require('../models/Project');

projectRoute.get('/', function (req, res) {

  Project.getAllProjects(function (err, projectList) {
    if (err) {
      console.log(err);
      return;
    }

    res.render('projectList', {
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