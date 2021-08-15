// A character in the memory: parent for all characters

class Character {
  constructor() {
    // images array
    this.images = undefined;
    // current index of images array
    this.currentIndex = 0;
    // scale (direction facing)
    this.scale = {
      x: undefined,
      y: undefined,
    };
    // position
    this.x = undefined;
    this.y = undefined;
    // size
    this.width = undefined;
    this.height = undefined;
    // associated memory
    // this.memory = memoryName;

    // number of soccer kicks
    this.numSoccerKicks = 0;
  }

  // Update all behaviours
  update() {
    // Display character
    this.display();
  }

  // Display image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.x, this.scale.y);
    image(this.images[this.currentIndex], 0, 0);
    pop();
  }
}
