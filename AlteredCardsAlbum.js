var bxmlParsed=false;
var xmlDoc;
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const table=document.getElementById('myTable');
const totCards=document.getElementById('totalCards');
const myCols=document.getElementById('myColumns');
const header=document.getElementById('myHeader');
const myChkApp=document.getElementById('myChkAppend');
function myParseCards(){
 var parser=new DOMParser();
 xmlDoc=parser.parseFromString(xmlCards,"text/xml");
 bxmlParsed=true;
}

function mySearch(MaxColumns){
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
 var CardCnt=0;
 var catalog=xmlDoc.getElementsByTagName('Cards')[0];
 var totXmlCards=catalog.childElementCount;
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
 var catalog=xmlDoc.getElementsByTagName('Cards')[0];
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
 var sHelp="Search by Card-Name or Card-ID.\nCard-ID is a numeric value shown in the tooltip.\nWhen searching by Card-ID you get the card and all its related cards if any.\nAll cards are displayed when a blank search field is given.\nYou can hit 'RETURN' at the end of input text avoiding 'Search' button.\nDefault and max value for 'columns per row' is 6, changing that value relaunches the search.";
 sHelp+="\nCards: "+xmlDoc.getElementsByTagName('Cards')[0].childElementCount;
 try{
  Swal.fire({
   title: "<span style='color:Black'>"+"DamarideNeurommancer",
   html: "<span style='color:Black'><b>"+sHelp.replaceAll('\n','<br>')+ "</b>",
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
 var catalog=xmlDoc.getElementsByTagName('Cards')[0];
 var totXmlCards=catalog.childElementCount;
 var rndCard=getRndInt(totXmlCards);

 var bAppendResult=myChkApp.checked;
 var CardCnt=0;
 var totRows=0;
 var totaleCards=0;
 if(bAppendResult==false)
  table.innerHTML="";
 else{
  totRows=table.rows.length;
  for (var i=0; i<totRows; i++){
   totaleCards+=table.rows[i].cells.length;
  }
  CardCnt=table.rows[totRows-1].cells.length;
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