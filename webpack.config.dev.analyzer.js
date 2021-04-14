const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: 'development',
  devtool: "source-map",
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@templates': path.resolve(__dirname, 'src', 'templates'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@images': path.resolve(__dirname, 'src', 'assets', 'images'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // test: /\.png/,
        type: 'asset/resource',
        // type: path.resolve('asset', 'resource')
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            // limit: limite de tamaño
            limit: 10000,
            // Mimetype: tipo de dato
            mimetype: "application/font-woff",
            // name: nombre de salida, como esta no le cambia el nombre
            name: "[name].[contenthash].[ext]",
            // outputPath: donde se va a guardar en la carpeta final
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html'
    }),
    new MiniCSSExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets', 'images'),
          to: path.join('assets', 'images')
        }
      ]
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3000
  }
};