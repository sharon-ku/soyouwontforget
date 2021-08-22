// Mirror head in night scene

class MirrorHead extends MirrorRoundBodyPart {
  constructor() {
    super();

    // Offset to add to head's position to make it centered
    this.xOffset = undefined;
    this.yOffset = 0;

    // size
    this.width = undefined;
    this.height = undefined;

    // color
    this.fill = {
      r: 238,
      g: 215,
      b: 175,
    };

    // stroke
    this.strokeWeight = 5;
  }

  // Update all circle behaviour
  update(detections) {
    for (let i = 0; i < detections.length; i++) {
      // Calculate circle's size and xOffset
      this.calculateValues(i, detections);

      // Draw circle
      this.display();
    }
  }

  // Calculate circle's size, x, y, and xOffset
  calculateValues(i, detections) {
    // Rectangle that stores head detections
    let alignedRect = detections[i].alignedRect;
    this.x = alignedRect._box._x;
    this.y = alignedRect._box._y;

    // Box that stores head's width and height
    let boxWidth = alignedRect._box._width;
    let boxHeight = alignedRect._box._height;

    // Let the head size be the height of the box
    this.width = boxHeight;
    this.height = boxHeight;

    // Offset to add to head's x position to make it centered
    this.xOffset = boxWidth / 2 - boxHeight / 2;
  }

  // Display circle
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    strokeWeight(this.strokeWeight);
    ellipseMode(CORNER);
    ellipse(
      this.x + this.xOffset,
      this.y + this.yOffset,
      this.width,
      this.height
    );
    pop();
  }
}
