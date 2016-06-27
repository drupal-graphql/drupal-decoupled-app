/**
 * @file    mongodb model for articles.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
});

const Article = mongoose.model('Article', ArticleSchema);

export const getArticleById = (id) =>
  new Promise((resolve, reject) =>
    Article.findOne({ id }).exec((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  );

export const getAllArticles = () =>
  new Promise((resolve, reject) =>
    Article.find({}).exec((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  );

export const addArticle = (values) => {
  const article = new Article(values);

  return new Promise((resolve, reject) =>
    article.save((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  );
};

export default Article;
