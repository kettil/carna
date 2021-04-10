/* eslint-disable import/no-extraneous-dependencies */
const { env, ignore } = require('carna/configs/babel.config.js');

module.exports = {
  extends: './node_modules/carna/configs/babel.config.js',
  ignore,
  env,
  presets: [
    ['@babel/env', { modules: false, targets: { node: '14' } }],
    // ['@babel/env', { modules: 'commonjs', targets: 'defaults' }],
    // ['@babel/env', { modules: false, targets: { node: '14' } }],
    // '@babel/preset-react',
  ],
};
