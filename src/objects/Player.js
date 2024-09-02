import Phaser from "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.velocidad = 200;
    this.alive = true;
    this.lastDirection = "up";

    // Agregar al escenario y a la física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configuración del sprite
    this.setScale(scene.escalado);
    this.setOrigin(0.5, 1);
    this.body.setSize(28, 36);
    this.body.setOffset(2, 0);

    // Configurar la gravedad del jugador
    this.setGravityY(300);

    // Configura límites del mundo
    this.setCollideWorldBounds(true);

    // Asegúrate de que el tamaño del mundo es correcto
    this.scene.physics.world.setBounds(
      0,
      0,
      this.scene.mapController.map.widthInPixels,
      this.scene.mapController.map.heightInPixels
    );

    // Colisiones
    this.setupCollisions();

    // Reproducir animación idle al inicio
    this.anims.play("idle");
  }

  update(cursors, spaceBar, keyN) {
    let velocityX = 0;
    let velocityY = this.body.velocity.y;

    // Determinar si el jugador está en el suelo
    const isOnGround = this.body.blocked.down;
    const isFalling = !isOnGround && velocityY > 0;

    // Movimiento horizontal
    if (cursors.left.isDown) {
      velocityX = -this.velocidad;
      this.flipX = true;
      if (isOnGround) {
        this.anims.play("walk", true);
      }
    } else if (cursors.right.isDown) {
      velocityX = this.velocidad;
      this.flipX = false;
      if (isOnGround) {
        this.anims.play("walk", true);
      }
    } else {
      if (isFalling) {
        this.anims.play("jumpDown", true);
      } else if (isOnGround) {
        this.anims.play("idle", true);
      }
    }

    // Salto
    if (spaceBar.isDown && isOnGround) {
      this.setVelocityY(-400);
      this.anims.play("jump", true);
    }

    // Movimiento vertical cuando el jugador está sobre la nube
    if (this.scene.nubeKinto.isPlayerOnTop) {
      if (cursors.up.isDown) {
        velocityY = -this.velocidad;
      } else if (cursors.down.isDown) {
        velocityY = this.velocidad;
      } else {
        velocityY = 0;
      }
      this.setVelocity(velocityX, velocityY); // Mover jugador con la nube
    } else {
      this.setVelocityX(velocityX);
      if (!isOnGround && !isFalling) {
        this.setVelocityY(velocityY); // Mantener la velocidad vertical cuando no está en el aire
      }
    }

    // Llamar a la nube
    if (keyN.isDown && !this.scene.nubeKinto.isPlayerOnTop) {
      this.scene.nubeKinto.llamarNubeKinto();
    }
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
