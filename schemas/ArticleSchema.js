var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
  title: String,
  shortTitle: String,
  content: String,
  //author: {
  //  type: ObjectId,
  //  ref: 'Member'
  //},
  publishTime: Date,
  tag: String,
  status: Number
});

ArticleSchema.statics = {
}

module.exports = ArticleSchema;