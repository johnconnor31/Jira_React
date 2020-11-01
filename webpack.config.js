
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve('./runnables'),
        filename: '[name][id].js'
    },
    module: {
    rules: [
        {
            use: 'babel-loader',
            exclude: '/node-modules/',
            test: /\.(js|jsx)$/
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/template.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        open: 'Firefox',
        compress: true,
        port: 5000,
        proxy: {
            '/myServer/*/*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    }
}