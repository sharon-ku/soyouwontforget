/** --------------------------------

ALL CODE FOR MEMORIES TO BE PLAYED:
- set up memory objects
- memory "states"
- code for specific memories

------------------------------------- **/

// USED FOR MEMORY TEST
let memoryTest = undefined;

// Create objects for all memories (done in setup)
function createAllMemoryObjects() {
  console.log(`memory objects created`);

  dialogBox = new DialogBox(width / 2, height - 150);

  // Used for test memory
  memoryTest = new MemoryTest();
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
