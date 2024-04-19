// a shader variable
let theShader;

function preload(){
  // load the shader
  theShader = loadShader('shader.vert', 'shaders/flowers.frag');
}

function setup() {
  pixelDensity(1);
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {  
  // send resolution of sketch into shader
  theShader.setUniform("u_time", frameCount*0.01);
  theShader.setUniform('u_resolution', [width, windowHeight]);
  theShader.setUniform("u_mouse", [mouseX, mouseY]);

  // shader() sets the active shader with our shader
  shader(theShader);

  // rect gives us some geometry on the screen
  rect(0,0,windowWidth, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}