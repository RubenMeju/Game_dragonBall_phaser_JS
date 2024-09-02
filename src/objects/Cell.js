export class Cell extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.velocidad = 200;
    this.alive = true;
    this.lastDirection = "up";
    this.animAttack = false;

    // Agregar al escenario y a la física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configuración del sprite
    this.setScale(1.5);
    this.setOrigin(0.5, 1);
    this.body.setSize(80, 100);
    this.body.setOffset(0, 0);

    // Configurar la gravedad del jugador
    this.setGravityY(300);

    // Configura límites del mundo
    this.setCollideWorldBounds(true);

    // Asegúrate de que el tamaño del mundo es correcto
    this.scene.physics.world.setBounds(
      0,
      0,
      this.scene.mapController.map.widthInPixels,
      this.scene.mapController.map.heightInPixels
    );

    // Colisiones
    this.setupCollisions();

    // Reproducir animación idle al inicio
    this.anims.play("enemyIdle");
  }

  update() {
    if (this.scene.player.x < this.x) {
      console.log("player: ", this.scene.player.x);
      console.log("cell: ", this.x);
      this.flipX = true;
    } else {
      this.flipX = false;
    }
  }
  setupCollisions() {
    const blocks = this.scene.mapController.getBlocks();

    // Verifica si blocks y blocks.solidos están correctamente definidos
    if (blocks?.solidos) {
      // colision cell con bloques
      this.scene.physics.add.collider(this, blocks.solidos);
    } else {
      console.error("No se encontraron bloques sólidos en setupCollisions.");
    }
  }
}
