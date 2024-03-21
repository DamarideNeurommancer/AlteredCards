// TODO
// Credits per i contenuti
// Fonts??
var bxmlParsed=false;
var xmlDoc;
var catalog,book;
var totXmlTarots;
const mySpreads=document.getElementById("mySpreads");
const myDate=document.getElementById("myDate");
const myDetails=document.getElementById('myDetails');
const myDivDate=document.getElementById('divDate');
const myPanel=document.getElementById('panel');
const modalPopupImg=document.getElementById("img02");

const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const header=document.getElementById('myHeader');
const captionText=document.getElementById("caption");
const modal=document.getElementById('myModal');
const captionModal=document.getElementById('caption-modal');
const setURL="index_AlteredSets.html?set=1";
const details=document.getElementById('details');
//const originalImage=new Image();
//var CardURL="";

var spreadNo=1;
myDate.valueAsDate = new Date();
function myParseTarots(){
 var parser=new DOMParser();
 xmlDoc=parser.parseFromString(xmlTarots,"text/xml");
 catalog=xmlDoc.getElementsByTagName('Tarots')[0];
 totXmlTarots=catalog.childElementCount;
 bxmlParsed=true;
}

function mySpreadChange(){
 if(bxmlParsed==false){
   myParseTarots();
 }  
 spreadNo=parseInt(mySpreads.selectedIndex+1);
 if(spreadNo!=1)
  myDivDate.style.visibility="hidden";
 else
  myDivDate.style.visibility="visible";
  myRead();
}

function myRead(){
 if(bxmlParsed==false){
  myParseTarots();
 }
 switch(spreadNo){
  case 1:
   BirthDateTarots(); // 2 o 3 Tarots
   break;
  case 2: 
   FourWinds();
   break;
  case 4: // 5 Tarots. 4 Random + 1 Quintessenza Calcolato
   WitchesPentagram();
   break;
  case 5: // 4 Tarots Random
   TarocDemarseilleCross();
   break;
  case 6: // Tarot De Marseille Open Reading: 3 Tarots Random (No Reverse) 
   TarocDeMarseilleNoReverse();
   break;
  case 7: // Tarot Pairs: 6 Tarocs Random
   TarocPairs();
   break;
  case 8: // Sacred Circle: 5 Tarots. 4 Random + 1 Center of Circle Calcolato
   SacredCircle();
   break;
  case 9: // Mandala: 9 Tarots
   MandalaTarots();
   break;
  default:
   BirthDateTarots();
 }
}

