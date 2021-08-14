// Dialog box that pops up when showing a memory

class DialogBox {
  constructor(x, y) {
    // Stores current dialog number
    this.currentDialogNumber = 0;

    // Positions of rectangle for preview video
    this.x = x;
    this.y = y;
    // Size of rectangle
    this.width = width - 300;
    this.height = height / 6;
    // Rounded corner
    this.cornerRadius = 10;
    // Color of rectangle: white
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
    // Stroke properties of rectangle
    this.stroke = {
      weight: 5,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
    };

    // Colors of characters
    this.color = {
      lu: {
        r: 213,
        g: 73,
        b: 97,
      },
      zai: {
        r: 0,
        g: 73,
        b: 97,
      },
      daddy: {
        r: 0,
        g: 0,
        b: 0,
      },
    };

    // Speaker of dialog
    this.speaker = {
      string: `speaker's name`,
      fill: {
        r: 255,
        g: 255,
        b: 255,
      },
      size: 24,
      // position offset from rectangle's position
      xOffset: 40,
      yOffset: -10,
      // box behind speaker label
      box: {
        width: 200,
        height: 40,
        cornerRadius: 30,
        fill: {
          r: 213,
          g: 73,
          b: 97,
        },
        // position offset from rectangle's position
        xOffset: -this.width / 2 + 30,
        yOffset: -this.height / 2 - 19,
      },
    };

    // Dialog text
    this.text = {
      string: `hello, how are you doing? hello, how are you doing?hello, how are you doing?hello, how are you doing?hello, how are you doing?hello, how are you doing?hello, how are you doing?`,
      fill: {
        r: 213,
        g: 73,
        b: 97,
      },
      size: 24,
      // position offset from rectangle's position
      xOffset: 40,
      yOffset: 30,
    };
  }

  // Update all behaviours of box
  update(dialogsList) {
    // Display box
    this.displayBox();

    // Set dialog color based on who is talking
    this.setDialogColor();

    this.speaker.string =
      dialogsList.incomingMemories[0].dialogs[this.currentDialogNumber].speaker;
    this.text.string =
      dialogsList.incomingMemories[0].dialogs[this.currentDialogNumber].dialog;

    // Display box containing speaker name
    this.displaySpeakerBox(this.speaker.box);

    // Display speaker name
    this.displayText(this.speaker);

    // Display dialog text
    this.displayText(this.text);
  }

  // Set dialog color based on who is talking
  setDialogColor() {
    if (this.speaker.string === `Lu`) {
      this.stroke.fill = this.color.lu;
      this.text.fill = this.color.lu;
      this.speaker.box.fill = this.color.lu;
    } else if (this.speaker.string === `Daddy`) {
      this.stroke.fill = this.color.daddy;
      this.text.fill = this.color.daddy;
      this.speaker.box.fill = this.color.daddy;
    } else if (this.speaker.string === `Zai`) {
      this.stroke.fill = this.color.zai;
      this.text.fill = this.color.zai;
      this.speaker.box.fill = this.color.zai;
    }
  }

  // Display speaker box as rectangle
  displaySpeakerBox(box) {
    // Display rectangle for preview video
    push();
    fill(box.fill.r, box.fill.g, box.fill.b);
    noStroke();
    rect(
      this.x + this.speaker.box.xOffset,
      this.y + this.speaker.box.yOffset,
      box.width,
      box.height,
      box.cornerRadius
    );
    pop();
  }

  // Display box as rectangle
  displayBox() {
    // Display rectangle for preview video
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    strokeWeight(this.stroke.weight);
    stroke(this.stroke.fill.r, this.stroke.fill.g, this.stroke.fill.b);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height, this.cornerRadius);
    pop();
  }

  // Display text
  displayText(string) {
    push();
    fill(string.fill.r, string.fill.g, string.fill.b);
    // textAlign(CENTER);
    rectMode(CENTER);
    textSize(string.size);
    textFont(fontStyleBold);
    text(
      string.string,
      this.x + string.xOffset / 4,
      this.y + string.yOffset / 4,
      this.width - string.xOffset * 2,
      this.height - string.yOffset * 2
    );
    pop();
  }

  // When mouse pressed on preview video, play next dialog
  mousePressed(mouse) {
    if (this.mouseOverlapsRectangle(mouse)) {
      this.currentDialogNumber += 1;
    }
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
