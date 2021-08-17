// Phone in Insta Pic memory

class Phone {
  constructor({ phoneImages, cameraButtonImage }) {
    // image
    this.phoneImages = phoneImages;
    this.currentIndex = 0;
    // position
    this.x = width / 2;
    this.y = height / 2;

    // Camera button
    this.cameraButton = {
      image: cameraButtonImage,
      xOffset: 0,
      yOffset: 180,
      display: true,
    };
  }

  // Update all behaviour
  update(mouseX, mouseY) {
    // Display
    this.display();

    if (this.cameraButton.display) {
      this.displayCameraButton();

      // Remove overlap verification on camera button
      // this.mouseOverlapsWithCameraButton(mouseX, mouseY);
    }
  }

  // Display phone
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(this.phoneImages[this.currentIndex], 0, 0);
    pop();
  }

  // Display camera button image
  displayCameraButton() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(
      this.cameraButton.image,
      this.cameraButton.xOffset,
      this.cameraButton.yOffset
    );
    pop();
  }

  mousePressed(mouseX, mouseY, textField) {
    if (
      this.mouseOverlapsWithCameraButton(mouseX, mouseY) &&
      this.cameraButton.display
    ) {
      this.currentIndex += 1;
      // Stop displaying camera button
      this.cameraButton.display = false;
      // Display caption text area
      textField.style(`display`, `block`);
    }
  }

  mouseOverlapsWithCameraButton(mouseX, mouseY) {
    if (
      mouseX >
        this.x +
          this.cameraButton.xOffset -
          this.cameraButton.image.width / 2 &&
      mouseX <
        this.x +
          this.cameraButton.xOffset +
          this.cameraButton.image.width / 2 &&
      mouseY >
        this.y +
          this.cameraButton.yOffset -
          this.cameraButton.image.height / 2 &&
      mouseY <
        this.y + this.cameraButton.yOffset + this.cameraButton.image.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}
