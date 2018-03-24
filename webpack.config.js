const path = require("path");
const webpack = require("webpack");
const nodeEnv = process.env.NODE_ENV || "production";

const config = {
  entry: ["./assets/scripts/scripts.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "assets/js"),
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourcemap: true,
    }),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  devtool: "cheap-eval-source-map",
};

module.exports = config;
