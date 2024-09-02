import { createAnimations } from "../animations.js";
import { MapController } from "../controllers/MapController.js";
import { BolaDeFuego } from "../objects/BolaDeFuego.js";
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
      this.player.update(this.cursors, this.spaceBar, this.keyN, this.keyB);
    }
    this.nubeKinto.update(this.cursors, this.spaceBar);
  }

  setupControls() {
    // Configurar teclas de cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // Configurar la tecla SPACE
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Configurar la tecla N (llamar a la nube)
    this.keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

    // Configurar la tecla B (lanzar onda Lateral)
    this.keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
  }

  // Si el jugador está encima de la nube
  onPlayerOnNube(player, nubeKinto) {
    // Verificar si el jugador está tocando la parte superior de la nube
    if (player.body.touching.down && nubeKinto.body.touching.up) {
      // Desactivar la gravedad del jugador para que no caiga
      player.body.allowGravity = false;
      // Indicar que el jugador está sobre la nube
      nubeKinto.isPlayerOnTop = true;
    }
  }
}
