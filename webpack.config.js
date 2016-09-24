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
