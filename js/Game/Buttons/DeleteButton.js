// Button in game state: Delete button

class DeleteButton extends Button {
  constructor({ x, y, memoryName }) {
    super({ x, y, memoryName });
    // Color of rectangle: green
    this.fill = {
      r: 153,
      g: 226,
      b: 150,
    };

    // Memory to be played when video clicked
    // this.memoryFileName = memoryName.memoryFileName;

    // Title shown under preview video
    this.title = {
      // name: memoryName.previewVideoTitle,
      name: `DELETE`,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
      size: 25,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: -3,
    };
  }

  // update(mouse) {
  //   this.display();
  //
  //   // // When hovering on preview video, change the play icon's opacity and cursor type
  //   // this.hoverOnPreviewVideo(mouse);
  // }
  //
  // // Display preview video
  // display() {
  //   // Display rectangle
  //   push();
  //   fill(this.fill.r, this.fill.g, this.fill.b);
  //   rectMode(CENTER);
  //   rect(this.x, this.y, this.width, this.height, this.cornerRadius);
  //   pop();
  //
  //   // Display text containing memory name
  //   this.displayText(this.title);
  // }
  //
  // // Display text
  // displayText(string) {
  //   push();
  //   fill(string.fill.r, string.fill.g, string.fill.b);
  //   textAlign(CENTER, CENTER);
  //   rectMode(CENTER);
  //   textSize(string.size);
  //   textStyle(string.style);
  //   text(string.name, this.x + string.xOffset, this.y + string.yOffset);
  //   pop();
  // }

  // // When hovering on preview video, change the play icon's opacity and cursor type
  // hoverOnPreviewVideo(mouse) {
  //   if (this.mouseOverlapsRectangle(mouse)) {
  //     // Increase opacity of play icon
  //     this.playIcon.opacity.current = this.playIcon.opacity.max;
  //     // Change cursor to pointer
  //     cursor(`pointer`);
  //   } else {
  //     // Diminish opacity of play icon
  //     this.playIcon.opacity.current = this.playIcon.opacity.min;
  //     // Change cursor to default
  //     cursor(`default`);
  //   }
  // }
  //
  // // When mouse pressed on preview video, play the memory
  // mousePressed(mouse) {
  //   if (this.mouseOverlapsRectangle(mouse)) {
  //     this.playMemory();
  //   }
  // }
  //
  // // Play the memory
  // playMemory() {
  //   memoryPlaying = this.memoryFileName;
  //   console.log(`playing a memory, ${memoryPlaying}`);
  //
  //   // USED FOR TESTS
  //   // memoryPlaying = `testMemory`;
  // }
  //
  // // SHOULD MAKE A PARENT FOR OVERLAP METHOD
  // // Returns true if mouse overlaps preview video
  // mouseOverlapsRectangle(mouse) {
  //   if (
  //     mouse.x < this.x + this.width / 2 &&
  //     mouse.x > this.x - this.width / 2 &&
  //     mouse.y < this.y + this.height / 2 &&
  //     mouse.y > this.y - this.height / 2
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
