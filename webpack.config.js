var webpack = require('webpack');

module.exports = {
    entry: './src/index.jsx',

    output: {
        path: './dist',
        publicPath: 'dist/',
        filename: 'editor.js'
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'react',
                        'es2015',
                        'stage-0'
                    ]
                }
            },
            {
                test: /\.scss$/,
                loader: 'style!css?-autoprefixer&-minimize!sass'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ];
} else {
    module.exports.devtool = 'source-map';
}
