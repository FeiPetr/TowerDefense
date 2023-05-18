class Play extends Phaser.Scene{ //creating js class 'menu' that extends phaser's predef scene object
    constructor() // The constructor (a special method for creating and initializing an object) uses
    {             // the "super" keyword to call the constructor of the super class
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('map', './assets/Test Map.png');
        // load spritesheet
        this.load.spritesheet('character', './assets/cat_sprites.PNG', {frameWidth: 107, frameHeight: 80, startFrame: 0, endFrame: 1});
      }
      
    create(){
        //this.add.text(20,20,"TesttestTETSTTSTT");
        // place tile sprite (placeholder)
        this.starfield = this.add.tileSprite(0, 0, 1280, 1281, 'map').setOrigin(0, 0);
        // add character
        this.character = this.physics.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height/2, 'character',0);
        //animate character
        this.anims.create({
          key: 'cat',
          frames: this.anims.generateFrameNumbers('character', { start: 0, end: 1, first: 0}),
          frameRate: 3,
          repeat: -1
        });
        this.character.anims.play('cat');
        this.character.body.setCollideWorldBounds(true);


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
        
        // Maybe add clock after
        


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
        this.character.setVelocity(this.VEL*this.direction.x,this.VEL*this.direction.y)

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

        
      
      
      
    
}