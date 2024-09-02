export function createAnimations(scene) {
  // Crear la animación "idle"
  scene.anims.create({
    key: "idle",
    frames: [
      { key: "idle2" },
      { key: "idle3" },
      { key: "idle4" },
      { key: "idle5" },
      { key: "idle6" },
    ],
    frameRate: 4,
    repeat: -1,
  });

  // Crear la animación "walk"
  scene.anims.create({
    key: "walk",
    frames: [
      { key: "walk2" },
      { key: "walk3" },
      { key: "walk4" },
      { key: "walk5" },
      { key: "walk6" },
      { key: "walk7" },
      { key: "walk8" },
    ],
    frameRate: 10,
    repeat: -1,
  });

  // Crear la animación "jump"
  scene.anims.create({
    key: "jump",
    frames: [
      { key: "jump2" },
      { key: "jump3" },
      { key: "jump4" },
      { key: "jump5" },
    ],
    frameRate: 10,
    repeat: -1,
  });

  // Animaciones el jugador encima de la nube Kinto
  // Crear la animación "jump"
  scene.anims.create({
    key: "playerWalkNube",
    frames: [{ key: "playerWalkNube1" }, { key: "playerWalkNube2" }],
    frameRate: 3,
    repeat: -1,
  });

  // Animaciones de la Nube Kinto
  scene.anims.create({
    key: "nubeIdle",
    frames: scene.anims.generateFrameNumbers("tiles-nube", {
      start: 0,
      end: 2,
    }),
    frameRate: 5,
    repeat: -1,
  });

  scene.anims.create({
    key: "NubeWalk",
    frames: scene.anims.generateFrameNumbers("tiles-nube", {
      start: 0,
      end: 4,
    }),
    frameRate: 5,
    repeat: -1,
  });
}
