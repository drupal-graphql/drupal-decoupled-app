/**
 * @file    mutation definitions for articles.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';

import {
  addArticle,
  deleteArticle,
  getArticleById,
} from '../models/article';

import { articleType } from '../types/article';

const createOrUpdateArticleFields = {
  inputFields : {
    title : {
      title : 'Title',
      type  : new GraphQLNonNull(GraphQLString),
    },
    body : {
      title : 'Body',
      type  : GraphQLString,
    },
    author : {
      title : 'Author',
      type  : GraphQLString,
    },
    tags : {
      title : 'Tags',
      type : new GraphQLList(GraphQLString),
    },
  },
  outputFields : {
    article : {
      type    : articleType,
      resolve : (article) => article,
    },
  },
};

export const addArticleMutation = mutationWithClientMutationId({
  name : 'AddArticle',
  mutateAndGetPayload : async (values) =>
    addArticle(values).then(({ id }) => getArticleById(id)),
  ...createOrUpdateArticleFields,
});

const deleteArticleFields = {
  inputFields : {
    id : {
      title : 'Id',
      type  : new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields : {
    article : {
      type    : articleType,
      resolve : (article) => article,
    },
  },
};

export const deleteArticleMutation = mutationWithClientMutationId({
  name : 'DeleteArticle',
  mutateAndGetPayload : async ({ id }) => {
    const { id : articleId } = fromGlobalId(id);
    const article = await getArticleById(articleId);

    // Wait until the article has been successfully deleted.
    await deleteArticle(articleId);

    return article;
  },
  ...deleteArticleFields,
});
