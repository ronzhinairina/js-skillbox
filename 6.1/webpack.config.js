const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'our project',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],

    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
};
