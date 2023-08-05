const path = require("path");
const webpack = require("webpack");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    application: "./app/javascript/packs/application.js",
    index: "./app/javascript/packs/index.jsx"
  },
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "public/packs"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new WebpackManifestPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
