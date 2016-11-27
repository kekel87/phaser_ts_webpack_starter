/* tslint:disable:no-reference */
/// <reference path="./defs/definitions.d.ts"/>

import 'p2';
import 'pixi';
import * as Phaser from 'phaser';

import Boot from './states/Boot';
import Loader from './states/Loader';
import Main from './states/Main';
import './Game.css';

class Game extends Phaser.Game {
    constructor() {
        super(1280, 768, Phaser.AUTO, 'app', null);
        this.state.add('boot', Boot, false);
        this.state.add('loader', Loader, false);
        this.state.add('main', Main, false);
        this.state.start('boot');
    }
}

/* tslint:disable:no-unused-expression */
new Game();
