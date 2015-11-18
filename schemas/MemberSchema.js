var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var MemberSchema = new Schema({
  username: String,
  username_db: String,
  password: String,
  role: Number,
  user_type: String,
  real_name: {type: String,default: ''},
  phone: {type: String,default: ''},
  email: {type: String,default: ''},
  avatar: {type: String,default: ''},
  habit: {type: String,default: ''},
  motto: {type: String,default: ''},
  github: {
    username: {type: String,default: ''},
    url: {type: String,default: ''}
  },
  blog: {
    name: {type: String,default: ''},
    url: {type: String,default: ''}
  },
  status: Number
});

MemberSchema.pre('save', function (next) {
  var username_db = this.username.toLowerCase().replace(/\s+/, '-');
  if (this.isNew) {
    this.getMemberByName(username_db, function (err, member) {
      if (member == null) {next(new Error('Existed'))}

      this.username_db = username_db;
      next();
    })
  }
  next();
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
  }
}

module.exports = MemberSchema;