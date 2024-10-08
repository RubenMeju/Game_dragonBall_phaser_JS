import { HealthBar } from "../objects/HealthBar";

export class UIController {
  constructor(scene) {
    this.scene = scene;

    // Crear el contenedor para la UI
    this.uiContainer = this.scene.add.container(0, 0);

    // Añadir un fondo transparente al contenedor de la UI
    this.uiBackground = this.scene.add.rectangle(
      0,
      0, // Posición inicial del rectángulo
      300, // Ancho del fondo UI
      100, // Altura del fondo UI
      0x000000, // Color del fondo
      0.1 // Opacidad del fondo
    );
    this.uiBackground.setOrigin(0, 0); // Ajustar el origen del rectángulo
    this.uiContainer.add(this.uiBackground);

    // Crear las barras de salud
    this.createHealthBars();

    this.bolasDeDragon = 0;

    this.createText();
  }

  createHealthBars() {
    // Crear la barra de salud para el jugador
    this.playerHealthBar = new HealthBar(this.scene, 10, 10, 200, 20, 100);
    this.uiContainer.add(this.playerHealthBar.container);

    // Crear la barra de salud para el enemigo
    this.enemyHealthBar = new HealthBar(this.scene, 10, 40, 200, 20, 100);
    this.uiContainer.add(this.enemyHealthBar.container);
  }

  createText() {
    this.texto = this.scene.add
      .text(120, 80, `Bolas de dragón: ${this.bolasDeDragon}`, {
        font: "28px Arial", // Cambia la fuente y tamaño si lo deseas
        fill: "#ffffff", // Color del texto
      })
      .setOrigin(0.5); // Centrar el texto

    this.uiContainer.add(this.texto);
  }

  update() {
    // Actualiza la posición del contenedor de la UI en función de la cámara
    this.uiContainer.setPosition(
      this.scene.cameras.main.scrollX,
      this.scene.cameras.main.scrollY
    );
  }
}
