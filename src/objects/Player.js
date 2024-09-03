import Phaser from "phaser";
import { BolaDeFuego } from "./BolaDeFuego";
import { HealthBar } from "./HealthBar";
import { game } from "../game";

export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.velocidad = 200;
    this.alive = true;
    this.animAttack = false;
    this.bolasDeFuego = null;
    // Inicialización de variables de control
    this.setupPlayer(scene);
    this.setupPhysics(scene);
    this.setupAnimations();
    this.setupFireballGroup();
    this.setupCollisions();

    // Configura la barra de vida
    this.healthBar = new HealthBar(scene, x - 10, y - 40, 100, 10, 20); // Ajusta la posición y tamaño según tu preferencia
  }

  setupPlayer(scene) {
    // Agregar al escenario y a la física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configuración del sprite
    this.setScale(scene.escalado);
    this.setOrigin(0.5, 1);
    this.body.setSize(28, 36);
    this.body.setOffset(2, 0);
  }

  setupPhysics(scene) {
    this.setGravityY(300);
    this.setCollideWorldBounds(true);

    // Asegúrate de que el tamaño del mundo es correcto
    scene.physics.world.setBounds(
      0,
      0,
      scene.mapController.map.widthInPixels,
      scene.mapController.map.heightInPixels
    );
  }

  setupAnimations() {
    // Reproducir animación idle al inicio
    this.anims.play("idle");
  }

  setupFireballGroup() {
    // Grupo de bolas de fuego
    this.bolasDeFuego = this.scene.physics.add.group({
      classType: BolaDeFuego,
      runChildUpdate: true,
    });
  }

  update(cursors, spaceBar, keyN, keyB, keyV) {
    if (this.animAttack) return; // No permitir acciones durante el ataque

    const isOnGround = this.body.blocked.down;
    const isFalling = !isOnGround && this.body.velocity.y > 0;

    if (this.alive) {
      this.handleMovement(cursors, spaceBar, isOnGround, isFalling);
      this.handleBastonGiro(keyV);
      this.handleFireball(keyB);
      this.handleCloudMovement(cursors, spaceBar);
      this.handleCloudCall(keyN);
    }

    // eliminar la bola de fuego si sale del mapa
    this.bolasDeFuego.getChildren().forEach((bolaDeFuego) => {
      if (
        bolaDeFuego.x < 0 ||
        bolaDeFuego.x > game.config.width ||
        bolaDeFuego.y < 0 ||
        bolaDeFuego.y > game.config.height
      ) {
        bolaDeFuego.emit("out-of-bounds", bolaDeFuego); // Emite un evento personalizado
        bolaDeFuego.destroy(); // Destruye la bala
      }
    });
  }

  handleMovement(cursors, spaceBar, isOnGround, isFalling) {
    let velocityX = 0;

    if (!this.scene.nubeKinto.isPlayerOnTop) {
      if (cursors.left.isDown) {
        velocityX = -this.velocidad;
        this.flipX = true;
        this.playAnimation("walk", isOnGround);
      } else if (cursors.right.isDown) {
        velocityX = this.velocidad;
        this.flipX = false;
        this.playAnimation("walk", isOnGround);
      } else {
        this.playIdleOrFallAnimation(isOnGround, isFalling);
      }

      if (spaceBar.isDown && isOnGround) {
        this.setVelocityY(-500);
        this.anims.play("jump", true);
      }

      this.setVelocityX(velocityX);
    }
  }

  playAnimation(animation, condition) {
    if (condition) {
      this.anims.play(animation, true);
    }
  }

  playIdleOrFallAnimation(isOnGround, isFalling) {
    if (isFalling) {
      this.anims.play("jumpDown", true);
    } else if (isOnGround) {
      this.anims.play("idle", true);
    }
  }

  handleBastonGiro(keyV) {
    if (keyV.isDown) {
      if (!this.animAttack) {
        console.log("la tecla V fue pulsada");
        this.animAttack = true;
        this.anims.play("golpeBastonGiro", true);

        this.once("animationcomplete-golpeBastonGiro", () => {
          console.log("la animacion ha terminado");

          this.animAttack = false;
        });
      }
    }
  }

  handleFireball(keyB) {
    if (keyB.isDown) {
      if (!this.bolaDeFuegoActivo) {
        this.lanzarBolaDeFuego();
        this.bolaDeFuegoActivo = true;
      }
    } else {
      this.bolaDeFuegoActivo = false;
    }
  }

  lanzarBolaDeFuego() {
    if (this.animAttack) return;

    this.animAttack = true;
    this.cambiarAnimacion("ondaLateral");

    this.once("animationcomplete-ondaLateral", () => {
      const bolaDeFuego = this.bolasDeFuego.get(
        this.x,
        this.y - 60,
        "bolaDeFuego"
      );

      if (bolaDeFuego) {
        const mirandoALaIzquierda = this.flipX;
        const velocidadX = mirandoALaIzquierda ? -400 : 400;

        bolaDeFuego.setActive(true).setVisible(true);
        bolaDeFuego.body.setVelocityX(velocidadX);
        bolaDeFuego.setFlipX(mirandoALaIzquierda);
        //  bolaDeFuego.body.setCollideWorldBounds(true);
        bolaDeFuego.body.allowGravity = false;
      }

      this.animAttack = false;
      this.resetPlayerAnimation();
    });
  }

  resetPlayerAnimation() {
    if (this.scene.nubeKinto.isPlayerOnTop) {
      this.cambiarAnimacion("playerWalkNube");
    } else if (this.body.blocked.down) {
      this.cambiarAnimacion("idle");
    }
  }

  handleCloudMovement(cursors, spaceBar) {
    if (this.scene.nubeKinto.isPlayerOnTop) {
      this.x = this.scene.nubeKinto.x + 75;
      this.y = this.scene.nubeKinto.y - this.scene.nubeKinto.height - 20;
      this.flipX = this.scene.nubeKinto.flipX;

      let velocityY = 0;
      if (cursors.up.isDown) {
        velocityY = -this.velocidad;
      } else if (cursors.down.isDown) {
        velocityY = this.velocidad;
      }

      this.setVelocity(0, velocityY);

      if (spaceBar.isDown) {
        this.body.allowGravity = true;
        this.scene.nubeKinto.isPlayerOnTop = false;
      }
    }
  }

  handleCloudCall(keyN) {
    if (keyN.isDown && !this.scene.nubeKinto.isPlayerOnTop) {
      this.scene.nubeKinto.llamarNubeKinto();
    }
  }

  cambiarAnimacion(animacion) {
    if (this.anims.currentAnim?.key !== animacion) {
      this.anims.play(animacion, true);
    }
  }

  setupCollisions() {
    const blocks = this.scene.mapController.getBlocks();

    if (blocks?.solidos) {
      this.scene.physics.add.collider(this, blocks.solidos);
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
    console.log("Impacto de una bola de fuego con un bloque", bolaDeFuego);
    bolaDeFuego.destroy();
  }

  bolaDeFuegoImpactaEnCell(cell, bolaDeFuego) {
    console.log("la bola de fuego impacta en el cell", bolaDeFuego);
    bolaDeFuego.destroy();
  }

  takeDamage(amount) {
    if (this.alive) {
      this.healthBar.setHealth(this.healthBar.currentHealth - amount);
      if (this.healthBar.currentHealth <= 0) {
        this.die();
      }
    }
  }

  die() {
    this.alive = false;
    this.setVelocity(0, 0);
    this.setSize(30, 1);
    this.setOffset(10, 15);
    this.anims.play("morir", true);
  }
}
