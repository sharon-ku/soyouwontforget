// Loading bar in intro state when installing app

class IntroLoadingBar {
  constructor() {
    // if reached final loading message, then set to final load
    this.finalLoad = false;

    // rectangle container containing small bar
    this.bigContainer = {
      fill: 255,
      stroke: 0,
      strokeWeight: 0,
      cornerRadius: 10,
      x: width / 2,
      y: height / 2 - 20,
      width: 500,
      height: 10,
    };

    // small bar that moves
    this.smallBar = {
      fill: 0,
      stroke: 0,
      strokeWeight: 0,
      cornerRadius: 10,
      width: 50,
      height: this.bigContainer.height,

      // movement
      x: undefined,
      xMin: undefined,
      xMax: undefined,
      y: this.bigContainer.y,
      vx: 6,
    };

    // setting initial x positions for small bar:
    this.smallBar.xMin =
      this.bigContainer.x -
      this.bigContainer.width / 2 +
      this.smallBar.width / 2;

    this.smallBar.xMax =
      this.bigContainer.x +
      this.bigContainer.width / 2 -
      this.smallBar.width / 2;

    this.smallBar.x = this.smallBar.xMin;
  }

  update() {
    // display progress bar
    this.display();

    // move small bar from left to right
    this.moveSmallBar();
  }

  display() {
    this.displayBigContainer();

    this.displaySmallBar();
  }

  // container that stores the bar
  displayBigContainer() {
    push();
    fill(this.bigContainer.fill);
    stroke(this.bigContainer.stroke);
    strokeWeight(this.bigContainer.strokeWeight);
    rectMode(CENTER);

    rect(
      this.bigContainer.x,
      this.bigContainer.y,
      this.bigContainer.width,
      this.bigContainer.height,
      this.bigContainer.cornerRadius
    );
    pop();
  }

  // small bar that gets displayed
  displaySmallBar() {
    push();
    fill(this.smallBar.fill);
    stroke(this.smallBar.stroke);
    strokeWeight(this.smallBar.strokeWeight);
    rectMode(CENTER);

    rect(
      this.smallBar.x,
      this.smallBar.y,
      this.smallBar.width,
      this.smallBar.height,
      this.smallBar.cornerRadius
    );
    pop();
  }

  // Return true if bar reached the end of container bar
  smallBarReachedTheEnd() {
    if (this.smallBar.x >= this.smallBar.xMax) {
      return true;
    } else {
      return false;
    }
  }

  // Move small bar from left to rigbt
  moveSmallBar() {
    this.smallBar.x += this.smallBar.vx;

    // reset small bar position to the left
    if (this.smallBarReachedTheEnd()) {
      this.smallBar.x = this.smallBar.xMin;

      // if it's the final load for the loading bar:
      if (this.finalLoad) {
        // change state
        state = `game`;
        console.log(state);
      }
    } // if (this.smallBarReachedTheEnd())
  } // moveSmallBar
}
