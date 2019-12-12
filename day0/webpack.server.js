const path = require('path');
const nodeExternals = require('webpack-node-externals');

// on server side
module.exports = {
    target: 'node',
    mode: 'development',
    entry: './server/index.js',
    externals: [nodeExternals()],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // to support import and jsx
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', ['@babel/preset-env']]
                }
            }
        ]
    }
};