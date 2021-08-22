// Playing on phone memory playing in memory state
// Instance: Mirror canvas
//
// Attribution: I started using the code for FaceApi from this example:
// https://editor.p5js.org/ml5/sketches/FaceApi_Video_Landmarks

// Note: I uncommented some of the code from the example in case I want to use this in the future

// createMirrorCanvas();

// -----------------------------

// function createMirrorCanvas() {
//
//     // Create canvas and objects
//     setup = function () {
//
//
//     };
//
//     // Update every frame: unused
//     draw = function () {};
//
//
// }

// // Faceapi object
// let faceapi = undefined;

class MemoryPlayingOnPhone {
  constructor() {
    // background(0);
    // Characters in this scene ---------
    // All characters
    // this.characters = [];

    // Objects in this scene ---------
    // // Landmark stroke color
    // this.LANDMARK_STROKE_FILL = {
    //   r: 241,
    //   g: 142,
    //   b: 48,
    // };
    //
    // // Landmark stroke weight
    // this.LANDMARK_STROKE_WEIGHT = 2;
    //
    // // Body objects inside mirror
    // // let mirrorHead = undefined;
    // // let mirrorMouth = undefined;
    // // let leftEye = undefined;
    // // let rightEye = undefined;
    //
    // // Used for ml5 -----------------------
    // // Faceapi object
    // // let faceapi = undefined;
    // // this.faceapi = undefined;
    //
    // // The user's webcam
    // // let video = undefined;
    //
    // // Store all detections
    // // let detections;
    //
    // // Modifying detection options (by default, they are set to true)
    // const DETECTION_OPTIONS = {
    //   withLandmarks: true,
    //   withDescriptors: false,
    // };
    //
    // // load up user's video
    // this.video = createCapture(VIDEO);
    // this.video.size(width, height);
    // // Hide the video element, and just show the canvas
    // this.video.hide();
    // // Set up faceApi
    // faceapi = ml5.faceApi(this.video, DETECTION_OPTIONS, this.modelReady);
    // textAlign(RIGHT);
    //
    // Create new head in mirror
    this.mirrorHead = new MirrorHead();

    // Create new mouth
    this.mirrorMouth = new MirrorMouth();

    // Create new left eye
    const LEFT_EYE_X_OFFSET = -20;
    const LEFT_EYE_Y_OFFSET = 70;
    this.leftEye = new MirrorEye(LEFT_EYE_X_OFFSET, LEFT_EYE_Y_OFFSET);

    // Create new right eye
    const RIGHT_EYE_X_OFFSET = 20;
    const RIGHT_EYE_Y_OFFSET = 70;
    this.rightEye = new MirrorEye(RIGHT_EYE_X_OFFSET, RIGHT_EYE_Y_OFFSET);
  }

  // Update all behaviours
  update() {
    // Display all characters
    // NONE
    // Display all objects
  }

  // // Start detection when model is ready
  // modelReady() {
  //   console.log(faceapi);
  //   faceapi.detect(this.gotResults);
  // }

  // // Get results
  // gotResults(err, result) {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   detections = result;
  //
  //   // Use this if I show my video capture:
  //   // image(video, 0,0, width, height)
  //
  //   // If detections found:
  //   if (this.detections) {
  //     if (detections.length > 0) {
  //       // Update behaviour of all body parts
  //       // head + mouth
  //       this.mirrorHead.update(this.detections);
  //       this.mirrorMouth.update(this.detections);
  //
  //       // eyes
  //       let leftEyePosition = this.detections[0].parts.leftEye;
  //       this.leftEye.update(this.detections, leftEyePosition);
  //
  //       let rightEyePosition = this.detections[0].parts.rightEye;
  //       this.rightEye.update(this.detections, rightEyePosition);
  //
  //       // eyebrows
  //       drawLandmarks(this.detections);
  //     }
  //   }
  //   faceapi.detect(gotResults);
  // }

  // Draw box for border around head: did not use
  // drawBox(this.detections) {
  //   for (let i = 0; i < this.detections.length; i++) {
  //     const alignedRect = this.detections[i].alignedRect;
  //     const x = alignedRect._box._x;
  //     const y = alignedRect._box._y;
  //     const boxWidth = alignedRect._box._width;
  //     const boxHeight = alignedRect._box._height;
  //
  //     noFill();
  //     stroke(161, 95, 251);
  //     strokeWeight(2);
  //     rect(x, y, boxWidth, boxHeight);
  //   }
  // };

  // Draw landmarks of face parts
  drawLandmarks() {
    for (let i = 0; i < this.detections.length; i++) {
      // Did not end up drawing these parts:
      // const mouth = this.detections[i].parts.mouth;
      // const nose = this.detections[i].parts.nose;
      // const leftEye = this.detections[i].parts.leftEye;
      // const rightEye = this.detections[i].parts.rightEye;

      // Store this.detections for eyebrows
      const rightEyeBrow = this.detections[i].parts.rightEyeBrow;
      const leftEyeBrow = this.detections[i].parts.leftEyeBrow;

      // Did not end up drawing these parts:
      // drawPart(mouth, true);
      // drawPart(nose, false);
      // drawPart(leftEye, true);
      // drawPart(rightEye, true);

      // Draw eyebrows
      // this.drawPart(leftEyeBrow, false);
      // this.drawPart(rightEyeBrow, false);
    }
  }

  // Draw body part
  drawPart(feature, closed) {
    push();
    noFill();
    stroke(
      LANDMARK_STROKE_FILL.r,
      LANDMARK_STROKE_FILL.g,
      LANDMARK_STROKE_FILL.b
    );
    strokeWeight(LANDMARK_STROKE_WEIGHT);

    // Draw shape
    beginShape();
    for (let i = 0; i < feature.length; i++) {
      const x = feature[i]._x;
      const y = feature[i]._y;
      vertex(x, y);
    }

    if (closed === true) {
      endShape(CLOSE);
    } else {
      endShape();
    }
    pop();
  }

  // When mouse pressed on preview video, play the memory
  mousePressed(mouseX, mouseY) {}
}
