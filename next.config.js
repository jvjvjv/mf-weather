const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    
    config.plugins.push(
      new NextFederationPlugin({
        name: 'weather',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './WeatherWidget': './components/WeatherWidget.tsx',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
          },
          '@mui/material': {
            singleton: true,
            requiredVersion: false,
          },
          '@emotion/react': {
            singleton: true,
            requiredVersion: false,
          },
          '@emotion/styled': {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
