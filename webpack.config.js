// declarations
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let webpack = require('webpack');
let bootstrapEntryPoints = require('./webpack.bootstrap.config');

let isProd = process.env.NODE_ENV === 'production'; // true or false
let cssDev = ['style-loader', 'css-loader', 'sass-loader'];
let cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    'css-loader', 'sass-loader'
  ],
  publicPath: '/dist'
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
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: "file-loader?name=images/[hash:12].[ext]"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      }, {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
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
    // disabling jquery in the entire site
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
};
