var path = require('path');

module.exports = {
    context: __dirname + '/src',
    entry: './js/main',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/static/js/',
        filename: 'static/js/main.js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(__dirname, 'src/js')
          ],
          query: {
            presets: ['react', 'es2015']
          },
          loader: 'babel-loader'
        }
      ]
    },
    plugins: []
}

