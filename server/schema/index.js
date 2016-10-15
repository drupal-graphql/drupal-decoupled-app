/**
 * @file    graphql schema entry point
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import { nodeField } from './node';

import {
  allArticlesField,
  allArticlesPagerField,
  allArticlesByCharField,
  allTagsByCharField,
  articleByIdField,
} from './queries/article';

import {
  addArticleMutation,
  deleteArticleMutation,
} from './mutations/article';

// Set up the root query type.
const query = new GraphQLObjectType({
  name        : 'Query',
  description : 'Query root.',
  fields      : () => ({
    node        : nodeField,
    viewer      : {
      title   : 'Viewer',
      resolve : () => true,
      type    : new GraphQLObjectType({
        name        :'Viewer',
        description : 'Extra nesting layer for Relay routing.',
        fields      : {
          allArticles       : allArticlesField,
          allArticlesPager  : allArticlesPagerField,
          allArticlesByChar : allArticlesByCharField,
          allTagsByChar     : allTagsByCharField,
        },
      }),
    },
    articleById : articleByIdField,
  }),
});

// Set up the root mutation type.
const mutation = new GraphQLObjectType({
  name        : 'Mutation',
  description : 'Mutation root.',
  fields      : () => ({
    addArticle    : addArticleMutation,
    deleteArticle : deleteArticleMutation,
  }),
});

export default new GraphQLSchema({
  query,
  mutation,
});
