const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let  WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
let getHtmlConfig=function(name,title) {
  return {
    template: './src/view/' + name + '.html',
    favicon: './favicon.ico',
    filename:  'view/' + name + '.html',
    title: title,
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}
const config = {
  entry:{
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
    'result': ['./src/page/result/index.js']

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
    rules: [
      {
        test:/\.string$/,
        use:[
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      node_modules: path.resolve(__dirname,'node_modules'),
      util: path.resolve(__dirname,'src/util'),
      page: path.resolve(__dirname, 'src/page'),
      image: path.resolve(__dirname, 'src/image'),
      service: path.resolve(__dirname,'src/service')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    new ExtractTextPlugin("css/[name].css"),
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    // new HtmlWebpackPlugin(getHtmlConfig('login','登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
 ]
}
if('dev' === WEBPACK_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports=config;