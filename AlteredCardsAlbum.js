const and_opt=document.getElementById("and_opt");
const checkboxes=document.getElementById("checkboxes");
const myChecks=document.getElementById('myChecks');
const myColorless=document.getElementById('C');
const myColorWhite=document.getElementById('W');
const myColorBlue=document.getElementById('U');
const myColorBlack=document.getElementById('B');
const myColorRed=document.getElementById('R');
const myColorGreen=document.getElementById('G');
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const table=document.getElementById('myTable');
const totCards=document.getElementById('totalCards');
const myCols=document.getElementById('myColumns');
const header=document.getElementById('myHeader');
const myChkApp=document.getElementById('myChkAppend');
const myTree=document.getElementById('myTree');
const myView=document.getElementById('myView');
var imgW=192;
var imgH=266;
var bMobile=false;
isMobile();

function mySearch(MaxColumns){
 if(MaxColumns===null||MaxColumns==undefined||MaxColumns==="undefined"){
  if(myCols.value===""){
   if(!bMobile)
    MaxColumns=6;
   else
    MaxColumns=2;
   myCols.value=MaxColumns;
  }
  else
   MaxColumns=myCols.value;
 } 
 if(!myView.checked)
  gridSearch(MaxColumns);
 else
   treeSearch(MaxColumns);   
}
function gridSearch(MaxColumns){
 if(MaxColumns<=0)
  return;
 var input,filter,bIsCardID;
 input=document.getElementById("myInput");
 filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
 bIsCardID=false;
 var numCardID=parseInt(filter);
 if(Number.isInteger(numCardID))
  bIsCardID=true;
 if(bxmlParsed==false){myParseCards();}
 myTree.innerHTML="";
 table.innerHTML="";
 var CardCnt=0;
 var nCols=6;
 if(MaxColumns>0)
  nCols=MaxColumns;
 else
  nCols=myCols.value;

 var colors=getManaColorsSelected();
 var row,cell;
 var lazyLimit=nCols*6;
 for (var i=0;i<totXmlCards;i++){
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
   var CardURL=(CardID>100?URLRoot:"")+book.attributes[2].nodeValue;
   CardCnt++;
   if((CardCnt % nCols==1) || nCols==1)
    row=table.insertRow(-1);
   else
    row=table.rows[table.rows.length-1];

   cell=row.insertCell(-1);
   //cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(CardID>100?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(CardID>100?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\""+(CardCnt>lazyLimit?" loading='lazy'":"")+"><font size='1'><br>"+CardNAME+"</font></a>";
   if(bIsCardID==true){
    var RelatedCards=book.attributes[3].nodeValue;
    if(RelatedCards!=""){
     if(RelatedCards[RelatedCards.length-1]==";"){
      RelatedCards=RelatedCards.substring(0,RelatedCards.length-1);
     }
     var RelatedList=RelatedCards.replace(",",";").split(";");
     var RelatedCount=RelatedList.length;
     var RelatedCnt=1;
     for(var iRel=0;iRel<RelatedCount;iRel++){
      if(RelatedList[iRel]!=""){
       CardCnt++;
       if((CardCnt % nCols==1) || nCols==1)
        row=table.insertRow(-1);
       else
        row=table.rows[table.rows.length-1];

       mySearchCardID(RelatedList[iRel],row,nCols,CardCnt,lazyLimit);
      }
     }
    }
    break;
   }
  }
 }
 totCards.innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" cards in AlterSleeves";
 window.scrollTo(0,0);
}

function mySearchCardID(Look4CardID,lastRow,nCols,idx,lazyLimit){
 var cnt=0;
 for (var i=0;i<catalog.childElementCount;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  if(CardID===Look4CardID){
   var CardNAME=book.attributes[1].nodeValue;
   var CardURL=URLRoot+book.attributes[2].nodeValue;
   var cell=lastRow.insertCell(-1);
   cnt++;
   //cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+".jpg' alt='"+CardID+"' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+".jpg' alt='"+CardID+"' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\""+(idx+cnt>lazyLimit?" loading='lazy'":"")+"><font size='1'><br>"+CardNAME+"</font></a>";    
   break;
  }
 }
}

