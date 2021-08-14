// Memory playing in game state

class MemoryTest {
  constructor(luImages, zaiImages) {
    // this.x = width / 2;
    // this.y = height / 2;
    // this.width = width;
    // this.height = height;
    // this.memory = memoryName;
    // this.fill = {
    //   r: 0,
    //   g: 0,
    //   b: 0,
    // };

    // position
    // this.x = x;
    // this.y = y;

    // Characters in this scene ---------
    // Lu
    this.luProperties = {
      images: luImages,
      x: 50,
      y: height / 2,
      currentIndex: 0,
    };
    this.lu = new Lu(this.luProperties);

    // Zai
    this.zaiProperties = {
      images: zaiImages,
      x: 200,
      y: height / 2,
      currentIndex: 0,
    };
    this.zai = new Zai(this.zaiProperties);

    // Objects in this scene ---------

    // this.lu = {
    //   x: 50,
    //   y: height / 2,
    //   images: luImages,
    //   currentIndex: 0,
    // };
    //
    // this.zai = {
    //   x: 200,
    //   y: height / 2,
    //   images: zaiImages,
    //   currentIndex: 0,
    // };
  }

  // Update all behaviours
  update() {
    // Display all characters
    this.lu.display();
    this.zai.display();

    // Display all objects

    // this.displayCharacter(this.lu);
    // this.displayCharacter(this.zai);
  }

  // Display image
  displayCharacter(character) {
    push();
    imageMode(CENTER);
    image(character.images[character.currentIndex], character.x, character.y);
    pop();
  }

  // // Display circle
  // displayBlurryCircle(character) {
  //   push();
  //   fill(character.fill.r, character.fill.g, character.fill.b);
  //   ellipse(character.x, character.y, character.size);
  //   // filter(BLUR, 6);
  //   pop();
  // }

  // When mouse pressed on preview video, play the memory
  mousePressed() {
    // if (this.mouseOverlapsRectangle(mouse)) {
    //   this.playMemory();
    // }
  }

  // Play the memory
  play() {
    console.log(`playing a memory`);
  }

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
