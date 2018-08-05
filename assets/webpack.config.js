const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Since Webpack will be run directly within Phoenix, we'll use the `MIX_ENV`
// variable instead of `NODE_ENV`.
const env = process.env.MIX_ENV === 'prod' ? 'production' : 'development';

module.exports = {
  entry: [
    path.join(__dirname, 'js/app.js'),
    path.join(__dirname, 'css/app.css')
  ],
  output: {
    path: path.join(__dirname, '../priv/static'),
    filename: 'js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['priv/static'], {
      root: path.join(__dirname, '..')
    }),
    new MiniCSSExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/app.css'
    }),
    new CopyWebpackPlugin([{ from: path.join(__dirname, 'static') }])
  ],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      phoenix: path.join(__dirname, '../deps/phoenix/priv/static/phoenix.js'),
      phoenix_html: path.join(
        __dirname,
        '../deps/phoenix_html/priv/static/phoenix_html.js'
      )
    }
  }
};
