var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'app/index.html'),
  }),
];

module.exports = {
  entry: path.join(__dirname, 'app/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test:/\.(gif|png|jpe?g|svg)$/i,
        exclude:/node_modules/,
        use:['file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        },],
      },
      {
        test: /\.css$/,
        use: ['css-loader' ]
      }
    ],
  },
  plugins: plugins,
};