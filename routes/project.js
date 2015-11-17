var projectRoute = require('express').Router();
var Project = require('../models/Project');

projectRoute.get('/', function (req, res) {

  Project.getAllProject(function (err, projectList) {
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
  res.render('projectDetail', {
    tab: 1
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
      pictureUrl: projectForm.pictureUrl,
      favorite: 0,
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