// Text 2 Prhyrexian Translator Ver.1.0
// Copyright © DamarideNeurommancer

/****
*  Phyrexian fonts here used are copyright to their respective owners.
*  Font1: downloaded from: https://drive.google.com/file/d/1uUMey6AqsnG5l7xWlj9JOiiSOK4LfJ9b/view
*  Font2: downloaded from Wizard of the Coast
*  Font3: downloaded from: https://github.com/davide2894/nissa/tree/master/app/fonts/Fonts%20-%20Magic%20Templates/Magic%20-%20Phyrexian 
****/
 
// --- Font1
// Phi_horizontal_gbrsh_2
// https://drive.google.com/drive/folders/1F4CX-f6mK_Cbe70POmZ21YgusLNz570N

// --- Font2
// Phrexia-Regular TTF font
// downloadable from the WOTC website
// https://www.reddit.com/r/PhyrexianLanguage/comments/10tast1/using_the_field_guide_and_wotc_phrexiaregular_ttf/
// https://www.reddit.com/r/magicTCG/comments/hw20o2/phyrexian_font_download/?rdt=46807

// -- Font3
// Phyrexian Nissa Davide
// Phyrexian font template is copyright ©2013 Anuttymous
// https://github.com/davide2894/nissa/tree/master
// https://github.com/davide2894/nissa/tree/master/app/fonts/Fonts%20-%20Magic%20Templates/Magic%20-%20Phyrexian

/*
* Font Size   (10,12,14,16,18,20,22,34,26,28,32,48,72)
* Orientation (Vertical|Horizontal)
* Font Color
* Background Color (auto generated on user request as foreground complementary color)
* Font Type (1|2|3)
*/

var inputArea=document.getElementById("inputArea");
const cmbFontsize=document.getElementById("cmbFontsize");
const cmbOrientation=document.getElementById("cmbOrientation");
const cmbFont=document.getElementById("cmbFont");
const colorPicker=document.getElementById("colorPicker");
const backColor=document.getElementById("backColor");
const chkAutoBackColor=document.getElementById('chkAutoBackColor');
const chkIgnoreBlanks=document.getElementById('chkIgnoreBlanks');
const chkReverseLines=document.getElementById('chkReverseLines');
const btnTranslate=document.getElementById('btnTranslate');
const canvas = document.querySelector('#canvasPhy');
const ctx = canvas.getContext('2d');
const PHY_END_LINE='.';
const ctxFontName=["px PhiFontHor","px Phyrexian","px PhyrexianMagic"];
const PHY_START=["|","^","\\"]
var cnt1=0;
var cnt2=0;
var cnt3=0;

