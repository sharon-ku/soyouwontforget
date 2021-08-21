// Mirror round body part
// Parent of mirror mouth and mirror eye

class MirrorRoundBodyPart {
  constructor(xOffset, yOffset) {
    // position
    this.x = undefined;
    this.y = undefined;
    // offset to add to head's position to make it centered
    this.xOffset = undefined;
    this.yOffset = undefined;

    // size
    this.width = undefined;
    this.height = undefined;

    // color
    this.fill = {
      r: undefined,
      g: undefined,
      b: undefined,
    };
    // stroke color
    this.strokeFill = {
      r: 241,
      g: 142,
      b: 48,
    };
    // stroke
    this.strokeWeight = undefined;
  }

  // Update all behaviour
  update() {}

  // Calculate values
  calculateValues() {}

  // Display circle
  display() {}
}
