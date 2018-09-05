const dev = process.env.NODE_ENV !== "production";
const path = require( "path" );
const WebpackBar = require('webpackbar');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );

const plugins = [
  new WebpackBar(),
  new CleanWebpackPlugin(['dist']),
  new FriendlyErrorsWebpackPlugin()
];

if ( !dev ) {
    plugins.push( new BundleAnalyzerPlugin( {
        analyzerMode: "static",
        reportFilename: "webpack-report.html",
        openAnalyzer: false,
    } ) );
}

module.exports = {
  mode: dev ? "development" : "production",
  entry: {
    app: './src/client.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/client')
  },
  devtool: dev ? "none" : "source-map",
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      }
    ]
  }
}