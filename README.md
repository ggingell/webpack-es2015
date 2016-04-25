# ES2015 + JSX via Gulp, Babel & Webpack

This project is designed to be a starting point for React ES2015 projects. It has tests example modules and tests use Karma, Maocha Expect for assertions. Uses gulp-livereload. You will need your own HTTP server for local dev, e.g. with Python

`$ python -m SimpleHTTPServer 9876`

`$ open http://localhost:9876/dist/index.html`

## Setup

If you have not, you should install and use NVM, see below. Clone this repo. Then:

`$ npm install`

### Install Gulp and Karma

`$ npm install -g gulp`

`$ npm install -g karma-cli`

Installing Karma and Gulp this way allows you to use them via the command line. Both will use the config files local to the directory where you run them.

## Developing

`$ gulp`

This starts the Webpack Dev Server and watches src/**. Use this at the start of your dev workflow. Open:

[http://localhost:8888/webpack-dev-server/](http://localhost:8888/webpack-dev-server/)

In another session you can use test driven development:

`$ gulp tdd`


## Building

`$ gulp build`

Build the project into `dist`.

## Installing a Module

`$ npm i --save some-module && npm run shrinkwrap`
`$ npm test`
`$ git commit -m 'Added some-module.'`

## Testing

`$ gulp test`

Runs the Karma test harness.

Tests also run after `$ gulp build`.

## Install NVM

This is optional but highly recommended since Node's compatibilty varies highly between versions. See install instructions here: https://github.com/creationix/nvm

Then run `$ nvm use` in this repo's root directory whenever you enter with a new shell session.
