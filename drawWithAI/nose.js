var video;
var poseNet;
var poses = [];
var noseX = 0;
var noseY = 0;

function setup(){
  createCanvas(windowWidth,windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth,windowHeight);
  video.hide();

  poseNet = ml5.poseNet(video, "multiple", modelReady);
  poseNet.on('pose', gotPoses);
}

function modelReady(){
  console.log("model is ready!");
}

function draw(){
  background(255);

  ellipse(width-noseX,noseY,100,100);
}

function gotPoses(poses){
  console.log(poses);
  noseX = poses[0].pose.keypoints[0].position.x;
  noseY = poses[0].pose.keypoints[0].position.y;
}
