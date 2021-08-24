// Memory playing in game state

class MemorySoccer {
  constructor(luImages, zaiImages, daddyImages, soccerDialogs, crashSound) {
    this.dialogs = soccerDialogs;
    this.crashSound = crashSound;

    // Keep track of number of times dialogs played
    this.twentyKicksDialogPlayed = 0;

    this.introIsPlaying = true;
    // For final kick
    this.finalKickIsPlaying = false;
    this.daddyStopsKicking = false; // stops after Zai delivers the last kick

    // Play first dialog right away
    this.dialogs[0].play();

    // Characters in this scene ---------
    // All characters
    this.characters = [];

    this.updateLuCount = false;
    this.updateZaiCount = false;
    this.updateDaddyCount = false;

    // Lu
    this.luProperties = {
      images: luImages,
      x: width + 250,
      y: height / 2,
      currentIndex: 0,
    };
    this.lu = new Lu(this.luProperties);
    this.characters.push(this.lu);

    // Zai
    this.zaiProperties = {
      images: zaiImages,
      x: width - 250,
      y: height / 2,
      currentIndex: 0,
    };
    this.zai = new Zai(this.zaiProperties);

    this.characters.push(this.zai);

    // Daddy
    this.daddyProperties = {
      images: daddyImages,
      x: 200,
      y: height / 2,
      currentIndex: 0,
    };
    this.daddy = new Daddy(this.daddyProperties);

    this.characters.push(this.daddy);

    // Objects in this scene ---------
    // Soccer ball
    this.soccerBallProperties = {
      x: 500,
      y: height / 2 + this.lu.images[this.lu.currentIndex].height / 3,
      crashSound: this.crashSound,
    };
    this.soccerBall = new SoccerBall(this.soccerBallProperties);

    // Instructions text
    this.instructions = {
      string: `Click to kick ball.`,
      fill: {
        r: 0,
        g: 0,
        b: 0,
      },
      size: 30,
      // position
      x: width / 2,
      y: height - 30,
    };
  }

  // Update all behaviours
  update() {
    if (this.introIsPlaying) {
      this.lu.display();
      this.lu.moveIntoPosition();

      this.dialogs[0].onended(() => {
        this.introIsPlaying = false;
      });
    } else {
      this.lu.update();
      // Display instructions text
      this.displayText(this.instructions);
      console.log(`dialog done playing`);
    }

    // Display all characters

    this.zai.display();
    this.daddy.display();

    // Display all objects
    for (let i = 0; i < this.characters.length; i++) {
      this.soccerBall.update(this.characters[i]);

      // // Returns true if Lu kicked ball
      // if (this.soccerBall.gotKickedBy(this.characters[i])) {
      //   console.log(this.characters[i]);
      //   // console.log(`${this.characters[i]} kicked da ball`);
      // } else {
      //   // console.log(`fail`);
      // }
    }

    // If it's the final kick, let Zai run to the ball
    if (this.finalKickIsPlaying) {
      this.zai.chargeToBall();
    }

    if (
      this.soccerBall.x >
        this.lu.x - this.lu.images[this.lu.currentIndex].width / 2 &&
      this.soccerBall.x <
        this.lu.x + this.lu.images[this.lu.currentIndex].width / 2 &&
      mouseIsPressed &&
      this.soccerBall.speed > 0
    ) {
      this.soccerBall.speed = -4;
      this.soccerBall.acceleration = 1;
      this.updateLuCount = true;
      console.log(`Lu: ${this.lu.numSoccerKicks}`);
    } else if (this.soccerBall.x > this.zai.x) {
      this.soccerBall.speed = -4;
      this.soccerBall.acceleration = 1;
      this.updateZaiCount = true;
      console.log(`Zai: ${this.zai.numSoccerKicks}`);

      if (this.finalKickIsPlaying) {
        this.soccerBall.speed = -8;
        this.daddyStopsKicking = true;
      }
    } else if (this.soccerBall.x < this.daddy.x && !this.daddyStopsKicking) {
      this.soccerBall.speed = 4;
      this.soccerBall.acceleration = -1;
      this.updateDaddyCount = true;
      console.log(`Daddy: ${this.daddy.numSoccerKicks}`);
    }

    if (this.updateLuCount) {
      this.lu.numSoccerKicks += 1;
      this.updateLuCount = false;

      if (this.lu.numSoccerKicks > 20 && this.twentyKicksDialogPlayed === 0) {
        this.dialogs[1].play();

        // When dialog done playing, reset image indices
        this.dialogs[1].onended(() => {
          this.lu.currentIndex = 1;
          this.zai.currentIndex = 1;

          setTimeout(() => {
            this.lu.currentIndex = 0;
            this.zai.currentIndex = 0;
          }, 5000);
        });

        // stop playing dialog
        this.twentyKicksDialogPlayed++;
      } else if (this.lu.numSoccerKicks > 2) {
        this.finalKickIsPlaying = true;

        // Switch states, end memory after 10 seconds
        setTimeout(() => {
          state = `game`;
          memoryPlaying = undefined;
        }, 10000);
      }
    } else if (this.updateZaiCount) {
      this.zai.numSoccerKicks += 1;
      this.updateZaiCount = false;
    } else if (this.updateDaddyCount) {
      this.zai.numSoccerKicks += 1;
      this.updateDaddyCount = false;
    }
  }

  // Display image
  displayCharacter(character) {
    push();
    imageMode(CENTER);
    image(character.images[character.currentIndex], character.x, character.y);
    pop();
  }

  // Display text
  displayText(string) {
    push();
    fill(string.fill.r, string.fill.g, string.fill.b);
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(string.size);
    textFont(fontStyleBold);
    text(string.string, string.x, string.y);
    pop();
  }

  // When mouse pressed on preview video, play the memory
  mousePressed() {
    // if (this.mouseOverlapsRectangle(mouse)) {
    //   this.playMemory();
    // }
  }

  // // Play the memory
  // play() {
  //   console.log(`playing a memory`);
  // }

  // SHOULD MAKE A PARENT FOR OVERLAP METHOD
  // Returns true if mouse overlaps preview video
  mouseOverlapsRectangle(mouse) {
    if (
      mouse.x < this.x + this.width / 2 &&
      mouse.x > this.x - this.width / 2 &&
      mouse.y < this.y + this.height / 2 &&
      mouse.y > this.y - this.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
