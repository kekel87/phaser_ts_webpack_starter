import Level from '../objects/map';
import Dude from '../objects/Dude';
import * as EasyStar from 'easystarjs';

interface ISprite { initialZ: number; selected: boolean; inPath: boolean; }
interface IsoSpritePlus extends Phaser.Plugin.Isometric.IsoSprite, ISprite {}
interface IPosition { x: number; y: number; }

/**
 * The Main state is where the acyual game should begin.
 * In this simple example we're jst displaying a Phaser logo.
 */
class Main extends Phaser.State {

    private cursorPos: Phaser.Plugin.Isometric.Point3;
    private groundGroup: Phaser.Group;
    private objectGroup: Phaser.Group;
    private water: Array<IsoSpritePlus>;
    private finding: boolean;
    private easystar: any;
    private dude: Dude;
    private isMoving: boolean;
    private pathIndex: number;
    private path: Array<IPosition>;

    static get size(): number {
        return 36;
    }

    static get startPosition(): IPosition {
        return {
            x: Main.size * (11 - 0.5),
            y: Main.size * (11 - 0.5)
        };
    }

    public create(): void {
        this.groundGroup = this.game.add.group();
        this.objectGroup = this.game.add.group();
        this.water = [];
        this.cursorPos = new Phaser.Plugin.Isometric.Point3();
        this.easystar = new EasyStar.js();
        this.finding = false;

        this.easystar.setGrid(Level.walkable);
        this.easystar.setAcceptableTiles([1]);

        this.generateGround();
        this.generateObjects();

        this.game.iso.simpleSort(this.groundGroup);

        // Create dude
        this.dude = new Dude(this.game, Main.startPosition);
        this.objectGroup.add(this.dude.sprite);
        this.game.camera.follow(this.dude.sprite);
    }

