var Schema = require('mongoose').Schema;
//var Member = require('../models/Member');
var mongoose = require("mongoose");
var ObjectId = Schema.Types.ObjectId;
var utils = require('../middlewares/utils');

var MemberSchema = new Schema({
  username:       {type: String,  default: ''},
  username_db:    {type: String,  default: ''},
  password:       {type: String,  default: ''},
  role:           {type: Number,  default: 2},
  user_type:      {type: String,  default: ''},
  real_name:      {type: String,  default: ''},
  phone:          {type: String,  default: ''},
  email:          {type: String,  default: ''},
  avatar:         {type: String,  default: ''},
  habit:          {type: String,  default: ''},
  motto:          {type: String,  default: ''},
  github: {
    username:     {type: String,  default: ''},
    url:          {type: String,  default: ''}
  },
  blog: {
    name:         {type: String,  default: ''},
    url:          {type: String,  default: ''}
  },
  status:         {type: Number, default: 1}
});

MemberSchema.pre('save', function (next) {
  var username_db = utils.changeToDBStr(this.username);
  if (this.isNew) {
    var self = this;
    mongoose.models["Member"].findOne({username_db: username_db}, function (err, member) {
      if (member != null) {
        next(new Error('Existed'))
      }
      self.username_db = username_db;
      next();
    })
  } else {
    next();
  }
});

MemberSchema.statics = {
  getMemberByName: function (name, callback) {
    return this
      .findOne({username_db: name})
      .exec(callback);
  },

  getAllMembers: function (callback) {
    return this
      .find({})
      .exec(callback);
  },

  getMemberListByRole: function (role, callback) {
    return this
      .find({role: role})
      .exec(callback);
  },

  checkAccount: function (username, password, callback) {
    return this
      .findOne({$and: [{username_db: username}, {password: password}]})
      .exec(callback);
  }
}

module.exports = MemberSchema;