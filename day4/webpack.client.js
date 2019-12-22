const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// on client side
module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.csr.html',
            template: 'src/index.csr.html',
            inject: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                // to support import and jsx syntax
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', ['@babel/preset-env']]
                }
            },
            {
                test:/\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }]
            }
        ]
    }
};