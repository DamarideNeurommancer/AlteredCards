const game=document.getElementById('game');
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const dsCardStyle="width:120px;height:156px;border-radius:6px;align:center;";
const dsCardLinkStyle="width:120px;height:140px;border-radius:6px;align:center;padding:2px;";
const mbCardStyle="width:60px;height:80px;border-radius:6px;align:center;padding:2px;";
const mbCardLinkStyle="width:60px;height:66px;border-radius:6px;align:center;padding:2px;";
const tarots=document.getElementById('useTarots');
const listTarots=[["0","The Fool"],["I","The Magician"],["II","The High Priestess"],["III","The Empress"],["IV","The Emperor"],["V","The Hierophant"],["VI","The Lovers"],["VII","The Chariot"],["VIII","Strength"],["IX","The Hermit"],["X","Wheel of Fortune"],["XI","Justice"],["XII","The Hanged Man"],["XIII","Death"],["XIV","Temperance"],["XV","The Devil"],["XVI","The Tower"],["XVII","The Star"],["XVIII","The Moon"],["XIX","The Sun"],["XX","Judgement"],["XXI","The World"]];
var bTarots=false;
var loadedCards;
let firstPick;
let isPaused=true;
let matches;

function getRndInt(max){
 return(Math.floor(Math.random()*max)+1);
}

function myRndCard(){
 if(bxmlParsed==false){myParseCards();}
 var rndCard = getRndInt(totXmlCards);
 return rndCard;
}

let newArr=[];
function createArray(N){
 bTarots=tarots.checked;
 newArr=[];
 let rndNum;
 for(let i=1;i<=N/2;i++){
  
  rndNum=!bTarots?myRndCard():getRandomTaroc();
  if(i>1){
   while(dupCards(rndNum))
    rndNum=!bTarots?myRndCard():getRandomTaroc(); 
  }  
  newArr.push(rndNum);
 }
 for(let i=0;i<N/2;i++){
  newArr.push(newArr[i]);
 }
 return newArr;
}
function dupCards(rndNum){
 var res=false;
 for(var j=0;j<newArr.length;j++){
  if(newArr[j]==rndNum){
   res=true;
   break;
  }
 }
 return res;
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
 var CardSTYLE=dsCardStyle;
 var sStyleFront="background-image:url('neurommancer_logo.png');";
 if(isMobile()){
  game.style.gridTemplateColumns="90px 90px 90px 90px";
  game.style.gridTemplateRows="90px 90px 90px 90px";
  CardSTYLE=mbCardStyle; 
 }
 var CardID,CardNAME;
 for(let i=0;i<CardsList.length;i++){
  if(!bTarots){
   var book=catalog.childNodes[CardsList[i]];
   CardID=book.attributes[0].nodeValue;
   if(Number(CardID)>100){CardID +=".jpg";}else{CardID +=".webp";}
   CardNAME=book.attributes[1].nodeValue;
  }
  else{
   CardID="./tarots/"+listTarots[CardsList[i]][0]+".webp";
   CardNAME=listTarots[CardsList[i]][0]+" "+listTarots[CardsList[i]][1];
   sStyleFront="background-image:url('./tarots/Back2.webp');background-size:60%;";
  }
  const color='#F5F5F5';
  CardsHTML+=`<div class="card" onclick="clickCard(event)" data-cardname="${CardNAME}" style="background-color:${color};">
   <div class="front" style="${sStyleFront}"></div>
   <div class="back rotated" style="background-color:${color};">
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
   title: "<span><a href='https://www.altersleeves.com/products?page=1&artist=16'><img src='dada_logo.jpg' alt='' width='80' height='104' title='Alters by DamarideNeurommancer' style='border-radius:6px;align:center;'/></a></span>",
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
 var CardSTYLE=dsCardLinkStyle;//dsCardStyle;
 var CardFONT="font-size:10px;align:center;";
 if(isMobile()){
  game.style.gridTemplateColumns="90px 90px 90px 90px";
  game.style.gridTemplateRows="110px 110px 100px 110px";
  CardSTYLE=mbCardStyle;//mbCardLinkStyle;
  CardFONT="font-size:6px;align:center;"; 
 }
 var CardID,CardNAME,CardURL,CardFile;
 if(bTarots)
  CardURL="index_AlteredSets.html?set=1";
  
 for(let i=0;i<CardsList.length;i++){
  if(!bTarots){
   var book=catalog.childNodes[CardsList[i]];
   CardID=book.attributes[0].nodeValue;
   CardFile=CardID;
   if(Number(CardID)>100){CardFile +=".jpg";}else{CardFile +=".webp";}
   CardNAME=book.attributes[1].nodeValue;
   CardURL=(Number(CardID)>100?URLRoot:"")+book.attributes[2].nodeValue;
  }
  else{
   CardID=listTarots[CardsList[i]][0];
   CardFile="./tarots/"+listTarots[CardsList[i]][0]+".webp";
   CardNAME=listTarots[CardsList[i]][1];
  }
  CardsHTML+=`<div class="cardlink"><div class="frontlink"><a href="${CardURL}">
  <img src="${CardFile}" alt="${CardNAME}" style="${CardSTYLE}" title="${CardID} ${CardNAME}"><font style="${CardFONT}"><br>&nbsp;${CardNAME}</font></a>
  </div></div>`;
  game.innerHTML=CardsHTML; 
 }
 myResult();
}
function isMobile(){
 return(window.orientation!=null&&window.orientation!="undefined");
}

function getRandomTaroc(){
 return Math.floor(Math.random()*22);
}