var bxmlParsed=false;
var xmlDoc;
const xmlCards=`<Cards><C I="10" N="Canticle Of Rot" U="canticle-of-rot"/><C I="6" N="Foreteller's Delight" U="foretellers-delight"/><C I="7" N="Multiplicatio" U="multiplicatio"/><C I="1" N="The lighthouse" U="the-lighthouse"/><C I="5" N="Him that slept beneath" U="him-that-slept-beneath"/><C I="2" N="Observer" U="observer"/><C I="3" N="Kosmos" U="kosmos"/><C I="9" N="Archon Of Woe" U="archon-of-woe"/><C I="4" N="Medusa" U="medusa"/><C I="8" N="GraveyardGang" U="https://www.mythicgaming.com/product/playmat-graveyardgang"/></Cards>`;
const URLRoot="https://inkmats.com/products/"; //https://inkmats.com/collections/damaride-neurommancer?_pos=1&_psq=damaride&_ss=e&_v=1.0";
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
var bMobile=false;
var imgH=228;
var imgW=384;
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
 var nCols=(bMobile?1:3);
 var row,cell;
 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  var CardNAME=book.attributes[1].nodeValue;
  var CardURL=(CardID!=8?URLRoot:"")+book.attributes[2].nodeValue; 
   CardCnt++;
   if((CardCnt % nCols==1) || nCols==1)
    row=table.insertRow(-1);
   else
    row=table.rows[table.rows.length-1];

   cell=row.insertCell(-1);
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+".webp' alt='"+CardID+"' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
 }
 document.getElementById('totalCards').innerHTML="<font size='1'>Found "+CardCnt+" Playmats";
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
  imgW=(document.documentElement.clientWidth)-8;
  if(imgW>384){
   imgW=384;
   imgH=228;
  }
  else
   imgH=Math.round(imgW/1.68);
 }
}