// A character in the memory: parent for all characters

class Character {
  constructor() {
    // images array
    this.images = undefined;
    // current index of images array
    this.currentIndex = 0;
    // position
    this.x = undefined;
    this.y = undefined;
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

  // Display image
  display() {
    push();
    imageMode(CENTER);
    image(this.images[this.currentIndex], this.x, this.y);
    pop();
  }
}
