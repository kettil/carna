/* eslint-disable import/no-extraneous-dependencies */
const { env } = require('carna/configs/babel.config.js');

module.exports = {
  extends: './node_modules/carna/configs/babel.config.js',
  env,
  presets: [
    ['@babel/env', { modules: '%BABEL_MODULE_TYPE%', targets: '%BABEL_MODULE_TARGET%' }],
    // ['@babel/env', { modules: 'commonjs', targets: 'defaults' }],
    // ['@babel/env', { modules: false, targets: { node: '14' } }],
    // '@babel/preset-react',
  ],
};
