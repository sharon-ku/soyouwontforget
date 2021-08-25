// Memory playing in game state

class MemoryMakingBao {
  constructor(doughImage, rollingPinImage, meatImage, makingBaoDialogs) {
    // Sounds ------------------------
    this.dialogs = makingBaoDialogs;

    // Used to cue dialog 2
    this.checkThatDoughIsRolled = false;

    // Used to cue dialog 7
    this.showMeat = false;

    // Used to cue salad animation and dialog 8
    this.changeToSaladAnimation = false;

    // Used to keep track of how many times sound has been played
    this.numDialogs = 10;
    this.dialogPlayed = [];

    for (let i = 0; i < this.numDialogs; i++) {
      let dialogPlayedState = false;
      this.dialogPlayed.push(dialogPlayedState);
    }

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

    // Meat
    this.meatProperties = {
      image: meatImage,
      x: width - 100,
      y: 100,
    };
    this.meat = new DraggableImage(this.meatProperties);
  }

  // Update all behaviours
  update() {
    // noCursor();
    // Display all characters
    // NONE

    // Display all objects
    this.displayDough();

    if (!this.completedRollingDough) {
      this.rollingPin.update(mouseY);
      this.increaseDoughSize();
    }

    // Play dialog 0 right away
    if (!this.dialogPlayed[0]) {
      this.dialogs[0].play();
      this.dialogPlayed[0] = true;
    }

    // Change to dough scene and play dialog 1
    this.dialogs[0].onended(() => {
      if (!this.dialogPlayed[1]) {
        this.dialogs[1].play();
        this.dialogPlayed[1] = true;
      }
    });

    // If started rolling, cue dialog 2
    this.dialogs[1].onended(() => {
      this.checkThatDoughIsRolled = true;
    });

    if (this.checkThatDoughIsRolled) {
      if (this.dough.scale.current > this.dough.scale.min && movedY != 0) {
        if (!this.dialogPlayed[2]) {
          this.dialogs[2].play();
          this.dialogPlayed[2] = true;
        }
      }
    }

    // If 1/3 complete with the rolling, play dialog 3
    if (
      this.dialogPlayed[2] &&
      this.dough.scale.current >
        this.dough.scale.min +
          (this.dough.scale.max - this.dough.scale.min) / 3 &&
      !this.dialogPlayed[3]
    ) {
      this.dialogs[3].play();
      this.dialogPlayed[3] = true;
    }

    // If 1/2 of the way done, play dialog 4
    if (
      this.dialogPlayed[3] &&
      this.dough.scale.current >
        this.dough.scale.min +
          (this.dough.scale.max - this.dough.scale.min) / 2 &&
      !this.dialogPlayed[4]
    ) {
      this.dialogs[4].play();
      this.dialogPlayed[4] = true;
    }

    // If 3/4 of the way done, play dialog 4
    if (
      this.dialogPlayed[4] &&
      this.dough.scale.current >
        this.dough.scale.min +
          ((this.dough.scale.max - this.dough.scale.min) * 3) / 4 &&
      !this.dialogPlayed[5]
    ) {
      this.dialogs[5].play();
      this.dialogPlayed[5] = true;
    }

    // If finished rolling, cue dialog 6
    if (this.completedRollingDough && !this.dialogPlayed[6]) {
      this.dialogs[6].play();
      this.dialogPlayed[6] = true;
    }

    // Show meat after dialog 6
    this.dialogs[6].onended(() => {
      this.showMeat = true;
    });

    // Reveal meat after dialog 6
    if (this.showMeat) {
      this.meat.update();
      // If dropped meat on top of bun, cue dialog 7
      if (!this.meat.dragging) {
        // Calculate distance between meat and dough
        let distBtwMeatAndDough = dist(
          this.meat.x,
          this.meat.y,
          this.dough.x,
          this.dough.y
        );

        // If dist is less than the dough's radius, then meat successfully dropped!
        if (distBtwMeatAndDough < this.dough.image.width / 2) {
          this.meat.x = this.dough.x;
          this.meat.y = this.dough.y;
          console.log(`meat dropped`);

          if (!this.dialogPlayed[7]) {
            this.dialogs[7].play();
            this.dialogPlayed[7] = true;
          }
        }

        // cue salad animation after dialog7
        this.dialogs[7].onended(() => {
          this.changeToSaladAnimation = true;
        });
      }
    }

    // cue salad animation after dialog7
    if (this.changeToSaladAnimation) {
      console.log(`play salad animation bg`);

      if (!this.dialogPlayed[8]) {
        this.dialogs[8].play();
        this.dialogPlayed[8] = true;
      }
    }

    // When dialog 8 finished, play dialog 9
    this.dialogs[8].onended(() => {
      console.log(`play ding sound effect, show bao background`);
      if (!this.dialogPlayed[9]) {
        this.dialogs[9].play();
        this.dialogPlayed[9] = true;
      }
    });

    // When dialog 9 finished, switch to game
    this.dialogs[9].onended(() => {
      state = `game`;
      memoryPlaying = undefined;
    });

    // ======
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

  // When mouse pressed on meat, drag it
  mousePressed(mouseX, mouseY) {
    this.meat.mousePressed(mouseX, mouseY);
  }

  // When mouse released, let go of meat
  mouseNotPressed() {
    this.meat.dragging = false;
  }
}
