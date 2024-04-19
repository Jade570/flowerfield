let lines = new p5((sketch) => {
  let points = [];
  let noiseDist = [];
  let colors = ["#2083da", "#52afea", "#5a8ffd", "#6dbefe", "#a0aaff"];

  sketch.setup = () => {
    sketch.createCanvas(
      sketch.windowWidth,
      sketch.windowHeight,
      document.getElementById("lines")
    );
    sketch.angleMode(sketch.DEGREES);

    for (let a = 0; a < sketch.width / 50 + 5; a++) {
      noiseDist.push(sketch.noise(a));
    }
  };

  sketch.draw = () => {
    sketch.background("#62aafe");
    sketch.strokeWeight(5);
    sketch.noFill();
    sketch.fill("#44adff");

    let dist = sketch.height / 30;
    let xdist = 50;

    for (let a = -5; a < sketch.width / 50; a++) {
      sketch.fill(colors[sketch.abs(a % 4)]);
      sketch.beginShape();
      sketch.curveVertex(a * 50 + 10 * noiseDist[a + 5], 0);
      for (let i = -1; i < 31; i++) {
        sketch.curveVertex(
          a * 50 +
            10 * noiseDist[a + 5] +
            30 *
              sketch.noise(10 + (i + a) * 2 + sketch.frameCount / 50) *
              sketch.sin(i * 50 + sketch.frameCount + i) +
            sketch.noise(10 + (i + a) * 2 + sketch.frameCount / 100) * 50,
          dist * i
        );
      }
      sketch.vertex(a * 50 + 3 * noiseDist[a + 5], sketch.height + dist);
      sketch.vertex(sketch.width, sketch.height + dist);

      sketch.vertex(sketch.width, -dist);
      sketch.vertex(a * 50 + 10 * noiseDist[a + 5], -dist);
      sketch.endShape();
    }
  };
});
