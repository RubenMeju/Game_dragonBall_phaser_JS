export class Item extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, frame) {
    // Pasa el nombre de la textura al superconstructor
    super(scene, x, y, "tiles-items", frame);

    // Añade el sprite al mundo de la escena
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(2);

    this.body.setAllowGravity(false);

    this.body.setImmovable(true);

    this.startY = y; // Posición original en Y
    this.startX = x; // Posición original en X
    this.radius = 50; // Radio del círculo que describirá el movimiento
    this.angle = 0; // Ángulo inicial
    this.angularSpeed = 0.04; // Velocidad de rotación

    this.setCollideWorldBounds(true);
    this.setupCollisions();
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // Actualizar el ángulo
    this.angle += this.angularSpeed;

    // Calcular la nueva posición basada en el ángulo
    const newX = this.startX + this.radius * Math.cos(this.angle);
    const newY = this.startY + this.radius * Math.sin(this.angle);

    // Actualizar la posición del item
    this.setPosition(newX, newY);
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
    item.destroy();
  }
}
