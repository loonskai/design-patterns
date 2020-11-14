import * as Phraser from 'phaser';

export class Enemy extends Phraser.GameObjects.Sprite {
  private currentScene: Phraser.Scene
  private speed: number;
  body: any;
  private isDying: boolean;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key, params.frame);

    this.speed = params.speed;
    this.currentScene = params.scene;
    this.initSprite();
    this.currentScene.add.existing(this);
  }

  private initSprite() {
    this.currentScene.physics.world.enable(this);
  }

  update(): void {
    this.body.setVelocityX(this.speed);
  }

  protected gotHitOnHead(): void {
    this.isDying = true;
    this.setFrame(2);
    // this.showAndAddScore();
  }

  protected isDead(): void {
    this.destroy();
  }
}
