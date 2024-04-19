// a shader variable
let cam2 = new p5((sketch) => {
    let flower;
    let cells;
    let flowerNum = 0;
    let patternNum = 1;
    let shaderNum = 0;
    let fade = 0;
  
    sketch.preload = () => {
      // load the shader
      flower = sketch.loadShader("shader.vert", "shaders/flowers.frag");
      cells = sketch.loadShader("shader.vert", "shaders/cells.frag");
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
      sketch.noStroke();
    };
  
    sketch.draw = () => {
      // send resolution of sketch into shader
      flower.setUniform("u_time", sketch.frameCount * 0.01);
      flower.setUniform("u_resolution", [
        sketch.width,
        sketch.windowHeight
      ]);
      flower.setUniform("u_mouse", [sketch.mouseX, sketch.mouseY]);
  
      flower.setUniform("u_flowerNum", flowerNum);
      flower.setUniform("u_patternNum", patternNum);
      flower.setUniform("u_fade", fade);
  
      cells.setUniform("u_time", sketch.frameCount * 0.01);
      cells.setUniform("u_resolution", [
        sketch.width,
        sketch.windowHeight,
      ]);
      cells.setUniform("u_mouse", [sketch.mouseX, sketch.mouseY]);
  
      cells.setUniform("u_fade", fade);
  
      // shader() sets the active shader with our shader

        sketch.shader(flower);
  
  
      // rect gives us some geometry on the screen
      sketch.rect(0, 0, sketch.windowWidth, sketch.height);
      // console.log(frameCount*0.01);
    };
  
    sketch.keyPressed = () => {
      if (sketch.keyCode === sketch.UP_ARROW) {
        // flowerNum ++;
        patternNum++;
      } else if (sketch.keyCode === sketch.DOWN_ARROW) {
        // flowerNum --;
        patternNum--;
      }
  
      if (sketch.key === "0") {
        shaderNum = 0;
      } else if (sketch.key === "1") {
        shaderNum = 1;
      }
    };
  
    sketch.windowResized = () => {
      sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    };
  });
  