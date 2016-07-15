# ES2015 + JSX via Gulp, Babel & Webpack

This project is designed to be a starting point for React ES2015 projects. It has tests example modules and tests use Karma, Maocha Expect for assertions. Uses gulp-livereload. You will need your own HTTP server for local dev, e.g. with Python

`$ python -m SimpleHTTPServer 9876`

`$ open http://localhost:9876/dist/index.html`

## Setup

Clone this repo. If you have not, you should install and use NVM, see below.

`$ nvm use`

Then:

`$ npm i`

### Install Gulp and Karma

`$ npm i -g gulp`

Optional, but useful if you want to run the karma tests with the cli.

`$ npm i -g karma-cli`

Installing Karma and Gulp this way allows you to use them via the command line. Both will use the config files local to the directory where you run them.

## Developing

`$ gulp`

This starts the watch tasks that will re-build when files change in `src/**`.
In another terminal session, navigate to this repo and start a simple web server. Python can do it:

`$ python -m SimpleHTTPServer 9876`

`$ open http://localhost:9876/dist/index.html`

Once this page is open in your browser and you've started the watch task you can enable Livreload plugin if you've installed it. **Note:** The Livreload plugin talks directly to a server that is started by the main `gulp` task. This means it will work with almost any http server.

### TDD

In another session you can use test driven development. This will run unit tests on every build:

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
