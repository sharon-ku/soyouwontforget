// Memory playing in game state

class MemoryMakingBao {
  constructor(doughImage, rollingPinImage) {
    // Sounds ------------------------
    // this.dadiCorrectSpellingSound = dadiCorrectSpellingSound;
    // // Used to keep track of how many times sound has been played
    // this.dadiCorrectSpellingSoundPlayed = false;
    this.completedRollingDough = false;

    // Characters in this scene ---------
    // All characters
    // this.characters = [];

    // Objects in this scene ---------
    // Dough
    this.dough = {
      x: width / 2,
      y: height / 2,
      image: doughImage,
      scale: {
        current: 0.6,
        max: 1.2,
        increaseRate: {
          current: 0.00001,
          // min: 0.0005,
          // max: 0.001,
          min: 0.0005,
          max: 0.001,
        },
      },
      angle: 0,
    };

    // Rolling pin
    this.rollingPinProperties = {
      x: width / 2,
      y: height / 2 + 100,
      image: rollingPinImage,
    };
    this.rollingPin = new RollingPin(this.rollingPinProperties);

    // Dialogs
    this.OneFourthDoneRollingDialog = 0;

    // // Card decorations
    // this.singleDecorations = [];
    // this.multipleDecorations = [];
    // this.numMultipleDecorations = 4;
    //
    // // Card
    // this.cardProperties = {
    //   image: fathersDayCardImage,
    //   x: width / 2,
    //   y: height / 2,
    // };
    // this.card = new CardDecoration(this.cardProperties);
    //
    // // Single decorations
    // for (let i = 0; i < singleDecorationImages.length; i++) {
    //   this.singleDecorationProperties = {
    //     image: singleDecorationImages[i],
    //     x: random(0, width),
    //     y: random(0, height),
    //   };
    //   let singleDecoration = new CardDecoration(
    //     this.singleDecorationProperties
    //   );
    //   this.singleDecorations.push(singleDecoration);
    // }
    //
    // // Multiple decorations
    // for (let j = 0; j < multipleDecorationImages.length; j++) {
    //   for (let i = 0; i < this.numMultipleDecorations; i++) {
    //     this.multipleDecorationProperties = {
    //       image: multipleDecorationImages[j],
    //       x: random(0, width),
    //       y: random(0, height),
    //     };
    //     let multipleDecoration = new CardDecoration(
    //       this.multipleDecorationProperties
    //     );
    //     this.multipleDecorations.push(multipleDecoration);
    //   }
    // }
    //
    // // True if dadi is spelt correctly
    // this.dadiSpelling = undefined;
  }

  // Update all behaviours
  update() {
    noCursor();
    // Display all characters
    // NONE

    // Display all objects
    this.displayDough();
    this.increaseDoughSize();

    if (!this.completedRollingDough) {
      this.rollingPin.update(mouseY);
    }

    // if (this.OneFourthDoneRollingDialog===1) {
    //   makingBao.dialogs.play();
    // }

    //
    // // Update decorations
    // for (let i = 0; i < this.singleDecorations.length; i++) {
    //   this.singleDecorations[i].update();
    // }
    //
    // for (let i = 0; i < this.multipleDecorations.length; i++) {
    //   this.multipleDecorations[i].update();
    // }
    //
    // // Check dadi spelling
    // this.checkDadiSpelling();
    //
    // // If spelling of dady is correct, play congratulatory sound just once
    // if (this.dadiSpelling && !this.dadiCorrectSpellingSoundPlayed) {
    //   this.dadiCorrectSpellingSound.play();
    //   this.dadiCorrectSpellingSoundPlayed = true;
    // }
    //
    // // Update "Save Card" button
    // this.saveCardButton.update();
    // this.saveCardButton.hover(mouse);
  }

  // Display image
  displayDough() {
    push();
    translate(this.dough.x, this.dough.y);
    imageMode(CENTER);
    rotate(this.dough.angle);
    // this.dough.angle += 0.05;
    scale(this.dough.scale.current);
    // scale(this.dough.scale.x, this.dough.scale.y);
    image(this.dough.image, 0, 0);
    pop();
  }

  // If rolling over dough, increase its size
  increaseDoughSize() {
    if (abs(movedY) > 0) {
      // If dough is small, faster increase rate
      if (this.dough.scale.current < this.dough.scale.max / 2) {
        this.dough.scale.increaseRate.current = this.dough.scale.increaseRate.max;
      } else {
        this.dough.scale.increaseRate.current = this.dough.scale.increaseRate.min;
      }

      this.dough.scale.current += this.dough.scale.increaseRate.current;

      // If a quarter complete with the rolling
      if (this.dough.scale.current > this.dough.scale.max / 4) {
        this.OneFourthDoneRollingDialog += 1;
      }

      // Finished rolling
      if (this.dough.scale.current >= this.dough.scale.max) {
        this.completedRollingDough = true;
        console.log(`L: I finished!`);
      }
    }
  }

  // When mouse pressed on preview video, play the memory
  mousePressed(mouseX, mouseY) {
    // this.saveCardButton.mousePressed(mouse);
    //
    // for (let i = 0; i < this.singleDecorations.length; i++) {
    //   this.singleDecorations[i].mousePressed(mouseX, mouseY);
    // }
    //
    // for (let i = 0; i < this.multipleDecorations.length; i++) {
    //   this.multipleDecorations[i].mousePressed(mouseX, mouseY);
    // }
  }

  mouseNotPressed() {
    // for (let i = 0; i < this.singleDecorations.length; i++) {
    //   this.singleDecorations[i].dragging = false;
    // }
    //
    // for (let i = 0; i < this.multipleDecorations.length; i++) {
    //   this.multipleDecorations[i].dragging = false;
    // }
  }
}
