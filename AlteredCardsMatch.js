var bxmlParsed=false;
var xmlDoc,catalog,totXmlCards;
const game=document.getElementById('game');
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const dsCardStyle="width:120px;height:156px;border-radius:2px;align:center;";
const dsCardLinkStyle="width:120px;height:140px;border-radius:6px;align:center;";
const mbCardStyle="width:60px;height:80px;border-radius:2px;align:center;";
const mbCardLinkStyle="width:60px;height:66px;border-radius:6px;align:center;";
var loadedCards;
let firstPick;
let isPaused=true;
let matches;

function myParseCards(){
 var parser=new DOMParser();
 xmlDoc=parser.parseFromString(xmlCards,"text/xml");
 bxmlParsed=true;
 catalog=xmlDoc.getElementsByTagName('Cards')[0];
 totXmlCards=catalog.childElementCount;   
}

function getRndInt(max){
 return(Math.floor(Math.random()*max)+1);
}

function myRndCard(){
 if(bxmlParsed==false){
  myParseCards();
 }
 var rndCard = getRndInt(totXmlCards);
 return rndCard;
}

function createArray(N){
 let newArr=[];
 for(let i=1;i<=N/2;i++){
  let rndNum=myRndCard();  
  newArr.push(rndNum);
 }
 for(let i=0;i<N/2;i++){
  newArr.push(newArr[i]);
 }
 return newArr;
}
const resetGame = async() => {
 game.innerHTML='';
 isPaused=true;
 firstPick=null;
 matches=0;
 loadedCards=createArray(16);
 loadedCards.sort(_ => Math.random() - 0.5);
 displayCards(loadedCards);
 isPaused=false;
}

function displayCards(CardsList){
 var CardsHTML="";
 var catalog=xmlDoc.getElementsByTagName('Cards')[0];
 var CardSTYLE=dsCardStyle;
 if(isMobile()){
  game.style.gridTemplateColumns="90px 90px 90px 90px";
  game.style.gridTemplateRows="90px 90px 90px 90px";
  CardSTYLE=mbCardStyle; 
 }
 for(let i=0;i<CardsList.length;i++){
  var book=catalog.childNodes[CardsList[i]];
  var CardID=book.attributes[0].nodeValue;
  if(Number(CardID)>100){CardID +=".jpg";}else{CardID +=".webp";}
  var CardNAME=book.attributes[1].nodeValue;
  const color='#F5F5F5';
  CardsHTML+=`<div class="card" onclick="clickCard(event)" data-cardname="${CardNAME}" style="background-color:${color};">
   <div class="front"></div>
   <div class="back rotated" style="background-color:${color};">
   <!--img src="${CardID}" alt="${CardNAME}" style="width:120px;height:156px;border-radius:2px;align:center;"/-->
   <img src="${CardID}" alt="${CardNAME}" style="${CardSTYLE}"/>
   </div></div>`;
  game.innerHTML=CardsHTML; 
 }
}

const clickCard = (e) => {
 const DadaCard=e.currentTarget;
 const [front,back]=getFrontAndBackFromCard(DadaCard)
 if(front.classList.contains("rotated")||isPaused){
  return;
 }
 isPaused=true;
 rotateElements([front,back]);
 if(!firstPick){
  firstPick=DadaCard;
  isPaused=false;
 }
 else{
  const secondDadaName=DadaCard.dataset.cardname;
  const firstDadaName=firstPick.dataset.cardname;
  if(firstDadaName !== secondDadaName){
   const [firstFront,firstBack]=getFrontAndBackFromCard(firstPick);
   setTimeout(() => {
    rotateElements([front,back,firstFront,firstBack]);
    firstPick=null;
    isPaused=false;
   },500)    
  }else{
   matches++;
   if(matches===8){
    displayCardsLink(loadedCards);
    myResult();
   }
   firstPick=null;
   isPaused=false;
  }
 }   
}

const getFrontAndBackFromCard = (card) => {
 const front=card.querySelector(".front");
 const back=card.querySelector(".back");
 return [front,back]
}

const rotateElements = (elements) => {
 if(typeof elements !== 'object' || !elements.length) return;
  elements.forEach(element => element.classList.toggle('rotated'));
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

function myResult(){
 var sHelp="End of Match Game.<br>Now you can follow the links to AlterSleeves.<br>Click on the Logo and see all Alters by DamarideNeurommancer on AlterSleeves."; 
 try{ 
  Swal.fire({
   title: "<span><a href='https://www.altersleeves.com/browse/?browse_type=by&artist_id=16'><img src='dada_logo.jpg' alt='' width='80' height='104' title='Alters by DamarideNeurommancer' style='border-radius:6px;align:center;'/></a></span>",
   html: "<span style='color:Black'><b>"+sHelp+"</b></span>",
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{
  alert("\n"+msg);
 }
}

resetGame();

function displayCardsLink(CardsList){
 if(CardsList==null||CardsList==="undefined")
  CardsList=loadedCards;
 var CardsHTML="";
 var catalog=xmlDoc.getElementsByTagName('Cards')[0];
 var CardSTYLE=dsCardLinkStyle;//dsCardStyle;
 var CardFONT="font-size:10px;align:center;";
 if(isMobile()){
  game.style.gridTemplateColumns="90px 90px 90px 90px";
  game.style.gridTemplateRows="110px 110px 100px 110px";
  CardSTYLE=mbCardStyle;//mbCardLinkStyle;
  CardFONT="font-size:6px;align:center;"; 
 }
 for(let i=0;i<CardsList.length;i++){
  var book=catalog.childNodes[CardsList[i]];
  var CardID=book.attributes[0].nodeValue;
  var CardFile=CardID;
  if(Number(CardID)>100){CardFile +=".jpg";}else{CardFile +=".webp";}
  var CardNAME=book.attributes[1].nodeValue;
  var CardURL=(Number(CardID)>100?URLRoot:"")+book.attributes[2].nodeValue;
  CardsHTML+=`<div class="cardlink"><div class="frontlink"><a href="${CardURL}">
  <img src="${CardFile}" alt="${CardNAME}" style="${CardSTYLE}" title="${CardID} ${CardNAME}"><font style="${CardFONT}"><br>&nbsp;${CardNAME}</font></a>
  </div></div>`;
  game.innerHTML=CardsHTML; 
 }
}
function isMobile()
{
 return(window.orientation!=null&&window.orientation!="undefined");
}