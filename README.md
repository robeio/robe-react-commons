# Robe-React-Commons

#### A complete commons library especially for react projects.  

[![Build Status](https://travis-ci.org/robeio/robe-react-commons.svg?branch=master)](https://travis-ci.org/robeio/robe-react-commons)
[![Docs Coverage](https://doc.esdoc.org/github.com/robeio/robe-react-commons/badge.svg)](https://doc.esdoc.org/github.com/robeio/robe-react-commons)
[![codecov](https://codecov.io/gh/robeio/robe-react-commons/branch/master/graph/badge.svg)](https://codecov.io/gh/robeio/robe-react-commons)


RRC = Robe-React-Commons

##### Motivation
Aims to be a complete solution for our common project needs. All coded with ES6 syntax.
##### What's inside
* [Webpack](https://webpack.github.io/) for all development (server,hotload etc.) and build (package, optimize, etc.) needs.
* [Babel](https://babeljs.io/flow) for writing codes with ES6 syntax and transpiling them browser compatible codes. 
* [ESLint](http://eslint.org/) for protecting our nice formatted codes.
* [Flow](http://flowtype.org/) for type checking.
* [Karma](https://karma-runner.github.io/0.13/index.html) for running tests.
* [Chai](http://chaijs.com/) for asserting test errors.
* [Isparta](https://github.com/douglasduteil/isparta) for ES6 code coverage.
* [Istanbul](https://github.com/gotwarlost/istanbul) for code coveragereporting.
* [React](https://facebook.github.io/react/) for ui components.
* [ESDocs](https://esdoc.org/) for documentation generation.

### Quick Start
#### How to use
Go to your project folder
```shell
npm install robe-react-commons --save-dev
```
You can import this project in 2 ways.

1. Partial import. For ex. `import Maps from "robe-react-commons/lib/utils/Maps";`
2. All-in-one, minified, optimized single js. For ex. **TODO: example coming soon.**

#### How to contribute
Clone and run `npm install`. This will install both run-time project dependencies and developer tools listed
in [package.json](./package.json) file.

#### How to Build for Production

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run-script build
```
 
####  How to run Unit Tests.

```shell
$ npm testnpm
```
