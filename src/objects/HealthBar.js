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

    // Crear el fondo de la barra de vida
    this.background = this.scene.add.rectangle(x, y, width, height, 0x000000);
    this.background.setOrigin(0, 0.5);

    // Crear el contenedor de la barra de vida
    this.bar = this.scene.add.rectangle(x, y, width, height, 0x00ff00);
    this.bar.setOrigin(0, 0.5);

    // Crear la barra de vida en sí
    this.updateBar();
  }

  updateBar() {
    // Calcular la proporción de vida restante
    const healthPercent = this.currentHealth / this.maxHealth;

    // Ajustar el ancho de la barra de vida
    this.bar.setSize(this.width * healthPercent, this.height);

    // Actualizar el color de la barra de vida en función de la salud
    const color = healthPercent > 0.5 ? 0x00ff00 : 0xff0000; // Verde para más de 50%, rojo para menos
    this.bar.setFillStyle(color);
  }

  setHealth(health) {
    this.currentHealth = Phaser.Math.Clamp(health, 0, this.maxHealth);
    this.updateBar();
  }
}