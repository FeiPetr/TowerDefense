// Rocket prefab
class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.HP = 100; 
      

    }

    update()
    {
      //reset here
      if(this.y <= borderUISize * 3 +borderPadding || this.x <= borderUISize * 3 +borderPadding){
        this.reset();
      }
      //this.p1Rocket.update();

    }
    reset()
    {
      this.HP = 500;
    }
  }
  