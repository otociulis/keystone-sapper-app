# KeystoneJS Sapper App

A KeystoneJS App to serve [Sapper](https://github.com/sveltejs/sapper) 
development framework.

## Installation

Using npm:

```
npm i keystone-app-sapper
```

## Usage

`index.js`

```js
const { Keystone } = require('@keystone-alpha/keystone');
const { GraphQLApp } = require('@keystone-alpha/app-graphql');
const { AdminUIApp } = require('@keystone-alpha/app-admin-ui');
const { SapperApp } = require("keystone-app-sapper");

module.exports = {
  new Keystone(),
  apps: [
    new GraphQLApp(),
    new AdminUIApp(),
    new SapperApp(),
  ],
};
```

There are two major ways to run this application (controlled by 
`skipDevelopmentBuild` flag):

* Without parallel Sapper build environment [default]
* With parallel Sapper build environment

In first case the Sapper build will be executed every time the KeystoneJS
application will restart. This prolongs development times but doesn't require
parallel development environment since it doesn't offer hot reloading by default.

In second option developer must run separate Sapper environment manually
(e.g. by executing `npm run dev` as described 
[here](https://sapper.svelte.dev/docs#Getting_started)) and only *after* that
run KeystoneJS application. This mode provides better development experience,
hot reloading of frontend application etc.

## Options

### `skipDevelopmentBuild`

Flag indicating Sapper build should be executed when Keystone is running 
in development mode (default value `false`). If set to `true` the build 
will be skipped and it's asummed that 
[Sapper develoment enviromnent](https://sapper.svelte.dev/docs#Getting_started) 
is running in parallel.

### `path`

The path to development build of Sapper (default value `__sapper__/dev`). 

### `buildOptions`

Additional options as defined by 
[Sapper build options](https://sapper.svelte.dev/docs#sapper_build).
