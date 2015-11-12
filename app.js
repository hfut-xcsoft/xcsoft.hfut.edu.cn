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
var server = require('http').Server(app);
app.locals.moment = require('moment');


/**
 * Set middleware
 */
mongoose.connect(Config.mongodbUrl);
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());
server.listen(Config.port);

/**
 * Handle request by router or socket.io
 */
//var router = require('./configs/routes');
//var socket = require('./modules/socket');

//router(app);


/**
 * Debug options
 */
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.set('showStackError', true);
  app.use(logger(':method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug', true);
}
console.log('APP started on  port 3000');


app.get('/', function (req, res) {
  res.render('index');
});
