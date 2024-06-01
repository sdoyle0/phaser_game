import { SpriteKeys } from "../../constants";

export class SkullWolf extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, SpriteKeys.Skull_Wolf);
		this.setOrigin(0.5);
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);		

		this.body.collideWorldBounds = false;
		this.body.setSize(64, 64);
		this.body.setOffset(0, 0);
		this.body.mass = 10;
		this.setScale(2);
		
		this.right = false;
		this.init();
		this.attacking = false;
		this.health = 100;
		this.walkVelocity = 250;
	}

	static preload(scene) {
		scene.load.spritesheet(SpriteKeys.Skull_Wolf, 'assets/enemies/skull_wolf.png', { frameWidth: 64, frameHeight: 64});
	}

	init() {
		this.anims.create({
			key: 'skullWolf_idle',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Skull_Wolf, { start: 0, end: 5 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'skullWolf_attack',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Skull_Wolf, { start: 7, end: 11 }),
			frameRate: 10
		});

		this.anims.create({
			key: 'skullWolf_hit',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Skull_Wolf, { start: 13, end: 16 }),
			frameRate: 10
		});

		this.anims.create({
			key: 'skullWolf_death',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Skull_Wolf, { start: 21, end: 27 }),
			frameRate: 10
		});

		this.anims.play("skullWolf_idle", true);
		this.on("animationcomplete", this.animationComplete, this);
	}

	update() { }

	attack() {
		this.attacking = true;
		this.anims.play("skullWolf_attack", true);
	}

	hit() {
		this.health -= 50;
		if (this.health > 0) {
			this.anims.play("skullWolf_hit", true);
		} else {
			this.dead = true;
			this.anims.play("skullWolf_death", true);
		}		
	}

	animationComplete(animation, frame) {
		if (animation.key === "skullWolf_death") {
			this.destroy();
		}

		if (!this.dead) {
			this.anims.play("skullWolf_idle", true);
		}
	}
}