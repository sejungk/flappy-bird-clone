const obstaclesArray = [];

class Obstacle {
  constructor() {
    this.top = (Math.random() * canvas.height / 3) + 20;
    this.bottom = (Math.random() * canvas.height / 3) + 20;
    this.x = canvas.clientWidth;
    this.width = 20;
    this.color = 'hsl(' + hue + ', 100%, 50%)';
    this.counted = false;
  }

  draw() {
    ctx.fillStyle = this.color;
    // draw top obstacles
    // x and y of top left corner we want to draw, width, height
    ctx.fillRect(this.x, 0, this.width, this.top);
    // draw bottom obstacles
    // x coord, y coord(bottom of canvas - obstacle height), height of bottom obstacle
    ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
  }

  update() {
    // move obstacles to left because our game is scrolling to the right
    this.x -= gameSpeed;
    // increase score each time we move past obstacle
    if (this.counted === false && this.x < bird.x) {
      score++;
      this.counted = true; // change to true bc this obstacle has been counted
    }
    this.draw();
  }
}

// create new obstacles every 50 frames of game
function handleObstacles() {
  if (frame % 150 === 0) {
    obstaclesArray.unshift(new Obstacle);
  }

  // cycle through every item in obstacles array and call update on item which calls draw
  for (let i = 0; i < obstaclesArray.length; i++) {
    obstaclesArray[i].update();
  }

  // prevent obstacles array from growing endlessly by removing last item if length > 20
  if (obstaclesArray.length > 20) {
    obstaclesArray.pop(obstaclesArray[0]);
  }
};
