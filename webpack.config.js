const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        index: './src/js/index.js',
    },
    output: {
        filename: 'scripts/[name]-[chunkhash:5].js',
        publicPath: "/"
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    attributes: {
                        list: [{
                            tag: 'img',
                            attribute: 'src',
                            type: 'src'
                        }]
                    }
                }
            }]
        }, {
            test: /\.(jpg)|(png)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    // publicPath: './images'
                }
            }]
        }, {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        })
    ],
    devServer: {
        port: 9000,
        open: true
    }
}