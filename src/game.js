import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene.js";
import { PreloadScene } from "./scenes/PreloadScene.js";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#69E2FF",
  scene: [PreloadScene, GameScene],
  physics: {
    default: "arcade",
    arcade: { debug: false, gravity: { y: 300 } },
  },
};

export const game = new Phaser.Game(config);
