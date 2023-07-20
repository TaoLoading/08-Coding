module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/public',
    filename: './js/[name].js'
  },
  devServer: {
    port: 8080,
    contentBase: 'public',
    historyApiFallback: true
  }
}
