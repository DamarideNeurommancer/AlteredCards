var rndCard=-1;
const canvas=document.getElementById('mycanvas');
const context=canvas.getContext('2d');
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const header=document.getElementById('myHeader');
const modalImg=document.getElementById("img01");
const captionText=document.getElementById("caption");
const resultText=document.getElementById("result");
const c=document.getElementById("mycanvas");
const modal=document.getElementById('myModal');
const captionModal=document.getElementById('caption-modal');
const modalPopupImg=document.getElementById("img02");
const scryfall=document.getElementById("scryfall");
const originalImage=new Image();
var CardURL="";

function mySearch(){
 if(bxmlParsed==false){myParseCards();} 
 modalImg.style.visibility="hidden";
 captionText.innerHTML="";
 resultText.innerHTML="";
 rndCard=getRndInt(totXmlCards); 
 var book=catalog.childNodes[rndCard];
 var CardID=book.attributes[0].nodeValue;
 var CardNAME=book.attributes[1].nodeValue;
 var CardURL=URLMythic+book.attributes[2].nodeValue; 
 originalImage.src=CardID+".jpg";
}

originalImage.addEventListener('load',function(){
 let sx=25;
 let sy=53;
 let croppedWidth=301;
 let croppedHeight=220;
 canvas.width=croppedWidth;
 canvas.height=croppedHeight;
 context.drawImage(originalImage,sx,sy,croppedWidth,croppedHeight,0,0,croppedWidth,croppedHeight);
 var level=getRadioValue();
 if(level>0){
   originalImage.crossOrigin = "anonymous";
   const canvas1=document.createElement("canvas");
   const context1=canvas1.getContext("2d",{willReadFrequently:true});
   canvas1.width=croppedWidth;
   canvas1.height=croppedHeight;
   context1.drawImage(originalImage,sx,sy,croppedWidth,croppedHeight,0,0,croppedWidth,croppedHeight);
   var data=context1.getImageData(0,0,canvas1.width,canvas1.height);  
   if(level==1){
    context.putImageData(vintage(data),0,0);
   }else if(level==2){
    context.putImageData(solarize(data),0,0);
   }else{
    context.putImageData(noise(data),0,0);
   }
 } 
});

c.addEventListener('click',function(){
 mySearch();
});

function myCheck()
{
 if(rndCard==-1)
  return;
 var input,filter;
 input=document.getElementById("myInput");
 filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
 var book=catalog.childNodes[rndCard];
 var CardID=book.attributes[0].nodeValue;
 var CardNAME=book.attributes[1].nodeValue;
 CardURL=URLMythic+book.attributes[2].nodeValue;
 var msg="";
 if(CardNAME.toUpperCase()==filter){
  msg="Right Guess, congrats you win!"
 } 
 resultText.innerHTML=msg;
 modalImg.src=CardID+".jpg";
 modalImg.alt=CardID+" "+CardNAME;
 modalImg.title=CardID+" "+CardNAME;
 modalImg.style.visibility="visible";
 captionText.innerHTML="<a href='"+CardURL+"' style='font-size: 16px;'>"+modalImg.alt+"</a>";
 myResult(msg,modalImg.src,modalImg.title,CardURL)
}

