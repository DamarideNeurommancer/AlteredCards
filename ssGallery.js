//******************************************************************************
// Original code "Crowd Simulator" by Szenia Zadvornykh: 'https://codepen.io/zadvorsky/pen/xxwbBQV'
// Revised by DamarideNeurommancer:
// Added Images of Altered Cards by DamarideNeurommancer
// Fixed a bug when computing X,Y to get sub-image from the big picture
// Fixed a glitch when image goes out of the view in the scene  
// Added: GUI. You can parametrize:
// - Duration: X/Y
// - Movements: Left/Right/Both
// - Movements: Now images disapper completely only when all image has reached the end of scene 
// - Number of cards to show
// - Cards Size
// - Background color and Reset to default black color
// - Ease effects (with gsap)
// - Pause/Play (me+gsap)
// - Sound On/Off
// - Sound Graph (smoothie.js by 'http://smoothiecharts.org/' modified with label draw on the apex point ) 
// - FullScreen
// - Restart  (start over with default settings)
// - Auto Restart after secs
// - Refresh (as browser's F5)
// - Home link
// - Save settings
// - Exit from App (desktop only)
//******************************************************************************
const home="https://damarideneurommancer.github.io/AlteredCards/";
const dada="\u00A9 DamarideNeurommancer";
const config={
 src: 'AllCards.jpeg',
 rows: 12,
 cols: 9
}
const maxCards=config.rows*config.cols;
const sizeRatio=1.3942;
var totCards=maxCards;
var direction=1;
var xDuration=30;
var yDuration=0.45;
var minSize=82;
var maxSize=350;
var timerID=0;
var bPaused=false;
const settings={
 Direction: 1,
 xDuration: 30,
 yDuration: 0.45,
 Size: maxSize,
 BackColor: '#000000',
 DefaultBackColor: function(){setDefaultBackColor();}, 
 Restart: function(){restart();},
 AutoRestart: 20,
 FullScreen: function(){toggleFullScreen();},
 Cards: maxCards, //108, //81,
 Effect: 0,
 Pause: function(){pause();},
 Play: function(){play();},
 Home: function(){window.location=home;},
 Save: function(){mySave();},
 Refresh: function(){window.location=document.URL;},
 Exit: function(){myExit();},
 Sound: false,
 SoundGraph: false 
}
const movement={
 both: true,
 left: false,
 right: false
};
const easeEffects=["none","bounce.out","elastic.out(1,0.3)","back.out(1.7)","rough({template: none.out,strength:1,points:20,taper:none,randomize:true,clamp:false})","slow(0.7,0.7,false)"];
var bMobile=false;
isMobile();
const soundChk={
 val: false
};
var timeLines=[];
var bSoundOn=false;
var bSoundGraphOn=false;
const soundGraphChk={
 val: false
};
// UTILS
const randomRange = (min, max) => min + Math.random() * (max - min)
const randomIndex = (array) => randomRange(0, array.length) | 0
const removeFromArray = (array, i) => array.splice(i, 1)[0]
const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item))
const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array))
const getRandomFromArray = (array) => (  array[randomIndex(array) | 0])

// TWEEN FACTORIES
const resetCard = ({ stage, card }) => {
 if(settings.Sound){
  //Math.random()>0.75?tuneUp(card.name.toString()):0;
  if(!bSoundOn){
   TuneGenerator();
   bSoundOn=true;
   if(settings.SoundGraph){
    showGraph();
    bSoundGraphOn=true;
   }
  }
  else{
   if(bSoundGraphOn==true&&!settings.SoundGraph){
    hideGraph();
    bSoundGraphOn=false;
   }
   if(bSoundGraphOn==false&&settings.SoundGraph){
    showGraph();
    bSoundGraphOn=true;
   }
  }
 }
 else{
   if(bSoundOn){
    clearInterval(timerID1);
    clearInterval(timerID2);
    bSoundOn=false;
   }
   if(settings.SoundGraph&&bSoundGraphOn){
    hideGraph();
    bSoundGraphOn=false;
   }
 }


 // Keep the card's size set!
 if(card.width!=settings.Size){
  card.setRect(card.rect);
 } 

 // direction: left/right/both 
 if(movement.both)
  direction = Math.random() > 0.5 ? 1 : -1;
 else if(movement.left)
  direction=-1;
 else
  direction=1; 
 
 //var offsetY = -250+randomRange(0,-stage.height); //OK
 var offsetY = randomRange(-card.height,stage.height-card.height);
 var startY = stage.height - card.height + offsetY;
 // adjust y
 if(startY<0||(startY+card.height>stage.height))
  startY=randomRange(0,stage.height-card.height);
 let startX
 let endX
 
 card.scaleX = 1; 
 if (direction === 1) {
  startX = -card.width
  endX = stage.width+card.width
 } else {
   startX = stage.width + card.width
   endX = -card.width
 }
  
 card.x = startX
 card.y = startY
 card.anchorY = startY
 //console.log("Card:",card.name," start(",startX,",",startY,") endX:",endX); 
 return{
  startX,
  startY,
  endX
 }
}

