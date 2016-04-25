# ES2015 + JSX via Gulp, Babel & Webpack

This project is designed to be a starting point for React and ES2015 projects.

## Install Gulp

`$ npm install -g gulp`
`$ npm install -g karma-cli`

Installing Karma and Gulp this way allows you to use them via the command line. Both will use the config files local to the directory where you run them.

## Developing

`$ gulp`

Start the Webpack Dev Server and watch src/**. Use this at the start of your dev workflow. Then open:

[http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)

`$ gulp build`

Build the project into `dist`.

## Testing

`$ gulp test`

Runs the Karma test harness.

Tests also run after `$ gulp build`.

## Install NVM

This is optional but highly recommended since Node's compatibilty varies highly between versions. See install instructions here: https://github.com/creationix/nvm

Then run `$ nvm use` in this repo's root directory whenever you enter with a new shell session.
