# My Webpack, TypeScript & Phaser Starter Pack


Including, but not limited to, the following:

* `webpack`
* `webpack-dev-server` for development & hot module reloading
* `babel` for TypeScript transpiling, including stage 0 support
* `tslint` for code hygiene
* `phaser`, `pixi.js` and `p2` for the game engine
* `phaser-debug` for improved debugging
* `phaser-glsl-loader` to simplify shader loading
* `typings` for type definitions

## Usage

| Command                  | Description                                 |
|--------------------------|---------------------------------------------|
| `npm start`              | Start a dev server.                         |
| `npm run server`         | Start a dev server.                         |
| `npm run server:reload`  | Start a dev server with HMR enabled.        |
| `npm run build`          | Build the production version of the app.    |
| `npm run build:prod`     | Build the production version of the app.    |
| `npm run build:dev`      | Build the developement version of the app.  |
| `npm run lint`           | Lint the code.                              |

Hot Module Replacement doesn't really work with Phaser, so that isn't enabled by default when
starting a dev server.
