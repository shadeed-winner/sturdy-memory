//variables//
status = "";
obj_name = "";
//arrays//
objects = [];
//P5.js functions//
function setup() {
canvas = createCanvas(380,380);
canvas.position(492,260);
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
}

function draw() {
image(video, 0, 0, 480, 380);
if(status != "") {
objectDetector.detect(video, gotResult);
for (i = 0; i < objects.length; i++) {
document.getElementById("status").innerHTML = "Status: Objects Detected";
fill("#FF0000");
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke("#FF0000");
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if (objects[i].label == obj_name) {
video.stop();
objectDetector.detect(gotResult);
document.getElementById("object_found").innerHTML = obj_name + " Found";
var synth = window.speechSynthesis;
var utterThis = new SpeechSynthesisUtterance(obj_name + "Found");
synth.speak(utterThis);
} else {
document.getElementById("object_found").innerHTML = obj_name + "not Found";
}
}
}
}
//functions//
function start() {
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";
obj_name =  document.getElementById("object_name").value;
}

function modelLoaded() {
console.log('Model Loaded!');
status = true;
}

function gotResult(error, results) {
if (error) {
console.log(error);
}
console.log(results);
objects = results;
}