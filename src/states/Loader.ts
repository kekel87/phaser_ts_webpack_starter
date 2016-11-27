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
        this.game.load.atlasJSONHash('tileset', 'assets/sprites/tileset.png', 'assets/sprites/tileset.json');
        this.game.load.atlasJSONHash('char', 'assets/sprites/char.png', 'assets/sprites/char.json');
        this.game.load.atlasJSONHash('object', 'assets/sprites/object.png', 'assets/sprites/object.json');
    }

    public create(): void {
        this.game.state.start('main');
    }
}

export default Loader;
