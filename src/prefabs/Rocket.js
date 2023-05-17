// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.isFiring = false; //track rocket's firing status
      this.moveSpeed = 2; //pixels per frame
      this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
      

    }

    update()
    {
      if(!this.isFiring){
        if(keyLEFT.isDown || (game.input.activePointer.x < 320 ) && this.x >= borderUISize + this.width)
        {
          this.x -= this.moveSpeed;
          if(this.x != game.input.activePointer.x)
          {
            this.x = game.input.activePointer.x;
          }
        } else if (keyRIGHT.isDown  || (game.input.activePointer.x > 320 ) && this.x <= game.config.width - borderUISize - this.width)
        {
          this.x += this.moveSpeed;
          if(this.x != game.input.activePointer.x)
          {
            this.x = game.input.activePointer.x;
          }

        }
      }
      //fire button (F or click)
      if(Phaser.Input.Keyboard.JustDown(keyF) || game.input.activePointer.isDown && !this.isFiring){
        this.isFiring = true;
        this.sfxRocket.play();  // play sfx

      }
      //if fired, move up
      if(this.isFiring && this.y >= borderUISize * 3 + borderPadding)
      {
        this.y -= this.moveSpeed;
      }
      //reset on miss
      if(this.y <= borderUISize * 3 +borderPadding){
        this.reset();
      }
      //this.p1Rocket.update();

    }
    reset()
    {
      this.isFiring = false;
      this.y = game.config.height - borderUISize -borderPadding;
    }
  }
  