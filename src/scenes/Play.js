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
        this.load.image('tower', './assets/tower_placeholder.png');
        this.load.image('enemy', './assets/enemy_placeholder.png');
      }
      
    create(){
        // place map sprite
        this.starfield = this.add.tileSprite(0, 0, 1280, 1281, 'map').setOrigin(0, 0);
        // add character (placeholder sprite)
        this.character = this.physics.add.sprite(this.sys.game.config.width / 2 + 50, this.sys.game.config.height/2, 'character',0);
        // Add ten enemies, staggered by 40 pixels. Potentially move this into update so we can change the amount of enemies according to waves.
        /*this.enemyGroupRight1 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: 10, setXY: { x: this.sys.game.config.width, y: this.sys.game.config.height/2+300, stepX: 40 } });        
        this.enemyGroupRight2 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: 10, setXY: { x: this.sys.game.config.width, y: this.sys.game.config.height/2-300, stepX: 40 } });        
        this.enemyGroupTop1 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: 10, setXY: { x: this.sys.game.config.width/2+300, y: 0, stepY: 40 } });        
        this.enemyGroupTop2 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: 10, setXY: { x: this.sys.game.config.width/2-300, y: 0, stepY: 40 } });        
        this.enemyGroupBottom1 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: 10, setXY: { x: this.sys.game.config.width/2+300, y: this.sys.game.config.height, stepY: 40 } });        
        this.enemyGroupBottom2 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: 10, setXY: { x: this.sys.game.config.width/2-350, y: this.sys.game.config.height, stepY: 40 } });        
        this.enemyGroupLeft1 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: 10, setXY: { x: 0, y: this.sys.game.config.height/2+300, stepX: 40 } });        
        this.enemyGroupLeft2 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: 10, setXY: { x: 0, y: this.sys.game.config.height/2-300, stepX: 40 } });        
      */


        //animate character (replace this once I do the sprites)

        /*this.anims.create({
          key: 'cat',
          frames: this.anims.generateFrameNumbers('character', { start: 0, end: 1, first: 0}),
          frameRate: 3,
          repeat: -1
        });
        this.character.anims.play('cat');*/

		    this.tower = this.physics.add.staticSprite(this.sys.game.config.width / 2, this.sys.game.config.height/2, 'tower',0);
        this.towerHP = 500; // set an HP amount for crystal tower; when the enemies attack it, this will go down

        // Add an HP bar at some point? Currently not sure how to code that

        // Add colliders
        this.physics.add.collider(this.character,this.tower);
        //this.physics.add.collider(this.enemyGroup,this.tower); // enemy and character collide with towers (but not each other currently)
        this.character.body.setCollideWorldBounds(true);

        // add clock
        this.clock = this.time.delayedCall(600000000, this.onClockEvent, null, this); 


        // define keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // GAME OVER flag
        this.gameOver = false;
        this.waveBeat = true;
        this.enemyNum = 5; // Start out with 5 enemies per wave, maybe increase as waves go on?
                


     }
     update() {
        
        this.elapsed = parseInt(this.clock.getElapsedSeconds());

        this.direction = new Phaser.Math.Vector2(0);

        if(this.cursors.left.isDown)
        {
            this.direction.x = -1;
        }
        else if (this.cursors.right.isDown)
        {
            this.direction.x = 1;
        }

        if (this.cursors.up.isDown)
        {
            this.direction.y = -1;
        }
        else if (this.cursors.down.isDown)
        {
            this.direction.y = 1;
        }
        this.direction.normalize();
        this.character.setVelocity(this.VEL*this.direction.x,this.VEL*this.direction.y);


        if(this.waveBeat == true) // if you beat a wave, a new one starts (maybe add a timer between waves-- not currently important)
        {
          console.log("wave triggered\n"); // debug statement
          this.waveBeat = false; // set wave beat to false before it starts spawning enemies so they don't spawn infinitely
          // Add ten enemies, staggered by 40 pixels. Potentially move this into update so we can change the amount of enemies according to waves.
          this.enemyGroupRight1 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: this.enemyNum, setXY: { x: this.sys.game.config.width, y: this.sys.game.config.height/2+300, stepX: 40 } });        
          this.enemyGroupRight2 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: this.enemyNum, setXY: { x: this.sys.game.config.width, y: this.sys.game.config.height/2-300, stepX: 40 } });        
          this.enemyGroupTop1 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: this.enemyNum, setXY: { x: this.sys.game.config.width/2+300, y: 0, stepY: 40 } });        
          this.enemyGroupTop2 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: this.enemyNum, setXY: { x: this.sys.game.config.width/2-300, y: 0, stepY: 40 } });        
          this.enemyGroupBottom1 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: this.enemyNum, setXY: { x: this.sys.game.config.width/2+300, y: this.sys.game.config.height, stepY: 40 } });        
          this.enemyGroupBottom2 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: this.enemyNum, setXY: { x: this.sys.game.config.width/2-350, y: this.sys.game.config.height, stepY: 40 } });        
          this.enemyGroupLeft1 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: this.enemyNum, setXY: { x: 0, y: this.sys.game.config.height/2+300, stepX: 40 } });        
          this.enemyGroupLeft2 = this.physics.add.group({ key: 'enemy', frame: 0, repeat: this.enemyNum, setXY: { x: 0, y: this.sys.game.config.height/2-300, stepX: 40 } });        
        }

        this.spawnEnemy(this.enemyGroupRight1,this.VEL*-0.5,0);
        this.spawnEnemy(this.enemyGroupRight2,this.VEL*-0.5,0);
        this.spawnEnemy(this.enemyGroupTop1,0,this.VEL*0.5);
        this.spawnEnemy(this.enemyGroupTop2,0,this.VEL*0.5);
        this.spawnEnemy(this.enemyGroupBottom1,0,this.VEL*-0.5);
        this.spawnEnemy(this.enemyGroupBottom2,0,this.VEL*-0.5);
        this.spawnEnemy(this.enemyGroupLeft1,this.VEL*0.5,0);
        this.spawnEnemy(this.enemyGroupLeft2,this.VEL*0.5,0);

        // currently no way to progress past the first wave


        

      }

      // Spawns enemy group; Input the velocity
      spawnEnemy(group,velX,velY){
        this.getEnemy = Phaser.Utils.Array.RemoveRandomElement(group.getChildren());
        
        if(this.getEnemy)
          {
            this.physics.add.collider(this.getEnemy,this.tower);
            this.getEnemy.setVelocity(velX,velY); // Move enemy across the screen. I'm not sure how to program the pathing.
          }

      }
      
}