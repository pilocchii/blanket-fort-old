const path = require('path');

module.exports = {
  entry: './src/main.js',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader!awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};