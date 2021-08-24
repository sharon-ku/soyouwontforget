// Lu (main character in memories)

class Lu extends Character {
  constructor({ images, x, y, currentIndex }) {
    super();
    // images array
    this.images = images;
    // current index of images array
    this.currentIndex = currentIndex;
    // scale (direction facing)
    this.scale = {
      x: -1,
      y: 1,
    };

    // Keep track of when Lu is done moving into position in intro
    this.doneMovingIntoPosition = false;

    // position
    this.x = x;
    this.y = y;
    // final position to move to in intro
    this.xFinal = width - 100;
    // buffer from witch Lu will stop moving
    this.buffer = 10;

    // velocity
    this.introSpeed = -1;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;

    // size
    this.width = 114;
    this.height = undefined;
    // associated memory
    // this.memory = memoryName;
  }

  // Update all behaviours
  update() {
    // Display character
    this.display();

    // Follow mouse
    this.followMouse();
  }

  // Move into the position in intro
  moveIntoPosition() {
    if (this.x > this.xFinal) {
      this.x += this.vx;
      this.vx = this.introSpeed;
    } else {
      this.doneMovingIntoPosition = true;
    }
  }

  // Follow mouse
  followMouse() {
    // Calculating distance from Lu to mouse
    let distX = this.x - mouse.x;
    let distY = this.y - mouse.y;

    // Change velocity based on distance to mouse
    if (distX < -this.buffer) {
      this.vx = this.speed;
    } else if (distX > this.buffer) {
      this.vx = -this.speed;
    } else {
      this.vx = 0;
    }

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Setting the fish's direction (facing left or facing right)
    if (this.vx > 0) {
      this.scale.x = 1; // face right
    } else if (this.vx < 0 || this.vx === 0) {
      this.scale.x = -1; // face left
    }

    // Constrain movement of Lu!
    this.x = constrain(this.x, width / 2, width);
  }
}
