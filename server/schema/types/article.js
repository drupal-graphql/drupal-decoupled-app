/**
 * @file    mock schema for articles.
 * @author  Sebastian Siemssen <sebastian@amazeelabs.com>
 * @date    2016-06-21
 */

import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../node';

export default new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: globalIdField('Article'),
    title: {
      title: 'Title',
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      title: 'Body',
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});
