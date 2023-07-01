var bxmlParsed = false;
var xmlDoc;
const xmlCards=`<Cards><C I="182" N="Diabolic Intent"/><C I="181" N="Solitary Confinement"/><C I="180" N="Jin-Gitaxias, Progress Tyrant"/><C I="179" N="Yawgmoth's Vile Offering"/><C I="178" N="Zur the Enchanter"/><C I="177" N="Sol Ring"/><C I="176" N="Strefan, Maurer Progenitor"/><C I="175" N="Bane of the Living"/><C I="174" N="Rakdos, the Showstopper"/><C I="173" N="Rankle, Master of Pranks"/><C I="172" N="Ponder"/><C I="171" N="Ponder"/><C I="170" N="Ponder"/><C I="169" N="Ponder"/><C I="168" N="Bloom Tender"/><C I="167" N="Jace, the Mind Sculptor"/><C I="166" N="Xyris, the Writhing Storm"/><C I="165" N="Nature's Lore"/><C I="163" N="Jeska, Thrice Reborn"/><C I="162" N="Tymna the Weaver"/><C I="160" N="Gisela, Blade of Goldnight"/><C I="159" N="Lutri, the Spellchaser"/><C I="158" N="Muldrotha, the Gravetide"/><C I="157" N="Omnath, Locus of Rage"/><C I="156" N="Dark Ritual"/><C I="155" N="Kardur, Doomscourge"/><C I="154" N="Sakashima of a Thousand Faces"/><C I="153" N="Krark, the Thumbless"/><C I="152" N="Brisela, Voice of Nightmares"/><C I="151" N="Bruna, the Fading Light"/><C I="150" N="Gisela, the Broken Blade"/><C I="149" N="Havengul Lich"/><C I="148" N="Goblin Sharpshooter"/><C I="147" N="Groudon"/><C I="146" N="Kardur, Doomscourge"/><C I="145" N="Kalain, Reclusive Painter"/><C I="144" N="Sol Ring"/><C I="143" N="Sol Ring"/><C I="142" N="Tamiyo, Compleated Sage"/><C I="141" N="Erebos, God of the Dead"/><C I="140" N="Feather, the Redeemed"/><C I="139" N="Lurrus of the Dream-Den"/><C I="138" N="Kogla, the Titan Ape"/><C I="137" N="Ilharg, the Raze-Boar"/><C I="136" N="Blightsteel Colossus"/><C I="135" N="Sol Ring"/><C I="134" N="Oracle of Mul Daya"/><C I="133" N="Xantcha, Sleeper Agent"/><C I="132" N="Sol Ring"/><C I="131" N="Jodah, Archmage Eternal"/><C I="130" N="Genesis Ultimatum"/><C I="129" N="Sol Ring"/><C I="128" N="Counterspell"/><C I="127" N="Anger"/><C I="126" N="Oona, Queen of the Fae"/><C I="125" N="Yuriko, the Tiger's Shadow"/><C I="124" N="Cold Storage"/><C I="123" N="Ishkanah, Grafwidow"/><C I="122" N="Sygg, River Cutthroat"/><C I="121" N="Aminatou, the Fateshifter"/><C I="120" N="Scion of the Ur-Dragon"/><C I="119" N="Zaxara, the Exemplary"/><C I="118" N="Gisela, Blade of Goldnight"/><C I="117" N="Thalia, Heretic Cathar"/><C I="116" N="Laboratory Maniac"/><C I="115" N="Idol of Oblivion"/><C I="114" N="Banisher Priest"/><C I="113" N="Lutri, the Spellchaser"/><C I="112" N="Dragonlord Atarka"/><C I="111" N="Olivia, Crimson Bride"/><C I="110" N="Sol Ring"/><C I="109" N="Enlightened Tutor"/><C I="108" N="Kresh the Bloodbraided"/><C I="107" N="The Prismatic Bridge"/><C I="106" N="Opposition Agent"/><C I="105" N="Dark Ritual"/><C I="104" N="Genesis Storm"/><C I="103" N="Body Double"/><C I="102" N="Tergrid, God of Fright"/><C I="101" N="Arixmethes, Slumbering Isle"/></Cards>`;
const URLRoot="https://it.fiverr.com/damaride/alter-magic-the-gathering-cards?context_referrer=user_page&ref_ctx_id=bf208436bdf1d46283696517f5c20e55&pckg_id=1&pos=1&imp_id=c0474e78-cfcb-49cf-ab6e-7a349ee67037";
const table=document.getElementById('myTable');
const totalCards=document.getElementById('totalCards');
const modal=document.getElementById('myModal');
const modalImg=document.getElementById("img01");
const caption_md=document.getElementById("caption_md");

