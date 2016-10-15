import compose from 'recompose/compose';
import withState from 'recompose/withState';
import mapProps from 'recompose/mapProps';
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

export default compose(
  withColorState,
  withRandomColorSetter,
)(Article);
