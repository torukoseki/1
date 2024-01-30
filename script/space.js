let board;
let boardWidth = 1000;
let boardHeight = 600;
let context;

let ufoWidth = 100;
let ufoHeight = 75;
let ufoX = boardWidth / 2 - ufoWidth / 2;
let ufoY = 40;
let speed = 15;

let ufo = {
  x: ufoX,
  y: ufoY,
  width: ufoWidth,
  height: ufoHeight,
};

let seaImg;
let seaLevel = 400;
let ufoImg;

let birdArray = [];
let birdWidth = 75;
let birdHeight = 50;
let birdX = boardWidth / 6;
let birdY = seaLevel - birdHeight * 2.5;

let birdImg;
let birdImgReverse;

let birdRows = 2;
let birdColumns = 3;
let birdCount = 0; // bird hit
let birdVelocityX = 1; // bird speed

let fishArray = [];
let fishWidth = 75;
let fishHeight = 50;
let fishX = boardWidth * 0.6;
let fishY = seaLevel + fishHeight * 0.5;
let fishImg;
let fishImgReverse;

let fishRows = 2;
let fishColumns = 3;
let fishCount = 0; // fish hit
let fishVelocityX = 1; // fish speed

let bulletArray = [];
let bulletSpeed = 10;

let score = 0;
let isGameOver = false;

$(document).ready(function () {
  board = $("#board")[0];
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  ufoImg = new Image();
  ufoImg.src = "./img/ufo.png";
  ufoImg.onload = function () {
    context.drawImage(ufoImg, ufo.x, ufo.y, ufo.width, ufo.height);
  };

  birdImg = new Image();
  birdImg.src = "./img/bird.png";
  birdImgReverse = new Image();
  birdImgReverse.src = "./img/bird-reverse.png";

  createBirds();

  fishImg = new Image();
  fishImg.src = "./img/fish.png";
  fishImgReverse = new Image();
  fishImgReverse.src = "./img/fish-reverse.png";

  createFishes();

  seaImg = new Image();
  seaImg.src = "./img/seaBG.png";

  requestAnimationFrame(update);
  $(document).keydown(moveUfo);
  $(document).keyup(hit);
});

