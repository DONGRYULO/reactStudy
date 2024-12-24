const path = require('path');

module.exports = {
    name: 'gugudan-setting',
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
                plugins: []
            }
        }]
    },

    plugins: [

    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }
};