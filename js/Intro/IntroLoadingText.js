// Loading text in intro state when installing app

class IntroLoadingText {
  constructor() {
    this.strings = [
      `Scanning brain for memories`,
      `Loading all your memories`,
      `Categorizing memories`,
      `Complete!`,
    ];
    this.currentStringIndex = 0;
    this.delayBetweenString = 3000;
    this.fill = 0;
    this.size = 25;
    this.x = width / 2;
    this.y = height / 2 + 50;
  }

  update() {
    // display text
    this.display();
  }

  // Display text
  display() {
    push();
    fill(this.fill);
    textFont(fontStyleBold);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    textSize(this.size);
    text(this.strings[this.currentStringIndex], this.x, this.y);
    pop();
  }

  // update string index
  updateStringIndex() {
    // if we haven't gone through all messages yet
    if (this.currentStringIndex < this.strings.length - 1) {
      // update current string
      this.currentStringIndex++;
    }
    //  else if done loading all messages:
    else {
      // set to final load
      setFinalLoadForLoadingBar();

      // clear messages getting updateIndex
      clearInterval(loadingMessageInterval);
    }
  }
}