function myResult(msg,imgurl,imgtitle,url){ 
 try{ 
  Swal.fire({    
   title: "<span><a style='color:Blue' href='"+url+"'>"+imgtitle +"</a></span>",
   html: "<span style='color:Black'><b>"+msg.replaceAll('\n','<br>')+"</b></span>",
   imageUrl: imgurl,
   imageWidth: 80,
   imageHeight: 104,
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{
  alert(imgtitle+"\n"+msg);
 }
}

function myHelp(){
 var sHelp ="Click 'New' button to get a new card or simply pat the image.\nEnter your guessed card's name and hit return.\nClick 'Check' button to unveil the whole card.\nClick the shown card or press the 'Zoom In' button and in the popup you have links to Alter Sleeves and to Scryfall.\nOnce unveiled, on mobile, you can share the card's AlterSleeves Link.";
 var title="";
 var imageUrl="";
 if(modalImg.style.visibility=="hidden")
  title="<span><a href='https://www.mythicgaming.com/alterists/damarideneurommancer'><img src='dada_logo.jpg' alt='' width='80' height='104' title='Alters by DamarideNeurommancer' style='border-radius:6px;align:center;'/></a></span>"; 
 else{
  imageUrl=modalImg.src;
  title="<span><a style='color:Blue' href='"+CardURL+"'>"+modalImg.title+"</a></span>";
 }  
 try{
  Swal.fire({    
   title: title,
   html: "<span style='color:Black'><b>"+sHelp.replaceAll('\n','<br>')+"</b></span>",
   imageUrl: imageUrl,
   imageWidth: 80,
   imageHeight: 104,
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{alert(sHelp);}
}

function myPopup(){
 if(modalImg.style.visibility=="hidden")
  return;
 var img=modalImg.src;
 var imgtitle=modalImg.title; 
 var url=CardURL; 
 modal.style.display="block";
 modalPopupImg.src=img;
 modalPopupImg.alt=imgtitle;
 captionModal.innerHTML="<a href='"+url+"' style='font-size: 16px;'>"+modalImg.alt+"</a>";
 var result=imgtitle.indexOf(" ");
 var scryCard=imgtitle.substring(result+1);
 scryfall.innerHTML="<a href='https://scryfall.com/search?q=!\""+scryCard.replaceAll("'","%27").replaceAll("&","%26") + "\"' style='font-size: 12px;'><img src='Scryfall.ico' alt='Scryfall' style='width:12px;height:12px;vertical-align:middle;'> Scryfall</a>";
}

function getRndInt(max){
 return (Math.floor(Math.random()*max)+1);
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

var span=document.getElementsByClassName("close")[0];
span.onclick=function(){ 
 modal.style.display="none";
}

function getRadioValue(){
 var lev=document.getElementsByName('level');
 var val=0;
 for(i=0;i<lev.length;i++) {
  if (lev[i].checked){
   val=lev[i].value;
   break;
  }
 }
 return(val);
}

function random(min,max){
 return(Math.floor(Math.random()*(max-min+1))+min);
}
function noise(imgData){
 var tempData=imgData;
 for(var i=0;i<tempData.data.length;i+=4){
  var r=tempData.data[i];
  var g=tempData.data[i+1];
  var b=tempData.data[i+2];
  tempData.data[i]=(r+random(0,255))/2;
  tempData.data[i+1]=(g+random(0,255))/2;
  tempData.data[i+2]=(b+random(0,255))/2;
 }    
 return tempData;
}
function solarize(imgData){
 var tempData=imgData;
 for(var i=0;i<tempData.data.length;i+=4){
  var r=tempData.data[i];
  var g=tempData.data[i+1];
  var b=tempData.data[i+2];
  tempData.data[i]  =r>127?255-r:r;
  tempData.data[i+1]=g>127?255-g:g;
  tempData.data[i+2]=b>127?255-b:b;
 }    
 return tempData;
}
function vintage(imgData){
 var tempData=imgData;
 for(var i=0;i<tempData.data.length;i+=4){
  var r=tempData.data[i];
  var g=tempData.data[i+1];
  var b=tempData.data[i+2];
  tempData.data[i]  =g;
  tempData.data[i+1]=r;
  tempData.data[i+2]=150;
 }  
 return tempData;
}

let shareData={
 title: "",
 text: "",
 url: "",
}

async function myShare()
{
 if(modalImg.style.visibility=="hidden")
  return;
 var _imgtitle=modalImg.title; 
 var _url=CardURL;
 shareData={
  title: "AlterSleeves Link",
  text: _imgtitle,
  url: _url,
 }
 if(navigator.canShare&&navigator.canShare(shareData)){
  await navigator.share(shareData);
 }
}