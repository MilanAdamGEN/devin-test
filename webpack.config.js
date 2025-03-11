const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: "./src/background.js",
    content: "./src/content.js",
    popup: "./src/popup.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "." },
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/img", to: "icons" },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
