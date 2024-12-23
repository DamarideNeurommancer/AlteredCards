const dadaQuotes="https://damarideneurommancer.github.io/AlteredCards/quotes_all.csv";
const dadaRoot="DAMARIDENEUROMMANCER";
const outCCode=document.getElementById("outCCode");
const inSample=document.getElementById("inSample");
const input=document.getElementById('myInput');
const myBtn=document.getElementById('myBtn');
const chkShow=document.getElementById('myChkShow');
const chkPhrase=document.getElementById('myChkPhrase');
const inPhrase=document.getElementById("inPhrase");
const modalImg=document.getElementById("img01");
const captionText=document.getElementById("caption");
const randomRange=(min, max)=>min+Math.random()*(max-min);
const randomIndex=(array)=>randomRange(0,array.length)|0;
const getRandomFromArray=(array)=>(array[randomIndex(array)|0]);
const modal=document.getElementById('myModal');
const captionModal=document.getElementById('caption-modal');
const modalPopupImg=document.getElementById("img02");
const scryfall=document.getElementById("scryfall");
const outBorder="2px solid ";
const codeMaxDigits=6;
const nPlaymats=8;
var allText=[];
var allTextLines=[];
var bQInit=false;
var CardURL="";
async function genCode(){
 var rndCode=0;
 var setNo=1; 
 var filter;
 filter=input.value.replaceAll(" ","").replaceAll("*","").replaceAll("%","").trim().toUpperCase();
 if(filter=="")
  filter="?";
 var firstL=filter.charAt(0);
 inSample.innerHTML="";
 
 var myList=document.getElementById("algorithm");
 setNo=parseInt(myList.selectedIndex+1);
 switch(setNo){
  case 1:
   var arVal1=[];
   arVal1=rndFromCaseName(dadaRoot+filter);
   inSample.innerHTML=dadaRoot+filter+"\n"+arVal1;
   rndCode=sumArrayRandomly(arVal1);
   outCCode.style.border=outBorder+"Blue";
   break;
  case 2:
    rndCode=getRandomCode(123456,987654);
    outCCode.style.border=outBorder+"Red";
   break;
  case 3:
   rndCode = uuidv4();
   inSample.innerHTML=rndCode;
   const myArray = rndCode.split("-");
   rndCode = parseInt(myArray[0],16).toString().substring(0,6);
   outCCode.style.border=outBorder+"Violet";
   break;
  case 4:
   var arVal=[];
   if(!bQInit){
    await init();
    bQInit=true;
   }
   if(chkPhrase.checked&&inPhrase.value!=""){
    arVal=rndFromPhrase();
   }
   else
   {
    arVal=rndFromQuote();
   }
   rndCode=sumArrayRandomly(arVal);
   outCCode.style.border=outBorder+"Lime";
   break;  
 }
 outCCode.innerHTML=firstL+rndCode;
 rndImage();
}
function getRandomCode(min,max){
 return Math.round(min+Math.random()*(max-min));
}
function uuidv4(){
 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g,function(c){
   const r=Math.random() * 16 | 0, 
    v=c=='x'?r:(r&0x3|0x8); 
   return v.toString(16);
 });
}
async function init(){
 var txtFile = new XMLHttpRequest();
 txtFile.onreadystatechange = function(){    
  if(txtFile.readyState==XMLHttpRequest.DONE){
   if(txtFile.status==200){
    allText=txtFile.responseText;
    allTextLines=allText.split(/\r\n|\n/);
    allText=[];
    bQInit=true;
   }
   else{
    displayError(txtFile.status);
   }
  }
 };
 txtFile.open("GET",dadaQuotes,true);
 txtFile.send();    
}
function displayError(statusCode){
 var msg;
 if(statusCode===400)
  msg="Too many requests!\nPlease try again sometime later.";
 else
  msg="Oops!! Something went wrong!\nPlease try to refresh the page."                     
 alert(msg);
}
function rndFromQuote(){
 var arVal=[];
 for(var i=0; i<codeMaxDigits;i++){
  const quote=getRandomFromArray(allTextLines);
  if(quote===null||quote===""||quote==="undefined"||quote===undefined)
   quote="Damaride Neurommancer 2025";
   inSample.innerHTML+=(i+1)+") "+quote+"\n";
  var csvFields=quote.split(/;/);
  var qWords=csvFields[0];
  var words=qWords.split(" ");
  var rnd=getRandomCode(0,words.length-1);
  var alpha=alphabetPosition(words[rnd]);
  if(alpha.length>0){
   for(var j=0; j<alpha.length;j++){
    arVal.push(alpha[j]);
   }
  }
 }
 return arVal;
}
function alphabetPosition(text){
 const upperText=text.toUpperCase();
 const arr=upperText.split("").map(let =>let.charCodeAt());
 const newArr=arr.filter(num =>{
  if((num>64&& num<91)||(num>47&& num<58)){
   return num;
  }
 })
 const updatedNumsArr=newArr.map(num=>num-64>0?num-64:-(num-64));
 return updatedNumsArr; 
}
function sumArrayRandomly(arr){
 var caseCode="";
 for(var i=0; i<codeMaxDigits;i++){
  var rndStart=getRandomCode(0,arr.length-1);
  var rndStop=getRandomCode(rndStart,arr.length-1);
  var sum=0;
  for(var j=rndStart; j<=rndStop;j++){
    sum+=arr[j];
  }
  if(sum>9){
    var tot=Array.from(sum.toString());
    sum=getArraySum(tot)
  }
  caseCode+=sum; 
 }
 return caseCode;
}
function getArraySum(arr){
 var sum=0;
 for(var i=0; i<arr.length;i++){
  sum+=Number(arr[i]);
 }
 if(sum>9)
  sum=getArraySum(Array.from(sum.toString()));
 return sum; 
}
function rndFromCaseName(text){
 var arVal=[];
 //for(var i=0; i<codeMaxDigits;i++){
  if(text===null||text===""||text==="undefined"||text===undefined)
   text="Dam aride Neur om mancer 2025";
  var csvFields=text.split(/;/);
  var qWords=csvFields[0];
  var words=qWords.split(" ");
  var rnd=getRandomCode(0,words.length-1);
  var alpha=alphabetPosition(words[rnd]);
  if(alpha.length>0){
   for(var j=0; j<alpha.length;j++){
    arVal.push(alpha[j]);
   }
  }
 //}
 return arVal;
}
input.addEventListener('keyup',function(event){
if(event.keyCode==13){myBtn.click();}
});
function showSource(){
 if(chkShow.checked)
  inSample.style.visibility="visible";
 else
  inSample.style.visibility="hidden";
}
function showPhrase(){
 if(chkPhrase.checked)
  inPhrase.style.visibility="visible";
 else
  inPhrase.style.visibility="hidden";
}
function rndFromPhrase(){
 var arVal=[];
 const quote=inPhrase.value;
 if(quote===null||quote===""||quote==="undefined"||quote===undefined)
  quote="Hi Damaride Neurommancer 2025";
 inSample.innerHTML+=quote;
 var words=quote.split(" ");
 for(var i=0; i<codeMaxDigits;i++){
  var rnd=getRandomCode(0,words.length-1);
  var alpha=alphabetPosition(words[rnd]);
  if(alpha.length>0){
   for(var j=0; j<alpha.length;j++){
    arVal.push(alpha[j]);
   }
  }
 }
 return arVal;
}
function getRndInt(max){
 return (Math.floor(Math.random()*max)+1);
}
function rndImage()
{
 if(bxmlParsed==false){myParseCards();}
 var rndCard=getRndInt(totXmlCards-nPlaymats);
 var book=catalog.childNodes[rndCard];
 var CardID=book.attributes[0].nodeValue;
 var CardNAME=book.attributes[1].nodeValue;
 CardURL=URLRoot+book.attributes[2].nodeValue;
 modalImg.src=CardID+".jpg";
 modalImg.alt=CardID+" "+CardNAME;
 modalImg.title=CardID+" "+CardNAME;
 modalImg.style.visibility="visible";
 captionText.innerHTML="<a href='"+CardURL+"' style='font-size: 16px;'>"+modalImg.alt+"</a>";
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
var span=document.getElementsByClassName("close")[0];
span.onclick=function(){ 
 modal.style.display="none";
}