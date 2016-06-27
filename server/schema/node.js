/**
 * @file    global node definitions.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import Article, { getArticleById } from '../model/article';
import ArticleType from './types/article';

export const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);

    if (type === 'Article') {
      return getArticleById(id);
    }

    return null;
  },
  (object) => {
    if (object instanceof Article) {
      return ArticleType;
    }

    return null;
  }
);
