/** ALL CODE FOR MEMORIES TO BE PLAYED:
- set up memory objects
- memory "states"
- code for specific memories
**/

// Create objects for all memories (done in setup)
function createAllMemoryObjects() {
  console.log(`memory objects created`);
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
  background(0, 255, 0);
  console.log(`SUCCESSFULLY PLAYING TEST MEMORY`);
}
