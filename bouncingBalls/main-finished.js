// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const paraLicznik = document.querySelector('.licznik');
const paraKomunikat = document.querySelector('.komunikat');
paraKomunikat.style.visibility = "hidden";
// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// define Ball constructor

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}


function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);

Object.defineProperty(Ball.prototype, 'constructor',
    {
        value: Shape,
        enumerable: false,
        writable: true
    });

function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);
    this.color = 'white';
    this.size = 10;

}

EvilCircle.prototype = Object.create(Shape.prototype);

Object.defineProperty(EvilCircle.prototype, 'constructor',
    {
        value: Shape,
        enumerable: false,
        writable: true
    })
// define ball draw method

Ball.prototype.draw = function () {
    if (this.exists){
        ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    }
};

EvilCircle.prototype.draw = function () {
    if (this.exists) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 4;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }
}


// define ball update method

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -this.velX;
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -this.velX;
    }

    if ((this.y + this.size) >= height) {
        this.velY = -this.velY;
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
};

EvilCircle.prototype.setControls = function () {
    let _this = this;
    window.onkeydown = function (ev) {
        if (ev.key === 'a') {
            _this.x -= _this.velX;
        } else if (ev.key === 'd') {
            _this.x += _this.velX;
        } else if (ev.key === 'w') {
            _this.y -= _this.velY;
        } else if (ev.key === 's') {
            _this.y += _this.velY;
        }
    }
}

EvilCircle.prototype.checkBounds = function () {
    if ((this.x + this.size) >= width) {
        this.x -= this.size;
    }

    if ((this.y + this.size) >= height) {
        this.y = this.y - 10;
    }

    if ((this.x + this.size) <= 0) {
        this.x = this.x + 10;
    }

    if ((this.y - this.size) <= 0) {
        this.y = this.y + 10;
    }

}

EvilCircle.prototype.collisionDetect = function () {
    for (let k = 0; k < balls.length; k++) {
        if (balls[k].exists === true) {
            const dx = this.x - balls[k].x;
            const dy = this.y - balls[k].y;
            const distance = Math.sqrt((dx * dx) + (dy * dy));

            if (distance < this.size + balls[k].size) {
                balls[k].exists = false;
            }

        }
    }
}


// define ball collision detection

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if ((distance < this.size + balls[j].size) &&
                (balls[j].exists)) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
};

// define array to store balls and populate it

let balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the adge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        exist = true,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );
    balls.push(ball);
}

// define loop that keeps drawing the scene constantly


let evCirc = new EvilCircle(random(0, width), random(0, height), true);
evCirc.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);

    evCirc.draw();
    evCirc.checkBounds();
    evCirc.collisionDetect();
    let pozostale = 25;

    for (let i = 0; i < balls.length; i++) {

        if (balls[i].exists === true) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        } else {
            pozostale--;
        }
    }
    paraLicznik.textContent = `Pozostało jeszcze ${pozostale} piłeczek `;
    paraKomunikat.textContent = 'Koniec gry :P ';
    if (pozostale === 0){
        evCirc.exists = false;
        paraLicznik.style.visibility = "hidden";
        paraKomunikat.style.visibility = "visible";
    }
    requestAnimationFrame(loop);
}

loop();
