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

// Font
let fontStyleNormal = undefined;
let fontStyleBold = undefined;

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
    r: 255,
    g: 249,
    b: 230,
  },
  end: {
    r: 244,
    g: 208,
    b: 220,
  },
};

// Stroke color
let strokeFill = {
  r: 213,
  g: 73,
  b: 97,
};

let playIconImage = undefined;

// Preview video in game state
let leftPreviewVideo = undefined;
let rightPreviewVideo = undefined;

// // Store all preview videos here
// let previewVideos = [];
// // Total number of preview videos
// const NUM_PREVIEW_VIDEOS = 2;

// Current memories displayed in game state
let randomPendingMemory = undefined;
let randomCurrentMemory = undefined;

// Store memories.json data
let memoriesList = undefined;

// Store name of current memory that is playing
let memoryPlaying = undefined;

// Buttons in game state
let deleteButton = undefined;
let keepButton = undefined;

// preload()
//
// Preload assets
function preload() {
  // Load text font
  fontStyleNormal = loadFont(`assets/fonts/BalsamiqSans-Regular.ttf`);
  fontStyleBold = loadFont(`assets/fonts/BalsamiqSans-Bold.ttf`);

  // Load memories JSON file
  memoriesList = loadJSON(`assets/data/memories.json`);

  // Load play icon image
  playIconImage = loadImage(`assets/images/play-icon.png`);
}

// setup()
//
// Set up canvas and create game objects
function setup() {
  // noCursor();

  createCanvas(1280, 720);

  // Set up font for everything
  textFont(fontStyleNormal);

  // // Set color to all strokes
  // stroke(strokeFill.r, strokeFill.g, strokeFill.b);

  // Fetch the first pending and current memory
  fetchRandomPendingMemory();
  fetchRandomCurrentMemory();

  // Create left preview video
  let leftPreviewVideoProperties = {
    x: width / 4,
    y: height / 2,
    section: `PENDING MEMORIES`,
    instructions: `Make room for this memory.`,
    playIconImage: playIconImage,
    memoryName: randomPendingMemory,
  };
  leftPreviewVideo = new PreviewVideo(leftPreviewVideoProperties);

  // Create right preview video
  let rightPreviewVideoProperties = {
    x: (width * 3) / 4,
    y: height / 2,
    section: `CURRENT MEMORIES`,
    instructions: `Delete memories that burden you.`,
    playIconImage: playIconImage,
    memoryName: randomCurrentMemory,
  };
  rightPreviewVideo = new PreviewVideo(rightPreviewVideoProperties);

  // // Store left and right preview videos in array
  // previewVideos.push(leftPreviewVideo, rightPreviewVideo);

  // Create delete button
  let deleteButtonProperties = {
    x: rightPreviewVideoProperties.x - 110,
    y: rightPreviewVideo.y + rightPreviewVideo.height / 2 + 80,
    memoryName: randomCurrentMemory,
  };
  deleteButton = new DeleteButton(deleteButtonProperties);

  // Create keep button
  let keepButtonProperties = {
    x: rightPreviewVideoProperties.x + 110,
    y: rightPreviewVideo.y + rightPreviewVideo.height / 2 + 80,
    memoryName: randomCurrentMemory,
  };
  keepButton = new KeepButton(keepButtonProperties);

  // Create all objects in memories (game state)
  createAllMemoryObjects();
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

  // Cue memory based on which memory is playing
  cueMemory();
}

// let separationLine = {
//   x1:
// }

// Here's where the player chooses their memories
function game() {
  // // Drawing rectangle guides
  // push();
  // noFill();
  // // left rectangle
  // rect(0, 0, width / 2, height);
  // // right rectangle
  // rect(width / 2, 0, width / 2, height);
  // pop();

  // Draw separation line
  push();
  strokeWeight(5);
  stroke(strokeFill.r, strokeFill.g, strokeFill.b);
  line(width / 2, 40, width / 2, height - 40);
  pop();

  // Update left and right preview videos
  leftPreviewVideo.update(mouse);
  rightPreviewVideo.update(mouse);

  // // Update left and right preview videos
  // for (let i = 0; i < previewVideos.length; i++) {
  //   previewVideos[i].update(mouse);
  // }

  // Update delete and keep buttons
  deleteButton.update(mouse);
  keepButton.update(mouse);
}

function mousePressed() {
  if (state === `game`) {
    leftPreviewVideo.mousePressed(mouse);
    rightPreviewVideo.mousePressed(mouse);
    // // Update left and right preview videos
    // for (let i = 0; i < previewVideos.length; i++) {
    //   previewVideos[i].mousePressed(mouse);
    // }
  }
}

// Fetch a random pending memory from memories.json
function fetchRandomPendingMemory() {
  randomPendingMemory = random(memoriesList.pendingMemories);
}

// Fetch a random current memory from memories.json
function fetchRandomCurrentMemory() {
  randomCurrentMemory = random(memoriesList.currentMemories);
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
