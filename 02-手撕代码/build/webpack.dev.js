const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackCommonConf = require('./webpack.common.js')
const { distPath } = require('./paths.js')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {
        port: 3000,
        // 显示打包的进度条
        progress: true,
        // 根目录
        contentBase: distPath,
        // 自动打开浏览器
        open: false,
        // 启动 gzip 压缩
        compress: true
    },
    devtool: 'eval-cheap-source-map'
})