const normalWalk = ({ card, props }) => {
 const {
  startX,
  startY,
  endX
 } = props
 
 xDuration = settings.xDuration;
 yDuration = settings.yDuration;
  
 const tl = gsap.timeline()
 // Pause/Play
 timeLines.push(tl);
 
 var strEffect=easeEffects[parseInt(settings.Effect)];  
  
 tl.timeScale(randomRange(0.1, 1.5))
 tl.to(card, {
  duration: xDuration,
  x: endX,
  ease: strEffect
 }, 0)
 tl.to(card, {
  duration: yDuration,
  repeat: xDuration / yDuration,
  yoyo: true,
  y: startY - 10
 }, 0)
   
 return tl
}

const walks = [
 normalWalk,
]

// CLASSES
class Card {
 constructor({
  image,
  rect,
  name
 }) {
    this.image = image
    this.rect = rect // per risistemare la size nella resetCard
    this.setRect(rect)
    
    this.x = 0
    this.y = 0
    this.anchorY = 0
    this.scaleX = 1
    this.walk = null
    this.name=name
  }
  
 setRect(rect){
  this.rect=rect
  this.width=settings.Size;
  this.height=Math.round(this.width*sizeRatio);
    
  this.drawArgs=[
   this.image,
   ...rect,
   0, 0, this.width, this.height
  ]   
 }
  
 render(ctx){
  ctx.save()
  roundedImage(ctx,this.x,this.y,this.width,this.height,(bMobile?10:20));
  ctx.clip();
  ctx.translate(this.x, this.y)
  ctx.scale(this.scaleX, 1)
  ctx.drawImage(...this.drawArgs) 
  ctx.restore()
 }
}

// MAIN
const img = document.createElement('img')
img.onload = init
img.src = config.src

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const stage = {
 width: 0,
 height: 0,
}

var allCards = []
var availableCards = []
var gallery = []

function init () {
 timeLines=[];
 allCards = [];
 availableCards = [];
 gallery = [];
 createCards()
 // resize also (re)populates the stage
 resize()
 gsap.ticker.add(render)
 window.addEventListener('resize', resize)
}

function createCards () {
 const {
  rows,
  cols
 } = config
 const {
  naturalWidth: width,
  naturalHeight: height
 } = img
 //const total = rows * cols
 const total=settings.Cards;
 //const total=1;
 const rectWidth = width / cols
 const rectHeight = height / rows
  
 for (let i = 0; i < total; i++) {
  //console.log("Card#: ",i, "X: ",(i % cols) * rectWidth, " Y: ",(i / cols | 0) * rectHeight)
  allCards.push(new Card({
   image: img,
    rect: [
      //(i % rows) * rectWidth, // bug in the original code
      (i % cols) * rectWidth,
      //(i / rows | 0) * rectHeight, // bug in the original code
      (i / cols | 0) * rectHeight,
      rectWidth,
      rectHeight,
     ],
     name: i
   }))
 }  
}

function resize () {
 stage.width = canvas.clientWidth
 stage.height = canvas.clientHeight
 canvas.width = stage.width * devicePixelRatio
 canvas.height = stage.height * devicePixelRatio
 gallery.forEach((card) => {
  card.walk.kill()
 })
  
 gallery.length = 0
 availableCards.length = 0
 availableCards.push(...allCards)  
 initGallery()
}

function initGallery () {
 while (availableCards.length) {
  // setting random tween progress spreads the cards out
  addCardToGallery().walk.progress(Math.random())
 }
}

