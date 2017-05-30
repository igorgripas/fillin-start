/* eslint-disable import/no-commonjs*/
/* eslint-disable import/no-nodejs-modules*/
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    new webpack.ProvidePlugin({
        React: 'react',
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'Fillin',
        favicon: './favicon.ico',
        inject: 'body',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb|ru|uk/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
];
