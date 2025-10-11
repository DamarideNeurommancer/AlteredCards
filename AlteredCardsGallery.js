const and_opt=document.getElementById("and_opt");
const checkboxes=document.getElementById("checkboxes");
const myChecks=document.getElementById('myChecks');
const myColorless=document.getElementById('C');
const myColorWhite=document.getElementById('W');
const myColorBlue=document.getElementById('U');
const myColorBlack=document.getElementById('B');
const myColorRed=document.getElementById('R');
const myColorGreen=document.getElementById('G');
var tableimg=document.getElementById('myTableImg');
const obj=document.getElementById('myPreview');
const captionText=document.getElementById("caption");
var totCards=document.getElementById('totalCards');
var footer_img=document.getElementById('myFooter');
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
var input=document.getElementById("myInput");
const myArt=document.getElementById('myArt');
var bShow=false;
var timerID;
const lazyLimit=20;

function mySearch(){
 var filter,bIsCardID;
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
 var colors=getManaColorsSelected();
 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  var CardNAME=book.attributes[1].nodeValue;
  if(CardNAME.toUpperCase().indexOf(filter) > -1 || CardID==filter){
   var bGoOn=false;
   if(myArt.checked){
    var CardART=book.attributes[5].nodeValue;
    if(CardART!="1")
     continue;
   } 
   var cntOccurs=0;
   if(!bIsCardID&&colors!=""){
     var ManaColors=book.attributes[4].nodeValue;
     if(ManaColors=='C' && colors=='C')
      bGoOn=true;
    else{
      for(var j=0;j<colors.length;j++){
       const c=colors[j];
       if(ManaColors.indexOf(c)>-1){
        if(!and_opt.checked){
         bGoOn=true;
         break;
        }
        else{
         cntOccurs++;
        } 
       }
      }
      if(and_opt.checked&&cntOccurs==colors.length&&ManaColors.length==colors.length)
       bGoOn=true; 
    }   
   }
   else
    bGoOn=true;
    
   if(bGoOn==false)
    continue;

   var bIsCard=true;
   /*if(book.attributes[2].nodeValue.startsWith("https"))
    bIsCard=false;
   var CardURL=(bIsCard?URLRoot:"")+book.attributes[2].nodeValue;*/
   var CardUrlXml=book.attributes[2].nodeValue;
   if(CardUrlXml.startsWith("https"))
    bIsCard=false;
   
   var CardURL=CardUrlXml;
   if(bIsCard){
     if(!CardUrlXml.startsWith("~")){
      CardURL=URLRoot+CardUrlXml;
     }
     else{
       CardURL=URLMythic+CardUrlXml.replace("~","");
     }
   }
   CardCnt++;

   if(row===null)
    row=tableimg.insertRow(-1);
    
   cell=row.insertCell(-1);
   cell.innerHTML="<img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='" +CardID+"' style='width:"+(bIsCard?"96":"192")+"px;height:133px;border-radius:6px;align:center;' title=\""+CardID+" "+CardNAME+"\""+(CardCnt>lazyLimit?" loading='lazy'":"")+"><font size='1'><br>"+"<a href='"+CardURL + "'>"+CardNAME+"</font></a>";
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
       mySearchCardID(RelatedList[iRel],row,CardCnt);
      }
     }
    }
    break;
   }
  }
 }
 totalCards.innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" cards in AlterSleeves"+(myArt.checked?" (Art Replacement)":"");
  
 if(CardCnt > 0){
  cell=tableimg.rows[0].cells[0];
  selectCell(cell,'selected'); 
 }
 footer_img.scrollTo(0,0); 
}

