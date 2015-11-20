var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
  title: String,
  title_short: String,
  summary: String,
  content: {
    source: String,
    html: String
  },
  author: {
    type: ObjectId,
    ref: 'Member'
  },
  time: {
    type: Date,
    default: Date.now
  },
  tag: String,
  picture: String,
  status: Number,
  click: {
    type: Number,
    default: 0
  }
});

ArticleSchema.statics = {
  getArticleByName: function (name, callback) {
    return this
      .findOne({title_short: name})
      .populate('author')
      .exec(callback);
  },

  getAllArticles: function (callback) {
    return this
      .find({})
      .populate('author', 'avatar')
      .exec(callback);
  },

  getClickRankList: function (callback) {
    return this
      .find({}, 'title title_short')
      .where()
      .sort({'click': -1})
      .exec(callback);
  },

  addClickByName: function (name, click, callback) {
    return this
      .update({title_short: name}, {'$set': {click: click + 1}})
      .exec(callback);
  }
}

module.exports = ArticleSchema;