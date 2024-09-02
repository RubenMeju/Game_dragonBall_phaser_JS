import Phaser from "phaser";

export class NubeKinto extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    // Configuración de propiedades del jugador
    this.velocidad = 200;
    this.isPlayerOnTop = false;
    this.lastDirection = "up";

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(scene.escalado);
    this.setOrigin(0, 1);
    // Configurar las propiedades físicas de la nube
    this.setImmovable(true); // Hace que la nube no sea empujada por el jugador
    this.body.allowGravity = false; // Desactivar la gravedad de la nube

    // Ajusta el tamaño y el offset del cuerpo físico para que coincidan con el sprite
    this.body.setSize(48, this.height);
    this.body.setOffset(0, 0);

    // Colisiones
    this.setupCollisions();
  }

  update(cursors, spaceBar) {
    let velocityX = 0;
    let velocityY = 0;

    // Movimiento horizontal solo si el jugador está sobre la nube
    if (this.isPlayerOnTop) {
      if (cursors.left.isDown) {
        velocityX = -this.velocidad;
        this.flipX = true;
        this.anims.play("NubeWalk", true);
        this.scene.player.anims.play("playerWalkNube", true);
      } else if (cursors.right.isDown) {
        velocityX = this.velocidad;
        this.flipX = false;
        this.anims.play("NubeWalk", true);
        this.scene.player.anims.play("playerWalkNube", true);
      } else if (cursors.up.isDown) {
        velocityY = -this.velocidad;
      } else if (cursors.down.isDown) {
        velocityY = this.velocidad;
      } else {
        this.anims.play("nubeIdle", true);
      }
    } else {
      // Si el jugador no está encima, la nube no se mueve
      this.anims.play("nubeIdle", true);
    }

    // Aplica la velocidad horizontal
    this.setVelocityX(velocityX);
    this.setVelocityY(velocityY);
  }

  setupCollisions() {
    const blocks = this.scene.mapController.getBlocks();

    // Verifica si blocks y blocks.solidos están correctamente definidos
    if (blocks?.solidos) {
      this.scene.physics.add.collider(this, blocks.solidos);
    } else {
      console.error("No se encontraron bloques sólidos en setupCollisions.");
    }
  }
}
