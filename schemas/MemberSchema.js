var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var MemberSchema = new Schema({
  username: String,
  realName: String,
  password: String,
  role: Number,
  phone: String,
  email: String,
  avatarUrl: String,
  status: Number
});

module.exports = MemberSchema;