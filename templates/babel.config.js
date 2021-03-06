const { env } = require('./node_modules/carna/configs/babel.config.js');

module.exports = {
  extends: './node_modules/carna/configs/babel.config.js',
  env,
  presets: [
    ['@babel/env', { modules: '%BABEL_MODULE_TYPE%', targets: '%BABEL_MODULE_TARGET%' }],
    // '@babel/preset-react',
  ],
};
