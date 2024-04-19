const tableimg=document.getElementById('myTableImg');
const obj=document.getElementById('myPreview');
const captionText=document.getElementById("caption");
const totCards=document.getElementById('totalCards');
const footer_img=document.getElementById('myFooter');
const modal=document.getElementById('myModal');
const modalImg=document.getElementById("img01");
const caption_md=document.getElementById("caption_md");
const scryfall=document.getElementById("scryfall");
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const container=document.getElementById("myContainer");
const prev=document.getElementById("myPrev");
const next=document.getElementById("myNext");
const btShow=document.getElementById("myShowCheck");
var bShow=false;
var timerID;

function mySearch(){
 var input,filter,bIsCardID;
 input=document.getElementById("myInput");
 filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
 bIsCardID=false;
 var numCardID=parseInt(filter);
 if(Number.isInteger(numCardID))
  bIsCardID=true;
 if(bxmlParsed==false){myParseCards();}
 myStopShow();
 tableimg.innerHTML="";
 prevIx=null;
 prevTd=null;
 obj.src= "";
 obj.title="";
 captionText.innerHTML="";
 
 var CardCnt=0;
 var row=null;
 var cell;
 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  var CardNAME=book.attributes[1].nodeValue;
  if(CardNAME.toUpperCase().indexOf(filter) > -1 || CardID==filter){
   var bIsCard=true;
   if(book.attributes[2].nodeValue.startsWith("https"))
    bIsCard=false;
   var CardURL=(bIsCard?URLRoot:"")+book.attributes[2].nodeValue;
   CardCnt++;

   if(row===null)
    row=tableimg.insertRow(-1);
    
   cell=row.insertCell(-1);
   cell.innerHTML="<img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='" +CardID+"' style='width:"+(bIsCard?"96":"192")+"px;height:133px;border-radius:6px;align:center;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+"<a href='"+CardURL + "'>"+CardNAME+"</font></a>";
   cell.addEventListener('click',function(){
    selectCell(this,'selected');
   });
        
   if(bIsCardID==true){
    var RelatedCards=book.attributes[3].nodeValue;
    if(RelatedCards != ""){
     if(RelatedCards[RelatedCards.length-1]==";"){
      RelatedCards=RelatedCards.substring(0,RelatedCards.length-1);
     }
     var RelatedList=RelatedCards.replace(",",";").split(";");
     var RelatedCount=RelatedList.length;
     var RelatedCnt=1;
     for(var iRel=0;iRel<RelatedCount;iRel++){
      if(RelatedList[iRel]!=""){
       CardCnt++;
       mySearchCardID(RelatedList[iRel],row);
      }
     }
    }
    break;
   }
  }
 }
 totalCards.innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" cards in AlterSleeves";
  
 if(CardCnt > 0){
  cell=tableimg.rows[0].cells[0];
  selectCell(cell,'selected'); 
 }
 footer_img.scrollTo(0,0); 
}

function mySearchCardID(Look4CardID,lastRow){
 for(var i=0;i<catalog.childElementCount;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  if(CardID===Look4CardID){
   var CardNAME=book.attributes[1].nodeValue;
   var bIsCard=true;
   if(book.attributes[2].nodeValue.startsWith("https"))
    bIsCard=false;
   var CardURL=(bIsCard?URLRoot:"")+book.attributes[2].nodeValue;
  
   cell=lastRow.insertCell(-1);
   cell.innerHTML="<img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='" +CardID+"' style='width:"+(bIsCard?"96":"192")+"px;height:133px;border-radius:6px;align:center;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+"<a href='"+CardURL+"'>"+CardNAME+"</font></a>";
   cell.addEventListener('click',function(){
    selectCell(this,'selected');
   });    
   break;
  }
 }
}
 
