var mongoose = require('mongoose');
var MemberSchema = require('../schemas/MemberSchema');

module.exports = mongoose.model('Member', MemberSchema);