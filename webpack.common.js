const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {},
  output: {
    filename: "scripts/[name].[hash:8].js"
  },
  module: {
    rules: [
      //
      //Loading FONTS
      //
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        include: path.resolve(__dirname, "src/theme/fonts"),
        exclude: path.resolve(__dirname, "src/images"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[contenthash].[ext]"
            }
          }
        ]
      },

      //
      //Loading PUG
      //
      {
        test: /\.pug$/i,
        use: [
          {
            loader: "pug-loader",
            options: {
              // Base dir for absolute imports
              // root: path.resolve(__dirname, "src/blocks")
            }
          }
        ]
      },

      //
      //Loading CSS / SCSS
      //
      {
        test: /\.(c|sc)ss$/i,
        use: [
          "css-loader",
          {
            loader: "resolve-url-loader",
            options: {
              removeCR: true // to prevent 'no orphan CR found'
            }
          }, // needed for correct path resolving
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
      blocksPath: path.resolve(__dirname, "src/blocks"),
      imagesPath: path.resolve(__dirname, "src/images")
    }
  }
};

const pathToEntries = path.join(module.exports.context, "pages");
const types = [".js", ".scss"];

[
  "cards",
  "colorsType",
  "formElements",
  "headersAndFooters",
  "landing",
  "searchRoom"
].forEach(entryName => {
  const entryFiles = [];
  const dashedName = entryName;
  const pathToEntry = path.join(pathToEntries, dashedName);
  types.forEach(type => {
    const entryFile = path.join(pathToEntry, `${dashedName}${type}`);
    if (fs.existsSync(entryFile)) {
      entryFiles.push(entryFile);
    }
  });
  if (entryFiles.length) {
    module.exports.entry[entryName] = entryFiles;
  }
  module.exports.plugins.push(
    new HtmlWebpackPlugin({
      template: path.join(pathToEntry, `${dashedName}.pug`),
      filename: `${dashedName}.html`,
      chunks: [entryName]
    })
  );
});
