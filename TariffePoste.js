const main=document.getElementById('main');
const header=document.getElementById('myHeader');
const TARICArea=document.getElementById("TaricArea");
var divFlag=document.getElementById('flag');
var table=document.getElementById('myTable');
var CostArea=document.getElementById("CostArea");
var inputWeight=document.getElementById("myWeight");
var inputCountry=document.getElementById('user-choice');
var dataArea=document.getElementById('dataArea');
var bMobile=false;
isMobile();

function mySearch(){ 
 var setNo="1";
 var myList=document.getElementById("mySets");
  setNo=(myList.selectedIndex+1).toString(); 
 if(bxmlParsed==false){myParseTariffs();}
 CostArea.style.display="none";
 //CostArea.innerHTML="";
 dataArea.innerHTML="";
 dataArea.value="";
 table.innerHTML=""; 
 var row,cell;
 var book=catalog.childNodes[setNo-1];
 row=table.insertRow(-1);
 cell=row.insertCell(-1);
 cell.style.backgroundColor="Brown";
 cell.innerHTML="#";
 cell=row.insertCell(-1);
 cell.style.backgroundColor="Brown";
 cell.innerHTML="Servizio";
 cell=row.insertCell(-1);
 cell.style.backgroundColor="Brown";
 cell.innerHTML="MaxWgt"
 cell=row.insertCell(-1);
 cell.style.backgroundColor="Brown"; 
 cell.innerHTML="URL"
 const[SID,SNAME,SMaxW,SURL]=getServiceInfo(catalog,setNo);
 row=table.insertRow(-1);
 cell=row.insertCell(-1);
 cell.innerHTML="#"+SID;
 cell=row.insertCell(-1);
 cell.style.backgroundColor="Blue";
 cell.innerHTML="\u2709 "+SNAME;
 cell=row.insertCell(-1);
 cell.innerHTML="\u2696 "+SMaxW;
 cell=row.insertCell(-1); 
 cell.innerHTML="<a href='"+SURL+"'> \u25BA Info</a>"
 calcCost();
 if(TARICArea.innerHTML==""){
  loadTARICCodes();
 }
 loadCountriesCB();
}
function getServiceInfo(catalog,choice){
 var book=catalog.childNodes[choice-1];
 var SID=book.attributes[1].nodeValue;
 var SNAME=book.attributes[0].nodeValue;
 var SMaxW=book.attributes[2].nodeValue;
 var SURL=book.attributes[3].nodeValue;
 return [SID,SNAME,SMaxW,SURL]
}
function getCost(ServiceName,CountryNameOrCode,Weight){
 var myList=document.getElementById("mySets");
 const setNo=(myList.selectedIndex+1).toString();
 const book=catalog.childNodes[setNo-1];
 
 var bCountryFound=false;
 var zoneName="";
 var countryName="";
 var countryEngName="";
 var countryCode="";
 const zones = book.getElementsByTagName('Z');
 var InfoCosto = "";
 var tariffe="";
 for(var i=0;i<zones.length;i++){
   var zona=zones[i];
   const zCode=zona.attributes[1].nodeValue;  //Zone Code
   const zName=zona.attributes[0].nodeValue;  //Zone Name
   const countries=zona.getElementsByTagName('C');
   for(var c=0;c<countries.length;c++){
    var country=countries[c];
    const cCode=country.attributes[1].nodeValue.toLowerCase();
    const cName=country.attributes[0].nodeValue.toLowerCase();
    const cEngName=country.attributes[2].nodeValue.toLowerCase();
    const cCode3=country.attributes[3].nodeValue.toLowerCase();
    if(cName==CountryNameOrCode||cEngName==CountryNameOrCode||cCode==CountryNameOrCode||cCode3==CountryNameOrCode||cName.startsWith(CountryNameOrCode)||cEngName.startsWith(CountryNameOrCode)){
      //console.log("*** Zona=",zName," C=",zCode);
      //console.log("Found K=",cName," C=",cCode," Eng=",cEngName," C3=",cCode3);
      bCountryFound=true;
      zoneName=zName;
      countryName=country.attributes[0].nodeValue;
      countryEngName=country.attributes[2].nodeValue;
      countryCode=cCode;
      divFlag.innerHTML=""+getFlagEmoji(cCode);      
      break;
    }
   }
   if(bCountryFound==false)
    continue;
   
   const tariffs=zona.getElementsByTagName('T');
   for(var t=0;t<tariffs.length;t++){
    var tarif=tariffs[t];
    const tCode=tarif.attributes[1].nodeValue;
    const tName=tarif.attributes[0].nodeValue;
    const tMin=Number(tarif.attributes[2].nodeValue);
    const tMax=Number(tarif.attributes[3].nodeValue);
    const tCost=tarif.attributes[4].nodeValue;
    if(Weight>=tMin&&Weight<=tMax){
      //console.log("T=",tName," C=",tCode," MinW=",tMin," MaxW=",tMax," Costo=",tCost);
      tariffe=tariffe+"\n"+"\u279C "+tName+": \u20AC"+tCost;
    }
   }   
   if(setNo!=4&&setNo!=6){   
    InfoCosto="\u2709 "+ServiceName+"\n\u26F3 "+zoneName+"\n\u2691 "+getFlagEmoji(countryCode)+" "+countryName+(countryName==countryEngName?"":" ("+countryEngName+")")+"\n\u2696 "+Weight+"g.\n"+tariffe;
    //console.log(InfoCosto)
    return(InfoCosto);
   }
   else
   {
     InfoCosto=InfoCosto+"\n"+"\u2709 "+ServiceName+"\n\u26F3 "+zoneName+"\n\u2691 "+getFlagEmoji(countryCode)+" "+countryName+(countryName==countryEngName?"":" ("+countryEngName+")")+"\n\u2696 "+Weight+"g.\n"+tariffe;
     tariffe="";
   }
 }
 return(InfoCosto);
}
function getFlagEmoji(countryCode){
 if(!countryCode||countryCode.length!==2) return;
 const codePoints=countryCode.toUpperCase().split("").map(char=>127397+char.charCodeAt(0));
 return String.fromCodePoint(...codePoints); 
}
function loadTARICCodes(){
 TARICArea.innerHTML=`Taric Classificazione

* Carte da gioco *
Codice: 95044000 00 (OK)
Carte da gioco

* Cartoline *
Codice: 49090000 00 (OK)
Cartoline postali stampate o illustrate; 
cartoline stampate con auguri o comunicazioni personali, anche illustrate, con o senza busta, guarnizioni od applicazioni

* Adesivi *
Codice: 48114900 00(OK)
autoadesivi
Codice: 48114190 00(OK)

* Portachiavi *
Codice: 420232 (OK)
...,portachiavi,... con superficie esterna di fogli di materie plastiche o di materie tessili
in alternativa:
Codice: 39261000 00
Oggetti per l'ufficio e per la scuola

* Spilla *
Codice 73194000 00 (OK)
Spilli di sicurezza ed altri spilli

* Segnalibri *
Codice 48211090 00 (OK)
Etichette di qualsiasi specie, di carta o di cartone, stampate o no
`;
}
function loadCountriesCB(){
 var myList=document.getElementById("mySets");
 setNo=(myList.selectedIndex+1).toString();
 var book=catalog.childNodes[setNo-1];
 var serviceName=book.attributes[0].nodeValue;
 const items=new Array();
 const zones = book.getElementsByTagName('Z');
 for(var i=0;i<zones.length;i++){
  var zona=zones[i];
  const zCode=zona.attributes[1].nodeValue;  //Zone Code
  const zName=zona.attributes[0].nodeValue;  //Zone Name
  const countries=zona.getElementsByTagName('C');
  for(var c=0;c<countries.length;c++){
   var country=countries[c];
   const cCode=country.attributes[1].nodeValue;
   const cName=country.attributes[0].nodeValue;
   const cEngName=country.attributes[2].nodeValue;
   const cCode3=country.attributes[3].nodeValue;
   const option=cName+" - "+cCode;
   items.push(option);
  }
 }
 updateCB(items);
}
function updateCB(items){
 var countriesList=document.getElementById('countries-list');
 countriesList.innerHTML="";
 items.forEach(item => {
  const option=document.createElement('option');
   option.value=item;
   countriesList.appendChild(option);
 });
}

