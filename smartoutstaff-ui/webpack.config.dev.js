/* eslint-disable import/no-commonjs*/
/* eslint-disable import/no-nodejs-modules*/
/* eslint-disable quote-props*/

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const commonPlugins = require('./commonPlugins');
const commonLoaders = require('./commonLoaders');


const cssmodulesScope = '?modules&importLoaders=1&localIdentName=[name]__[hash:base64:5]';
// const cssmodulesScope = '?modules&importLoaders=1&localIdentName=[name]__[local]';

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'react-hot-loader',
        'webpack-hot-middleware/client',
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...commonPlugins,
        new webpack.DefinePlugin({
            '__DEVTOOLS__': true,
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            },
        }),
    ],
    devServer: {
        historyApiFallback: true,
    },
    module: {
        loaders: [
            ...commonLoaders,
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.less$/,
                loader: `style-loader!css-loader${cssmodulesScope}!postcss-loader!less-loader`,
            },
        ],
    },
};
