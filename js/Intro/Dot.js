class Dot {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.active = true;
    this.fill = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    };
    this.width = random(2, 20);
    this.height = random(1, 10);

    this.framesElapsed = 0;
    this.numFramesToUpdatePosition = random(100, 250);
  }

  update() {
    this.display();
    this.framesElapsed++;

    if (this.framesElapsed >= this.numFramesToUpdatePosition) {
      this.updatePosition();
      this.framesElapsed = 0;
    }
  }

  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  updatePosition() {
    this.x = random(0, width);
    this.y = random(0, height);
  }
}
