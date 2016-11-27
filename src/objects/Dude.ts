interface IPosition { x: number; y: number; }

class Dude {
  public sprite: Phaser.Plugin.Isometric.IsoSprite;
  private game: Phaser.Game;

  constructor(game: Phaser.Game, startPosition: IPosition) {
    this.game = game;

    // Create dude
    this.sprite = this.game.add
      .isoSprite(
        startPosition.x,
        startPosition.y, 0,
        'char',
        'greenhood_idle_front_right'
    );
    this.sprite.anchor.set(0.5, 1);

    // Create dude's animations
    const backRightFrames = Phaser.Animation.generateFrameNames('greenhood_walk_back_right_', 1, 8);
    this.sprite.animations.add('walkBackRight', backRightFrames, 12, true, false);

    const backLeftFrames = Phaser.Animation.generateFrameNames('greenhood_walk_back_left_', 1, 8);
    this.sprite.animations.add('walkBackLeft', backLeftFrames, 12, true, false);

    const frontRightFrames = Phaser.Animation.generateFrameNames('greenhood_walk_front_right_', 1, 8);
    this.sprite.animations.add('walkFrontRight', frontRightFrames, 12, true, false);

    const frontLeftFrames = Phaser.Animation.generateFrameNames('greenhood_walk_front_left_', 1, 8);
    this.sprite.animations.add('walkFrontLeft', frontLeftFrames, 12, true, false);
  }

  public stop(): void {
    this.sprite.animations.stop();
  }

  public play(animation: string): void {
    this.sprite.animations.play(animation);
  }

  get x(): number {
    return this.sprite.isoX;
  }

  set x(isoX: number) {
    this.sprite.isoX = isoX;
  }

  get y(): number {
    return this.sprite.isoY;
  }

  set y(isoY: number) {
    this.sprite.isoY = isoY;
  }
}

export default Dude;
