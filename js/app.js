// Enemies our player must avoid
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
        this.x = 0;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(speed) {
    this.x = 205;
    this.y = 380;
    this.speed = speed;
    this.sprite = 'images/char-princess-girl.png';
};
//Update player
Player.prototype.update = function() {
    //Winner reset
    if (this.y < 10) {
        this.reset();
    }
};
//Render player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//HandleInput player
Player.prototype.handleInput = function(direction) {
    if (direction === 'left') {
        if (this.x > 0) {
            this.x = this.x - 100;
        }
    } else if (direction === 'right') {
        if (this.x < 400) {
            this.x = this.x + 100;
        }
    } else if (direction === 'up') {
        if (this.y > 0) {
            this.y = this.y - 80;
        }
    } else if (direction === 'down') {
        if (this.y < 380) {
            this.y = this.y + 80;
        }
    }
};
// Check for collision between enemy and player
const checkCollisions = function() {
    for (anEnemy of allEnemies) {
        if (player.y + 131 >= anEnemy.y + 90 && player.x + 25 <= anEnemy.x + 88 && player.y + 73 <= anEnemy.y + 135 && player.x + 76 >= anEnemy.x + 11) {
            player.x = 202.5;
            player.y = 383;
        }
    }
};
//Reset(restart) game
Object.prototype.reset = function() {
    player.x = 200;
    player.y = 400;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(0, 160, 20), new Enemy(404, 60, 255), new Enemy(204, 265, 150)];
const player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
