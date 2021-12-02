const webpack = require("webpack");
const commonPaths = require("./paths");

module.exports = {
  mode: "development",
  output: {
    filename: "[name].js",
    path: commonPaths.outputPath,
    publicPath: '/',
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
			},
			{
				test: /\.css?$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|j?g|svg|gif)?$/,
        use: 'file-loader?name=./images/[name].[ext]'
			}
		]
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 9999,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};