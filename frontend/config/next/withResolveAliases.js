module.exports = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    webpack: (config, options) => {
      // Inherit the previous configuration.
      if (typeof nextConfig.webpack === 'function') {
        config = nextConfig.webpack(config, options);
      }

      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        ...(nextConfig.resolveAliases || {}),
      };

      return config;
    },
  });
