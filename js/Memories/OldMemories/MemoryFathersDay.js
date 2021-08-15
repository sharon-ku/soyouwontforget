// Memory playing in game state

/*** ATTRIBUTION
Code for: Click and Drag an object
by Daniel Shiffman <http://www.shiffman.net>
Link: https://editor.p5js.org/codingtrain/sketches/U0R5B6Z88
***/

class MemoryFathersDay {
  constructor(
    singleDecorationImages,
    multipleDecorationImages,
    fathersDayCardImage
  ) {
    // Characters in this scene ---------
    // All characters
    // this.characters = [];

    // Objects in this scene ---------
    this.singleDecorations = [];
    this.multipleDecorations = [];
    this.numMultipleDecorations = 4;

    // Card
    this.cardProperties = {
      image: fathersDayCardImage,
      x: width / 2,
      y: height / 2,
    };
    this.card = new CardDecoration(this.cardProperties);

    // Single decorations
    for (let i = 0; i < singleDecorationImages.length; i++) {
      this.singleDecorationProperties = {
        image: singleDecorationImages[i],
        x: random(0, width),
        y: random(0, height),
      };
      let singleDecoration = new CardDecoration(
        this.singleDecorationProperties
      );
      this.singleDecorations.push(singleDecoration);
    }

    // Multiple decorations
    for (let j = 0; j < multipleDecorationImages.length; j++) {
      for (let i = 0; i < this.numMultipleDecorations; i++) {
        this.multipleDecorationProperties = {
          image: multipleDecorationImages[j],
          x: random(0, width),
          y: random(0, height),
        };
        let multipleDecoration = new CardDecoration(
          this.multipleDecorationProperties
        );
        this.multipleDecorations.push(multipleDecoration);
      }
    }
  }

  // Update all behaviours
  update() {
    // Display all characters
    // NONE

    // Display all objects
    this.card.update();

    for (let i = 0; i < this.singleDecorations.length; i++) {
      this.singleDecorations[i].update();
    }

    for (let i = 0; i < this.multipleDecorations.length; i++) {
      this.multipleDecorations[i].update();
    }
  }

  // When mouse pressed on preview video, play the memory
  mousePressed(mouseX, mouseY) {
    for (let i = 0; i < this.singleDecorations.length; i++) {
      this.singleDecorations[i].mousePressed(mouseX, mouseY);
    }

    for (let i = 0; i < this.multipleDecorations.length; i++) {
      this.multipleDecorations[i].mousePressed(mouseX, mouseY);
    }
  }

  mouseNotPressed() {
    for (let i = 0; i < this.singleDecorations.length; i++) {
      this.singleDecorations[i].dragging = false;
    }

    for (let i = 0; i < this.multipleDecorations.length; i++) {
      this.multipleDecorations[i].dragging = false;
    }
  }
}
