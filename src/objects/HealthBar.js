import Phaser from "phaser";

export class HealthBar {
  constructor(scene, x, y, width, height, maxHealth) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;

    // Crear un contenedor para la barra de salud
    this.container = scene.add.container(x, y);

    // Crear el fondo de la barra de vida
    this.background = this.scene.add.rectangle(0, 0, width, height, 0x000000);
    this.background.setOrigin(0, 0.5);
    this.container.add(this.background);

    // Crear la barra de vida
    this.bar = this.scene.add.rectangle(0, 0, width, height, 0x00ff00);
    this.bar.setOrigin(0, 0.5);
    this.container.add(this.bar);

    // Actualizar la barra de vida
    this.updateBar();
  }

  updateBar() {
    const healthPercent = this.currentHealth / this.maxHealth;
    this.bar.setSize(this.width * healthPercent, this.height);
    const color = healthPercent > 0.5 ? 0x00ff00 : 0xff0000;
    this.bar.setFillStyle(color);
  }

  setHealth(health) {
    this.currentHealth = Phaser.Math.Clamp(health, 0, this.maxHealth);
    this.updateBar();
  }

  // Método para actualizar la posición de la barra
  setPosition(x, y) {
    this.container.setPosition(x, y);
  }
}
