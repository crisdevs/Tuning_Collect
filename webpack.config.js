const path = require('path');
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'client/index.js'),
    output: {
        filename: "./build/bundle.js"
    },
    target: "web",
    devServer: {
        port: 8080,
        static: ["./public"],
        open: true,
        hot: true,
        liveReload: true,
        proxy: {
            '/api/tunings': {
              target: 'http://localhost:3000/',
              secure: false,
            }
    }
    },
    module: {
        rules: [
            {
            test: /\.jsx?/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                }
            }
            }
        ]
    }
}