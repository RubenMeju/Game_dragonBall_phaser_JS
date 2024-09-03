export class Item extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, frame) {
    // Pasa el nombre de la textura al superconstructor
    super(scene, x, y, "tiles-items", frame);

    // Añade el sprite al mundo de la escena
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2);

    this.setCollideWorldBounds(true);
    this.setupCollisions();
  }

  setupCollisions() {
    const blocks = this.scene.mapController.getBlocks();

    if (blocks?.solidos) {
      this.scene.physics.add.collider(this, blocks.solidos);
    }

    // Detectar la colisión entre el jugador y eñ item
    this.scene.physics.add.collider(
      this.scene.player,
      this,
      this.getItem,
      null,
      this
    );
  }

  getItem(player, item) {
    console.log("has cogido el item", item);

    item.destroy();
  }
}
