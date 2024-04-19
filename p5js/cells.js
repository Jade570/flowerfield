let cells = new p5((sketch) => {
  let seedPoints = [];
  let velocities = [];

  let delaunay;

  sketch.setup = () => {
    sketch.createCanvas(
      sketch.windowWidth,
      sketch.windowHeight,
      document.getElementById("cells")
    );
    for (let i = 0; i < 200; i++) {
      seedPoints[i] = sketch.createVector(
        sketch.random(sketch.width),
        sketch.random(sketch.height)
      );
      velocities[i] = p5.Vector.random2D().setMag(sketch.random(0.25, 1));
    }
  };

  sketch.draw = () => {
    sketch.clear();

    delaunay = calculateDelaunay(seedPoints);
    voronoi = delaunay.voronoi([0, 0, sketch.width, sketch.height]);

    sketch.noFill();
    sketch.strokeWeight(1);

    let polygons = voronoi.cellPolygons();
    let cells = Array.from(polygons);
    let areas = [];

    let maxArea = 0;

    
    for (let i = 0; i < seedPoints.length; i++) {
      let poly = cells[i];
      let area = 0;
      for (let j = 0; j < poly.length; j++) {
        let v0 = poly[j];
        let v1 = poly[(j + 1) % poly.length];
        let crossValue = v0[0] * v1[1] - v1[0] * v0[1];
        area += crossValue;
      }
      poly.area = area;
      if (area > maxArea) {
        maxArea = area;
      }
      let p = seedPoints[i];
      let v = velocities[i];

      sketch.stroke(255);
      sketch.strokeWeight(1);
      // area사이즈 따라서 핵 사이즈 다르게 하고 싶음
      sketch.circle(p.x, p.y, sketch.map(area,0,maxArea,0,sketch.sqrt(area)/4));
      p.add(v);
      if (p.x > sketch.width || p.x < 0) {
        v.x *= -1;
      }
      if (p.y > sketch.height || p.y < 0) {
        v.y *= -1;
      }
    }


    for (let poly of cells) {
      sketch.stroke(255);
      sketch.strokeWeight(2);
      sketch.noFill();
      sketch.beginShape();
      for (let i = 0; i < poly.length; i++) {
        sketch.vertex(poly[i][0], poly[i][1]);
      }
      sketch.endShape();
    }
    //sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
  };

  function calculateDelaunay(points) {
    let pointsArray = [];
    for (let v of points) {
      pointsArray.push(v.x, v.y);
    }
    return new d3.Delaunay(pointsArray);
  }
});
