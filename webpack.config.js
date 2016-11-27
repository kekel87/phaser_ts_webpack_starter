var path = require('path');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var atImport = require('postcss-import');

// var CompressionPlugin = require("compression-webpack-plugin");
// var CordovaPlugin     = require('webpack-cordova-plugin');
// var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

var PATHS = {
    src: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'public'),
    phaser: path.join(__dirname, 'node_modules', 'phaser', 'build', 'custom'),
    phaserDebug: path.join(__dirname, 'node_modules', 'phaser-debug', 'dist', 'phaser-debug.js'),
    phaserIso: path.join(__dirname, 'node_modules', 'phaser-plugin-isometric', 'dist', 'phaser-plugin-isometric.js'),
    p2: path.join(__dirname, 'node_modules', 'p2')
};

process.env.BUILD_DIR = PATHS.build;

module.exports = {

    context: PATHS.src,
    entry: {
        app: [
            './Game.ts'
        ]
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js'],
        alias: {
            'phaser': path.join(PATHS.phaser, 'phaser-split.js'),
            'pixi': path.join(PATHS.phaser, 'pixi.js'),
            'p2': path.join(PATHS.p2, 'src', 'p2.js'),
            'phaser-debug': PATHS.phaserDebug,
            'phaser-isometric': PATHS.phaserIso
        }
    },
    
    module: {
        noParse: [
            /phaser-debug\.js$/
        ],
        preLoaders: [
            {
                test: /\.ts$/,
                loaders: ['tslint'],
                include: PATHS.src
            }
        ],
        loaders: [
            { test: /pixi\.js$/, loader: 'expose?PIXI' },
            { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
            { test: /p2\.js$/, loader: 'expose?p2' },
            { test: /\.ts$/, loaders: ['ts-loader'] },
            { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
            { test: /\.json$/, loaders: ['json']}
        ]
    },
    node: {
        fs: 'empty'
    },
    postcss: function(webpack) {
        return [ atImport({ addDependencyTo: webpack }), precss, autoprefixer ];
    }
};