function update() {
  requestAnimationFrame(update);

  context.clearRect(0, 0, board.width, board.height);
  //background
  context.drawImage(seaImg, 0, 0, boardWidth, boardHeight);

  //ufo
  context.drawImage(ufoImg, ufo.x, ufo.y, ufo.width, ufo.height);

  //bird
  for (let i = 0; i < birdArray.length; i++) {
    let bird = birdArray[i];
    if (bird.isAlive) {
      bird.x -= birdVelocityX;

      if (bird.x + bird.width >= board.width || bird.x <= 0) {
        birdVelocityX *= -1;
      }
      if (birdVelocityX < 0)
        context.drawImage(
          birdImgReverse,
          bird.x,
          bird.y,
          bird.width,
          bird.height
        );
      else
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
  }

  while (
    bulletArray.length > 0 &&
    (bulletArray[0].used || bulletArray[0].y < 0)
  ) {
    bulletArray.shift(); //removes the first element of the array
  }

  //fishes
  for (let i = 0; i < fishArray.length; i++) {
    let fish = fishArray[i];
    if (fish.isAlive) {
      fish.x -= fishVelocityX;

      if (fish.x + fish.width >= board.width || fish.x <= 0) {
        fishVelocityX *= -1;
      }
      if (fishVelocityX < 0)
        context.drawImage(
          fishImgReverse,
          fish.x,
          fish.y,
          fish.width,
          fish.height
        );
      else context.drawImage(fishImg, fish.x, fish.y, fish.width, fish.height);
    }
  }
  //bullet
  for (let i = 0; i < bulletArray.length; i++) {
    let bullet = bulletArray[i];
    bullet.y += bulletSpeed;
    context.fillStyle = "#7CFC00";
    context.fillRect(
      bullet.x,
      bullet.y,
      bullet.width,
      bullet.height * 5
    );

    // bullet hit fishes
    for (let j = 0; j < fishArray.length; j++) {
      let fish = fishArray[j];
      if (!bullet.used && fish.isAlive && detectCollision(bullet, fish)) {
        bullet.used = true;
        fish.isAlive = false;
        fishCount--;
        score += 150;
      }
    }
    //bullet hit birds
    for (let j = 0; j < birdArray.length; j++) {
      let bird = birdArray[j];
      if (!bullet.used && bird.isAlive && detectCollision(bullet, bird)) {
        bullet.used = true;
        bird.isAlive = false;
        birdCount--;
        score += 100;
      }
    }
  }
  while (
    bulletArray.length > 0 &&
    (bulletArray[0].used || bulletArray[0].y < 0)
  ) {
    bulletArray.shift(); //removes the first element of the array
  }

  //scoreboard
  context.fillStyle = "#FFF";
  context.font = "16px Courier";
  context.fillText(score + " pts", boardWidth - 100, 20);
  context.fillText("birds 100 pts", 15, 20);
  context.fillText("fishes 150 pts", 14, 40);
  context.fillText("press <spacebar> to fire", 14, 60);
  context.fillText("arrow keys to move", 14, 80);
  if (score == 1500) {
    context.fillStyle = "#000";
    context.font = "64px Courier";
    context.fillText("YOU WIN!", boardWidth / 2 - 140, boardHeight / 2);
    isGameOver = true;
  }
}

function moveUfo(e) {
  if (e.code == "ArrowLeft" && ufo.x - speed >= 0 && !isGameOver) {
    ufo.x -= speed;
  } else if (
    e.code == "ArrowRight" &&
    ufo.x + speed + ufoWidth <= boardWidth &&
    !isGameOver
  ) {
    ufo.x += speed;
  }
}

function createBirds() {
  for (let c = 0; c < birdColumns; c++) {
    for (let r = 0; r < birdRows; r++) {
      let bird = {
        img: birdImg,
        x: birdX + c * birdWidth,
        y: birdY + r * birdHeight,
        width: birdWidth,
        height: birdHeight,
        isAlive: true,
      };
      birdArray.push(bird);
    }
  }
  birdCount = birdArray.length;
}

function createFishes() {
  for (let c = 0; c < fishColumns; c++) {
    for (let r = 0; r < fishRows; r++) {
      let fish = {
        img: fishImg,
        x: fishX + c * fishWidth,
        y: fishY + r * fishHeight,
        width: fishWidth,
        height: fishHeight,
        isAlive: true,
      };
      fishArray.push(fish);
    }
  }
  fishCount = fishArray.length;
}

function hit(e) {
  if (e.code == "Space" && !isGameOver) {
    //hit
    let bullet = {
      x: ufo.x + (ufoWidth * 15) / 32,
      y: ufo.y + ufoHeight * 0.6,
      width: 4,
      height: 16,
      used: false,
    };
    bulletArray.push(bullet);
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

$(document).ready(function () {
  board = $("#board")[0];
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  ufoImg = new Image();
  ufoImg.src = "./img/ufo.png";
  ufoImg.onload = function () {
    context.drawImage(ufoImg, ufo.x, ufo.y, ufo.width, ufo.height);
  };

  birdImg = new Image();
  birdImg.src = "./img/bird.png";
  birdImgReverse = new Image();
  birdImgReverse.src = "./img/bird-reverse.png";

  createBirds();

  fishImg = new Image();
  fishImg.src = "./img/fish.png";
  fishImgReverse = new Image();
  fishImgReverse.src = "./img/fish-reverse.png";

  createFishes();

  seaImg = new Image();
  seaImg.src = "./img/seaBG.png";

  requestAnimationFrame(update);
  document.addEventListener("keydown", moveUfo);
  document.addEventListener("keyup", hit);
});
