var baseUrl = require('../configs/config').baseUrl;
var interceptor = {};

interceptor.loginRequired = function (req, res, next) {
  if (req.sessions.user === undefined) {
    res.redirect(baseUrl + 'lib/login');
    return;
  }
  next();
};

interceptor.adminRequired = function (req, res, next) {
  if (req.sessions.user.user_type == 'admin') {
    res.render('admin/deny');
    return;
  }
  next();
};

module.exports = interceptor;
