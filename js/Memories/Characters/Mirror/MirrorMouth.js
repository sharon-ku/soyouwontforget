// Mirror mouth in night scene

class MirrorMouth extends MirrorRoundBodyPart {
  constructor() {
    super();
    // position
    this.x = {
      leftPosition: undefined,
      rightPosition: undefined,
      midPoint: undefined,
      scale: 0.5,
    };
    this.y = {
      topPosition: undefined,
      bottomPosition: undefined,
      midPoint: undefined,
      scale: 1,
    };
    // Offset to add to head's position to make it centered
    this.xOffset = -10;
    this.yOffset = 30;

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
  update(detections) {
    for (let i = 0; i < detections.length; i++) {
      // Calculate circle's size and xOffset
      this.calculateValues(detections);

      // Draw circle
      this.display();
    }
  }

  // Calculate mouth's x and y positions, width, and height
  calculateValues(detections) {
    // Get mouth position
    let mouthPosition = detections[0].parts.mouth;

    // Set x position and width of mouth
    this.x.leftPosition = mouthPosition[0]._x;
    this.x.rightPosition = mouthPosition[6]._x;
    this.width = this.x.rightPosition - this.x.leftPosition;
    this.x.midPoint = (this.x.leftPosition + this.x.rightPosition) / 2;

    // Set y position and height of mouth
    this.y.bottomPosition = mouthPosition[2]._y;
    this.y.topPosition = mouthPosition[9]._y;
    this.height = this.y.topPosition - this.y.bottomPosition;
    this.y.midPoint = (this.y.bottomPosition + this.y.topPosition) / 2;
  }

  // Display circle
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    stroke(this.strokeFill.r, this.strokeFill.g, this.strokeFill.b);
    strokeWeight(this.strokeWeight);
    // ellipse(
    //   this.x.leftPosition + this.width / 2 + this.xOffset,
    //   this.y.bottomPosition + this.height / 2 + this.yOffset,
    //   this.width,
    //   this.height
    // );
    ellipse(
      this.x.midPoint + this.xOffset,
      this.y.midPoint + this.yOffset,
      this.width * this.x.scale,
      this.height * this.y.scale
    );
    pop();
  }
}
