var adminRouter = require('express').Router();
var baseUrl = require('../configs/config').baseUrl;
var Member = require('../models/Member');
var Article = require('../models/Article');
var Project = require('../models/Project');
var utils = require('../middlewares/utils');
var marked = require('marked');
var step = require('step');
var _ = require('underscore');
var adminRequired = require('../middlewares/interceptor').adminRequired;
var userRequired = require('../middlewares/interceptor').userRequired;

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

adminRouter.get('/index', function (req, res) {
  res.render('admin/index');
});

adminRouter.get('/member', function (req, res) {

  Member.getAllMembers(function (err, memberList) {
    res.render('admin/member/list', {
      memberList: memberList
    })
  });
});

adminRouter.route('/member/new')
  .get(adminRequired, function (req, res) {
    res.render('admin/member/new');
  })
  .post(adminRequired, function (req, res) {

    var memberForm = req.body;
    var _member = new Member({
      username: memberForm.username,
      password: memberForm.password,
      role: memberForm.role,
      user_type: memberForm.user_type,
      status: 1
    });
    _member.save(function (err, member) {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect(baseUrl + 'lib/admin/member');
    });
  });

adminRouter.route('/member/:memberName')
  .get(userRequired, function (req, res) {
    var memberName = req.params.memberName;
    Member.getMemberByName(memberName, function (err, member) {

      if (member === null) {return res.render('admin/notFound')}
      res.render('admin/member/edit', {
        member: member
      })
    });

  })
  .post(userRequired, function (req, res) {
    var memberForm = req.body;
    Member.findById(memberForm._id, function (err, member) {
      if (err) {console.log(err); return;}

      var _member = _.extend(member, memberForm);
      _member.save(function (err, member) {
        if (err) {console.log(err); return;}
        res.redirect(baseUrl + 'lib/admin/member/' + member.username_db);
      });
    })

  });



adminRouter.get('/article', function (req, res) {
  Article.getAllArticles(function (err, articleList) {
    res.render('admin/article/list', {
      articleList: articleList
    })
  });
});

adminRouter.route('/article/new')
  .get(function (req, res) {
    Member.getAllMembers(function (err, memberList) {
      res.render('admin/article/new', {
        memberList: memberList
      });
    })
  })
  .post(function (req, res) {

    var articleForm = req.body;

    var articleHtml = marked(articleForm.content.source);
    console.log(articleHtml);

    var _article = new Article({
      title: articleForm.title,
      title_short: utils.changeToDBStr(articleForm.title_short),
      summary: articleForm.summary,
      author: articleForm.author,
      tag: articleForm.tag,
      status: 1,
      content: {
        source:  articleForm.content.source,
        html: articleHtml
      }
    });
    _article.save(function (err, article) {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect(baseUrl + 'lib/admin/article');
    });
  });

adminRouter.post('/article/preview', function (req, res) {
  var content = req.body.content;
  var html = marked(content);
  res.send(html);
  res.end();
});

adminRouter.route('/article/:articleName')
  .get(function (req, res) {
    var articleName = req.params.articleName;
    step(
      function () {
        Article.getArticleByName(articleName, this.parallel());
        Member.getAllMembers(this.parallel());
      },
      function (err, article, memberList) {
        if (article == null) {res.render('admin/notFound'); return;}
        res.render('admin/article/edit', {
          article: article,
          memberList: memberList
        });
      }
    )
  })
  .post(function (req, res) {
    var articleForm = req.body;
    articleForm.title_short = utils.changeToDBStr(articleForm.title_short);
    Article.findById(articleForm._id, function (err, article) {
      if (err) {console.log(err); return;}
      if (req.session.user.user_type != 'admin' || article.author._id != req.session.user._id) {
        return res.render('admin/deny');
      }
      articleForm.content.html = marked(articleForm.content["source"]);
      var _article = _.extend(article, articleForm);
      _article.save(function (err, article) {
        if (err) {console.log(err); return;}
        res.redirect(baseUrl + 'lib/admin/article');
      });
    })
  })





adminRouter.get('/project', adminRequired, function (req, res) {
  Project.getAllProjects(function (err, projectList) {
    if (projectList == null) return res.render('admin/notFound');
    res.render('admin/project/list', {
      projectList: projectList
    })
  });
});

adminRouter.route('/project/new')
  .get(function (req, res) {
    Member.getAllMembers(function (err, memberList) {
      res.render('admin/project/new', {
        memberList: memberList
      });
    })
  })
  .post(function (req, res) {

    var projectForm = req.body;

    var detailHtml = marked(projectForm.detail.source);
    console.log(detailHtml);

    var _project = new Project({
      name: projectForm.name,
      name_short: utils.changeToDBStr(projectForm.name_short),
      description: projectForm.description,
      designer: projectForm.designer,
      developer: projectForm.developer,
      technology: projectForm.technology,
      status: 1,
      detail: {
        source:  projectForm.detail.source,
        html: detailHtml
      }
    });
    _project.save(function (err, project) {
      if (err) {
        console.log(err);
        return;
      }
      res.redirect(baseUrl + 'lib/admin/project/' + project.name_short);
    });


  });

adminRouter.route('/project/:projectName')
  .get(function (req, res) {

    var projectName = req.params.projectName;
    step(
      function () {
        Project.getProjectByName(projectName, this.parallel());
        Member.getAllMembers(this.parallel());
      },
      function (err, project, memberList) {
        if (project == null) {res.render('admin/notFound'); return;}

        var designerId = [];
        for (var i in project.designer) {
          if (project.designer[i]._id === undefined) break;
          designerId.push('\'' + project.designer[i]._id + '\'');
        }
        var developerId = [];
        for (var i in project.developer) {
          if (project.developer[i]._id === undefined) break;
          developerId.push('\'' + project.developer[i]._id + '\'');
        }

        res.render('admin/project/edit', {
          project: project,
          designerId: designerId,
          developerId: developerId,
          memberList: memberList
        });
      }
    )
  })
  .post(function (req, res) {
    var projectForm = req.body;
    projectForm.name_short = utils.changeToDBStr(projectForm.name_short);

    Project.findById(projectForm._id, function (err, project) {

      if (err) {console.log(err); return;}

      projectForm.detail.html = marked(projectForm.detail["source"]);
      var _project = _.extend(project, projectForm);
      _project.save(function (err, project) {
        if (err) {console.log(err); return;}

        res.redirect(baseUrl + 'lib/admin/project/' + project.name_short);
      });
    })
  })

adminRouter.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect(baseUrl + 'lib/login');
})

module.exports = adminRouter;

