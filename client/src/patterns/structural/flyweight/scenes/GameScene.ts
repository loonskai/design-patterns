import * as Phraser from 'phaser';
import { SCENES } from '../constants';
import { Player } from '../objects/Player';
import { Enemy } from '../objects/Enemy';

export class GameScene extends Phraser.Scene {
  private player: Player;
  private ground: Phaser.GameObjects.Sprite;
  private enemies: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: SCENES.GAME
    });
  }

  create(): void {
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.ground = this.add.sprite(320, 351, 'ground');
    this.ground.scaleX = 2;

    this.physics.add.existing(this.ground, true);
    
    this.player = new Player({
      scene: this,
      x: 100,
      y: 300,
      key: 'player',
    });

    this.enemies = this.add.group({ runChildUpdate: true });

    setInterval(() => {
      this.enemies.add(new Enemy({
        scene: this,
        x: 800, 
        y: 310, 
        key: 'enemy',
        speed: -(Math.random() * (100 - 50) + 50)
      }));
  
    }, 2000);

    this.physics.add.collider(this.ground, this.player);
    this.physics.add.collider(this.ground, this.enemies);
    // this.physics.add.collider(this.player, this.enemies, (player: any, enemy) => {
    // });

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.handlePlayerEnemyOverlap,
      undefined,
      this
    );
  }

  update(time: number, delta: number): void {
    this.player?.update(time, delta);
  }
  
  private handlePlayerEnemyOverlap(_player: any, _enemy: any): void {
    if (_player.body.touching.down && _enemy.body.touching.up) {
      _player.bounceUpAfterHitEnemyOnHead();
      this.add.tween({
        targets: _enemy,
        props: { alpha: 0 },
        duration: 1000,
        ease: 'Power0',
        yoyo: false,
        onComplete: function() {
          _enemy.isDead();
        }
      });
      // _enemy.gotHitOnHead();
      // this.add.tween({
      //   targets: _enemy,
      //   props: { alpha: 0 },
      //   duration: 1000,
      //   ease: 'Power0',
      //   yoyo: false,
      //   onComplete: function() {
      //     _enemy.isDead();
      //   }
      // });
      _enemy.destroy();
    } else {
      console.log('DEAD');
      // player got hit from the side or on the head
      // if (_player.isVulnerable) {
      // _player.gotHit();
      // }
    }
  }
}
