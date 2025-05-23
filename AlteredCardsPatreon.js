var bxmlParsed=false;
var xmlDoc;
const xmlCards=`<Cards><C I="1016" N="Emry, Lurker of the Loch"/><C I="1015" N="Crypt Ghast"/><C I="1014" N="Crypt Ghast"/><C I="1013" N="Crypt Ghast"/><C I="1012" N="Crypt Ghast"/><C I="1011" N="Crypt Ghast"/><C I="1010" N="Maha, Its Feathers Night"/><C I="1009" N="Force of will"/><C I="1006" N="Solemn Simulacrum"/><C I="1005" N="Solemn Simulacrum"/><C I="1004" N="Solemn Simulacrum"/><C I="1003" N="Solemn Simulacrum"/><C I="1002" N="Solemn Simulacrum"/><C I="1001" N="Sensei's Dinining Top"/><C I="1000" N="Jeweled Lotus"/><C I="1007" N="Yedora, Grave Gardener"/><C I="1008" N="Yedora, Grave Gardener"/><C I="369412" N="Elesh Norn, Mother of Machines"/><C I="369414" N="Elesh Norn, Mother of Machines"/><C I="367358" N="Elesh Norn, Mother of Machines"/></Cards>`;
const URLRoot="https://www.patreon.com/DamarideNeurommancer";
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
var bMobile=false;
var imgW=192;
var imgH=266;
isMobile();
function myParseCards(){
 var parser=new DOMParser();
 xmlDoc=parser.parseFromString(xmlCards,"text/xml");
 bxmlParsed=true;
}

function mySearch(){
 var filter="";
 if(bxmlParsed==false){
   myParseCards();
 }
 var table=document.getElementById('myTable');
 table.innerHTML="";
 var CardCnt=0;
 var catalog=xmlDoc.getElementsByTagName('Cards')[0];
 var totXmlCards=catalog.childElementCount;
 var nCols=(bMobile?2:3);
 var row,cell;
 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  var CardNAME=book.attributes[1].nodeValue;
  if(CardNAME.toUpperCase().indexOf(filter) > -1 || CardID==filter){
   var CardURL=URLRoot;
   CardCnt++;
   if((CardCnt % nCols==1) || nCols==1)
    row=table.insertRow(-1);
   else
    row=table.rows[table.rows.length-1];

   cell=row.insertCell(-1);
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+".jpg' alt='"+CardID+"' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
  }
 }
 document.getElementById('totalCards').innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" Patreon Cards in AlterSleeves";
 window.scrollTo(0,0);
}

window.onscroll=function(){myFunction()};
var header=document.getElementById('myHeader');
var sticky=header.offsetTop;
function myFunction(){
 if(window.pageYOffset>sticky){
   header.classList.add('sticky');
 } else {
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
function isMobile()
{
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