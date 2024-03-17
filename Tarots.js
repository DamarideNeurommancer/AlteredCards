var bxmlParsed=false;
var xmlDoc;
var catalog,book;
var totXmlTarots;
const mySpreads=document.getElementById("mySpreads");
const myDate=document.getElementById("myDate");
const t1Title=document.getElementById("t1");
const t2Title=document.getElementById("t2");
const t3Title=document.getElementById("t3");
const t4Title=document.getElementById("t4");
const t5Title=document.getElementById("t5");
const t6Title=document.getElementById("t6");
const t7Title=document.getElementById("t7");
const t8Title=document.getElementById("t8");
const t9Title=document.getElementById("t9");
const myDetails=document.getElementById('myDetails');
const myDivDate=document.getElementById('divDate');
const myPanel=document.getElementById('panel');

var rndCard=-1;

const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const header=document.getElementById('myHeader');
const modalImg=document.getElementById("img01");
const captionText=document.getElementById("caption");
const resultText=document.getElementById("result");
const modal=document.getElementById('myModal');
const captionModal=document.getElementById('caption-modal');
const modalPopupImg=document.getElementById("img02");
const scryfall=document.getElementById("scryfall");
//const originalImage=new Image();
var CardURL="";

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
}

function myRead(){
 if(bxmlParsed==false){
  myParseTarots();
 }
 switch(spreadNo){
  case 1:
   BirthDateTarots();
   break;
  default:
   console.log("Che leggo!?");
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
 const t1idx=tarots[0],t2idx=tarots[1],t3idx=tarots[2];
 var x=window.matchMedia("(max-width:380px)")

 if(!isMobile()&&!x.matches){
  //t2idx=t1idx;
  if(t2idx!=-1){
   myPanel.style.gridTemplateColumns="200px 200px 200px";
   //myPanel.style.gridTemplateRows="300px 300px 300px";
   //drawTaroc(t1idx,t1Title,"Left Card");
   //drawTaroc(t2idx,t2Title, "Middle Card");
   //drawTaroc(t3idx,t3Title,"Right Card");
  }
  else{
   //myPanel.style.gridTemplateColumns="200px 200px";
   myPanel.style.gridTemplateRows="300px 300px";
   //drawTaroc(t1idx,t1Title,"Left Card");
   //drawTaroc(t3idx,t2Title,"Right Card");
  }
  drawTaroc(t1idx,t1Title,"Left Card",1);
  //drawTaroc(t3idx,t3Title,"Right Card");
  if(t2idx!=-1){
   drawTaroc(t2idx,t2Title, "Middle Card");
   drawTaroc(t3idx,t3Title,"Right Card");
  }
  else{
   drawTaroc(t3idx,t2Title,"Right Card");
  }
 }
 else{
   if(t2idx!=-1){
   myPanel.style.gridTemplateColumns="200px";
   myPanel.style.gridTemplateRows="300px 300px 300px";
  }
  else{
   myPanel.style.gridTemplateColumns="200px";
   myPanel.style.gridTemplateRows="300px 300px";
  }
  drawTaroc(t1idx,t1Title,"Left Card");
  //drawTaroc(t3idx,t7Title,"Right Card");
  if(t2idx!=-1){
   drawTaroc(t2idx,t4Title,"Middle Card");
   drawTaroc(t3idx,t7Title,"Right Card");
  }
  else{
   drawTaroc(t3idx,t4Title,"Right Card");
  }
 }  
}

function drawTaroc(idx,elem,note,rev=0){
 book=catalog.childNodes[idx];
 var CardID=book.attributes[1].nodeValue; //C
 var title = book.attributes[0].nodeValue + " - " + book.attributes[2].nodeValue; // I + N
 //Upright_Keywords
 var uk=book.attributes[3].nodeValue; //UK Upright_Keywords
 var url= URLRoot+book.attributes[8].nodeValue; //U url in AlterSleeves
 var tFilename="file:///D:\\LEST\\JS\\SITO WEB GITHUB\\"+CardID+".jpg";
 if(rev==1){
  try{
   const originalImage=new Image();
   originalImage.crossOrigin = "anonymous";
   originalImage.addEventListener('load',async function(){
    //drawXXX(originalImage);
    //ReverseTaroc(originalImage);
    originalImage.src=await ReverseTaroc(originalImage);
   });
   originalImage.src=tFilename;
  }
  catch(err){;}
 }

 //background-color:gold;
 var CardsHTML=`<div class="box" style="color:DarkGoldenRod;font-weight:bolder" onclick='drawDetails("${idx}")'>${title}<div>
   <a href="${url}"><img class="modal-content" src="${tFilename}" alt="${title}" title="${title}"></a>
   <p style="color:white;font-size:12px;font-style:italic" onclick='drawDetails("${idx}")'>${note}<br>${uk}</p>
  </div>
 </div>`;
 // click sul <div> e sul <p> per avere i dettagli
 elem.innerHTML=CardsHTML;
 drawDetails(idx);
}

function drawDetails(idx,rev=0){
 book=catalog.childNodes[idx];
 var title = book.attributes[0].nodeValue + " - " + book.attributes[2].nodeValue; // I + N
 //Upright_Keywords
 var uk=book.attributes[3].nodeValue; //UK Upright_Keywords
 var row,cell;
 myDetails.innerHTML="";
 
 // ID - Name (VIII - Strength)
 row=myDetails.insertRow(-1);
 cell=row.insertCell(-1);
 cell.style.textAlign="center";
 cell.style.fontSize="16px";
 cell.style.fontWeight="900";
 cell.style.color="gold";
 cell.innerHTML=title;
 
 // Upright_Keywords (Strength, courage, persuasion, influence, compassion)
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
 epzcas+=" Planet: "+p;  
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
 cell.innerHTML=_Description;
 
 row=myDetails.insertRow(-1);
 var _Upright=book.attributes[6].nodeValue;
 if(rev){
  // Reversed
  _Upright=book.attributes[7].nodeValue;
 }
 cell=row.insertCell(-1);
 cell.style.textAlign="justify";
 cell.style.fontSize="12px";
 cell.style.backgroundColor="Black";
 cell.style.fontWeight="bolder";
 cell.style.color="gold";
 cell.innerHTML=_Upright.replaceAll("\r\n","<br>");
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
  case 19:
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
  case 22: //??
   l=22;
   r=22;
   break;
 }
 return [l-1,m-1,r-1];
}

