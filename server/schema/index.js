/**
 * @file    graphql schema entry point
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { connectionArgs, connectionFromPromisedArray, mutationWithClientMutationId } from 'graphql-relay';
import { getAllArticles, addArticle } from '../model/article';
import ArticleType from './types/article';
import { nodeField } from './node';
import { articleConnection } from './connections';

const createOrUpdateArticleFields = {
  inputFields: {
    title: {
      title: 'Title',
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      title: 'Body',
      type: GraphQLString,
    },
  },
  outputFields: {
    article: {
      type: ArticleType,
      resolve: (article) => article,
    },
  },
};

const addArticleMutation = mutationWithClientMutationId({
  name: 'AddArticle',
  mutateAndGetPayload: (values) => addArticle(values),
  ...createOrUpdateArticleFields,
});

// Set up the root query type.
const query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query root.',
  fields: () => ({
    node: nodeField,
    allArticles: {
      type: articleConnection,
      args: connectionArgs,
      resolve: async (_, args) => connectionFromPromisedArray(getAllArticles(), args),
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutation root.',
  fields: () => ({
    addArticle: addArticleMutation,
  }),
});

export default new GraphQLSchema({
  query,
  mutation,
});
