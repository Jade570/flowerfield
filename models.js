// a shader variable
let models = new p5((sketch) => {
  let fountain;

  let theShader;
  let shaderTexture;

  let x;
  let y;
  let modelState = 0;

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

    switch (modelState) {
      case 0:
        break;

      case 1: // normal map
        sketch.normalMaterial();
        sketch.translate(0, 0, 0);
        sketch.push();
        sketch.rotateX(sketch.frameCount * 0.01);
        sketch.rotateY(sketch.frameCount * 0.01);
        sketch.scale(2.0);
        sketch.model(fountain);
        sketch.pop();

        sketch.translate(350, 0, 0);
        sketch.push();
        sketch.rotateX(sketch.frameCount * 0.01);
        sketch.rotateY(sketch.frameCount * 0.01);
        sketch.sphere(125);
        sketch.scale(2.0);
        sketch.pop();
        break;

      case 2: // wireframe
        sketch.fill(0,0,0,0);
        sketch.stroke(1);
        sketch.translate(0, 0, 0);
        sketch.push();
        sketch.rotateX(sketch.frameCount * 0.01);
        sketch.rotateY(sketch.frameCount * 0.01);
        sketch.scale(2.0);
        sketch.model(fountain);
        sketch.pop();

        sketch.translate(350, 0, 0);
        sketch.push();
        sketch.rotateX(sketch.frameCount * 0.01);
        sketch.rotateY(sketch.frameCount * 0.01);
        sketch.sphere(125);
        sketch.scale(2.0);
        sketch.pop();
        break;

      case 3: // water map
        sketch.texture(shaderTexture);
        sketch.noStroke();
        sketch.translate(0, 0, 0);
        sketch.push();
        sketch.rotateX(sketch.frameCount * 0.01);
        sketch.rotateY(sketch.frameCount * 0.01);
        sketch.scale(2.0);
        sketch.model(fountain);
        sketch.pop();

        sketch.translate(350, 0, 0);
        sketch.push();
        sketch.rotateX(sketch.frameCount * 0.01);
        sketch.rotateY(sketch.frameCount * 0.01);
        sketch.sphere(125);
        sketch.scale(2.0);
        sketch.pop();
        break;
    }
    // sketch.normalMaterial();
  };

  sketch.keyPressed = () => {
    if (sketch.keyCode === sketch.UP_ARROW) {
    } else if (sketch.keyCode === sketch.DOWN_ARROW) {
    }

    switch (sketch.key) {
      case "q":
        modelState = 0;
        break;
      case "w":
        modelState = 1;
        break;
      case "e":
        modelState = 2;
        break;
      case "r":
        modelState = 3;
        break;
    }
  };

  sketch.windowResized = () => {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
  };
});
