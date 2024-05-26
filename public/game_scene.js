import Phaser from "phaser";
import { SceneNames, SpriteKeys } from "./constants";
import { Warrior } from "./game_objects/players/warrior";

export class GameScene extends Phaser.Scene {
	constructor() {
		super(SceneNames.Play);
		this.player = null;
	}
	

	preload() {
		this.load.image('background', 'assets/backgrounds/_11_background.png');
		this.load.image('clouds_distant', 'assets/backgrounds/_10_distant_clouds.png');
		this.load.image('trees_distant', 'assets/backgrounds/_03_distant_trees.png');
		this.load.image('trees', 'assets/backgrounds/_02_trees and bushes.png');		
		this.load.image('ground', 'assets/backgrounds/_01_ground.png');
		this.load.image('platform', 'assets/platform.png');
		this.load.spritesheet(SpriteKeys.Warrior, 'assets/Warrior_Blue.png', { frameWidth: 192, frameHeight: 192});
	}

	create() {
		this.background = this.add.tileSprite(0, 0, 0, 0, "background");
		this.background.setOrigin(0,0);
		this.background.setScrollFactor(0);
		
		this.clouds_distant = this.add.tileSprite(0, 0, 0, 0, "clouds_distant").setDisplayOrigin(0, 250);
		this.clouds_distant.setScrollFactor(0);

		this.trees_distant = this.add.tileSprite(0, 0, 0, 0, "trees_distant").setDisplayOrigin(0, 650);
		this.trees_distant.setScrollFactor(0);

		this.trees = this.add.tileSprite(0, 0, 0, 0, "trees").setDisplayOrigin(0, 650);
		this.trees.setScrollFactor(0);

		this.ground = this.add.tileSprite(0, 0, 0, 0, 'ground');
		this.ground.setDisplayOrigin(0, 675);
		this.ground.setScrollFactor(0);

		this.createPlatforms();

		this.player = new Warrior(this, 300, 450);
		
		this.physics.add.collider(this.player, this.platforms);
		this.physics.world.setBoundsCollision(false);

		this.cameras.main.startFollow(this.player, true, 1, 0, 0, 150);
	}

	update() {
		this.player.update();		

		this.clouds_distant.tilePositionX = this.cameras.main.scrollX * .5;
		this.trees_distant.tilePositionX = this.cameras.main.scrollX * .5;
		this.trees.tilePositionX = this.cameras.main.scrollX * .75;
		this.ground.tilePositionX = this.cameras.main.scrollX * 1;
	}

	createPlatforms() {
		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(400, 568, "platform", undefined, false).setScale(2000, 2).refreshBody();
		this.platforms.create(600, 400, 'platform');
		this.platforms.create(50, 250, 'platform');
		this.platforms.create(750, 220, 'platform');
	}
}