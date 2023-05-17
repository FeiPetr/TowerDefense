class EvilSpaceship extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame,pointValue)
    {
        super(scene,x,y,texture,frame);
        scene.add.existing(this); //add to existing scene
        this.points = pointValue+5;
        this.moveSpeed = 5;
    }
    update(){
        //move spaceship left
        this.x -= this.moveSpeed;
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width)
        {
            this.x = game.config.width;
        }
    }
    //position reset
    reset()
    {
        this.x = game.config.width;
    }
}