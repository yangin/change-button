const path = require('path');
const webpack = require('webpack');
const webpackConfigBase = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigDev = {
  mode: 'development', //设置为development模式
    //entery为webpack解析的入口（解析各种包依赖关系的入口），而不是项目访问的入口
  //官网描述：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
  entry: {
    app: [resolve('../src/index.js')],
  },

  //output为项目打包后的输出位置
  //官网描述：告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist
  output: {
    path: resolve('../lib'), //path为打包后的输出文件夹位置，此处为 ./dist文件夹
    filename: 'change-button.js',
  },

  devtool: 'cheap-module-eval-source-map',   //生成source-map，方便在页面端定位报错，否则都是压缩后的代码，没法定位错误
  //devServer 为热更新服务，通过hot:true来启动
  devServer: {
    // proxy: { // proxy URLs to backend development server
    //   '/api': 'http://localhost:3000'
    // },
    contentBase: resolve('../lib'),  //启动的目录
    hot: true,
    open: true,    //启动后是否在浏览器自动打开
    host: 'localhost',
    port: 8090,
  },

  plugins: [
        //为项目生成一个可以访问的html文件，否则全是.js文件，没有访问的页面入口。默认为index.html
        new HtmlWebpackPlugin({
          template: './public/index.html',  //引用模板html文件生成项目的入口文件html
        }),
    new webpack.NamedModulesPlugin(),  //启用模块名，来代替moduleId，因为热更新默认会为每个module以id命名，当一个module删除时，其他module的id需要重排，因此都会重新更新，不利于局部热更新
    new webpack.HotModuleReplacementPlugin()  //热模块替换，实现局部热更新
  ]
}

module.exports = merge(webpackConfigBase, webpackConfigDev)