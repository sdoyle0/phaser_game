import Phaser from "phaser";
import { SceneNames, SpriteKeys } from "./constants";
import { Knight } from "./game_objects/players/knight";
import { EvilKnight } from "./game_objects/players/evil_knight";
import { SkullWolf } from "./game_objects/enemies/skull_wolf";

export class DarkMountiainScene extends Phaser.Scene {
	constructor() {
		super(SceneNames.DarkMountain);
		this.player = null;
	}

	#backgroundKey

	preload() {
		this.load.image('background', 'assets/backgrounds/dark_mountain/parallax-mountain-bg.png');
		this.load.image('mountains_far', 'assets/backgrounds/dark_mountain/parallax-mountain-montain-far.png');
		this.load.image('mountains_near', 'assets/backgrounds/dark_mountain/parallax-mountain-mountains.png');
		this.load.image('trees_far', 'assets/backgrounds/dark_mountain/parallax-mountain-trees.png');
		this.load.image('trees_near', 'assets/backgrounds/dark_mountain/parallax-mountain-foreground-trees.png');

		Knight.preload(this);
		EvilKnight.preload(this);
		SkullWolf.preload(this);
	}

	create() {
		const width = 800;
		const height = 520;
		const setTileSpriteProps = (tileSprite) => {
			tileSprite.setDisplayOrigin(0, 0)
				.setDisplaySize(800, height)
				.setScrollFactor(0);
		}

		const background = this.add.tileSprite(0, 0, 0, 0, "background");
		setTileSpriteProps(background);


		this.mountains_far = this.add.tileSprite(0, 0, 0, 0, "mountains_far")
		setTileSpriteProps(this.mountains_far);

		this.mountains_near = this.add.tileSprite(0, 0, 0, 0, "mountains_near")
		setTileSpriteProps(this.mountains_near);

		this.trees_far = this.add.tileSprite(0, 0, 0, 0, "trees_far")
		setTileSpriteProps(this.trees_far);

		this.trees_near = this.add.tileSprite(0, 0, 0, 0, "trees_near")
		setTileSpriteProps(this.trees_near);

		this.createPlatforms();

		this.player = new Knight(this, 300, 450);
		this.physics.add.collider(this.player, this.platforms);

		this.enemy = new EvilKnight(this, 450, 300);
		this.skullWolf = new SkullWolf(this, 450, 450);

		this.foesGroup = this.add.group();
		this.foesGroup.add(this.enemy);
		this.foesGroup.add(this.skullWolf);
		this.physics.add.collider(this.foesGroup, this.platforms);

		this.physics.world.setBoundsCollision(false);
		this.cameras.main.startFollow(this.player, true, 1, 0, 0, 150);

		//Setup hits
		this.hits = this.add.group();
		this.physics.add.overlap(
			this.hits,
			this.foesGroup,
			this.hitFoe,
			() => true,
			this
		);
	}

	hitFoe(hit, foe) {
		if (this.player.attacking) {	
			foe.hit();
		}
	}

	update() {
		this.player.update();
		this.enemy.update();
		this.skullWolf.update();

		this.mountains_far.tilePositionX = this.cameras.main.scrollX * .2;
		this.mountains_near.tilePositionX = this.cameras.main.scrollX * .5;
		this.trees_far.tilePositionX = this.cameras.main.scrollX * .75;
		this.trees_near.tilePositionX = this.cameras.main.scrollX * .75;
	}

	createPlatforms() {
		this.platforms = this.physics.add.staticGroup();

		const addRect = (x, y, width, height) => {
			const rect = new Phaser.GameObjects.Rectangle(this, x, y, width, height, 0x333333);
			this.add.existing(rect);
			this.platforms.add(rect);
		};

		addRect(400, 568, 800000, 100);
		addRect(600, 400, 400, 32);
		addRect(50, 250, 400, 32);
		addRect(750, 220, 400, 32);
	}
}