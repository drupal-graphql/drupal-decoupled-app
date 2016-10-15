/**
 * @file    query definitions for articles.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @author  Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date    2016-06-21
 */

import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from 'graphql';

import {
  connectionArgs,
  connectionFromPromisedArray,
  fromGlobalId,
} from 'graphql-relay';

import {
  getAllArticles,
  getAllArticlesPager,
  getAllArticlesByChar,
  getAllTagsByChar,
  getAllArticlesCount,
  getArticleById,
} from '../models/article';

import {
  articleConnection,
  tagConnection,
  articleType,
} from '../types/article';

export const allArticlesPagerField = {
  type : articleConnection,
  args : {
    ...connectionArgs,
    offset : {
      type        : GraphQLInt,
      description : 'Query offset parameter',
    },
  },
  resolve : async (_, { offset, ...args }) => {
    const conditions = {
      offset,
    };

    const [
      connection,
      count,
    ] = await Promise.all([
      connectionFromPromisedArray(getAllArticlesPager(conditions), args),
      getAllArticlesCount(conditions),
    ]);

    return ({
      ...connection,
      count,
    });
  },
};

export const allArticlesField = {
  type : articleConnection,
  args : {
    ...connectionArgs,
    tags : {
      type        : new GraphQLList(GraphQLString),
      description : 'Filter for tags.',
    },
    type : {
      type        : GraphQLString,
      description : 'Type search string.',
    },
    search : {
      type        : GraphQLString,
      description : 'Text search string.',
    },
  },
  resolve : async (_, { tags, type, search, ...args }) => {
    const conditions = {
      tags,
      type,
      search,
    };

    const [
      connection,
      count,
    ] = await Promise.all([
      connectionFromPromisedArray(getAllArticles(conditions), args),
      getAllArticlesCount(conditions),
    ]);

    return ({
      ...connection,
      count,
    });
  },
};

export const allArticlesByCharField = {
  type : articleConnection,
  args : {
    ...connectionArgs,
    title : {
      type        : GraphQLString,
      description : 'Title search string.',
    },
  },
  resolve : async (_, { title, ...args }) => {

    const conditions = {
      title,
    };

    const [
      connection,
      count,
    ] = await Promise.all([
      connectionFromPromisedArray(getAllArticlesByChar(conditions), args),
      getAllArticlesCount(conditions),
    ]);

    return ({
      ...connection,
      count,
    });
  },
};

export const articleByIdField = {
  type : articleType,
  args : {
    id : {
      title : 'Article Id',
      type  : new GraphQLNonNull(GraphQLID),
    },
  },
  resolve : async (_, { id }) => getArticleById(fromGlobalId(id).id),
};

export const allTagsByCharField = {
  type : tagConnection,
  args : {
    ...connectionArgs,
    title : {
      type        : GraphQLString,
      description : 'Title search string.',
    },
  },
  resolve : async (_, { title, ...args }) => {

    const conditions = {
      title,
    };

    const [
      connection,
      count,
    ] = await Promise.all([
      connectionFromPromisedArray(getAllTagsByChar(conditions), args),
    ]);

    return ({
      ...connection,
      count,
    });
  },
};
