/* eslint-disable import/no-extraneous-dependencies */
const { output, ...config } = require('carna/configs/webpack.config.js')(__dirname);

module.exports = Object.assign(config, {
  output: Object.assign(output, {
    filename: '%PACKAGE_FILENAME%.js',
    library: '%PACKAGE_LIBRARY%',
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
