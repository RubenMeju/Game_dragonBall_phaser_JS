import { MapController } from "../controllers/MapController.js";
import { NubeKinto } from "../objects/NubeKinto.js";
import { Player } from "../objects/Player.js";

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    this.escalado = 3;
  }

  preload() {
    //mapa
    this.load.tilemapTiledJSON("mapa", "/assets/levels/mapa0.json");
    this.load.image("tileSets", "/assets/levels/sprites1.png");

    // background
    this.load.image("bgImage", "assets/bg.png");

    //sprites nube kinto
    this.load.spritesheet("tiles-nube", "assets/kinto.png", {
      frameWidth: 48,
      frameHeight: 32,
    });
    this.load.image("tileSets-nubeKinto", "assets/kinto.png");

    // Animación idle
    this.load.image("idle1", "./assets/idle/image_1.png");
    this.load.image("idle2", "./assets/idle/image_2.png");
    this.load.image("idle3", "./assets/idle/image_3.png");
    this.load.image("idle4", "./assets/idle/image_4.png");
    this.load.image("idle5", "./assets/idle/image_5.png");
    this.load.image("idle6", "./assets/idle/image_6.png");

    // Animación jump
    this.load.image("jump1", "./assets/jump/image_1.png");
    this.load.image("jump2", "./assets/jump/image_2.png");
    this.load.image("jump3", "./assets/jump/image_3.png");
    this.load.image("jump4", "./assets/jump/image_4.png");
    this.load.image("jump5", "./assets/jump/image_5.png");
    this.load.image("jump6", "./assets/jump/image_6.png");

    // Animación walk
    this.load.image("walk1", "./assets/walk/image_1.png");
    this.load.image("walk2", "./assets/walk/image_2.png");
    this.load.image("walk3", "./assets/walk/image_3.png");
    this.load.image("walk4", "./assets/walk/image_4.png");
    this.load.image("walk5", "./assets/walk/image_5.png");
    this.load.image("walk6", "./assets/walk/image_6.png");
    this.load.image("walk7", "./assets/walk/image_7.png");
    this.load.image("walk8", "./assets/walk/image_8.png");
  }

  create() {
    // Crear la animación "idle"
    this.anims.create({
      key: "idle",
      frames: [
        { key: "idle2" },
        { key: "idle3" },
        { key: "idle4" },
        { key: "idle5" },
        { key: "idle6" },
      ],
      frameRate: 4,
      repeat: -1,
    });

    // Crear la animación "walk"
    this.anims.create({
      key: "walk",
      frames: [
        { key: "walk2" },
        { key: "walk3" },
        { key: "walk4" },
        { key: "walk5" },
        { key: "walk6" },
        { key: "walk7" },
        { key: "walk8" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    // Crear la animación "jump"
    this.anims.create({
      key: "jump",
      frames: [
        { key: "jump2" },
        { key: "jump3" },
        { key: "jump4" },
        { key: "jump5" },
      ],
      frameRate: 10,
      repeat: -1,
    });

    //animaciones nube kinto
    this.anims.create({
      key: "idleNube",
      frames: this.anims.generateFrameNumbers("tiles-nube", {
        start: 0,
        end: 2,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "idleWalk",
      frames: this.anims.generateFrameNumbers("tiles-nube", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
      repeat: -1,
    });

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
