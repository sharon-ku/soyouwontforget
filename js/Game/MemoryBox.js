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
    // True if memory box is flying away
    this.flying = false;

    this.flyingSpeed = {
      x: 20,
      y: 10,
    };
    this.flyingRotation = 0.05;

    // angle of rotation
    this.angleCurrent = 0;
    // max angle when hovering on memory box
    this.angleHover = PI / 20;
    this.angleNoHover = 0;

    // Positions of rectangle for memory box
    this.xInitial = x;
    this.yInitial = y;
    this.x = this.xInitial;
    this.y = this.yInitial;
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

  resetPosition() {
    this.angleCurrent = 0;
    this.x = this.xInitial;
    this.y = this.yInitial;
  }

  // Update all behaviour
  update(mouse, memoryName) {
    // Display preview video
    this.display();

    // When hovering on preview video, change the play icon's opacity and cursor type
    this.hoverOnMemoryBox(mouse);

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

    if (this.flying) {
      this.flyAway();
    }
  }

  // Display memory box with timestamp
  display() {
    // Display rectangle
    this.displayMemoryBox();

    // Display text containing memory name
    this.displayText(this.title);

    // Display timestamp box and time text
    this.displayTimeBox();

    // // Display section and instructions
    // // this.displayText(this.section);
    // push();
    // fill(
    //   this.instructions.fill.r,
    //   this.instructions.fill.g,
    //   this.instructions.fill.b
    // );
    // textAlign(CENTER);
    // rectMode(CENTER);
    // textSize(this.instructions.size);
    // textFont(fontStyleBold);
    // text(
    //   this.instructions.name,
    //   this.instructions.x,
    //   this.instructions.y,
    //   this.width,
    //   this.height
    // );
    // pop();
  }

  displayMemoryBox() {
    push();
    fill(this.fillCurrent.r, this.fillCurrent.g, this.fillCurrent.b);
    strokeWeight(this.stroke.weight);
    stroke(this.stroke.fill.r, this.stroke.fill.g, this.stroke.fill.b);
    rectMode(CENTER);

    translate(this.x, this.y);
    rotate(this.angleCurrent);
    rect(0, 0, this.width, this.height, this.cornerRadius);
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
    translate(this.x + string.xOffset, this.y + string.yOffset);
    rotate(this.angleCurrent);
    text(string.name, 0, 0, this.width - string.padding, this.height);
    pop();
  }

  // Display timestamp box and time text
  displayTimeBox() {
    // Display timestamp box
    push();
    rectMode(CENTER);
    noStroke();
    fill(
      this.timestampBox.fill.r,
      this.timestampBox.fill.g,
      this.timestampBox.fill.b
    );
    translate(this.x, this.y);
    rotate(this.angleCurrent);
    rect(
      this.timestampBox.xOffset,
      this.timestampBox.yOffset,
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
    translate(this.x, this.y);
    rotate(this.angleCurrent);
    text(
      this.time.name,
      this.time.xOffset,
      this.time.yOffset,
      this.timestampBox.width - this.time.padding,
      this.timestampBox.height - 20
    );
    pop();
  }

  // When hovering on memory box, change angle of rotation
  hoverOnMemoryBox(mouse) {
    if (!this.flying) {
      if (this.hover(mouse)) {
        // this.fillCurrent = this.fillHover;
        // change angle of rotation
        if (this.x > width / 2) {
          this.angleCurrent = this.angleHover;
        } else {
          this.angleCurrent = -this.angleHover;
        }
      } else {
        // this.fillCurrent = this.fill;
        // return angle to normal
        this.angleCurrent = this.angleNoHover;
      }
    } // flying
  }

  // Make memory box fly away
  flyAway() {
    push();
    translate(width / 2, height / 2);
    rotate(this.angleCurrent);

    if (this.x > width / 2) {
      this.x += this.flyingSpeed.x;
      this.angleCurrent += this.flyingRotation;
    } else {
      this.x += -this.flyingSpeed.x;
      this.angleCurrent += -this.flyingRotation;
    }

    this.y -= this.flyingSpeed.y;
    pop();

    // If box is off canvas:
    this.memoryBoxOffCanvas();
  }

  // if memory box flew off canvas
  memoryBoxOffCanvas() {
    if (this.x < -150 || this.x > width + 150) {
      this.flying = false;

      // move on to next memory
      this.nextMemory();
    }
  }

  // When mouse pressed on preview video, play the memory
  mousePressed(mouse) {
    if (this.hover(mouse)) {
      // Memory fly away
      this.flying = true;

      // to delete; kept for reference
      // this.playMemory();
    }
  }

  // Move onto next memory
  nextMemory() {
    // reset positions and angles of boxes
    this.resetPosition();

    // Update counters for each memory category
    this.updateMemoryCounter();

    // update the memory to be shown
    currentMemoryGroupIndex++;
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
