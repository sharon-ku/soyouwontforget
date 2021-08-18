// Save card button in memory state: player clicks this to download card

class SaveCardButton extends Button {
  constructor({ x, y }) {
    super({ x, y });
    // Color of rectangle: blue
    this.fill = {
      r: 254,
      g: 189,
      b: 195,
    };

    // Title shown under preview video
    this.title = {
      name: `Save card`,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
      size: 25,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: -3,
    };

    // Will only display button if this variable is true
    this.displayButton = true;
  }

  // Update all behaviour of button
  update(mouse) {
    if (this.displayButton) {
      this.display();
    }
  }

  // When mouse pressed on button, take screenshot and save image
  mousePressed(mouse) {
    if (this.mouseOverlapsRectangle(mouse)) {
      // Stop displaying this button
      this.displayButton = false;

      // Take a screenshot of the card
      setTimeout(() => {
        saveCanvas(canvas, "my-lovely-card", "jpg");
      }, 500);

      // After a delay, return to game state
      setTimeout(() => {
        state = `game`;
        memoryPlaying = undefined;
      }, 5000);
    }
  }
}