function BirthDateTarots(){
 const mydate=new Date(myDate.value);
 var Aday,Amonth,Ayear,ACentury,AYearPart,sum;
 Aday=mydate.getDate();
 Amonth=mydate.getMonth()+1;
 Ayear=mydate.getFullYear();
 ACentury=Math.floor(Ayear/100);
 AYearPart=Ayear%100;
 sum=Aday+Amonth+ACentury+AYearPart;
 var sumStr=sum.toString();
 while(sum>21){
  if (sum>99){
   first=sumStr.substring(0,2);
   last=sumStr.substring(2);
   sum=parseInt(first)+parseInt(last);
   sumStr="" + sum.toString();
  }
  else{
   first=sumStr.substring(0,1);
   last=sumStr.substring(1);
   sum=parseInt(first)+parseInt(last);
   sumStr=""+sum.toString();
  }
 }

 let tarots=getBDTarots(sum);
 var t1idx=tarots[0],t2idx=tarots[1],t3idx=tarots[2];
 
 /*
 var x=window.matchMedia("(max-width:400px)");
 //alert("max-width:400px? "+x.matches + " w=" + window.innerWidth + " h=" + window.innerHeight);
 //alert("screen.w=" + window.screen.width + " screen.hh=" + window.screen.height);
 const width  = window.innerWidth || document.documentElement.clientWidth || 
 document.body.clientWidth;
 const height = window.innerHeight|| document.documentElement.clientHeight|| 
 document.body.clientHeight;
 alert("w="+width+" h="+height);
 */
 clearPanel();
 //if(!isMobile()&&!x.matches){
  if(t2idx!=0){
   myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
   myPanel.style.gridTemplateRows=gridString(1,330); //"330px";
  }
  else{
   myPanel.style.gridTemplateColumns=gridString(2,200); //"200px 200px";
   myPanel.style.gridTemplateRows=gridString(1,330); //"330px";
  }
  drawTaroc(t1idx,1,"Left Card");
  if(t2idx!=0){
   drawTaroc(t2idx,2,"Middle Card");
   drawTaroc(t3idx,3,"Right Card");
  }
  else{
   drawTaroc(t3idx,2,"Right Card");
  }
 //}
 /*else{
  if(t2idx!=0){
   myPanel.style.gridTemplateColumns=gridString(1,200); //"200px";
   myPanel.style.gridTemplateRows=gridString(3,330); //"330px 330px 330px";
  }
  else{
   myPanel.style.gridTemplateColumns=gridString(1,200); //"200px";
   myPanel.style.gridTemplateRows=gridString(2,330); //"330px 330px";
  }
  drawTaroc(t1idx,1,"Left Card");
  if(t2idx!=0){
   drawTaroc(t2idx,4,"Middle Card");
   drawTaroc(t3idx,7,"Right Card");
  }
  else{
   drawTaroc(t3idx,4,"Right Card");
  }
 }*/
 //Details del primo tarocco
 drawDetails(t1idx,0);
 panel.scrollTo(0,0);  
}

function drawTaroc(idx,idgrid,note,rev=0){
 book=catalog.childNodes[idx];
 /*if(book==null||book=="undefined")
 {
  console.log("book undefined: idx="+idx);
 }*/
 var CardID=book.attributes[0].nodeValue;
 var title = CardID+" - "+book.attributes[2].nodeValue;
 //Upright_Keywords
 var uk=book.attributes[3].nodeValue;
 var tFilename="./tarots/"+CardID;
 if(rev==1){
  tFilename+="_R";
 }
 tFilename+=".webp";
 
 var CardsHTML=`<div id="${idgrid}" class="box" style="color:DarkGoldenRod;font-weight:bolder;align-content:left;" onclick='drawDetails("${idx}","${rev}")'>${title}
 <p style="color:white;font-size:12px;font-style:italic" onclick='drawDetails("${idx}","${rev}")'>${uk}</p>
 <div>
   <a href="${setURL}"><img class="modal-content" src="${tFilename}" alt="${title}" title="${title}" height="218px"></a>
   <p style="color:white;font-size:10px;font-style:italic" onclick='drawDetails("${idx}","${rev}")'>${note} <button id="${idx}" onclick='drawDetails("${idx}","${rev}")' title='Details' style="background-color:gold;font-size:4px;">&#9658;</button></p>
  </div>
 </div>`;
 myPanel.innerHTML+=CardsHTML;
 drawDetails(idx,rev);
}

function drawTarocFake(idgrid){
 //var CardsHTML=`<div id="${idgrid}" class="box"><div>`;
 var CardsHTML=`<div id="${idgrid}"><div>`;
 myPanel.innerHTML+=CardsHTML;
}