    public update(): void {
        // Update the cursor position.
        //
        // It's important to understand that screen-to-isometric projection means
        // you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery.
        //
        // By default, the z position is 0 if not set.
        this.game.iso.unproject(this.game.input.activePointer.position, this.cursorPos);

         // Loop through all tiles
        this.groundGroup.forEach(
            (t: IsoSpritePlus) => {
                const tile = t;
                const x = tile.isoX / Main.size;
                const y = tile.isoY / Main.size;
                const inBounds = tile.isoBounds.containsXY(this.cursorPos.x, this.cursorPos.y);

                // Test to see if the 3D position from above intersects
                // with the automatically generated IsoSprite tile bounds.
                if (!tile.selected && inBounds && this.water.indexOf(tile) !== -1) {
                    // If it does, do a little animation and tint change.
                    tile.selected = true;
                    if (!tile.inPath) {
                        tile.tint = 0x86bfda;
                    }
                    this.game.add
                        .tween(tile)
                        .to({ isoZ: tile.initialZ + 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
                }
                else if (tile.selected && !inBounds) {
                    // If not, revert back to how it was.
                    tile.selected = false;
                    if (!tile.inPath) {
                        tile.tint = 0xffffff;
                    }
                    this.game.add
                        .tween(tile)
                        .to({ isoZ: tile.initialZ + 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
                }

                if (!this.finding && this.game.input.activePointer.isDown && inBounds) {
                    // Start path finding
                    this.finding = true;
                    const dp = this.dudePosition();
                    this.easystar.findPath(dp.x, dp.y, x, y, this.processPath.bind(this));
                    this.easystar.calculate();
                }
            },
            null
        );

        this.water.forEach((w: IsoSpritePlus) => {
            const waterTile = w;
            waterTile.isoZ =
                waterTile.initialZ +
                (-2 * Math.sin((this.game.time.now + (waterTile.isoX * 7)) * 0.004))
                + (-1 * Math.sin((this.game.time.now + (waterTile.isoY * 8)) * 0.005));

            waterTile.alpha = Phaser.Math.clamp(1 + (waterTile.isoZ * 0.1), 0.2, 1);
        });

        if (this.isMoving) {
            this.move();
        }

        this.game.iso.simpleSort(this.objectGroup);
    }

    public render(): void {
        this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, '#a7aebe');
        this.game.debug.cameraInfo(this.game.camera, 2, 32, '#a7aebe');
    }

    private generateGround(): void {
        for (let y = 0; y < Level.ground.length; y++) {
            for (let x = 0; x < Level.ground[y].length; x++) {
                const tile = this.game.add.isoSprite(
                    Main.size * x,
                    Main.size * y,
                    0,
                    'tileset',
                    Level.groundNames[Level.ground[y][x]],
                    this.groundGroup
                ) as IsoSpritePlus;

                // Anchor is bottom middle
                tile.anchor.set(0.5, 1 - ((tile.height - (tile.width / 2)) / tile.height));
                tile.scale.x = Level.direction[y][x];
                tile.initialZ = 0;

                if (Level.ground[y][x] === 0) {
                    // Add to water tiles
                    tile.initialZ = -4;
                    this.water.push(tile);
                }

                if (Level.ground[y][x] === 4) {
                    // Make bridge higher
                    tile.isoZ += 4;
                    tile.initialZ += 4;

                    // Put tile under bridge
                    const waterUnderBridge = this.game.add.isoSprite(
                        Main.size * x,
                        Main.size * y,
                        0,
                        'tileset',
                        Level.groundNames[0],
                        this.groundGroup
                    ) as IsoSpritePlus;

                    waterUnderBridge.anchor.set(0.5, 1);
                    waterUnderBridge.initialZ = -4;
                    this.water.push(waterUnderBridge);
                }
            }
        }
    }

    private generateObjects(): void {
         for (let y = 0; y < Level.object.length; y += 1) {
            for (let x = 0; x < Level.object[y].length; x += 1) {
                if (Level.object[y][x] !== 0) {
                    const tile = this.game.add.isoSprite(
                        Main.size * x,
                        Main.size * y, 0,
                        'object',
                        Level.objectNames[Level.object[y][x]],
                        this.objectGroup
                    ) as IsoSpritePlus;

                    // Anchor is bottom middle
                    tile.anchor.set(0.5, 1);
                    tile.initialZ = 0;
                }
            }
        }
    }

    private processPath(path: Array<IPosition>): void {
        this.finding = false;
        if (!path || path.length === 0) {
            return;
        }

        // Keep moving if already moving towards same direction;
        if (
            this.isMoving
            && this.pathIndex < this.path.length
            && path.length > 1
            && this.path[this.pathIndex].x === path[1].x &&
            this.path[this.pathIndex].y === path[1].y)
        {
            this.pathIndex = 1;
        }
        else {
            this.pathIndex = 0;
        }

        this.isMoving = true;

        // Loop tiles
        this.groundGroup.forEach(
            (t: IsoSpritePlus) => {
                const tile = t;
                if (tile.inPath) {
                    // Clear tint from previous path
                    tile.tint = 0xffffff;
                }
                const x = tile.isoX / Main.size;
                const y = tile.isoY / Main.size;
                const inPath = path.some((point: IPosition) => point.x === x && point.y === y);
                if (inPath) {
                    tile.tint = 0xaa3333;
                    tile.inPath = true;
                } else {
                    tile.inPath = false;
                }
            },
            null
        );

        this.path = path;
  }

  private dudePosition(): IPosition {
    return {
      x: Math.round((this.dude.x / Main.size) + 0.5),
      y: Math.round((this.dude.y / Main.size) + 0.5)
    };
  }

  private move(): void {
    if (!this.path || this.pathIndex === this.path.length) {
      // No path or finished moving
      this.isMoving = false;
      this.path = null;
      this.dude.stop();
      return;
    }

    const target = this.path[this.pathIndex];
    const x = (this.dude.x + (Main.size / 2)) - (target.x * Main.size);
    const y = (this.dude.y + (Main.size / 2)) - (target.y * Main.size);

    if (x === 0 && y === 0) {
      // Reached next tile
      this.pathIndex += 1;
    } else if (x < 0 && y === 0) {
      this.dude.x += 1;
      this.dude.play('walkFrontLeft');
    } else if (x > 0 && y === 0) {
      this.dude.x -= 1;
      this.dude.play('walkBackLeft');
    } else if (x === 0 && y < 0) {
      this.dude.y += 1;
      this.dude.play('walkFrontRight');
    } else if (x === 0 && y > 0) {
      this.dude.y -= 1;
      this.dude.play('walkBackRight');
    }
  }
}

export default Main;
