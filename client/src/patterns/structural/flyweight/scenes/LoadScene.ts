import * as Phraser from 'phaser';
import { SCENES } from '../constants';

export class LoadScene extends Phraser.Scene {
  constructor() {
    super({
      key: SCENES.LOAD
    });
  }

  preload(): void {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('start_button', 'assets/images/start.png');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.audio('bg_music', 'assets/audio/peremen.mp3');

    const loadingBar = this.add.graphics({
      y: -3,
      fillStyle: {
        color: 0xFF0000
      }
    });

    this.load.on('progress', (percent: number) => {
      loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 3);
    });

    this.load.on('complete', () => {
      this.scene.start(SCENES.MENU);
    });
  }
}
