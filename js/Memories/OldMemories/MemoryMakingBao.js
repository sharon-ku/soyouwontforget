// Memory playing in game state

class MemoryMakingBao {
  constructor(doughImage, rollingPinImage, makingBaoDialogs) {
    // Sounds ------------------------
    this.dialogs = makingBaoDialogs;

    // Used to cue dialog two
    this.checkThatDoughIsRolled = false;

    // Used to keep track of how many times sound has been played
    this.dialogZeroPlayed = false;
    this.dialogOnePlayed = false;
    this.dialogTwoPlayed = false;
    this.dialogThreePlayed = false;
    this.dialogFourPlayed = false;
    this.dialogFivePlayed = false;
    this.dialogSixPlayed = false;

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
        min: 0.6,
        max: 1.2,
        increaseRate: 0.0002, //0.0001
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
  }

  // Update all behaviours
  update() {
    noCursor();
    // Display all characters
    // NONE

    // Display all objects
    this.displayDough();

    if (!this.completedRollingDough) {
      this.rollingPin.update(mouseY);
      this.increaseDoughSize();
    }

    // Play dialog 0 right away
    if (!this.dialogZeroPlayed) {
      this.dialogs[0].play();
      this.dialogZeroPlayed = true;
    }

    // Change to dough scene and play dialog 1
    this.dialogs[0].onended(() => {
      if (!this.dialogOnePlayed) {
        this.dialogs[1].play();
        this.dialogOnePlayed = true;
      }
    });

    // If started rolling, cue dialog 2
    this.dialogs[1].onended(() => {
      this.checkThatDoughIsRolled = true;
    });

    if (this.checkThatDoughIsRolled) {
      if (this.dough.scale.current > this.dough.scale.min) {
        if (!this.dialogTwoPlayed) {
          this.dialogs[2].play();
          this.dialogTwoPlayed = true;
        }
      }
    }

    // If 1/3 complete with the rolling, play dialog 3
    if (
      this.dialogTwoPlayed &&
      this.dough.scale.current >
        this.dough.scale.min +
          (this.dough.scale.max - this.dough.scale.min) / 3 &&
      !this.dialogThreePlayed
    ) {
      this.dialogs[3].play();
      this.dialogThreePlayed = true;
    }

    // If 1/2 of the way done, play dialog 4
    if (
      this.dialogThreePlayed &&
      this.dough.scale.current >
        this.dough.scale.min +
          (this.dough.scale.max - this.dough.scale.min) / 2 &&
      !this.dialogFourPlayed
    ) {
      this.dialogs[4].play();
      this.dialogFourPlayed = true;
    }

    // If 3/4 of the way done, play dialog 4
    if (
      this.dialogFourPlayed &&
      this.dough.scale.current >
        this.dough.scale.min +
          ((this.dough.scale.max - this.dough.scale.min) * 3) / 4 &&
      !this.dialogFivePlayed
    ) {
      this.dialogs[5].play();
      this.dialogFivePlayed = true;
    }

    // If finished rolling, cue dialog 6
    if (this.completedRollingDough && !this.dialogSixPlayed) {
      this.dialogs[6].play();
      this.dialogSixPlayed = true;
    }

    this.dialogs[6].onended(() => {
      // TEMPORARILY END MEMORY HERE TO TEST WINNER BUTTON
      state === `game`;
      memoryPlaying = undefined;
    });
  }

  // // Cue dialog: unused - not sure why it doesn't work
  // cueDialog(dialogNumber, dialogEvent) {
  //   if (!dialogEvent) {
  //     this.dialogs[dialogNumber].play();
  //     dialogEvent = true;
  //   }
  // }

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
      // Increase dough size
      this.dough.scale.current += this.dough.scale.increaseRate;

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
