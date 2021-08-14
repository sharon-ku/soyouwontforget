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

// Preload images and sounds for all memories (done in preload)
function preloadMemoryAssets() {
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
}

// Create objects for all memories (done in setup)
function setUpMemoryObjects() {
  console.log(`memory objects created`);

  dialogBox = new DialogBox(width / 2, height - 150);

  // Used for test memory
  memoryTest = new MemoryTest(luImages, zaiImages);
}

// Cue memory based on the memory that is currently playing
function cueMemory() {
  if (memoryPlaying === `testMemory`) {
    playTestMemory();
  } else if (memoryPlaying === `game`) {
    // game();
  } else if (memoryPlaying === `end`) {
    // end();
  }
}

// USED FOR TESTS
// Play this memory
function playTestMemory() {
  background(210, 210, 220);
  console.log(`SUCCESSFULLY PLAYING TEST MEMORY`);

  memoryTest.update();

  // Update dialog box
  dialogBox.update(dialogsList);
}
