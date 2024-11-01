//openSketch © 2022 by Mark Franz is licensed under CC BY-NC-SA 4.0 

var socket;



function setup() {
  //background(255,0,0);
  createCanvas(windowWidth, windowHeight, SVG);
  socket = io.connect("https://opensketch.glitch.me");
  socket.on("mouse", newDrawing);

  //slider = createSlider(1, 50, 1);
  //slider.position(10, 10);
  //slider.style("width", "200px");
  
  sel = createSelect();
  sel.position(10, 10);
  sel.option('Micro', 1);
  sel.option('Dinky', 5);
  sel.option('Slim', 15);
  sel.option('Classic', 25);
  sel.option('Super', 50);
  sel.option('Monster', 100);
  sel.style("width", "100px");
  sel.style("text-align", "center");



  colorPicker = createColorPicker("#FFFFFF");
  colorPicker.position(10, 40);
  colorPicker.style("width", "100px");

  //background(0);

  button = createButton("Save SVG");
  button.position(10, 80);
  button.mousePressed(dsvg);
  button.style("width", "100px");
  
  button2 = createButton("Reset");
  button2.position(10, 110);
  button2.mousePressed(erased);
  button2.style("width", "100px");

  
}

function draw() {}


function dsvg() {
  save("openSketch.svg"); // give file name
}

function erased(){
    window.location.reload();
}


function touchMoved() {
  var data = {
    x: mouseX,
    y: mouseY,
    px: pmouseX,
    py: pmouseY,
    val: sel.value(),
    color: str(colorPicker.color()),
  };

  //package of information being sent from application

  //local stuff, use local variables (e.g. not data.x etc...)
  fill(colorPicker.color());
  stroke(colorPicker.color());
  strokeWeight(sel.value());
  line(mouseX, mouseY, pmouseX, pmouseY);
  

  socket.emit("mouse", data);
  console.log("sending:" + mouseX + "," + mouseY);

}

//what to do when we received data
function newDrawing(data) {
  stroke(data.color);
  strokeWeight(data.val);
  line(data.x, data.y, data.px, data.py);
}

//function windowResized() {
//resizeCanvas(windowWidth, windowHeight);
//}
