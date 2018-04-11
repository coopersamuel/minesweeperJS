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
            // Will need to update this file to bundle more than one scss file...
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                        name: 'style.bundle.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader', 
                        options: {
                            importer: function(url, prev) {
                                if(url.indexOf('@material') === 0) {
                                    var filePath = url.split('@material')[1];
                                    var nodeModulePath = `./node_modules/@material/${filePath}`;
                                    return { file: require('path').resolve(nodeModulePath) };
                                }
                                return { file: url };
                            }
                        }
                    },
                ]
            },
        ]
    },
    resolve : {
        extensions : ['.js', '.jsx', '.scss']
    }
};