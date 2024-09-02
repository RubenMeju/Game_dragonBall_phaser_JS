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

  // Crear la animación "jumpDown"
  scene.anims.create({
    key: "jumpDown",
    frames: [{ key: "jumpDown1" }, { key: "jumpDown2" }],
    frameRate: 1,
    repeat: -1,
  });

  // Crear la animación "caer"
  scene.anims.create({
    key: "caer",
    frames: [
      { key: "caer1" },
      { key: "caer2" },
      { key: "caer3" },
      { key: "caer4" },
    ],
    frameRate: 6,
    repeat: -1,
  });

  // ATAQUES PLAYER
  // Crear la animación "ondaLateral"
  scene.anims.create({
    key: "ondaLateral",
    frames: [
      { key: "ondaLateral4" },
      { key: "ondaLateral1" },
      { key: "ondaLateral2" },
      { key: "ondaLateral3" },
      { key: "ondaLateral4" },
    ],
    frameRate: 6,
    repeat: 0,
  });

  // Crear la animación "bolaDeFuego"
  scene.anims.create({
    key: "bolaDeFuego",
    frames: [
      { key: "bolaDeFuego1" },
      { key: "bolaDeFuego2" },
      { key: "bolaDeFuego3" },
    ],
    frameRate: 6,
    repeat: -1,
  });

  // NUBE
  // Animaciones el jugador encima de la nube Kinto
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

  // ENEMIGOS
  // Crear la animación "idle"
  scene.anims.create({
    key: "enemyIdle",
    frames: [
      { key: "enemyIdle1" },
      { key: "enemyIdle2" },
      { key: "enemyIdle3" },
      { key: "enemyIdle4" },
    ],
    frameRate: 4,
    repeat: -1,
  });

  // Crear la animación "walk"
  scene.anims.create({
    key: "enemyWalk",
    frames: [
      { key: "enemyWalk1" },
      { key: "enemyWalk2" },
      { key: "enemyWalk3" },
      { key: "enemyWalk4" },
    ],
    frameRate: 4,
    repeat: -1,
  });

  // Crear la animación "fly"
  scene.anims.create({
    key: "enemyFly",
    frames: [{ key: "enemyFly2" }],
    frameRate: 4,
    repeat: -1,
  });
}
