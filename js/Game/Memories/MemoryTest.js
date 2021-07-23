// Memory playing in game state

class MemoryTest {
  constructor(memoryName) {
    this.x = width / 2;
    this.y = height / 2;
    this.width = width;
    this.height = height;
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
    // if (this.mouseOverlapsRectangle(mouse)) {
    //   this.playMemory();
    // }
  }

  // Play the memory
  play() {
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
