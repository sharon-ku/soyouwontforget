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

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1280, 720);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  // Set backgroun color
  background(bgFill.current.r, bgFill.current.g, bgFill.current.b);

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
function game() {}
