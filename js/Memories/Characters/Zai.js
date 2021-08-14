// Zai (brother in memories)

class Zai extends Character {
  constructor({ images, x, y, currentIndex }) {
    super();
    // images array
    this.images = images;
    // current index of images array
    this.currentIndex = currentIndex;
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
