/* eslint-disable import/no-extraneous-dependencies */
const { output, ...config } = require('carna/configs/webpack.config.js')(__dirname);

module.exports = Object.assign(config, {
  output: Object.assign(output, {
    filename: 'lib.js',
    library: 'lib',
  }),

  /*
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
  */
});
