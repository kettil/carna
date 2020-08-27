const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: '%PACKAGE_FILENAME%.js',
    path: path.resolve(__dirname, 'build'),
    library: '%PACKAGE_LIBRARY%',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        include: path.resolve(__dirname, 'src'),
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
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
