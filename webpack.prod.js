const path = require("path");
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  externals: [nodeExternals()],
  entry: {
    main: "./src/index.ts",
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'umd',
  },
  resolve: {
    modules: [path.resolve(__dirname, './src')],
    extensions: ['.js', '.ts'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
};
