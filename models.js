// a shader variable
let models = new p5((sketch) => {
  let fountain;
  let spheres = [];

  let theShader;
  let shaderTexture;

  let x;
  let y;

  let texture = 1;
  let showFountain = false;
  let showModels = true;

  sketch.preload = () => {
    fountain = sketch.loadModel("fountain.obj", true);

    // load the shader
    theShader = sketch.loadShader("shaders/shape.vert", "shaders/water.frag");
  };

  sketch.setup = () => {
    sketch.pixelDensity(1);
    // shaders require WEBGL mode to work
    sketch.createCanvas(
      sketch.windowWidth,
      sketch.windowHeight,
      sketch.WEBGL,
      document.getElementById("cam2")
    );

    // sketch.noStroke();
    shaderTexture = sketch.createGraphics(200, 200, sketch.WEBGL);

    shaderTexture.noStroke();
    sketch.textureWrap(sketch.MIRROR);
    x = -50;
    y = 0;
    sketch.background(0, 0, 0, 0);
  };

  sketch.draw = () => {
    sketch.clear();

    theShader.setUniform("u_time", sketch.frameCount * 0.01);
    theShader.setUniform("u_resolution", [sketch.width, sketch.windowHeight]);
    theShader.setUniform("u_mouse", [sketch.mouseX, sketch.mouseY]);

    shaderTexture.shader(theShader);
    shaderTexture.rect(0, 0, sketch.width, sketch.height);

    switch (texture) {
      case 1: // normal map
        sketch.normalMaterial();
        break;

      case 2: // wireframe
        sketch.fill(0, 0, 0, 0);
        sketch.stroke(255);
        break;

      case 3: // water map
        sketch.texture(shaderTexture);
        sketch.noStroke();
        break;

      case 4: // wireframe fill
        sketch.fill(255, 255);
        sketch.stroke(0);
        break;

      case 5: // wireframe fill
      sketch.ambientLight(100);
      sketch.directionalLight(255,255,255,-1,-1,1);
        sketch.fill(255, 255);
        sketch.noStroke();
        break;
    }

    if (showModels) {
      if (showFountain) {
        sketch.push();
        sketch.translate(0, 0, 0);
        sketch.push();
        sketch.rotateX(sketch.frameCount * 0.01);
        // sketch.rotateY(sketch.frameCount * 0.01);
        sketch.rotateZ(sketch.frameCount * 0.01);
        sketch.scale(2.0);
        sketch.model(fountain);
        sketch.pop();
        sketch.pop();
      } else {
      }

      for (poly of spheres) {
        sketch.push();
        polygons(poly[0], poly[1], poly[2], poly[3], poly[4], poly[5]);
        sketch.pop();
      }
    } else {
    }
  };

  sketch.keyPressed = () => {
    if (sketch.keyCode === sketch.UP_ARROW) {
    } else if (sketch.keyCode === sketch.DOWN_ARROW) {
    } else if (sketch.keyCode === sketch.LEFT_ARROW) {
      spheres.pop();
    } else if (sketch.keyCode === sketch.RIGHT_ARROW) {
      spheres.push([
        sketch.random(0.3, 2),
        Math.floor(sketch.random(4, 24)),
        Math.floor(sketch.random(4, 24)),
        sketch.random(-(sketch.windowWidth / 2), sketch.windowWidth / 2),
        sketch.random(-(sketch.windowHeight / 2), sketch.windowHeight / 2),
        0,
      ]);
    } else if (sketch.keyCode === sketch.ENTER) {
      showFountain = !showFountain;
    }

    switch (sketch.key) {
      case "q":
        showModels = !showModels;
        break;
      case "a":
        showModels = false;
        spheres = [];
        break;
      case "w":
        texture = 1;
        break;
      case "e":
        texture = 2;
        break;
      case "r":
        texture = 3;
        break;
      case "t":
        texture = 4;
        break;
      case "y":
        texture = 5;
        break;
    }
  };

  sketch.windowResized = () => {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
  };

  polygons = (size, detailX, detailY, x, y, z) => {
    sketch.translate(x, y, z);
    sketch.push();
    sketch.rotateZ(sketch.frameCount * 0.0001 * x);
    sketch.rotateX(sketch.frameCount * 0.0001 * y);
    sketch.rotateY(sketch.frameCount * 0.0001 * z);
    sketch.scale(size);
    sketch.sphere(50, detailX, detailY);
    sketch.pop();
  };
});
