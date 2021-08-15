// Preview of video memory in game state
// Attribution: Pippin Barr helped me with the cursor hovering code

class PreviewVideo extends OverlappingRectangle {
  constructor({ x, y, section, instructions, playIconImage, memoryName }) {
    super(x, y);
    // True if mouse hovering over video rectangle; sets cursor type
    this.hovered = undefined;

    // Positions of rectangle for preview video
    this.x = x;
    this.y = y;
    // Size of rectangle
    this.width = width / 2.5 - 40;
    this.height = height / 2.5;
    // Rounded corner
    this.cornerRadius = 10;
    // Color of rectangle: light blue
    this.fill = {
      r: 142,
      g: 207,
      b: 201,
    };
    // Stroke properties of rectangle
    this.stroke = {
      weight: 5,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
    };

    // Play icon
    this.playIcon = {
      image: playIconImage,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: 0,
      // used in tint function
      grayValue: 255,
      // opacity
      opacity: {
        current: 120,
        min: 120,
        max: 255,
      },
    };

    // Section that this preview video fits under
    this.section = {
      name: section,
      fill: {
        // r: 213,
        // g: 73,
        // b: 97,
        r: 255,
        g: 255,
        b: 255,
      },
      size: 20,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: -140,
      // rectangle behind the section text
      rectangle: {
        fill: {
          r: 213,
          g: 73,
          b: 97,
        },
        width: 255,
        height: 35,
        // position offset from rectangle's position
        xOffset: 0,
        yOffset: -273,
      },
    };

    // Instructions accompanying the video
    this.instructions = {
      name: instructions,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
      size: 28,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: -90,
    };

    // Memory to be played when video clicked
    this.memoryFileName = memoryName.memoryFileName;

    // Title shown under preview video
    this.title = {
      name: memoryName.previewVideoTitle,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
      size: 25,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: 50,
    };
  }

  // Update all behaviour
  update(mouse) {
    // Display preview video
    this.display();

    // When hovering on preview video, change the play icon's opacity and cursor type
    this.hoverOnPreviewVideo(mouse);
  }

  // Display preview video
  display() {
    // Display rectangle for preview video
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    strokeWeight(this.stroke.weight);
    stroke(this.stroke.fill.r, this.stroke.fill.g, this.stroke.fill.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    pop();

    // Display play icon image and update its opacity based on hover
    push();
    tint(this.playIcon.grayValue, this.playIcon.opacity.current);
    imageMode(CENTER);
    image(
      this.playIcon.image,
      this.x + this.playIcon.xOffset,
      this.y + this.playIcon.yOffset
    );
    pop();

    // Display rectangle behind section text
    push();
    fill(
      this.section.rectangle.fill.r,
      this.section.rectangle.fill.g,
      this.section.rectangle.fill.b
    );
    // strokeWeight(this.stroke.weight);
    // stroke(this.stroke.fill.r, this.stroke.fill.g, this.stroke.fill.b);
    rectMode(CENTER);
    noStroke();
    rect(
      this.x + this.section.rectangle.xOffset,
      this.y + this.section.rectangle.yOffset,
      this.section.rectangle.width,
      this.section.rectangle.height
    );
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
    textFont(fontStyleBold);
    text(
      string.name,
      this.x + string.xOffset,
      this.y + string.yOffset,
      this.width,
      this.height
    );
    pop();
  }

  // When hovering on preview video, change the play icon's opacity and cursor type
  hoverOnPreviewVideo(mouse) {
    if (this.mouseOverlapsRectangle(mouse)) {
      // Increase opacity of play icon
      this.playIcon.opacity.current = this.playIcon.opacity.max;
      // When hovered is true, set cursor type to pointer
      this.hovered = true;
    } else {
      // Diminish opacity of play icon
      this.playIcon.opacity.current = this.playIcon.opacity.min;
      // Set cursor to default
      this.hovered = false;
    }
  }

  // When mouse pressed on preview video, play the memory
  mousePressed(mouse) {
    if (this.mouseOverlapsRectangle(mouse)) {
      this.playMemory();
    }
  }

  // Play the memory
  playMemory() {
    state = `memory`;
    // CORRECT CODE: uncomment when done tests
    // memoryPlaying = this.memoryFileName;
    console.log(`playing a memory, ${memoryPlaying}`);

    // USED FOR TESTS
    // let testMemoriesList = [`testMemory`, `memoryFathersDay`];
    // memoryPlaying = random(testMemoriesList);
    memoryPlaying = `memoryFathersDay`;
  }
}
