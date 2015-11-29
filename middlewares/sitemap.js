var jade = require('jade');
var step = require('step');
var Article = require('../models/Article');
var Project = require('../models/Project');
var path = require('path');


var sitemap = {};

sitemap.createXml = function (callback) {
  step(
    function () {
      Article.getAllArticles(this.parallel());
      Project.getAllProjects(this.parallel());
    },
    function (err, articleList, projectList) {
      var xml = jade.renderFile(path.join(__dirname, '../views/others/sitemap.jade'), {
        pretty: true,
        articleList: articleList,
        projectList: projectList
      });
      callback(xml);
    }
  )
};

module.exports = sitemap;