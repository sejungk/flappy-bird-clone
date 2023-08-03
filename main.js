const canvas = document.getElementById('canvas1');

// allows up to use built in canvas methods
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0; // used by math.sin method to make our bird move slightly up and down when idle
let hue = 0; // cycle through colors
let frame = 0; // keep track of frame count of animation loop, add periodic triggers: new enemies, powerups,
let score = 0;
let gameSpeed = 2; // move obstacle, particles, background at the same screen/parallax effect

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = 'background.png';
const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height
}

function handleBackground() {
  if (BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
  else BG.x1 -= gameSpeed;
  if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
  else (BG.x2 -= gameSpeed);
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // represents player
  // ctx.fillRect(10, canvas.height - 90, 50, 50);
  handleBackground();
  handleObstacles(); // draw obstacles before creating player so they appear behind
  handleParticles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradient;
  ctx.font = '90px "Patrick Hand SC"';
  ctx.strokeText(score, 450, 70);
  ctx.fillText(score, 450, 70);
  handleCollisions();
  // freeze animation when player collides with obstacle
  if (handleCollisions()) return;
  requestAnimationFrame(animate);
  angle += 0.12; //higher value makes the wobble faster
  hue++;
  frame++; // increase frame count by 1 by every animation loop cycle
}

animate();

window.addEventListener('keydown', function(e) {
  if (e.code === 'Space') spacePressed = true;
})

window.addEventListener('keyup', function(e) {
  if (e.code === 'Space') spacePressed = false;
  bird.frameX = 0;
})

const bang = new Image();
bang.src = 'bang.png';
function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
      (bird.y > canvas.height - obstaclesArray[i].bottom &&
      bird.y + bird.height < canvas.height))) {
        //collision detected
        ctx.drawImage(bang, bird.x, bird.y, 50, 50);
        // create game over message
        ctx.font = '25px "Patrick Hand SC"';
        ctx.fillStyle = 'black';
        ctx.fillText('game over, you loser.', 160, canvas.height/2 - 10);
        ctx.fillText('score:' + score, 160, canvas.height/2 + 30);
        return true;
      }
  }
}

