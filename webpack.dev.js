const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge.smart(
  {
    mode: "development",
    devServer: {
      writeToDisk: true
    },
    output: {
      path: path.resolve(__dirname, "dist")
    },
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|gif)$/i,
          //include: path.resolve(__dirname, "src/images"),
          //exclude: path.resolve(__dirname, "src/node_modules"),
          // exclude: [
          //   path.resolve(__dirname, "src/theme/fonts"),
          //   path.resolve(__dirname, "src/node_modules")
          // ],
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[name].[hash:8].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(c|sc)ss$/i,
          use: ["style-loader"]
        }
      ]
    }
  },
  common
);
