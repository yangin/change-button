const path = require('path');
const webpack = require('webpack');
const nodeExternals  = require('webpack-node-externals');
const webpackConfigBase = require('./webpack.base.config');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');


function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  mode: 'production',
  //entery为webpack解析的入口（解析各种包依赖关系的入口），而不是项目访问的入口
  //官网描述：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始
  entry: {
    app: [resolve('../src/components/index.js')],
  },

  //output为项目打包后的输出位置
  //官网描述：告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist
  output: {
    filename: 'change-button.js',
    path: resolve('../lib'), //path为打包后的输出文件夹位置，此处为 ./dist文件夹
    libraryTarget:'commonjs2'
  },

  devtool: 'source-map',  //或使用'cheap-module-source-map'、'none'
  // optimization: {
  //   minimizer: [
  //     // 压缩js代码
  //     new TerserJSPlugin({// 多进程压缩
  //       parallel: 4,// 开启多进程压缩
  //       terserOptions: {
  //         compress: {
  //           // drop_console: true,   // 删除所有的 `console` 语句
  //         },
  //       },
  //     }),
  //     //压缩css代码
  //     new OptimizeCSSAssetsPlugin()
  //   ],
  // },
  externals: [nodeExternals()],
  plugins:[
    new CleanWebpackPlugin() //每次执行都将清空一下./dist目录
  ]
}
module.exports = merge(webpackConfigBase, webpackConfigProd)