const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const commonPaths = require("./paths");

module.exports = {
  entry: ["babel-polyfill", commonPaths.entryPath],
  module: {
    rules: [
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".css", ".scss"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      hash: true,
      inject: true,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: commonPaths.favIco, to: commonPaths.imagesFolder },
        { from: commonPaths.appleIcon, to: commonPaths.imagesFolder },
      ]
    }),
  ],
};