function addCardToGallery () {
 const card = removeRandomFromArray(availableCards)
 const walk = getRandomFromArray(walks)({
   card,
   props: resetCard({
     card,
     stage,
   })
 }).eventCallback('onComplete', () => {
   removeCardFromGallery(card)
   addCardToGallery()
 })
  
 card.walk = walk 
 gallery.push(card)
 gallery.sort((a, b) => a.anchorY - b.anchorY) 
 return card
}

function removeCardFromGallery (card) {
 removeItemFromArray(gallery, card)
 availableCards.push(card)
}

function render () {
 // Questo è il posto giusto per il colore dello sfondo
 // Sfondo random!!!
 //ctx.fillStyle="#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0"); 
 ctx.fillStyle=settings.BackColor;
 ctx.fillRect(0,0,canvas.width,canvas.height);
 //-
  
 ctx.save()
 ctx.scale(devicePixelRatio, devicePixelRatio)   
 gallery.forEach((card) => {
  card.render(ctx)
 })
  
 ctx.restore()
}

function roundedImage(ctx,x,y,width,height,radius){
 ctx.beginPath();
 ctx.fillStyle="white";
 ctx.moveTo(x + radius, y);
 ctx.lineTo(x + width - radius, y);
 ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
 ctx.lineTo(x + width, y + height - radius);
 ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
 ctx.lineTo(x + radius, y + height);
 ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
 ctx.lineTo(x, y + radius);
 ctx.quadraticCurveTo(x, y, x + radius, y);
 ctx.closePath();
}

//function setSettings(){
 // GUI SETTINGS ******
 // Open/Close Controls
 dat.GUI.TEXT_OPEN = "Please, open me &#x1F53D;";
 dat.GUI.TEXT_CLOSED = "Close Controls &#x1F53C; "+dada;
  
 var gui = new dat.GUI({load: settings}); //{ autoPlace: false }
 
 //.listen() per aggiornare la UI ma poi non puoi modificare a mano il campo di edit!
 // DURATION
 var durXY = gui.addFolder("Duration \u231B");
 xDuration = durXY.add(settings, 'xDuration', 1, 100).step(1).name('X-axis');
 yDuration = durXY.add(settings, 'yDuration', 0, 5).step(0.01).name('Y-axis');
 durXY.closed=false;
 //MOVEMENT
 var dirMove = gui.addFolder('Movement \u2708');
 var b1 = dirMove.add(movement,'both').name('Both \u2194').onChange(function(){setChecked("both")}).listen();
 var l1 = dirMove.add(movement,'left').name('Left \u2190').onChange(function(){setChecked("left")}).listen();
 var r1 = dirMove.add(movement,'right').name('Right \u2192').onChange(function(){setChecked("right")}).listen();
 dirMove.closed=false;
 
 // CARDS
 totCards = gui.add(settings, 'Cards', 1, maxCards).step(1).name('Cards \u2652');
 
 // SIZE
 if(bMobile){
  minSize=48;
  maxSize=192;
 }
 settings.Size=maxSize;
 var size=gui.add(settings,'Size',minSize,maxSize).step(1).name('Size &#x1F4D0;');
 //settings.Size=maxSize;
 
 // BACKCOLOR 
 gui.addColor(settings, 'BackColor',[0,0,0]).listen();
 gui.add(settings, 'DefaultBackColor');
 // EASE EFFECTS
 gui.add(settings,'Effect',{None:'0',Bounce:'1',Elastic:'2',Back:'3',Rough:'4',Slow:'5'}).name('Ease Effects').onChange(function(){getComboValue()});
 // Pause/Play
 gui.add(settings, 'Pause').name('Pause \u23F8');
 gui.add(settings, 'Play').name('Play  \u23E9');
 // SOUND
 //if(!bMobile)
  gui.add(soundChk,'val').name('Sound &#x1F3B5;').onChange(function(){getSound()}).listen();
  gui.add(soundGraphChk,'val').name('SoundGraph&#x1F4C8;').onChange(function(){getSoundGraph()}).listen();
 //FULLSCREEN
 gui.add(settings, 'FullScreen').name('FullScreen &#x1F7EA');
 // RESTART
 gui.add(settings, 'Restart').name('Restart \u26A1');
 gui.add(settings, 'AutoRestart', 0, 300).step(1).name('AutoRestart &#x1F552;').onChange(function(){setAutoRestart()}).listen();
