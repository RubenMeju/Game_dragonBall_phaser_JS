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
    // Cargar y crear el mapa del nivel actual
    this.mapController.createMap();
    this.mapController.createBlocks();
    // Crear el jugador en una posición inicial
    this.player = new Player(this, 100, 100, "idle1");

    const mapWidth = this.mapController.map.widthInPixels;
    const mapHeight = this.mapController.map.heightInPixels;
    console.log("mapw", mapWidth);

    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(this.player);

    this.setupControls();
    // this.nubeKinto = this.add.sprite(100, 600, "tiles-nube", 0);
    // this.nubeKinto.setScale(3);

    this.nubeKinto = new NubeKinto(this, 100, 100, "idleWalk");
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
}
