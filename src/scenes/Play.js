class Play extends Phaser.Scene{ //creating js class 'menu' that extends phaser's predef scene object
    constructor() // The constructor (a special method for creating and initializing an object) uses
    {             // the "super" keyword to call the constructor of the super class
        super("playScene");
        this.VEL = 150;
    }

    preload() {
        this.load.image('character', './assets/rocket.png');
        // load images/tile sprites
        this.load.image('map', './assets/Test Map.png');
        this.load.image('tower', './assets/tower_placehold.png');
      }
      
    create(){
        // place map sprite
        this.starfield = this.add.tileSprite(0, 0, 1280, 1281, 'map').setOrigin(0, 0);
        // add character (placeholder sprite)
        this.character = this.physics.add.sprite(this.sys.game.config.width / 2 + 50, this.sys.game.config.height/2, 'character',0);
        //animate character
        
        /*this.anims.create({
          key: 'cat',
          frames: this.anims.generateFrameNumbers('character', { start: 0, end: 1, first: 0}),
          frameRate: 3,
          repeat: -1
        });
        this.character.anims.play('cat');*/
		    this.tower = this.physics.add.staticSprite(this.sys.game.config.width / 2, this.sys.game.config.height/2, 'tower',0);
        this.towerHP = 500; // set an HP amount for crystal tower

        this.physics.add.collider(this.character,this.tower);
        this.character.body.setCollideWorldBounds(true);


        // define keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // GAME OVER flag
        this.gameOver = false;
                


     }
     update() {
        // check key input for restart
        
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
      
}