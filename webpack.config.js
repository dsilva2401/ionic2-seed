var webpack = require('webpack');
var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    'polyfills': './www/setup/polyfills.browser.ts',
    'vendor':    './www/setup/vendor.browser.ts',
    'main':       './www/setup/main.browser.ts',
  },

  output: {
    path: './',
    filename: 'www/dist/[name].bundle.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['www'] }
    })
  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
      { test: /\.html$/, loader: 'raw-loader' }
    ]
  },

  resolve: {
    root: [ path.join(__dirname, 'www') ],
    extensions: ['', '.ts', '.js']
  },

};