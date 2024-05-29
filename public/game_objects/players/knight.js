import { SpriteKeys } from "../../constants";

export class Knight extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, SpriteKeys.Knight.Run);
		this.setOrigin(0.5);
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);

		this.cursor = this.scene.input.keyboard.createCursorKeys();
		this.spaceBar = this.scene.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.SPACE
		);

		this.body.collideWorldBounds = false;
		this.body.setSize(32, 46);
		this.body.setOffset(44, 17)
		this.body.mass = 10;
		this.setScale(2);
		
		this.right = true;
		this.init();
		this.jumping = false;
		this.attacking = false;
		this.health = 100;
		this.walkVelocity = 250;
		this.jumpVelocity = -400;
	}

	init() {
		this.scene.anims.create({
			key: 'startidle',
			frames: [{ key: SpriteKeys.Knight.Idle, frame: 0 }],
			frameRate: 3,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'playeridle',
			frames: [{ key: SpriteKeys.Knight.Idle, frame: 0 }],
			frameRate: 3,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Knight.Run, { start: 0, end: 8 }),
			frameRate: 10,
			repeat: -1
		});

		this.scene.anims.create({
			key: 'attack',
			frames: this.anims.generateFrameNumbers(SpriteKeys.Knight.Attack, { start: 0, end: 5 }),
			frameRate: 10
		});

		this.anims.play("startidle", true);
		this.on("animationcomplete", this.animationComplete, this);
	}

	update() {
		if (this.jumping) {
			if (this.body.velocity.y >= 0) {
				this.body.setGravityY(150);
				this.falling = true;
			}
		}

		if (Phaser.Input.Keyboard.JustDown(this.cursor.up) && this.body.blocked.down) {
			this.attacking = false;
			this.body.setVelocityY(this.jumpVelocity);
			this.body.setGravityY(150);
			this.jumping = true;
		} else if (this.cursor.right.isDown) {
			if (this.body.blocked.down && !this.attacking) {
				this.anims.play("walk", true);
			}
			this.right = true;
			this.flipX = false;
			this.body.setVelocityX(this.walkVelocity);
		} else if (this.cursor.left.isDown) {
			if (this.body.blocked.down && !this.attacking) {
				this.anims.play("walk", true);
			}
			this.right = false;
			this.flipX = true;
			this.body.setVelocityX(-this.walkVelocity);
		} else {
			if (this.body.blocked.down) {
				this.jumping = false;
				this.falling = false;
				if (!this.attacking) this.anims.play("playeridle", true);
			}
			this.body.setVelocityX(0);
		}

		if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) this.attack();
	}

	attack() {
		this.attacking = true;
		this.anims.play("attack", true);
		const offsetX = this.right ? 32 : -32;
		const size = this.mjolnir ? 128 : 32;
	}

	animationComplete(animation, frame) {
		if (animation.key === "playerground") {
			this.anims.play("playeridle", true);
		}
		if (animation.key === "attack") {
			this.anims.play("playeridle", true);
			this.attacking = false;
		}
	}
}