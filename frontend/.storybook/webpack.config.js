const storybookDefaults = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const storybookAmazee = require('@amazee/react-scripts/config/webpack/webpack.storybook');

module.exports = (baseConfig, env) => {
  const config = storybookDefaults(baseConfig, env);
  return storybookAmazee(config);
};

