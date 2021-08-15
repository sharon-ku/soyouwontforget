// Card decorations in Father's Day memory

/*** ATTRIBUTION
Code for: Click and Drag an object
by Daniel Shiffman <http://www.shiffman.net>
Link: https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88
***/

class CardDecoration {
  constructor({ image, x, y }) {
    // image
    this.image = image;
    // position
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;

    // dragging by mouse
    this.dragging = false;
  }

  // Update all behaviour
  update() {
    // Display
    this.display();
  }

  // Display image
  display() {
    push();
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }

    imageMode(CENTER);
    image(this.image, this.x, this.y);
    pop();
  }

  mousePressed(mouseX, mouseY) {
    if (
      mouseX > this.x - this.image.width &&
      mouseX < this.x + this.image.width &&
      mouseY > this.y - this.image.height &&
      mouseY < this.y + this.image.height
    ) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }
}
