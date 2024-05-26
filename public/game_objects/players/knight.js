import { SpriteKeys } from "../../constants";

export class Knight extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, SpriteKeys.Knight.Run);
		this.setOrigin(0.5);
		this.scene.add.existing(this);
		this.scene.physics.add.existing(this);
		this.body.collideWorldBounds = true;
		this.body.setSize(20, 38);
		this.body.setOffset(47, 42)
		this.setScale(2);
		this.jumping = false;
		this.invincible = false;
		this.health = 10;
		this.body.mass = 10;
		this.body.setDragY(10);
	}
}