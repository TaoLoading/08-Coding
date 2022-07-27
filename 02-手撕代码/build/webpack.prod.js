const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackCommonConf = require('./webpack.common.js')
const { distPath } = require('./paths.js')

// 包体积分析
const isAnalyzer = process.env.NODE_ENV === 'production_analyzer'

// webpack plugins
const plugins = [
    new webpack.DefinePlugin({
        ENV: JSON.stringify('production')
    }),
    new CleanWebpackPlugin()
]
if (isAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        // 打包代码时，加上 hash 戳
        filename: 'bundle.[contenthash:8].js',
        path: distPath
    },
    plugins,
    devtool: 'source-map'
})
