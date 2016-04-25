var gulp = require("gulp");
var gulpsync = require('gulp-sync')(gulp);
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var KarmaServer = require('karma').Server;

// Better live reloader and it's decoupled from webpack
var livereload = require('gulp-livereload');

var combiner = require('stream-combiner2');
var lessCompiler = require('gulp-less');
var LessPluginCleanCSS = require("less-plugin-clean-css");

var paths = {
    srcAll:         'src/**/*.*',
    lessSrcGlob:    'src/less/**/*.less',
    cssDest:        'dist/static/css/'
}

gulp.task("default", ["watch:all"]);

gulp.task("watch:all", function(callback) {
    livereload.listen({
        basePath: "dist",
        start: true,
        quiet: false,
        reloadPage: "index.html"
    });
    gulp.watch(paths.srcAll, gulpsync.sync(["build:less", "copy:html", "webpack:build", "reload"]));
});

gulp.task("reload", function(callback) {
    livereload.reload();
    callback();
});

// Production build
gulp.task("build", ["copy:html", "test", "build:less", "webpack:build"]);

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
                // If you need to source LESS imports from node_modules, etc you
                // can provide those paths here, or use less-plugin-npm-import.
            ]
        }
    }

    var minifier = new LessPluginCleanCSS({
        advanced: true,
        keepBreaks: true
    });
    config.lessConfig.plugins.push(minifier);

    var combined = combiner.obj([
        gulp.src(config.src),
        lessCompiler(config.lessConfig),
        gulp.dest(config.dest)
    ]);

    combined.on('error', gutil.log.bind(gutil));

    return combined;
});
