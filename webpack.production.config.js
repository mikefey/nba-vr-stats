const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './assets/js/src/app.js',
  output: {
    path: 'build/',
    filename: 'app.build.js',
    libraryTarget: 'umd',
    library: 'NBA VR Stats',
  },
  devtool: 'eval',
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'source-map',
      },
    ],
    loaders: [
      {
        test: /\.scss$/,
        include: /scss/,
        loader: ExtractTextPlugin.extract(['css', 'sass']),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=/assets/fonts/[name].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=8192',
          'img',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'babel?presets[]=stage-0,presets[]=react,presets[]=es2015',
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('app.build.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
