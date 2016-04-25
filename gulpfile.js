
var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var KarmaServer = require('karma').Server;

var lessCompiler = require('gulp-less');
var LessPluginCleanCSS = require("less-plugin-clean-css");

var paths = {
    lessSrcGlob:    'src/less/**/*.less',
    cssDest:        'dist/static/css/'
}


// The development server (the recommended option for development)
gulp.task("default", ["watch:html", "webpack-dev-server", "watch:less"]);

gulp.task("watch:html", function(callback) {
    gulp.watch(["src/**/*"], ["copy:html"]);
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

gulp.task("webpack-dev-server", function(callback) {

    new WebpackDevServer(devCompiler, {
        contentBase: "dist"
    }).listen(8888, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8888/webpack-dev-server/index.html");
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

gulp.task("tdd", function (done) {
    var server = new KarmaServer({
        configFile: __dirname + "/karma.conf.js",
        singleRun: false
    }, done);

    server.on('error', karmaExitCb);
    server.start();
});

function karmaExitCb(exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
}

// Less

gulp.task("watch:less", function (done) {
    // No need to run this task separately, it runs as part of default task.
    gulp.watch(paths.lessSrcGlob, ["build:less"]);
});

gulp.task("build:less", function () {

    var config = {
        src: paths.lessSrcGlob,
        dest: paths.cssDest,
        lessConfig: {
            plugins: [],
            paths: [
                // If you need to source LESS imports from node_modules you
                // can provide the path here, or use less-plugin-npm-import
            ]
        }
    }

    var linter = new LessPluginCleanCSS({
        advanced: true,
        keepBreaks: true
    });
    config.lessConfig.plugins.push(linter);

    var stream = gulp.src(config.src)
        .pipe(lessCompiler(config.lessConfig))
        .pipe(gulp.dest(config.dest));

    return stream;
});
