// Cool spinny blob effect
// ATTRIBUTION!
// Code slightly altered from https://github.com/playgrdstar/p5_blob/blob/master/sketch.js
// https://medium.com/creative-coding-space/meet-blobby-in-p5-js-5d9d99232400

// organic is used to store the list of instances of Organic objects that we will create
var organics = [];
// The variable change stores the rate of rotation and the y coordinate for noise later
var change, colorsPalette;

class CoolBlobEffect {
  constructor(
    singleDecorationImages,
    multipleDecorationImages,
    fathersDayCardImage,
    dadiCorrectSpellingSound
  ) {
    change = 0;
    colorsPalette = [
      color(146, 167, 202, 30),
      color(186, 196, 219, 30),
      color(118, 135, 172, 30),
      color(76, 41, 81, 30),
      color(144, 62, 92, 30),
      color(178, 93, 119, 30),
      color(215, 118, 136, 30),
      color(246, 156, 164, 30),
    ];

    for (var i = 0; i < 110; i++) {
      let organicProperties = {
        radius: 0.1 + 2 * i, //radius of blob
        // radius: 0.1 + 1 * i, //radius of blob
        xpos: width / 2, //x position of blob
        ypos: height / 2, // y position of blob
        // roughness: i * 1, // magnitude of how much the circle is distorted
        roughness: i * 0.1, // magnitude of how much the circle is distorted
        angle: i * random(90), //how much to rotate the circle by
        color: colorsPalette[floor(random(8))], // color of the blob
      };

      organics.push(new Organic(organicProperties));
    }
  }

  // Update all behaviours
  update() {
    for (var i = 0; i < organics.length; i++) {
      organics[i].show(change);
      console.log(i);
    }

    change += 0.01;
  }
}

function Organic({ radius, xpos, ypos, roughness, angle, color }) {
  this.radius = radius; //radius of blob
  this.xpos = xpos; //x position of blob
  this.ypos = ypos; // y position of blob
  this.roughness = roughness; // magnitude of how much the circle is distorted
  this.angle = angle; //how much to rotate the circle by
  this.color = color; // color of the blob

  this.show = function (change) {
    noStroke(); // no stroke for the circle
    fill(this.color); //color to fill the blob

    //we enclose things between push and pop so that all transformations within only affect items within
    push();
    translate(xpos, ypos); //move to xpos, ypos
    // rotate(this.angle + change); //rotate by this.angle+change

    //begin a shape based on the vertex points below
    beginShape();

    //The lines below create our vertex points
    var off = 0;
    for (var i = 0; i < TWO_PI; i += 0.1) {
      var offset = map(
        noise(off, change),
        0,
        1,
        -this.roughness,
        this.roughness
      );
      // var r = this.radius + offset;
      var r = this.radius + offset;
      var x = r * cos(i);
      var y = r * sin(i);
      vertex(x, y);
      off += 0.1;
    }
    endShape(); //end and create the shape
    pop();
  };
}
