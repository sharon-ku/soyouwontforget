// Mirror eye

class MirrorEye extends MirrorRoundBodyPart {
  constructor(xOffset, yOffset) {
    super(xOffset, yOffset);

    // offset to add to head's position to make it centered
    this.xOffset = xOffset;
    this.yOffset = yOffset;

    // size
    this.width = 30;
    this.height = 30;

    // color
    this.fill = {
      r: 241,
      g: 142,
      b: 48,
    };

    // stroke
    this.strokeWeight = 0;
  }

  // Update all circle behaviour
  update(detections, eyePosition) {
    for (let i = 0; i < detections.length; i++) {
      // Calculate circle's size and xOffset
      this.calculateValues(i, detections, eyePosition);

      // Draw circle
      this.display();
    }
  }

  // Calculate circle's x and y positions
  calculateValues(i, detections, eyePosition) {
    // Set x and y positions of eye
    this.x = eyePosition[0]._x;
    this.y = eyePosition[4]._y;
  }

  // Display circle
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    strokeWeight(this.strokeWeight);
    ellipse(
      this.x + this.xOffset,
      this.y + this.yOffset,
      this.width,
      this.height
    );
    pop();
  }
}
