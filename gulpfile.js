
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var KarmaServer = require('karma').Server;

// The development server (the recommended option for development)
gulp.task("default", ["watch:html", "webpack-dev-server"]);

gulp.task("watch:html", function(callback) {
    gulp.watch(["src/**/*"], ["copy:html"]);
});

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["copy:html", "webpack:build-dev"], function() {
    gulp.watch(["src/**/*"], ["webpack:build-dev"]);
});

// Production build
gulp.task("build", ["copy:html", "test", "webpack:build"]);

gulp.task("copy:html", function(callback) {
    var stream = gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('dist'));

    return stream;
});

gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// modify some webpack config options
var webpackConfigDebug = Object.create(webpackConfig);
webpackConfigDebug.devtool = "sourcemap";
webpackConfigDebug.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(webpackConfigDebug);

gulp.task("webpack:build-dev", function(callback) {

    // run webpack
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {

    new WebpackDevServer(devCompiler, {
        contentBase: "dist"
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        callback();
    });
});

// Karma Tests

gulp.task("test", function (done) {
    new KarmaServer({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    }, done).start();
});
