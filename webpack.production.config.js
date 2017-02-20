var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/build",
        filename: "[name]-[hash].js"
    },

    module: {
        rules: [{
            test: /\.json$/,
            use: "json-loader"
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader?modules!postcss-loader'
            })
        }, {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            exclude: /node_modules/,
            use: ['file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
                'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/public/index.tmpl.html"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css"),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer
                ]
            }
        })
    ],

}