//gui.add(settings, 'AutoRestart', 10, 60).step(1).name('AutoRestart (s)');
 // REFRESH
 gui.add(settings,'Refresh').name('Refresh &#x1F4BB;');
   
 gui.add(settings,'Home').name('DamarideNeurommancer');
 gui.add(settings,'Save').name('Save Settings &#x1F4CC;');
 if(!bMobile) 
  gui.add(settings,'Exit').name('Exit &#x274C;');
 gui.closed=true;
 tick();
//}
function setAutoRestart(){
}

function getSound(){
 settings.Sound=soundChk.val;
}
function getSoundGraph(){
 settings.SoundGraph=soundGraphChk.val;
}
           
totCards.onChange(function(){
 init()
})

function getComboValue(){
 init();
}

size.onChange(function(){
 init();
});

// Movement checkboxes
function setChecked( prop ){
 for(let param in movement){
  movement[param]=false;
 }
 movement[prop]=true;
 settings.Direction=(prop=="both"?0:(prop=="left"?-1:1));
 init();
}

function setDefaultBackColor(){
 settings.BackColor='#000000';
}

function toggleFullScreen(){
 if (!document.fullscreenElement){
  document.documentElement.requestFullscreen();
 } else if (document.exitFullscreen){
   document.exitFullscreen();
 }
}

function restart(){
 xDuration=30;
 yDuration=0.45;
 settings.xDuration=xDuration;
 settings.yDuration=yDuration;
 settings.BackColor='#000000';
 setChecked("both");
 settings.Cards=maxCards;
 settings.Size=maxSize;
 updateDisplay(gui);
 init();
}

function isMobile(){
 bMobile=(window.orientation!=null&&window.orientation!="undefined");
 if(bMobile){
  minSize=48;
  maxSize=192;
 }
}

function mySave(){
 try{
  var s=settings;
  //Direction|xDuration|yDuration|Size|BackColor|Cards|Effect
  var saveSet=s.Direction+"|"+s.xDuration+"|"+s.yDuration.toFixed(2)+"|"+
   s.Size+"|"+s.BackColor+"|"+s.Cards+"|"+s.Effect;
   localStorage.setItem("DNScreenSaver",saveSet); 
 }
 catch(err){console.log(err);} 
}

function myInit(){
 isMobile();
 myGetSettings();
}

function myGetSettings(){
 try{
  var savedSet=localStorage.getItem("DNScreenSaver");
  if(savedSet!=""&&savedSet!=null&&savedSet!="undefined"){
   var s=settings;
   var par=savedSet.split("|");
   s.Direction=parseInt(par[0]);
   s.xDuration=parseInt(par[1]);
   s.yDuration=Math.round(par[2]*100)/100; //100 times faster then parseFloat(par[2]); 
   s.Size=parseInt(par[3]);
   s.BackColor=par[4];
   s.Cards=parseInt(par[5]);
   s.Effect=parseInt(par[6]);
   //var bFullScreen=par[7];
   //if(bFullScreen)
    //toggleFullScreen();
   switch(s.Direction){
    case 0:
     setChecked("both");
     break;
     case 1:
     setChecked("right");
     break;
     case -1:
     setChecked("left");
     break;
   }
   updateDisplay(gui);
  }
 }
 catch(err){console.log(err);} 
}

function updateDisplay(gui){
 for(var i in gui.__controllers) {
  gui.__controllers[i].updateDisplay();
 }
 for(var f in gui.__folders) {
  updateDisplay(gui.__folders[f]);
 }
}

function pause(){
 for(var i=0;i<timeLines.length;i++){
  timeLines[i].pause();
 }
 bPaused=true;
}
function play(){
for(var i=0;i<timeLines.length;i++){
  timeLines[i].play();
 }
 bPaused=false;
}

// Funziona solo se non segui alcun link (quello a sito principale) e torni.
function myExit(){
 if(!bMobile){
  if(confirm("Exit from ScreenSaver and Close Window?")) {
   window.stop();
   window.close();
  }
 } 
 return;
}

function tick(){
 var wait= parseInt(settings.AutoRestart*1000);
 if(wait==0)
  wait=600000; //10minutes
 timerID=setInterval(function(){
  if(!bPaused){
   //console.log('%c wait for '+wait,'color:blue;border:1px solid dodgerblue');
   //console.log('%c Tick...','color:red;border:1px solid dodgerblue');
   init();
   //console.log("clearInterval ", timerID);
   clearInterval(timerID);
   tick();
  }
 },wait);
 //console.log("New timerID= ", timerID);
}

var timerGraph;
var chart2=null;
var series2 = new TimeSeries();

