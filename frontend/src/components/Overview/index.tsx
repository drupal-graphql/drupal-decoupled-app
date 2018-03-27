import * as R from 'ramda';
import React from 'react';
import { compose, withPropsOnChange } from 'recompose';
import { graphql } from 'react-apollo';
import Link from '@components/Link';
import ArticleTeaser from '@components/ArticleTeaser';
import PageTeaser from '@components/PageTeaser';
import withApollo from '@shared/withApollo';
import query from './query.gql';

const Overview = ({
  loading,
  entities = [],
  hasPreviousPage,
  hasNextPage,
  previousPagePath,
  nextPagePath,
}) =>
  (!loading && (
    <div className="Wrapper">
      <h1>Node overview</h1>
      <ul>
        {entities.map(entity => {
          switch (entity && entity.__typename) {
            case 'NodeArticle':
              return <ArticleTeaser {...entity} />;

            case 'NodePage':
              return <PageTeaser {...entity} />;

            default:
              return null;
          }
        })}
      </ul>
      <div>
        {hasPreviousPage && <Link href={previousPagePath}>Previous</Link>}
        {hasNextPage && <Link href={nextPagePath}>Next</Link>}
      </div>
    </div>
  )) ||
  null;

const pickLoading = R.propOr(false, 'loading');
const pickCount = R.pathOr(0, ['nodeQuery', 'count']);
const pickEntities = R.pathOr(0, ['nodeQuery', 'entities']);

const withQuery = graphql(query, {
  options: props => ({
    variables: {
      offset: props.page * (props.pageSize || 5),
      limit: props.pageSize || 5,
    },
  }),
  props: ({ ownProps, data }) => ({
    ...ownProps,
    loading: pickLoading(data),
    count: pickCount(data),
    entities: pickEntities(data),
  }),
});

const pickPage = R.compose(
  Math.abs,
  R.flip(R.curryN(2, parseInt))(10),
  R.pathOr(0, ['url', 'query', 'page'])
);

const withPagination = withPropsOnChange(['url'], props => ({
  page: pickPage(props),
}));

const withPaginationLinks = withPropsOnChange(['count', 'page'], props => ({
  hasPreviousPage: props.page > 0,
  hasNextPage: props.page + 1 < props.count / (props.pageSize || 5),
  previousPagePath:
    props.page - 1 > 0 ? `/node?page=${props.page - 1}` : '/node',
  nextPagePath: `/node?page=${props.page + 1}`,
}));

export default compose(
  withApollo,
  withPagination,
  withQuery,
  withPaginationLinks
)(Overview);