function clearPanel(){
 myPanel.innerHTML="";
}
function drawDetails(idx,rev=0){
 book=catalog.childNodes[idx];
 /*if(book==null||book=="undefined")
 {
  console.log("drawDetails: book undefined: idx="+idx);
 }*/
 var CardID=book.attributes[0].nodeValue;
 var title=CardID+" - "+book.attributes[2].nodeValue;
 //Upright_Keywords
 var uk=book.attributes[3].nodeValue;
 var row,cell;
 myDetails.innerHTML="";
 //details.width=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
 //details.width=myPanel.clientWidth;
 //details.Left=0; //myPanel.offsetLeft;
 
 // ID - Name
 row=myDetails.insertRow(-1);
 cell=row.insertCell(-1);
 cell.style.textAlign="center";
 cell.style.fontSize="16px";
 cell.style.fontWeight="900";
 cell.style.color="gold";
 cell.innerHTML=title;
 
 // Upright_Keywords
 row=myDetails.insertRow(-1);
 cell=row.insertCell(-1);
 cell.style.textAlign="center";
 cell.style.fontSize="14px";
 cell.style.fontWeight="bolder";
 cell.style.fontStyle="italic";
 cell.style.color="white";
 cell.innerHTML=uk;
 
 // Element,Planet,Zodiac,Color,Animal,Suit
 var e=book.attributes[9].nodeValue;
 var p=book.attributes[10].nodeValue;
 var z=book.attributes[11].nodeValue;
 var c=book.attributes[12].nodeValue;
 var a=book.attributes[13].nodeValue;
 var s=book.attributes[14].nodeValue;
 
 var epzcas="Element: "+e;
 if(z!="")
  epzcas+=" Zodiac: "+z;
 else
  epzcas+=" Planet: "+p; 
 epzcas+=" Suit: "+s;  
 epzcas+=" Color: "+c;
 epzcas+=" Animal: "+a;
 
 row=myDetails.insertRow(-1);
 cell=row.insertCell(-1);
 cell.style.textAlign="center";
 cell.style.fontSize="12px";
 cell.style.fontWeight="bolder";
 cell.style.color="gold";
 cell.innerHTML=epzcas;
 
 // Description
 row=myDetails.insertRow(-1);
 var _Description=book.attributes[5].nodeValue.replaceAll("\r\n","<br>");
 cell=row.insertCell(-1);
 cell.style.fontSize="12px";
 cell.style.backgroundColor="DarkGoldenRod";
 cell.style.fontWeight="bolder";
 cell.style.color="black";
 var CardID=book.attributes[0].nodeValue;
 var tFilename="./tarots/"+CardID;
 if(rev==1){
  tFilename+="_R";
 }
 tFilename+=".webp";
 //cell.innerHTML=_Description;
 cell.innerHTML=`<img src="${tFilename}" alt="${title}" title="${title}" width="15px" height="24px" onclick='myPopup("${tFilename}","${title}","${uk}","${rev}")' style='cursor:zoom-in'> ${_Description}`;
 
 // Upright
 row=myDetails.insertRow(-1);
 var _Upright=book.attributes[6].nodeValue;
 if(rev==1){
  // Reversed
  _Upright=book.attributes[7].nodeValue;
 }
 cell=row.insertCell(-1);
 cell.style.textAlign="justify";
 cell.style.fontSize="12px";
 cell.style.backgroundColor="Black";
 cell.style.fontWeight="bolder";
 cell.style.color="gold";
 cell.innerHTML=_Upright.replaceAll("\r\n","<br>").replaceAll("&quot;","'");
 //window.location.hash='#details';
 //myDetails.scrollIntoView();
}

function getBDTarots(sum){
 var l=0;
 var r=0;
 var m=0;
 switch(sum){
  case 1:
   l=10;
   r=1;
   break;
  case 2:
   l=20;
   r=2;
   break;
  case 3:
   l=21;
   r=3;
   break;
  case 4:
   l=13;
   r=4;
   break;
  case 5:
   l=14;
   r=5;
   break;
  case 6:
   l=15;
   r=6;
   break;
  case 7:
   l=16;
   r=7;
   break;
  case 8:
   l=17;
   r=8;
   break;
  case 9:
   l=18;
   r=9;
   break;
  case 10:
   l=10;
   r=1;
   break;
  case 11:
   l=11;
   r=2;
   break;
  case 12:
   l=12;
   r=3;
   break;
  case 13:
   l=13;
   r=4;
   break;
  case 14:
   l=14;
   r=5;
   break;
  case 15:
   l=15;
   r=6;
   break;
  case 16:
   l=16;
   r=7;
   break;
  case 17:
   l=17;
   r=8;
   break;
  case 18:
   l=18;
   r=9;
   break;
  case 19: //exception: Sun/Wheel/Magician
   l=19;
   r=1;
   m=10;
   break;
  case 20:
   l=20;
   r=2;
   break;
  case 21:
   l=21;
   r=3;
   break;
  case 22:
   l=0;
   r=0;
   break;
 }
 return [l,m,r];
}

