//******************************************************************************
// Original code "Crowd Simulator" by Szenia Zadvornykh: https://codepen.io/zadvorsky/pen/xxwbBQV
// Revised by DamarideNeurommancer:
// Added Images of Altered Cards by DamarideNeurommancer
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
// - FullScreen
// - Restart  (start over with default settings)
// - Refresh (as browser's F5)
// - Home link
// - Save settings
// - Exit from App
//******************************************************************************
const home="https://damarideneurommancer.github.io/AlteredCards/";
const config={
 src: 'AllCards.jpeg',
 rows: 9,
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
 Size: 350,
 BackColor: '#000000',
 DefaultBackColor: function(){setDefaultBackColor();}, 
 Restart: function(){restart();},
 AutoRestart: 10,
 FullScreen: function(){toggleFullScreen();},
 Cards: 81,
 Effect: 0,
 Pause: function(){pause();},
 Play: function(){play();},
 Home: function(){window.location=home;},
 Save: function(){mySave();},
 Refresh: function(){window.location=document.URL;},
 Exit: function(){myExit();}
 ,Sound: false 
}
const movement={
 both: true,
 left: false,
 right: false
};
const easeEffects=["none","bounce.out","elastic.out(1,0.3)","back.out(1.7)","rough({template: none.out,strength:1,points:20,taper:none,randomize:true,clamp:false})","slow(0.7,0.7,false)"];
const bMobile=isMobile();
const musicaChk={
 val: false
};
var timeLines=[];
// UTILS
const randomRange = (min, max) => min + Math.random() * (max - min)
const randomIndex = (array) => randomRange(0, array.length) | 0
const removeFromArray = (array, i) => array.splice(i, 1)[0]
const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item))
const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array))
const getRandomFromArray = (array) => (  array[randomIndex(array) | 0])

// TWEEN FACTORIES
const resetCard = ({ stage, card }) => {
 if( settings.Sound){
  tuneUp(card.name.toString());
 }
 //console.log("resetCard: ",card.name, " Card WxH: ",card.width," x ",card.height);
 // Keep the card's size set!
 if(card.width!=settings.Size){
  card.setRect(card.rect);
 //console.log("*** resetCard: Adjusted card size for ",card.name, " Card WxH: ",card.width," x ",card.height);
 } 

 // direction: left/right/both 
 if(movement.both)
  direction = Math.random() > 0.5 ? 1 : -1;
 else if(movement.left)
  direction=-1;
 else
  direction=1;  
   
 //if(settings.Direction)
 // using an ease function to skew random to lower values to help hide that cards have no legs
 //const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random())
 
 //ls
 //const offsetY = 100 - 450 * gsap.parseEase('power2.in')(Math.random())
 //const offsetY = -10 - 250 * gsap.parseEase('power1')(Math.random()); //Ok normale.
 //const offsetY = -10 - 250 * gsap.parseEase('power2.in')(Math.random()); // Ok va bene
 //const offsetY = -10 - 250 * gsap.parseEase('elastic(1.2, 0.5)')(Math.random());  //OK mi piace
 //const offsetY = -10 - 250 * gsap.parseEase('elastic(1.2, 0.5)')(Math.random());  //OK mi piace
 //const offsetY = randomRange(-canvas.height, 0);  //Ok da perferzionare
 //const offsetY = randomRange(-stage.height, 0);
 //const offsetY = randomRange(0,-stage.height); //ok da peferzionare
 
 //const offsetY = -250*gsap.parseEase('elastic(1.2,0.5)')(Math.random()); //ok da peferzionare
 
 //var offsetY = -250*gsap.parseEase('elastic(1.2,0.5)')(Math.random());
 
 
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
  //card.scaleX = 1
 } else {
   startX = stage.width + card.width
   endX = -card.width
   //card.scaleX = -1
   //card.scaleX = 1 // per evitare il titolo al contrario nessun flip orizz.
 }
  
 card.x = startX
 card.y = startY
 card.anchorY = startY
 //console.log("resetCard: ",card.name," startY:",startY," startX:",startX," endX",endX) 
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

 // Durata per x ed y
 xDuration = settings.xDuration;
 yDuration = settings.yDuration;
  
 const tl = gsap.timeline()
 // per la pause/play
 timeLines.push(tl);
 
 //console.log("Card:",card.name,"tl: ", {tl});
 var strEffect=easeEffects[parseInt(settings.Effect)];  
  
 // tl.timeScale(randomRange(0.1, 0.5)) // OK mi piace va abbastanza lento
 // gestione del tempo
 tl.timeScale(randomRange(0.1, 1.5)) // OK va bene
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
    //console.log("Card constructor: Image:", {image}," Name:",name," Rect:",{rect})
  }
  
 setRect (rect) {
  this.rect = rect
  this.width = settings.Size;
  this.height = Math.round(this.width*sizeRatio);
    
  this.drawArgs = [
   this.image,
   ...rect,
   0, 0, this.width, this.height
  ]
  //console.log("drawArgs: ", {"drawArgs": this.drawArgs})   
 }
  
 render (ctx) {
  ctx.save()
  // Questi due statements messi qua rendono tutto nero lo sfondo e si vede solo una card!
  /**if(Math.random() > 0.5){
   ctx.fillStyle="black";
   ctx.fillRect(0,0,canvas.width, canvas.height);
  }**/

  // Rounded corners
  roundedImage(ctx,this.x,this.y,this.width,this.height,!bMobile?20:10);
  ctx.clip();
  //----------------
  
  ctx.translate(this.x, this.y)
  ctx.scale(this.scaleX, 1)
  
  /* // Prove
  var rot=Math.random() > 0.5 ? 1 : -1;
  if(rot==1){
   //ctx.translate(0, this.height);
   //ctx.scale(1, -1);
   
   ctx.translate(this.width/2,this.height/2);
   ctx.rotate(Degree2Rad(30));
   ctx.drawImage(this.image, -this.width/2, -this.height/2);
  }
  else
  */
  
  ctx.drawImage(...this.drawArgs)
  /*
  if(rot==1)
   context.setTransform(1,0,0,1,0,0);
  */ 
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
/*
const allCards = []
const availableCards = []
const gallery = []
*/
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
 //const total=30;
 const rectWidth = width / rows
 const rectHeight = height / cols
  
 for (let i = 0; i < total; i++) {
  allCards.push(new Card({
   image: img,
    rect: [
      (i % rows) * rectWidth,
      (i / rows | 0) * rectHeight,
      rectWidth,
      rectHeight,
     ],
     name: i
   }))
 }
 //console.log("allCards: ",{allCards});  
}

