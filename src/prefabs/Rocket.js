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
        else if (keyUP.isDown  || (game.input.activePointer.x > 320 ) && this.y <= game.config.width - borderUISize - this.width)
        {
          this.y += this.moveSpeed;
          if(this.y != game.input.activePointer.y)
          {
            this.y = game.input.activePointer.y;
          }

        }else if (keyDOWN.isDown  || (game.input.activePointer.x > 320 ) && this.y <= game.config.width - borderUISize - this.width)
        {
          this.y += this.moveSpeed;
          if(this.y != game.input.activePointer.y)
          {
            this.y = game.input.activePointer.y;
          }

        }

      
      //potentially keep something like this for sprite to wrap around screen if i don't keep hard boundaries
      if(this.y <= borderUISize * 3 +borderPadding || this.x <= borderUISize * 3 +borderPadding){
        this.reset();
      }
      //this.p1Rocket.update();

    }
    reset()
    {
      this.y = game.config.height - borderUISize -borderPadding;
      this.x = game.config.height - borderUISize -borderPadding; // fix this if needed; just a placeholder
    }
  }
  