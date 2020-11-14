import * as Phraser from 'phaser';
import { SCENES } from '../constants';

export class MenuScene extends Phraser.Scene {
  constructor() {
    super({
      key: SCENES.MENU
    });
  }

  create(): void {
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.sound.play('bg_music', { loop: true });

    const startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'start_button');
    startButton.setInteractive();
    startButton.on('pointerup', () => {
      this.scene.start(SCENES.GAME);
    });
  }
}
