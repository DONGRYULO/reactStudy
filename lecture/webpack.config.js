const path = require('path');
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    name: 'wordreplay-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.jsx', '.js']
    },

    entry: {
        app: ['./client']
    },

    module:{
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: [
                    // '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
                ]
            }
        }]
    },

    plugins: [
        new RefreshWebpackPlugin()
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/'
    },
    devServer: {
        devMiddleware: {publicPath: '/dist'},
        static: {
            directory: path.resolve(__dirname) // 'dist' 디렉토리에서 정적 파일을 제공
        },
        hot: true
    }
};