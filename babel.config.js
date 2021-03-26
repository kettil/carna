const { env, ignore } = require('./configs/babel.config.js');

module.exports = {
  extends: './configs/babel.config.js',
  env,
  ignore,
  presets: [['@babel/env', { modules: 'commonjs', targets: { node: '12' } }]],
};
