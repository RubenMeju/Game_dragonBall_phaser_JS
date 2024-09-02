import { createAnimations } from "../animations.js";
import { MapController } from "../controllers/MapController.js";
import { NubeKinto } from "../objects/NubeKinto.js";
import { Player } from "../objects/Player.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    this.escalado = 3;
  }

  create() {
    // Crear las animaciones
    createAnimations(this);

    this.mapController = new MapController(this);

    // Crear el jugador en una posición inicial
    this.player = new Player(this, 100, 100, "idle1");

    // Creal la nube
    this.nubeKinto = new NubeKinto(this, 350, 850, "NubeWalk");

    // Cámara
    const mapWidth = this.mapController.map.widthInPixels;
    const mapHeight = this.mapController.map.heightInPixels;

    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(this.player);

    this.setupControls();

    // Detectar la colisión entre el jugador y la nube
    this.physics.add.collider(
      this.player,
      this.nubeKinto,
      this.onPlayerOnNube,
      null,
      this
    );
  }

  update(time, delta) {
    if (this.player.alive) {
      this.player.update(this.cursors, this.spaceBar);
    }
    this.nubeKinto.update(this.cursors, this.spaceBar);
  }

  setupControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  // Si el jugador está encima de la nube
  onPlayerOnNube(player, nubeKinto) {
    console.log("onplayerOnNube");
    // Verificar si el jugador está tocando la parte superior de la nube
    if (player.body.touching.down && nubeKinto.body.touching.up) {
      console.log("El jugador está encima de la nube");

      // Ajustar la posición del jugador para que esté exactamente encima de la nube
      player.setVelocityX(0);
      player.setVelocityY(0);
      player.x = nubeKinto.x + 75;
      player.y = nubeKinto.y - nubeKinto.height - 20; // Ajustar la posición del jugador ligeramente por encima de la nube

      // Desactivar la gravedad del jugador para que no caiga
      player.body.allowGravity = false;
      // Indicar que el jugador está sobre la nube
      nubeKinto.isPlayerOnTop = true;
    }

    if (nubeKinto.isPlayerOnTop && this.spaceBar.isDown) {
      console.log("no esta encima de la nube");
      // Si el jugador no está en contacto con la nube, restaurar la gravedad
      player.body.allowGravity = true;
      nubeKinto.isPlayerOnTop = false;
    }
  }
}
