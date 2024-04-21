let petals = new p5((sketch) => {
  var blobs;
  var gridSz;

  sketch.setup = () => {
    sketch.createCanvas(
      sketch.windowWidth,
      sketch.windowHeight,
      document.getElementById("cam3")
    );
    sketch.angleMode(sketch.DEGREES);
    sketch.background(0);
    sketch.frameRate(2);

    gridSz = 100; // Each grid size will be 100 px w/h
    blobs = [];

    for (var i = 0; i < sketch.width; i += gridSz) {
      for (var j = 0; j < sketch.height; j += gridSz) {
        var obj = new Blob(
          gridSz * 0.5 + i,
          gridSz * 0.5 + j,
          sketch.random(5, 20),
          sketch.color("#ffffff")
        );
        blobs.push(obj);
      }
    }
  };

  sketch.draw = () => {
    // sketch.background("#242b29");
    sketch.clear();
    for (var i = 0; i < blobs.length; i++) {
      blobs[i].display();
    }

    let noiseLevel = 255;
    let noiseScale = 0.009;

    // Iterate from top to bottom.
    for (let y = 0; y < 100; y += 1) {
      // Iterate from left to right.
      for (let x = 0; x < 200; x += 1) {
        // Scale the input coordinates.
        let nx = noiseScale * x;
        let ny = noiseScale * y;
        let nt = noiseScale * sketch.frameCount;

        // Compute the noise value.
        let c = noiseLevel * sketch.noise(nx, ny, nt);

        // Draw the point.
        sketch.noStroke();
        sketch.fill(255, (c / 255) * 100 - 50);
        sketch.rect(x * 10, y * 10, 10, 10);
      }
    }
    //sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
  };

  sketch.keyPressed = () => {
    if (sketch.keyCode === sketch.UP_ARROW) {
      // flowerNum ++;
      patternNum++;
      fade = fade < 1 ? fade + 0.1 : 1;
    } else if (sketch.keyCode === sketch.DOWN_ARROW) {
      // flowerNum --;
      patternNum--;
      fade = fade > -0.7 ? fade - 0.1 : -0.7;
    }
  };

  class Blob {
    constructor(x, y, rad, col) {
      this.x = x;
      this.y = y;
      this.rad = rad;
      this.szDelta = this.rad * 0.35;
      this.blobObj = [];
      this.col = col;
      // constants
      this.res = sketch.random(4, 15); // the number of points
      this.angle = 360 / sketch.random(4, 15); // angular distance between each point
    }

    display() {
      this.blobObj = [];
      sketch.push();
      sketch.noFill();
      sketch.translate(
        this.x + sketch.random(-5, 5),
        this.y + sketch.random(-5, 5)
      );
      sketch.beginShape(); // start to draw custom shape
      sketch.stroke(this.col);
      var d = sketch.dist(
        this.x,
        this.y,
        sketch.width * 0.5,
        sketch.height * 0.5
      );
      sketch.strokeWeight(2);
      for (var i = 0; i < sketch.random(4, 15); i++) {
        var randRad = sketch.min(
          this.rad,
          this.rad + sketch.random(-this.szDelta, this.szDelta)
        );
        var nRad = this.rad + randRad;
        this.blobObj.push({
          rad: randRad,
          x: randRad * sketch.cos(this.angle * i),
          y: randRad * sketch.sin(this.angle * i),
        });
        //circle(this.blobObj[i].x, this.blobObj[i].y, 5);
        sketch.curveVertex(this.blobObj[i].x, this.blobObj[i].y); // add points to the custom shape
      }
      sketch.curveVertex(this.blobObj[0].x, this.blobObj[0].y);
      sketch.curveVertex(this.blobObj[1].x, this.blobObj[1].y);
      sketch.curveVertex(this.blobObj[2].x, this.blobObj[2].y);
      sketch.endShape(); // we finish adding points
      sketch.pop();
    }
  }
});
