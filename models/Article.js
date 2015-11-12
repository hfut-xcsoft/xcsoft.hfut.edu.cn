import mongoose from 'mongoose';
import ArticleSchema from '../schemas/ArticleSchema';

module.exports = mongoose.model('Article', ArticleSchema);