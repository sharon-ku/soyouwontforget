// Memory storage bar in game state that tracks how much memory you have

class MemoryStorageBar {
  constructor(maxMemoriesToClear) {
    // total number of memories inside the system that need to be cleared
    this.maxMemoriesToClear = maxMemoriesToClear;

    // if reached final loading message, then set to final load
    this.finalLoad = false;

    // rectangle container containing small bar
    this.bigContainer = {
      fill: 255,
      stroke: 0,
      strokeWeight: 3,
      cornerRadius: 10,
      x: width / 2,
      y: height - 100,
      width: 500,
      height: 40,
    };

    // one hundred mark of the progress bar
    this.oneHundredBar = {
      fill: 120,
      stroke: 0,
      strokeWeight: 0,
      cornerRadius: 10,
      x: undefined,
      y: height - 100,
      width: 330,
      height: 40,
    };

    this.oneHundredBar.x =
      this.bigContainer.x -
      this.bigContainer.width / 2 +
      this.oneHundredBar.width / 2;

    // small bar that moves
    this.smallBar = {
      fill: 0,
      stroke: 0,
      strokeWeight: 0,
      cornerRadius: 10,
      width: 30,
      height: 40,

      // movement
      x: undefined,
      y: this.bigContainer.y,
      // vx: 6,
    };

    this.smallBar.x =
      this.bigContainer.x -
      this.bigContainer.width / 2 +
      this.oneHundredBar.width;
  }

  update(numTotalMemoriesClicked) {
    this.updateSmallBarWidth(numTotalMemoriesClicked);

    // display progress bar
    this.displayBigContainer();

    // grey bar
    this.displayOneHundredBar();

    // moving bar that updates
    this.displaySmallBar();
  }

  updateSmallBarWidth(numTotalMemoriesClicked) {
    this.smallBar.width = map(
      numTotalMemoriesClicked,
      0,
      this.maxMemoriesToClear,
      150,
      0
    );
  }

  // container that stores the bar
  displayOneHundredBar() {
    push();
    fill(this.oneHundredBar.fill);
    stroke(this.oneHundredBar.stroke);
    strokeWeight(this.oneHundredBar.strokeWeight);
    rectMode(CENTER);

    rect(
      this.oneHundredBar.x,
      this.oneHundredBar.y,
      this.oneHundredBar.width,
      this.oneHundredBar.height,
      this.oneHundredBar.cornerRadius
    );
    pop();
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
      this.smallBar.x + this.smallBar.width / 2,
      this.smallBar.y,
      this.smallBar.width,
      this.smallBar.height,
      this.smallBar.cornerRadius
    );
    pop();
  }
}
