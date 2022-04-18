let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;
let n = 10; // 10 шариков

// конструктор для шариков
let Ball = function () {
  this.x = 100;
  this.y = 100;
  this.xSpeed = Math.floor(Math.random() * 10);
  this.ySpeed = Math.floor(Math.random() * 10);
  ctx.fillStyle = ctx.clearRect(0, 0, width, height);
};
// функция рисования шарика
let circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};

// рисование шарика заданным цветом
Ball.prototype.draw = function () {
  ctx.fillStyle = "blue";
  circle(this.x, this.y, 3, true);
};
// движение шарика
Ball.prototype.move = function () {
  this.x += this.xSpeed;
  this.y += this.ySpeed;
};

// проверка столкновения шарика и стен - меняем движение на противоположное
Ball.prototype.checkCollosion = function () {
  if (this.x < 0 || this.x > width) {
    this.xSpeed = -this.xSpeed;
  }

  if (this.y < 0 || this.y > height) {
    this.ySpeed = -this.ySpeed;
  }
};

// рисуем n шариков
let balls = [];
for (let i = 0; i < n; i++) {
  balls[i] = new Ball();
}

// функция для отрисовки и перемещения шариков
let go = function () {
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < 10; i++) {
    balls[i].draw();
    balls[i].move();
    balls[i].checkCollosion();
  }
  ctx.strokeRect(0, 0, width, height);
};

// Анимируем шарики
setInterval(go, 30);
