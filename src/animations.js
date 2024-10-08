export function createAnimations(scene) {
  // Crear la animación "idle"
  scene.anims.create({
    key: "idle",
    frames: scene.anims.generateFrameNumbers("tiles-goku-idle", {
      start: 0,
      end: 5,
    }),
    frameRate: 5,
    repeat: -1,
  });

  // Crear la animación "walk"
  scene.anims.create({
    key: "walk",
    frames: scene.anims.generateFrameNumbers("tiles-goku-walk", {
      start: 0,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // Animación jump
  scene.anims.create({
    key: "jump",
    frames: scene.anims.generateFrameNumbers("tiles-goku-jump", {
      start: 0,
      end: 4,
    }),
    frameRate: 5,
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
    frames: scene.anims.generateFrameNumbers("tiles-goku-morir", {
      start: 6,
      end: 7,
    }),
    frameRate: 5,
    repeat: -1,
  });

  // Animación morir
  scene.anims.create({
    key: "morir",
    frames: scene.anims.generateFrameNumbers("tiles-goku-morir", {
      start: 0,
      end: 3,
    }),
    frameRate: 5,
    repeat: 0,
  });

  // ATAQUES PLAYER
  // Crear la animación "ondaLateral"
  scene.anims.create({
    key: "ondaLateral",
    frames: scene.anims.generateFrameNumbers("tiles-goku-ondaLateral", {
      start: 1,
      end: 0,
    }),
    frameRate: 4,
    repeat: 0,
  });

  // Ataque baston giro
  scene.anims.create({
    key: "golpeBastonGiro",
    frames: [
      { key: "golpeBastonGiro1" },
      { key: "golpeBastonGiro2" },
      { key: "golpeBastonGiro3" },
      { key: "golpeBastonGiro4" },
      { key: "golpeBastonGiro5" },
      { key: "golpeBastonGiro6" },
      { key: "golpeBastonGiro7" },
      { key: "golpeBastonGiro8" },
    ],
    frameRate: 6,
    repeat: 0,
  });
  /*
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
*/
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

  scene.anims.create({
    key: "enemyDamage",
    frames: scene.anims.generateFrameNumbers("tiles-cell-damage", {
      start: 0,
      end: 1,
    }),
    frameRate: 2,
    repeat: 0,
  });

  // Crear la animación "die"
  scene.anims.create({
    key: "enemyDie",
    frames: [{ key: "enemyDie1" }, { key: "enemyDie2" }, { key: "enemyDie4" }],
    frameRate: 3,
    repeat: 0,
  });
}