function resetDate(){
 myDate.valueAsDate=new Date();
 BirthDateTarots();
}

function setDate(days){ 
 var oldDate=new Date(myDate.value);
 var newDate=new Date(oldDate.getFullYear(),oldDate.getMonth(),oldDate.getDate()+days);
 myDate.value=newDate.getFullYear()+"-"+(newDate.getMonth()+1).toString().padStart(2,'0')+"-"+newDate.getDate().toString().padStart(2,'0');
 BirthDateTarots();
}

/*
originalImage.addEventListener('load',function(){
 let sx=25;
 let sy=53;
 let croppedWidth=301;
 let croppedHeight=220;
 canvas.width=croppedWidth;
 canvas.height=croppedHeight;
 context.drawImage(originalImage,sx,sy,croppedWidth,croppedHeight,0,0,croppedWidth,croppedHeight);
 var level=getRadioValue();
 if(level>0){
   originalImage.crossOrigin = "anonymous";
   const canvas1=document.createElement("canvas");
   const context1=canvas1.getContext("2d",{willReadFrequently:true});
   canvas1.width=croppedWidth;
   canvas1.height=croppedHeight;
   context1.drawImage(originalImage,sx,sy,croppedWidth,croppedHeight,0,0,croppedWidth,croppedHeight);
   var data=context1.getImageData(0,0,canvas1.width,canvas1.height);  
   if(level==1){
    context.putImageData(vintage(data),0,0);
   }else if(level==2){
    context.putImageData(solarize(data),0,0);
   }else{
    context.putImageData(noise(data),0,0);
   }
 } 
});
*/

myDate.addEventListener('change',function(){
 myRead();
});