function myHelp(){
 var sHelp=`Search by Card-Name (and by Mana-Colors) or Card-ID.
 &#9658; Card-ID is a numeric value shown in the tooltip.
 When searching by Card-ID you get the card and all its related cards if any.
 All cards are displayed when a blank search field is given.
 You can hit 'RETURN' at the end of input text avoiding 'Search' button.
 Default and max value for 'columns per row' is 6, changing that value relaunches the search.
 &#9658; Switch views between gridview and treeview with checkbox 'Tree'.
 &#9658; Mana-Colors can be included in searches by Card Names and are excluded from search by Card-ID:
 Mana-Colors' <img src="MTG White.ico" width='14' height='14'>White, <img src="MTG Blue.ico" width='14' height='14'>Blue, <img src="MTG Black.ico" width='14' height='14'>Black, <img src="MTG Red.ico" width='14' height='14'>Red, <img src="MTG Green.ico" width='14' height='14'>Green and <img src="MTG Colorless.png" width='14' height='14'>Colorless options can be used as logical 'OR' or 'AND'.
 When those options are in 'OR' it means you may search for one color 'or' another 'or' ... (e.g. red 'or' green)'.
 When the options are in 'AND' then only Mana-Colors' <img src="MTG Colorless.png" width='14' height='14'>Colorless option is logically exclusive with the others.
 So when the options are in 'AND' you may search by any exact combination of colors (except by Colorless) or just for Colorless.    
 &#9658; In the sidebar menu there are also entries for:
 <ul style="background-color:black;"><li><a href="index_Match.html"><img src="match-icon.webp" width='12' height='12'>Match Game</a></li>
 <li><a href="index_Guess.html"><img src="guess-icon.webp" width='12' height='12' style='background-color:red'>Guess Game</a></li>
 <li><a href="index_Tarots.html"><img src="./tarots/Back2.webp" width='12' height='12'>Tarots Reading</a></li>
 <li><a href="index_Misc.html" title="Miscellanea: DNA/AminoAcids/GeoPosition" style="font-size:14px">&#x1F9EC;Miscellanea</a></li></ul>`;
 sHelp+="\nTotal Cards: "+totXmlCards;
 try{
  Swal.fire({
   title: "<span><a href='https://www.altersleeves.com/browse/?browse_type=by&artist_id=16'><img src='dada_logo.jpg' alt='' width='80' height='104' title='Alters by DamarideNeurommancer' style='border-radius:6px;align:center;'/></a></span>",
   html: "<span style='color:Black'><b>"+sHelp.replaceAll('\n','<br>')+"</b></span>",
   confirmButtonColor: "Black",
   padding: 1,
   position: 'top-left',
  })
 }
 catch{
  alert(sHelp);
 }
}

function columnsValueChange(){
 /*if(myCols.value.length > 1){
  myCols.value=myCols.value.slice(0,1); 
 }*/
 mySearch(myCols.value);
}

function getRndInt(max){
 return (Math.floor(Math.random() * max)+1);
}

function myRndSearch(){
 if(bxmlParsed==false){myParseCards();}
 myTree.innerHTML="";
 myView.checked=false;
 var rndCard=getRndInt(totXmlCards);

 var bAppendResult=myChkApp.checked;
 var CardCnt=0;
 var totRows=0;
 var totaleCards=0;
 if(bAppendResult==false)
  table.innerHTML="";
 else{
  if(table.innerHTML!=""){
   totRows=table.rows.length;
   for (var i=0; i<totRows; i++){
    totaleCards+=table.rows[i].cells.length;
   }
   CardCnt=table.rows[totRows-1].cells.length;
  }
 }
 totCards.innerHTML="<font size='1'>Found "+(totaleCards+1)+" of "+totXmlCards+" cards in AlterSleeves";
 
 var nCols=myCols.value;
 var book=catalog.childNodes[rndCard];
 var CardID=book.attributes[0].nodeValue;
 var CardNAME=book.attributes[1].nodeValue;
 var CardURL=(CardID>100?URLRoot:"")+book.attributes[2].nodeValue;
 var row,cell;
 CardCnt++;
 if((CardCnt % nCols==1) || nCols==1)
  row=table.insertRow(-1);
 else
  row=table.rows[totRows-1];

 cell=row.insertCell(-1);
 cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(CardID>100?".jpg":".webp")+"' alt='"+CardID + "' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
  
 if(bAppendResult==true)
  row.scrollIntoView({behavior: "smooth"});
}

