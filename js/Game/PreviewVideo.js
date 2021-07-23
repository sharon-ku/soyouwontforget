// Preview of video memory in game state

class PreviewVideo {
  constructor(x, y, memoryName) {
    this.x = x;
    this.y = y;
    this.width = width / 2.3;
    this.height = height / 2.3;
    this.memory = memoryName;
    this.fill = {
      r: 0,
      g: 0,
      b: 0,
    };
  }

  update() {
    this.display();
  }

  // Display rectangle
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  // When mouse pressed on preview video, play the memory
  mousePressed() {
    if (this.mouseOverlapsRectangle(mouse)) {
      this.playMemory();
    }
  }

  // Play the memory
  playMemory() {
    console.log(`playing a memory`);
  }

  // SHOULD MAKE A PARENT FOR OVERLAP METHOD
  // Returns true if mouse overlaps preview video
  mouseOverlapsRectangle(mouse) {
    if (
      mouse.x < this.x + this.width / 2 &&
      mouse.x > this.x - this.width / 2 &&
      mouse.y < this.y + this.height / 2 &&
      mouse.y > this.y - this.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
