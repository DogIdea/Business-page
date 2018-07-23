const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
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
    'list': ['./src/page/list/index.js'],
    'detail': ['./src/page/detail/index.js'],
    'cart': ['./src/page/cart/index.js'],
    'order-confirm': ['./src/page/order-confirm/index.js'],
    'user-login': ['./src/page/user-login/index.js'],
    'user-register': ['./src/page/user-register/index.js'],
    'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
    'user-pass-update': ['./src/page/user-pass-update/index.js'],
    'user-center': ['./src/page/user-center/index.js'],
    'user-center-update': ['./src/page/user-center-update/index.js'],
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
    new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail','商品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('order-confirm','订单确认页')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
 ],
  devServer: {
    port: 8088,
    inline: true,
    historyApiFallback: {
      index:'/dist/view/index.html'
    },
    proxy: {
      '/user/': {
        target:'http://admintest.happymmall.com',
        changeOrigin:true
      },
      '/product/': {
        target:'http://admintest.happymmall.com',
        changeOrigin:true
      },
      '/cart/': {
        target:'http://admintest.happymmall.com',
        changeOrigin:true
      },
      '/shipping/': {
        target:'http://admintest.happymmall.com',
        changeOrigin:true
      },
      '/order/': {
        target:'http://admintest.happymmall.com',
        changeOrigin:true
      },
    }
  }
}


module.exports=config;