window.onscroll=function(){myFunction()};
var sticky=header.offsetTop;
function myFunction(){
 if(window.pageYOffset>sticky){
  header.classList.add('sticky');
 } else{
   header.classList.remove('sticky');
 }
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
 if(!myChecks.contains(event.target)){ 
  checkboxes.style.display = "none";
  expanded=false;
 }
});

function treeClick(){
 if(myTree.innerHTML=="")
  return;
 var toggler=document.getElementsByClassName('caret');
 for(var i=0,len=toggler.length;i<len;i++){
  toggler[i].addEventListener('click',function(){
   this.parentElement.querySelector('.nested').classList.toggle('active');
   this.classList.toggle('caret-down');
  });
 }
}
function expandAll(){
 if(myTree.innerHTML=="")
  return;
 var toggler=document.getElementsByClassName('caret');
 for(var i=0,len=toggler.length;i<len;i++){
  if(toggler[i].className!=""&&toggler[i].className=="caret"){
   toggler[i].click();
  }
 }
}
function collapseAll(){
 if(myTree.innerHTML=="")
  return;
 var toggler=document.getElementsByClassName('caret');
 for(var i=0,len=toggler.length;i<len;i++){
  if(toggler[i].className!=""&&toggler[i].className=="caret caret-down"){
   toggler[i].click();
  }
 }
}
function getCardByID(inputCardID){
 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  if(CardID==inputCardID){
   return book;
  } 
 }
}
function chooseView(){
 mySearch(myCols.value);
}

