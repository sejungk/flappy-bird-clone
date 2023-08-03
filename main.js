const canvas = document.getElementById('canvas1');

// allows up to use built in canvas methods
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
// used by math.sin method to make our bird move slightly up and down when idle
let angle = 0;
// cycle through colors
let hue = 0;
// keep track of frame count of animation loop
// allows us to add periodic triggers: new enemies, powerups, set intervals for pipes appearance
let frame = 0;
let score = 0;
// used to move obstacle, particles, background at the same screen/parallax effect
let gameSpeed = 2;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // represents player
  // ctx.fillRect(10, canvas.height - 90, 50, 50);
  bird.update();
  bird.draw();
  handleParticles()
  requestAnimationFrame(animate);
  angle += 0.12; //higher value makes the wobble faster
  hue++;
}

animate();

window.addEventListener('keydown', function(e) {
  if (e.code === 'Space') spacePressed = true;

})

window.addEventListener('keyup', function(e) {
  if (e.code === 'Space') spacePressed = false;
})
