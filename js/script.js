/**************************************************
So you won't forget
Sharon Ku

Player interacts with memories and chooses whether to keep an old memory or an incoming memory.
**************************************************/

"use strict";

// State
// All possibilities: intro, game, memory, end
// let state = `game`;
let state = `memory`;

// Store name of current memory that is playing
// let memoryPlaying = undefined;
let memoryPlaying = `memoryInstaPic`;

// Mouse positions
let mouse = {
  x: undefined,
  y: undefined,
};

// Stroke color
let strokeFill = {
  r: 213,
  g: 73,
  b: 97,
};

// Fonts
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
  memory: {
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

/****************
Intro variables
*****************/
// Memorywash app thumbnails
let memorywashThumbnail = undefined;
let memorywashThumbnailImages = [];
const NUM_MEMORYWASH_THUMBNAIL_IMAGES = 2;

// Buttons in intro state
let downloadButton = undefined;

/****************
Game variables
*****************/

// Line separating left and right preview videos
let separationLine = {
  x: undefined,
  yPadding: 40,
};

// Play icon
let playIconImage = undefined;

// Preview video in game state
let leftPreviewVideo = undefined;
let rightPreviewVideo = undefined;

// // Store all preview videos here
// let previewVideos = [];
// // Total number of preview videos
// const NUM_PREVIEW_VIDEOS = 2;

// Current memories displayed in game state
let randomIncomingMemory = undefined;
let randomOldMemory = undefined;

// Store memories.json data
let memoriesList = undefined;

// Dialog box in game state
let dialogBox = undefined;

// Buttons in game state
// let deleteButton = undefined;
// let keepButton = undefined;
let winnerButtonIncoming = undefined;
let winnerButtonOld = undefined;

/****************
End variables
*****************/

// preload() --------------------------------------------
//
// Preload all assets: fonts, images, JSON files, sounds
function preload() {
  // Preload fonts
  fontStyleNormal = loadFont(`assets/fonts/BalsamiqSans-Regular.ttf`);
  fontStyleBold = loadFont(`assets/fonts/BalsamiqSans-Bold.ttf`);

  // Preload all images and sounds used in memory state (function found in allMemories.js file)
  preloadMemoryAssets();

  // Preload JSON files
  preloadJSONFiles();

  // Load Memorywash thumbnail images
  for (let i = 0; i < NUM_MEMORYWASH_THUMBNAIL_IMAGES; i++) {
    let thumbnailImage = loadImage(
      `assets/images/intro/memorywash-thumbnail${i}.png`
    );
    memorywashThumbnailImages.push(thumbnailImage);
  }

  // Load play icon image
  playIconImage = loadImage(`assets/images/play-icon.png`);
}

// Preload all JSON files
function preloadJSONFiles() {
  // Load memories JSON file
  memoriesList = loadJSON(`assets/data/memories.json`);
}

// setup() --------------------------------------------
//
// Set up canvas and create game objects
function setup() {
  // noCursor();

  let canvas = createCanvas(1280, 720);
  canvas.parent("#game-container");

  // // Set color to all strokes
  // stroke(strokeFill.r, strokeFill.g, strokeFill.b);

  // Set up global font
  textFont(fontStyleNormal);

  // Set up all intro objects
  setUpIntroObjects();

  // Set up all game objects
  setUpGameObjects();

  // Set up all memory objects (function found in allMemories.json)
  setUpMemoryObjects();

  // // Take a screenshot of the canvas
  // setTimeout(() => {
  //   saveCanvas(canvas, "myCanvas", "jpg");
  // }, 2000);
}

// Set up all intro objects
function setUpIntroObjects() {
  // Create Memorywash thumbnail
  memorywashThumbnail = new MemorywashThumbnail(
    width / 2,
    height / 2,
    memorywashThumbnailImages
  );

  // Create download button
  let downloadButtonProperties = {
    x: memorywashThumbnail.x,
    y: memorywashThumbnail.y + 200,
  };
  downloadButton = new DownloadButton(downloadButtonProperties);
}

// Set up all game objects
function setUpGameObjects() {
  // Fetch the first incoming and old memory
  fetchRandomIncomingMemory();
  fetchRandomOldMemory();

  // Create left preview video
  let leftPreviewVideoProperties = {
    x: width / 4,
    y: height / 2,
    section: `INCOMING MEMORY`,
    // instructions: `Make room for this memory.`,
    instructions: ``,
    playIconImage: playIconImage,
    memoryName: randomIncomingMemory,
  };
  leftPreviewVideo = new PreviewVideo(leftPreviewVideoProperties);

  // Create right preview video
  let rightPreviewVideoProperties = {
    x: (width * 3) / 4,
    y: height / 2,
    section: `OLD MEMORY`,
    // instructions: `Delete memories that burden you.`,
    instructions: ``,
    playIconImage: playIconImage,
    memoryName: randomOldMemory,
  };
  rightPreviewVideo = new PreviewVideo(rightPreviewVideoProperties);

  // // Store left and right preview videos in array
  // previewVideos.push(leftPreviewVideo, rightPreviewVideo);

  // // Create delete button
  // let deleteButtonProperties = {
  //   x: rightPreviewVideoProperties.x - 110,
  //   y: rightPreviewVideo.y + rightPreviewVideo.height / 2 + 80,
  //   memoryName: randomOldMemory,
  // };
  // deleteButton = new DeleteButton(deleteButtonProperties);
  //
  // // Create keep button
  // let keepButtonProperties = {
  //   x: rightPreviewVideoProperties.x + 110,
  //   y: rightPreviewVideo.y + rightPreviewVideo.height / 2 + 80,
  //   memoryName: randomOldMemory,
  // };
  // keepButton = new KeepButton(keepButtonProperties);

  // Create winner buttons
  let winnerButtonIncomingProperties = {
    x: leftPreviewVideoProperties.x,
    y: leftPreviewVideo.y + leftPreviewVideo.height / 2 + 80,
    memoryName: randomIncomingMemory,
  };
  winnerButtonIncoming = new WinnerButton(winnerButtonIncomingProperties);

  let winnerButtonOldProperties = {
    x: rightPreviewVideoProperties.x,
    y: rightPreviewVideo.y + rightPreviewVideo.height / 2 + 80,
    memoryName: randomOldMemory,
  };
  winnerButtonOld = new WinnerButton(winnerButtonOldProperties);
}

// Fetch a random incoming memory from memories.json
function fetchRandomIncomingMemory() {
  randomIncomingMemory = random(memoriesList.incomingMemories);
}

// Fetch a random old memory from memories.json
function fetchRandomOldMemory() {
  randomOldMemory = random(memoriesList.oldMemories);
}

// draw() --------------------------------------------
//
// Set up background colors and states
function draw() {
  // Set background color
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
  } else if (state === `memory`) {
    bgFill.current = bgFill.memory;
    memory();
  } else if (state === `end`) {
    bgFill.current = bgFill.end;
    end();
  }

  // Cue memory based on which memory is playing
  cueMemory();
}

