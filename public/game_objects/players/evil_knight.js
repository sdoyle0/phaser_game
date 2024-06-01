import { SpriteKeys } from "../../constants";

export class EvilKnight extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, SpriteKeys.Evil_Knight.Idle);
		this.setOrigin(0.5);
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		

		this.body.collideWorldBounds = false;
		this.body.setSize(64, 64);
		this.body.setOffset(0, 8);
		this.body.mass = 10;
		this.setScale(2);
		
		this.right = false;
		this.init();
		this.jumping = false;
		this.attacking = false;
		this.health = 100;
		this.walkVelocity = 250;
		this.jumpVelocity = -400;
	}

	static preload(scene) {
		scene.load.spritesheet(SpriteKeys.Evil_Knight.Walk, 'assets/enemies/evil_knight/Knight-Walk-Sheet.png', { frameWidth: 64, frameHeight: 64});
		scene.load.spritesheet(SpriteKeys.Evil_Knight.Idle, 'assets/enemies/evil_knight/Knight-Idle-Sheet.png', { frameWidth: 64, frameHeight: 64});
		scene.load.spritesheet(SpriteKeys.Evil_Knight.Attack, 'assets/enemies/evil_knight/Knight-Attack-Sheet.png', { frameWidth: 74, frameHeight: 74});
	}

	init() {
		this.anims.create({
			key: 'evil_playeridle',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Evil_Knight.Idle, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'evil_walk',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Evil_Knight.Walk, { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'evil_attack',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Evil_Knight.Attack, { start: 0, end: 6 }),
			frameRate: 10
		});

		this.anims.play("evil_playeridle", true);
		this.on("animationcomplete", this.animationComplete, this);
	}

	update() { }

	attack() {
		this.attacking = true;
		this.anims.play("evil_attack", true);
	}

	hit() {
		this.health -= 20;
		if (this.health > 0) {
			this.attack();
		} else {
			this.dead = true;
			this.destroy();
		}		
	}

	animationComplete(animation, frame) {		
		if (animation.key === "attack") {
			this.attacking = false;
		}
		this.anims.play("evil_playeridle", true);
	}
}