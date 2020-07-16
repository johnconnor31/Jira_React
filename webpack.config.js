
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('./runnables')
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
    ]
}