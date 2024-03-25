//var mybody=document.getElementsByTagName('body')[0];
var bxmlParsed=false;
var xmlDoc;
var catalog,book;
var totXmlTarots;
var mySpreads=document.getElementById("mySpreads");
var myDate=document.getElementById("myDate");
var myDetails=document.getElementById('myDetails');
var myDivDate=document.getElementById('divDate');
var myDivAll=document.getElementById('divAll');
var myDivOuter=document.getElementById('divOuter');
const myChkReverse=document.getElementById('myChkReverse');
var myPanel=document.getElementById('panel');
var modalPopupImg=document.getElementById("img02");
const zodiacMap=[["Aries","&#x2648;"],["Taurus","&#x2649;"],["Gemini","&#x264A;"],["Cancer","&#x264B;"],["Leo","&#x264C;"],["Virgo","&#x264D;"],["Libra","&#x264E;"],["Scorpio","&#x264F;"],["Sagittarius","&#x2650;"],["Capricorn","&#x2651;"],["Aquarius","&#x2652;"],["Pisces","&#x2653;"],["Pisces","&#x2653;"]];
const planetMap=[["Mercury","&#x263F;"],["Venus","&#x2640;"],["Mars","&#x2642;"],["Jupiter","&#x2643;"],["Saturn","&#x2644;"],["Uranus","&#x2645"],["Neptune","&#x2646;"],["Pluto","&#x2647"],["Sun","&#x263C;"],["Moon","&#x263E"]];
const elementMap=[["Air","&#x2634;"],["Water","&#x2635;"],["Earth","&#x2637;"],["Fire","&#x2632;"]];
const suitMap=[["Wands","&#129668;"],["Cups","&#127942;"],["Swords","&#x2694;"],["Pentacles","&#x2605;"]];
const animalMap=[["Land Mammals","&#128049;"],["Winged Creatures","&#129417;"],["Water Creatures","&#128044;"],["Reptiles","&#128013;"],["Insects","&#129419;"],["Lizards","&#129422;"]];

const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const header=document.getElementById('myHeader');
const captionText=document.getElementById("caption");
const modal=document.getElementById('myModal');
const captionModal=document.getElementById('caption-modal');
const setURL="index_AlteredSets.html?set=1";
const details=document.getElementById('details');
const shop=document.getElementById("shop");
var bMobile=false;
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
 myDivOuter.style.visibility="hidden";
 myDivDate.style.visibility="hidden";
 myDivAll.style.visibility="hidden";
 switch(spreadNo){
  case 1:
   myDivOuter.style.visibility="visible";
   myDivAll.style.visibility="hidden";
   myDivDate.style.visibility="visible";
   myDivDate.style.zIndex="2";
   myDivAll.style.zIndex="1";
   break;
  case 9:
   myDivOuter.style.visibility="visible";
   myDivDate.style.visibility="hidden";
   myDivAll.style.visibility="visible";
   myDivDate.style.zIndex="1";
   myDivAll.style.zIndex="2";
  break; 
 }
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
   // https://beingdoingtarot.com/tag/major-arcana-only-reading/ 
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
 //Details del primo tarocco
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
 //drawDetails(idx,rev,0,idgrid); //Dont Move to Details!
 // RIMETTI SE VUOI ELIMINARE LA SELEZIONE
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
 t2sStop();

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
 
 var epzcas="Element: ["+getAllElementSign(e)+"]";
 if(z!="")
  epzcas+="  Zodiac: ["+getZodiacSign(z)+"]";
 else 
  epzcas+="  Planet: ["+getPlanetSign(p)+"]";  
 epzcas+="  Suit: ["+getAllSuitSign(s)+"]";
 epzcas+="  Color: ["+getColor(c)+"]";
 epzcas+="  Animal: ["+getAllAnimalSign(a)+"]";
 
 row=myDetails.insertRow(-1);
 cell=row.insertCell(-1);
 cell.style.textAlign="center";
 cell.style.fontSize="14px";
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
 
 /**
 mybody.style.backgroundImage="url('"+ tFilename+"')";
 mybody.style.backgroundAttachment="fixed";
 mybody.style.backgroundRepeat="no-repeat";//"repeat-y";
 mybody.style.backgroundPosition="center"; 
 //mybody.style.backgroundSize="cover";
 **/
 /*else{
 document.getElementById("g"+idgrid).style.backgroundColor="darkblue";
 document.getElementById("g"+idgrid).style.boxShadow="1px 2px lightblue";
 }*/
 selectBox(idgrid);
 /*
 console.log("Spread: ",spreadNo);
 const gridComputedStyle = window.getComputedStyle(myPanel);
 // get number of grid rows
 const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
 // get number of grid columns
 const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
 console.log("GRID RxC= "+gridRowCount+" x "+gridColumnCount);
 */
}

