var Schema = require('mongoose').Schema;

var ObjectId = Schema.Types.ObjectId;

var ArticleSchema = new Schema({
  title:        {type: String, default: ''},
  title_short:  {type: String, default: ''},
  summary:      {type: String, default: ''},
  content: {
    source:     {type: String, default: ''},
    html:       {type: String, default: ''}
  },
  author:       {type: ObjectId, ref: 'Member'},
  time:         {type: Date,   default: Date.now},
  tag:          {type: String, default: ''},
  picture:      {type: String, default: ''},
  status:       {type: Number, default: 1},
  click:        {type: Number, default: 0}
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
      .populate('author')
      .populate('avatar')
      .sort({time: -1})
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