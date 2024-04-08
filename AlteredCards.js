var bSpeech;
var msgSpeech;
var input=document.getElementById("myInput");
const table=document.getElementById('myTable');
const totalCards=document.getElementById('totalCards');
const tableimg=document.getElementById('myTableImg');
const obj=document.getElementById('center-header');
const footer_img=document.getElementById('myFooter');
const speakUp=document.getElementById('myChkSpeakUp');
const appendResult=document.getElementById('myChkAppend');
const modal=document.getElementById('myModal');
const modalImg=document.getElementById("img01");
const captionText=document.getElementById("caption");
const scryfall=document.getElementById("scryfall");
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const myContent=document.getElementById('myContent');

function myParseCardsEx(){
 myParseCards();   
 bSpeech=false;
 if('speechSynthesis' in window){
  bSpeech=true;
  msgSpeech= new SpeechSynthesisUtterance();
 }
 else{
   speakUp.checked=false;
 }   
}

function mySearch(){
 var filter,bIsCardID;
 filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
 bIsCardID=false;
 var numCardID=parseInt(filter);
 if(Number.isInteger(numCardID))
  bIsCardID=true;
 if(bxmlParsed==false){myParseCardsEx();}
 table.innerHTML="";   
 prevIx=null;
 prevTr=null;
 var CardCnt=0;
 var row,cell;

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
   row=table.insertRow(-1);
   row.addEventListener('click',function(){
   selectRow(this,'selected');
   });

   cell=row.insertCell(-1);
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+(bIsCard?"40":"80")+"px;height:52px;border-radius:2px;align:center;' title=\""+CardID+" "+CardNAME+"\"></a>"
   cell=row.insertCell(-1);
   cell.innerHTML="<font size='1' style='padding: 4px'>"+CardID+"</font>";
   cell.addEventListener('click',function(){
   addToCell(this);
   });
    
   cell=row.insertCell(-1);
   cell.innerHTML="<font size='2' style='padding: 4px;'>"+CardNAME+"</font>";
   cell.addEventListener('click',function(){
   addToCell(this);
   });
 
   cell=row.insertCell(-1);
   cell.innerHTML="<font size='1' style='visibility:hidden;'>"+i+"</font>";
   cell.innerText=i;
   cell.nodeValue=i;
   cell.hidden=true;

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
      if(RelatedList[iRel] != ""){
       CardCnt++;
       row=table.insertRow(-1);
       row.addEventListener('click',function(){
        selectRow(this,'selected');
       });
       mySearchCardID(RelatedList[iRel],row);
      }
     }
    }
    break;
   }
  }
 }
 totalCards.innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" cards in AlterSleeves";
 if(CardCnt>0)
  showRelated(0);
 else{
  tableimg.innerHTML="";
  obj.style.backgroundImage="";
 } 
 window.scrollTo(0,0);
}

function addToCell(x,className){  
 var cell=x.parentNode.cells[3];
 var book=catalog.childNodes[cell.innerHTML];
 var CardID=book.attributes[0].nodeValue;
 var CardNAME=book.attributes[1].nodeValue;
 var bIsCard=true;
 if(book.attributes[2].nodeValue.startsWith("https"))
  bIsCard=false;
 var CardURL=(bIsCard?URLRoot:"")+book.attributes[2].nodeValue;
  
 tableimg.innerHTML="";
 row=tableimg.insertRow(-1);
 cell=row.insertCell(-1);
 cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+(bIsCard?"96":"192")+"px;height:133px;border-radius:6px;align:center;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
  
 var RelatedCards=book.attributes[3].nodeValue;
 if(RelatedCards != ""){
  if(RelatedCards[RelatedCards.length-1]==";"){
   RelatedCards=RelatedCards.substring(0,RelatedCards.length-1);
  }
  var RelatedList=RelatedCards.replace(",",";").split(";");
  var RelatedCount=RelatedList.length;
  var RelatedCnt=1;
  for(var iRel=0;iRel<RelatedCount;iRel++){
   if(RelatedList[iRel] != ""){
    mySearchRelatedID(RelatedList[iRel],row);
   }
  }
 }  
}

let prevIx=null;
let prevTr=null;
function selectRow(tr,className){
 let ix=tr.rowIndex;
 if(ix===prevIx){
  ;
 }
 else{
  if(prevTr){
   prevTr.className=prevTr.className.replace(className,"");
  }
  tr.className+=className;
  prevIx=ix;
  prevTr=tr;
 }
 footer_img.scrollTo(0,0); 
    
 var imgurl=tr.querySelector('img').getAttribute('src');
 obj.style.backgroundImage="url('"+ imgurl+"')";
 if(bSpeech==true)
 {
  var bSpeakUp=speakUp.checked;
  if(bSpeakUp==true){
   msgSpeech.text=tr.cells[2].innerText;
   speechSynthesis.speak(msgSpeech);
  }
 }  
}

