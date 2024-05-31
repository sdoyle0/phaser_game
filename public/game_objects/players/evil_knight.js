import { SpriteKeys } from "../../constants";

export class EvilKnight extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, SpriteKeys.Evil_Knight.Idle);
		this.setOrigin(0.5);
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		

		this.body.collideWorldBounds = false;
		this.body.setSize(64, 64);
		this.body.setOffset(0, 8)
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

	init() {
		this.scene.anims.create({
			key: 'evil_startidle',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Evil_Knight.Idle, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'evil_playeridle',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Evil_Knight.Idle, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'evil_walk',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Evil_Knight.Walk, { start: 0, end: 7 }),
			frameRate: 10,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'evil_attack',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Evil_Knight.Attack, { start: 0, end: 6 }),
			frameRate: 10
		});

		this.anims.play("evil_attack", true);
		this.on("animationcomplete", this.animationComplete, this);
	}

	update() {
		// if (this.jumping) {
		// 	if (this.body.velocity.y >= 0) {
		// 		this.body.setGravityY(150);
		// 		this.falling = true;
		// 	}
		// }

		// if (Phaser.Input.Keyboard.JustDown(this.cursor.up) && this.body.blocked.down) {
		// 	this.attacking = false;
		// 	this.body.setVelocityY(this.jumpVelocity);
		// 	this.body.setGravityY(150);
		// 	this.jumping = true;
		// } else if (this.cursor.right.isDown) {
		// 	if (this.body.blocked.down && !this.attacking) {
		// 		this.anims.play("walk", true);
		// 	}
		// 	this.right = true;
		// 	this.flipX = false;
		// 	this.body.setVelocityX(this.walkVelocity);
		// } else if (this.cursor.left.isDown) {
		// 	if (this.body.blocked.down && !this.attacking) {
		// 		this.anims.play("walk", true);
		// 	}
		// 	this.right = false;
		// 	this.flipX = true;
		// 	this.body.setVelocityX(-this.walkVelocity);
		// } else {
		// 	if (this.body.blocked.down) {
		// 		this.jumping = false;
		// 		this.falling = false;
		// 		if (!this.attacking) this.anims.play("playeridle", true);
		// 	}
		// 	this.body.setVelocityX(0);
		// }

		// if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) this.attack();
		this.attack();
	}

	attack() {
		this.attacking = true;
		this.anims.play("evil_attack", true);
		const offsetX = this.right ? 32 : -32;
		const size = this.mjolnir ? 128 : 32;
	}

	animationComplete(animation, frame) {
		if (animation.key === "playerground") {
			this.anims.play("evil_playeridle", true);
		}
		if (animation.key === "attack") {
			this.anims.play("evil_playeridle", true);
			this.attacking = false;
		}
	}
}