require('./styles/styles.scss')

import "phaser"


class PlayGame extends Phaser.Scene {

  image: Phaser.GameObjects.Image 
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super("PlayGame");
  }
  
  preload(): void {
    this.load.tilemapTiledJSON("level1", "maps/level1.json")
    this.load.image("tilemap_packed", "assets/tilemap_packed.png")
  }
  
  create(): void {
    const map = this.make.tilemap({ key:'level1' })
    const tileset = map.addTilesetImage('tilemap_packed')
    const groundLayer = map.createLayer('ground',tileset, 0,0)
    groundLayer.setCollisionByExclusion([-1])
    
    this.physics.world.bounds.width = groundLayer.width
    this.physics.world.bounds.height = groundLayer.height


    this.player = this.physics.add.sprite(21,21, 'player')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.physics.add.collider(groundLayer, this.player)
    this.cursors = this.input.keyboard.createCursorKeys()


    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the player
    this.cameras.main.startFollow(this.player);
    
    // set background color, so the sky is not black    
    this.cameras.main.setBackgroundColor('#ccccff'); 

  }
  
  update(): void {
    if (this.cursors.left.isDown){ this.player.setVelocityX(-200)}
    if (this.cursors.right.isDown){ this.player.setVelocityX(200)}
    if (this.cursors.space.isDown){ this.player.setVelocityY(-500)}

  }
}

const configObject: Phaser.Types.Core.GameConfig = {
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: 'game',
      width: 800,
      height: 600
  },
  scene: PlayGame,
  physics: {
    default:'arcade',
    arcade:{
      gravity: { y:200 },
      debug:false, 
    }


  }
};

new Phaser.Game(configObject);