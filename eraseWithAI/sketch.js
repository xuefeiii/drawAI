let model;
let previous_pen = 'down';
let x,y;
let strokePath;
let seedStrokes = [];
let canvas;
var modelList = [
  'alarm_clock',
  'ambulance',
  'angel',
  'ant',
  'antyoga',
  'backpack',
  'barn',
  'basket',
  'bear',
  'bee',
  'beeflower',
  'bicycle',
  'bird',
  'book',
  'brain',
  'bridge',
  'bulldozer',
  'bus',
  'butterfly',
  'cactus',
  'calendar',
  'castle',
  'cat',
  'catbus',
  'catpig',
  'chair',
  'couch',
  'crab',
  'crabchair',
  'crabrabbitfacepig',
  'cruise_ship',
  'diving_board',
  'dog',
  'dogbunny',
  'dolphin',
  'duck',
  'elephant',
  'elephantpig',
  'eye',
  'face',
  'fan',
  'fire_hydrant',
  'firetruck',
  'flamingo',
  'flower',
  'floweryoga',
  'frog',
  'frogsofa',
  'garden',
  'hand',
  'hedgeberry',
  'hedgehog',
  'helicopter',
  'kangaroo',
  'key',
  'lantern',
  'lighthouse',
  'lion',
  'lionsheep',
  'lobster',
  'map',
  'mermaid',
  'monapassport',
  'monkey',
  'mosquito',
  'octopus',
  'owl',
  'paintbrush',
  'palm_tree',
  'parrot',
  'passport',
  'peas',
  'penguin',
  'pig',
  'pigsheep',
  'pineapple',
  'pool',
  'postcard',
  'power_outlet',
  'rabbit',
  'rabbitturtle',
  'radio',
  'radioface',
  'rain',
  'rhinoceros',
  'rifle',
  'roller_coaster',
  'sandwich',
  'scorpion',
  'sea_turtle',
  'sheep',
  'skull',
  'snail',
  'snowflake',
  'speedboat',
  'spider',
  'squirrel',
  'steak',
  'stove',
  'strawberry',
  'swan',
  'swing_set',
  'the_mona_lisa',
  'tiger',
  'toothbrush',
  'toothpaste',
  'tractor',
  'trombone',
  'truck',
  'whale',
  'windmill',
  'yoga',
  'yogabicycle',
  'everything',
];
var humanSlider;
var aiSlider;
let sliderX = 100;
let ubuntu;

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(360,15,100);

  ubuntu = loadFont('libraries/SourceCodePro-Black.otf');
  console.log('font loaded!')

  humanStyles();
  aiStyles();
}

function humanStyles(){
  humanSlider = createSlider(10,100,50);

  humanSlider.position(sliderX,20);
  humanSlider.style('-webkit-appearance','none');
  humanSlider.style('appearance','none');
  humanSlider.style('width','200px');
  humanSlider.style('height','10px');
  humanSlider.style('outline','none');

  console.log('human styles running')
}

function aiStyles(){
  aiSlider = createSlider(10,100,50);

  aiSlider.position(sliderX*4,20);
  aiSlider.style('-webkit-appearance','none');
  aiSlider.style('appearance','none');
  aiSlider.style('width','200px');
  aiSlider.style('height','10px');
  aiSlider.style('outline','none');
}

function sliderHeightChange(){
  sliderHeight = 'humanSlider.value()'+'px';
  humanSlider.style('height',sliderHeight);
  console.log('humanslider value change to ' + humanSlider.value())
}

function humanDraw(){

  if (mouseIsPressed){

    //stroke(200);
    //strokeWeight(10);
    line(pmouseX,pmouseY,mouseX,mouseY)

    let humanStroke = {
      dx: mouseX - pmouseX,
      dy: mouseY - pmouseY,
      pen: 'down'
    };

    seedStrokes.push(humanStroke);
    console.log('pushed humanStroke!')
  }

  //background(220,100);
}

function mouseReleased(){
  modelLoad();
  seedStrokes = [];
}

function modelLoad(){
  let q = int(random(0,114));
  console.log(q);
  console.log(modelList[q]);
  model = ml5.SketchRNN('everything', modelReady);
  console.log("I'm loading the model")
}


function modelReady(){
  console.log('model is ready!');
  startDrawing();
}

function startDrawing(){
  // change this to the center point of all human strokes
  x = mouseX;
  y = mouseY;

  model.generate(seedStrokes, gotStroke);
}

function draw(){

  fill(340,60,100);
  noStroke();
  rect(0,0,width,50);

  instruction();

  if (mouseY>100){

    var humanStroke = humanSlider.value();
    strokeWeight(humanStroke);

    if (keyIsDown(SHIFT)){
      stroke(360,15,100)
    } else {
      stroke(random(360),60,100);
    }
    humanDraw();

    var aiStroke = aiSlider.value();
    strokeWeight(aiStroke);

    if (keyIsDown(SHIFT)){
      stroke(random(360),65,100);
    } else {
    stroke(360,15,100)
      }
    aiDraw();
  }
}

function instruction(){
  textFont('ubuntu');
  textSize(15);
  fill(360,0,100);
  var h = 32;
  text('Long press SHIFT to erase!', width-220, h);
  text('My pen:', sliderX-65,h);
  text("AI's pen:", sliderX*4-70,h);
}

function aiDraw(){
  if (strokePath){

    if (previous_pen == 'down'){
      //strokeWeight(30);
      line(x,y,x+strokePath.dx, y+strokePath.dy);
      //console.log('I know pen is down')
    }

    x += strokePath.dx;
    y += strokePath.dy;
    previous_pen = strokePath.pen;

    if (strokePath.pen !== 'end'){
      strokePath = null;
      model.generate(gotStroke);

      //console.log('ai drawing!')
    }
  }
}

function gotStroke(err,s){
  strokePath = s;
  //console.log('I got the stroke!');
}
