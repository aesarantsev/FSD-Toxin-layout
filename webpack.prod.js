const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserJSPlugin = require('terser-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge.smart({
  mode: 'production',
  //devtool: 'none', // 'source-map'
  output: {
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      // {
      //   test: /\.(png|svg|jpg|gif)$/i,
      //   exclude: path.resolve(__dirname, 'src/theme/fonts'),
      //   use:[
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         // limit: 4096,
      //         name: '[name].[contenthash].[ext]'
      //       }
      //     },
      //     'image-webpack-loader'
      //   ]
      // },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        //include: path.resolve(__dirname, "src/images"),
        exclude: [
          path.resolve(__dirname, "src/theme/fonts"),
          // path.resolve(__dirname, "node_modules")
        ],
        use: [
          {
            loader: "file-loader",
            options: {
              // output: "images",
              name: "images/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(c|sc)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    // minimizer: [
    //   new TerserJSPlugin({}),
    //   new OptimizeCSSAssetsPlugin({})
    // ],
    // moduleIds: 'hashed',
    // runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'all',
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors'
    //     }
    //   }
    // }
  }
}, common);

module.exports.plugins.push(new MiniCssExtractPlugin({
  filename: 'styles/[name].[contenthash].css'
}));
