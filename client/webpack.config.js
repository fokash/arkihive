// declarations
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let bootstrapEntryPoints = require('./webpack.bootstrap.config');

let isProd = process.env.NODE_ENV === 'production'; // true or false
let cssDev = ['style-loader', 'css-loader', 'sass-loader'];
let cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    'css-loader', 'sass-loader'
  ],
  publicPath: '/dist/'
});
let cssConfig = isProd
  ? cssProd
  : cssDev;

let bootstrapConfig = isProd
  ? bootstrapEntryPoints.prod
  : bootstrapEntryPoints.dev;

module.exports = {
  // JS configration
  entry: {
    app: './src/index.js',
    bootstrap: bootstrapConfig
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      // loaders configuration
      {
        test: /\.scss$/,
        use: cssConfig
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        use: "file-loader?name=images/[hash:6].[ext]"
      }, {
        test: /\.ico$/i,
        use: "file-loader?name=/[name].[ext]"
      }, {
        test: /\.svg$/i,
        exclude: /fonts/,
        use: "file-loader?name=images/[hash:6].[ext]"
      }, {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: /images/,
        use: 'file-loader?limit=65000&mimetype=application/svg+xml&name=fonts/[hash:6].[ext]'
      }, {
        test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[hash:6].[ext]'
      }, {
        test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[hash:6].[ext]'
      }, {
        test: /\.[ot]tf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[hash:6].[ext]'
      }, {
        test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[hash:6].[ext]'
      }, {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        use: 'imports-loader?jQuery=jquery'
      }
    ]
  },
  // additional configuration for local server
  devServer: {
    contentBase: __dirname + '/dist',
    compress: true,
    hot: true,
    stats: 'errors-only',
    historyApiFallback: true
  },
  plugins: [
    // HTML configuration
    new HtmlWebpackPlugin({
      title: 'Arkihive',
      minify: {
        collapseWhitespace: true
      },
      hash: false,
      template: './src/index.html'
    }),
    // CSS configuration
    new ExtractTextPlugin({
      filename: '/css/[name].css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
