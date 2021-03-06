# Webpack, TypeScript & Phaser Starter Pack

With [phaser-isometric-demo](https://github.com/mmermerkaya/phaser-isometric-demo)
 isometric demo in TypeScript.

Including, but not limited to, the following:

* `webpack`
* `webpack-dev-server` for development & hot module reloading
* `tslint` for code hygiene
* `phaser`, `pixi.js` and `p2` for the game engine
* `phaser-debug` for improved debugging
* `phaser-isometric` for isometric perspective
* `easystarjs` for Pathfinding 
* `@types` for type definitions (node and easystarjs)

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

## Update
I fork and update definition files (.d.ts) of [lewster32/phaser-plugin-isometric](https://github.com/lewster32/phaser-plugin-isometric)

See 
[kekel87/phaser-plugin-isometric](https://github.com/kekel87/phaser-plugin-isometric)

## Trouble
* `easystarjs@^0.3.X` i can not use it with TypeScript + Webpack ... back to `^0.2.3`
* I can not import ressource like ES6 with TypeScript and WebPack

## Thanks
* [hedlund/starter-ts-webpack-phaser](https://github.com/hedlund/starter-ts-webpack-phaser)
* [mmermerkaya/phaser-isometric-demo](https://github.com/mmermerkaya/phaser-isometric-demo)
* [macbury/dungeon](https://github.com/macbury/dungeon)
