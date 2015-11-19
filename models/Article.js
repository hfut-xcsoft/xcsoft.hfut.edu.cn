var  mongoose = require( 'mongoose');
var  ArticleSchema = require( '../schemas/ArticleSchema');

module.exports = mongoose.model('Article', ArticleSchema);