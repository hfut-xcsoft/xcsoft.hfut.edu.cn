var config = require('../configs/config');
var middleware = require('../middlewares');
var interceptor = require('../middlewares/interceptor');
var loginRequired = interceptor.loginRequired;
var adminRequired = interceptor.adminRequired;
var moment = require('moment');

module.exports = function (app) {

  app.use(function (req, res, next) {
    middleware(req, res, app);
    next();
  });



  app.use('/project', require('../routes/project'));
  app.use('/article', require('../routes/article'));
  app.use('/member', require('../routes/member'));
  app.use('/lib/admin', loginRequired, require('../routes/admin'));
  app.use('/lib', require('../routes/lib'));
  app.use('/', require('../routes/default'));

};