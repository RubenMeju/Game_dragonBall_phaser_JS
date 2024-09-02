import Phaser from "phaser";
import { BolaDeFuego } from "./BolaDeFuego";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.velocidad = 200;
    this.alive = true;
    this.lastDirection = "up";
    this.animAttack = false;

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

    // Reproducir animación idle al inicio
    this.anims.play("idle");

    // Grupo de bolas de fuego
    this.bolasDeFuego = this.scene.physics.add.group({
      classType: BolaDeFuego,
      runChildUpdate: true,
    });

    // Colisiones
    this.setupCollisions();
  }

  update(cursors, spaceBar, keyN, keyB) {
    let velocityX = 0;
    let velocityY = this.body.velocity.y;

    // Determinar si el jugador está en el suelo
    const isOnGround = this.body.blocked.down;
    const isFalling = !isOnGround && velocityY > 0;
    if (this.animAttack) {
      return;
    }
    // Si el jugador NO está en la nube, permitir movimiento horizontal
    if (!this.scene.nubeKinto.isPlayerOnTop) {
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
    }

    // Salto
    if (spaceBar.isDown && isOnGround) {
      this.setVelocityY(-400);
      this.anims.play("jump", true);
    }

    // Lanzar bola de fuego lateral
    if (keyB.isDown) {
      if (!this.bolaDeFuegoActivo) {
        this.lanzarBolaDeFuego();
        this.bolaDeFuegoActivo = true; // Evitar lanzar múltiples bolas rápidamente
      }
    } else {
      this.bolaDeFuegoActivo = false;
    }

    // Movimiento vertical cuando el jugador está sobre la nube
    if (this.scene.nubeKinto.isPlayerOnTop) {
      // Deshabilitar movimiento horizontal propio del jugador
      velocityX = 0;
      // Salto
      if (spaceBar.isDown) {
        console.log("saltando en la nube");

        // Desactivar la gravedad del jugador para que no caiga
        this.body.allowGravity = true;
        // Indicar que el jugador está sobre la nube
        this.scene.nubeKinto.isPlayerOnTop = false;
      }
      // Alinear la posición del jugador sobre la nube
      this.x = this.scene.nubeKinto.x + 75;
      this.y = this.scene.nubeKinto.y - this.scene.nubeKinto.height - 20;

      // Mantener flipX para la dirección
      this.flipX = this.scene.nubeKinto.flipX;

      // Permitir movimiento vertical
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
  cambiarAnimacion(animacion) {
    if (this.anims.currentAnim && this.anims.currentAnim.key === animacion) {
      return; // No cambia la animación si ya está reproduciéndose la misma
    }
    this.anims.play(animacion, true);
  }

  lanzarBolaDeFuego() {
    if (this.animAttack) return; // Asegúrate de que no se pueda lanzar otra bola mientras está en ataque

    this.animAttack = true;
    this.cambiarAnimacion("ondaLateral");

    // Escuchar el evento "animationcomplete" solo para la animación específica
    this.once("animationcomplete-ondaLateral", () => {
      console.log("La animación ondaLateral ha terminado");

      // Crear una nueva bola de fuego en la posición del jugador
      const bolaDeFuego = this.bolasDeFuego.get(
        this.x,
        this.y - 50,
        "bolaDeFuego"
      );
      if (bolaDeFuego) {
        bolaDeFuego.setActive(true).setVisible(true);
        bolaDeFuego.body.setVelocityX(400); // Ajustar la velocidad según sea necesario
        bolaDeFuego.body.setCollideWorldBounds(true);
        bolaDeFuego.body.allowGravity = false; // Desactivar la gravedad aquí
      }

      this.animAttack = false;

      // Volver a la animación adecuada
      if (this.scene.nubeKinto.isPlayerOnTop) {
        this.cambiarAnimacion("playerWalkNube");
      } else if (this.body.blocked.down) {
        this.cambiarAnimacion("idle"); // O cualquier animación que represente estar en el suelo
      }
    });
  }

  setupCollisions() {
    const blocks = this.scene.mapController.getBlocks();

    // Verifica si blocks y blocks.solidos están correctamente definidos
    if (blocks?.solidos) {
      // colision jugador con bloques
      this.scene.physics.add.collider(this, blocks.solidos);

      //colision bolas de fuego con bloques
      this.scene.physics.add.collider(
        this.bolasDeFuego,
        blocks.solidos,
        this.bolaDeFuegoImpactaEnUnMuro,
        null,
        this
      );
    } else {
      console.error("No se encontraron bloques sólidos en setupCollisions.");
    }
  }

  bolaDeFuegoImpactaEnUnMuro(bolaDeFuego, tile) {
    console.log("impacto de una bola de fuego con un bloque", bolaDeFuego);
    bolaDeFuego.destroy();
  }
}
