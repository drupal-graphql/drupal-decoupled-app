/**
 * @file    mongodb model for articles.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import mongoose, { Schema } from 'mongoose';

const tagSchema = new Schema({
  name : {
    type    : String,
    require : true,
  },
});

export const Tag = mongoose.model('Tag', tagSchema);

const ArticleSchema = new Schema({
  title : {
    type     : String,
    required : true,
    text     : true,
  },
  body : {
    type : String,
  },
  author : {
    type : String,
  },
  tags : {
    type : [Schema.Types.ObjectId],
    ref  : 'Tag',
  },
}, {
  timestamps : {
    createdAt : 'createTime',
    updatedAt : 'modifyTime',
  },
});

export const Article = mongoose.model('Article', ArticleSchema);

const conditionFormatters = {
  search : (value) => ({ // eslint-disable-line no-confusing-arrow,
    $text : {
      $search : value,
    },
  }),
  tags : (value, key) => ({
    [key] : { $in: value },
  }),
};

const formatConditions = (conditions) =>
  Object.keys(conditions).reduce((carry, key) => {
    if (!conditionFormatters.hasOwnProperty(key)) {
      return carry;
    }

    const format = conditionFormatters[key];
    const value = conditions[key];

    if (typeof value === 'undefined' || value === null) {
      return carry;
    }

    return {
      ...carry,
      ...format(value, key),
    };
  }, {});

const resolveConditions = ({ tags, ...other }) => {
  const conditions = other || {};

  if (tags && tags.length) {
    conditions.tags = getTagsByNames(tags)
      .then((result) => result.map(({ id }) => id));
  }

  const keys = Object.keys(conditions);
  const values = Object.values(conditions);

  return Promise
    .all(values)
    .then((results) => results.reduce((carry, result, index) => ({
      ...carry,
      [keys[index]]: result,
    }), {}))
    .then(formatConditions);
};

export const getTagsByIds = (ids) => Tag.find({ _id : { $in : ids } });
export const getTagsByNames = (names) => Tag.find({ name : { $in : names } });
export const getArticleById = (id) => Article.findById(id);

export const getAllArticlesCount = (conditions) =>
  resolveConditions(conditions)
    .then((args) => Article.count(args));

export const getAllArticles = (conditions) =>
  resolveConditions(conditions)
    .then((args) => Article.find(args));

export const getAllArticlesByChar = (obj) => {
  const searchObj = { title :  new RegExp('^' + obj.title + '.*', 'i') };
  return Article.find(searchObj);
};

export const getAllTagsByChar = (obj) => {
  const searchObj = { name :  new RegExp('^' + obj.title + '.*', 'i') };
  return Tag.find(searchObj);
};

// If a tag with the same name has already been created, return the id.
// Otherwise, create a new tag.
export const getOrAddTag = (name) =>
  Tag
    .findOne({ name : name }) // eslint-disable-line
    .then((foundTag) => foundTag || Tag
      .create({ name })
      .then((createdTag) => createdTag.save())
    );

export const addArticle = ({ tags : tagsRaw, ...values }) =>
  Promise
    .all([
      Promise.all((tagsRaw || []).map(getOrAddTag)),
    ])
    .then(([tags]) =>
      Article
        .create({
          ...values,
          tags,
        })
        .then((article) => article.save()));

export const deleteArticle = (id) => Article.findByIdAndRemove(id);
