module.exports = {
  ignore: ['**/*.test.js', '**/*.test.ts', '**/*.test.tsx', '**/*.test-d.ts'],
  presets: ['@babel/env', '@babel/preset-typescript'],
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
