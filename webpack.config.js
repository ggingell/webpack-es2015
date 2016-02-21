var path = require('path');

module.exports = {
    context: __dirname + "/src",
    entry: "./main",
    output: {
        path: __dirname + "/dist",
        filename: "main.js"
    },
    module: {
      loaders: [
        {
          // "test" is commonly used to match the file extension
          test: /\.jsx?$/,

          // "include" is commonly used to match the directories
          include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "test")
          ],

          // "exclude" should be used to exclude exceptions
          // try to prefer "include" when possible

          // the "loader"
          loader: "babel-loader"
        }
      ]
    }
}

