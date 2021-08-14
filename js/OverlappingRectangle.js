// Parent of all rectangles that overlap (e.g. buttons)

class OverlappingRectangle {
  constructor(x, y) {
    // Position of rectangle
    this.x = x;
    this.y = y;

    // Size of rectangle
    this.width = undefined;
    this.height = undefined;
  }

  // Returns true if mouse overlaps rectangle
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
