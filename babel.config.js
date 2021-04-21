const { env } = require('./configs/babel.config.js');

module.exports = {
  extends: './configs/babel.config.js',
  presets: [['@babel/env', { modules: 'commonjs', targets: { node: '14' } }]],
  env,
};
