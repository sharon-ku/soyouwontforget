// Insta pic memory playing in memory state

/**** ATTRIBUTION ------------
The code for the flying heart emojis was copied and modified from a previous code I made for flying butterflies (used in my portfolio website!)
******/

// Used when user types caption
let textField;
let output;

class MemoryInstaPic {
  constructor(
    saladImage,
    phoneImages,
    cameraButtonImage,
    heartEmojiImage,
    instaCheckmarkImage,
    whiteFilterImage,
    instaPicDialogs
  ) {
    // Sounds -------------------
    this.dialogs = instaPicDialogs;

    // Characters in this scene ---------
    // All characters
    // this.characters = [];

    // Objects in this scene ---------
    this.saladBackground = {
      image: saladImage,
      x: width / 2,
      y: height / 2,
    };

    // White filter used for transition from memory to game
    this.whiteFilter = {
      image: whiteFilterImage,
      x: width / 2,
      y: height / 2,
      opacity: {
        current: 0,
        max: 255,
      },
      delayToReveal: 5000,
      display: false,
    };

    // Phone
    this.phoneProperties = {
      phoneImages: phoneImages,
      cameraButtonImage: cameraButtonImage,
    };
    this.phone = new Phone(this.phoneProperties);

    // Keep track of what user types in textField
    textField = select(`#type-caption`);
    textField.input(this.updateCaption);

    // Insta checkmark
    this.instaCheckmark = {
      image: instaCheckmarkImage,
      x: width / 2 + 120,
      y: height / 2 + 230,
      display: true,
    };

    // Caption
    this.caption = {
      string: `hello, how are you doing? hello, how are you doing?hello, how are you doing?hello, how are you doing?hello, how are you doing?hello, how are you doing?hello, how are you doing?`,
      fill: {
        r: 0,
        g: 0,
        b: 0,
      },
      size: 18,
      // position offset from rectangle's position
      xOffset: 19,
      yOffset: 310,
    };

    // Heart emoji
    this.hearts = [];
    // keeping track of frames to know when to release new heart
    this.heartFrames = {
      elapsed: 40,
      neededToReleaseNewHeart: 50,
    };
    this.heartImage = heartEmojiImage;

    // Number of likes
    this.numLikes = 0;
    // frames elapsed for likes animation
    this.framesElapsed = 0;
    this.framesBtwEachLike = 10;
    // likes string info
    this.likes = {
      string: undefined,
      fill: {
        r: 100,
        g: 100,
        b: 100,
      },
      size: 20,
      // position offset from rectangle's position
      xOffset: 19,
      yOffset: 287,
    };
  }

  // Update all behaviours
  update() {
    // Display full-canvas background image of salad
    this.displayPicture(this.saladBackground);

    // Display all characters
    // NONE

    // Display all objects
    this.phone.update(mouseX, mouseY);

    // Display insta checkmark
    if (this.phone.currentIndex === 1 && this.instaCheckmark.display) {
      this.displayPicture(this.instaCheckmark);
    }

    if (this.phone.currentIndex === 2) {
      // Display caption and number of likes
      this.displayText(this.caption, output);
      this.displayText(this.likes, `${this.numLikes} likes`);

      // Update number of likes
      this.framesElapsed++;
      if (this.framesElapsed === this.framesBtwEachLike) {
        this.numLikes += 1;
        this.framesElapsed = 0;
      }

      // Display the flying hearts
      this.displayFlyingHearts();

      // If time to show white filter, reveal it
      if (this.whiteFilter.display) {
        this.revealWhiteFilter(this.whiteFilter);
      }
    }
  }

  // Reveal white filter by increasing its opacity
  revealWhiteFilter(picture) {
    push();
    imageMode(CENTER);
    tint(255, picture.opacity.current);
    image(picture.image, picture.x, picture.y);
    pop();

    if (picture.opacity.current < picture.opacity.max) {
      picture.opacity.current++;
    } else if (picture.opacity.current >= picture.opacity.max) {
      state = `game`;
      memoryPlaying = undefined;
    }
  }

  // Display hearts and let them fly
  displayFlyingHearts() {
    // If it's time to release hearts, create hearts at an interval of time
    // Increase frames elapsed
    this.heartFrames.elapsed++;
    // Once frames elapsed is equal to frames needed to switch between the images, update current wheels image
    if (this.heartFrames.elapsed === this.heartFrames.neededToReleaseNewHeart) {
      // Create new heart
      let heart = new HeartEmoji(this.heartImage);
      this.hearts.push(heart);
      // Reset frames elapsed to zero
      this.heartFrames.elapsed = 0;
    }

    // Display hearts and let them fly
    // Also remove heart from array if it goes off canvas
    for (let i = 0; i < this.hearts.length; i++) {
      let heart = this.hearts[i];
      // let heart fly and display it
      heart.update();

      // If heart goes off canvas, remove it from hearts array
      if (heart.y < 0) {
        this.hearts.splice(i, 1);
      }
    }
  }

  // Update output when user changes textField text
  updateCaption() {
    // Set text field's font color from grey to black
    textField.style(`color`, `black`);

    // Update output value
    output = textField.value();
  }

  // Display text
  displayText(stringProperties, string) {
    push();
    fill(
      stringProperties.fill.r,
      stringProperties.fill.g,
      stringProperties.fill.b
    );
    // textAlign(CENTER);
    rectMode(CENTER);
    textSize(stringProperties.size);

    text(
      string,
      this.phone.x + stringProperties.xOffset,
      this.phone.y + stringProperties.yOffset,
      this.phone.phoneImages[0].width - stringProperties.xOffset * 4,
      this.phone.phoneImages[0].height - stringProperties.yOffset
    );
    pop();
  }

  // Display picture
  displayPicture(picture) {
    push();
    imageMode(CENTER);
    image(picture.image, picture.x, picture.y);
    pop();
  }

  // When mouse pressed on preview video, play the memory
  mousePressed(mouseX, mouseY) {
    this.phone.mousePressed(mouseX, mouseY, textField);

    if (
      this.mouseOverlapsWithInstaCheckmark(mouseX, mouseY, this.instaCheckmark)
    ) {
      this.phone.currentIndex += 1;
      // Stop displaying checkmark and textField
      this.instaCheckmark.display = false;
      textField.style(`display`, `none`);
      this.dialogs[0].play();

      // Reveal white filter after a delay
      setTimeout(() => {
        this.whiteFilter.display = true;
      }, this.whiteFilter.delayToReveal);
    }
  }

  // Returns true if mouse overlaps with picture
  mouseOverlapsWithInstaCheckmark(mouseX, mouseY, picture) {
    if (
      mouseX > picture.x - picture.image.width / 2 &&
      mouseX < picture.x + picture.image.width / 2 &&
      mouseY > picture.y - picture.image.height / 2 &&
      mouseY < picture.y + picture.image.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
