/**
 * Configure file of the application
 * @author Dremy
 */
var Config = {

  // The port of app.js listening
  port: 3000,

  // The url of Mongodb
  mongodbUrl: 'mongodb://localhost/lib',

  // The config of RedisStore
  RedisStore: {
    host:'127.0.0.1',
    port:'6379'
  },

  // The secret of session middleware
  secret: 'xcsoft'
};

module.exports = Config;