function resetDate(){
 myDate.valueAsDate=new Date();
 BirthDateTarots();
}

function setDate(days){ 
 var oldDate=new Date(myDate.value);
 var newDate=new Date(oldDate.getFullYear(),oldDate.getMonth(),oldDate.getDate()+days);
 //myDate.defaultValue=newDate.getFullYear()+"-"+(newDate.getMonth()+1).toString().padStart(2,'0')+"-"+newDate.getDate().toString().padStart(2,'0');
 //myDate.value=myDate.defaultValue;
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
/*
c.addEventListener('click',function(){
 mySearch();
});
*/

/**
function myCheck()
{
 if(rndCard==-1)
  return;
 var input,filter;
 input=document.getElementById("myInput");
 filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase(); 
 var catalog=xmlDoc.getElementsByTagName('Cards')[0];
 var book=catalog.childNodes[rndCard];
 var CardID=book.attributes[0].nodeValue;
 var CardNAME=book.attributes[1].nodeValue;
 CardURL=URLRoot+book.attributes[2].nodeValue;
 var msg="";
 if(CardNAME.toUpperCase()==filter){
  msg="Right Guess, congrats you win!"
 } 
 resultText.innerHTML=msg;
 modalImg.src=CardID+".jpg";
 modalImg.alt=CardID+" "+CardNAME;
 modalImg.title=CardID+" "+CardNAME;
 modalImg.style.visibility="visible";
 captionText.innerHTML="<a href='"+CardURL+"' style='font-size: 16px;'>"+modalImg.alt+"</a>";
 myResult(msg,modalImg.src,modalImg.title,CardURL)
}
***/

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
 var sHelp ="Click 'New' button to get a new card or simply pat the image.\nEnter your guessed card's name and hit return.\nClick 'Check' button to unveil the whole card.\nClick the shown card or press the 'Zoom In' button and in the popup you have links to Alter Sleeves and to Scryfall.\nOnce unveiled, on mobile, you can share the card's AlterSleeves Link.";
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

/*
function myPopup(){
 if(modalImg.style.visibility=="hidden")
  return;
 var img=modalImg.src;
 var imgtitle=modalImg.title; 
 var url=CardURL; 
 modal.style.display="block";
 modalPopupImg.src=img;
 modalPopupImg.alt=imgtitle;
 captionModal.innerHTML="<a href='"+url+"' style='font-size: 16px;'>"+modalImg.alt+"</a>";
 var result=imgtitle.indexOf(" ");
 var scryCard=imgtitle.substring(result+1);
 scryfall.innerHTML="<a href='https://scryfall.com/search?q=!\""+scryCard.replaceAll("'","%27").replaceAll("&","%26") + "\"' style='font-size: 12px;'><img src='Scryfall.ico' alt='Scryfall' style='width:12px;height:12px;vertical-align:middle;'> Scryfall</a>";
}


function getRndInt(max){
 return (Math.floor(Math.random()*max)+1);
}
*/

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

/****
function getRandomTaroc(max){
 return(Math.floor(Math.random()*max)+1);
}
function getTarocUprightOrReversed(){
 var x=Math.floor(Math.random()*2)+1;
 return (x==0?false:true);
}
****/

/*
function WitchesPentagram(){
    // Genera i 4 tarocchi random evitando ripetizioni, il 5 lo calcola come quintessenza
    var bReversed=false;
    var taroc1 = getRandomTaroc(totXmlTarots);
    bReversed = getTarocUprightOrReversed();
    TarocListIndex1.Text = taroc1.ToString();
    TarocUR1.Text = (bReversed ? "R" : "U");
    if (bReversed)
        TarocPic1.Image = ReverseTaroc(ListTarocs[taroc1].TarocBitmapImage);
    else
        TarocPic1.Image = ListTarocs[taroc1].TarocBitmapImage;
    TarocName1.Text = ListTarocs[taroc1].TarocID + " - " + ListTarocs[taroc1].TarocName;
    TarocSummary1.Text = (bReversed ? ListTarocs[taroc1].Reversed_Keywords : ListTarocs[taroc1].Upright_Keywords);
    TarocNote1.Text = "Top: Spirit - What is your goal?";
    TarocPanel1.Left = 490;
    TarocPanel1.Top = 62;
    TarocPanel1.Visible = true;

    int taroc2 = getRandomTaroc();
    while (taroc2 == taroc1)
        taroc2 = getRandomTaroc();
    bReversed = getTarocUprightOrReversed();
    TarocListIndex2.Text = taroc2.ToString();
    TarocUR2.Text = (bReversed ? "R" : "U");
    if (bReversed)
        TarocPic2.Image = ReverseTaroc(ListTarocs[taroc2].TarocBitmapImage);
    else
        TarocPic2.Image = ListTarocs[taroc2].TarocBitmapImage;
    TarocName2.Text = ListTarocs[taroc2].TarocID + " - " + ListTarocs[taroc2].TarocName;
    TarocSummary2.Text = (bReversed ? ListTarocs[taroc2].Reversed_Keywords : ListTarocs[taroc2].Upright_Keywords);
    TarocNote2.Text = "Left: What do you think about the situation?";
    TarocPanel2.Left = 300;
    TarocPanel2.Top = 110;
    TarocPanel2.Visible = true;


    int taroc3 = getRandomTaroc();
    while (taroc3 == taroc2 || taroc3 == taroc1)
        taroc3 = getRandomTaroc();
    bReversed = getTarocUprightOrReversed();
    TarocListIndex3.Text = taroc3.ToString();
    TarocUR3.Text = (bReversed ? "R" : "U");
    //TarocPic3.Image = ListTarocs[taroc3].TarocBitmapImage;
    if (bReversed)
        TarocPic3.Image = ReverseTaroc(ListTarocs[taroc3].TarocBitmapImage);
    else
        TarocPic3.Image = ListTarocs[taroc3].TarocBitmapImage;

    TarocName3.Text = ListTarocs[taroc3].TarocID + " - " + ListTarocs[taroc3].TarocName;
    TarocSummary3.Text = (bReversed ? ListTarocs[taroc3].Reversed_Keywords : ListTarocs[taroc3].Upright_Keywords);
    TarocNote3.Text = "Bottom Left: What practical steps do you need to take?";
    TarocPanel3.Left = 394;
    TarocPanel3.Top = 446;
    TarocPanel3.Visible = true;

    int taroc4 = getRandomTaroc();
    while (taroc4 == taroc3 || taroc4 == taroc2 || taroc4 == taroc1)
        taroc4 = getRandomTaroc();
    bReversed = getTarocUprightOrReversed();
    TarocListIndex4.Text = taroc4.ToString();
    TarocUR4.Text = (bReversed ? "R" : "U");
    TarocPic4.Image = ListTarocs[taroc4].TarocBitmapImage;
    if (bReversed)
        TarocPic4.Image = ReverseTaroc(ListTarocs[taroc4].TarocBitmapImage);
    else
        TarocPic4.Image = ListTarocs[taroc4].TarocBitmapImage;

    TarocName4.Text = ListTarocs[taroc4].TarocID + " - " + ListTarocs[taroc4].TarocName;
    TarocSummary4.Text = (bReversed ? ListTarocs[taroc4].Reversed_Keywords : ListTarocs[taroc4].Upright_Keywords);
    TarocNote4.Text = "Bottom Right: Where do you need to focus your energy?";
    TarocPanel4.Left = 586;
    TarocPanel4.Top = 446;
    TarocPanel4.Visible = true;

    int quintessence = (taroc1 == 0 ? 22 : taroc1) + (taroc2 == 0 ? 22 : taroc2) + (taroc3 == 0 ? 22 : taroc3) + (taroc4 == 0 ? 22 : taroc4); // + 4;
    if (quintessence > 22)
    {
        int decina = quintessence / 10;
        int unita = quintessence % 10;
        quintessence = decina + unita;
    }
    int taroc5 = quintessence; // + 1;
    bReversed = getTarocUprightOrReversed();
    TarocListIndex5.Text = taroc5.ToString();
    TarocUR5.Text = (bReversed ? "R" : "U");
    //TarocPic5.Image = ListTarocs[taroc5].TarocBitmapImage;
    if (bReversed)
        TarocPic5.Image = ReverseTaroc(ListTarocs[taroc5].TarocBitmapImage);
    else
        TarocPic5.Image = ListTarocs[taroc5].TarocBitmapImage;

    TarocName5.Text = ListTarocs[taroc5].TarocID + " - " + ListTarocs[taroc5].TarocName;
    TarocSummary5.Text = (bReversed ? ListTarocs[taroc5].Reversed_Keywords : ListTarocs[taroc5].Upright_Keywords);
    TarocNote5.Text = "Quintessence: How do you feel about the situation?";
    TarocPanel5.Left = 680;
    TarocPanel5.Top = 110;
    TarocPanel5.Visible = true;
    DisplayTarocInfo(taroc5, bReversed);
}
*/
/*
function drawXXX(img){
 var originalCanvas = document.getElementById('original').getContext('2d');
  originalCanvas.canvas.width = img.width;
  originalCanvas.canvas.height = img.height;
  originalCanvas.drawImage(img, 0, 0);
}
*/

/*async function ReverseTaroc(img){
  var canvas = document.getElementById('original');
  var context = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  
  context.translate(0,canvas.height);
  context.scale(1,-1);
  context.drawImage(img,0,0);
}*/

async function ReverseTaroc(img){
  const canvas=document.createElement("canvas");
  const context=canvas.getContext("2d",{willReadFrequently:true});
  canvas.width=img.width;
  canvas.height=img.height;
  context.translate(0,canvas.height);
  context.scale(1,-1);
  context.drawImage(img,0,0);
  return canvas.toDataURL();
}
