var bxmlParsed=false;
var xmlDoc;
var bMobile=false;
const xmlCards=`<Cards><C I="1" N="Mothman"/></Cards>`;
const URLRoot="https://www.neurommancer.com/browse/cat7861235_794233.aspx";
const table=document.getElementById('myTable');
const totalCards=document.getElementById('totalCards');
const modal=document.getElementById('myModal');
const modalImg=document.getElementById("img01");
const caption_md=document.getElementById("caption_md");
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
var bMobile=false;
var imgW=192;
var imgH=240;
const lazyLimit=12;
isMobile();
function myParseCards(){
 var parser=new DOMParser();
 xmlDoc=parser.parseFromString(xmlCards,"text/xml");
 bxmlParsed=true;
}

function mySearch(){
 var input,filter;
 if(bxmlParsed==false){myParseCards();} 
 input=document.getElementById("myInput");
 filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
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
   cell.innerHTML="<img src='px"+CardID+".webp' alt='"+CardID+"' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;cursor:zoom-in;' title=\""+CardID+" "+CardNAME+"\""+(CardCnt>lazyLimit?" loading='lazy'":"")+"><font size='1'><br><a href='"+CardURL+"'>"+CardNAME+"</font></a>";
   cell.addEventListener('click',function(){
   myPopup(this);
   });
  }
 }
 totalCards.innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" Proxy Cards";
 window.scrollTo(0,0);
}

function myHelp(){
 var sHelp="Search by Card-Name or Card-ID.\nCard-ID is a numeric value shown in the tooltip.\nAll cards are displayed when a blank search field is given.\nYou can hit 'RETURN' at the end of input text avoiding 'Search' button.\nClick on a card to zoom in.";
 try{
  Swal.fire({
   title: "<span style='color:Black'>"+"DamarideNeurommancer",
   html: "<span style='color:Black'><b>"+sHelp.replaceAll('\n','<br>')+"</b>",
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{
  alert(sHelp);
 }
}

window.onscroll=function(){myFunction()};
var header=document.getElementById('myHeader');
var sticky=header.offsetTop;
function myFunction(){
 if(window.pageYOffset>sticky){
   header.classList.add('sticky');
 }else{
  header.classList.remove('sticky');
 }
}

function myPopup(x){
 var img=x.querySelector('img').getAttribute('src');
 var imgtitle=x.querySelector('img').getAttribute('title'); 
 var url=URLRoot;
 modal.style.display="block";
 modalImg.src=img;
 modalImg.alt=imgtitle;
 caption_md.innerHTML="<a href='"+url+"' style='font-size: 16px;'>"+modalImg.alt+"</a>";
}

var span=document.getElementsByClassName("close")[0];
span.onclick=function(){ 
 modal.style.display="none";
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
 if(!main.contains(event.target)){closeNav();}
});
function isMobile()
{
 bMobile=(window.orientation!=null&&window.orientation!="undefined");
 if(bMobile){
  imgW=(document.documentElement.clientWidth/2)-8;
  if(imgW>192){
   imgW=192;
   imgH=240;
  }
  else
   imgH=Math.round(imgW*1.38);
 }
}