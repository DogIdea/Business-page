const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const path = require('path');

let  WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
let getHtmlConfig=function(name) {
  return {
    template: './src/view/' + name + '.html',
    filename:  'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}
const config = {
  entry:{
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'js/[name].js'
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' }
    ]
  },
  resolve: {
    alias: {
      util: path.resolve(__dirname,'src/util'),
      page: path.resolve(__dirname, 'src/page'),
      image: path.resolve(__dirname, 'src/image'),
      service: path.resolve(__dirname,'src/service')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename:'js/base.js'
    }),
    new ExtractTextPlugin("css/[name].css"),
    new HtmlWebpackPlugin(getHtmlConfig('index'))
 ]
}
if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports=config;