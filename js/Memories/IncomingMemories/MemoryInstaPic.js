// Insta pic memory playing in memory state

class MemoryInstaPic {
  constructor(
    saladImage,
    phoneImages,
    cameraButtonImage,
    heartEmojiImage,
    instaCheckmarkImage
  ) {
    // Characters in this scene ---------
    // All characters
    // this.characters = [];

    // Objects in this scene ---------
    this.saladBackground = {
      image: saladImage,
      x: width / 2,
      y: height / 2,
    };

    // Phone
    this.phoneProperties = {
      phoneImages: phoneImages,
      cameraButtonImage: cameraButtonImage,
    };
    this.phone = new Phone(this.phoneProperties);

    // Heart emoji
    this.heartemojis = [];

    // TO PROGRAM FOR HEART EMOJIS
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

    // Insta checkmark
    this.instaCheckmark = {
      image: instaCheckmarkImage,
      x: width / 2 + 120,
      y: height / 2 + 230,
      display: true,
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
    //
    // for (let i = 0; i < this.singleDecorations.length; i++) {
    //   this.singleDecorations[i].update();
    // }
    //
    // for (let i = 0; i < this.multipleDecorations.length; i++) {
    //   this.multipleDecorations[i].update();
    // }
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
    this.phone.mousePressed(mouseX, mouseY);

    if (
      this.mouseOverlapsWithInstaCheckmark(mouseX, mouseY, this.instaCheckmark)
    ) {
      this.phone.currentIndex += 1;
      // Stop displaying checkmark
      this.instaCheckmark.display = false;
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
