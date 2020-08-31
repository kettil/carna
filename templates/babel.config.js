const { env } = require('./node_modules/carna/configs/babel.config.js');

module.exports = {
  extends: './node_modules/carna/configs/babel.config.js',
  presets: [
    ['@babel/env', { modules: '%BABEL_MODULE_TYPE%' }],
    // '@babel/preset-react',
  ],
  env,
};