function phyTranslate(){ 
 var textString;
 var x=0;
 var y=0;
 // Get input text, if blank then clear canvas and return
 textString=inputArea.value.trim();
 if(textString.length<=0){
  ctx.fillStyle=backColor.value;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  return;
 }
 var originalText=textString;
  
 // Get selected FontSize, Orientation and FontSet
 var fontsize=cmbFontsize.value;
 const orientation=cmbOrientation.value;
 const fonttype=cmbFont.value;

 // Clean/Replace/Transform input Text from unmanaged characters
 textString=prepareText(textString,fonttype); 
 // Set font size
 ctx.font = fontsize+ctxFontName[fonttype-1];
 // Get font metrix
 const metrics=ctx.measureText("X");
 
 var linesAndCount=getLines(textString);
 var lines=linesAndCount[0];
 var count=linesAndCount[1];
 
 var delta,topPadding;
 // Set canvas size
 delta=metrics.width;
 topPadding=delta/2;
 setActualCanvasFont(lines,fontsize,delta,fonttype);
 
 // For the very first time it does't work when the font(x) hasn't been loaded yet
 // I tried a lot of stuff from internet and they don't work!
 // So I have to 'clean' the input string, do a fake printing and ask the user to click again! 
 if(fonttype==1&&cnt1==0){cnt1++;lines[0]=" ";textString=" ";ctx.fillStyle="white";ctx.clearRect(0,0,canvas.width,canvas.height);}
 if(fonttype==2&&cnt2==0){cnt2++;lines[0]=" ";textString=" ";ctx.fillStyle="white";ctx.clearRect(0,0,canvas.width,canvas.height);}
 if(fonttype==3&&cnt3==0){cnt3++;lines[0]=" ";textString=" ";ctx.fillStyle="white";ctx.clearRect(0,0,canvas.width,canvas.height);}
 
 // Auto Background Color?
 if(chkAutoBackColor.checked){
  // Compute complementary color for background
  let white = parseInt("FFFFFF",16);
  let curColor = parseInt(colorPicker.value.substring(1),16);
  let res = "#"+(white-curColor).toString(16).padStart(6,'0');
  ctx.fillStyle=res;
  backColor.value = res;
 }
 else{
  // User Selected Background Color
  ctx.fillStyle=backColor.value;
 }
 // Set background context color
 ctx.fillRect(0,0,canvas.width,canvas.height);
 
 // Set foreground context color, once for all!
 ctx.fillStyle=colorPicker.value;
 
 // Set context fontname and fontsize, once for all! 
 ctx.font = fontsize+ctxFontName[fonttype-1];

 y=delta+2;
 switch(orientation){
  case "1": // Vertical
   for(var l=count-1;l>=0&&lines[l]!=""&&lines[l]!='\n';l--){    
    drawMaster(lines[l],delta,topPadding,y,fonttype);
    y+=parseFloat(fontsize);
   }
   // Rotate
   myRotate(90);
   break;
  case "2": // Horizontal
   for(var l=0;l<count&&lines[l]!=""&&lines[l]!='\n';l++){   
    drawMaster(lines[l],delta,topPadding,y,fonttype);
    y+=parseFloat(fontsize); // You need parseFloat!!!
   }
   break; 
 }
 // Please press again! 
 if(lines[0]==" "){
  ctx.fillStyle=backColor.value;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  myAlert();
  phyTranslate();
 }
 canvas.title=originalText;
}

function drawChar(c,x,y){
 // ctx.fillStyle and ctx.font set once for all at the beginning!
 ctx.fillText(c,x,y);
}

function drawMaster(curLine,delta,topPadding,y,fonttype){
 var x;
 if(curLine=="")
  return;
 // Trick for the first time ever!
 if(curLine!=" "){
  if(curLine[0]!=PHY_START[fonttype-1])
   curLine=PHY_START[fonttype-1]+curLine;
  if(curLine[curLine.length-1]!=PHY_END_LINE)
   curLine=curLine+PHY_END_LINE;
 }
 var lastwidth=0; 
 for(var i=0;i<curLine.length;i++){
  const c=curLine[i];
  const metrics=ctx.measureText(c);
  if(i==0)
   x=metrics.width;
  else
   x+=lastwidth;
  drawChar(c,x,y);
  lastwidth=metrics.width;    
 }
}

function setActualCanvasFont(lines,fontsize,delta,fonttype){
 if(lines==""||lines[0]=="")
  return;
 var maxWidth=0;
 var y=delta+2;
 var curLine;
 for(var l=0;l<lines.length;l++){
  curLine=lines[l];
  if(curLine!=" "){
   if(curLine[0]!=PHY_START[fonttype-1])
    curLine=PHY_START[fonttype-1]+curLine;
   if(curLine[curLine.length-1]!=PHY_END_LINE)
    curLine=curLine+PHY_END_LINE;
  }    
  var lastwidth=0; 
  for(var i=0;i<curLine.length;i++){
   const c=curLine[i];
   const metrics=ctx.measureText(c);
   if(i==0)
    x=metrics.width;
   else
    x+=lastwidth;
   lastwidth=metrics.width;    
  }
  if(maxWidth<(x+lastwidth))
   maxWidth=x+lastwidth;
  if(l<lines.length-1)
   y+=parseFloat(fontsize);
 }
 canvas.width=maxWidth+10;
 canvas.height=y+10;
}

