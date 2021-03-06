/**************************************************
So you won't forget
Sharon Ku

Player interacts with memories and chooses whether to keep an old memory or an incoming memory.

*ATTRIBUTIONS*
Background music:
Going different ways by Eric Matyas
www.soundimage.org

**************************************************/

"use strict";

// State
// All possibilities: intro, game, memory, end
let state = `intro`;
// let state = `memory`;

// Store name of current memory that is playing
let memoryPlaying = undefined;
// let memoryPlaying = `memoryMakingBao`;

// let memoryGroup = `cooking`;
let currentMemoryGroupIndex = 0;

// Count number of happy and sad memories clicked
let numHappyMemoriesClicked = 0;
let numSadMemoriesClicked = 0;
let numTotalMemoriesClicked = 0;

// Total number of memories that need to be cleared
let maxMemoriesToClear = undefined;

// SOUND-RELATED VARIABLES -------------------
// Background music and volume
let backgroundMusic = undefined;
let backgroundMusicVolume = {
  current: 0.02, //0.3
  min: undefined, //0.2
  max: undefined, //0.5
};

// Landmark stroke color
const LANDMARK_STROKE_FILL = {
  r: 241,
  g: 142,
  b: 48,
};

// Landmark stroke weight
const LANDMARK_STROKE_WEIGHT = 5;