function showRelated(index){
 var rowMaster=table.rows[index];
 var xmlindex=rowMaster.cells[3].innerText;
 selectRow(rowMaster,'selected');
 rowMaster.scrollIntoView({behavior: "auto"});
 var book=catalog.childNodes[xmlindex];
 var CardID=book.attributes[0].nodeValue;
 var CardNAME=book.attributes[1].nodeValue;  
 var bIsCard=true;
 if(book.attributes[2].nodeValue.startsWith("https"))
  bIsCard=false;
 var CardURL=(bIsCard?URLRoot:"")+book.attributes[2].nodeValue;
  
 tableimg.innerHTML="";
 var row=tableimg.insertRow(-1);
 cell=row.insertCell(-1);
 cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+(bIsCard?"96":"192")+"px;height:133px;border-radius:6px;align:center;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
  
 var RelatedCards=book.attributes[3].nodeValue;
 if(RelatedCards != ""){
  if(RelatedCards[RelatedCards.length-1]==";"){
   RelatedCards=RelatedCards.substring(0,RelatedCards.length-1);
  }
  var RelatedList=RelatedCards.replace(",",";").split(";");
  var RelatedCount=RelatedList.length;
  var RelatedCnt=1;
  for(var iRel=0;iRel<RelatedCount;iRel++){
   if(RelatedList[iRel] != ""){
    mySearchRelatedID(RelatedList[iRel],row);
   }
  }
 }
 rowMaster.scrollIntoView({behavior: "auto"});
 row.scrollTo(0,0);
}
 
function mySearchRelatedID(Look4CardID,lastRow){
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
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+(bIsCard?"96":"192")+"px;height:133px;border-radius:6px;align:center;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";        
   break;
  }
 }
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
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+(bIsCard?"40":"80")+"px;height:52px;border-radius:2px;align:center;' title=\""+CardID+" "+CardNAME+"\"></a>"
    
   cell=lastRow.insertCell(-1);
   cell.innerHTML="<font size='1' style='padding: 4px'>"+CardID+"</font>";
   cell.addEventListener('click',function(){
   addToCell(this);
   });

   cell=lastRow.insertCell(-1);
   cell.innerHTML="<font size='2' style='padding: 4px'>"+CardNAME+"</font>";
   cell.addEventListener('click',function(){
   addToCell(this);
   });
     
   cell=lastRow.insertCell(-1);
   cell.innerHTML="<font size='1' style='visibility:hidden;'>"+i+"</font>";
   cell.innerText=i;
   cell.nodeValue=i;
   cell.hidden=true;  
   break;
  }
 }
}

