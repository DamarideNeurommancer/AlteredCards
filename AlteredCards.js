var bSpeech;
var msgSpeech;
var input=document.getElementById("myInput");
//const table=document.getElementById('myTable');
var table=document.getElementById('myTable');
//const totalCards=document.getElementById('totalCards');
var totalCards=document.getElementById('totalCards');
//const tableimg=document.getElementById('myTableImg');
var tableimg=document.getElementById('myTableImg');
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
const and_opt=document.getElementById("and_opt");
const checkboxes=document.getElementById("checkboxes");
const myChecks=document.getElementById('myChecks');
const myColorless=document.getElementById('C');
const myColorWhite=document.getElementById('W');
const myColorBlue=document.getElementById('U');
const myColorBlack=document.getElementById('B');
const myColorRed=document.getElementById('R');
const myColorGreen=document.getElementById('G');

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
 var colors=getManaColorsSelected();
 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  var CardNAME=book.attributes[1].nodeValue;
  
  if(CardNAME.toUpperCase().indexOf(filter) > -1 || CardID==filter){
  var bGoOn=false;
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
 if(prevIx!=null)showRelated(prevIx,1);
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

function showRelated(index,mode=0){
//alert("showRelated mode: "+mode);
 var rowMaster=table.rows[index];
 var xmlindex=rowMaster.cells[3].innerText;
 if(mode==0){
  selectRow(rowMaster,'selected');
  rowMaster.scrollIntoView({behavior: "auto"});
 }
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
 
 //NEW
 if(RelatedCards!=""&&CardID>100){
  cell=row.insertCell(-1);
  cell.style.border="0";
  cell.innerHTML=`<button id='myBtnRelated' onclick='myRelated(${index})' title='Take a picture of this card with its relateds'>&#x1F4F7</button>`;
 }
 if(mode==0){
  rowMaster.scrollIntoView({behavior: "auto"});
  row.scrollTo(0,0);
 }
 //New
 mySave();
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
 var offset=-230;
 if(totRows > 0){
  switch (e.key){
   case 'ArrowUp':
    if(currRow>0){
     showRelated(currRow-1);

     rowMaster=table.rows[currRow];
     rowMaster.scrollIntoView(true,{behavior: "smooth"});
     if(currRow>=totRows-5)
      offset=-10;
     window.scrollBy(0,offset);
    }
    break;
   case 'ArrowDown':
    if(currRow<totRows){
     showRelated(currRow+1);

     rowMaster=table.rows[currRow];
     rowMaster.scrollIntoView(true,{behavior: "smooth"});
     if(currRow >= totRows-5)
      offset=-10;
     window.scrollBy(0,offset);
    }              
    break;
   case 'Home':
    showRelated(0);
    rowMaster=table.rows[0];
    rowMaster.scrollIntoView(true,{behavior: "smooth"});
    //window.scrollBy(0,-206);             
    break;
   case 'End':
    showRelated(totRows-1);
    rowMaster=table.rows[totRows-1];
    rowMaster.scrollIntoView(true,{behavior: "smooth"});
    //window.scrollBy(0,-206);            
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
 var CardID=imgtitle.substr(0,result-1).trim();
 var scryCard=imgtitle.substring(result+1);
 if(CardID >100)
  scryfall.innerHTML="<a href='https://scryfall.com/search?q=!\""+scryCard.replaceAll("'","%27").replaceAll("&","%26")+"\"' style='font-size: 12px;'><img src='Scryfall.ico' alt='Scryfall' style='width:12px;height:12px;vertical-align:middle;'> Scryfall</a>";
 else
  scryfall.innerHTML="";
  
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

function downloadImage(data,filename='untitled.png'){
 /*
 var link=document.createElement('a');
 link.href=data;
 link.download=filename;
 link.click();
 link.remove();
 */
 window.open(data);
}

async function myRelated(index){
 var rowMaster=table.rows[index];
 var xmlindex=rowMaster.cells[3].innerText;
 var book=catalog.childNodes[xmlindex];
 var CardID=book.attributes[0].nodeValue;
 var RelatedCards=book.attributes[3].nodeValue;
 if(RelatedCards=="")
  return;
 RelatedCards=CardID+";"+RelatedCards;
 if(RelatedCards[RelatedCards.length-1]==";"){
  RelatedCards=RelatedCards.substring(0,RelatedCards.length-1);
 }
 var RelatedList=RelatedCards.replace(",",";").split(";");
 var RelatedCount=RelatedList.length
 // New
 var arrayImages=[];
 for(var iRel=0;iRel<RelatedCount;iRel++){
  if(RelatedList[iRel]!= ""){
   var filename=RelatedList[iRel]+".jpg";
   arrayImages.push(filename);
  }
 }
 promiseOfAllImages(arrayImages)
  .then(async function (allImages){
    //console.log("All images are loaded!", allImages); // [Img, Img, Img]
    var dataURL=await draw(arrayImages, allImages);
    //console.log("Downloading...");
    //downloadImage(dataURL,CardID+"_Related.png");
    //downloadImage(dataURL,CardID+"_Related.jpg");
    window.location.href=dataURL;
  });
}

/*
function draw(files,images){
 const canvas=document.createElement("canvas");
 const ctx=canvas.getContext("2d");
 const w=350;
 const h=488;
                
 canvas.width=files.length*w;
 canvas.height=h;
 ctx.fillStyle="black";
 ctx.fillRect(0,0,canvas.width, canvas.height);
 var x=0;
 var y=0;
 for (var i=0; i < files.length; i++) {
   ctx.drawImage(images[i],x,y);
   x+=w;
 }
 //return (canvas.toDataURL("image/png"));
 return (canvas.toDataURL("image/jpeg"));
}
*/

function draw(files,images){
 const canvas=document.createElement("canvas");
 const ctx=canvas.getContext("2d");
 const w=350;
 const h=488;
 
 var nTotImages=files.length;
 var bExact=true;
 var nTotRow=~~(nTotImages/4);   //~~(a / b); or (a / b) >> 0;
 var modulus=nTotImages%4;
 if(modulus!=0){
  nTotRow+= 1;
  if(nTotRow>1)
   bExact=false;
 }
 var width=(nTotImages<4?nTotImages*w:4*w);
 var height=h*nTotRow;
                
 canvas.width=width; //files.length*w;
 canvas.height=height; //h;
 //ctx.globalAlpha=0; //png
 ctx.fillStyle="black";
 //ctx.fillStyle="transparent"; //png
 ctx.fillRect(0,0,canvas.width, canvas.height);
 //ctx.globalAlpha=1; //png
 var row=0;
 var col=0;
 var Xoffset=0;
 var Yoffset=0;
 var nSpace=0;
 for(var i=0;i<files.length;i++){
  row=~~(i/4);
  col=i%4;
  if(bExact==false&&row==nTotRow-1){
   switch(modulus){
    case 1:
     nSpace=w*1.5;
     break;
    case 2:
     nSpace=w;
     break;
    case 3:
     nSpace=w/2;
     break;
   }
   Xoffset=col*w+nSpace;
  }
  else{
   Xoffset=col*w;
  }
  Yoffset=row*h;
  
  ctx.save();
  // use lineTo and BezierTo here to make the path you want, which is a rectangle the size of the image with two rounded corners.
  //               x,y,width,height,radius
  roundedImage(ctx,Xoffset,Yoffset,w,h,20);
  ctx.clip(); 
  ctx.drawImage(images[i],Xoffset,Yoffset);
  ctx.restore(); // so clipping path won't affect anything else drawn afterwards
 }
 //return (canvas.toDataURL("image/png")); //png
 return (canvas.toDataURL("image/jpeg"));
}

var promiseOfAllImages = function (arrayImages){
  // Wait until ALL images are loaded
  return Promise.all(
    arrayImages.map(function (t){
      // Load each tile, and "resolve" when done
      return new Promise(function (resolve){
        var img=new Image();
        img.src=t; //"tiles/" + t + ".png";
        img.onload = function(){
          // Image has loaded... resolve the promise!
          resolve(img);
        };
      });
    })
  );
};

function mySave(){
 try{
  var filter;
  filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
  localStorage.setItem("ListFilter",filter);
  localStorage.setItem("ListIndex",prevIx);
 }
 catch(err){console.log(err);} 
}

function myInit(){
 initVars();
 if(bxmlParsed==false){myParseCardsEx();}
 var filter=localStorage.getItem("ListFilter");
 if(filter!=""&&filter!=null&&filter!="undefined"){
  input.value=filter;
 }
 var savedPrevIx=localStorage.getItem("ListIndex");
 mySearch();
 if(savedPrevIx!=""&&savedPrevIx!=null&&savedPrevIx!="undefined"){
  prevIx=savedPrevIx;
  var totRows=table.rows.length;
  if(totRows > 0){
   showRelated(prevIx);
   table.rows[prevIx].scrollIntoView(true,{behavior:"smooth"});
   window.scrollBy(0,-240);
  }
 }
}

function initVars(){
 table=document.getElementById('myTable');
 tableimg=document.getElementById('myTableImg');
 totalCards=document.getElementById('totalCards');
}

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