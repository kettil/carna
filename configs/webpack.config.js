const path = require('path');

module.exports = (root) => ({
  mode: 'production',
  entry: './src/index.ts',
  output: {
    // filename: '%PACKAGE_FILENAME%.js',
    path: path.resolve(root, 'build'),
    // library: '%PACKAGE_LIBRARY%',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        include: path.resolve(root, 'src'),
        use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
});