function myParseCards(){
 var parser = new DOMParser();
 xmlDoc = parser.parseFromString(xmlCards,"text/xml");
 bxmlParsed = true;
}

function mySearch(){
 var input, filter;
 if( bxmlParsed == false){
   myParseCards();
 } 
 input = document.getElementById("myInput");
 filter = input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
 table.innerHTML = "";
 var CardCnt = 0;
 var catalog = xmlDoc.getElementsByTagName('Cards')[0];
 var totXmlCards = catalog.childElementCount;
 var nCols = 3;
 var row, cell;
 for (var i = 0; i < totXmlCards; i++){
  var book = catalog.childNodes[i];
  var CardID = book.attributes[0].nodeValue;
  var CardNAME = book.attributes[1].nodeValue;
  if (CardNAME.toUpperCase().indexOf(filter) > -1 || CardID == filter){
   var CardURL = URLRoot;
   CardCnt++;
   if ((CardCnt % nCols == 1) || nCols == 1)
    row = table.insertRow(-1);
   else
    row = table.rows[table.rows.length-1];

   cell = row.insertCell(-1);
   cell.innerHTML = "<img src='"+ CardID +".webp' alt='" +CardID + "' style='width:192px;height:266px;border-radius:10px;cursor:zoom-in;' title=\"" +CardID + " " + CardNAME + "\"><font size='1'><br><a href='" + CardURL + "'>" + CardNAME + "</font></a>";
   cell.addEventListener('click', function() {
   myPopup(this);
   });
  }
 }
 totalCards.innerHTML = "<font size='1'>Found " + CardCnt + (CardCnt!=totXmlCards?  " of " + totXmlCards: "") + " Handpainted Cards";
 window.scrollTo(0, 0);
}

function myHelp(){
 var sHelp = "Search by Card-Name or Card-ID.\nCard-ID is a numeric value shown in the tooltip.\nWhen searching by Card-ID you get the card and all its related cards if any.\nAll cards are displayed when a blank search field is given.\nYou can hit 'RETURN' at the end of input text avoiding 'Search' button.\nClick on a card to zoom in.";
 try{
  Swal.fire({
   title: "<span style='color:Black'>" +"DamarideNeurommancer",
   html: "<span style='color:Black'><b>" + sHelp.replaceAll('\n','<br>')+ "</b>",
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{
  alert(sHelp);
 }
}

window.onscroll = function(){myFunction()};
var header = document.getElementById('myHeader');
var sticky = header.offsetTop;
function myFunction(){
 if (window.pageYOffset > sticky) {
   header.classList.add('sticky');
 } else {
   header.classList.remove('sticky');
 }
}

function myPopup(x){
 var img = x.querySelector('img').getAttribute('src');
 var imgtitle = x.querySelector('img').getAttribute('title'); 
 var url = URLRoot;
 modal.style.display = "block";
 modalImg.src = img;
 modalImg.alt = imgtitle;
 caption_md.innerHTML = "<a href='" + url + "' style='font-size: 16px;'>" +modalImg.alt + "</a>";
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function(){ 
 modal.style.display = "none";
}
