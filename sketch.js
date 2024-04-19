// a shader variable
let cam1 = new p5((sketch) => {
  let flower;
  let flowers;
  let cells;
  let water;

  let flowerNum = 0;
  let patternNum = 1;
  let shaderNum = 0;
  let fade = 0;

  sketch.preload = () => {
    // load the shader
    flower = sketch.loadShader("shader.vert", "shaders/flower.frag");
    flowers = sketch.loadShader("shader.vert", "shaders/flowers.frag");
    cells = sketch.loadShader("shader.vert", "shaders/cells.frag");
    water = sketch.loadShader("shader.vert", "shaders/water.frag");
  };

  sketch.setup = () => {
    sketch.pixelDensity(1);
    // shaders require WEBGL mode to work

    sketch.createCanvas(
      sketch.windowWidth,
      sketch.windowHeight,
      sketch.WEBGL,
      document.getElementById("cam1")
    );
    sketch.noStroke();
  };

  sketch.draw = () => {
    // send resolution of sketch into shader
    flower.setUniform("u_time", sketch.frameCount * 0.01);
    flower.setUniform("u_resolution", [sketch.width, sketch.windowHeight]);
    flower.setUniform("u_mouse", [sketch.mouseX, sketch.mouseY]);

    flower.setUniform("u_flowerNum", flowerNum);
    flower.setUniform("u_patternNum", patternNum);
    flower.setUniform("u_fade", fade);

    cells.setUniform("u_time", sketch.frameCount * 0.01);
    cells.setUniform("u_resolution", [sketch.width, sketch.windowHeight]);
    cells.setUniform("u_mouse", [sketch.mouseX, sketch.mouseY]);

    cells.setUniform("u_fade", fade);

    // send resolution of sketch into shader
    flowers.setUniform("u_time", sketch.frameCount * 0.01);
    flowers.setUniform("u_resolution", [sketch.width, sketch.windowHeight]);
    flowers.setUniform("u_mouse", [sketch.mouseX, sketch.mouseY]);

    flowers.setUniform("u_flowerNum", flowerNum);
    flowers.setUniform("u_patternNum", patternNum);
    flowers.setUniform("u_fade", fade);

    // send resolution of sketch into shader
    water.setUniform("u_time", sketch.frameCount * 0.01);
    water.setUniform("u_resolution", [sketch.width, sketch.windowHeight]);
    water.setUniform("u_mouse", [sketch.mouseX, sketch.mouseY]);

    switch (shaderNum) {
      case 0:
        sketch.shader(cells);
        break;
      case 1:
        sketch.shader(flower);
        break;
      case 2:
        sketch.shader(flowers);
        break;
      case 3:
        sketch.shader(water);
        break;
    }

    sketch.rect(0, 0, sketch.windowWidth, sketch.height);
  };

  sketch.keyPressed = () => {
    if (sketch.keyCode === sketch.UP_ARROW) {
      // flowerNum ++;
      patternNum++;
      fade += 0.1;
    } else if (sketch.keyCode === sketch.DOWN_ARROW) {
      // flowerNum --;
      patternNum--;
      fade -= 0.1;
    }

    switch (sketch.key) {
      case "0":
        shaderNum = 0;
        break;
      case "1":
        shaderNum = 1;
        break;

      case "2":
        shaderNum = 2;
        break;
      case "3":
        shaderNum = 3;
        break;
    }
  };

  sketch.windowResized = () => {
    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
  };
});
