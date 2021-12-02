const commonPaths = require("./paths");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");
const { InjectManifest } = require( 'workbox-webpack-plugin' );

module.exports = {
  mode: "production",
  output: {
    filename: `${commonPaths.jsFolder}/[name].[hash].js`,
    path: commonPaths.outputPath,
    publicPath: '/',
    chunkFilename: `${commonPaths.jsFolder}/[name].[chunkhash].js`,
  },
  // :: start options optimization
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        // cache: true,
        // sourceMap: true, // deprec
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: require.resolve("cssnano-preset-simple"),
        },
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
          CssMinimizerPlugin.cleanCssMinify,
        ],
      }),
    ],
    splitChunks: {
      // Automatically split vendor and commons
      // https://webpack.js.org/plugins/split-chunks-plugin/
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        antd: {
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
          name: "antd",
          chunks: "all",
        },
        core: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "core",
          chunks: "all",
        },
        utilVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
          name: "utilVendor",
          chunks: "all",
        },
        vendors: {
          test: /[\\/]node_modules[\\/](!antd)(!react)(!react-dom)(!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: "vendors",
          chunks: "initial",
        },
        async: {
          test: /[\\/]node_modules[\\/](!antd)(!react)(!react-dom)(!lodash)(!moment)(!moment-timezone)[\\/]/,
          name: "async",
          chunks: "async",
          priority: -10,
          minChunks: 2,
        }
      },
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: {
      name: "manifest",
    },
  },
  // :: start options module
  module: {
    rules: [
      {
				test: /\.js$/,
				use: 'babel-loader',
			},
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: commonPaths.imagesFolder,
              esModule: false,
            },
          },
        ],
      },
    ]
  },
  // :: start options plugins
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${commonPaths.cssFolder}/[name].css`,
      chunkFilename: `${commonPaths.cssFolder}/[name].css`,
    }),
    new WebpackManifestPlugin({
      // Not to confuse with manifest.json
      fileName: commonPaths.assetManifest, 
    }),
    new InjectManifest( {
      // Workbox config <<
      swSrc: './src/src-sw.js',
      swDest: 'sw.js',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: commonPaths.manifest, to: commonPaths.outputPath },
        { from: commonPaths.robotTxt, to: commonPaths.outputPath },
      ]
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  // :: start options devtools
  devtool: false,
  // :: start options performance
  performance: {
    hints: "warning",
    // Calculates sizes of gziped bundles.
    assetFilter(assetFilename) {
      return assetFilename.endsWith(".js.gz");
    },
  },
}