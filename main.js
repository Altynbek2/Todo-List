const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Создание переменной для картинок

const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeUp = new Image();
const pipeBottom = new Image();

//Картинки

bird.src = "./img/bird.png";
bg.src = "./img/bg.png";
fg.src = "./img/fg.png";
pipeUp.src = "./img/pipeUp.png";
pipeBottom.src = "./img/pipeBottom.png";

//Создание труб
const pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0,
};

//Позиция птицы
let xPos = 10;
let yPos = 150;
let grav = 1.5;

let gap = 100;
let score = 0;

const moveUp = () => {
  yPos -= 38;
};

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 32) {
    moveUp();
  }
});

const draw = () => {
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(fg, 0, canvas.height - fg.height);
  ctx.drawImage(bird, xPos, yPos);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 80) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height,
      });
    }

    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeUp.width &&
        (yPos <= pipe[i].y + pipeUp.height ||
          yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) ||
      yPos + bird.height >= canvas.height - fg.height
    ) {
      location.reload(); //перезагрузка страницы
    }

    if (pipe[i].x == 5) {
      score++;
    }
  }

  yPos += grav;

  ctx.fillText("Score: " + score, 10, canvas.height - 20);
  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";

  requestAnimationFrame(draw);
};

pipeBottom.onload = draw;
