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
    this.rateOfPositionChange = 0.1;
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
    translate(this.x, this.y);
    scale(1.2, 1.5);
    image(this.image, 0, 0);
    pop();
  }

  // Move along vertical axis based on mouseY
  move(mouseY) {
    this.y += (mouseY - this.y) * this.rateOfPositionChange;

    // constrain movement
    this.y = constrain(this.y, height / 2 - 100, height / 2 + 100);
  }
}
