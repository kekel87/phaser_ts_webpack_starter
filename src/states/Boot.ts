import 'phaser-isometric';

/**
 * The Boot state is responsible for preloading the loadbar, and then configure the global settings.
 */
class Boot extends Phaser.State {

    public preload(): void {
        this.load.image('loadbar', 'assets/images/loadbar.png');
    }

    public create(): void {
        // Set the background color
        this.stage.backgroundColor = '#000';

        // Prevent the browser from pausing the game (and it's timers) if the tab loses focus
        this.stage.disableVisibilityChange = true;

        // Scale on all devices
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // Other typical settings
        //this.stage.scale.minWidth = 480;
        //this.stage.scale.minHeight = 260;
        //this.stage.scale.maxWidth = 1024;
        //this.stage.scale.maxHeight = 768;
        //this.stage.scale.forceLandscape = true;
        //this.stage.scale.setScreenSize(true);
        //this.input.maxPointers = 1;

        // If we're in development mode add the phase-debug plugin
        if (process.env.NODE_ENV === 'development') {
            /* tslint:disable:no-require-imports */
            const debug = require('phaser-debug');
            this.add.plugin(debug);
        }

        // Exemple iso
        this.time.advancedTiming = true;
        this.game.debug.renderShadow = false;
        this.game.stage.disableVisibilityChange = true;

        /* tslint:disable:no-require-imports */
        //const iso = require('phaser-isometric');
        //this.add.plugin(iso);
        new Phaser.Plugin.Isometric(this.game);
        this.game.iso.anchor.setTo(0.5, 0.2);
        this.game.world.setBounds(0, 0, 2048, 2048);

        // Start the loader state
        this.game.state.start('loader');
    }
}

export default Boot;
