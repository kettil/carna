module.exports = {
  presets: [
    ['@babel/env', { modules: false }],
    '@babel/preset-typescript',
    // '@babel/preset-react',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime', // replace helper code with runtime imports (deduplication)
      { corejs: 3 }, // import corejs polyfills exactly where they are needed
    ],
  ],
  env: {
    test: {
      // extra configuration for process.env.NODE_ENV === 'test'
      presets: ['@babel/env'], // overwrite env-config from above with transpiled module syntax
    },
  },
};
