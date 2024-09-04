export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    //mapa
    this.load.tilemapTiledJSON("mapa", "/assets/levels/mapa0.json");
    this.load.image("tileSets", "/assets/levels/sprites1.png");

    // background
    this.load.image("bgImage", "assets/bg.png");

    //sprites goku
    // IDle
    this.load.spritesheet("tiles-goku-idle", "assets/animsPlayer/idle.png", {
      frameWidth: 36,
      frameHeight: 40,
    });

    // Walk
    this.load.spritesheet("tiles-goku-walk", "assets/animsPlayer/walk.png", {
      frameWidth: 36,
      frameHeight: 46,
    });

    //jump
    this.load.spritesheet("tiles-goku-jump", "assets/animsPlayer/jump.png", {
      frameWidth: 38,
      frameHeight: 38,
    });

    //morir
    this.load.spritesheet("tiles-goku-morir", "assets/animsPlayer/morir.png", {
      frameWidth: 40,
      frameHeight: 40,
    });

    //sprites nube kinto
    this.load.spritesheet("tiles-nube", "assets/kinto.png", {
      frameWidth: 48,
      frameHeight: 32,
    });

    //sprites items
    this.load.spritesheet("tiles-items", "assets/items.png", {
      frameWidth: 23,
      frameHeight: 24,
    });

    // Animación jumpDown
    this.load.image("jumpDown1", "./assets/jumpDown/image_caer.png");
    this.load.image("jumpDown2", "./assets/jumpDown/image_caer1.png");

    // ATAQUES PLAYER

    // Animación golpe baston giro
    this.load.image(
      "golpeBastonGiro1",
      "./assets/animsPlayer/golpeBastonGiro/image_1.png"
    );
    this.load.image(
      "golpeBastonGiro2",
      "./assets/animsPlayer/golpeBastonGiro/image_2.png"
    );
    this.load.image(
      "golpeBastonGiro3",
      "./assets/animsPlayer/golpeBastonGiro/image_3.png"
    );
    this.load.image(
      "golpeBastonGiro4",
      "./assets/animsPlayer/golpeBastonGiro/image_4.png"
    );
    this.load.image(
      "golpeBastonGiro5",
      "./assets/animsPlayer/golpeBastonGiro/image_5.png"
    );
    this.load.image(
      "golpeBastonGiro6",
      "./assets/animsPlayer/golpeBastonGiro/image_6.png"
    );
    this.load.image(
      "golpeBastonGiro7",
      "./assets/animsPlayer/golpeBastonGiro/image_7.png"
    );
    this.load.image(
      "golpeBastonGiro8",
      "./assets/animsPlayer/golpeBastonGiro/image_8.png"
    );

    // Animación onda lateral
    this.load.image("ondaLateral1", "./assets/ondaLateral/image_1.png");
    this.load.image("ondaLateral2", "./assets/ondaLateral/image_2.png");
    this.load.image("ondaLateral3", "./assets/ondaLateral/image_3.png");
    this.load.image("ondaLateral4", "./assets/ondaLateral/image_4.png");

    // Animación bola de fuego
    this.load.image("bolaDeFuego1", "./assets/bolaDeFuego/image_1.png");
    this.load.image("bolaDeFuego2", "./assets/bolaDeFuego/image_2.png");
    this.load.image("bolaDeFuego3", "./assets/bolaDeFuego/image_3.png");

    // Animación playerWalkNube
    this.load.image("playerWalkNube1", "./assets/playerWalkNube/image_1.png");
    this.load.image("playerWalkNube2", "./assets/playerWalkNube/image_2.png");

    //Animaciones Enemigos
    // Animación idle
    this.load.image("enemyIdle1", "./assets/animsEnemy/idle/image_1.png");
    this.load.image("enemyIdle2", "./assets/animsEnemy/idle/image_2.png");
    this.load.image("enemyIdle3", "./assets/animsEnemy/idle/image_3.png");
    this.load.image("enemyIdle4", "./assets/animsEnemy/idle/image_4.png");

    // Animación walk
    this.load.image("enemyWalk1", "./assets/animsEnemy/walk/image_1.png");
    this.load.image("enemyWalk2", "./assets/animsEnemy/walk/image_2.png");
    this.load.image("enemyWalk3", "./assets/animsEnemy/walk/image_3.png");
    this.load.image("enemyWalk4", "./assets/animsEnemy/walk/image_4.png");

    // Animación fly
    this.load.image("enemyFly2", "./assets/animsEnemy/fly/image_2.png");

    // Animación die
    this.load.image("enemyDie1", "./assets/animsEnemy/die/image_1.png");
    this.load.image("enemyDie2", "./assets/animsEnemy/die/image_2.png");
    this.load.image("enemyDie3", "./assets/animsEnemy/die/image_3.png");
    this.load.image("enemyDie4", "./assets/animsEnemy/die/image_4.png");
  }

  create() {
    // Agregar un texto en el centro de la pantalla que diga "Cargando..."
    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "Cargando...",
        {
          font: "32px Arial", // Cambia la fuente y tamaño si lo deseas
          fill: "#ffffff", // Color del texto
        }
      )
      .setOrigin(0.5); // Centrar el texto

    // Esperar 3 segundos y luego pasar a la escena GameScene
    this.time.delayedCall(
      500,
      () => {
        this.scene.start("GameScene");
      },
      [],
      this
    );
  }
}
