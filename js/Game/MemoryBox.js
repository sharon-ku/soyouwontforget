// Memory box in game state

class MemoryBox extends OverlappingRectangle {
  constructor({
    x,
    y,
    section,
    instructions,
    memoryCategory,
    playIconImage,
    memoryName,
  }) {
    super(x, y);
    // True if mouse hovering over video rectangle; sets cursor type
    this.hovered = undefined;

    // Positions of rectangle for preview video
    this.x = x;
    this.y = y;
    // Size of rectangle
    this.width = 290;
    this.height = 270;
    // Rounded corner
    this.cornerRadius = 0;
    // Color of rectangle
    this.fillCurrent = {
      r: 255,
      g: 255,
      b: 255,
    };
    // light grey
    this.fill = {
      r: 239,
      g: 239,
      b: 239,
    };
    // light blue
    this.fillHover = {
      r: 142,
      g: 207,
      b: 201,
    };
    // Stroke properties of rectangle
    this.stroke = {
      weight: 0,
      fill: {
        r: 0,
        g: 0,
        b: 0,
      },
    };

    // Timestamp box
    this.timestampBox = {
      xOffset: 0,
      yOffset: this.height / 2,
      width: 250,
      height: 50,
      cornerRadius: 50,
      // blue
      fill: {
        r: 73,
        g: 170,
        b: 200,
      },
    };

    // Text displaying time
    this.time = {
      name: `test`,
      fill: {
        r: 255,
        g: 255,
        b: 255,
      },
      size: 20,
      padding: 0,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: this.height / 2,
    };

    // Instructions accompanying the video
    this.instructions = {
      name: instructions,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
      size: 32,
      // position offset from rectangle's position
      x: width / 2,
      y: height / 2 - 150,
    };

    // this.memoryGroup = memoryGroup,
    this.memoryCategory = memoryCategory;
    // Memory to be played when video clicked
    // this.memoryFileName = memoryName.memoryFileName;
    this.memoryFileName = memoryName.description;

    // Title shown under preview video
    this.title = {
      name: memoryName.previewVideoTitle,
      fill: {
        r: 0,
        g: 0,
        b: 0,
      },
      size: 20,
      padding: 50,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: 50,
    };
  }

  // Update all behaviour
  update(mouse, memoryName) {
    // Display preview video
    this.display();

    // When hovering on preview video, change the play icon's opacity and cursor type
    this.hoverOnPreviewVideo(mouse);

    // Once player clicks on "Winner" button, update text to next memory
    this.memoryFileName = memoryName.memoryFileName;
    this.title.name = memoryName.previewVideoTitle;

    // Update memory description text
    if (this.memoryCategory === `happyMemory`) {
      this.title.name = memoryName.happyMemory.description;
      this.time.name = memoryName.happyMemory.time;
    } else {
      this.title.name = memoryName.sadMemory.description;
      this.time.name = memoryName.sadMemory.time;
    }
  }

  // Display preview video
  display() {
    // Display rectangle for preview video
    push();
    fill(this.fillCurrent.r, this.fillCurrent.g, this.fillCurrent.b);
    strokeWeight(this.stroke.weight);
    stroke(this.stroke.fill.r, this.stroke.fill.g, this.stroke.fill.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    pop();

    // Display section and instructions
    // this.displayText(this.section);
    push();
    fill(
      this.instructions.fill.r,
      this.instructions.fill.g,
      this.instructions.fill.b
    );
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(this.instructions.size);
    textFont(fontStyleBold);
    text(
      this.instructions.name,
      this.instructions.x,
      this.instructions.y,
      this.width,
      this.height
    );
    pop();

    // Display text containing memory name
    this.displayText(this.title);

    // Display timestamp box and time text
    this.displayTime();
  }

  // Display timestamp box and time text
  displayTime() {
    // Display timestamp box
    push();
    rectMode(CENTER);
    noStroke();
    fill(
      this.timestampBox.fill.r,
      this.timestampBox.fill.g,
      this.timestampBox.fill.b
    );
    rect(
      this.x + this.timestampBox.xOffset,
      this.y + this.timestampBox.yOffset,
      this.timestampBox.width,
      this.timestampBox.height,
      this.timestampBox.cornerRadius
    );
    pop();

    // Display time text
    push();
    fill(this.time.fill.r, this.time.fill.g, this.time.fill.b);
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(this.time.size);
    textFont(fontStyleBold);
    text(
      this.time.name,
      this.x + this.time.xOffset,
      this.y + this.time.yOffset,
      this.timestampBox.width - this.time.padding,
      this.timestampBox.height - 20
    );
    pop();
  }

  // Display text
  displayText(string) {
    push();
    fill(string.fill.r, string.fill.g, string.fill.b);
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(string.size);
    // textFont(fontStyleBold);
    text(
      string.name,
      this.x + string.xOffset,
      this.y + string.yOffset,
      this.width - string.padding,
      this.height
    );
    pop();
  }

  // When hovering on preview video, change the play icon's opacity and cursor type
  hoverOnPreviewVideo(mouse) {
    if (this.hover(mouse)) {
      this.fillCurrent = this.fillHover;
      // // Increase opacity of play icon
      // this.playIcon.opacity.current = this.playIcon.opacity.max;
      // // When hovered is true, set cursor type to pointer
      // this.hovered = true;
    } else {
      this.fillCurrent = this.fill;
      // // Diminish opacity of play icon
      // this.playIcon.opacity.current = this.playIcon.opacity.min;
      // // Set cursor to default
      // this.hovered = false;
    }
  }

  // When mouse pressed on preview video, play the memory
  mousePressed(mouse) {
    if (this.hover(mouse)) {
      // Update counters for each memory category
      this.updateMemoryCounter();

      // update the memory to be shown
      currentMemoryGroupIndex++;

      // to delete; kept for reference
      // this.playMemory();
    }
  }

  // Update memory counter
  updateMemoryCounter() {
    if (this.memoryCategory === `happyMemory`) {
      numHappyMemoriesClicked++;
    } else if (this.memoryCategory === `sadMemory`) {
      numSadMemoriesClicked++;
    }
  }

  // To delete:
  // // Play the memory
  // playMemory() {
  //   state = `memory`;
  //   // CORRECT CODE: uncomment when done tests
  //   memoryPlaying = this.memoryFileName;
  //   console.log(`playing a memory, ${memoryPlaying}`);
  //
  //   // USED FOR TESTS
  //   // let testMemoriesList = [`testMemory`, `memoryFathersDay`];
  //   // memoryPlaying = random(testMemoriesList);
  //   // memoryPlaying = `memorySoccer`;
  //   // memoryPlaying = `memoryInstaPic`;
  // }
}
