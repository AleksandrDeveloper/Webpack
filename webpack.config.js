const path = require("path");


// PLUGINS_VARIBLES
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

console.log('+++++++++++++++++++++++++++',process.env.NODE_ENV);

const isDevelopment =  process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;
 
module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  entry: {
    main: "./js/index.js",
    dev: "./js/alert.js",
    class: "./js/class.js",
  },
  output: {
    filename: isDevelopment?"./[name].js" :"./js/[name].[hash].js",
    path: path.resolve(__dirname, "build"),
  },
  /* DEV_SERVER */
  devServer: {
    contentBase: path.join(__dirname, "build"),
    port: 3000,
    hot:isDevelopment,
  },
  /* Dev_tools */
  devtool:isDevelopment?'source-map':'',
  /* Plugins */
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.ejs",
      minify:isProduction
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment? "./[name].css":"./style/[name].[hash].css",
    }),
  ], 
  /* Optimization */
  optimization: {
    splitChunks: {chunks: 'all'},
    minimize:isProduction,
    minimizer: [
      new UglifyJsPlugin(),
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin()
    ],
  },
  /* Module */
  module: {
    rules: [
      //JAVASCRIPT FILE
      {
        test: /\.js/,
        exclude: /node_modules/,
        use:[
          {loader:"babel-loader"},
          {loader:'eslint-loader'}
        ],
      },
      // HTML FILE
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      // iMAGES FILE
      {
        test: /\.(png|jpeg|ico|webp|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              esModule: false,
              outputPath: "./assets/images",
            },
          },
        ],
      },
      // FONTS FILE
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/fonts",
            },
          },
        ],
      },
      // SCSS FILE
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "../" },
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: "./postcss.config.js" },
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
};
