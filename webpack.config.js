// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');
// const { InjectManifest } = require( 'workbox-webpack-plugin' );
// const CopyPlugin = require( 'copy-webpack-plugin' );

// const webpackPlugins = [
//   new HtmlWebpackPlugin({
//     template: path.resolve( __dirname, 'public/index.html' ),
//     filename: 'index.html'
//   }),
//   new CopyPlugin({
//     patterns: [
//       { from: path.resolve(__dirname, "./", "public/assets/images/favicon.ico"), to: 'assets/images/' },
//       { from: path.resolve(__dirname, "./", "public/manifest.json"), to: '' },
//       { from: path.resolve(__dirname, "./", "public/assets/images/logo512.png"), to: 'assets/images/' },
//     ],
//   })
// ]

// if ( 'production' === process.env.NODE_ENV ) {
//   webpackPlugins.push( new InjectManifest( {
//     swSrc: './src/src-sw.js',
//     swDest: 'sw.js',
//   } ) );
// }

// module.exports = {
//   context: __dirname,
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'main.js',
//     publicPath: '/'
//   },
//   devServer: {
//     historyApiFallback: true
//   },
//   module: {
		// rules: [
		// 	{
		// 		test: /\.js$/,
		// 		use: 'babel-loader',
		// 	},
		// 	{
		// 		test: /\.css?$/,
		// 		use: [ 'style-loader', 'css-loader' ]
		// 	},
		// 	{
		// 		test: /\.(png|j?g|svg|gif)?$/,
    //     use: 'file-loader?name=./images/[name].[ext]'
		// 	}
		// ]
// 	},
//   plugins: webpackPlugins
// };

const { merge } = require('webpack-merge');
const common = require("./webpack/webpack.common");

const envs = {
  development: "dev",
  production: "prod",
};
const env = envs[process.env.NODE_ENV || "development"];
console.log("WEBPACK_CONFIG:::", process.env.NODE_ENV, env)
const envConfig = require(`./webpack/webpack.${env}.js`);
module.exports = merge(common, envConfig);