// Full-screen, centered background image of memory

class BackgroundImage {
  constructor(backgroundImage) {
    this.image = backgroundImage;
    this.x = width / 2;
    this.y = height / 2;
  }

  // Update all behaviours
  update() {
    // Display full-canvas background image
    this.display();
  }

  // Display picture
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }
}
