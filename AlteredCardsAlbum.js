var bxmlParsed=false;
var xmlDoc,catalog,totXmlCards;
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const table=document.getElementById('myTable');
const totCards=document.getElementById('totalCards');
const myCols=document.getElementById('myColumns');
const header=document.getElementById('myHeader');
const myChkApp=document.getElementById('myChkAppend');
const myTree=document.getElementById('myTree');
const myView=document.getElementById('myView');
function myParseCards(){
 var parser=new DOMParser();
 xmlDoc=parser.parseFromString(xmlCards,"text/xml");
 catalog=xmlDoc.getElementsByTagName('Cards')[0];
 totXmlCards=catalog.childElementCount;
 bxmlParsed=true;
}

function mySearch(MaxColumns){
 if(!myView.checked)
  gridSearch(MaxColumns);
 else
 treeSearch(); 
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
 if(bxmlParsed==false){
   myParseCards();
 }
 myTree.innerHTML="";
 table.innerHTML="";
 var CardCnt=0;
 var nCols=6;
 if(MaxColumns>0)
  nCols=MaxColumns;
 else
  nCols=myCols.value;

 var row,cell;
 for (var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  var CardNAME=book.attributes[1].nodeValue;
  if(CardNAME.toUpperCase().indexOf(filter) > -1 || CardID==filter){
   var CardURL=(CardID>100?URLRoot:"")+book.attributes[2].nodeValue;
   CardCnt++;
   if((CardCnt % nCols==1) || nCols==1)
    row=table.insertRow(-1);
   else
    row=table.rows[table.rows.length-1];

   cell=row.insertCell(-1);
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(CardID>100?".jpg":".webp")+"' alt='"+CardID+"' style='width:192px;height:266px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
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

       mySearchCardID(RelatedList[iRel],row);
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

function mySearchCardID(Look4CardID,lastRow){
 for (var i=0; i < catalog.childElementCount; i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  if(CardID===Look4CardID){
   var CardNAME=book.attributes[1].nodeValue;
   var CardURL=URLRoot+book.attributes[2].nodeValue;
   var cell=lastRow.insertCell(-1);
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+".jpg' alt='"+CardID+"' style='width:192px;height:266px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";    
   break;
  }
 }
}

function myHelp(){
 var sHelp="Search by Card-Name or Card-ID.\nCard-ID is a numeric value shown in the tooltip.\nWhen searching by Card-ID you get the card and all its related cards if any.\nAll cards are displayed when a blank search field is given.\nYou can hit 'RETURN' at the end of input text avoiding 'Search' button.\nDefault and max value for 'columns per row' is 6, changing that value relaunches the search.\nSwitch view between gridview and treeview with checkbox 'Tree'.";
 sHelp+="\nCards: "+xmlDoc.getElementsByTagName('Cards')[0].childElementCount;
 try{
  Swal.fire({
   title: "<span><a href='https://www.altersleeves.com/browse/?browse_type=by&artist_id=16'><img src='dada_logo.jpg' alt='' width='80' height='104' title='Alters by DamarideNeurommancer' style='border-radius:6px;align:center;'/></a></span>",
   html: "<span style='color:Black'><b>"+sHelp.replaceAll('\n','<br>')+"</b></span>",
   confirmButtonColor: "Black",
   padding: 1,
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
 if(bxmlParsed==false){
   myParseCards();
 }
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
 cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(CardID>100?".jpg":".webp")+"' alt='"+CardID + "' style='width:192px;height:266px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
  
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
});


function treeSearch(){
 var input,filter,bIsCardID;
 input=document.getElementById("myInput");
 filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
 bIsCardID=false;
 var numCardID=parseInt(filter);
 if(Number.isInteger(numCardID))
  bIsCardID=true;
 if(bxmlParsed==false){
   myParseCards();
 }
 table.innerHTML="";
 myTree.innerHTML="";
 var buf=`<input type="radio" name="node" id="expand" checked="checked" value="0" onclick="expandAll()"/><font size='2' color='White'><small><label for="expand">Expand All</label></small></font><input type="radio" name="node" id="collapse" value="1" onclick="collapseAll()"/><font size='2' color='White'><small><label for="collapse">Collapse All</label></small></font>`;
 buf+='<ul id="myUL"><li><span class="caret">Altered Cards</span><ul class="nested">';
 var CardCnt=0;

 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  var CardNAME=book.attributes[1].nodeValue; 
  if(CardNAME.toUpperCase().indexOf(filter) > -1 || CardID==filter){
   var CardURL=(CardID>100?URLRoot:"")+book.attributes[2].nodeValue;
   var RelatedCards=book.attributes[3].nodeValue;
   CardCnt++;
   
   var href="<a href='"+CardURL+"'><img src='"+CardID+(CardID>100?".jpg":".webp")+"' alt='"+CardID+"' style='width:40px;height:52px;border-radius:2px;' title=\""+CardID+" "+CardNAME+"\"></a>";
   if(RelatedCards!="")
    buf+=('<li><span class="caret">'+href+' '+CardID+' \"'+CardNAME+'\"</span>');
   else
    buf+=('<li><span class="simple">'+href+' '+CardID+' \"'+CardNAME+'\"</span></li>');

   if(RelatedCards!=""){
    if(RelatedCards.endsWith(";"))
     RelatedCards=RelatedCards.substring(0,RelatedCards.length-1);
    var relatedIDList=RelatedCards.split(';');
    buf+=('<ul class="nested">');
    for(var iRel=0;iRel<relatedIDList.length;iRel++){
     var bookRel=getCardByID(relatedIDList[iRel]);
     //CardCnt++;
     var CardIDRel=bookRel.attributes[0].nodeValue;
     var CardNAMERel=bookRel.attributes[1].nodeValue;
     var CardURLRel=(CardIDRel>100?URLRoot:"")+bookRel.attributes[2].nodeValue;
     var href="<a href='"+CardURLRel+"'><img src='"+CardIDRel+(CardIDRel>100?".jpg":".webp")+"' alt='"+CardIDRel+"' style='width:40px;height:52px;border-radius:2px;' title=\""+CardIDRel+" "+CardNAMERel+"\"></a>";
     buf+=('<li class="simple">');
     buf+=(href+" "+CardIDRel+" \""+CardNAMERel+"\"");
     buf+=("</li>");
    }
    buf+=("</ul>");
   }
   if(RelatedCards!="")
    buf+=("</li>");
   if(bIsCardID==true)
    break; 
  }
 }
 buf+=("</ul></li></ul><div></div");
 myTree.innerHTML=buf;
 myTree.style.fontSize="16px";
 treeClick();
 totCards.innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" cards in AlterSleeves";
 expandAll();
 window.scrollTo(0,0);
}

function treeClick(){
 if(myTree.innerHTML=="")
  return;
 var toggler=document.getElementsByClassName('caret');
 for(var i=0;i<toggler.length;i++){
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
 for(var i=0;i<toggler.length;i++){
  if(toggler[i].className!=""&&toggler[i].className=="caret"){
   toggler[i].click();
  }
 }
}
function collapseAll(){
 if(myTree.innerHTML=="")
  return;
 var toggler=document.getElementsByClassName('caret');
 for(var i=0;i<toggler.length;i++){
  if(toggler[i].className!=""&&toggler[i].className=="caret caret-down"){
   toggler[i].click();
  }
 }
}
function getCardByID(inputCardID){
 for (var i=0;i<totXmlCards;i++){
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