var bxmlParsed=false;
var xmlDoc;
var bMobile=false;
const xmlCards=`<Cards><C I="231" N="Mistform Ultimus"/><C I="230" N="Floppy Eldritch Saint (case)"/><C I="229" N="Kona, Rescue Beastie"/><C I="228" N="Floppy Alien (Hellen Ripley)"/><C I="227" N="Darien, King of Keldor"/><C I="226" N="Sythis, Harvest Hand"/><C I="225" N="Tazri, Stalwart Surviror"/><C I="224" N="Floppy Ghost Rider (case)"/><C I="223" N="Floppy Ghost Rider"/><C I="222" N="Artist Talent"/><C I="221" N="Floppy Nightmare on Elm Street (case)"/><C I="220" N="Floppy Nightmare on Elm Street"/><C I="219" N="Gameboy Color (Pikachu)"/><C I="218" N="Floppy Eldritch Saint"/><C I="217" N="Elenda, the Dusk Rose"/><C I="216" N="Two Cards"/><C I="215" N="Marchesa, Dealer of Death"/><C I="214" N="Lord Xander, the Collector"/><C I="213" N="Prosper, Tome-Bound"/><C I="212" N="Jodah, the Unifier"/><C I="211" N="Nalia de'Arnise"/><C I="210" N="Necroko"/><C I="209" N="Niv-Mizzet Reborn"/><C I="208" N="Niv-Mizzet, the Firemind"/><C I="207" N="Realmwalker"/><C I="206" N="Sol Ring"/><C I="205" N="SoulHerder"/><C I="204" N="Toxrill, the Corrosive"/><C I="203" N="Cabal Coffers+Urborg, Tomb of Yawgmoth"/><C I="202" N="Wrath of God"/><C I="201" N="Dark ritual berserk"/><C I="200" N="Hero's downfall"/><C I="199" N="Hero's downfall"/><C I="198" N="Painted on Floppy 1"/><C I="197" N="Floppy Serial Experiments Lain"/><C I="196" N="Alesha, Who Smiles at Death"/><C I="195" N="Phage the Untouchable"/><C I="194" N="Spiders"/><C I="193" N="Thunder Dragon"/><C I="192" N="Zhulodok, Void Gorger"/><C I="191" N="Dragonlord Dromoka"/><C I="190" N="Fiery Emancipation"/><C I="189" N="Go-Shintai of Life's Origin"/><C I="188" N="Mirage Mirror"/><C I="187" N="Nexus of Fate"/><C I="186" N="Olivia Voldaren"/><C I="185" N="Gishath, Sun's Avatar"/><C I="184" N="Shelob, Child of Ungoliant"/><C I="183" N="Syr Konrad, the Grim"/><C I="182" N="Diabolic Intent"/><C I="181" N="Solitary Confinement"/><C I="180" N="Jin-Gitaxias, Progress Tyrant"/><C I="179" N="Yawgmoth's Vile Offering"/><C I="178" N="Zur the Enchanter"/><C I="177" N="Sol Ring"/><C I="176" N="Strefan, Maurer Progenitor"/><C I="175" N="Bane of the Living"/><C I="174" N="Rakdos, the Showstopper"/><C I="173" N="Rankle, Master of Pranks"/><C I="172" N="Ponder"/><C I="171" N="Ponder"/><C I="170" N="Ponder"/><C I="169" N="Ponder"/><C I="168" N="Bloom Tender"/><C I="167" N="Jace, the Mind Sculptor"/><C I="166" N="Xyris, the Writhing Storm"/><C I="165" N="Nature's Lore"/><C I="163" N="Jeska, Thrice Reborn"/><C I="162" N="Tymna the Weaver"/><C I="160" N="Gisela, Blade of Goldnight"/><C I="159" N="Lutri, the Spellchaser"/><C I="158" N="Muldrotha, the Gravetide"/><C I="157" N="Omnath, Locus of Rage"/><C I="156" N="Dark Ritual"/><C I="155" N="Kardur, Doomscourge"/><C I="154" N="Sakashima of a Thousand Faces"/><C I="153" N="Krark, the Thumbless"/><C I="152" N="Brisela, Voice of Nightmares"/><C I="151" N="Bruna, the Fading Light"/><C I="150" N="Gisela, the Broken Blade"/><C I="149" N="Havengul Lich"/><C I="148" N="Goblin Sharpshooter"/><C I="147" N="Groudon"/><C I="146" N="Kardur, Doomscourge"/><C I="145" N="Kalain, Reclusive Painter"/><C I="144" N="Sol Ring"/><C I="143" N="Sol Ring"/><C I="142" N="Tamiyo, Compleated Sage"/><C I="141" N="Erebos, God of the Dead"/><C I="140" N="Feather, the Redeemed"/><C I="139" N="Lurrus of the Dream-Den"/><C I="138" N="Kogla, the Titan Ape"/><C I="137" N="Ilharg, the Raze-Boar"/><C I="136" N="Blightsteel Colossus"/><C I="135" N="Sol Ring"/><C I="134" N="Oracle of Mul Daya"/><C I="133" N="Xantcha, Sleeper Agent"/><C I="132" N="Sol Ring"/><C I="131" N="Jodah, Archmage Eternal"/><C I="130" N="Genesis Ultimatum"/><C I="129" N="Sol Ring"/><C I="128" N="Counterspell"/><C I="127" N="Anger"/><C I="126" N="Oona, Queen of the Fae"/><C I="125" N="Yuriko, the Tiger's Shadow"/><C I="124" N="Cold Storage"/><C I="123" N="Ishkanah, Grafwidow"/><C I="122" N="Sygg, River Cutthroat"/><C I="121" N="Aminatou, the Fateshifter"/><C I="120" N="Scion of the Ur-Dragon"/><C I="119" N="Zaxara, the Exemplary"/><C I="118" N="Gisela, Blade of Goldnight"/><C I="117" N="Thalia, Heretic Cathar"/><C I="116" N="Laboratory Maniac"/><C I="115" N="Idol of Oblivion"/><C I="114" N="Banisher Priest"/><C I="113" N="Lutri, the Spellchaser"/><C I="112" N="Dragonlord Atarka"/><C I="111" N="Olivia, Crimson Bride"/><C I="110" N="Sol Ring"/><C I="109" N="Enlightened Tutor"/><C I="108" N="Kresh the Bloodbraided"/><C I="107" N="The Prismatic Bridge"/><C I="106" N="Opposition Agent"/><C I="105" N="Dark Ritual"/><C I="104" N="Genesis Storm"/><C I="103" N="Body Double"/><C I="102" N="Tergrid, God of Fright"/><C I="101" N="Arixmethes, Slumbering Isle"/></Cards>`;
const URLRoot="https://it.fiverr.com/damaride/alter-magic-the-gathering-cards";
const table=document.getElementById('myTable');
const totalCards=document.getElementById('totalCards');
const modal=document.getElementById('myModal');
const modalImg=document.getElementById("img01");
const caption_md=document.getElementById("caption_md");
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
var bMobile=false;
var imgW=192;
var imgH=266;
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
   cell.innerHTML="<img src='"+CardID+".webp' alt='"+CardID+"' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;cursor:zoom-in;' title=\""+CardID+" "+CardNAME+"\""+(CardCnt>lazyLimit?" loading='lazy'":"")+"><font size='1'><br><a href='"+CardURL+"'>"+CardNAME+"</font></a>";
   cell.addEventListener('click',function(){
   myPopup(this);
   });
  }
 }
 totalCards.innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" Handpainted Cards & Floppy Disks";
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
   imgH=266;
  }
  else
   imgH=Math.round(imgW*1.38);
 }
}