// Button in intro state: start game

class StartButton extends Button {
  constructor({ x, y }) {
    super({ x, y });
    // Color of rectangle: green
    this.fill = {
      r: 0,
      g: 0,
      b: 0,
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

    // Title shown under preview video
    this.title = {
      name: `start >`,
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

    // When hovering on button, change cursor type
    // this.hover(mouse);
  }

  // Display start text
  display() {
    // Display text containing memory name
    this.displayText(this.title);
  }

  // When mouse pressed on button, play poem video
  mousePressed(mouse) {
    if (this.hover(mouse)) {
      // Play the poem video
      introPlayPoem();
    }
  }
}
