import Phaser from "phaser";
import { SceneNames, SpriteKeys } from "./constants";
import { Knight } from "./game_objects/players/knight";

export class DarkMountiainScene extends Phaser.Scene {
	constructor() {
		super(SceneNames.DarkMountain);
		this.player = null;
	}
	

	preload() {
		this.load.image('background', 'assets/backgrounds/dark_mountain/parallax-mountain-bg.png');
		this.load.image('mountains_far', 'assets/backgrounds/dark_mountain/parallax-mountain-montain-far.png');
		this.load.image('mountains_near', 'assets/backgrounds/dark_mountain/parallax-mountain-mountains.png');
		this.load.image('trees_far', 'assets/backgrounds/dark_mountain/parallax-mountain-trees.png');
		this.load.image('trees_near', 'assets/backgrounds/dark_mountain/parallax-mountain-foreground-trees.png');

		this.load.spritesheet(SpriteKeys.Knight.Run, 'assets/knight/Run.png', { frameWidth: 128, frameHeight: 64});
		this.load.spritesheet(SpriteKeys.Knight.Idle, 'assets/knight/Idle.png', { frameWidth: 128, frameHeight: 64});
		this.load.spritesheet(SpriteKeys.Knight.Attack, 'assets/knight/Attacks.png', { frameWidth: 128, frameHeight: 64});
	}

	create() {
		this.add.tileSprite(0, 0, 0, 0, "background")
				.setOrigin(0,0)
				.setDisplaySize(800, 500)
				.setScrollFactor(0);
		
		this.mountains_far = this.add.tileSprite(0, 0, 0, 0, "mountains_far")
				.setDisplayOrigin(0, 0)
				.setDisplaySize(800, 500)
				.setScrollFactor(0);

		this.mountains_near = this.add.tileSprite(0, 0, 0, 0, "mountains_near")
				.setDisplayOrigin(0, 0)
				.setDisplaySize(800, 500)
				.setScrollFactor(0);

		this.trees_far = this.add.tileSprite(0, 0, 0, 0, "trees_far")
				.setDisplayOrigin(0, 0)
				.setDisplaySize(800, 500)
				.setScrollFactor(0);
		
		this.trees_near = this.add.tileSprite(0, 0, 0, 0, "trees_near")
				.setDisplayOrigin(0, 0)
				.setDisplaySize(800, 500)
				.setScrollFactor(0);

		this.createPlatforms();

		this.player = new Knight(this, 300, 450);
		
		this.physics.add.collider(this.player, this.platforms);
		this.physics.world.setBoundsCollision(false);

		this.cameras.main.startFollow(this.player, true, 1, 0, 0, 150);
	}

	update() {
		this.player.update();		

		this.mountains_far.tilePositionX = this.cameras.main.scrollX * .2;
		this.mountains_near.tilePositionX = this.cameras.main.scrollX * .5;
		this.trees_far.tilePositionX = this.cameras.main.scrollX * .75;
		this.trees_near.tilePositionX = this.cameras.main.scrollX * .75;
	}

	createPlatforms() {
		this.platforms = this.physics.add.staticGroup();

		const rect = new Phaser.GameObjects.Rectangle(this, 400, 568, 800000, 100, 0x333333);
		this.add.existing(rect);
		this.platforms.add(rect);

		const rect2 = new Phaser.GameObjects.Rectangle(this, 600, 400, 400, 32, 0x333333);
		this.add.existing(rect2);
		this.platforms.add(rect2);

		const rect3 = new Phaser.GameObjects.Rectangle(this, 50, 250, 400, 32, 0x333333);
		this.add.existing(rect3);
		this.platforms.add(rect3);

		const rect4 = new Phaser.GameObjects.Rectangle(this, 750, 220, 400, 32, 0x333333);
		this.add.existing(rect4);
		this.platforms.add(rect4);
		
	}
}