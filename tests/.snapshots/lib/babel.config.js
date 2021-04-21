/* eslint-disable import/no-extraneous-dependencies */
const { env } = require('carna/configs/babel.config.js');

module.exports = {
  extends: './node_modules/carna/configs/babel.config.js',
  presets: [['@babel/env', { modules: 'commonjs', targets: '14' }]],
  env,
};
