const xmlText=document.getElementById('xmlText');
const proxy='https://corsproxy.io/?';

async function checkAlterSleeves(){
 if(bxmlParsed==false){myParseCards();}
 var resLinks="";
 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  if(CardID<100)
   continue;
  var CardName=book.attributes[1].nodeValue;
  var CardURL=proxy+URLRoot+book.attributes[2].nodeValue;
  //var CardURL=URLRoot+book.attributes[2].nodeValue;
  resLinks+=`${i+1}: ${CardID} "${CardName}" ${CardURL} => `;
  var result=checkURL(CardURL);
  //const result = await ifUrlExist(CardURL);
  if(result==false){
   resLinks+="URL does not exist!"
  }
  else{
   resLinks+="Ok!"
  }
  resLinks+="\n";
 }
 xmlText.innerHTML=resLinks;
 xmlText.style.visibility="visible";
}  
 
async function checkURL(url){ 
  var status=true;
  try { 
    const response = await fetch(url); 
 	if (!response.ok){
 	  console.log(`URL does not exist: ${url}`);
 	  status=false;
  }
  else    
	 console.log(`URL exists: ${url}`); 
  } catch (error) { 
    console.log(`Error checking URL: ${error}`);
    status=false; 
  }
  return status; 
}

// if-url-exist.js v2
async function ifUrlExist(url){
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "HEAD"
        }).then(response => {
            resolve(response.status.toString()[0] === "2")
        }).catch(error => {
            reject(false)
        })
    })
}

 
