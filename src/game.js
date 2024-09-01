import Phaser from "phaser";
import { GameScene } from "./scenes/GameScene.js";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 700,
  backgroundColor: "#69E2FF",
  scene: [GameScene],
  physics: {
    default: "arcade",
    arcade: { debug: true, gravity: { y: 300 } },
  },
};

export const game = new Phaser.Game(config);
