/* eslint-disable global-require */

/**
 * @file    global node definitions.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import {
  Article,
  getArticleById,
} from './models/article';

export const {
  nodeInterface,
  nodeField,
} = nodeDefinitions(
  async (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Article') {
      return getArticleById(id);
    }

    return null;
  },
  (object) => {
    if (object instanceof Article) {
      const { articleType } = require('./types/article');
      return articleType;
    }

    return null;
  }
);
