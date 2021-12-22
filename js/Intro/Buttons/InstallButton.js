// Button in intro state: download Memorywash app

class InstallButton extends Button {
  constructor({ x, y }) {
    super({ x, y });
    // Color of rectangle: green
    this.fill = {
      r: 153,
      g: 226,
      b: 150,
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
      name: `INSTALL`,
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
    this.hover(mouse);
  }

  // When hovering on button, change cursor type
  hover(mouse) {
    if (this.mouseOverlapsRectangle(mouse)) {
      // Change cursor to pointer
      // cursor(`pointer`);
    } else {
      // cursor(`default`);
    }
  }

  // When mouse pressed on button, load app
  mousePressed(mouse) {
    if (this.mouseOverlapsRectangle(mouse)) {
      loadApp();
    }
  }
}
