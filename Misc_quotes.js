const dadaQuotes="https://damarideneurommancer.github.io/AlteredCards/quotes_all.csv";
const gSearch="https://www.google.co.uk/search?q=";
const newQuote=document.getElementById('new-quote');
const quoteDiv=document.getElementById('text');
const authorDiv=document.getElementById('author');
const shareBtn=document.getElementById('share-quote');
const randomRange=(min, max)=>min+Math.random()*(max-min)
const randomIndex=(array)=>randomRange(0,array.length)|0
const getRandomFromArray=(array)=>(array[randomIndex(array)|0])
var allText=[];
var allTextLines=[];
function displayQuote(){
 if(allTextLines.length==0)
  loadQuotes();
 const quote=getRandomFromArray(allTextLines);
 if(quote===null||quote==="")
  return;
 var csvFields=quote.split(/;/);
 quoteDiv.textContent=csvFields[0];
 var author=csvFields[1];
 var authorLnk=gSearch+encodeURIComponent(author)+"&hl=en";
 authorDiv.innerHTML=`<a href='${authorLnk}' style='color:blue;background-color:white'>${author}</a>`;
}
function loadQuotes(){
 //if(bxmlParsed==false){myParseCards();totXmlCards-=8;}
 if(!navigator.canShare){
  shareBtn.style.visibility="hidden";
 }
 var txtFile = new XMLHttpRequest();
 txtFile.onreadystatechange = function(){    
  if(txtFile.readyState==XMLHttpRequest.DONE){
   if(txtFile.status==200){
    allText=txtFile.responseText;
    allTextLines=allText.split(/\r\n|\n/);
    displayQuote();
    allText=[];
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
let shareQData={
 title: "",
 text: "",
 url: "",
}
async function shareQuote(){
 if(quoteDiv.textContent==="")
  return;
 var quote='"'+quoteDiv.textContent+'"\n'+authorDiv.innerText; 
 shareQData={
  title: "DamarideNeurommancer Quote",
  text: quote,
  url: prevTr.querySelector('a').getAttribute('href'),
 }
 if(navigator.canShare&&navigator.canShare(shareQData)){
  await navigator.share(shareQData);
 }
}
