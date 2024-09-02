import { Bloque } from "../objects/Bloque.js";

export class MapController {
  constructor(scene) {
    this.scene = scene;
    this.map = null;
    this.blocks = null;
    this.initial();
  }

  initial() {
    this.createMap();
    this.createBackground();
    this.createBlocks();
  }

  // Método para crear el mapa
  createMap() {
    this.map = this.scene.make.tilemap({ key: "mapa" });
  }

  createBackground() {
    // Crear el fondo que se repite en horizontal
    this.background = this.scene.add
      .tileSprite(0, 0, 32000, 3200, "bgImage")
      .setOrigin(0, 0);

    // Si deseas que el fondo se desplace:
    this.scene.events.on("update", () => {
      this.background.tilePositionX += 1;
    });
  }

  // Método para crear los bloques sólidos
  createBlocks() {
    this.blocks = new Bloque(this.scene, this.map, "tileSets", "solidos", {
      bloques: true,
    });
  }

  // Método para exponer los bloques a otros componentes
  getBlocks() {
    return this.blocks;
  }
}
