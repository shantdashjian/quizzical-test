const path = require("path");

module.exports = {
  mode: "development",
  output: {
    filename: "[name].pack.js",
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
        test: /\.js$/,
      },
    ],
  },
  entry: {
    index: "./index",
  },
};
