/**
 * Configure file of the application
 * @author Dremy
 */
var Config = {

  baseUrl: '/',

  // The port of app.js listening
  port: 3000,

  // The url of Mongodb
  mongodbUrl: 'mongodb://localhost/lib',

  // The config of RedisStore
  RedisStore: {
    host:'127.0.0.1',
    port:'6379'
  },

  // Session configs
  session: {
    secret: "lib",
    resave: false,
    saveUninitialized: true
  },

  //defaultLanguage: 'zh-cn',
  defaultLanguage: 'en-us',

};

module.exports = Config;