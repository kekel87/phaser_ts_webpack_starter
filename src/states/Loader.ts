import 'phaser-isometric';

/**
 * The Loader state is responsible for preloading all the global assets needed for the game.
 */
class Loader extends Phaser.State {

    private loadbar: Phaser.Sprite;

    public preload(): void {
        // Setup the preloader sprite
        this.loadbar = this.add.sprite(this.world.centerX, this.world.centerY, 'loadbar');
        this.loadbar.anchor.set(0.5);
        this.load.setPreloadSprite(this.loadbar);

        // Load the actual game assets
        this.load.image('phaser', 'images/phaser.png');
        this.load.image('tile', 'assets/tile.png');

        // Exemple iso
        this.time.advancedTiming = true;

        // this.game.plugins.add(Phaser.Plugin.Isometric);
        this.game.plugins.add(new Phaser.Plugin.Isometric(this.game));
        this.game.iso.anchor.setTo(0.5, 0.2);
    }

    public create(): void {
        this.game.state.start('main');
    }
}

export default Loader;
