/**************************************************
So you won't forget
Sharon Ku

This canvas is used in the background of the game.
Lengthier description will be provided once I actually have stuff in here!
**************************************************/

"use strict";

// State
// All possibilities: intro, game, end
let state = `game`;

// Mouse positions
let mouse = {
  x: undefined,
  y: undefined,
};

// Background color for different states
let bgFill = {
  current: {
    r: undefined,
    g: undefined,
    b: undefined,
  },
  intro: {
    r: 226,
    g: 248,
    b: 249,
  },
  game: {
    r: 226,
    g: 248,
    b: 249,
  },
  end: {
    r: 244,
    g: 208,
    b: 220,
  },
};

// Preview video in game state
let leftPreviewVideo = undefined;
let rightPreviewVideo = undefined;

let randomPendingMemory = undefined;
let randomCurrentMemory = undefined;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1280, 720);

  // left preview video
  let leftPreviewVideoProperties = {
    x: width / 4,
    y: height / 3,
  };
  leftPreviewVideo = new PreviewVideo(
    leftPreviewVideoProperties.x,
    leftPreviewVideoProperties.y,
    randomPendingMemory
  );

  // right preview video
  let rightPreviewVideoProperties = {
    x: (width * 3) / 4,
    y: height / 3,
  };
  rightPreviewVideo = new PreviewVideo(
    rightPreviewVideoProperties.x,
    rightPreviewVideoProperties.y,
    randomCurrentMemory
  );
}

// draw()
//
// Description of draw() goes here.
function draw() {
  // Set backgroun color
  background(bgFill.current.r, bgFill.current.g, bgFill.current.b);

  // Set mouse x and mouse y
  mouse.x = mouseX;
  mouse.y = mouseY;

  // Set states and their background colors
  if (state === `intro`) {
    bgFill.current = bgFill.intro;
    intro();
  } else if (state === `game`) {
    bgFill.current = bgFill.game;
    game();
  } else if (state === `end`) {
    bgFill.current = bgFill.end;
    end();
  }
}

// Here's where the player chooses their memories
function game() {
  // Drawing rectangle guides
  push();
  noFill();
  // left rectangle
  rect(0, 0, width / 2, height);
  // right rectangle
  rect(width / 2, 0, width / 2, height);
  pop();

  // Update left and right preview videos
  leftPreviewVideo.update();
  rightPreviewVideo.update();
}

function mousePressed() {
  if (state === `game`) {
    leftPreviewVideo.mousePressed();
    rightPreviewVideo.mousePressed();
  }
}

// NOT USED YET
// Returns true if mouse overlaps a rectangle
// function mouseOverlapsRectangle(mouse, rectangle) {
//   if (
//     mouse.x < rectangle.x + rectangle.width / 2 &&
//     mouse.x > rectangle.x - rectangle.width / 2 &&
//     mouse.y < rectangle.y + rectangle.height / 2 &&
//     mouse.y > rectangle.y - rectangle.height / 2
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }
