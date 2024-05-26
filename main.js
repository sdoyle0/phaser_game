import './style.css'
import Phaser from 'phaser'

import { GameScene } from './public/game_scene';
import { BootScene } from './public/boot_scene';

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false
		}
	},
	scene: [BootScene, GameScene]
};

let game = new Phaser.Game(config);