function myResult(msg,imgurl,imgtitle,url){ 
 try{ 
  Swal.fire({    
   title: "<span><a style='color:Blue' href='"+url+"'>"+imgtitle +"</a></span>",
   html: "<span style='color:Black'><b>"+msg.replaceAll('\n','<br>')+"</b></span>",
   imageUrl: imgurl,
   imageWidth: 80,
   imageHeight: 104,
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{
  alert(imgtitle+"\n"+msg);
 }
}

function myHelp(){
 spreadNo
 var sHelp="Select a spread to get a tarots reading.\nPress 'Read' anytime you want to read again.\nClick on thumbnail image in the description area to zoom-in.";
 var title="";
 var imageUrl="";
 //if(modalImg.style.visibility=="hidden")
  title="<span><a href='https://www.altersleeves.com/browse/?browse_type=by&artist_id=16'><img src='dada_logo.jpg' alt='' width='80' height='104' title='Alters by DamarideNeurommancer' style='border-radius:6px;align:center;'/></a></span>"; 
 //else{
 // imageUrl=modalImg.src;
 // title="<span><a style='color:Blue' href='"+CardURL+"'>"+modalImg.title+"</a></span>";
 //}  
 try{
  Swal.fire({    
   title: title,
   html: "<span style='color:Black'><b>"+sHelp.replaceAll('\n','<br>')+"</b></span>",
   imageUrl: imageUrl,
   imageWidth: 80,
   imageHeight: 104,
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{alert(sHelp);}
}

function openNav(){
 sideBar.style.width="180px";
 main.style.marginLeft="180px";
}

function closeNav(){
 sideBar.style.width="0";
 main.style.marginLeft="0";
}

document.addEventListener('click',function handleClickOutside(event){
 if(!main.contains(event.target)){
  closeNav();
 }
});

var span=document.getElementsByClassName("close")[0];
span.onclick=function(){ 
 modal.style.display="none";
}

/*
let shareData={
 title: "",
 text: "",
 url: "",
}

async function myShare()
{
 if(modalImg.style.visibility=="hidden")
  return;
 var _imgtitle=modalImg.title; 
 var _url=CardURL;
 shareData={
  title: "AlterSleeves Link",
  text: _imgtitle,
  url: _url,
 }
 if(navigator.canShare&&navigator.canShare(shareData)){
  await navigator.share(shareData);
 }
}
***/

function isMobile()
{
 return(window.orientation!=null&&window.orientation!="undefined");
}

function getRandomTaroc(){
 return Math.floor(Math.random()*totXmlTarots); //+1;
}
function getTarocUprightOrReversed(){
 return Math.floor(Math.random()*2); //+1;
}

function WitchesPentagram(){
 exDrawTarots(0);
}
function FourWinds(){
 exDrawTarots(1);
}
function SacredCircle(){
 exDrawTarots(2);
}
function TarocDemarseilleCross(){
 exDrawTarots(3);
}
function TarocDeMarseilleNoReverse(){
 exDrawTarots(4);
}
function TarocPairs(){
 exDrawTarots(5);
}
function MandalaTarots(){
 exDrawTarots(6);
}
// Spread: 0=WitchesPentagram 1=4Winds 2=SacredCircle 
// 3=TarocDemarseilleCross 4=TarocDeMarseilleNoReverse 5=TarocPairs 6=Mandala
function exDrawTarots(spread){
 // Witches Pentagram
 const P1="Top: Spirit - What is your goal?";
 const P2="Left: What do you think about the situation?";
 const P3="Bottom Left: What practical steps do you need to take?";
 const P4="Bottom Right: Where do you need to focus your energy?";
 const P5="Quintessence: How do you feel about the situation?";

 // 4 Winds
 const W1="North: What are your thoughts and ideas on this issue?";
 const W2="West: What practical steps do you need to think about/do regarding the issue?";
 const W3="East: What inspires you or drives you regarding this issue?";
 const W4="South: What are your feelings on the issue?";
 const W5="Quintessence: The overall message of the reading";
 
 // Sacred Circle
 const S1="North: Mental Body";
 const S2="West: Emotional Body";
 const S3="East: Spiritual Body";
 const S4="South: Physical Body";
 const S5="Center of Circle: Wisdom & Inner Guidance.Integrates all your bodies.";
 
 // Taroc de Marseille Cross
 const M1="1. Left: What is in your favor?";
 const M2="2. Right: What is in your favor/what opposes you?";
 const M3="3. Top: Overall synthesis/analysis of the situation described in tarots 1 & 2";
 const M4="4. Bottom: Outcome/Advice (choose 'advise' if you want to think about practical steps to take)";
 
 // Taroc de Marseille Open Reading
 const O1="Passive Thought";
 const O2="Situation";
 const O3="Action";
 
 // Tarots Pairs
 const X1="Pair 1";
 const X2="Pair 2";
 const X3="Pair 3";
 const X4="Pair 1";
 const X5="Pair 2";
 const X6="Pair 3";
 
 // Mandala
 const L1="9. Desires and higher purpose?";
 const L2="8. Self-awareness and self-image";
 const L3="2. Ambitions, desires and primal urges";
 const L4="7. Faults and weaknesses";
 const L5="1. Self";
 const L6="3. Ideals, goals and path to spiritual contentment";
 const L7="6. Strength and positive personality traits";
 const L8="4. Real accomplishments and life path";
 const L9="5. Dependancies, addictions and erraneous values";
 
 clearPanel();

 const t1=getRandomTaroc();
 const rv1=getTarocUprightOrReversed();
 
 var t2=getRandomTaroc();
 if(spread==4||spread==5){
  while(t2==t1)
   t2=getRandomTaroc();
 }
 const rv2=getTarocUprightOrReversed();
 
 var t3=getRandomTaroc();
 if(spread==4||spread==5){
  while(t3==t2||t3==t1)
   t3=getRandomTaroc();
 }
 const rv3=getTarocUprightOrReversed();
 
 const t4=getRandomTaroc();
 if(spread==5){
  while(t4==t3||t4==t2||t4==t1)
   t4=getRandomTaroc();
 }
 const rv4=getTarocUprightOrReversed();
 
 var quintessence,t5,rv5;
 var t6,rv6;
 
 // WitchesPentagram, 4Winds, SacredCircle 
 if(spread<3){
  //var quintessence=t1+t2+t3+t4; // + 4;
  quintessence=t1+t2+t3+t4; // + 4;
  if (quintessence>22){
   var decina=Math.floor(quintessence/10); //quintessence/10;
   var unita=quintessence%10;
   quintessence=decina+unita;
  }
  //var t5=quintessence>22?0:quintessence; // + 1;
  t5=quintessence>22?0:quintessence; // + 1;
  rv5=getTarocUprightOrReversed();
 }
 
 // Tarot Pairs
 if(spread==5||spread==6){
  t5=getRandomTaroc();
  while(t5==t4||t5==t3||t5==t2||t5==t1)
   t5=getRandomTaroc();
  rv5=getTarocUprightOrReversed();
  
  t6=getRandomTaroc();
  while(t6==t5||t6==t4||t6==t3||t6==t2||t6==t1)
   t6=getRandomTaroc();
  rv6=getTarocUprightOrReversed();
 }
 
 // Mandala
 var t7,t8,t9,rv7,rv8,rv9
 if(spread==6){
  t7=getRandomTaroc();
  while(t7==t6||t7==t5||t7==t4||t7==t3||t7==t2||t7==t1)
   t7=getRandomTaroc();
  rv7=getTarocUprightOrReversed();
  
  t8=getRandomTaroc();
  while(t8==t7||t8==t6||t8==t5||t8==t4||t8==t3||t8==t2||t8==t1)
   t8=getRandomTaroc();
  rv8=getTarocUprightOrReversed();
  
  t9=getRandomTaroc();
  while(t9==t8||t9==t7||t9==t6||t9==t5||t9==t4||t9==t3||t9==t2||t9==t1)
   t9=getRandomTaroc();
  rv9=getTarocUprightOrReversed();
 }
     
 //var x=window.matchMedia("(max-width:400px)");
     
 //if(!isMobile()&&!x.matches){
  switch(spread){
   case 0: // WitchesPentagram
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(2,330); //"330px 330px";
    break;
   case 1: // 4Winds
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(2,340); //"340px 340px";
    break;
   case 2: // SacredCircle
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(3,350); //"350px 350px 350px";
    break;
   case 3: // Tarots de Marseille Cross
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(3,350); //"350px 350px 350px";
    break; 
   case 4: // Tarots de Marseille Open Reading
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(1,330); //"300px";
    break;
   case 5: // Tarots Pairs
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(2,350); //"350px";
    break; 
   case 6: // Mandala
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(5,350); //"350px 350px 350px 350px 350px";
    break;
   default:
    break;
  }  
 //}
 /*
 else{
   switch(spread){
   case 0: // WitchesPentagram
    myPanel.style.gridTemplateColumns=gridString(2,200); //"200px 200px";
    myPanel.style.gridTemplateRows=gridString(3,330); //"330px 330px 330px";
    break;
   case 1: // 4Winds
    myPanel.style.gridTemplateColumns=gridString(2,200); //"200px 200px";
    myPanel.style.gridTemplateRows=gridString(3,340); //"340px 340px 340px";
    break;
   case 2: // SacredCircle
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(3,350); //"350px 350px 350px";
    break;
   case 3: // Tarots de Marseille Cross
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(3,350); //"350px 350px 350px";
    break; 
   case 4: // Tarots de Marseille Open Reading
    myPanel.style.gridTemplateColumns=gridString(1,200); //"200px";
    myPanel.style.gridTemplateRows=gridString(3,330); //"300px 300px 300px";
    break;
   case 5: // Tarots Pairs
    myPanel.style.gridTemplateColumns=gridString(2,200); //"200px 200px";
    myPanel.style.gridTemplateRows=gridString(3,350); //"350px 350px 350px";
    break;
   case 6: // Mandala
    myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
    myPanel.style.gridTemplateRows=gridString(5,350); //"350px 350px 350px 350px 350px";
    break;
   default:
    break;
  }
 }*/ 
 switch(spread){
  case 0: // WitchesPentagram
   drawTaroc(t1,1,P1,rv1);
   drawTaroc(t2,2,P2,rv2);
   drawTaroc(t3,3,P3,rv3);
   drawTaroc(t4,4,P4,rv4);
   drawTaroc(t5,5,P5,rv5);
   //Details del tarocco iniziale
   drawDetails(t5,rv5);
   break;
  case 1: // 4Winds
   drawTaroc(t1,1,W1,rv1);
   drawTaroc(t2,2,W2,rv2);
   drawTaroc(t3,3,W3,rv3);
   drawTaroc(t4,4,W4,rv4);
   drawTaroc(t5,5,W5,rv5);
   drawDetails(t5,rv5);
   break;
  case 2: // SacredCircle
   drawTarocFake(1);
   drawTaroc(t1,2,S1,rv1);
   drawTarocFake(3);
   drawTaroc(t2,4,S2,rv2);
   drawTaroc(t5,5,S5,rv5);
   drawTaroc(t3,6,S3,rv3);
   drawTarocFake(7);
   drawTaroc(t4,8,S4,rv4);
   drawTarocFake(9);
   drawDetails(t5,rv5);
   break;
  case 3: // Tarots de Marseille Cross
   drawTarocFake(1);
   drawTaroc(t3,2,M3,rv3);
   drawTarocFake(3);
   drawTaroc(t1,4,M1,rv1);
   drawTarocFake(5);
   drawTaroc(t2,6,M2,rv2);
   drawTarocFake(7);
   drawTaroc(t4,8,M4,rv4);
   drawTarocFake(9);
   drawDetails(t4,rv4);
   break; 
  case 4: // Tarots de Marseille Open Reading (No Reverse)
   drawTaroc(t1,1,O1,0);
   drawTaroc(t2,2,O2,0);
   drawTaroc(t3,3,O3,0);
   break;
  case 5: // Tarots Pairs
   drawTaroc(t1,1,X1,rv1);
   drawTaroc(t2,2,X2,rv2);
   drawTaroc(t3,3,X3,rv3);
   drawTaroc(t4,4,X4,rv4);
   drawTaroc(t5,5,X5,rv5);
   drawTaroc(t6,6,X6,rv6);
   drawDetails(t1,rv1);
   break;
  case 6:
   drawTarocFake(1);
   drawTaroc(t1,2,L1,rv1);
   drawTarocFake(3);    
   drawTaroc(t2,4,L2,rv2);
   drawTarocFake(5);
   drawTaroc(t3,6,L3,rv3);

   drawTaroc(t4,7,L4,rv4);
   drawTaroc(t5,8,L5,rv5);
   drawTaroc(t6,9,L6,rv6);
   drawTaroc(t7,10,L7,rv7);
   drawTarocFake(11);
   drawTaroc(t8,12,L8,rv8);
   drawTarocFake(13);
   drawTaroc(t9,14,L9,rv9);
   drawTarocFake(15); 
   drawDetails(t1,rv1);
   break;
  default:
    break;
 }
 panel.scrollTo(0,0);    
}

function gridString(n,s){
 var gs="";
 for(var i=0;i<n;i++)
  gs +=s+"px"+(i==n-1?"":" ");
 return gs;
}

function myPopup(file,imgtitle,note,rev){
 //var url="index_AlteredSets.html?set=1"; 
 modal.style.display="block";
 modalPopupImg.src=file;
 modalPopupImg.alt=imgtitle+(rev==1?" (Reversed)":"");
 modalPopupImg.title=modalPopupImg.alt+"\r\n"+note;
 captionModal.innerHTML="<a href='"+setURL+"' style='font-size: 16px;'>"+modalPopupImg.alt+"<br>"+note+"</a>";
}
