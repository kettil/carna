const { output, ...config } = require('./node_modules/carna/configs/webpack.config.js')(__dirname);

module.exports = Object.assign(config, {
  output: Object.assign(output, {
    filename: 'app.js',
    library: 'app',
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
