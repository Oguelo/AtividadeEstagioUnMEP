module.exports = {
    webpack: (config, { isServer }) => {
      // Disable processing of static images on the server side
      if (isServer) {
        config.module.rules.push({
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'ignore-loader',
            },
          ],
        });
      }
  
      return config;
    },
  };
  