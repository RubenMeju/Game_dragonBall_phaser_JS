import Phaser from "phaser";

export class NubeKinto extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    // Configuración de propiedades del jugador
    this.velocidad = 200;
    this.alive = true;
    this.lastDirection = "up";

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(scene.escalado);
    this.setOrigin(0, 1);

    // Configurar la gravedad del jugador
    this.setGravityY(0);
    // Colisiones
    this.setupCollisions();
  }

  update(cursors, spaceBar) {
    let velocityX = 0;

    // Movimiento horizontal
    if (cursors.left.isDown) {
      velocityX = -this.velocidad;
      this.flipX = true;
      this.anims.play("idleWalk", true);
    } else if (cursors.right.isDown) {
      velocityX = this.velocidad;
      this.flipX = false;
      this.anims.play("idleWalk", true);
    } else {
      this.anims.play("idleNube", true);
    }

    // Salto
    if (spaceBar.isDown && this.body.blocked.down) {
      this.setVelocityY(-400);
      //   this.anims.play("jump", true);
    }

    // Aplica la velocidad horizontal
    this.setVelocityX(velocityX);
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
