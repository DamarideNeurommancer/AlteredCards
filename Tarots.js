// TODO
// Fonts??
var bxmlParsed=false;
var xmlDoc;
var catalog,book;
var totXmlTarots;
var mySpreads=document.getElementById("mySpreads");
var myDate=document.getElementById("myDate");
var myDetails=document.getElementById('myDetails');
var myDivDate=document.getElementById('divDate');
var myPanel=document.getElementById('panel');
var modalPopupImg=document.getElementById("img02");

const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const header=document.getElementById('myHeader');
const captionText=document.getElementById("caption");
const modal=document.getElementById('myModal');
const captionModal=document.getElementById('caption-modal');
const setURL="index_AlteredSets.html?set=1";
const details=document.getElementById('details');
const shop=document.getElementById("shop");
var speakData;
var bSpeech=true;
var t2sStarted=false;
var t2sPaused=false;
var spreadNo=1;
myDate.valueAsDate=new Date();
function myParseTarots(){
 var parser=new DOMParser();
 xmlDoc=parser.parseFromString(xmlTarots,"text/xml");
 catalog=xmlDoc.getElementsByTagName('Tarots')[0];
 totXmlTarots=catalog.childElementCount;
 bxmlParsed=true;
}

function mySpreadChange(){
 if(bxmlParsed==false){myParseTarots();}  
 spreadNo=parseInt(mySpreads.selectedIndex+1);
 if(spreadNo!=1)
  myDivDate.style.visibility="hidden";
 else
  myDivDate.style.visibility="visible";
 mySave();
 myRead();
}

