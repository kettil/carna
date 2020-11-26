const path = require('path');

const regexpNodeModule = /\/node_modules\//;
const regexpLocale = /^\.\.?\//;

module.exports = (root) => ({
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(root, 'build'),
    // filename: '%PACKAGE_FILENAME%.js',
    // library: '%PACKAGE_LIBRARY%',

    // libraryTarget: 'umd',
    libraryTarget: 'commonjs',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        include: path.resolve(root, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/env', { modules: 'commonjs', targets: 'defaults' }]],
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    minimize: false,
  },

  externals: [
    ({ context, request }, callback) => {
      // Marks all external packages as "external" so that they are not integrated
      if (regexpNodeModule.test(context) || !regexpLocale.test(request)) {
        return callback(undefined, `commonjs ${request}`);
      }

      return callback();
    },
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
});
