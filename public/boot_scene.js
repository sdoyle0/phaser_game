import Phaser from "phaser";
import { SceneNames } from "./constants";

export class BootScene extends Phaser.Scene {
	constructor() {
		super(SceneNames.Boot);
	}	

	preload() {
		
	}

	create() {
		this.add.text(20, 20, 'Press space to start...');
		this.cursors = this.input.keyboard.createCursorKeys();
	}

	update() {
		if (this.cursors.space.isDown) {
			this.scene.start(SceneNames.Play);
		}
	}
}