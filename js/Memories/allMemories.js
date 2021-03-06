/** --------------------------------

ALL CODE FOR MEMORIES TO BE PLAYED:
- set up memory objects
- set up memory "states"
- code for specific memories

------------------------------------- **/

// Character images ------------
// Lu
let luImages = [];
const NUM_LU_IMAGES = 2;

// Zai
let zaiImages = [];
const NUM_ZAI_IMAGES = 2;

// Daddy
let daddyImages = [];
const NUM_DADDY_IMAGES = 1;

// Object images ------------
// White filter
let whiteFilterImage = undefined;

// Bao images
let doughImage = undefined;
let rollingPinImage = undefined;
let meatImage = undefined;

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
let makingBaoDialogs = [];
const NUM_MAKING_BAO_DIALOGS = 10;

// let instaPicDialogs = [];
// const NUM_INSTA_PIC_DIALOGS = 1;

// let soccerDialogs = [];
// const NUM_SOCCER_DIALOGS = 3;

let crashSound = undefined;

// ======================================================================
// preload()
//
// Preload images and sounds for all memories (done in preload)
// ----------------------------------------------------------------------
function preloadMemoryAssets() {
  // Load all sound effects -------------
  dadiCorrectSpellingSound = loadSound(`assets/sounds/bark.wav`);

  // Load all audio dialogs ----------------
  for (let i = 0; i < NUM_MAKING_BAO_DIALOGS; i++) {
    let dialog = loadSound(
      `assets/sounds/memories/old-memories/making-bao/dialog${i}.mp3`
    );
    makingBaoDialogs.push(dialog);
  }

  // for (let i = 0; i < NUM_INSTA_PIC_DIALOGS; i++) {
  //   let dialog = loadSound(
  //     `assets/sounds/memories/incoming-memories/insta-pic/dialog${i}.mp3`
  //   );
  //   instaPicDialogs.push(dialog);
  // }

  // for (let i = 0; i < NUM_SOCCER_DIALOGS; i++) {
  //   let dialog = loadSound(
  //     `assets/sounds/memories/old-memories/soccer/dialog${i}.m4a`
  //   );
  //   soccerDialogs.push(dialog);
  // }
  //
  // crashSound = loadSound(
  //   `assets/sounds/memories/old-memories/soccer/crash.wav`
  // );

  // Load all character images -------------
  // Lu
  for (let i = 0; i < NUM_LU_IMAGES; i++) {
    let image = loadImage(`assets/images/memories/characters/lu${i}.png`);
    luImages.push(image);
  }
  // Zai
  for (let i = 0; i < NUM_ZAI_IMAGES; i++) {
    let image = loadImage(`assets/images/memories/characters/zai${i}.png`);
    zaiImages.push(image);
  }

  // Daddy
  for (let i = 0; i < NUM_DADDY_IMAGES; i++) {
    let image = loadImage(`assets/images/memories/characters/daddy${i}.png`);
    daddyImages.push(image);
  }

  // Load all object images -------------
  // White filter image
  whiteFilterImage = loadImage(
    `assets/images/memories/objects/white-filter.jpg`
  );

  // Bao images
  baoTableImage = loadImage(`assets/images/memories/objects/bao/bao-table.jpg`);
  doughImage = loadImage(`assets/images/memories/objects/bao/dough.png`);
  rollingPinImage = loadImage(
    `assets/images/memories/objects/bao/rolling-pin.png`
  );
  meatImage = loadImage(`assets/images/memories/objects/bao/meat.png`);

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

  // Memories
  memoryMakingBao = new MemoryMakingBao(
    doughImage,
    rollingPinImage,
    meatImage,
    baoTableImage,
    makingBaoDialogs
  );

  // memorySoccer = new MemorySoccer(
  //   luImages,
  //   zaiImages,
  //   daddyImages,
  //   soccerDialogs,
  //   crashSound
  // );

  memoryFathersDay = new MemoryFathersDay(
    singleDecorationImages,
    multipleDecorationImages,
    fathersDayCardImage,
    dadiCorrectSpellingSound
  );

  // memoryInstaPic = new MemoryInstaPic(
  //   saladImage,
  //   phoneImages,
  //   cameraButtonImage,
  //   heartEmojiImage,
  //   instaCheckmarkImage,
  //   whiteFilterImage,
  //   instaPicDialogs
  // );

  memoryPlayingOnPhone = new MemoryPlayingOnPhone();
}

// Cue memory based on the memory that is currently playing
function cueMemory() {
  if (memoryPlaying === `memorySoccer`) {
    playMemorySoccer();
  } else if (memoryPlaying === `memoryFathersDay`) {
    playMemoryFathersDay();
    // } else if (memoryPlaying === `memoryInstaPic`) {
    //   playMemoryInstaPic();
  } else if (memoryPlaying === `memoryMakingBao`) {
    playMemoryMakingBao();
  } else if (memoryPlaying === `memoryPlayingOnPhone`) {
    playMemoryPlayingOnPhone();
  }
}

function playMemoryMakingBao() {
  background(255, 255, 255);
  // console.log(`playing fathers day`);

  memoryMakingBao.update();
}

// // Play this memory
// function playMemorySoccer() {
//   background(210, 210, 220);
//
//   memorySoccer.update();
//
//   // // Update dialog box
//   // dialogBox.update(memoriesList);
// }

function playMemoryFathersDay() {
  background(226, 248, 249);
  // console.log(`playing fathers day`);

  memoryFathersDay.update();
}

// function playMemoryInstaPic() {
//   background(226, 248, 249);
//
//   memoryInstaPic.update();
// }

function playMemoryPlayingOnPhone() {
  // noBackground();
  // background(226, 248, 249);
  // console.log(`playing fathers day`);

  memoryPlayingOnPhone.update();
}
