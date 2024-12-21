const dadaQuotes="https://damarideneurommancer.github.io/AlteredCards/quotes_all.csv";
const dadaRoot="DAMARIDENEUROMMANCER";
const outCCode=document.getElementById("outCCode");
const randomRange=(min, max)=>min+Math.random()*(max-min);
const randomIndex=(array)=>randomRange(0,array.length)|0;
const getRandomFromArray=(array)=>(array[randomIndex(array)|0]);
const codeMaxDigits=6;
var allText=[];
var allTextLines=[];
var bQInit=false;
async function genCode(){
 var rndCode=0;
 var setNo=1; 
 var input,filter;
 input=document.getElementById("myInput");
 filter=input.value.replaceAll(" ","").replaceAll("*","").replaceAll("%","").trim().toUpperCase();
 if(filter=="")
  filter="?";
 var firstL=filter.charAt(0);
 
 var myList=document.getElementById("algorithm");
 setNo=parseInt(myList.selectedIndex+1);
 switch(setNo){
  case 1:
   var arVal1=[];
   arVal1=rndFromCaseName(dadaRoot+filter);
   rndCode=sumArrayRandomly(arVal1);
   outCCode.style.border="2px solid Blue";
   break;
  case 2:
    rndCode=getRandomCode(123456,987654);
    outCCode.style.border="2px solid Red";
   break;
  case 3:
   rndCode = uuidv4();
   const myArray = rndCode.split("-");
   rndCode = parseInt(myArray[0],16).toString().substring(0,6);
   outCCode.style.border="2px solid Violet";
   break;
  case 4:
   var arVal=[];
   if(!bQInit){
    await init();
    bQInit=true;
   }
   arVal=rndFromQuote();
   rndCode=sumArrayRandomly(arVal);
   outCCode.style.border="2px solid Lime";
   outCCode.innerHTML=firstL+rndCode;
   break;  
 }
 outCCode.innerHTML=firstL+rndCode;
}
function getRandomCode(min,max){
 return Math.round(min+Math.random()*(max-min));
}
function uuidv4(){
 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
   const r = Math.random() * 16 | 0, 
    v = c == 'x' ? r : (r & 0x3 | 0x8);
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
 for(var i=0; i<codeMaxDigits;i++){
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
 }
 return arVal;
}