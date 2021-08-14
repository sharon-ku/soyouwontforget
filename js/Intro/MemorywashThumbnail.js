// Memorywash thumbnail images in intro state

class MemorywashThumbnail {
  constructor(x, y, images) {
    // position
    this.x = x;
    this.y = y;

    // images info
    this.images = images;
    this.currentIndex = 0;
  }

  // Update all behaviour
  update() {
    // Display thumbnail images
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