function selectBox(idgrid){
 //console.log("Spread: ",spreadNo);
 const gridComputedStyle = window.getComputedStyle(myPanel);
 // get number of grid rows
 const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;
 // get number of grid columns
 const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
 //console.log("GRID RxC= "+gridRowCount+" x "+gridColumnCount);
 for(var r=1;r<=gridRowCount;r++){
  for(var c=1;c<=gridColumnCount;c++){
   var idx=((r-1)*gridColumnCount)+c;
   var elem="g"+idx;
   try{
     if(idgrid==idx){
      document.getElementById(elem).style.backgroundColor="darkblue";
      document.getElementById(elem).style.boxShadow="1px 2px lightblue";
      //document.getElementById(elem).style.borderRadius="10px";
      // NON lo fare!!!
      //myDetails.scrollIntoView();
     }
     else
     {
      document.getElementById(elem).style.backgroundColor="transparent";
      document.getElementById(elem).style.boxShadow="";
      //document.getElementById(elem).style.borderRadius="10px";
     }
     document.getElementById(elem).style.borderRadius="10px";
   }
   catch(err){;}
  }
 }
}
function getBDTarots(sum){
 var l=0;
 var r=0;
 var m=0;
 switch(sum){
  case 1:l=10;r=1;break;
  case 2:l=20;r=2;break;
  case 3:l=21;r=3;break;
  case 4:l=13;r=4;break;
  case 5:l=14;r=5;break;
  case 6:l=15;r=6;break;
  case 7:l=16;r=7;break;
  case 8:l=17;r=8;break;
  case 9:l=18;r=9;break;
  case 10:l=10;r=1;break;
  case 11:l=11;r=2;break;
  case 12:l=12;r=3;break;
  case 13:l=13;r=4;break;
  case 14:l=14;r=5;break;
  case 15:l=15;r=6;break;
  case 16:l=16;r=7;break;
  case 17:l=17;r=8;break;
  case 18:l=18;r=9;break;
  //exception: Sun/Wheel/Magician
  case 19:l=19;r=1;m=10;break;
  case 20:l=20;r=2;break;
  case 21:l=21;r=3;break;
  case 22:l=0;r=0;break;
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
 var sHelp=`These are Major Arcana (greater secrets) tarots consisting of 22 cards.\nSelect a spread to get a tarots reading.\n
 Press 'Read' anytime you want to read again.
 Click on 'Details' button at the tile's bottom-left to select the description of current tarot and be moved to the end of screen to read it.
 Click on 'Zoom-In' button at the tile's bottom-right or click on thumbnail image in the details' description area to zoom-in.
 'All Tarots' spread shows all tarots, shuffle deck with 'Shuffle 'button' with some reversed card when 'Random Reversed' is checked.
 `;
 var title="";
 var imageUrl="";
  title="<span><a href='https://www.altersleeves.com/browse/?browse_type=by&artist_id=16'><img src='dada_logo.jpg' alt='' width='80' height='104' title='Alters by DamarideNeurommancer' style='border-radius:6px;align:center;'/></a></span>";   
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
function initialDeck(){
 AllTarots();
}
function shuffleDeck(){
 exDrawTarots(8);
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
     
 switch(spread){
  case 0: // WitchesPentagram
   myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
   myPanel.style.gridTemplateRows=gridString(2,330); //"330px 330px";
   break;
  case 1: // 4Winds
   myPanel.style.gridTemplateColumns=gridString(3,200); //"200px 200px 200px";
   //myPanel.style.gridTemplateRows=gridString(2,340); //"340px 340px";
   myPanel.style.gridTemplateRows=gridString(3,340); //"340px 340px";
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
  case 8:
  if(!bMobile){
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
 switch(spread){
  case 0: // WitchesPentagram
   drawTaroc(t1,1,P1,rv1);
   drawTaroc(t2,2,P2,rv2);
   drawTaroc(t3,3,P3,rv3);
   drawTaroc(t4,4,P4,rv4);
   drawTaroc(t5,5,P5,rv5);
   drawDetails(t5,rv5,0,5);
   break;
  case 1: // 4Winds
   /*
   drawTaroc(t1,1,W1,rv1);
   drawTaroc(t2,2,W2,rv2);
   drawTaroc(t3,3,W3,rv3);
   drawTaroc(t4,4,W4,rv4);
   drawTaroc(t5,5,W5,rv5);
   */
   drawTarocFake(1);
   drawTaroc(t1,2,W1,rv1);
   drawTarocFake(3);
   drawTaroc(t2,4,W2,rv2);
   drawTaroc(t5,5,W5,rv5);
   drawTaroc(t3,6,W3,rv3);
   drawTarocFake(7);
   drawTaroc(t4,8,W4,rv4);
   drawTarocFake(9);
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
   drawDetails(t4,rv4,0,8);
   break; 
  case 4: // Tarots de Marseille Open Reading (No Reverse)
   drawTaroc(t1,1,O1,0);
   drawTaroc(t2,2,O2,0);
   drawTaroc(t3,3,O3,0);
   drawDetails(t3,0,0,3); // Aggiungo per selezione
   break;
  case 5: // Tarots Pairs
   drawTaroc(t1,1,X1,rv1);
   drawTaroc(t2,2,X2,rv2);
   drawTaroc(t3,3,X3,rv3);
   drawTaroc(t4,4,X4,rv4);
   drawTaroc(t5,5,X5,rv5);
   drawTaroc(t6,6,X6,rv6);
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
   drawDetails(t1,rv1,0,2);
   break;
  case 7:
   /*
   for(var i=0;i<22;i++){
    drawTaroc(i,i,"");
   }
   drawDetails(0,0,0,0);
   */
   for(var i=0;i<22;i++){
    drawTaroc(i,i+1,"");
   }
   drawDetails(0,0,0,1);
   break;
  case 8:
   var bReverse=myChkReverse.checked;
   const s=[];
   for(var i=0;i<2;i++) {
    s[i]=[];
    if(i==0)
     for (var j=0;j<22;j++){
      s[i][j]=j;
     }
    else
     for (var j=0;j<22;j++){
      s[i][j]=bReverse?getTarocUprightOrReversed():0;
    }
   }
   console.log(s);
   // Adesso shuffle
   //s[0].sort(_ => Math.random() - 0.5);
   shuffleArray(s[0]);
   console.log(s);
   for (var i=0;i<22;i++){
    //drawTaroc(s[0][i],i,"",s[1][i]);
    drawTaroc(s[0][i],i+1,"",s[1][i]);
   }
   //drawDetails(s[0][0],0,0,0);
   drawDetails(s[0][0],0,0,1);
   break;
  default:
    break;
 }
 panel.scrollTo(0,0);    
}

// Fisher-Yates Algorithm
/*
It’s just a case of looping through the array (from the end to the start) and 
picking a random item from the array and 
swapping it with the item in the current iteration.
*/

const shuffleArray = array => {
 for(let i=array.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));
  const temp=array[i];
  array[i]=array[j];
  array[j]=temp;
 }
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
 //mybody=document.getElementsByTagName('body')[0];
 mySpreads=document.getElementById("mySpreads");
 myDate=document.getElementById("myDate");
 myDetails=document.getElementById('myDetails');
 myDivDate=document.getElementById('divDate');
 myPanel=document.getElementById('panel');
 modalPopupImg=document.getElementById("img02");

 myDivAll=document.getElementById('divAll');
 myDivOuter=document.getElementById('divOuter');
 bMobile=isMobile();
 if('speechSynthesis' in window){
  bSpeech=true;
  speakData=new SpeechSynthesisUtterance();
  speakData.volume=1; //0-1
  speakData.rate=0.8; //0.1-10
  speakData.pitch=1.5; //0-2
  speakData.lang='en';
  speakData.voice=getVoices()[0];
 }else{
  // Speech Synthesis is not Supported 
  bSpeech=false; 
 }
}
function dateChange(){
 localStorage.setItem("SpreadDate",myDate.value);
}

function myCredits(){
 const url="https://biddytarot.com/tarot-card-meanings/major-arcana/";
 const url1="https://hermitspiritus.com/tarot-cards";
 const url2="https://beingdoingtarot.com/tag/major-arcana-only-reading/";
 const imgtitle="The Meanings of the Major Arcana Tarot Cards";
 const imgtitle1="Rider-Waite Tarot Card Meanings List";
 const imgtitle2="Being Doing Tarot";   
 var sCredits=`<a href='index_AlteredSets.html?set=1'><img src='./tarots/0.webp' alt='DamarideNeurommancer Tarots Set' title='DamarideNeurommancer Tarots Set' width="80" height="140"></a>\n<b style='color:red'>Credits</b>\nThe Tarot cards meaning description here used (whether not exclusively) is based on or extracted from:\n
 <center><span><b><u><a style='color:Red;font-size:0.6rem;align:center' href="${url}"><img src="https://biddytarot.com/wp-content/uploads/BT-BiddyTarotLogo-@2x.png" alt="Biddy Tarot" height="63" width="63">\n${imgtitle}</a></u></b></center>\n
 <center><span><b><u><a style='color:Red;font-size:0.6rem;' href="${url1}"><img src="https://hermitspiritus.com/images/logo.png" alt="Hermit Spiritus" height="64" width="168">\n${imgtitle1}</a></u></b></center>\n
 \nSome spread reading techniques have been extracted from:
 <span><b><u><a style='color:Red;font-size:0.6rem;' href="${url2}">${imgtitle2}</a></u></b>\n\n`;
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
 <button id="myStop" onclick='t2sStop()' title="Stop">&#x23F9;</button>`;
 return html;
}
function t2sStart(){ 
 t2sStarted=true;
 document.getElementById("myDetails").rows[4].cells[0].style.borderColor="red";
 var name=myDetails.rows[0].cells[0].innerText.split('-')[1];
 var upkeyword=myDetails.rows[1].cells[0].innerText;
 var descr=myDetails.rows[4].cells[0].innerText;
 var reading="Tarot: "+name+". "+upkeyword+". "+descr; 
 if(window.getSelection().containsNode(document.getElementById("myDetails").rows[4].cells[0],true)){
  reading=window.getSelection().toString();;
 }
 speakData.text=reading;
 speechSynthesis.speak(speakData);
 document.getElementById("myStart").style.backgroundColor="Red";
 speakData.onend=(event) => {
   //console.log(`Utterance has finished being spoken after ${event.elapsedTime} seconds.`,);
   t2sStop();
 };
}
function t2sPauseResume(){
 if(t2sStarted){
  if(t2sPaused){
   t2sPaused=false; // Resume
   speechSynthesis.resume();
   document.getElementById("myPauseResume").title="Pause";
   document.getElementById("myDetails").rows[4].cells[0].style.borderColor="red";
  }
  else{
   speechSynthesis.pause(); //Pause
   document.getElementById("myPauseResume").title="Resume";
   document.getElementById("myDetails").rows[4].cells[0].style.borderColor="green";
   t2sPaused=true;
  }
 }
}
function t2sStop(){
 speechSynthesis.cancel();
 t2sStarted=false;
 t2sPaused=false;
 try{
  document.getElementById("myPauseResume").title="Pause";
  document.getElementById("myStart").style.backgroundColor="White";
  document.getElementById("myDetails").rows[4].cells[0].style.borderColor="white";
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

function getZodiacSign(sign){
 for(var i=0;i<12;i++){
  if(zodiacMap[i][0]==sign)
   return("<b style='color:silver'><i>"+sign+" </i></b>"+zodiacMap[i][1]);
 }
 return(sign);
}

function getPlanetSign(sign){
 for(var i=0;i<planetMap.length;i++){
  if(planetMap[i][0]==sign)
   return("<b style='color:silver'><i>"+sign+" "+planetMap[i][1]+"</i></b>");
 }
 return(sign);
}
function getElementSign(sign){
 for(var i=0;i<elementMap.length;i++){
  if(elementMap[i][0]==sign)
   return("<b style='color:silver'><i>"+sign+" "+elementMap[i][1]+"</i></b>");
 }
 return("");
}
function getAllElementSign(sign){
 var res="";
 var c=sign.split(',');
 for(var i=0;i<c.length;i++){
  res+=getElementSign(c[i]);
  if(i<c.length-1)
   res+=",";
 }
 return(res);
}  
function getColor(sign){
  var res="";
  var c=sign.split(',');
  for(var i=0;i<c.length;i++){
   res+="<b style='color:"+c[i]+"'>"+c[i]+"</b>";
   if(i<c.length-1)
    res+=",";
  }
  return(res);
}
function getSuitSign(sign){
 for(var i=0;i<suitMap.length;i++){
  if(suitMap[i][0]==sign)
   return("<b style='color:silver'><i>"+sign+" </i>"+suitMap[i][1]+"</b>");
 }
 return("");
} 

function getAllSuitSign(sign){
 var res="";
 var c=sign.split(',');
 for(var i=0;i<c.length;i++){
  res+=getSuitSign(c[i]);
  if(i<c.length-1)
   res+=", ";
 }
 return(res);
}

function getAnimalSign(sign){
 for(var i=0;i<animalMap.length;i++){
  if(animalMap[i][0]==sign)
   return("<b style='color:silver'><i>"+sign+" </i>"+animalMap[i][1]+"</b>");
 }
 return("");
} 

function getAllAnimalSign(sign){
 var res="";
 var c=sign.split(',');
 for(var i=0;i<c.length;i++){
  res+=getAnimalSign(c[i]);
  if(i<c.length-1)
   res+=", ";
 }
 return(res);
}