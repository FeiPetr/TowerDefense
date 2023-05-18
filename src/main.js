/*
Sofia Petrova
Rocket Patrol 100000 Remodeled Super Epic Hakxor Version
10 hours
-------
(5) Track a high score that persists across scenes and display it in the UI (5)
(5) Add your own (copyright-free) background music to the Play scene (5)
(10) Create 4 new explosion sound effects and randomize which one plays on impact (10)
(10) Display the time remaining (in seconds) on the screen (10)
(10) Create a new title screen (e.g., new artwork, typography, layout) (10)
(15) Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
(15) Implement mouse control for player movement and mouse click to fire (15)
(15) Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (15)
(15) Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
-----

*/


let config = {
    type: Phaser.AUTO,
    width: 1230, //1230x1231
    height:1231,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu,Play],
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{y:300},
            debug: true
        }
    },

}
// create function in config

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
game.config.highScore = 0;
let keyF, keyR, keyLEFT, keyRIGHT;

//Track a high score that persists across scenes and display it in the UI (5)
//global variable
