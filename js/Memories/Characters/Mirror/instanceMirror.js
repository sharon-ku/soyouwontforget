// Instance: Mirror canvas
//
// Attribution: I started using the code for FaceApi from this example:
// https://editor.p5js.org/ml5/sketches/FaceApi_Video_Landmarks

// Note: I uncommented some of the code from the example in case I want to use this in the future

function createMirrorCanvas() {
  let instanceMirrorSketch = function (p) {
    // Background fill
    let bgFill = {
      current: {
        r: 250,
        g: 230,
        b: 252,
      },
      // pink
      morning: {
        r: 250,
        g: 230,
        b: 252,
      },
      // dark blue
      night: {
        r: 74,
        g: 73,
        b: 113,
      },
    };

    // Landmark stroke color
    const LANDMARK_STROKE_FILL = {
      r: 241,
      g: 142,
      b: 48,
    };

    // Landmark stroke weight
    const LANDMARK_STROKE_WEIGHT = 2;

    // Body objects inside mirror
    let mirrorHead = undefined;
    let mirrorMouth = undefined;
    let leftEye = undefined;
    let rightEye = undefined;

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
    // -----------------------------

    // Create canvas and objects
    p.setup = function () {
      // Create canvas
      let mirrorCanvas = p.createCanvas(300, 300);

      // Stick to different parents depending on state
      if (state === `morning`) {
        mirrorCanvas.parent(`mirror-canvas1`);
      } else if (state === `night`) {
        mirrorCanvas.parent(`mirror-canvas2`);
      }

      // load up user's video
      video = p.createCapture(p.VIDEO);
      video.size(p.width, p.height);
      // Hide the video element, and just show the canvas
      video.hide();
      // Set up faceApi
      faceapi = ml5.faceApi(video, DETECTION_OPTIONS, p.modelReady);
      p.textAlign(p.RIGHT);

      // Create new head in mirror
      mirrorHead = new MirrorHead(p);

      // Create new mouth
      mirrorMouth = new MirrorMouth(p);

      // Create new left eye
      const LEFT_EYE_X_OFFSET = -5;
      const LEFT_EYE_Y_OFFSET = 15;
      leftEye = new MirrorEye(p, LEFT_EYE_X_OFFSET, LEFT_EYE_Y_OFFSET);

      // Create new right eye
      const RIGHT_EYE_X_OFFSET = 5;
      const RIGHT_EYE_Y_OFFSET = 15;
      rightEye = new MirrorEye(p, RIGHT_EYE_X_OFFSET, RIGHT_EYE_Y_OFFSET);
    };

    // Update every frame: unused
    p.draw = function () {};

    // Start detection when model is ready
    p.modelReady = function () {
      faceapi.detect(p.gotResults);
    };

    // Get results
    p.gotResults = function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      detections = result;

      // Set background color based on current state
      if (state === `morning`) {
        bgFill.current = bgFill.morning;
      } else if (state === `night`) {
        bgFill.current = bgFill.night;
      }
      p.background(bgFill.current.r, bgFill.current.g, bgFill.current.b);

      // Use this if I show my video capture:
      // image(video, 0,0, width, height)

      // If detections found:
      if (detections) {
        if (detections.length > 0) {
          // Update behaviour of all body parts
          // head + mouth
          mirrorHead.update(detections);
          mirrorMouth.update(detections);

          // eyes
          let leftEyePosition = detections[0].parts.leftEye;
          leftEye.update(detections, leftEyePosition);

          let rightEyePosition = detections[0].parts.rightEye;
          rightEye.update(detections, rightEyePosition);

          // eyebrows
          p.drawLandmarks(detections);
        }
      }
      faceapi.detect(p.gotResults);
    };

    // Draw box for border around head: did not use
    // p.drawBox = function (detections) {
    //   for (let i = 0; i < detections.length; i++) {
    //     const alignedRect = detections[i].alignedRect;
    //     const x = alignedRect._box._x;
    //     const y = alignedRect._box._y;
    //     const boxWidth = alignedRect._box._width;
    //     const boxHeight = alignedRect._box._height;
    //
    //     p.noFill();
    //     p.stroke(161, 95, 251);
    //     p.strokeWeight(2);
    //     p.rect(x, y, boxWidth, boxHeight);
    //   }
    // };

    // Draw landmarks of face parts
    p.drawLandmarks = function () {
      for (let i = 0; i < detections.length; i++) {
        // Did not end up drawing these parts:
        // const mouth = detections[i].parts.mouth;
        // const nose = detections[i].parts.nose;
        // const leftEye = detections[i].parts.leftEye;
        // const rightEye = detections[i].parts.rightEye;

        // Store detections for eyebrows
        const rightEyeBrow = detections[i].parts.rightEyeBrow;
        const leftEyeBrow = detections[i].parts.leftEyeBrow;

        // Did not end up drawing these parts:
        // p.drawPart(mouth, true);
        // p.drawPart(nose, false);
        // p.drawPart(leftEye, true);
        // p.drawPart(rightEye, true);

        // Draw eyebrows
        p.drawPart(leftEyeBrow, false);
        p.drawPart(rightEyeBrow, false);
      }
    };

    // Draw body part
    p.drawPart = function (feature, closed) {
      p.push();
      p.noFill();
      p.stroke(
        LANDMARK_STROKE_FILL.r,
        LANDMARK_STROKE_FILL.g,
        LANDMARK_STROKE_FILL.b
      );
      p.strokeWeight(LANDMARK_STROKE_WEIGHT);

      // Draw shape
      p.beginShape();
      for (let i = 0; i < feature.length; i++) {
        const x = feature[i]._x;
        const y = feature[i]._y;
        p.vertex(x, y);
      }

      if (closed === true) {
        p.endShape(p.CLOSE);
      } else {
        p.endShape();
      }
      p.pop();
    };
  };

  let myp5Mirror = new p5(instanceMirrorSketch);
}