function myRead(){
 if(bxmlParsed==false){myParseTarots();}
 switch(spreadNo){
  case 1:
   BirthDateTarots(); // 2 o 3 Tarots
   break;
  case 2: 
   FourWinds();
   break;
  case 3: // 5 Tarots. 4 Random + 1 Quintessenza Calcolato
   WitchesPentagram();
   break;
  case 4: // 4 Tarots Random
   TarocDemarseilleCross();
   break;
  case 5: // Tarot De Marseille Open Reading: 3 Tarots Random (No Reverse) 
   TarocDeMarseilleNoReverse();
   break;
  case 6: // Tarot Pairs: 6 Tarocs Random
   TarocPairs();
   break;
  case 7: // Sacred Circle: 5 Tarots. 4 Random + 1 Center of Circle Calcolato
   SacredCircle();
   break;
  case 8: // Mandala: 9 Tarots
   MandalaTarots();
   break;
  case 9: // All Tarots
   AllTarots();
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
 var tarots=getBDTarots(sum);
 var t1=tarots[0],t2=tarots[1],t3=tarots[2];
 
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
  if(t2!=0){
   myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
   myPanel.style.gridTemplateRows=gridString(1,330); //"330px";
  }
  else{
   myPanel.style.gridTemplateColumns=gridString(2,200); //"200px 200px";
   myPanel.style.gridTemplateRows=gridString(1,330); //"330px";
  }
  drawTaroc(t1,1,"Left Card");
  if(t2!=0){
   drawTaroc(t2,2,"Middle Card");
   drawTaroc(t3,3,"Right Card");
  }
  else{
   drawTaroc(t3,2,"Right Card");
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
 //drawDetails(t1idx,0);
 drawDetails(t1,0,0,1);
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
 
 /*var CardsHTML=`<div id="${idgrid}" class="box" style="color:DarkGoldenRod;font-weight:bolder;align-content:left;" onclick='drawDetails("${idx}","${rev}")'>${title}
 <p style="color:white;font-size:12px;font-style:italic" onclick='drawDetails("${idx}","${rev}")'>${uk}</p>
 <div>
   <a href="${setURL}"><img class="modal-content" src="${tFilename}" alt="${title}" title="${title}" height="218px"></a>
   <p style="color:white;font-size:10px;font-style:italic" onclick='drawDetails("${idx}","${rev}")'>${note}  <button id="${idx}" onclick='drawDetails("${idx}","${rev}")' title='Details' style="background-color:gold;font-size:4px;cursor:cell">&#9658;</button>&emsp;<button id="z${idx}" onclick='myPopup("${tFilename}","${title}","${uk}","${rev}")' title='Zoom-In' style="background-color:gold;font-size:4px;cursor:zoom-in">+</button></p>
  </div>
 </div>`;*/
 
 var CardsHTML=`<div id="g${idgrid}" class="box" style="color:DarkGoldenRod;font-weight:bolder;align-content:left;" onclick='drawDetails("${idx}","${rev}",1,"${idgrid}")'>${title}
 <p style="color:white;font-size:12px;font-style:italic" onclick='drawDetails("${idx}","${rev}",1,"${idgrid}")'>${uk}</p>
 <div>
   <a href="${setURL}"><img class="modal-content" src="${tFilename}" alt="${title}" title="${title}" height="218px"></a>
   <p style="color:white;font-size:10px;font-style:italic" onclick='drawDetails("${idx}","${rev}",1,"${idgrid}")'>${note}  <button id="${idx}" onclick='drawDetails("${idx}","${rev}",1,"${idgrid}")' title='Details' style="background-color:gold;font-size:4px;cursor:cell">&#9658;</button>&emsp;<button id="z${idx}" onclick='myPopup("${tFilename}","${title}","${uk}","${rev}")' title='Zoom-In' style="background-color:gold;font-size:4px;cursor:zoom-in">+</button></p>
  </div>
 </div>`;
 myPanel.innerHTML+=CardsHTML;
 //drawDetails(idx,rev,0); //Dont Move to Details! 
 drawDetails(idx,rev,0,idgrid); //Dont Move to Details!
}

function drawTarocFake(idgrid){
 //var CardsHTML=`<div id="${idgrid}" class="box"><div>`;
 var CardsHTML=`<div id="${idgrid}"><div>`;
 myPanel.innerHTML+=CardsHTML;
}

function clearPanel(){
 myPanel.innerHTML="";
}
function drawDetails(idx,rev=0,moveTo=1,idgrid){
 // Nel caso stesse leggendo
 t2sStop()

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
 _Upright=_Upright.replaceAll("\r\n","<br>").replaceAll("&quot;","'");
 
 cell=row.insertCell(-1);
 cell.style.textAlign="justify";
 cell.style.fontSize="12px";
 cell.style.backgroundColor="Black";
 cell.style.fontWeight="bolder";
 cell.style.color="gold";
 //cell.innerHTML=_Upright.replaceAll("\r\n","<br>").replaceAll("&quot;","'");
 //cell.innerHTML=`<button onclick="topFunction()" id="myBtnTop" title="Go to top">Top</button> ${_Upright}`;
 cell.innerHTML=`${_Upright}<br><button id="myBtnTop" onclick='topFunction(${idgrid})' title="Go up &#x25B2;">&#x25B2;</button>`;
 if(bSpeech)
  cell.innerHTML+=getText2SpeechHTML();
  
 //window.location.hash='#details';
 if(moveTo==1)
  myDetails.scrollIntoView();
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
 dateChange();
 BirthDateTarots();
}

function setDate(days){ 
 var oldDate=new Date(myDate.value);
 var newDate=new Date(oldDate.getFullYear(),oldDate.getMonth(),oldDate.getDate()+days);
 myDate.value=newDate.getFullYear()+"-"+(newDate.getMonth()+1).toString().padStart(2,'0')+"-"+newDate.getDate().toString().padStart(2,'0');
 dateChange();
 BirthDateTarots();
}

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
 var sHelp="Select a spread to get a tarots reading.\nPress 'Read' anytime you want to read again.\nClick on 'Details' button at the tile's bottom-left to select the description of current tarot and then move to the end of screen to read it.\nClick on 'Zoom-In' button at the tile's bottom-right or click on thumbnail image in the details' description area to zoom-in.";
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

function isMobile(){
 return(window.orientation!=null&&window.orientation!="undefined");
}

function getRandomTaroc(){
 return Math.floor(Math.random()*totXmlTarots);
}
function getTarocUprightOrReversed(){
 return Math.floor(Math.random()*2);
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
function AllTarots(){
 exDrawTarots(7);
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
 const L1="9. Desires and higher purpose?<br>";
 const L2="8. Self-awareness and self-image<br>";
 const L3="2. Ambitions, desires and primal urges";
 const L4="7. Faults and weaknesses";
 const L5="1. Self";
 const L6="3. Ideals, goals and path to spiritual contentment";
 const L7="6. Strength and positive personality traits";
 const L8="4. Real accomplishments and life path";
 const L9="5. Dependancies, addictions and erraneous values";
 
 clearPanel();
 var t1,t2,t3,t4,t5,t6,t7,t8,t9;
 var rv1,rv2,rv3,rv4,rv5,rv6,rv7,rv8,rv9;
 if(spread<7){
  t1=getRandomTaroc();
  rv1=getTarocUprightOrReversed();
 
  t2=getRandomTaroc();
  if(spread==4||spread==5){
   while(t2==t1)
    t2=getRandomTaroc();
  }
  rv2=getTarocUprightOrReversed();
 
  t3=getRandomTaroc();
  if(spread==4||spread==5){
   while(t3==t2||t3==t1)
    t3=getRandomTaroc();
  }
  rv3=getTarocUprightOrReversed();
 
  t4=getRandomTaroc();
  if(spread==5){
   while(t4==t3||t4==t2||t4==t1)
    t4=getRandomTaroc();
  }
  rv4=getTarocUprightOrReversed();
 
  var quintessence; 
  // WitchesPentagram, 4Winds, SacredCircle 
  if(spread<3){
   quintessence=t1+t2+t3+t4;
   if (quintessence>22){
    var decina=Math.floor(quintessence/10);
    var unita=quintessence%10;
    quintessence=decina+unita;
   }
   t5=quintessence>22?0:quintessence;
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
   case 7:
   if(!isMobile()){
    myPanel.style.gridTemplateColumns=gridString(5,200);
    myPanel.style.gridTemplateRows=gridString(5,330);
   }
   else{
    myPanel.style.gridTemplateColumns=gridString(2,200);
    myPanel.style.gridTemplateRows=gridString(11,330);
   }
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
   //drawDetails(t5,rv5,0);
   drawDetails(t5,rv5,0,5);
   break;
  case 1: // 4Winds
   drawTaroc(t1,1,W1,rv1);
   drawTaroc(t2,2,W2,rv2);
   drawTaroc(t3,3,W3,rv3);
   drawTaroc(t4,4,W4,rv4);
   drawTaroc(t5,5,W5,rv5);
   //drawDetails(t5,rv5,0);
   drawDetails(t5,rv5,0,5);
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
   //drawDetails(t5,rv5,0);
   drawDetails(t5,rv5,0,5);
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
   //drawDetails(t4,rv4,0);
   drawDetails(t4,rv4,0,8);
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
   //drawDetails(t1,rv1,0);
   drawDetails(t1,rv1,0,1);
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
   //drawDetails(t1,rv1,0);
   drawDetails(t1,rv1,0,2);
   break;
  case 7:
   for(var i=0;i<22;i++){
    drawTaroc(i,i,"");
   }
   //drawDetails(0,0);
   //drawDetails(0,0,0,0);
   drawDetails(0,0,0,0,0);
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
 shop.innerHTML="<br><br><br><a href='https://www.makeplayingcards.com/sell/damarideneurommancer' style='font-size:12px;'><img src='playing-card-spade-icon.png' alt='Marketplace' style='width:16px;height:16px;vertical-align:middle;background-color:yellow'> Marketplace</a>";
}

function myInit(){
 var dtValue;
 initVars();
 if(bxmlParsed==false){myParseTarots();}
 var storedSpreadNo=localStorage.getItem("SpreadNo");
 if(storedSpreadNo!=""&&storedSpreadNo!=null&&storedSpreadNo!="undefined"){
  spreadNo=storedSpreadNo;
 }
 else{
  spreadNo=1;
 }
 if(spreadNo==1){
  dtValue=localStorage.getItem("SpreadDate");
  if(dtValue!=""&&dtValue!=null&&dtValue!="undefined"){
   myDate.value=dtValue;
  }
 }
 mySpreads.value=spreadNo;
 mySpreadChange();
}

function mySave(){
 try{
  localStorage.setItem("SpreadNo",spreadNo);
  if(spreadNo==1){
   localStorage.setItem("SpreadDate",myDate.value);
  }
 }
 catch(err){console.log(err);} 
}

function initVars(){
 mySpreads=document.getElementById("mySpreads");
 myDate=document.getElementById("myDate");
 myDetails=document.getElementById('myDetails');
 myDivDate=document.getElementById('divDate');
 myPanel=document.getElementById('panel');
 modalPopupImg=document.getElementById("img02");
 if ('speechSynthesis' in window) {
  bSpeech=true;
  speakData= new SpeechSynthesisUtterance();
  speakData.volume = 1; // From 0 to 1
  speakData.rate = 0.8; //1; // From 0.1 to 10
  speakData.pitch = 1.5; //2; // From 0 to 2
  //speakData.text = textToSpeak;
  speakData.lang = 'en';
  speakData.voice = getVoices()[0];
  
  // Select a voice
  //const voices = speechSynthesis.getVoices();
  //speakData.voice = voices[0]; // Choose a specific voice

 }else{
  // Speech Synthesis is not Supported 
  bSpeech=false; 
 }
}
function dateChange(){
 localStorage.setItem("SpreadDate",myDate.value);
}

function myCredits(){
 var url="https://biddytarot.com/tarot-card-meanings/major-arcana/";
 var url1="https://hermitspiritus.com/tarot-cards";
 var imgtitle="The Meanings of the Major Arcana Tarot Cards";
 var imgtitle1="Rider-Waite Tarot Card Meanings List";   
 var sCredits=`<a href='index_AlteredSets.html?set=1'><img src='./tarots/0.webp' alt='DamarideNeurommancer Tarots Set' title='DamarideNeurommancer Tarots Set' width="80" height="140"></a>\n<b style='color:red'>Credits</b>\nThe Tarot card meaning description here used is based on or extracted from:\n<center><img src="https://biddytarot.com/wp-content/uploads/BT-BiddyTarotLogo-@2x.png" alt="Biddy Tarot" height="63" width="63"></center> <b style='color:red'><i>The Meanings of the Major Arcana Tarot Cards</i></b>\n<span><a style='color:Blue;font-size:0.6rem;' href="${url}">${imgtitle}</a>\n\n<center><img src="https://hermitspiritus.com/images/logo.png" alt="Hermit Spiritus" height="84" width="168"></center> <b style='color:red'><i>Rider-Waite Tarot Card Meanings List</i></b>\n<span><a style='color:Blue;font-size:0.6rem;' href="${url1}">${imgtitle1}</a>`;
 try{
  Swal.fire({    
   title: "",
   html: "<span style='color:Black'><b>"+sCredits.replaceAll('\n','<br>')+"</b></span>",
   imageUrl: null,
   imageWidth: 80,
   imageHeight: 104,
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{alert(sCredits);}
}

function topFunction(grididx){
 document.getElementById("g"+grididx).scrollIntoView(); 
} 

function getText2SpeechHTML(){
 var html=`&emsp;<button id="myStart" onclick='t2sStart()' title="Read">&#9658;</button> 
 <button id="myPauseResume" onclick='t2sPauseResume()' title="Pause">&#x23F8;</button> 
 <button id="myStop" onclick='t2sStop()' title="Stop">&#x23F9;</button>
 `;
 return html;
}
function t2sStart(){
 t2sStarted=true;
 var name=myDetails.rows[0].cells[0].innerText.split('-')[1];
 var reading="Tarot: "+name+". "+myDetails.rows[1].cells[0].innerText + ". " + myDetails.rows[4].cells[0].innerText;
 speakData.text=reading; //myDetails.rows[1].cells[0].innerText + ". " + myDetails.rows[4].cells[0].innerText;
 //speakData.text=myDetails.rows[1].cells[0].innerText;
 speechSynthesis.speak(speakData);
 document.getElementById("myStart").style.backgroundColor="Red";
}
function t2sPauseResume(){
 if(t2sStarted){
  if(t2sPaused){
   t2sPaused=false; // Resume
   speechSynthesis.resume();
   document.getElementById("myPauseResume").title="Pause";
  }
  else{
   speechSynthesis.pause(); //Pause
   document.getElementById("myPauseResume").title="Resume";
   t2sPaused=true;
  }
 }
}
function t2sStop(){
 window.speechSynthesis.cancel();
 t2sStarted=false;
 t2sPaused=false;
 try{
  document.getElementById("myPauseResume").title="Pause";
  document.getElementById("myStart").style.backgroundColor="White";
 }
 catch(err){;}
}
// Initially, the getVoices() method will return an empty array because voices may not be loaded. 
// The following is a small workaround for that.
function getVoices() {
 let voices=speechSynthesis.getVoices();
 if(!voices.length){
  let utterance=new SpeechSynthesisUtterance("");
  speechSynthesis.speak(utterance);
  voices=speechSynthesis.getVoices();
 }
 return voices;
}

  