var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
  title: String,
  shortTitle: String,
  content: {
    source: String,
    html: String
  },
  author: {
    type: ObjectId,
    ref: 'Member'
  },
  time: Date,
  tag: String,
  picture: String,
  status: Number
});

ArticleSchema.statics = {
}

module.exports = ArticleSchema;