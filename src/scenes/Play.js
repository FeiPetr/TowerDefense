class Play extends Phaser.Scene{ //creating js class 'menu' that extends phaser's predef scene object
    constructor() // The constructor (a special method for creating and initializing an object) uses
    {             // the "super" keyword to call the constructor of the super class
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
      }
      
    create(){
        //this.add.text(20,20,"TesttestTETSTTSTT");
        // place tile sprite (placeholder)
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.character = this.physics.add.sprite(32, 32,'rocket',0);


        // define keys
        this.cursors = this.input.keyboard.createCursorKeys()
        // initialize score
        this.p1Score = 0;

          // display score
        let scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#843605',
          align: 'right',
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;


        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            //display high score
            this.add.text(game.config.width/2, game.config.height/2 + 128, 'High Score: ' + game.config.highScore, scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        this.elapsed = parseInt(this.clock.getRemainingSeconds()); // get elapsed time
        this.timeLeft = this.add.text(borderUISize + borderPadding + 256, borderUISize + borderPadding*2, this.elapsed, scoreConfig);
 
        


     }
     update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
          this.scene.restart();
        }
        this.direction = new Phaser.Math.Vector2(0)
        if(this.cursors.left.isDown)
        {
            this.direction.x = -1
        }
        else if (this.cursors.right.isDown)
        {
            this.direction.x = 1
        }
        if (this.cursors.up.isDown)
        {
            this.direction.y = -1
        }
        else if (this.cursors.down.isDown)
        {
            this.direction.y = 1
        }
        this.direction.normalize()
        this.slime.setVelocity(this.VEL*this.direction.x,this.VEL*this.direction.y)

      }





      checkCollision(rocket, ship) {
      if (rocket.x < ship.x + ship.width && 
          rocket.x + rocket.width > ship.x && 
          rocket.y < ship.y + ship.height &&
          rocket.height + rocket.y > ship. y) {
          return true;
        } else {
          return false;
        }
      }
      shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
          // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        // Saving high score
        this.random = Phaser.Math.Between(1, 4);
        if (this.p1Score > this.game.config.highScore)
        {
          game.config.highScore = this.p1Score;
        }
        if(this.random == 1)
        {
          this.sound.play('sfx_explosion1');
        }
        else if (this.random == 2)
        {
          this.sound.play('sfx_explosion2');
        }
        else if (this.random == 3)
        {
          this.sound.play('sfx_explosion3');
        }        
        else if (this.random == 4)
        {
          this.sound.play('sfx_explosion4');
        }

        
      }
      
      createExplosion(x,y) 
      {
       this.emitterfunc = this.add.particles(x, y, 'sparks', {
        speed: 100,
        lifespan: 300,
        gravityY: 200
    });
      return this.emitterfunc;
  }
      
    
}