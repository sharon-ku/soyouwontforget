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
    };
  }

  // Update all behaviour
  update() {
    // Display
    this.display();

    this.displayCameraButton();
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
}
