export class Bloque {
  constructor(scene, mapa, tilesetKey, layerName, collisionProperty) {
    this.scene = scene;
    this.mapa = mapa;
    this.tilesetKey = tilesetKey;

    // Cargar el tileset y crear la capa
    const tileset = this.mapa.addTilesetImage(tilesetKey);
    this.solidos = this.mapa.createLayer(layerName, tileset, 0, 0);

    this.solidos.setCollisionByProperty(collisionProperty);
  }
}
