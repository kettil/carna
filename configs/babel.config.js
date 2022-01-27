module.exports = {
  presets: [['@babel/env', { modules: 'commonjs', targets: { node: '16' } }], '@babel/preset-typescript'],

  comments: false,

  env: {
    test: {
      // extra configuration for process.env.NODE_ENV === 'test'
      presets: ['@babel/env'], // overwrite env-config from above with transpiled module syntax
      plugins: [['@babel/plugin-transform-runtime']],
    },
  },
};
