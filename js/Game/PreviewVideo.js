// Preview of video memory in game state

class PreviewVideo {
  constructor(x, y, section, instructions, memoryName) {
    // Positions of rectangle for preview video
    this.x = x;
    this.y = y;
    // Size of rectangle
    this.width = width / 2.3;
    this.height = height / 2.3;
    // Color of rectangle
    this.fill = {
      r: 0,
      g: 0,
      b: 0,
    };

    // Section that this preview video fits under
    this.section = {
      name: section,
      fill: {
        r: 0,
        g: 0,
        b: 0,
      },
      size: 18,
      style: BOLD,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: -120,
    };

    // Instructions accompanying the video
    this.instructions = {
      name: instructions,
      fill: {
        r: 0,
        g: 0,
        b: 0,
      },
      size: 25,
      style: NORMAL,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: -70,
    };

    // Memory to be played when video clicked
    this.memoryFileName = memoryName.memoryFileName;

    // Title shown under preview video
    this.title = {
      name: memoryName.previewVideoTitle,
      fill: {
        r: 255,
        g: 0,
        b: 0,
      },
      size: 20,
      style: BOLD,
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
    // Display text containing section name

    // Display rectangle
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();

    // Display section and instructions
    this.displayText(this.section);
    this.displayText(this.instructions);

    // Display text containing memory name
    this.displayText(this.title);
  }

  // Display text
  displayText(string) {
    push();
    fill(string.fill.r, string.fill.g, string.fill.b);
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(string.size);
    textStyle(string.style);
    text(
      string.name,
      this.x + string.xOffset,
      this.y + string.yOffset,
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
