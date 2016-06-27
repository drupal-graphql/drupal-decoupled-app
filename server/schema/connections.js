/**
 * @file    graphql/relay connections.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import { connectionDefinitions } from 'graphql-relay';
import ArticleType from './types/article';

export const { connectionType: articleConnection } = connectionDefinitions({
  name: 'Articles',
  nodeType: ArticleType,
});