function calcCost()
{
 var inpCountry;
 inpCountry=inputCountry.value.trim();
 if(inpCountry=="")
  return;
 var inpWeight;
 inpWeight=inputWeight.value.trim();
 if(inpWeight==""){
  alert("Weight must be a number!");
  return;
 }
  ;
 if(Number.isNaN(inpWeight)){
  alert("Weight must be a number!");
  return;
 }
 if(Number(inpWeight)<0){
  inpWeight*=-1;
 }
 inpCountry=inpCountry.toLowerCase();
 var c=inpCountry.split("-");
 inpCountry=c[0].trim();    
 if(inpCountry=="uk")
  inpCountry="gb";
 var myList=document.getElementById("mySets");
 setNo=(myList.selectedIndex+1).toString();
 var book=catalog.childNodes[setNo-1];
 const[SID,SNAME,SMaxW,SURL]=getServiceInfo(catalog,setNo);
 if(Number(inpWeight)>Number(SMaxW)){
  alert("Max Weight allowed for this service is "+SMaxW+ " (g).");
  return;
 }
 var costo = getCost(SNAME,inpCountry,Number(inpWeight));
 CostArea.innerHTML=costo;
 CostArea.value=costo;
 CostArea.style.color="Brown";
 if(CostArea.innerHTML=="undefined"||CostArea.innerHTML=="?"||CostArea.innerHTML==""){
  CostArea.style.color="red";
  CostArea.innerHTML="Country not addressed for the selected service!";
  CostArea.value=CostArea.innerHTML;
  divFlag.innerHTML="";
 }
 CostArea.style.display="block";
}
function myInit(){
 initVars();
 if(bxmlParsed==false){myParseTariffs();}
 mySearch();
}
function initVars(){
 inputCountry=document.getElementById('user-choice');
 inputWeight=document.getElementById("myWeight");
 table=document.getElementById('myTable');
 CostArea=document.getElementById("CostArea");
 divFlag=document.getElementById('flag');
 dataArea=document.getElementById('dataArea');
}
function viewData(){
 dataArea.innerHTML="";
 dataArea.value="";
 var myList=document.getElementById("mySets");
 const setNo=(myList.selectedIndex+1).toString();
 const book=catalog.childNodes[setNo-1];
 var data="\u2709 "+book.attributes[0].nodeValue+"\n";
 data+="\u2696 Max "+book.attributes[2].nodeValue+"g.\n";
 const zones = book.getElementsByTagName('Z');
 for(var i=0;i<zones.length;i++){
   var zona=zones[i];
   const zCode=zona.attributes[1].nodeValue;  //Zone Code
   const zName=zona.attributes[0].nodeValue;  //Zone Name
   data+="\u26F3 "+zName+" ---\n";
   const countries=zona.getElementsByTagName('C');
   for(var c=0;c<countries.length;c++){
    var country=countries[c];
    const cCode=country.attributes[1].nodeValue;
    const cName=country.attributes[0].nodeValue;
    const cEngName=country.attributes[2].nodeValue;
    const cCode3=country.attributes[3].nodeValue;
    data+=getFlagEmoji(cCode)+" "+cName+(cName==cEngName?"":" ("+cEngName+")")+" ["+cCode+" "+cCode3+"]\n"; 
   }
   data=data+"\u21F6 Tariffe in \u20AC ---\n"
   const tariffs=zona.getElementsByTagName('T');
   for(var t=0;t<tariffs.length;t++){
    var tarif=tariffs[t];
    const tCode=tarif.attributes[1].nodeValue;
    const tName=tarif.attributes[0].nodeValue;
    const tMin=Number(tarif.attributes[2].nodeValue);
    const tMax=Number(tarif.attributes[3].nodeValue);
    const tCost=tarif.attributes[4].nodeValue;
    data=data+"\u279C "+tName+": \u20AC"+tCost+"\n";
   }
   data=data+"\n";   
 }
 dataArea.innerHTML=data;
 dataArea.value=data;
}
let shareData={
 title: "",
 text: "",
 url: "",
}
async function myShare()
{
 if(CostArea.value=="Country not addressed for the selected service!"||CostArea.value=="")
  return;
 var cdate=new Date();
 var cdatetime=(cdate.getDate()<10?"0":"")+cdate.getDate()+"-"+((cdate.getMonth()+1)<10?"0":"")+(cdate.getMonth()+1)+"-"+cdate.getFullYear()+" @ "+(cdate.getHours()<10?"0":"")+cdate.getHours()+":"+(cdate.getMinutes()<10?"0":"")+cdate.getMinutes()+":"+(cdate.getSeconds()<10?"0":"")+cdate.getSeconds(); 
 var _msg=cdatetime+"\n"+CostArea.value; 
 var _url="";
 shareData={
  title: "Tariffe Poste",
  text: _msg,
  url: _url,
 }
 if(navigator.canShare&&navigator.canShare(shareData)){
  await navigator.share(shareData);
 }
}
function isMobile(){
 bMobile=(window.orientation!=null&&window.orientation!="undefined");
 /*if(bMobile){
  CostArea.cols=40;
  dataArea.cols=40;
  TARICArea.cols=40;
 }*/
}