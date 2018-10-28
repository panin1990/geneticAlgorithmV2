const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  "mode": "development",
  "entry": {
    "app": "./src/index.ts"
  },
  "devtool": "source-map",
  "module": {
    "rules": [
      {
        "test": /\.tsx?$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "ts-loader",
          "options": {
            "transpileOnly": true
          }
        }
      },
      {
        "test": /\.scss$/,
        "use": [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  "resolve": {
    "extensions": ['.ts', '.js', '.json']
  },
  "output": {
    "path": __dirname+'/dist',
    "filename": "[name].bundle.js"
  },
  "plugins": [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      publicPath: __dirname+'/dist',
      server: { baseDir: [__dirname+'/dist'] }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/dist/',
    host: '127.0.0.1',
    port: 8080,
    open: true
  },
  watchOptions: {
    ignored: /node_modules/
  },
  watch: true
};