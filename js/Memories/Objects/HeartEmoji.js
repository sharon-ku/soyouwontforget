// Heart emoji in Insta Pic memory
class HeartEmoji {
  constructor(heartEmojiImage) {
    this.image = heartEmojiImage;

    // position information
    this.x = width / 2 + 8.5;
    this.y = height / 2 + 268;
    // velocity information
    this.vx = 0;
    this.vy = 0;
    this.speed = random(1, 3);
    // height hearts need to fly before they disappear
    this.disapperanceHeight = 100;
  }

  // Update heart's behaviour
  update() {
    // let heart fly
    this.fly();
    // display heart
    this.display();
  }

  // Let heart fly!
  fly() {
    this.vy = -this.speed;

    let change = random();
    if (change < 0.2) {
      this.vx = random(-this.speed, this.speed);
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  // Display heart image
  display() {
    push();
    imageMode(CENTER);
    // tint(random(0, 255), random(0, 255), random(0, 255));
    tint(255, 105, random(0, 255));
    scale(0.8);
    image(this.image, this.x, this.y);
    pop();
  }
}
