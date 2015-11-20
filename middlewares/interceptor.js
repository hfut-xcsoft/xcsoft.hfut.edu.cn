var baseUrl = require('../configs/config').baseUrl;
var interceptor = {};

interceptor.loginRequired = function (req, res, next) {
  if (req.session.user === undefined) {
    return res.redirect(baseUrl + 'lib/login');
  }
  next();
};

interceptor.adminRequired = function (req, res, next) {
  if (req.session.user.user_type != 'admin') {
    return res.render('admin/deny');
  }
  next();
};

interceptor.userRequired = function (req, res, next) {
  if (req.session.user.user_type != 'admin'
    && member._id != req.session.user._id) {
    return res.render('admin/deny');
  }
  next();
}

module.exports = interceptor;
