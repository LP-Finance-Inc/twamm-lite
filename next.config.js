const libs = ['@solana/wallet-adapter-base'];
const withTM = require('next-transpile-modules')(libs);

/** @type {import('next').NextConfig} */

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    const cfg = {
      ...config,
      resolve: {
        ...config.resolve,
        fallback: {
          fs: false,
          os: false,
          path: false,
        },
      },
    };

    if (!isServer) {
      cfg.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20480,
      };
    }

    return cfg;
  },
});

module.exports = nextConfig;