/****************
Intro state:
Here's where the player downloads Memorywash and views the intro video
*****************/

function intro() {
  // Update memorywash thumbnail
  memorywashThumbnail.update();

  // Update download button
  downloadButton.update(mouse);

  // // Display "Download" text
  // let downloadStringProperties = {
  //   string: `Download`,
  //   fill: {
  //     r: 0,
  //     g: 0,
  //     b: 0,
  //   },
  //   size: 20,
  //   x: width / 2,
  //   y: height / 2 + 200,
  //   width: 300,
  //   height: 100,
  // };
  //
  // displayText(downloadStringProperties);
}

// // Display text
// function displayText(string) {
//   push();
//   fill(string.fill.r, string.fill.g, string.fill.b);
//   textAlign(CENTER);
//   rectMode(CENTER);
//   textSize(string.size);
//   textFont(fontStyleBold);
//   text(string.string, string.x, string.y, string.width, string.height);
//   pop();
// }

// Download app
function downloadApp() {
  console.log(`App is downloading`);
}

/****************
Game state:
Here's where the player chooses their memories
*****************/

function game() {
  // // Drawing rectangle guides
  // push();
  // noFill();
  // // left rectangle
  // rect(0, 0, width / 2, height);
  // // right rectangle
  // rect(width / 2, 0, width / 2, height);
  // pop();

  separationLine.x = width / 2;
  // Draw separation line
  push();
  strokeWeight(5);
  stroke(strokeFill.r, strokeFill.g, strokeFill.b);
  line(
    separationLine.x,
    separationLine.yPadding,
    separationLine.x,
    height - separationLine.yPadding
  );
  pop();

  // Update left and right preview videos
  leftPreviewVideo.update(mouse);
  rightPreviewVideo.update(mouse);

  // Change cursor to pointer when mouse hovers over preview video
  if (leftPreviewVideo.hovered || rightPreviewVideo.hovered) {
    cursor(`pointer`);
  } else {
    cursor(`default`);
  }

  // // Update left and right preview videos
  // for (let i = 0; i < previewVideos.length; i++) {
  //   previewVideos[i].update(mouse);
  // }

  // Update winner buttons
  winnerButtonIncoming.update(mouse);
  winnerButtonOld.update(mouse);

  //   // Update delete and keep buttons
  //   deleteButton.update(mouse);
  //   keepButton.update(mouse);
}

/****************
Memory state:
Here's where a memory plays.
*****************/

function memory() {}

/****************
Mouse pressed:
Handles what happens when player clicks on mouse.
*****************/

function mousePressed() {
  if (state === `intro`) {
    downloadButton.mousePressed(mouse);
  } else if (state === `game`) {
    leftPreviewVideo.mousePressed(mouse);
    rightPreviewVideo.mousePressed(mouse);
    // // Update left and right preview videos
    // for (let i = 0; i < previewVideos.length; i++) {
    //   previewVideos[i].mousePressed(mouse);
    // }
  } else if (state === `memory`) {
    dialogBox.mousePressed(mouse);

    if (memoryPlaying === `memoryFathersDay`) {
      memoryFathersDay.mousePressed(mouseX, mouseY);
    }

    if (memoryPlaying === `memoryInstaPic`) {
      memoryInstaPic.mousePressed(mouseX, mouseY);
    }
  }
}

// function mousePressed() {
//   memoryFathersDay.mousePressed(mouseX, mouseY);
// }

function mouseReleased() {
  if (state === `memory`) {
    if (memoryPlaying === `memoryFathersDay`) {
      memoryFathersDay.mouseNotPressed();
    }
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