let prevIx=null;
let prevTd=null;
function selectCell(td,className){
 let ix=td.cellIndex;
 if(ix===prevIx){
  ;
 }
 else{
  if(prevTd){
   prevTd.className=prevTd.className.replace(className,"");
  }
  td.className+=className;
  prevIx=ix;
  prevTd=td;
 } 
    
 var imgurl=td.querySelector('img').getAttribute('src');
 var imgtitle=td.querySelector('img').getAttribute('title');
 
 obj.src=imgurl;
 obj.style.width="286px";
 obj.style.height="auto";
 obj.style.borderRadius="20px";
 obj.title=imgtitle;
 obj.style.cursor="zoom-in";
 var url=td.querySelector('a').getAttribute('href');
 captionText.innerHTML="<a href='"+url+"' style='font-size:16px;'>"+imgtitle+"</a>"; 
}  
 
function myHelp(){
 var sHelp="Search by Card-Name or Card-ID.\nCard-ID is a numeric value shown in the tooltip.\nWhen searching by Card-ID you get the card and all its related cards if any.\nAll cards are displayed when a blank search field is given.\nYou can hit 'RETURN' at the end of input text avoiding 'Search' button.\nHit 'Show' to start an automatic and random Gallery Show and press it again when you want to stop the flow.";
 try{
  var imgurl=prevTd.querySelector('img').getAttribute('src');
  var url=prevTd.querySelector('a').getAttribute('href');
  var imgtitle=prevTd.querySelector('img').getAttribute('title');  
  Swal.fire({
   title: "<span><a style='color:Blue;background-color:white' href='"+url+"'>"+imgtitle+"</a></span>",
   html: "<span style='color:Black'><b>"+sHelp.replaceAll('\n','<br>')+"</b></span>",
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

function getRndInt(max){
 return (Math.floor(Math.random() * max)+1);
}

function myRndSearch(){
 if(bxmlParsed==false){myParseCards();}
 var rndCard=getRndInt(totXmlCards);

 var bAppendResult=document.getElementById('myChkAppend').checked;
 var totCols=0;
 var totaleCards=0;
 if(bAppendResult==false){
  tableimg.innerHTML="";
  prevIx=null;
  prevTd=null;
 }   
 else{
  totCols=tableimg.rows[0].cells.length;
  totaleCards=totCols;
 }
 totCards.innerHTML="<font size='1'>Found "+(totaleCards+1)+" of "+totXmlCards+" cards in AlterSleeves";

 var book=catalog.childNodes[rndCard];
 var CardID=book.attributes[0].nodeValue;
 var CardNAME=book.attributes[1].nodeValue;
 var CardURL=(CardID>100?URLRoot:"")+book.attributes[2].nodeValue;
    
 var row,cell;
 if(totCols==0)
  row=tableimg.insertRow(-1);
 else
  row=tableimg.rows[0]; 
     
 cell=row.insertCell(-1);
 cell.innerHTML="<img src='"+CardID+(CardID>100?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+(CardID>100?"96":"192")+"px;height:133px;border-radius:6px;align:center;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+"<a href='"+CardURL+"'>"+CardNAME+"</font></a>";
 cell.addEventListener('click',function(){
  selectCell(this,'selected');
 });
  
 if(bAppendResult==true)
  cell.scrollIntoView({behavior: "smooth"});
  
 selectCell(cell,'selected');
}

function myShow(){
 if(bShow==false)
 {
  btShow.style.backgroundColor="DarkOrchid";
  btShow.title="Stop Gallery Show";
  btShow.innerHTML="Show&#9726;";
  btShow.style.cursor="wait";
  bShow=true;
  timerID=setInterval(function (){myRndSearch();},3000);
 }
 else
 {
  myStopShow();
 }
}

function myStopShow()
{
 btShow.style.backgroundColor="White";
 btShow.title="Start Gallery Show";
 btShow.innerHTML="Show&#9658;";
 btShow.style.cursor="default";
 bShow=false;
 clearInterval(timerID);
}

document.onkeydown=function (e){
 var currCell=prevIx;
 var currTd=prevTd; 
 var totCells=tableimg.rows[0].cells.length;
 
 if(totCells>0){
  switch (e.key){
   case 'ArrowUp':
   case 'ArrowLeft':
    if(currCell>0)
     currTd=tableimg.rows[0].cells[currCell-1];
    else
     currTd=tableimg.rows[0].cells[totCells-1];
    selectCell(currTd,'selected')
    currTd.scrollIntoView(true,{behavior: "smooth"});
    break;
   case 'ArrowDown':
   case 'ArrowRight':
    if(currCell<totCells-1)
     currTd=tableimg.rows[0].cells[currCell+1];
    else
     currTd=tableimg.rows[0].cells[0];
    selectCell(currTd,'selected')
    currTd.scrollIntoView(true,{behavior: "smooth"});            
    break;
   case 'Home':
    currTd=tableimg.rows[0].cells[0];
    selectCell(currTd,'selected')
    currTd.scrollIntoView(true,{behavior: "smooth"});   
    break;
   case 'End':
    currTd=tableimg.rows[0].cells[totCells-1];
    selectCell(currTd,'selected')
    currTd.scrollIntoView(true,{behavior: "smooth"});            
    break;
   case 'PageDown':
    if(currCell+7 < totCells)
     currTd=tableimg.rows[0].cells[currCell+7];
    else
     currTd=tableimg.rows[0].cells[totCells-1];
    selectCell(currTd,'selected')
    currTd.scrollIntoView(true,{behavior: "smooth"});                   
    break;
   case 'PageUp':
    if(currCell-7 > 0)
     currTd=tableimg.rows[0].cells[currCell-7];
    else
     currTd=tableimg.rows[0].cells[0]; 
    selectCell(currTd,'selected')
    currTd.scrollIntoView(true,{behavior: "smooth"});                   
    break; 
  }
 }
};

function simulateArrowsKey(myKey)
{
document.dispatchEvent(new KeyboardEvent('keydown',{
 key: myKey,
 shiftKey: false,
 ctrlKey: false,
 metaKey: false
}));
}

function myPopup(){
 if(prevTd===null)
  return;
 var img=prevTd.querySelector('img').getAttribute('src');
 var imgtitle=prevTd.querySelector('img').getAttribute('title'); 
 var url=prevTd.querySelector('a').getAttribute('href'); 
 modal.style.display="block";
 modalImg.src=img;
 modalImg.alt=imgtitle;
 caption_md.innerHTML="<a href='"+url+"' style='font-size:16px;'>"+modalImg.alt+"</a>";
 var result=imgtitle.indexOf(" ");
 var CardID=imgtitle.substr(0,result-1).trim();
 if(CardID >100)
  scryfall.innerHTML="<a href='https://scryfall.com/search?q=!\""+prevTd.textContent.replaceAll("'","%27").replaceAll("&","%26") + "\"' style='font-size: 12px;'><img src='Scryfall.ico' alt='Scryfall' style='width:12px;height:12px;vertical-align:middle;'> Scryfall</a>";
 else
  scryfall.innerHTML="";
}

var span=document.getElementsByClassName("close")[0];
span.onclick=function(){ 
 modal.style.display="none";
}

function openNav(){
 container.style.marginLeft="181px";
 footer_img.style.marginLeft="181px"; 
 sideBar.style.width="180px";
 main.style.marginLeft="180px";
}

function closeNav(){
 sideBar.style.width="0";
 main.style.marginLeft="0";
 container.style.marginLeft="0";
 footer_img.style.marginLeft="0";
}

document.addEventListener('click',function handleClickOutside(event){
 if(!main.contains(event.target)){
  closeNav();
 }
});

let shareData={
 title: "",
 text: "",
 url: "",
}
async function myShare()
{
 if(prevTd===null)
  return;
 var _imgtitle=prevTd.querySelector('img').getAttribute('title'); 
 var _url=prevTd.querySelector('a').getAttribute('href');
 shareData={
  title: "AlterSleeves Link",
  text: _imgtitle,
  url: _url,
 }
 if(navigator.canShare&&navigator.canShare(shareData)){
  await navigator.share(shareData);
 }
}
function mySimilar()
{
 if(prevTd===null)
  return;
 var imgtitle=prevTd.querySelector('img').getAttribute('title');
 var result=imgtitle.indexOf(" ");
 var cardID=imgtitle.substr(0,result);
 location.href = "SearchByImage.html?id="+cardID;
}