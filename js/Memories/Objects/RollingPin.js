// Rolling pin in Making Bao memory

/*** ATTRIBUTION
Code for: Click and Drag an object
by Daniel Shiffman <http://www.shiffman.net>
Link: https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88
***/

class RollingPin {
  constructor({ image, x, y }) {
    // image
    this.image = image;
    // position
    this.x = x;
    this.y = y;
  }

  // Update all behaviour
  update(mouseY) {
    // Display
    this.display();

    // Move + constrain movement
    this.move(mouseY);
  }

  // Display image
  display() {
    push();
    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }

  // Move along vertical axis based on mouseY
  move(mouseY) {
    this.y = mouseY;

    // constrain movement
    this.y = constrain(this.y, height / 2 - 100, height / 2 + 100);
  }

  mousePressed(mouseX, mouseY) {
    // if (
    //   mouseX > this.x - this.image.width / 2 &&
    //   mouseX < this.x + this.image.width / 2 &&
    //   mouseY > this.y - this.image.height / 2 &&
    //   mouseY < this.y + this.image.height / 2
    // ) {
    //
    // }
  }
}
