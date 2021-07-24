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

// preload()
//
// Preload assets
function preload() {
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

  // Fetch the first pending and current memory
  fetchRandomPendingMemory();
  fetchRandomCurrentMemory();

  // Create left preview video
  let leftPreviewVideoProperties = {
    x: width / 4,
    y: height / 2,
    section: `PENDING MEMORIES`,
    instructions: `Make room for this memory.`,
  };
  leftPreviewVideo = new PreviewVideo(
    leftPreviewVideoProperties.x,
    leftPreviewVideoProperties.y,
    leftPreviewVideoProperties.section,
    leftPreviewVideoProperties.instructions,
    playIconImage,
    randomPendingMemory
  );

  // Create right preview video
  let rightPreviewVideoProperties = {
    x: (width * 3) / 4,
    y: height / 2,
    section: `CURRENT MEMORIES`,
    instructions: `Delete memories that burden you.`,
  };
  rightPreviewVideo = new PreviewVideo(
    rightPreviewVideoProperties.x,
    rightPreviewVideoProperties.y,
    rightPreviewVideoProperties.section,
    rightPreviewVideoProperties.instructions,
    playIconImage,
    randomCurrentMemory
  );

  // // Store left and right preview videos in array
  // previewVideos.push(leftPreviewVideo, rightPreviewVideo);

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
  leftPreviewVideo.update(mouse);
  rightPreviewVideo.update(mouse);

  // // Update left and right preview videos
  // for (let i = 0; i < previewVideos.length; i++) {
  //   previewVideos[i].update(mouse);
  // }
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
