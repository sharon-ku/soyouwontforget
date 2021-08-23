/** --------------------------------

ALL CODE FOR MEMORIES TO BE PLAYED:
- set up memory objects
- set up memory "states"
- code for specific memories

------------------------------------- **/

// USED FOR MEMORY TEST
let memoryTest = undefined;

// Character images ------------
// Lu
let luImages = [];
const NUM_LU_IMAGES = 1;

// Zai
let zaiImages = [];
const NUM_ZAI_IMAGES = 1;

// Object images ------------
// White filter
let whiteFilterImage = undefined;

// Bao images
let doughImage = undefined;
let rollingPinImage = undefined;

// Father's day card & decorations
let fathersDayCardImage = undefined;
let singleDecorationImages = [];
const NUM_SINGLE_DECORATION_IMAGES = 6;
let multipleDecorationImages = [];
const NUM_MULTIPLE_DECORATION_IMAGES = 7;

// Insta pic
let saladImage = undefined;
let phoneImages = [];
const NUM_PHONE_IMAGES = 3;
let cameraButtonImage = undefined;
let heartEmojiImage = undefined;
let instaCheckmarkImage = undefined;

// Sound effects ------------
// Dadi correct spelling
let dadiCorrectSpellingSound = undefined;

// Audio dialogs ------------
let instaPicDialogs = [];
const NUM_INSTA_PIC_DIALOGS = 1;

// Preload images and sounds for all memories (done in preload)
function preloadMemoryAssets() {
  // Load all sound effects -------------
  dadiCorrectSpellingSound = loadSound(`assets/sounds/bark.wav`);

  // Load all audio dialogs ----------------
  for (let i = 0; i < NUM_INSTA_PIC_DIALOGS; i++) {
    let dialog = loadSound(
      `assets/sounds/memories/incoming-memories/insta-pic/dialogs/insta-pic${i}.mp3`
    );
    instaPicDialogs.push(dialog);
  }

  // Load all character images -------------
  // Lu
  for (let i = 0; i < NUM_LU_IMAGES; i++) {
    let luImage = loadImage(`assets/images/memories/characters/lu${i}.png`);
    luImages.push(luImage);
  }
  // Zai
  // Load Lu images
  for (let i = 0; i < NUM_ZAI_IMAGES; i++) {
    let zaiImage = loadImage(`assets/images/memories/characters/zai${i}.png`);
    zaiImages.push(zaiImage);
  }

  // Load all object images -------------
  // White filter image
  whiteFilterImage = loadImage(
    `assets/images/memories/objects/white-filter.jpg`
  );

  // Bao images
  doughImage = loadImage(`assets/images/memories/objects/bao/dough.png`);
  rollingPinImage = loadImage(
    `assets/images/memories/objects/bao/rolling-pin.png`
  );

  // Father's Day card
  fathersDayCardImage = loadImage(
    `assets/images/memories/objects/card/card.png`
  );

  // Card decorations
  for (let i = 0; i < NUM_SINGLE_DECORATION_IMAGES; i++) {
    let singleDecorationImage = loadImage(
      `assets/images/memories/objects/card/single-decorations/single-decoration${i}.png`
    );
    singleDecorationImages.push(singleDecorationImage);
  }
  for (let i = 0; i < NUM_MULTIPLE_DECORATION_IMAGES; i++) {
    let multipleDecorationImage = loadImage(
      `assets/images/memories/objects/card/multiple-decorations/multiple-decoration${i}.png`
    );
    multipleDecorationImages.push(multipleDecorationImage);
  }

  // Insta Pic memory images
  saladImage = loadImage(`assets/images/memories/objects/insta-pic/salad.jpg`);
  for (let i = 0; i < NUM_PHONE_IMAGES; i++) {
    let phoneImage = loadImage(
      `assets/images/memories/objects/insta-pic/phone${i}.png`
    );
    phoneImages.push(phoneImage);
  }
  cameraButtonImage = loadImage(
    `assets/images/memories/objects/insta-pic/camera-button.png`
  );
  heartEmojiImage = loadImage(
    `assets/images/memories/objects/insta-pic/heart-emoji.png`
  );
  instaCheckmarkImage = loadImage(
    `assets/images/memories/objects/insta-pic/insta-checkmark.png`
  );
}

// Create objects for all memories (done in setup)
function setUpMemoryObjects() {
  // console.log(`memory objects created`);

  dialogBox = new DialogBox(width / 2, height - 150);

  // Used for test memory
  memorySoccer = new MemorySoccer(luImages, zaiImages);

  memoryFathersDay = new MemoryFathersDay(
    singleDecorationImages,
    multipleDecorationImages,
    fathersDayCardImage,
    dadiCorrectSpellingSound
  );

  memoryInstaPic = new MemoryInstaPic(
    saladImage,
    phoneImages,
    cameraButtonImage,
    heartEmojiImage,
    instaCheckmarkImage,
    whiteFilterImage,
    instaPicDialogs
  );

  memoryMakingBao = new MemoryMakingBao(doughImage, rollingPinImage);

  memoryPlayingOnPhone = new MemoryPlayingOnPhone();
}

// Cue memory based on the memory that is currently playing
function cueMemory() {
  if (memoryPlaying === `memorySoccer`) {
    playMemorySoccer();
  } else if (memoryPlaying === `memoryFathersDay`) {
    playMemoryFathersDay();
  } else if (memoryPlaying === `memoryInstaPic`) {
    playMemoryInstaPic();
  } else if (memoryPlaying === `memoryMakingBao`) {
    playMemoryMakingBao();
  } else if (memoryPlaying === `memoryPlayingOnPhone`) {
    playMemoryPlayingOnPhone();
  }
}

// Play this memory
function playMemorySoccer() {
  background(210, 210, 220);

  memorySoccer.update();

  // // Update dialog box
  // dialogBox.update(memoriesList);
}

function playMemoryFathersDay() {
  background(226, 248, 249);
  // console.log(`playing fathers day`);

  memoryFathersDay.update();
}

function playMemoryInstaPic() {
  background(226, 248, 249);

  memoryInstaPic.update();
}

function playMemoryMakingBao() {
  background(0, 0, 0);
  // console.log(`playing fathers day`);

  memoryMakingBao.update();
}

function playMemoryPlayingOnPhone() {
  // noBackground();
  // background(226, 248, 249);
  // console.log(`playing fathers day`);

  memoryPlayingOnPhone.update();
}
