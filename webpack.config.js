const path = require('path');
const HTMLWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'client', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: ['html-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: '/node_modules/',
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HTMLWebPackPlugin({ template: './public/index.html' }),
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    devServer: {
        // add all routes here
        host: 'localhost',
        port: 8080,
        hot: true,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        proxy: {},
    },
};
