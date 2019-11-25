const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/index.js",
    dropwownScript: "./src/components/primitive-components/dropdown/script.js",
    checkboxItem:
      "./src/components/primitive-components/checkbox-item/script.js",
    checkboxList:
      "./src/components/primitive-components/checkbox-list/script.js",
    rateButton: "./src/components/primitive-components/rate-button/script.js",
    button: "./src/components/primitive-components/button/script.js",
    button: "./src/components/primitive-components/bullet-list/script.js",
    header: "./src/components/header/script.js"
  },
  output: {
    path: path.resolve(__dirname, "dist")
    //filename: "[name].js"
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader"
      //   }
      // },

      {
        test: /\.pug$/,
        use: ["html-loader", "pug-html-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.pug",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
