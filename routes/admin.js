var adminRouter = require('express').Router();
var baseUrl = require('../configs/config').baseUrl;
var Member = require('../models/Member');
var _ = require('underscore');

adminRouter.get('/member', function (req, res) {

  Member.getAllMembers(function (err, memberList) {
    res.render('admin/member/list', {
      memberList: memberList
    })
  });
});

adminRouter.route('/member/new')
  .get(function (req, res) {
    res.render('admin/member/new');
  })
  .post(function (req, res) {

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
      res.redirect(baseUrl + 'lib/admin/member/' + member.username_db);
    });
  });

adminRouter.route('/member/:memberName')
  .get(function (req, res) {

    var memberName = req.params.memberName;
    Member.getMemberByName(memberName, function (err, member) {

      if (member === null) {res.render('admin/notFound')}

      res.render('admin/member/edit', {
        member: member
      })
    });

  })
  .post(function (req, res) {
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

  res.render('admin/article/list');
});

adminRouter.route('/article/new')
  .get(function (req, res) {
    res.render('admin/article/new');
  })
  .post(function (req, res) {
    res.redirect(baseUrl + 'lib/article')
  });

adminRouter.get('/article/:articleName', function (req, res) {

  res.render('admin/article/edit');
});



adminRouter.get('/project', function (req, res) {

  res.render('admin/project/list');
});

adminRouter.route('/project/new')
  .get(function (req, res) {
    res.render('admin/project/new');
  })
  .post(function (req, res) {
    res.redirect(baseUrl + 'lib/project')
  });

adminRouter.get('/project/:projectName', function (req, res) {

  res.render('admin/project/edit');
});

module.exports = adminRouter;

