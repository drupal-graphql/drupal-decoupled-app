/**
 * @file    mock schema for articles.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';

import {
  globalIdField,
  connectionDefinitions,
} from 'graphql-relay';

import { nodeInterface } from '../node';

import { getTagsByIds } from '../models/article';

export const articleType = new GraphQLObjectType({
  name : 'Article',
  fields : () => ({
    id : globalIdField('Article'),
    articleId : {
      title   : 'Article Id',
      type    : new GraphQLNonNull(GraphQLString),
      resolve : ({ id }) => id,
    },
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
      title   : 'Tags',
      type    : new GraphQLList(new GraphQLNonNull(GraphQLString)),
      resolve : async ({ tags }) => {
        const result = await getTagsByIds(tags);
        return result.map(({ name }) => name);
      },
    },
    createTime : {
      title : 'Create time',
      type  : new GraphQLNonNull(GraphQLFloat),
    },
    modifyTime : {
      title : 'Modify time',
      type  : new GraphQLNonNull(GraphQLFloat),
    },
  }),
  interfaces : () => [nodeInterface],
});

export const tagType = new GraphQLObjectType({
  name : 'Tag',
  fields : () => ({
    id : globalIdField('Tag'),
    tagId : {
      title   : 'Tag Id',
      type    : new GraphQLNonNull(GraphQLString),
      resolve : ({ id }) => id,
    },
    name : {
      name : 'Title',
      type  : new GraphQLNonNull(GraphQLString),
    },
  }),
  interfaces : () => [nodeInterface],
});

export const {
  connectionType : articleConnection,
  edgeType       : articleEdge,
} = connectionDefinitions({
  name             : 'Articles',
  nodeType         : articleType,
  connectionFields : {
    count : {
      title : 'Count',
      type  : new GraphQLNonNull(GraphQLInt),
    },
  },
});

export const {
  connectionType : tagConnection,
  edgeType       : tagEdge,
} = connectionDefinitions({
  name             : 'Tags',
  nodeType         : tagType,
  connectionFields : {
    count : {
      title : 'Count',
      type  : new GraphQLNonNull(GraphQLInt),
    },
  },
});
