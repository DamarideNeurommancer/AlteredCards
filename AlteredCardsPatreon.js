var bxmlParsed = false;
var xmlDoc;
const xmlCards=`<Cards><C I="367358" N="Elesh Norn, Mother of Machines"/><C I="369414" N="Elesh Norn, Mother of Machines"/><C I="369412" N="Elesh Norn, Mother of Machines"/></Cards>`;
const URLRoot="https://www.patreon.com/DamarideNeurommancer";
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
function myParseCards(){
 var parser = new DOMParser();
 xmlDoc = parser.parseFromString(xmlCards,"text/xml");
 bxmlParsed = true;
}

function mySearch(){
 var filter="";
 if( bxmlParsed == false){
   myParseCards();
 }
 var table = document.getElementById('myTable');
 table.innerHTML = "";
 var CardCnt = 0;
 var catalog = xmlDoc.getElementsByTagName('Cards')[0];
 var totXmlCards = catalog.childElementCount;
 var nCols = 6;
 var row, cell;
 for (var i = 0; i < totXmlCards; i++){
  var book = catalog.childNodes[i];
  var CardID = book.attributes[0].nodeValue;
  var CardNAME = book.attributes[1].nodeValue;
  if (CardNAME.toUpperCase().indexOf(filter) > -1 || CardID == filter){
   var CardURL = URLRoot;
   CardCnt++;
   if ((CardCnt % nCols == 1) || nCols == 1)
    row = table.insertRow(-1);
   else
    row = table.rows[table.rows.length-1];

   cell = row.insertCell(-1);
   cell.innerHTML = "<a href='" + CardURL + "'><img src='"+ CardID +".jpg' alt='" +CardID + "' style='width:192px;height:266px;border-radius:10px;' title=\"" +CardID + " " + CardNAME + "\"><font size='1'><br>" + CardNAME + "</font></a>";
  }
 }
 document.getElementById('totalCards').innerHTML = "<font size='1'>Found " + CardCnt + (CardCnt!=totXmlCards?  " of " + totXmlCards: "") + " Patreon Cards in AlterSleeves";
 window.scrollTo(0, 0);
}

window.onscroll = function(){myFunction()};
var header = document.getElementById('myHeader');
var sticky = header.offsetTop;
function myFunction(){
 if (window.pageYOffset > sticky) {
   header.classList.add('sticky');
 } else {
   header.classList.remove('sticky');
 }
}

function openNav(){
 sideBar.style.width = "180px";
 main.style.marginLeft = "180px";
}

function closeNav(){
 sideBar.style.width = "0";
 main.style.marginLeft = "0";
}

document.addEventListener('click', function handleClickOutside(event){
 if(!main.contains(event.target)){
  closeNav();
 }
});