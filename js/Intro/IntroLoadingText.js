// Loading text in intro state when installing app

class IntroLoadingText {
  constructor() {
    this.strings = [
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
    this.currentStringIndex++;
    console.log(`updating`);
  }

  // // Switch text every few seconds
  // switchText() {
  //   setTimeout(this.updateIndex.bind(this), this.dslayBetweenString);
  // }
}
