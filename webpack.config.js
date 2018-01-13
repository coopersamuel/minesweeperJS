const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Constant with our paths
const paths = {
    DIST : path.resolve(__dirname, 'dist'),
    JS : path.resolve(__dirname, 'src/components'),
    SRC : path.resolve(__dirname, 'src')
};

module.exports = {
    entry : path.join(paths.SRC, 'app.js'),
    output : {
        path : paths.DIST,
        filename : 'app.bundle.js'
    },
    devtool : 'source-map',
    plugins : [
        new HtmlWebpackPlugin({
            template : path.join(paths.SRC, 'index.html')
        }),
        new ExtractTextPlugin('style.bundle.css')
    ],
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : [
                    'babel-loader'
                ]
            },
            {
                test : /\.css$/,
                loader : ExtractTextPlugin.extract({
                    use : 'css-loader'
                })
            }
        ]
    },
    resolve : {
        extensions : ['.js', '.jsx']
    }
};