// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
// width and height of the canvas element (represented by the canvas.width and canvas.
// height properties) to equal the width and height of the
// browser viewport (the area that the webpage appears on
// — this can be gotten from the Window.innerWidth and Window.innerHeight properties).

// !! we are chaining multiple assignments together,
// to get the variables all set quicker — this is perfectly OK. !!

// function to generate random number
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// constructor
function Ball(x,y, velX, velY,  color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function () {
    ctx.beginPath(); //state that we want to draw a shape
    ctx.fillStyle = this.color; //to define what color we want the shape to be — we set it to our ball's color property.
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI); //The last two parameters specify the start and end number of degrees around the circle that the arc is drawn between.
    ctx.fill(); //finish drawing the path we started with beginPath(), and fill the area it takes up with the color we specified earlier in fillStyle."
}

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
        // the ball is going off the right edge).
    }
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
        // (the ball is going off the left edge).
    }

    if ((this.y + this.size) >= height){
        this.velY = -(this.velY);
        //the ball is going off the bottom edge).
    }

    if ((this.y - this.size) <= 0){
        this.velY = -(this.velY);
        //  (the ball is going off the top edge).
    }
    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collisionDetect = function () {
    for (let j=0; j<balls.length; j++){
        if(!(this === balls[j])){ // patrzymy czy sprawdzana kulka to nie jest ta sama (nie sprawdzamy danej kulki samej ze sobą
            const  dx = this.x - balls[j].x;
            const  dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size){
                // balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';

                balls[j].velX = -(balls[j].velX);
                balls[j].velY = -(balls[j].velY);

                this.velY = -(this.velY);
                this.velX = -(this.velY);
            }
        }
    }
}

// First, we need to create somewhere to store all our balls and then populate it

let balls = [];

while (balls.length < 30) {
    let  size = random(5, 25);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0+ size, width - size),
        random(0+size, height - size),
        random(-7,7),
        random(-7, 7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //Sets the canvas fill color to semi-transparent black,
   ctx.fillRect(0,0, width, height); // draws a rectangle of the color across the whole width and height of the canvas,

    for (let i=0; i<balls.length; i++){
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

   requestAnimationFrame(loop);
}