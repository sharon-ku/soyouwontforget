// Zai (brother in memories)

class Zai extends Character {
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
    // position
    this.x = x;
    this.y = y;
    // final position to charge to
    this.xFinal = width / 2;
    // velocity (only in final charge to ball)
    this.vxFinal = -2;
    this.axFinal = -2;
    // size
    this.width = undefined;
    this.height = undefined;
    // associated memory
    // this.memory = memoryName;
  }

  // Update all behaviours
  update() {
    // Display character
    this.display();
  }

  // Charge to ball in last part of memory
  chargeToBall() {
    if (this.x > this.xFinal) {
      this.x += this.vxFinal + this.axFinal;
    }
  }
}
