var bxmlParsed=false;
var xmlDoc;
const xmlCards=`<Cards><C I="501" N="Angel/Spirit Gold"/><C I="502" N="Clue/Treasure"/><C I="503" N="Eldrazi Scion/Eldrazi Spawn"/><C I="504" N="Demon/Zombie"/><C I="505" N="Angel/Spirit Silver"/><C I="506" N="Angel/Spirit"/><C I="507" N="Eldrazi Scion/Eldrazi Spawn"/><C I="508" N="Angel/Spirit"/><C I="509" N="The Clue/The Treasure"/><C I="510" N="Demon/Zombie"/><C I="511" N="Mix"/><C I="512" N="Mix"/><C I="515" N="Mix"/><C I="516" N="Angel/Spirit Gold"/><C I="517" N="Demon/Zombie"/><C I="518" N="The Clue/The Treasure"/><C I="519" N="Angel/Spirit Silver"/><C I="520" N="Eldrazi Scion/Eldrazi Spawn"/></Cards>`;
const URLRoot="https://www.neurommancer.com/browse/cat7861235_959952.aspx"
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
 var nCols = 3;
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
   cell.innerHTML = "<a href='" + CardURL + "'><img src='"+ CardID +".webp' alt='" +CardID + "' style='width:192px;height:266px;border-radius:10px;' title=\"" +CardID + " " + CardNAME + "\"><font size='1'><br>" + CardNAME + "</font></a>";
  }
 }
 document.getElementById('totalCards').innerHTML = "<font size='1'>Found " + CardCnt + (CardCnt!=totXmlCards?  " of " + totXmlCards: "") + " Flip Tokens";
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