function startTimer(){  
 // Add a data point every 500ms
 timerGraph= setInterval(function(){ 
  var now = Date.now();
  if(gl_Freq&&gl_Freq.length>0){
   const frequency=gl_Freq.shift();
   const note=freqToNote(frequency);  
   series2.append(now,frequency,false,note);
  }
}, 500);
}


function createTimeline(){  
 // tooltipLine:{strokeStyle:'#bbbbbb'}, 
 // interpolation:'bezier' // default
 chart2 = new SmoothieChart({ 
  labels:{showIntermediateLabels:true},
  tooltip:true,
  //timestampFormatter:SmoothieChart.timeFormatter,                                        
  grid: { strokeStyle:'rgb(125, 0, 0)', fillStyle:'rgb60, 0, 0)',lineWidth: 1, millisPerLine: 250, verticalSections: 6, },
  title: { text: dada},
  responsive: true });
 chart2.addTimeSeries(series2, {strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4});
 chart2.streamTo(document.getElementById("chart-responsive"), 500);
 startTimer();
}

function startGraph(){
 chart2.start();
 startTimer();
}
function stopGraph(){
 clearInterval(timerGraph);
 chart2.stop();
}

var notes=new Array ('C','C#','D','Eb','E','F','F#','G','G#','A','Bb','B');
var semitone = 1.0594630944;
//var logsemitone = Math.log(semitone);
var cent = Math.pow(semitone,0.01);
var logcent = Math.log(cent);
var octzero = 16.35159783; // the frequency of C0

function reduce(numerator,denominator){
 var gcd = function gcd(a,b){
  return b ? gcd(b, a%b) : a;
 };
 gcd = gcd(numerator,denominator);
 return [numerator/gcd, denominator/gcd];
}

function freqToNote(f){
	var octave, n, octstart, notenum;
	octave = Math.floor(Math.log(f/octzero)/Math.log(2.));
	//debug ('Octave: '+octave);
	octstart = octzero*Math.pow(2.,octave);
	centstooctstart = Math.log(f/octstart)/logcent;
	//debug ('centstooctstart: '+centstooctstart);

	sttooctstart = Math.round(centstooctstart/100.);
	
	if (sttooctstart == 12) {
		octave ++;
		sttooctstart = 0;
		octstart = octzero*Math.pow(2.,octave);
		centstooctstart = Math.log(f/octstart)/logcent;
	}
	notenum = sttooctstart;
	freqn = octstart*Math.pow(semitone,notenum);
	//debug ('freqn: '+freqn);

	//centsDetuned = Math.round(Math.log(f/freqn)/logcent);
	// ** GET THE MICROTONAL DEVIATION INDICATOR ** //
	/*microtonalDeviation = '';
	var quantizedCents = 50;
	var quantizedCentsThresh = quantizedCents/2;
	if (centsDetuned > quantizedCentsThresh || centsDetuned < -quantizedCentsThresh) {
		microtonalDeviation = Math.round(centsDetuned/quantizedCents);
		var numerator = microtonalDeviation;
		var denominator = 4;
		var fraction = reduce(numerator,denominator);
		if (microtonalDeviation > 0) {
			if (fraction[0]==1 && fraction[1] == 4) {
				microtonalDeviation = '+¼';
			} else {
				microtonalDeviation = '+'+fraction[0]+'/'+fraction[1];
			}
		} else {
			if (fraction[0]==1 && Math.abs(fraction[1]) == 4) {
				microtonalDeviation = '-¼';
			} else {
				microtonalDeviation = '-'+fraction[0]+'/'+Math.abs(fraction[1]);
			}
		}
	}*/
	//return f+"\t"+notes[notenum]+"\t"+octave+"\t"+centsDetuned+"\t"+microtonalDeviation+"\n";
	return notes[notenum]+octave;
}               
const modal=document.getElementById('myModal');
function hideGraph(){ 
 modal.style.display="none";
 stopGraph();
}
function showGraph(){
 modal.style.display="block";
 createTimeline();
}

var span=document.getElementsByClassName("close")[0];
span.onclick=function(){
 hideGraph();
 soundGraphChk.val=false;
 settings.SoundGraph=false;
}

function toggleGraph(){
 if (chart2.frame){
  // We're already running
  chart2.stop();
 }
 else{
  //chart2.options.scrollBackwards=!chart2.options.scrollBackwards
  chart2.start();
 }
}
