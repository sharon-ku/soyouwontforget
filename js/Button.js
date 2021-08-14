// Button in game state: Delete and Keep

class Button extends OverlappingRectangle {
  constructor({ x, y, memoryName }) {
    super(x, y);

    // Positions of rectangle for preview video
    this.x = x;
    this.y = y;
    // Size of rectangle
    this.width = 180;
    this.height = 80;
    // Rounded corner
    this.cornerRadius = 10;
    // Color of rectangle
    this.fill = {
      r: 0,
      g: 250,
      b: 0,
    };
    // Stroke properties of rectangle
    this.stroke = {
      weight: 3,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
    };

    // Memory to be played when video clicked
    // this.memoryFileName = memoryName.memoryFileName;

    // Title shown under preview video
    this.title = {
      // name: memoryName.previewVideoTitle,
      name: undefined,
      fill: {
        r: undefined,
        g: undefined,
        b: undefined,
      },
      size: undefined,
      // position offset from rectangle's position
      xOffset: undefined,
      yOffset: undefined,
    };
  }

  update(mouse) {
    this.display();

    // // When hovering on preview video, change the play icon's opacity and cursor type
    // this.hoverOnPreviewVideo(mouse);
  }

  // Display preview video
  display() {
    // Display rectangle
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    strokeWeight(this.stroke.weight);
    stroke(this.stroke.fill.r, this.stroke.fill.g, this.stroke.fill.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    pop();

    // Display text containing memory name
    this.displayText(this.title);
  }

  // Display text
  displayText(string) {
    push();
    fill(string.fill.r, string.fill.g, string.fill.b);
    textFont(fontStyleBold);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textSize(string.size);
    textStyle(string.style);
    text(string.name, this.x + string.xOffset, this.y + string.yOffset);
    pop();
  }

  // // When hovering on preview video, change the play icon's opacity and cursor type
  // hoverOnPreviewVideo(mouse) {
  //   if (this.mouseOverlapsRectangle(mouse)) {
  //     // Increase opacity of play icon
  //     this.playIcon.opacity.current = this.playIcon.opacity.max;
  //     // Change cursor to pointer
  //     cursor(`pointer`);
  //   } else {
  //     // Diminish opacity of play icon
  //     this.playIcon.opacity.current = this.playIcon.opacity.min;
  //     // Change cursor to default
  //     cursor(`default`);
  //   }
  // }

  // // When mouse pressed on preview video, play the memory
  // mousePressed(mouse) {
  //   if (this.mouseOverlapsRectangle(mouse)) {
  //     this.playMemory();
  //   }
  // }
}
