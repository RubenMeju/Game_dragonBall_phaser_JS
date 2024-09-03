import Phaser from "phaser";

export class NubeKinto extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.velocidad = 350;
    this.isPlayerOnTop = false;

    this.setupSprite(scene);
    this.setupPhysics(scene);
    this.setupCollisions();
  }

  setupSprite(scene) {
    // Agregar la nube al escenario y configurar el sprite
    scene.add.existing(this);
    this.setScale(scene.escalado);
    this.setOrigin(0, 1);
  }

  setupPhysics(scene) {
    // Añadir la física de la nube
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.body.allowGravity = false;
    this.body.setSize(48, this.height);
    this.body.setOffset(0, 0);
    this.setCollideWorldBounds(true);

    // Configurar los límites del mundo
    scene.physics.world.setBounds(
      0,
      0,
      scene.mapController.map.widthInPixels,
      scene.mapController.map.heightInPixels
    );
  }

  update(cursors) {
    if (this.isPlayerOnTop) {
      this.handleMovement(cursors);
      this.syncPlayerMovement();
    } else {
      this.playIdleAnimation();
      this.setVelocity(0, 0);
    }
  }

  handleMovement(cursors) {
    let velocityX = 0;
    let velocityY = 0;

    if (cursors.left.isDown) {
      velocityX = -this.velocidad;
      this.flipX = true;
      this.playMovementAnimation();
    } else if (cursors.right.isDown) {
      velocityX = this.velocidad;
      this.flipX = false;
      this.playMovementAnimation();
    }

    if (cursors.up.isDown && this.canMoveUp()) {
      velocityY = -this.velocidad;
    } else if (cursors.down.isDown && this.canMoveDown()) {
      velocityY = this.velocidad;
    }

    this.setVelocity(velocityX, velocityY);
  }

  canMoveUp() {
    return this.y >= this.scene.physics.world.bounds.y + 200;
  }

  canMoveDown() {
    return this.y <= this.scene.physics.world.bounds.height - 200;
  }

  syncPlayerMovement() {
    this.scene.player.setVelocity(this.body.velocity.x, this.body.velocity.y);
  }

  playMovementAnimation() {
    this.anims.play("NubeWalk", true);
    this.scene.player.anims.play("playerWalkNube", true);
  }

  playIdleAnimation() {
    this.anims.play("nubeIdle", true);
  }

  setupCollisions() {
    const blocks = this.scene.mapController.getBlocks();
    if (blocks?.solidos) {
      this.scene.physics.add.collider(this, blocks.solidos);
    } else {
      console.error("No se encontraron bloques sólidos en setupCollisions.");
    }
  }

  // Si el jugador está encima de la nube
  onPlayerOnNube(player, nubeKinto) {
    // Verificar si el jugador está tocando la parte superior de la nube
    if (player.body.touching.down && nubeKinto.body.touching.up) {
      // Desactivar la gravedad del jugador para que no caiga
      player.body.allowGravity = false;
      // Indicar que el jugador está sobre la nube
      nubeKinto.isPlayerOnTop = true;
      player.anims.play("playerWalkNube", true);
    }
  }

  llamarNubeKinto() {
    console.log("La nube va de camino", this);

    const targetX = this.scene.player.x + 50;
    const targetY = this.scene.player.y - 20;

    this.scene.tweens.add({
      targets: this,
      x: targetX,
      y: targetY,
      duration: 1000,
      ease: "Sine.easeInOut",
    });
  }
}
