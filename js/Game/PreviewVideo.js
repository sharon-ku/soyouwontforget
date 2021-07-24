// Preview of video memory in game state

class PreviewVideo {
  constructor(x, y, memoryName) {
    // Positions of rectangle for preview video
    this.x = x;
    this.y = y;
    // Size of rectangle
    this.width = width / 2.3;
    this.height = height / 2.3;

    this.memoryFileName = memoryName.memoryFileName;
    this.fill = {
      r: 0,
      g: 0,
      b: 0,
    };

    // Title shown under preview video
    this.title = {
      name: memoryName.previewVideoTitle,
      fill: {
        r: 255,
        g: 0,
        b: 0,
      },
      size: 20,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: this.height + 20,
    };
  }

  update() {
    this.display();
  }

  // Display preview video
  display() {
    // Display rectangle
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();

    // Display text containing memory name
    push();
    fill(this.title.fill.r, this.title.fill.g, this.title.fill.b);
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(this.title.size);
    text(
      this.title.name,
      this.x + this.title.xOffset,
      this.y + this.title.yOffset,
      this.width,
      this.height
    );
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
    memoryPlaying = this.memoryFileName;
    console.log(`playing a memory, ${memoryPlaying}`);

    // USED FOR TESTS
    // memoryPlaying = `testMemory`;
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
