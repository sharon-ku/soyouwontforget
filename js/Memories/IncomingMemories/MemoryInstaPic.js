// Insta pic memory playing in memory state

class MemoryInstaPic {
  constructor(saladImage) {
    // Characters in this scene ---------
    // All characters
    // this.characters = [];

    // Objects in this scene ---------
    this.saladBackground = {
      image: saladImage,
      x: width / 2,
      y: height / 2,
    };

    // Card
    // this.cardProperties = {
    //   image: fathersDayCardImage,
    //   x: width / 2,
    //   y: height / 2,
    // };
    // this.card = new CardDecoration(this.cardProperties);
  }

  // Update all behaviours
  update() {
    // Display full-canvas background image of salad
    this.displaySaladBackgroundImage();

    // Display all characters
    // NONE

    // Display all objects

    //
    // for (let i = 0; i < this.singleDecorations.length; i++) {
    //   this.singleDecorations[i].update();
    // }
    //
    // for (let i = 0; i < this.multipleDecorations.length; i++) {
    //   this.multipleDecorations[i].update();
    // }
  }

  // Display full-canvas background image of salad
  displaySaladBackgroundImage() {
    push();
    imageMode(CENTER);
    translate(this.saladBackground.x, this.saladBackground.y);
    image(this.saladBackground.image, 0, 0);
    pop();
  }

  // When mouse pressed on preview video, play the memory
  mousePressed(mouseX, mouseY) {}
}
