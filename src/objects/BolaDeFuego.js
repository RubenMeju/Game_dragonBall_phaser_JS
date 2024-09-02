export class BolaDeFuego extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;

    // Agregar al escenario y a la física
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // Reproducir animación idle al inicio
    this.anims.play("bolaDeFuego");
  }
}
