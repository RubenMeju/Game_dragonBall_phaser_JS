export class Cell extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.velocidad = 200;
    this.alive = true;
    this.lastDirection = "up";
    this.animAttack = false;

    // Agregar al escenario y a la física
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configuración del sprite
    this.setScale(1.5);
    this.setOrigin(0.5, 1);
    this.body.setSize(80, 100);
    this.body.setOffset(0, 0);

    // Configurar la gravedad del jugador
    this.setGravityY(300);
    this.setImmovable(true);
    // Configura límites del mundo
    this.setCollideWorldBounds(true);

    // Asegúrate de que el tamaño del mundo es correcto
    this.scene.physics.world.setBounds(
      0,
      0,
      this.scene.mapController.map.widthInPixels,
      this.scene.mapController.map.heightInPixels
    );

    // Colisiones
    this.setupCollisions();

    // Reproducir animación idle al inicio
    this.anims.play("enemyIdle");
  }

  update() {
    if (this.alive) {
      // Determina la dirección del movimiento hacia el jugador
      const player = this.scene.player;
      const distanceX = player.x - this.x;
      const distanceY = player.y - this.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Solo mueve el cell si está cerca del jugador
      if (distance < 500) {
        // Ajusta este valor según la distancia en la que el cell debe comenzar a moverse
        // Normaliza la dirección del movimiento
        const directionX = distanceX / distance;
        const directionY = distanceY / distance;

        // Establece la velocidad y dirección
        this.setVelocityX(directionX * this.velocidad);
        this.setVelocityY(directionY * this.velocidad);

        // Establece la animación de caminar
        this.anims.play("enemyFly", true);

        // Voltea el sprite según la dirección de movimiento
        this.flipX = directionX < 0;
      } else {
        // Si no se está moviendo, establece la animación idle
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.anims.play("enemyIdle", true);
      }
    }
  }

  setupCollisions() {
    const blocks = this.scene.mapController.getBlocks();

    // Verifica si blocks y blocks.solidos están correctamente definidos
    if (blocks?.solidos) {
      // colision cell con bloques
      this.scene.physics.add.collider(this, blocks.solidos);

      // colision cell con el jugador
      this.scene.physics.add.collider(
        this,
        this.scene.player,
        this.handleColisionCellWithPlayer,
        null,
        this
      );
    } else {
      console.error("No se encontraron bloques sólidos en setupCollisions.");
    }
  }

  handleColisionCellWithPlayer() {
    console.log("el cell esta colisionando con el jugador");
  }
}
