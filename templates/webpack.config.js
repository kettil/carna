const config = require('./node_modules/carna/configs/webpack.config.js');

module.exports = {
  ...config,

  output: {
    ...config.output,

    filename: '%PACKAGE_FILENAME%.js',
    library: '%PACKAGE_LIBRARY%',
  },
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
};
