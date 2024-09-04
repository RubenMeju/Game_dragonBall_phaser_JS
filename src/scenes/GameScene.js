import { createAnimations } from "../animations.js";
import { MapController } from "../controllers/MapController.js";
import { UIController } from "../controllers/UIController.js";
import { Item } from "../objects/Item.js";
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

    // Inicializar UI Manager
    this.uiController = new UIController(this);

    // Crear el jugador en una posición inicial
    this.player = new Player(this, 100, 100, "idle1");

    // Creal la nube
    this.nubeKinto = new NubeKinto(this, 350, 550, "NubeWalk");

    //  this.cell = new Cell(this, 700, 850, "enemyIdle");

    // Obtener el tamaño del mundo o del mapa
    const mapWidth = this.mapController.map.widthInPixels;
    const mapHeight = this.mapController.map.heightInPixels;

    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(this.player);

    this.setupControls();
    this.setupCollisions();

    // Definir número de items
    const numItems = 7;

    // Crear los items en posiciones aleatorias y asignarles diferentes frames
    for (let i = 0; i < numItems; i++) {
      // Generar posiciones aleatorias dentro del mapa
      const x = Phaser.Math.Between(0, mapWidth);
      const y = Phaser.Math.Between(0, mapHeight);

      // Seleccionar un frame aleatorio
      const frame = Phaser.Math.Between(0, 6); // Asegúrate de que este rango coincida con los frames disponibles

      new Item(this, x, y, frame);
    }
  }

  update(time, delta) {
    // Actualizar la UI
    this.uiController.update();

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

    // this.cell.update();
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

  setupCollisions() {
    // Detectar la colisión entre el jugador y la nube
    this.physics.add.collider(
      this.player,
      this.nubeKinto,
      this.nubeKinto.onPlayerOnNube,
      null,
      this
    );

    // colision entre las bolas de fuego y el cell
    this.physics.add.collider(
      this.player.bolasDeFuego,
      this.cell,
      this.player.bolaDeFuegoImpactaEnCell,
      null,
      this
    );
  }
}
