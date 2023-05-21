// Enemy prefab
class Enemy extends Phaser.GameObjects.Physics.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.HP = 100;
      this.atk = 5;
      

    }

  }
  