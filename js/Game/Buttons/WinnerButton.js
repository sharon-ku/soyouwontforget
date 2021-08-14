// Winner button in game state: player clicks on it to choose which memory wins

class WinnerButton extends Button {
  constructor({ x, y, memoryName }) {
    super({ x, y, memoryName });
    // Color of rectangle: blue
    this.fill = {
      r: 254,
      g: 189,
      b: 195,
    };

    // Memory to be played when video clicked
    // this.memoryFileName = memoryName.memoryFileName;

    // Title shown under preview video
    this.title = {
      // name: memoryName.previewVideoTitle,
      name: `WINNER`,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
      size: 25,
      // position offset from rectangle's position
      xOffset: 0,
      yOffset: -3,
    };
  }
}
