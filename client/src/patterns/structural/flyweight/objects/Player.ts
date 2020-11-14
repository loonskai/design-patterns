import * as Phraser from 'phaser';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private currentScene: Phraser.Scene
  private keys: Map<string, Phaser.Input.Keyboard.Key>
  
  body: any;
  private isJumping: boolean;
  private isDying: boolean;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.currentScene = params.scene;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    this.setOrigin(0.5, 0.5);
    this.setFlipX(false);

    this.keys = new Map([
      ['LEFT', this.addKey('LEFT')],
      ['RIGHT', this.addKey('RIGHT')],
      ['DOWN', this.addKey('DOWN')],
      ['JUMP', this.addKey('UP')]
    ]);

    this.currentScene.physics.world.enable(this);
    this.body.maxVelocity.x = 50;
    this.body.maxVelocity.y = 300;
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.currentScene.input.keyboard.addKey(key);
  }

  update(time: number, delta: number): void {
    this.handleInput(delta);
  }

  private handleInput(delta: number) {
    if (
      this.body.onFloor() ||
      this.body.touching.down ||
      this.body.blocked.down
    ) {
      this.isJumping = false;
    }

    if (this.keys.get('RIGHT')?.isDown) {
      this.x += 128 * (delta / 1000);
    } else if (this.keys.get('LEFT')?.isDown) {
      this.x -= 128 * (delta / 1000);
    }

    if (this.keys.get('JUMP')?.isDown && !this.isJumping) {
      this.body.setVelocityY(-300);
      this.isJumping = true;
    }
  }

  private bounceUpAfterHitEnemyOnHead(): void {
    this.currentScene.add.tween({
      targets: this,
      props: { y: this.y - 50 },
      duration: 450,
      ease: 'Power1',
      yoyo: true
    });
  }

  protected gotHit(): void {
    this.isDying = true;

    // sets acceleration, velocity and speed to zero
    // stop all animations
    this.body.stop();
    this.anims.stop();

    // make last dead jump and turn off collision check
    this.body.setVelocityY(-180);

    // this.body.checkCollision.none did not work for me
    this.body.checkCollision.up = false;
    this.body.checkCollision.down = false;
    this.body.checkCollision.left = false;
    this.body.checkCollision.right = false;
  }
}
