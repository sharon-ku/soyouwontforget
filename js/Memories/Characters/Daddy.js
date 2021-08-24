// Daddy (dad in memories)

class Daddy extends Character {
  constructor({ images, x, y, currentIndex }) {
    super();
    // images array
    this.images = images;
    // current index of images array
    this.currentIndex = currentIndex;
    // scale (direction facing)
    this.scale = {
      x: 1,
      y: 1,
    };
    // position
    this.x = x;
    this.y = y;
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
}
