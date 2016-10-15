import Relay from 'react-relay';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import mapProps from 'recompose/mapProps';
import createContainer from 'recompose-relay/createContainer';
import Article from './component';

const randomColor = () => {
  const letters = '0123456789ABCDEF';
  
  return Array
    .from(Array(6))
    .reduce((color) => color + letters[Math.floor(Math.random() * 16)], '#');
};

const withColorState = withState('articleColor', 'setArticleColor', 'inherit');
const withRandomColorSetter = mapProps(({ setArticleColor, ...props }) => ({
  ...props,
  setRandomColor : () => setArticleColor(randomColor()),
}));

const withRelayContainer = createContainer({
  fragments : {
    article : () => Relay.QL`
      fragment on Article {
        id
        title
        body
      }
    `,
  },
});

const withFlatArticleProps = mapProps(({ article, ...props }) => ({
  ...props,
  ...article,
}));

export default compose(
  withRelayContainer,
  withFlatArticleProps,
  withColorState,
  withRandomColorSetter,
)(Article);