// Used for ml5 -----------------------
// Faceapi object
let faceapi = undefined;
// The user's webcam
let video = undefined;
// Store all detections
let detections;
// Modifying detection options (by default, they are set to true)
const DETECTION_OPTIONS = {
  withLandmarks: true,
  withDescriptors: false,
};

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
    r: 220,
    g: 220,
    b: 220,
  },
  black: {
    r: 0,
    g: 0,
    b: 0,
  },
  // sky blue
  introInstallApp: {
    r: 168,
    g: 227,
    b: 245,
  },
  game: {
    r: 255,
    g: 255,
    b: 255,
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

// All possibilties: introTitle, introNotification, introInstallApp, introNibbuSpeech
let introSubstate = `introTitle`;

// gif with "soyouwontforget"
let introTitleImage = undefined;
// video of poem
let introPoemVideo = undefined;
let introPoemVideoPlaying = false;

let introKnockSound = undefined;
let introKnockSoundVolume = 0.05;

// Captain Nibbu's dialog box
let introDialogBox = undefined;
// Store intro-dialogs.json data
let introDialogsList = undefined;
// Keep track of current intro dialog
let currentIntroDialogIndex = 0;

// Memorywash app thumbnails
let memorywashThumbnail = undefined;
let memorywashThumbnailImages = [];
const NUM_MEMORYWASH_THUMBNAIL_IMAGES = 2;

let memorywashInstallImage = undefined;
let memorywashInterfaceImage = undefined;
let fullCapacityImage = undefined;

// flashing dots in intro
let dots = [];
let numDots = 20;

// Buttons in intro state
let startButton = undefined;
let proceedButton = undefined;
let installButton = undefined;
// no longer used, but kept for reference
// let downloadButton = undefined;

// True when time to display notification
let introNotificationDisplay = false;
let rectScale = 1;
let rectScaleIncrease = 0;

let introLoadingBar = undefined;
let introLoadingText = undefined;
// checks if installing is true or false
let installing = false;
// store interval for loading messages to update
let loadingMessageInterval = undefined;

// Captain Nibbu images
const NUM_NIBBU_IMAGES = 8;
let nibbuImages = [];
let nibbuCurrentImageIndex = 0;

/****************
Game variables
*****************/

// Line separating left and right preview videos
let separationLine = {
  x: undefined,
  yPaddingTop: 170,
  yPaddingBottom: 170,
};

// Play icon
let playIconImage = undefined;

// // to be deleted: kept here for reference
// // Preview video in game state
// let leftPreviewVideo = undefined;
// let rightPreviewVideo = undefined;

// Memory box in game state
let leftMemoryBox = undefined;
let rightMemoryBox = undefined;

// Keeps track of how much storage user has
let memoryStorageBar = undefined;

// // Store all preview videos here
// let previewVideos = [];
// // Total number of preview videos
// const NUM_PREVIEW_VIDEOS = 2;

// // to be deleted: kept here for ref
// // Current memories displayed in game state
// let currentIncomingMemory = undefined;
// let currentOldMemory = undefined;

// Current memories displayed in game state
// let currentLeftMemory = undefined;
// let currentRightMemory = undefined;
let currentMemoryInfo = undefined;
let currentLeftMemoryCategory = undefined;
let currentRightMemoryCategory = undefined;

// Store memories.json data
let memoriesList = undefined;

// Dialog box in game state
let dialogBox = undefined;

// Buttons in game state
// let deleteButton = undefined;
// let keepButton = undefined;
// let winnerButtonIncoming = undefined;
// let winnerButtonOld = undefined;

/****************
End variables
*****************/

// preload() --------------------------------------------
//
// Preload all assets: fonts, images, JSON files, sounds
function preload() {
  // Preload fonts
  // fontStyleNormal = loadFont(`assets/fonts/BalsamiqSans-Regular.ttf`);
  // fontStyleBold = loadFont(`assets/fonts/BalsamiqSans-Bold.ttf`);
  fontStyleNormal = loadFont(`assets/fonts/Inter-Regular.ttf`);
  fontStyleBold = loadFont(`assets/fonts/Inter-Bold.ttf`);

  // Preload all images and sounds in intro
  preloadIntroAssets();

  // Preload all images and sounds used in memory state (function found in allMemories.js file)
  preloadMemoryAssets();

  // Preload JSON files
  preloadJSONFiles();

  // Load Memorywash install image
  memorywashInstallImage = loadImage(`assets/images/intro/install.png`);

  // Load Memorywash interface image
  memorywashInterfaceImage = loadImage(`assets/images/game/interface.png`);
  // Load Memorywash full capacity image
  fullCapacityImage = loadImage(`assets/images/game/full-capacity.png`);

  // // Load Memorywash thumbnail images
  // for (let i = 0; i < NUM_MEMORYWASH_THUMBNAIL_IMAGES; i++) {
  //   let thumbnailImage = loadImage(
  //     `assets/images/intro/memorywash-thumbnail${i}.png`
  //   );
  //   memorywashThumbnailImages.push(thumbnailImage);
  // }

  // Load Captain Nibbu images
  for (let i = 0; i < NUM_NIBBU_IMAGES; i++) {
    let nibbuImage = loadImage(`assets/images/intro/nibbu/nibbu${i}.png`);
    nibbuImages.push(nibbuImage);
  }

  // Load play icon image
  playIconImage = loadImage(`assets/images/play-icon.png`);
}

// Preload all images and sounds in intro
function preloadIntroAssets() {
  // Load background music
  backgroundMusic = loadSound(`assets/sounds/going-different-ways-looping.mp3`);

  introKnockSound = loadSound(`assets/sounds/knock.mp3`);

  introTitleImage = loadImage(`assets/images/intro/title.gif`);
}

// Preload all JSON files
function preloadJSONFiles() {
  // Load intro dialog JSON file
  introDialogsList = loadJSON(`assets/data/intro-dialogs.json`);

  // Load memories JSON file
  memoriesList = loadJSON(`assets/data/memories.json`);
}

// setup() --------------------------------------------
//
// Set up canvas and create game objects
function setup() {
  userStartAudio();

  // noCursor();

  // Set volume of background music to current (this volume will be adjusted later on)
  backgroundMusic.setVolume(backgroundMusicVolume.current);

  introKnockSound.setVolume(introKnockSoundVolume);

  // Play background music and loop it
  tryMusic();

  // set quantity for total memories that need to be cleared
  maxMemoriesToClear = memoriesList.memories.length;

  let canvas = createCanvas(1280, 720);
  canvas.parent("#game-container");

  // // load up user's video
  // if (memoryPlaying === `memoryPlayingOnPhone`) {
  //   push();
  //   video = createCapture(VIDEO);
  //   video.size(width / 2, height);
  //   // Hide the video element, and just show the canvas
  //   video.hide();
  //   // Set up faceApi
  //   faceapi = ml5.faceApi(video, DETECTION_OPTIONS, modelReady);
  //   pop();
  // }

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

// Play background music and loop it
function tryMusic() {
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.loop();
  }
}

// // Start detection when model is ready
// function modelReady() {
//   console.log(faceapi);
//   faceapi.detect(gotResults);
// }
//
// // Get results
// function gotResults(err, result) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   memoryPlayingOnPhone.detections = result;
//
//   background(bgFill.current.r, bgFill.current.g, bgFill.current.b);
//
//   // Use this if I show my video capture:
//   // image(video, 0, height / 4, width / 2, height / 2);
//
//   // If detections found:
//   if (memoryPlayingOnPhone.detections) {
//     if (memoryPlayingOnPhone.detections.length > 0) {
//       // Update behaviour of all body parts
//       // head + mouth
//       memoryPlayingOnPhone.mirrorHead.update(memoryPlayingOnPhone.detections);
//       memoryPlayingOnPhone.mirrorMouth.update(memoryPlayingOnPhone.detections);
//
//       // eyes
//       let leftEyePosition = memoryPlayingOnPhone.detections[0].parts.leftEye;
//       memoryPlayingOnPhone.leftEye.update(
//         memoryPlayingOnPhone.detections,
//         leftEyePosition
//       );
//
//       let rightEyePosition = memoryPlayingOnPhone.detections[0].parts.rightEye;
//       memoryPlayingOnPhone.rightEye.update(
//         memoryPlayingOnPhone.detections,
//         rightEyePosition
//       );
//
//       // eyebrows
//       memoryPlayingOnPhone.drawLandmarks(memoryPlayingOnPhone.detections);
//     }
//   } else {
//     console.log(`get your face in the camera`);
//   }
//   setTimeout(() => {
//     faceapi.detect(gotResults);
//   }, 50);
//   // faceapi.detect(gotResults);
// }

// Set up all intro objects
function setUpIntroObjects() {
  // Create intro poem video
  introPoemVideo = createVideo(`assets/images/intro/intro-poem-video.mp4`);
  // center video
  introPoemVideo.style("position", "absolute");
  // hide the video initially
  introPoemVideo.hide();

  // Create a ton of dots
  for (let i = 0; i < numDots; i++) {
    let dot = new Dot();
    dots.push(dot);
  }

  // Create Memorywash thumbnail
  memorywashThumbnail = new MemorywashThumbnail(
    width / 2,
    height / 2,
    memorywashThumbnailImages
  );

  // no longer used but kept for reference
  // // Create download button
  // let downloadButtonProperties = {
  //   x: memorywashThumbnail.x,
  //   y: memorywashThumbnail.y + 200,
  // };
  // downloadButton = new DownloadButton(downloadButtonProperties);

  // Create start button
  let proceedButtonProperties = {
    x: 470,
    y: height / 2 + 70,
  };
  proceedButton = new ProceedButton(proceedButtonProperties);

  // Create install button
  let installButtonProperties = {
    x: 190,
    y: height / 2 + 230,
  };
  installButton = new InstallButton(installButtonProperties);

  // Create start button
  let startButtonProperties = {
    x: memorywashThumbnail.x,
    y: memorywashThumbnail.y + 219,
  };
  startButton = new StartButton(startButtonProperties);

  // Create intro loading bar and text
  introLoadingBar = new IntroLoadingBar();
  introLoadingText = new IntroLoadingText();

  // Captain Nibbu's dialog box
  introDialogBox = new IntroDialogBox(width / 2, height - 200);
}

// Set up all game objects
function setUpGameObjects() {
  // Fetch the first incoming and old memory
  getMemories();

  // Create memory storage bar
  memoryStorageBar = new MemoryStorageBar(maxMemoriesToClear);

  // Create left preview video
  let leftMemoryBoxProperties = {
    x: width / 2 - 280,
    y: height / 2 - 30,
    section: `OLD MEMORY`,
    // instructions: `Make room for this memory.`,
    instructions: ``,
    memoryCategory: currentLeftMemoryCategory,
    playIconImage: playIconImage,
    // memoryGroup: memoryGroup,
    memoryName: currentMemoryInfo,
  };
  leftMemoryBox = new MemoryBox(leftMemoryBoxProperties);

  // Create right preview video
  let rightMemoryBoxProperties = {
    x: width / 2 + 280,
    y: height / 2 - 30,
    section: `INCOMING MEMORY`,
    // instructions: `Delete memories that burden you.`,
    memoryCategory: currentRightMemoryCategory,
    instructions: ``,
    playIconImage: playIconImage,
    // memoryGroup: memoryGroup,
    memoryName: currentMemoryInfo,
  };
  rightMemoryBox = new MemoryBox(rightMemoryBoxProperties);
}

// Fetch an incoming and old memory from memories.json
function getMemories() {
  // To delete:
  // currentIncomingMemory =
  //   memoriesList.incomingMemories[currentMemoryGroupIndex];
  //
  // currentOldMemory = memoriesList.oldMemories[currentMemoryGroupIndex];

  // Choose which memory goes on the left side:
  let memoryCategories = [`happyMemory`, `sadMemory`];
  currentLeftMemoryCategory = random(memoryCategories);

  // Set the right memory
  if (currentLeftMemoryCategory === `happyMemory`) {
    currentRightMemoryCategory = `sadMemory`;
  } else {
    currentRightMemoryCategory = `happyMemory`;
  }

  // Update currentMemoryInfo using data from memories.json
  currentMemoryInfo = memoriesList.memories[currentMemoryGroupIndex];
}

// draw() --------------------------------------------
//
// Set up background colors and states
function draw() {
  if (memoryPlaying !== `memoryPlayingOnPhone`) {
    // Set background color
    background(bgFill.current.r, bgFill.current.g, bgFill.current.b);
  }

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
  if (introSubstate === `introTitle`) {
    introTitle();
  } else if (introSubstate === `introPoem`) {
    // play the intro poem
    introPoem();
  } else if (introSubstate === `introNotification`) {
    introNotification();
    // console.log(`yes`);
  } else if (introSubstate === `introInstallApp`) {
    introInstallApp();
    // console.log(`yes`);
  }
  // introDownload is no longer being used
  // else if (introSubstate === `introDownload`) {
  //   introDownload();
  // }
  else if (introSubstate === `introNibbuSpeech`) {
    introNibbuSpeech();
  }

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

// Show title for intro
function introTitle() {
  background(0);

  // push();
  // fill(255);
  // textAlign(CENTER);
  // textSize(32);
  // text(`so you won't forget`, width / 2, height / 2);
  // pop();

  push();
  imageMode(CENTER);
  image(introTitleImage, width / 2, height / 2);
  pop();

  startButton.update(mouse);

  // Set cursor type
  cursorHoverChange(mouse, startButton);
}

// Change cursor to pointer when hovering over a button
function cursorHoverChange(mouse, buttonName) {
  if (buttonName.hover(mouse)) {
    cursor(`pointer`);
  } else {
    cursor(`default`);
  }
}

// Play the poem video
function introPlayPoem() {
  // reveal the intro poem video
  introPoemVideo.show();

  // if video is not already playing, play the video
  if (!introPoemVideoPlaying) {
    introPoemVideo.play();
    introPoemVideoPlaying = true;
  }

  // switch intro substate
  introSubstate = `introPoem`;
}

// Once poem is done playing, switch to installing app
function introPoem() {
  // play knock sound after 24 seconds
  // time() refers to time elapsed since video started playing
  // duration() refers to video's duration
  if (introPoemVideo.time() > 24.5) {
    playKnockSound();
  }

  // if video is done playing:
  if (introPoemVideo.time() / introPoemVideo.duration() === 1) {
    // hide the video
    introPoemVideo.hide();
    backgroundMusic.stop();

    // change window background to black
    $(`body`).css(`background`, `black`);

    // switch substate
    // introSubstate = `introInstallApp`;
    introSubstate = `introNotification`;
    // wait 2 seconds, then display notification text
    // setTimeout(function () {
    //   introNotificationDisplay = true;
    // }, 2000);
  }
}

function playKnockSound() {
  if (!introKnockSound.isPlaying()) {
    introKnockSound.play();
  }
}

function displayIntroNotificationText() {
  push();
  fill(0);
  textSize(15);
  text(
    `ATTN: Lu,

You have exceeded the capacity of your memory storage.
Please immediately delete memories that are no longer relevant.`,
    400,
    height / 2 - 50
  );
  pop();
}

function introNotification() {
  bgFill.current = bgFill.black;
  // Reset cursor to default
  cursor(`default`);

  push();
  fill(168, 227, 245);
  rectMode(CENTER);
  translate(width / 2, height / 2);
  scale(rectScale);
  rect(0, 0, 600, 300);
  pop();

  if (rectScale > 1.05) {
    rectScaleIncrease = -0.001;
  } else if (rectScale <= 1) {
    rectScaleIncrease = 0.001;
  }

  rectScale += rectScaleIncrease;

  // if (introNotificationDisplay) {
  displayIntroNotificationText();

  proceedButton.update(mouse);

  // Set cursor type
  cursorHoverChange(mouse, proceedButton);
  // }
}

// Download memorywash app
function introInstallApp() {
  // Change background color
  bgFill.current = bgFill.introInstallApp;

  // If install button hasn't been clicked yet:
  if (!installing) {
    push();
    imageMode(CENTER);
    image(memorywashInstallImage, width / 2, height / 2);
    pop();

    // for (let i = 0; i < dots.length; i++) {
    //   dots[i].update();
    // }

    // // show Memorywash title
    // push();
    // fill(0);
    // textAlign(CENTER);
    // textSize(32);
    // text(`Memorywash`, width / 2, height / 2);
    // pop();

    // Update install button
    installButton.update(mouse);

    // Set cursor type on hover
    cursorHoverChange(mouse, installButton);
  }
  // show loading bar once install button has been clicked
  else {
    introLoadingBar.update();
    introLoadingText.update();
  }
}

// Load different parts of the app
function loadApp() {
  installing = true;

  // update loading messages every few seconds
  loadingMessageInterval = setInterval(
    introLoadingText.updateStringIndex.bind(introLoadingText),
    2000
  );
}

// Check if loading bar reached the end
function setFinalLoadForLoadingBar() {
  introLoadingBar.finalLoad = true;
}

// No longer used, but kept for reference
// // Show Memorywash thumbnail and download button
// function introDownload() {
//   // Update memorywash thumbnail
//   memorywashThumbnail.update();
//
//   // Update download button
//   downloadButton.update(mouse);
// }

// Captain Nibbu gives a speech
function introNibbuSpeech() {
  // Display Captain Nibbu's image
  push();
  imageMode(CENTER);
  // update its image index based on current dialog
  nibbuCurrentImageIndex =
    introDialogsList.dialogs[currentIntroDialogIndex].imageIndex;
  image(nibbuImages[nibbuCurrentImageIndex], width / 2, 250);
  pop();

  // Update dialog box
  introDialogBox.update(introDialogsList, currentIntroDialogIndex);
}

// // Download app
// function downloadApp() {
//   introSubstate = `introNibbuSpeech`;
// }

/****************
Game state:
Here's where the player chooses their memories
*****************/

function game() {
  // Keep checking memories are updated
  getMemories();

  // Display memorywash interface image
  push();
  imageMode(CENTER);
  image(memorywashInterfaceImage, width / 2, height / 2);
  pop();

  // Display "Excess memories" count
  push();
  fill(255);
  textAlign(CENTER);
  rectMode(CENTER);
  textSize(50);
  textFont(fontStyleBold);
  text(
    `${maxMemoriesToClear - numTotalMemoriesClicked}`,
    width - 200,
    height - 65
  );
  pop();

  // // Drawing rectangle guides
  // push();
  // noFill();
  // // left rectangle
  // rect(0, 0, width / 2, height);
  // // right rectangle
  // rect(width / 2, 0, width / 2, height);
  // pop();

  // separationLine.x = width / 2;
  // // Draw separation line
  // push();
  // strokeWeight(5);
  // stroke(strokeFill.r, strokeFill.g, strokeFill.b);
  // line(
  //   separationLine.x,
  //   separationLine.yPaddingTop,
  //   separationLine.x,
  //   height - separationLine.yPaddingBottom
  // );
  // pop();

  // Update left and right preview videos
  leftMemoryBox.update(mouse, currentMemoryInfo);
  rightMemoryBox.update(mouse, currentMemoryInfo);

  // Set cursor type on hover
  if (leftMemoryBox.hover(mouse) || rightMemoryBox.hover(mouse)) {
    cursor(`pointer`);
  } else {
    cursor(`default`);
  }

  // Update memory storage
  memoryStorageBar.update(numTotalMemoriesClicked);

  // Display memorywash interface image
  push();
  imageMode(CENTER);
  image(
    fullCapacityImage,
    memoryStorageBar.oneHundredBar.x + memoryStorageBar.oneHundredBar.width / 2,
    memoryStorageBar.oneHundredBar.y + 17
  );
  pop();

  // To delete:
  // // Change cursor to pointer when mouse hovers over preview video
  // if (leftPreviewVideo.hovered || rightPreviewVideo.hovered) {
  //   cursor(`pointer`);
  //   setTimeout(() => {
  //     cursor(`default`);
  //   }, 1000);
  // } else {
  //   cursor(`default`);
  // }

  // // Update left and right preview videos
  // for (let i = 0; i < previewVideos.length; i++) {
  //   previewVideos[i].update(mouse);
  // }

  // // Update winner buttons
  // winnerButtonIncoming.update(mouse);
  // winnerButtonOld.update(mouse);

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
    // downloadButton.mousePressed(mouse);
    if (introSubstate === `introTitle`) {
      startButton.mousePressed(mouse);

      // Play background music and loop it
      tryMusic();
    } else if (introSubstate === `introNotification`) {
      proceedButton.mousePressed(mouse);
      // Reset cursor to default
      cursor(`default`);
    } else if (introSubstate === `introInstallApp`) {
      installButton.mousePressed(mouse);
      // Reset cursor to default
      cursor(`default`);
    }

    // Update Cap Nibbu's current dialog index when mouse pressed
    if (introDialogBox.mousePressed(mouse)) {
      currentIntroDialogIndex++;

      // If reached last dialog, launch game
      if (currentIntroDialogIndex >= introDialogsList.dialogs.length) {
        // Launch memories
        state = `game`;
      }
    }
  } else if (state === `game`) {
    // to delete:
    // leftPreviewVideo.mousePressed(mouse);
    // rightPreviewVideo.mousePressed(mouse);

    leftMemoryBox.mousePressed(mouse);
    rightMemoryBox.mousePressed(mouse);

    // Reset cursor to default
    cursor(`default`);

    console.log(numHappyMemoriesClicked, numSadMemoriesClicked);

    // // If winner button clicked, update memory group
    // // if (winnerButtonOld.hover(mouse)) {
    // if (winnerButtonOld.hover(mouse) || winnerButtonIncoming.hover(mouse)) {
    //   currentMemoryGroupIndex += 1;
    //   console.log(currentMemoryGroupIndex);
    // }
  } else if (state === `memory`) {
    dialogBox.mousePressed(mouse);

    if (memoryPlaying === `memoryMakingBao`) {
      memoryMakingBao.mousePressed(mouseX, mouseY);
    }

    if (memoryPlaying === `memoryFathersDay`) {
      memoryFathersDay.mousePressed(mouseX, mouseY);
    }

    // if (memoryPlaying === `memoryInstaPic`) {
    //   memoryInstaPic.mousePressed(mouseX, mouseY);
    // }
  }
}

function mouseReleased() {
  if (state === `memory`) {
    if (memoryPlaying === `memoryMakingBao`) {
      memoryMakingBao.mouseNotPressed();
    }

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
