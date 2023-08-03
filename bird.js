class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0; // determine vertical speed of bird, how fast it falls and moves up
    this.width = 20;
    this.height = 20;
    this.weight = 1;
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
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  flap() {
    this.vy -= 2;
  }
}

const bird = new Bird();
