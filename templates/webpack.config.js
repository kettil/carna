const { output, ...config } = require('./node_modules/carna/configs/webpack.config.js')(__dirname);

Object.assign(config, {
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
