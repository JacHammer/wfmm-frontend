/* eslint-disable max-len */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    main: ['core-js/stable',
      'regenerator-runtime/runtime',
      './src/index.js',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/wfmm',
    publicPath: '/wfmm',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: '/wfmm',
    publicPath: '/wfmm',
    allowedHosts: [
      '.ddsch.com',
      'ddsch.com',
    ],

  },
  plugins: [
    new BundleAnalyzerPlugin({openAnalyzer: false}),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'public'},
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },

};
