var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        browsers: [ 'Chrome' ],
        singleRun: true,
        frameworks: [ 'mocha' ],
        files: [
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': [ 'webpack', 'sourcemap' ]
        },
        reporters: [ 'dots' ],
        webpack: {
            devtool: 'inline-source-map',
            module: webpackConfig.module
        },
        webpackServer: {
            noInfo: true
        }
    });
}