function treeSearch(MaxColumns){
 var input,filter,bIsCardID;
 input=document.getElementById("myInput");
 filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
 if(filter==""&&bMobile){
  myView.checked=false;
  return(gridSearch(MaxColumns));
 } 
 bIsCardID=false;
 var numCardID=parseInt(filter);
 if(Number.isInteger(numCardID))
  bIsCardID=true;
 if(bxmlParsed==false){myParseCards();}
 table.innerHTML="";
 myTree.innerHTML="";
 myTree.style.backgroundImage="";
 var buf=[];
 buf.push(`<input type="radio" name="node" id="expand" checked="checked" value="0" onclick="expandAll()"/><font size='2' color='White'><small><label for="expand">Expand All</label></small></font><input type="radio" name="node" id="collapse" value="1" onclick="collapseAll()"/><font size='2' color='White'><small><label for="collapse">Collapse All</label></small></font>`);
 buf.push('<ul id="myUL"><li><span class="caret">Altered Cards</span><ul class="nested">');
 var CardCnt=0;
 var RelatedCnt=0;

 var colors=getManaColorsSelected();
 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  var CardNAME=book.attributes[1].nodeValue; 
  if(CardNAME.toUpperCase().indexOf(filter) > -1 || CardID==filter){
   //
   var bGoOn=false;
   var cntOccurs=0;
   if(!bIsCardID&&colors!=""){
     var ManaColors=book.attributes[4].nodeValue;
     if(ManaColors=='C' && colors=='C')
      bGoOn=true;
    else{
     //if(colors!='C'){
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
      if(and_opt.checked&&cntOccurs==colors.length)
       bGoOn=true; 
     //}
    }   
   }
   else
    bGoOn=true;
    
   if(bGoOn==false)
    continue;
   //
   var CardURL=(CardID>100?URLRoot:"")+book.attributes[2].nodeValue;
   var RelatedCards=book.attributes[3].nodeValue;
   CardCnt++;
   
   var fileName=CardID+(CardID>100?".jpg":".webp");
   
   var href="<a href='"+CardURL+"'><img src='"+fileName+"' alt='"+CardID+"' style='width:40px;height:52px;border-radius:2px;' title=\""+CardID+" "+CardNAME+"\"></a>";
   var mouse="";
   if(!bMobile)
    mouse=`onmouseover="showImage(event, '${fileName}')" onmouseout="hideImage()"`;
   if(RelatedCards!="")
    buf.push('<li '+mouse+'><span class="caret">'+href+' '+CardID+' \"'+CardNAME+'\"</span>');
   else
    buf.push('<li '+mouse+'><span class="simple">'+href+' '+CardID+' \"'+CardNAME+'\"</span></li>');

   if(RelatedCards!=""){
    if(RelatedCards.endsWith(";"))
     RelatedCards=RelatedCards.substring(0,RelatedCards.length-1);
    var relatedIDList=RelatedCards.split(';');
    buf.push('<ul class="nested">');
    for(var iRel=0,len=relatedIDList.length;iRel<len;iRel++){
     var bookRel=getCardByID(relatedIDList[iRel]);
     RelatedCnt++;
     var CardIDRel=bookRel.attributes[0].nodeValue;
     var CardNAMERel=bookRel.attributes[1].nodeValue;
     var CardURLRel=(CardIDRel>100?URLRoot:"")+bookRel.attributes[2].nodeValue;
     var fileNameRel=CardIDRel+(CardIDRel>100?".jpg":".webp");
     var mouseRel="";
     if(!bMobile)
      mouseRel=`onmouseover="showImage(event, '${fileNameRel}')" onmouseout="hideImage()"`;
     var href="<a href='"+CardURLRel+"'><img src='"+fileNameRel+"' alt='"+CardIDRel+"' style='width:40px;height:52px;border-radius:2px;' title=\""+CardIDRel+" "+CardNAMERel+"\"></a>";
     
     buf.push('<li '+mouseRel+' class="simple">'+href+" "+CardIDRel+" \""+CardNAMERel+"\"</li>");
    }
    buf.push("</ul>");
   }
   if(RelatedCards!="")
    buf.push("</li>");
   if(bIsCardID==true)
    break; 
  }
 }
 buf.push("</ul></li></ul><div></div");
 totCards.innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" cards in AlterSleeves"+(RelatedCnt>0?" ("+RelatedCnt+" related)":"");
 if(CardCnt>0){
  myTree.innerHTML=buf.join('');
  myTree.style.fontSize=!bMobile?"16px":"12px";
  treeClick();
  buf=[];
  expandAll();
  if(!bMobile){
   myTree.style.backgroundAttachment="fixed";
   myTree.style.backgroundRepeat="no-repeat";
   //myTree.style.backgroundPosition="center center";
   myTree.style.backgroundPositionX="400px";
   myTree.style.backgroundPositionY="210px";
  }
 }
 window.scrollTo(0,0);
}
function isMobile(){
 bMobile=(window.orientation!=null&&window.orientation!="undefined");
 if(bMobile){
  imgW=(document.documentElement.clientWidth/2)-8;
  if(imgW>192){
   imgW=192;
   imgH=266;
  }
  else
   imgH=Math.round(imgW*1.38);
 }
}
function inputValueChange(){
 if(bMobile){
  var input=document.getElementById("myInput");
  var filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim();
  var lb=document.getElementById("lb1");
  if(filter==""){
   myView.style.visibility="hidden";
   lb.style.visibility="hidden";
  }
  else{
   myView.style.visibility="visible";
   lb.style.visibility="visible";
  }
 } 
}

function showImage(e,imgSrc){
 if (!e) var e = window.event;
 e.cancelBubble = true;
 if (e.stopPropagation) e.stopPropagation();
 myTree.style.backgroundImage="url('"+imgSrc+"')";
}
function hideImage(){
 myTree.style.backgroundImage="";
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
