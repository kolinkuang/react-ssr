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
                // to support import and jsx syntax
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', ['@babel/preset-env']]
                }
            },
            {
                test:/\.css$/,
                use: ['isomorphic-style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }]
            }
        ]
    }
};