function mySearchCardID(Look4CardID,lastRow, CardCnt){
 for(var i=0;i<catalog.childElementCount;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  if(CardID===Look4CardID){
   var CardNAME=book.attributes[1].nodeValue;
   var bIsCard=true;
   /*if(book.attributes[2].nodeValue.startsWith("https"))
    bIsCard=false;
   var CardURL=(bIsCard?URLRoot:"")+book.attributes[2].nodeValue;*/
   var CardUrlXml=book.attributes[2].nodeValue;
   if(CardUrlXml.startsWith("https"))
    bIsCard=false;
   
   var CardURL=CardUrlXml;
   if(bIsCard){
     if(!CardUrlXml.startsWith("~")){
      CardURL=URLRoot+CardUrlXml;
     }
     else{
       CardURL=URLMythic+CardUrlXml.replace("~","");
     }
   }
   
   cell=lastRow.insertCell(-1);
   cell.innerHTML="<img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='" +CardID+"' style='width:"+(bIsCard?"96":"192")+"px;height:133px;border-radius:6px;align:center;' title=\""+CardID+" "+CardNAME+"\""+(CardCnt>lazyLimit?" loading='lazy'":"")+"><font size='1'><br>"+"<a href='"+CardURL+"'>"+CardNAME+"</font></a>";
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
 mySave(); 
}  
 
function myHelp(){
 var sHelp=`Search by Card-Name (and by Mana-Colors and by Art-Replacement) or Card-ID.
 &#9658; Card-ID is a numeric value shown in the tooltip.
 When searching by Card-ID you get the card and all its related cards if any.
 All cards are displayed when a blank search field is given.
 You can hit 'RETURN' at the end of input text avoiding 'Search' button.
 &#9658; Hit 'Show' to start an automatic and random Gallery Show and press it again when you want to stop the flow.
 &#9658; Mana-Colors can be included in searches by Card Names and are excluded from search by Card-ID:
 Mana-Colors' <img src="MTG White.ico" width='14' height='14'>White, <img src="MTG Blue.ico" width='14' height='14'>Blue, <img src="MTG Black.ico" width='14' height='14'>Black, <img src="MTG Red.ico" width='14' height='14'>Red, <img src="MTG Green.ico" width='14' height='14'>Green and <img src="MTG Colorless.png" width='14' height='14'>Colorless options can be used as logical 'OR' or 'AND'.
 When those options are in 'OR' it means you may search for one color 'or' another 'or' ... (e.g. red 'or' green)'.
 When the options are in 'AND' then only Mana-Colors' <img src="MTG Colorless.png" width='14' height='14'>Colorless option is logically exclusive with the others.
 So when the options are in 'AND' you may search by any exact combination of colors (except by Colorless) or just for Colorless.`;
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
 if(!myChecks.contains(event.target)){ 
  checkboxes.style.display = "none";
  expanded=false;
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

var expanded = false;
function showCheckboxes(){
 if(!expanded){
  checkboxes.style.display="block";
  expanded=true;
 } else {
   checkboxes.style.display="none";
   expanded=false;
 }
}
myColorless.addEventListener('click',function resetColors(event){resetManaColors();});

function resetManaColors(){
 if(myColorless.checked&&and_opt.checked){
  myColorWhite.checked=false;
  myColorBlue.checked=false;
  myColorBlack.checked=false; 
  myColorRed.checked=false;
  myColorGreen.checked=false;
 }
}

myColorWhite.addEventListener('click',function resetColors(event){resetColorless();});
myColorBlue.addEventListener('click',function resetColors(event){resetColorless();});
myColorBlack.addEventListener('click',function resetColors(event){resetColorless();});
myColorRed.addEventListener('click',function resetColors(event){resetColorless();});
myColorGreen.addEventListener('click',function resetColors(event){resetColorless();});

function resetColorless(){
 if(myColorless.checked&&and_opt.checked){
  myColorless.checked=false;
 }
}

function getManaColorsSelected(){
 var colors="";
 if(myColorless.checked&&and_opt.checked){
   colors="C";
 }else{
  if(myColorWhite.checked)
   colors+="W";
  if(myColorBlue.checked)
   colors+="U";
  if(myColorBlack.checked)
   colors+="B";
  if(myColorRed.checked)
   colors+="R";
  if(myColorGreen.checked)
   colors+="G";
  if(myColorless.checked)
   colors+="C";        
 }
 return colors;
}

function resetColors(){
 myColorWhite.checked=false;
 myColorBlue.checked=false;
 myColorBlack.checked=false; 
 myColorRed.checked=false;
 myColorGreen.checked=false;
 myColorless.checked=false;
}

and_opt.addEventListener('click',function resetColors(event){resetManaColors();});

function mySave(){
 try{
  var filter;
  filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
  localStorage.setItem("GalleryFilter",filter);
  localStorage.setItem("GalleryIndex",prevIx);
 }
 catch(err){console.log(err);} 
}
function myInit(){
 initVars();
 if(bxmlParsed==false){myParseCards();}
 var filter=localStorage.getItem("GalleryFilter");
 if(filter!=""&&filter!=null&&filter!="undefined"){
  input.value=filter;
 } 
 var savedPrevIx=localStorage.getItem("GalleryIndex");
 mySearch();
 if(savedPrevIx!=""&&savedPrevIx!=null&&savedPrevIx!="undefined"){
  prevIx=savedPrevIx;
  cell=tableimg.rows[0].cells[prevIx];
  selectCell(cell,'selected');
  tableimg.rows[0].cells[prevIx].scrollIntoView({behavior:"instant",inline:"start"});
 }
}

function initVars(){
 input=document.getElementById("myInput");
 tableimg=document.getElementById('myTableImg');
 totCards=document.getElementById('totalCards');
 footer_img=document.getElementById('myFooter');
}