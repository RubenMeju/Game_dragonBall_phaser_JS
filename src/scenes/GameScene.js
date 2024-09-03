import { createAnimations } from "../animations.js";
import { MapController } from "../controllers/MapController.js";
import { game } from "../game.js";
import { Cell } from "../objects/Cell.js";
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
    this.nubeKinto = new NubeKinto(this, 350, 550, "NubeWalk");

    this.cell = new Cell(this, 700, 400, "enemyIdle");

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
      this.nubeKinto.onPlayerOnNube,
      null,
      this
    );

    this.physics.world.setBounds(0, 0, game.config.width, game.config.height); // Establece los límites del mundo
  }

  update(time, delta) {
    if (this.player.alive) {
      this.player.update(
        this.cursors,
        this.spaceBar,
        this.keyN,
        this.keyB,
        this.keyV
      );
    }
    this.nubeKinto.update(this.cursors, this.spaceBar);

    this.cell.update();
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

    // Configurar la tecla V (Ataque baston giro)
    this.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
  }
}
