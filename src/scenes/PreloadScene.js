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
      3000,
      () => {
        this.scene.start("GameScene");
      },
      [],
      this
    );
  }
}
