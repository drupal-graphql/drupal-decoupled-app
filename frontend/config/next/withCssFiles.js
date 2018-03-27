module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      // Inherit the previous configuration.
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }

      config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext].js',
            },
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                require.resolve(
                  'babel-plugin-transform-es2015-modules-commonjs'
                ),
                require.resolve('styled-jsx/babel'),
              ],
            },
          },
          {
            loader: 'styled-jsx-css-loader',
          },
        ],
      });

      return config;
    },
  });
