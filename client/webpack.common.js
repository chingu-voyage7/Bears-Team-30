const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  context: APP_DIR, 
  entry: './index.jsx',
  output: {
    filename: 'bundle.[hash].js',
    path: BUILD_DIR,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(["public"]),
    new HtmlWebpackPlugin({
      title: "Bears-team-30",
      template: path.resolve(APP_DIR, "template/index.html") 
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/graphql': 'http://localhost:4000',
    },
  },
}
