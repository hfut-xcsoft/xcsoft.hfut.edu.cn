/**
 * Configure file of the application
 * @author Dremy
 */
var Config = {

  assets_version: '1.2.1',

  cdn: {
    development: {
      jquery: '/assets/js/jquery-1.11.2.min.js'
    },

    production: {
      jquery: '//cdn.bootcss.com/jquery/1.11.3/jquery.min.js'
    }
  },

  noCompress: true,

  baseUrl: '/',

  uploadUrl: '/file_upload.php?app=lib',

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
  defaultLanguage: 'en-us'

};

module.exports = Config;