function prepareText(textString,fonttype){
 // Remome blanks if requested
 if(chkIgnoreBlanks.checked)
  textString=textString.replaceAll(' ',''); 
 // CR+LF or CR are treated like LF
 textString=textString.replaceAll("\r\n","\n").replaceAll("\r","\n");
 // Remove multiple blanks
 textString = textString.replace(/  +/g, ' ');
 // Treat accented letters
 textString=textString.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
 var clearedText=textString;
 switch(fonttype){
  case "1":
   // START OF LINE: '|'
   // END OF LINE  : '.'
   // Uses both uppercase and lowercase
   // Uppercase A-Z | lowercase a-z | number digit 0-9 | start '|' end='.' comma=',' 
   clearedText=""; 
   for(var i=0;i<textString.length;i++){
    const c=textString[i];
    if((c>='A'&&c<='Z')||(c>='a'&&c<='z')||(c>='0'&&c<='9')||(c==PHY_START[0]||c==','||c==PHY_END_LINE||c=='\r'||c=='\r\n'||c=='\n'||c==' ')||
    c=='%'||c=='&'||c=='$'||c=='_'
    )
     clearedText+=c;
   }
   break;
  case "2":
   // START OF LINE: '^'
   // END OF LINE  : '.'
   // Uses lowercase only.
   // ==> lowercase 'c' and uppercase 'C' don't exist.
   // Replace 'c' with 'k' and 'C' with 'K'. (My choice!)
   textString=textString.replaceAll("c","k").replaceAll("C","K");
   textString=textString.toLowerCase();
   clearedText=""; 
   for(var i=0;i<textString.length;i++){
    const c=textString[i];
    if((c>='a'&&c<='z')||(c>='0'&&c<='9')||(c==PHY_START[1]||c==','||c==PHY_END_LINE||c=='\r'||c=='\r\n'||c=='\n'||c==' '))
     clearedText+=c;
   }
   break;
  case "3":
   // START OF LINE: '\\'
   // END OF LINE  : '.'
   // Uses lowercase only.
   // 'b' 'g' 'h' 'r' 'u' 'w' don't exist!!!
   textString=textString.toLowerCase();
   textString=textString.replaceAll("g","").replaceAll("b","").replaceAll("h","").replaceAll("r","").replaceAll("u","").replaceAll("w","");
   clearedText=""; 
   for(var i=0;i<textString.length;i++){
    const c=textString[i];
    if((c>='a'&&c<='z')||(c>='0'&&c<='9')||
       (c==PHY_START[2]||c==','||c==PHY_END_LINE||c=='\r'||c=='\r\n'||c=='\n'||c==' '||
        c=='%'||c=='&'||c=='('||c==')'||c=='"'||c=="'"||c=='*'||c=='>'||c=='<'
        //||c=='+' //'+' plus char means continue on next line?
       )
      )
     clearedText+=c;
   }
   break;
 } 
 return clearedText;
}

function getLines(text){
 var bReverse=chkReverseLines.checked;
 // Avoid empty strings with 'filter' 
 var lines = text.split(/\r|\r\n|\n/).filter(function(i){return i});
 var count = lines.length;
 for(var l=0;l<count;l++){
  lines[l]=lines[l].trim();
  if(bReverse){
   lines[l]=reverseLine(lines[l]);
  }
 }
 return[lines,count];
}

function reverseLine(line){
 var rv="";
 for(var i=0;i<line.length;i++){
  rv=line[i]+rv;
 }
 return rv;
}

inputArea.addEventListener('keyup', function(event){
 // Return on input field.
 //if(event.keyCode==13){
  btnTranslate.click();
 //}
});

// Event on color combo
colorPicker.addEventListener("input",phyTranslate,false);
// Event on background color combo
backColor.addEventListener("input",phyTranslate,false);
// Event on orientation combo
cmbOrientation.addEventListener("change",phyTranslate,false);
// Event on font combo
cmbFont.addEventListener("change",phyTranslate,false);
// Event on check Auto Background Color
chkAutoBackColor.addEventListener("change",phyTranslate,false);
// Event on check Ignore Blanks
chkIgnoreBlanks.addEventListener("change",phyTranslate,false);
// Event on check Reverse Lines
chkReverseLines.addEventListener("change",phyTranslate,false);

