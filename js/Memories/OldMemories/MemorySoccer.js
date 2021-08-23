// Memory playing in game state

class MemorySoccer {
  constructor(luImages, zaiImages) {
    // Characters in this scene ---------
    // All characters
    this.characters = [];

    this.updateLuCount = false;
    this.updateZaiCount = false;

    // Lu
    this.luProperties = {
      images: luImages,
      x: width - 400,
      y: height / 2 - 100,
      currentIndex: 0,
    };
    this.lu = new Lu(this.luProperties);
    this.characters.push(this.lu);

    // Zai
    this.zaiProperties = {
      images: zaiImages,
      x: 400,
      y: height / 2 - 100,
      currentIndex: 0,
    };
    this.zai = new Zai(this.zaiProperties);

    this.characters.push(this.zai);

    // Objects in this scene ---------
    // Soccer ball
    this.soccerBallProperties = {
      x: 500,
      y: height / 2 - 50,
    };
    this.soccerBall = new SoccerBall(this.soccerBallProperties);
  }

  // Update all behaviours
  update() {
    // Display all characters
    this.lu.update();
    this.zai.display();

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

    if (this.soccerBall.x > this.lu.x) {
      this.soccerBall.speed = -4;
      this.soccerBall.acceleration = 1;
      this.updateLuCount = true;
      console.log(`Lu: ${this.lu.numSoccerKicks}`);
    } else if (this.soccerBall.x < this.zai.x) {
      this.soccerBall.speed = 4;
      this.soccerBall.acceleration = -1;
      this.updateZaiCount = true;
      console.log(`Zai: ${this.zai.numSoccerKicks}`);
    }

    if (this.updateLuCount) {
      this.lu.numSoccerKicks += 1;
      this.updateLuCount = false;

      if (this.lu.numSoccerKicks > 10) {
        state = `game`;
        memoryPlaying = undefined;
      }
    } else if (this.updateZaiCount) {
      this.zai.numSoccerKicks += 1;
      this.updateZaiCount = false;
    }
  }

  // Display image
  displayCharacter(character) {
    push();
    imageMode(CENTER);
    image(character.images[character.currentIndex], character.x, character.y);
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