function myHelp(){
 var sHelp ="Search by Card-Name or Card-ID that is a numeric value.\nWhen searching by Card-ID you get the card and all its related cards if any.\nAll cards are displayed when a blank search field is given.\nYou can hit 'RETURN' at the end of input text avoiding 'Search' button.\nClick on Card-Id/Card-Name columns in cards list to get the image of that card and its related cards in the bottom panel (horizontally scrollable).In the 'Zoom In' popup you have links to Alter Sleeves and to Scryfall";
 try{
  var imgurl=prevTr.querySelector('img').getAttribute('src');
  var url=prevTr.querySelector('a').getAttribute('href');
  var imgtitle=prevTr.querySelector('img').getAttribute('title');  
  Swal.fire({    
   title: "<span><a style='color:Blue' href='"+url+"'>"+imgtitle+"</a></span>",
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
 return (Math.floor(Math.random()*max)+1);
}

function myRndSearch(){
 if(bxmlParsed==false){myParseCardsEx();}
 var rndCard=getRndInt(totXmlCards);
 var bAppendResult=appendResult.checked;
 var CardCnt=0;
 var totRows=0;
 var totaleCards=0;
 if(bAppendResult==false)
 {
  table.innerHTML="";
  prevIx=null;
  prevTr=null;
 }
 else{
  totRows=table.rows.length;
  CardCnt=table.rows[totRows-1].cells.length;
 }
 totalCards.innerHTML="<font size='1'>Found "+(totRows+1)+" of "+totXmlCards+" cards in AlterSleeves";

 var book=catalog.childNodes[rndCard];
 var CardID=book.attributes[0].nodeValue;
 var CardNAME=book.attributes[1].nodeValue;
 var bIsCard=true;
 if(book.attributes[2].nodeValue.startsWith("https"))
  bIsCard=false;
 var CardURL=(bIsCard?URLRoot:"")+book.attributes[2].nodeValue;
 var row,cell;
 CardCnt++;
  
 row=table.insertRow(-1);
 row.addEventListener('click',function(){
 selectRow(this,'selected');
 });

 cell=row.insertCell(-1);
 cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+(bIsCard?"40":"80")+"px;height:52px;border-radius:2px;align:center;' title=\""+CardID+" "+CardNAME+"\"></a>"

 cell=row.insertCell(-1);
 cell.innerHTML="<font size='1' style='padding: 4px'>"+CardID+"</font>";
 cell.addEventListener('click',function(){
 addToCell(this);
 });
  
 cell=row.insertCell(-1);
 cell.innerHTML="<font size='2' style='padding: 4px'>"+CardNAME+"</font>";
 cell.addEventListener('click',function(){
 addToCell(this);
 });
  
 cell=row.insertCell(-1);  
 cell.innerHTML="<font size='1' style='visibility:hidden;'>"+rndCard+"</font>";
 cell.innerText=rndCard;
 cell.nodeValue=rndCard;
 cell.hidden=true;
    
 if(bAppendResult==false)
  showRelated(0);
 else{
  totRows=table.rows.length;
  showRelated(totRows-1);
 }
 row.scrollIntoView({behavior: "smooth"});                         
}

document.onkeydown=function (e){
 var currRow=prevIx;
 var totRows=table.rows.length;
 var rowMaster=null;
 var offset=-200;
 if(totRows > 0){
  switch (e.key){
   case 'ArrowUp':
    if(currRow>0){
     showRelated(currRow-1);

     rowMaster=table.rows[currRow];
     rowMaster.scrollIntoView(true,{behavior: "smooth"});
     if(currRow>=totRows-5)
      offset=-20;
     window.scrollBy(0,offset);
    }
    break;
   case 'ArrowDown':
    if(currRow<totRows){
     showRelated(currRow+1);

     rowMaster=table.rows[currRow];
     rowMaster.scrollIntoView(true,{behavior: "smooth"});
     if(currRow >= totRows-5)
      offset=-20;
     window.scrollBy(0,offset);
    }              
    break;
   case 'Home':
    showRelated(0);
    rowMaster=table.rows[0];
    rowMaster.scrollIntoView(true,{behavior: "smooth"});
    window.scrollBy(0,-200);             
    break;
   case 'End':
    showRelated(totRows-1);
    rowMaster=table.rows[totRows-1];
    rowMaster.scrollIntoView(true,{behavior: "smooth"});
    window.scrollBy(0,-200);            
    break;
  }
 }
};

function myPopup(){
 if(prevTr===null)
  return;
 var img=prevTr.querySelector('img').getAttribute('src');
 var imgtitle=prevTr.querySelector('img').getAttribute('title'); 
 var url=prevTr.querySelector('a').getAttribute('href'); 
 modal.style.display="block";
 modalImg.src=img;
 modalImg.alt=imgtitle;
 captionText.innerHTML="<a href='"+url+"' style='font-size: 16px;'>"+modalImg.alt+"</a>";
 var result=imgtitle.indexOf(" ");
 var scryCard=imgtitle.substring(result+1);
 scryfall.innerHTML="<a href='https://scryfall.com/search?q=!\""+scryCard.replaceAll("'","%27").replaceAll("&","%26")+"\"' style='font-size: 12px;'><img src='Scryfall.ico' alt='Scryfall' style='width:12px;height:12px;vertical-align:middle;'> Scryfall</a>";
}

var span=document.getElementsByClassName("close")[0];
span.onclick=function(){ 
 modal.style.display="none";
}

function openNav(){
 myContent.style.marginLeft="181px";
 footer_img.style.marginLeft="181px";
 sideBar.style.width="180px";
 main.style.marginLeft="180px"; 
}

function closeNav(){
 sideBar.style.width="0";
 main.style.marginLeft="0";
 myContent.style.marginLeft="0px";
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
 if(prevTr===null)
  return;
 var _imgtitle=prevTr.querySelector('img').getAttribute('title'); 
 var _url=prevTr.querySelector('a').getAttribute('href');
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
 if(prevTr===null)
  return;
 var imgtitle=prevTr.querySelector('img').getAttribute('title');
 var result=imgtitle.indexOf(" ");
 var cardID=imgtitle.substr(0,result);
 location.href="SearchByImage.html?id="+cardID;
}