function myRotate(degrees){
 // Create a second in-memory canvas:
 var mCanvas=document.createElement('canvas');
 mCanvas.width=canvas.width;
 mCanvas.height=canvas.height;
 var mctx=mCanvas.getContext('2d');
 // Draw my canvas onto the second canvas
 mctx.drawImage(canvas,0,0);

 const imgWidth = canvas.width;
 const imgHeight = canvas.height;
 const rect = getBoundingRect(canvas.width,canvas.height,degrees);
 canvas.width = rect.width;
 canvas.height = rect.height;
 ctx.translate(canvas.width/2,canvas.height/2);
 ctx.rotate(Degree2Rad(degrees));
 ctx.drawImage(mCanvas, -imgWidth/2, -imgHeight/2);
 ctx.setTransform(1,0,0,1,0,0);
}

function getBoundingRect(width,height,degree) {
 let rad = Degree2Rad(degree);
 let points = [{x:0,y:0},{x:width,y:0},{x:width,y:height},{x:0,y:height}];
 let minX = undefined;
 let minY = undefined;
 let maxX = 0;
 let maxY = 0;
 for (let index = 0; index < points.length; index++) {
  const point = points[index];
  const rotatedPoint = getRotatedPoint(point.x,point.y,width/2,height/2,rad);
  if (minX == undefined) {
   minX = rotatedPoint.x;
  }else{
    minX = Math.min(rotatedPoint.x,minX);
  }
  if (minY == undefined) {
   minY = rotatedPoint.y;
  }else{
    minY = Math.min(rotatedPoint.y,minY);
  }
  maxX = Math.max(rotatedPoint.x,maxX);
  maxY = Math.max(rotatedPoint.y,maxY);
 }
 let rectWidth = maxX - minX;
 let rectHeight = maxY - minY;
 let rect = {
  x: minX,
  y: minY,
  width: rectWidth,
  height: rectHeight
 }
 return rect;
}

function Degree2Rad(degree){
 return degree*Math.PI/180
}

function getRotatedPoint(x,y,cx,cy,theta){
 let tempX = x - cx;
 let tempY = y - cy;

 // now apply rotation
 let rotatedX = tempX*Math.cos(theta) - tempY*Math.sin(theta);
 let rotatedY = tempX*Math.sin(theta) + tempY*Math.cos(theta);

 // translate back
 x = rotatedX + cx;
 y = rotatedY + cy;
 let point = {x:x,y:y};
 return point;
}

function phySave(filename){
 if(!isCanvasBlank(canvas)){
  var link=document.createElement('a');
  link.href=canvas.toDataURL();
  link.download=(filename!=undefined&&filename!=""?filename:"PhyrexianCanvas.png");
  link.click();
  link.remove();
 }
}

// returns true if every pixel's uint32 representation is 0 (or "blank")
function isCanvasBlank(canvas) {
  const context = canvas.getContext('2d');
  const pixelBuffer = new Uint32Array(
    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );
  return !pixelBuffer.some(color => color !== 0);
}

function myAlert(){
 var sHelp ='"'+cmbFont.options.item(cmbFont.selectedIndex).innerText+'"\nThis font set is about to be loaded...\nTry pressing the "Translate" button again!';
 try{
  var imgurl=prevTr.querySelector('img').getAttribute('src');
  var url=prevTr.querySelector('a').getAttribute('href');
  var imgtitle=prevTr.querySelector('img').getAttribute('title');  
  Swal.fire({    
   title: "<span><a style='color:Blue' href='"+url+"'>"+imgtitle+"</a></span>",
   html: "<p style='color:Maroon;font-size:14px'><b>"+sHelp.replaceAll('\n','<br>')+"</b></p>",
   imageUrl: imgurl,
   imageWidth: 80,
   imageHeight: 104,
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{
  alert(sHelp);
 }
}