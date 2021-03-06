// Button in intro state: start game

class StartButton extends Button {
  constructor({ x, y }) {
    super({ x, y });
    // Size of rectangle
    this.width = 150;
    this.height = 50;
    // Color of rectangle: blue
    this.fillCurrent = {
      r: 0,
      g: 0,
      b: 0,
      alpha: 100,
    };
    this.fill = {
      r: 0,
      g: 0,
      b: 0,
      alpha: 100,
    };
    this.fillHover = {
      r: 0,
      g: 0,
      b: 0,
      alpha: 255,
    };
    // Stroke properties of rectangle
    this.stroke = {
      weight: 1,
      fill: {
        r: 255,
        g: 255,
        b: 255,
      },
    };

    // Title shown under preview video
    this.title = {
      name: `START`,
      fill: {
        r: 255,
        g: 255,
        b: 255,
      },
      size: 25,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: -3,
    };
  }

  // Update all behaviour
  update(mouse) {
    // Display button
    this.display();

    // If hovering over button, change button color
    this.hoverBehaviour();
  }

  // Display preview video
  display() {
    // Display rectangle
    push();
    fill(
      this.fillCurrent.r,
      this.fillCurrent.g,
      this.fillCurrent.b,
      this.fillCurrent.alpha
    );
    strokeWeight(this.stroke.weight);
    stroke(this.stroke.fill.r, this.stroke.fill.g, this.stroke.fill.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    pop();

    // Display text containing memory name
    this.displayText(this.title);
  }

  // If hovering over button, change button color
  hoverBehaviour() {
    if (this.hover(mouse)) {
      this.fillCurrent = this.fillHover;
    } else {
      this.fillCurrent = this.fill;
    }
  }

  // When mouse pressed on button, play poem video
  mousePressed(mouse) {
    if (this.hover(mouse)) {
      // Play the poem video
      introPlayPoem();
    }
  }
}
