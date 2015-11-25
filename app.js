/**
 * The website of hfut-xcsoft
 * @author Dremy
 */

/**
 * Packages of the application
 */
var Config = require('./configs/config');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();




/**
 * Set middleware
 */
mongoose.connect(Config.mongodbUrl);
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());
app.use(session(Config.session));
app.listen(Config.port);
app.locals.moment = require('moment');
app.locals.baseUrl= Config.baseUrl;
app.locals.config = Config;
app.locals.pretty = Config.noCompress;

/**
 * Handle request by router or socket.io
 */
var router = require('./configs/router');

router(app);


/**
 * Debug options
 */
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.set('showStackError', true);
  app.use(logger(':method :url :status'));
  mongoose.set('debug', true);
}
console.log('APP started on  port 3000');


//app.get('/', function (req, res) {
//  res.render('index');
//});
//
//app.get('/project', function (req, res) {
//  res.render('projectList', {
//    tab: 1
//  });
//});
