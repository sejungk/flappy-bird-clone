const octopusSprite = new Image();
octopusSprite.src = 'octopus.png';

class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0; // determine vertical speed of bird, how fast it falls and moves up
    this.originalWidth = 48;
    this.originalHeight = 48;
    this.width = this.originalWidth / 1.5;
    this.height = this.originalHeight / 1.5;
    this.weight = 1;
    this.frameX = 0;
  }

  // calc pos and speed for each frame
  update() {
    let curve = Math.sin(angle) * 20;
    // prevent it from flying out of frame at the top
    if (this.y > canvas.height - (this.height * 3) + curve) {
      this.y = canvas.height - (this.height * 3) + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }

    // prevent it from falling out of frame at the bottom
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }
    if (spacePressed === true && this.y > this.height * 3) this.flap();
  }

  draw() {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.originalWidth, this.height); //hit box
    ctx.drawImage(octopusSprite, this.frameX * this.originalWidth, 0, this.originalWidth, this.originalHeight, this.x - 5, this.y - 10, this.width * 1.7, this.height * 1.7);
  }

  flap() {
    this.vy -= 2;
    if (this.frameX >= 3)this.frameX = 0;
    else if (frame % 3.5 === 0) this.frameX++;
  }
}

const bird = new Bird();
