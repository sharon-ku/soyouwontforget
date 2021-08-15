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
    this.vx = 4;
    this.vy = 0;
    this.speed = 4;
    // acceleration
    this.ax = 0;
    this.ay = 0;
    this.acceleration = -2;

    // this.changeDirection = false;
  }

  // Update all behaviour
  update(kicker) {
    // Display circle
    this.display();

    // Let the ball roll
    this.roll(kicker);

    // if (this.changeDirection) {
    //   this.speed *= -1;
    //   this.changeDirection = false;
    // }
  }

  // Display ellipse
  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // // Returns true if kicker kicked the ball
  // gotKickedBy(kicker) {
  //   let distFromKickerToBall = dist(this.x, this.y, kicker.x, kicker.y);
  //   if (distFromKickerToBall < this.size) {
  //     // kicker.numSoccerKicks += 1;
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // Roll to next player
  roll(kicker) {
    // move ball
    this.x += this.vx + this.ax;
    this.y += this.vy;
    this.vx = this.speed;

    // add friction between ball and ground
    this.ax = this.acceleration;

    // if (this.gotKickedBy(kicker)) {
    //   this.changeDirection = true;
    //   // // go the opposite direction
    //   // this.speed *= -1;
    //   console.log(this.speed);
    // }
  }
}