function resize () {
 stage.width = canvas.clientWidth
 stage.height = canvas.clientHeight
 canvas.width = stage.width * devicePixelRatio
 canvas.height = stage.height * devicePixelRatio

 //console.log("*** resize:: stage WxH: ",stage.width," x " , stage.height, {stage});
 //console.log("*** resize:: canvas WxH: ",canvas.width," x " , canvas.height, {canvas});
 gallery.forEach((card) => {
  card.walk.kill()
 })
  
 gallery.length = 0
 availableCards.length = 0
 availableCards.push(...allCards)
 //console.log("availableCards: ",{availableCards});
  
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
   //timeLines.splice(81);
 })
  
 card.walk = walk 
 gallery.push(card)
 gallery.sort((a, b) => a.anchorY - b.anchorY)
 //console.log("initGallery: ",{gallery}); 
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
 ctx.fillRect(0,0,canvas.width, canvas.height);
 //------------
  
 ctx.save()
 ctx.scale(devicePixelRatio, devicePixelRatio)   
 gallery.forEach((card) => {
  card.render(ctx)
 })
  
 ctx.restore()
}

//ls
function roundedImage(ctx,x,y,width,height,radius){
 ctx.beginPath();
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
 dat.GUI.TEXT_CLOSED = "Close Controls &#x1F53C;";
  
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
 var size=gui.add(settings,'Size',minSize,maxSize).step(1).name('Size &#x1F4D0;');
 
 // BACKCOLOR 
 gui.addColor(settings, 'BackColor',[0,0,0]).listen();
 gui.add(settings, 'DefaultBackColor');
 // EASE EFFECTS
 gui.add(settings,'Effect',{None:'0',Bounce:'1',Elastic:'2',Back:'3',Rough:'4',Slow:'5'}).name('Ease Effects').onChange(function(){getComboValue()});
 // Pause/Play
 gui.add(settings, 'Pause').name('Pause \u23F8');
 gui.add(settings, 'Play').name('Play  \u23E9');
 // SOUND
 gui.add(musicaChk,'val').name('Sound &#x1F3B5;').onChange(function(){getSound()}).listen();
 //FULLSCREEN
 gui.add(settings, 'FullScreen').name('FullScreen &#x1F7EA');
 // RESTART
 gui.add(settings, 'Restart').name('Restart \u26A1');
gui.add(settings, 'AutoRestart', 10, 60).step(1).name('AutoRestart (s)').onChange(function(){setAutoRestart()}).listen();
//gui.add(settings, 'AutoRestart', 10, 60).step(1).name('AutoRestart (s)');
 // REFRESH
 gui.add(settings,'Refresh').name('Refresh &#x1F4BB;');
   
 gui.add(settings,'Home').name('DamarideNeurommancer');
 gui.add(settings,'Save').name('Save Settings &#x1F4CC;'); 
 gui.add(settings,'Exit').name('Exit &#x274C;');
 gui.closed=true;
 tick();
//}
function setAutoRestart(){
 //settings.AutoRestart*=1000;
}

function getSound(){
 settings.Sound=musicaChk.val;
}
           
totCards.onChange(function () {
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
 return(window.orientation!=null&&window.orientation!="undefined");
}

/*
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
    var json=gui.getSaveObject();
    JSON.stringify(json);
});
*/

function mySave(){
 try{
  var s=settings;
  //var json=gui.getSaveObject();
  //localStorage.setItem("ScreenSaver",JSON.stringify(json));
  //Direction|xDuration|yDuration|Size|BackColor|Cards|Effect
  var saveSet=s.Direction+"|"+s.xDuration+"|"+s.yDuration.toFixed(2)+"|"+
   s.Size+"|"+s.BackColor+"|"+s.Cards+"|"+s.Effect; //+"|"+document.fullscreenElement?1:0;
   localStorage.setItem("DNScreenSaver",saveSet); 
 }
 catch(err){console.log(err);} 
}

function myInit(){
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
 if(confirm("Exit from ScreenSaver and Close Window?")) {
  window.stop();
  window.close();
 }
 return;
}

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
function tick(){
 var wait= parseInt(settings.AutoRestart*1000);
 timerID=setInterval(function(){
  if(!bPaused){
   //console.log('%c wait for '+wait,'color:blue;border:1px solid dodgerblue');
   //console.log('%c Tick...','color:red;border:1px solid dodgerblue');
   init();
   console.log("clearInterval ", timerID);
   clearInterval(timerID);
   tick();
  }
 },wait); //(settings.AutoRestart*1000)); //10000);
 //console.log("New timerID= ", timerID);
}