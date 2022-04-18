const canvas = document.getElementById("canvas");
let n = 10; // 10 шариков

// класс для шариков
class Ball {
  constructor(canvas, x = 100, y = 100) {
    this.context = canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.xSpeed = Math.floor(Math.random() * 10);
    this.ySpeed = Math.floor(Math.random() * 10);
    this.width = canvas.width;
    this.height = canvas.height;
    this.colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];
    this.color = this.getColor();
  }

  circle(x, y, radius, fillCircle) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    this.context.fill();
  }

  draw() {
    this.context.fillStyle = this.color;
    this.circle(this.x, this.y, 5, true);
  }
  // движение шарика
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  checkCollosion() {
    if (this.x < 0 || this.x > this.width) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.y < 0 || this.y > this.height) {
      this.ySpeed = -this.ySpeed;
    }
  }

  getColor() {
    let randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
}

class BallsGame {
  constructor(balls, canvas) {
    this.context = canvas.getContext("2d");
    this.balls = balls;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawBorder() {
    this.context.strokeStyle = "blue";
    this.context.lineWidht = 3;
    this.context.strokeRect(0, 0, this.width, this.height);
  }

  go() {
    this.clear();
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].draw();
      this.balls[i].move();
      this.balls[i].checkCollosion();
    }
    this.drawBorder();
  }

  start() {
    setInterval(this.go.bind(this), 30);
  }
}

let balls = [];
const ballsGame = new BallsGame(balls, canvas);
function setAmount() {
  balls.length = 0;
  ballsGame.clear();
  n = Number(document.getElementById("amount").value);

  for (let i = 0; i < n; i++) {
    balls[i] = new Ball(canvas);
  }

  ballsGame.start();
}
