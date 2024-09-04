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
    this.load.spritesheet("tiles-goku", "assets/animsPlayer/jump.png", {
      frameWidth: 38,
      frameHeight: 38,
    });

    //sprites nube kinto
    this.load.spritesheet("tiles-nube", "assets/kinto.png", {
      frameWidth: 48,
      frameHeight: 32,
    });
    //  this.load.image("tileSets-nubeKinto", "assets/kinto.png");

    //sprites items
    this.load.spritesheet("tiles-items", "assets/items.png", {
      frameWidth: 23,
      frameHeight: 24,
    });

    // ANIMACIONES PLAYER
    // Animación idle
    this.load.image("idle1", "./assets/idle/image_1.png");
    this.load.image("idle2", "./assets/idle/image_2.png");
    this.load.image("idle3", "./assets/idle/image_3.png");
    this.load.image("idle4", "./assets/idle/image_4.png");
    this.load.image("idle5", "./assets/idle/image_5.png");
    this.load.image("idle6", "./assets/idle/image_6.png");

    // Animación walk
    this.load.image("walk1", "./assets/walk/image_1.png");
    this.load.image("walk2", "./assets/walk/image_2.png");
    this.load.image("walk3", "./assets/walk/image_3.png");
    this.load.image("walk4", "./assets/walk/image_4.png");
    this.load.image("walk5", "./assets/walk/image_5.png");
    this.load.image("walk6", "./assets/walk/image_6.png");
    this.load.image("walk7", "./assets/walk/image_7.png");
    this.load.image("walk8", "./assets/walk/image_8.png");

    // Animación jumpDown
    this.load.image("jumpDown1", "./assets/jumpDown/image_caer.png");
    this.load.image("jumpDown2", "./assets/jumpDown/image_caer1.png");

    // Animación caer
    this.load.image("caer1", "./assets/animsPlayer/caer/image_1.png");
    this.load.image("caer2", "./assets/animsPlayer/caer/image_2.png");
    this.load.image("caer3", "./assets/animsPlayer/caer/image_3.png");
    this.load.image("caer4", "./assets/animsPlayer/caer/image_4.png");
    this.load.image("caer5", "./assets/animsPlayer/caer/image_5.png");
    this.load.image("caer6", "./assets/animsPlayer/caer/image_6.png");
    this.load.image("caer7", "./assets/animsPlayer/caer/image_7.png");
    this.load.image("caer8", "./assets/animsPlayer/caer/image_8.png");
    this.load.image("caer9", "./assets/animsPlayer/caer/image_9.png");
    this.load.image("caer10", "./assets/animsPlayer/caer/image_10.png");
    this.load.image("caer11", "./assets/animsPlayer/caer/image_11.png");

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
