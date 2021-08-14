// Soccer ball in test memory

class SoccerBall {
  constructor({ x, y }) {
    this.size = 42;
    // color: blue
    this.fill = {
      r: 136,
      g: 192,
      b: 250,
    };

    // position
    this.x = x;
    this.y = y;
    // velocity
    this.vx = 0;
    this.vy = 0;
    this.speed = 4;
    // acceleration
    this.ax = 0;
    this.ay = 0;
  }

  // Update all behaviour
  update() {
    // Display circle
    this.display();
  }

  // Display ellipse
  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
