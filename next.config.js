const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable CORS for federated modules
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  
  webpack(config, options) {
    const { isServer } = options;
    
    config.plugins.push(
      new NextFederationPlugin({
        name: '@jvjvjv/weather',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './WeatherWidget': './components/WeatherWidget.tsx',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
          '@mui/material': {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
          '@emotion/react': {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
          '@emotion/styled': {
            singleton: true,
            requiredVersion: false,
            eager: false,
          },
        },
        // Additional configuration for better library behavior
        extraOptions: {
          automaticAsyncBoundary: true,
        },
      })
    );

    return config;
  },
};

module.exports = nextConfig;
