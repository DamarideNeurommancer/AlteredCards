var input=document.getElementById("myInput");
var table=document.getElementById('myTable');
var totalCards=document.getElementById('totalCards');
const obj=document.getElementById('center-header');
const modal=document.getElementById('myModal');
const modalImg=document.getElementById("img01");
const captionText=document.getElementById("caption");
const scryfall=document.getElementById("scryfall");
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
const myContent=document.getElementById('myContent');
const defaultTab=document.getElementById("defaultTab");
const imgGeo=document.getElementById("imgGeo");
const captionGeo=document.getElementById("captionGeo");
const geoLink=document.getElementById("geoLink");
const imgOrigDNA=document.getElementById("imgOrigDNA");
const captionDNA=document.getElementById("captionDNA");
const myTabs=document.getElementById("myTabs");

const imgDNAColor=document.getElementById("imgDNAColor");
const imgDNABW=document.getElementById("imgDNABW");
const DNASeq=document.getElementById("DNASeq");
const DNASeqLbl=document.getElementById("DNASeqLbl");

const imgOrigAA=document.getElementById("imgOrigAA");
const captionAA=document.getElementById("captionAA");
const imgAAColor=document.getElementById("imgAAColor");
const imgAABW=document.getElementById("imgAABW");
const AASeqLbl=document.getElementById("AASeqLbl");
const AASeq=document.getElementById("AASeq");
const imgDNASample=document.getElementById("imgDNASample");
const imgAASample=document.getElementById("imgAASample");
const imgDNA_CGR=document.getElementById("imgDNA_CGR");
const captionDNA_CGR=document.getElementById("captionDNA_CGR");
const myBtnAASample=document.getElementById("myBtnAASample");

const MusicalScore=document.getElementById("MusicalScore");
const divTune=document.getElementById("musicnotation");
const canvasTune=document.getElementById("musicCanvas");
const myBtnTune=document.getElementById("myBtnTune");
const myChkReverse=document.getElementById('myChkReverse');
const VFLicense=document.getElementById('VFLicense');

const nucleotidesBits=[["00","A"],["01","C"],["10","G"],["11","T"]];
const CODONS=[
  "TTT", "TTC", "TTA", "TTG", "TCT",
  "TCC", "TCA", "TCG", "TAT", "TAC", "TGT", "TGC", "TGG", "CTT",
  "CTC", "CTA", "CTG", "CCT", "CCC", "CCA", "CCG", "CAT", "CAC",
  "CAA", "CAG", "CGT", "CGC", "CGA", "CGG", "ATT", "ATC", "ATA",
  "ATG", "ACT", "ACC", "ACA", "ACG", "AAT", "AAC", "AAA", "AAG",
  "AGT", "AGC", "AGA", "AGG", "GTT", "GTC", "GTA", "GTG", "GCT",
  "GCC", "GCA", "GCG", "GAT", "GAC", "GAA", "GAG", "GGT", "GGC",
  "GGA", "GGG" ];

const AMINOS_PER_CODON=[
  "F", "F", "L", "L", "S", "S",
  "S", "S", "Y", "Y", "C", "C", "W", "L", "L", "L", "L", "P", "P",
  "P", "P", "H", "H", "Q", "Q", "R", "R", "R", "R", "I", "I", "I",
  "M", "T", "T", "T", "T", "N", "N", "K", "K", "S", "S", "R", "R",
  "V", "V", "V", "V", "A", "A", "A", "A", "D", "D", "E", "E", "G",
  "G", "G", "G"];
const wmt="\u00A9 DamarideNeurommancer";          
const CGR_DOC="https://www.meity.gov.in/writereaddata/files/Bio-sewuence_AlpanaDey.pdf";
const VFLink="The graphical rendering of this musical score was drawn by \u00A9 Vex Flow. <a href='https://github.com/0xfe/vexflow/blob/master/LICENSE' target='_blank'>License</a>";
const waves=["sine","square","sawtooth","triangle"];
var bMobile=isMobile();
defaultTab.click();
function mySearch(){
 var filter;
 filter=input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();

 if(bxmlParsed==false){myParseCards();}
 table.innerHTML="";   
 prevIx=null;
 prevTr=null;
 var CardCnt=0;
 var row,cell;

 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  if( CardID<=100)
   continue;
  var CardNAME=book.attributes[1].nodeValue;
  
  if(CardNAME.toUpperCase().indexOf(filter) > -1 || CardID==filter){
   var bIsCard=true;
   if(book.attributes[2].nodeValue.startsWith("https"))
    bIsCard=false;
   var CardURL=(bIsCard?URLRoot:"")+book.attributes[2].nodeValue;
  
   CardCnt++;
   row=table.insertRow(-1);
   row.addEventListener('click',function(){
    selectRow(this,'selected');
   });

   cell=row.insertCell(-1);
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(bIsCard?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+(bIsCard?"40":"80")+"px;height:52px;border-radius:2px;align:center;' title=\""+CardID+" "+CardNAME+"\"></a>"
   cell=row.insertCell(-1);
   cell.innerHTML="<font size='1' style='padding: 4px'>"+CardID+"</font>";
    
   cell=row.insertCell(-1);
   cell.innerHTML="<font size='2' style='padding: 4px;'>"+CardNAME+"</font>";
  }
 }
 totalCards.innerHTML="<font size='1'>Found "+CardCnt+(CardCnt!=totXmlCards?" of "+totXmlCards:"")+" cards in AlterSleeves";
 if(CardCnt>0){
  showRow(0);
 }
 else
  obj.style.backgroundImage="";
 defaultTab.click(); 
 window.scrollTo(0,0);
}

let prevIx=null;
let prevTr=null;
function selectRow(tr,className){
 let ix=tr.rowIndex;
 if(ix===prevIx){;}
 else{
  if(prevTr){
   prevTr.className=prevTr.className.replace(className,"");
  }
  tr.className+=className;
  prevIx=ix;
  prevTr=tr;
  MusicalScore.innerText="";
  MusicalScore.innerHTML="";
  VFLicense.innerHTML="";
  //divTune.innerHTML="";
  let tempCanvas=canvasTune.getContext('2d');
  tempCanvas.clearRect(0,0,tempCanvas.canvas.width,tempCanvas.canvas.height);
  mySave();
 }   
 var imgurl=tr.querySelector('img').getAttribute('src');
 obj.style.backgroundImage="url('"+ imgurl+"')";
 //document.body.style.cursor='wait';
 table.style.cursor='wait';
 showOriginalImages();
 table.style.cursor='default';
 //document.body.style.cursor='default';  
}

function myHelp(){
 var sHelp ="Search by Card-Name or Card-ID that is a numeric value.\nAll cards are displayed when a blank search field is given.\nYou can hit 'RETURN' at the end of input text avoiding 'Search' button.\nClick on Card-Id/Card-Name columns in cards list to get 'DNA Image' and 'AminoAcids Image' and 'Geo Position' of selected card. Then move to the correspondent tab to view the results.\nIn the tabs, clicking on the images you open a 'Zoom In' popup.";
 try{
  var imgurl=prevTr.querySelector('img').getAttribute('src');
  var url=prevTr.querySelector('a').getAttribute('href');
  var imgtitle=prevTr.querySelector('img').getAttribute('title');  
  Swal.fire({    
   title: "<span><a style='color:Blue' href='"+url+"'>"+imgtitle+"</a></span>",
   html: "<span style='color:Black'><b>"+sHelp.replaceAll('\n','<br>')+"</b></span>",
   imageUrl: imgurl,
   imageWidth: 80,
   imageHeight: 104,
   confirmButtonColor: "Black",
   padding: 1,
  })
 }
 catch{
  alert(sHelp);
 }
}

document.onkeydown=function (e){
 var currRow=prevIx;
 var totRows=table.rows.length;
 var rowMaster=null;
 var offset=-240;
 if(totRows > 0){
  switch (e.key){
   case 'ArrowUp':
    if(currRow>0){
     showRow(currRow-1);

     rowMaster=table.rows[currRow];
     rowMaster.scrollIntoView(true,{behavior: "smooth"});
     if(currRow>=totRows-5)
      offset=-20;
     window.scrollBy(0,offset);
    }
    break;
   case 'ArrowDown':
    if(currRow<totRows){
     showRow(currRow+1);

     rowMaster=table.rows[currRow];
     rowMaster.scrollIntoView(true,{behavior: "smooth"});
     if(currRow >= totRows-5)
      offset=-20;
     window.scrollBy(0,offset);
    }              
    break;
   case 'Home':
    showRow(0);
    rowMaster=table.rows[0];
    rowMaster.scrollIntoView(true,{behavior: "smooth"});
    window.scrollBy(0,-200);             
    break;
   case 'End':
    showRow(totRows-1);
    rowMaster=table.rows[totRows-1];
    rowMaster.scrollIntoView(true,{behavior: "smooth"});
    window.scrollBy(0,-200);            
    break;
  }
 }
};

function myPopup(){
 if(prevTr===null)
  return;
 var img=prevTr.querySelector('img').getAttribute('src');
 var imgtitle=prevTr.querySelector('img').getAttribute('title'); 
 var url=prevTr.querySelector('a').getAttribute('href'); 
 modal.style.paddingTop="100px";
 modal.style.display="block";
 modalImg.src=img;
 modalImg.alt=imgtitle;
 modalImg.style.borderRadius="20px";
 captionText.innerHTML="<a href='"+url+"' style='font-size: 16px;'>"+modalImg.alt+"</a>";
 var result=imgtitle.indexOf(" ");
 var scryCard=imgtitle.substring(result+1);
 scryfall.innerHTML="<a href='https://scryfall.com/search?q=!\""+scryCard.replaceAll("'","%27").replaceAll("&","%26")+"\"' style='font-size: 12px;'><img src='Scryfall.ico' alt='Scryfall' style='width:12px;height:12px;vertical-align:middle;'> Scryfall</a>";
}

var span=document.getElementsByClassName("close")[0];
span.onclick=function(){ 
 modal.style.display="none";
}

function openNav(){
 myContent.style.marginLeft="181px";
 myTabs.style.marginLeft="181px";
 sideBar.style.width="180px";
 main.style.marginLeft="180px";
}

function closeNav(){
 sideBar.style.width="0";
 main.style.marginLeft="0";
 myContent.style.marginLeft="0px";
 myTabs.style.marginLeft="0px";
}

document.addEventListener('click',function handleClickOutside(event){
 if(!main.contains(event.target)){
  closeNav();
 }
});

let shareData={
 title: "",
 text: "",
 url: "",
}
async function myShare()
{
 if(prevTr===null)
  return;
 var _imgtitle=prevTr.querySelector('img').getAttribute('title'); 
 var _url=prevTr.querySelector('a').getAttribute('href');
 shareData={
  title: "AlterSleeves Link",
  text: _imgtitle,
  url: _url,
 }
 if(navigator.canShare&&navigator.canShare(shareData)){
  await navigator.share(shareData);
 }
}

function mySimilar()
{
 if(prevTr===null)
  return;
 var imgtitle=prevTr.querySelector('img').getAttribute('title');
 var result=imgtitle.indexOf(" ");
 var cardID=imgtitle.substr(0,result);
 location.href="SearchByImage.html?id="+cardID;
}


function openTab(evt, tabName) {
  var i,tabcontent,tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent=document.getElementsByClassName("tabcontent");
  for(i=0;i<tabcontent.length;i++){
    tabcontent[i].style.display="none";
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks=document.getElementsByClassName("tablinks");
  for(i=0;i<tablinks.length;i++){
    tablinks[i].className=tablinks[i].className.replace(" active", "");
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display="block";
  evt.currentTarget.className+=" active";
  if(tabName=="List"){
   try{
    if(prevIx!=null){
     showRow(prevIx);
     table.rows[prevIx].scrollIntoView(true,{behavior:"smooth"});
     window.scrollBy(0,-240);
    }
  }
  catch{;}
 }
 else
  window.scrollTo(0,0);
}

function showRow(index){
 selectRow(table.rows[index],'selected');
}

function showOriginalImages(){
 showCardImage(imgGeo,192,266,captionGeo);
 showCardImage(imgOrigDNA,192,266,captionDNA);
 showCardImage(imgOrigAA,192,266,captionAA); 
}

function showCardImage(elem,w,h,caption,title=""){
 if(prevTr===null)
  return;
 var img=prevTr.querySelector('img').getAttribute('src');
 var imgtitle=prevTr.querySelector('img').getAttribute('title'); 
 var url=prevTr.querySelector('a').getAttribute('href');
 
 elem.style.borderRadius="20px";   
 elem.style.display="block";
 elem.src=img;
 elem.title=title==""?imgtitle:title;
 elem.style.width=w+"px";
 elem.style.height=h+"px";
 elem.alt=imgtitle;
 if(caption!=null)
  caption.innerHTML="<a href='"+url+"' style='font-size: 16px;margin:20px;'>"+elem.alt+"</a>";
}


imgGeo.addEventListener('load',function(){
 var hashCode=hashArtImage(imgGeo);
 geoLink.innerHTML="<a href='"+getGoogleMapsLink(hashCode)+"' style='font-size: 18px;'><img src='forward-arrow-icon.png' alt='Geo Link' style='width:16px;height:16px;text-decoration:underline;'> Altered Card Geo Position</a>";  
});

function getGoogleMapsLink(hashCode){
  var firstHalfHash=hashCode.substring(0,9);
  var secondHalfHash=hashCode.substring(9,18);
  var frazFirstHalf=hashCode.substring(18,27);
  var frazSecondHalf=hashCode.substring(27);
  var dddLat=parseInt("0x"+firstHalfHash,16);
  var dddLon=parseInt("0x"+secondHalfHash,16);
  var dddLatFraz=parseInt("0x"+frazFirstHalf,16).toString().substring(0,2);
  var dddLonFraz=parseInt("0x"+frazSecondHalf,16).toString().substring(0,2);
  var c1=(dddLat%180.0);
  if(c1>90.0){
   c1-=180.0;
  }
  else if(c1<=-90.0){
   c1+=180.0;
  }
  var c2=(dddLon%360.0);
  if(c2>180.0){
   c2-=360.0;
  }
  else if (c2 <= -180.0){
   c2+=360.0;
  }
  var lastC1=c1+"."+dddLatFraz;
  var lastC2=c2+"."+dddLonFraz;
  var gmapslink="https://www.google.com/maps?q="+lastC1+","+lastC2+"&ll="+lastC1+","+lastC2+"&z=1&t=k";
  return(gmapslink);
}

function getArtImageData(originalImage){
 const canvas=document.createElement("canvas");
 const context=canvas.getContext("2d",{willReadFrequently:true});
 const sx=25;
 const sy=53;
 const croppedWidth=301;
 const croppedHeight=220;
 canvas.width=croppedWidth;
 canvas.height=croppedHeight;
 context.drawImage(originalImage,sx,sy,croppedWidth,croppedHeight,0,0,croppedWidth,croppedHeight);
 return(context.getImageData(0,0,canvas.width,canvas.height));
}

function hashArtImage(originalImage){
 var data=getArtImageData(originalImage);
 return(bmvbhash_even(data,12));  
}

function bmvbhash_even(data,bits) {
 let blocksize_x=Math.floor(data.width/bits);
 let blocksize_y=Math.floor(data.height/bits);

 let result=[];
 for(let y=0;y<bits;y++){
  for(let x=0;x<bits;x++){
   let total=0;

   for(let iy=0;iy<blocksize_y;iy++){
    for(let ix=0;ix<blocksize_x;ix++){
     let cx=x*blocksize_x+ix;
     let cy=y*blocksize_y+iy;
     let ii=(cy*data.width+cx)*4;

     let alpha=data.data[ii+3];
     if(alpha===0){
       total+=765;
     }else{
      total+=data.data[ii]+data.data[ii+1]+data.data[ii+2];
     }
    }
   }
   result.push(total);
  }
 }
 this.translate_blocks_to_bits(result,blocksize_x*blocksize_y); 
  return this.bits_to_hexhash(result);
}

function median(data){
 let mdarr=data.slice(0);
 mdarr.sort(function(a,b){ 
  return a-b; 
 });
 if(mdarr.length%2===0){
  return(mdarr[mdarr.length/2]+mdarr[mdarr.length/2+1])/2.0;
 }
 return mdarr[Math.floor(mdarr.length/2)];
}
function translate_blocks_to_bits(blocks,pixels_per_block){
 let half_block_value=pixels_per_block*256*3/2;
 let bandsize=blocks.length/4;
 for(let i=0;i<4;i++){
  let m=this.median(blocks.slice(i*bandsize,(i+1)*bandsize));
  for(let j=i*bandsize;j<(i+1)*bandsize;j++){
   let v=blocks[j];
   blocks[j]=Number(v>m||(Math.abs(v-m)<1&&m>half_block_value));
  }
 }
}

function bits_to_hexhash( bits ) {
 let hex=[];
 for(let i=0;i<bits.length;i+=4){
  let nibble=bits.slice(i,i+4);
  hex.push(parseInt(nibble.join(''),2).toString(16));
 }
 return hex.join('');
}

async function createDNA(originalImage){
 var data=getArtImageData(originalImage);
 var seqDNA=getDNASequence(data);
 DNASeqLbl.innerHTML="DNA Sequence: "+(seqDNA.length)+ " nucleotides";
 DNASeq.innerHTML=seqDNA;
 await drawDNA(originalImage,seqDNA);
}

function getDNASequence(imageData){ 
 var seq="";
 var bits="";
 let pixels=imageData.data;
 let cnt=0;
 for(var i=0;i<pixels.length;i+=4){
 cnt++;
  const r=pixels[i];
  const g=pixels[i+1];
  const b=pixels[i+2];
  const rb=dec2bin(r);
  const gb=dec2bin(g);
  const bb=dec2bin(b);
  bits+=rb.substring(6,8);
  bits+=gb.substring(6,8);
  bits+=bb.substring(7,8);
 }
 seq=conv2nucleotides(bits);
 return(seq);  
}

const zeroPad=(num,places)=>String(num).padStart(places,'0');
function conv2nucleotides(val)
{
 const group=2;
 const last_sextet=val.length-group;
 var sextet="";
 var outSeq="";
 for(var start=0;start<=last_sextet;start+=group){
  sextet=val.substring(start,start+group);
  for(var j=0;j<nucleotidesBits.length;j++){
   if(sextet==nucleotidesBits[j][0]){
    outSeq+=nucleotidesBits[j][1];
   }
  }
 }
 return(outSeq);
}

function dec2bin(dec){
 return zeroPad((dec>>>0).toString(2),8);
}

async function drawDNA(originalImage,nucleotides){
 const canvas=document.createElement("canvas");
 const context=canvas.getContext("2d",{willReadFrequently:true});
 const w=340;
 const h=488;
 canvas.width=w;
 canvas.height=h;
 context.drawImage(originalImage,0,0,w,h,0,0,w,h);
 var data=context.getImageData(0,0,canvas.width,canvas.height);
 var data1=DNA2Image(data,nucleotides);
 setImage('imgDNAColor',data1,"Black",14,70);
 setImage('imgDNABW',emboss(canny(data1)),"Red",14,70);
 var imgtitle=prevTr.querySelector('img').getAttribute('title');
 imgDNAColor.title=imgtitle+"\n(DNA Image)";
 imgDNABW.title=imgtitle+"\n(DNA Paths)";
 // Should be requested by user...
 DNAsample(nucleotides);
 DNAsampleEx(nucleotides);
 //New
 var data2=DNASample2Image(nucleotides);
 setImage('imgDNASample',data2,"White",14,70);
 imgDNASample.title=imgtitle+"\n(DNA Sample)";
 clearCGR();
}

function DNA2Image(imgData,nucleotides){
 var tempData=imgData;
 var len=nucleotides.length;
 var r,g,b;
 var p;
 for(var i=0;i<len;i++){
  const n=nucleotides[i];
  switch(n){
   case 'A':
    r=255;
    g=0;
    b=0;
    break;
   case 'C':
    r=255;
    g=234;
    b=0;
    break;
   case 'G':
     r=0;
     g=255;
     b=0;
    break;
   case 'T':
     r=0;
     g=0;
     b=255;
    break;
  }
  p=i*4;
  tempData.data[p]  =r;
  tempData.data[p+1]=g;
  tempData.data[p+2]=b;
 }  
 return tempData;
}

function myPopupDNAC(){
 myPopupCanvas(imgDNAColor,"DNA Image");
}
function myPopupDNABW(){
 myPopupCanvas(imgDNABW,"DNA Paths");
}

function myPopupCanvas(canvasId,title){
 if(prevTr===null)
  return;  
 var imgtitle=prevTr.querySelector('img').getAttribute('title');
 var url=prevTr.querySelector('a').getAttribute('href');
 var imgOrig=prevTr.querySelector('img').getAttribute('src');
 modal.style.paddingTop="100px";
 if(canvasId.id==="imgDNASample"||canvasId.id==="imgAASample"){
  modal.style.paddingTop="2px";
 }
 modal.style.display="block";
 modalImg.style.borderRadius="0px"; 
 modalImg.src=canvasId.toDataURL();
 modalImg.alt=imgtitle;
 modalImg.title=imgtitle+(title?"\n("+title+")":"");
 
 captionText.innerHTML="<a href='"+url+"' style='font-size: 16px;'>"+imgtitle+"</a>";
 scryfall.innerHTML="<a href='"+url+"' style='font-size: 16px;'><img src='"+imgOrig+"' alt='"+imgtitle+"' style='width:60px;height:84px;vertical-align:middle;border-radius:6px' title='"+imgtitle+"'></a>";
}

function setImage(canvasId,data,wmC="white",wmFS=14,wx=20){
 let tempCanvas=document.getElementById(canvasId).getContext('2d');
 tempCanvas.canvas.width=data.width;
 tempCanvas.canvas.height=data.height;
 tempCanvas.clearRect(0,0,tempCanvas.canvas.width,tempCanvas.canvas.height);
 tempCanvas.putImageData(data,0,0);
 
 //var cw=tempCanvas.canvas.width;
 var ch=tempCanvas.canvas.height;
 tempCanvas.font=wmFS+"px verdana";
 tempCanvas.fillStyle=wmC;
 tempCanvas.fillText(wmt,wx,ch-20);
}

imgOrigDNA.addEventListener('load',function(){
 createDNA(imgOrigDNA);
});

imgOrigAA.addEventListener('load',function(){
 createAA(imgOrigAA);
});

async function createAA(originalImage){
 var seqDNA="";
 if(DNASeq!=null&&DNASeq.innerHTML!=""&&DNASeq.innerHTML.length>0)
  seqDNA=DNASeq.innerHTML;
 else{
  var data=getArtImageData(originalImage);
  seqDNA=getDNASequence(data);
 }
 var seqAA=getAminoAcids(seqDNA); 
 AASeqLbl.innerHTML="Amino Acids Sequence: "+(seqAA.length)+ " amino acids";
 AASeq.innerText=seqAA;
 await drawAA(originalImage,seqAA);
}

function getAminoAcids(seqDNA){
 var seqLen=seqDNA.length;
 if((seqLen%3)!=0){ 
  var delta=3-(seqLen%3); 
  seqDNA.padEnd(delta,' ');
  seqLen=seqDNA.length;
 }
 var aaSeq="";
 for(var i=0;i<seqLen;i+=3){
  aaSeq+=codonToAminoAcid(seqDNA.substr(i,3));
 }
 return aaSeq;
}

function codonToAminoAcid(codon){
 for(var k=0;k<CODONS.length;k++){
  if(CODONS[k]==codon){
   return AMINOS_PER_CODON[k];
  }
 }
 // never reach here with valid codon
 return "-";
}

async function drawAA(originalImage,codons){
 const canvas=document.createElement("canvas");
 const context=canvas.getContext("2d",{willReadFrequently:true});
 const w=200;
 const h=276;
 canvas.width=w;
 canvas.height=h;
 context.drawImage(originalImage,0,0,w,h,0,0,w,h);
 var data=context.getImageData(0,0,canvas.width,canvas.height);
 var data1=AA2Image(data,codons)
 setImage('imgAAColor',data1,"Blue",10);
 setImage('imgAABW',emboss(canny(data1)),"Red",10);
 var imgtitle=prevTr.querySelector('img').getAttribute('title');
 imgAAColor.title=imgtitle+"\n(Amino Acids Image)";
 imgAABW.title=imgtitle+"\n(Amino Acids Paths)";
}

function AA2Image(imgData,codons){
 var tempData=imgData;
 var len=codons.length;
 var r,g,b;
 var p;
 for(var i=0;i<len;i++){
  const c=codons[i];
  switch(c){
   case 'H': //histidine 255,128,193
    r=255;
    g=128;
    b=193;
    break;
   case 'E': //glutamic acid 255,162,128
    r=255;
    g=162;
    b=128;
    break;
   case 'D': //aspartic acid 255,193,128
    r=255;
    g=193;
    b=128;
    break;
   case 'K': //lysine 255,128,227
    r=255;
    g=128;
    b=227;
    break;
   case 'C': //cysteine 249,255,128
    r=249;
    g=255;
    b=128;
    break;
   case 'G': //glycine 217,255,128
    r=217;
    g=255;
    b=128;
    break;
   case 'A': //alanine 183,255,128
    r=183;
    g=255;
    b=128;
    break;
   case 'V': //valine 128,255,138
    r=128;
    g=255;
    b=138;
    break;
   case 'L': //leucine 128,255,172
    r=128;
    g=255;
    b=172;
    break;
   case 'I': //isoleucine 128,255,206
    r=128;
    g=255;
    b=206;
    break;
   case 'F': //phenylalanine 128,255,238
    r=128;
    g=255;
    b=238;
    break;
   case 'W': //tryptophan 128,238,255
    r=128;
    g=238;
    b=255;
    break;
   case 'S': //serine 128,206,255
    r=128;
    g=206;
    b=255;
      break;
   case 'T': //threonine 128,172,255
    r=128;
    g=172;
    b=255;
    break;
   case 'Q': //glutamine 149,128,255
    r=149;
    g=128;
    b=255;
    break;
   case 'N': //asparagine 183,128,255
    r=183;
    g=128;
    b=255;
    break;
   case 'Y': //tyrosine 217,128,255
    r=217;
    g=128;
    b=255;
    break;
   case 'R': //arginine 249,128,255
    r=249;
    g=128;
    b=255;
    break;
   case 'P': //proline 255,128,162
    r=255;
    g=128;
    b=162;
    break;
   case 'M': //methionine 149,255,128
    r=149;
    g=255;
    b=128;
    break;
   case '-': //Stop (Ochre ) 255,128,128 or (Amber) 255,227,128 or (Opal) 128,128,255
    r=255; 
    g=128; 
    b=128; 
    break;
   default: // Default white
    r=255;
    g=255;
    b=255;
    break;
  }
  p=i*4;
  tempData.data[p]  =r;
  tempData.data[p+1]=g;
  tempData.data[p+2]=b;
 }  
 return tempData;
}

function myPopupAAC(){
 myPopupCanvas(imgAAColor,"Amino Acids Image");
}
function myPopupAABW(){
 myPopupCanvas(imgAABW,"Amino Acids Paths");
}

function complementReverseDNA(nucleotides){
 // Complement&Reverse DNA only not RNA
 if(nucleotides.indexOf("U")>-1)
  return nucleotides;
 var len=nucleotides.length;
 var complement="";
 for(var i=0;i<len;i++){
  const n=nucleotides[i];
  switch(n){
   case 'A':
    complement='T'+complement;
    break;
   case 'T':
    complement='A'+complement;
    break;
   case 'G':
    complement='C'+complement;
    break;
   case 'C':
    complement='G'+complement;
    break;
   default:
    complement='N'+complement;
    break;    
  }
 }
 return(complement);
}

function myReverseDNA(){
 if(DNASeq!=null&&DNASeq.innerHTML!=""&&DNASeq.innerHTML.length>0){
   DNASeq.innerHTML=complementReverseDNA(DNASeq.innerHTML);   
 }
}

function DNAsample(nucleotides){
 if(DNASeq!=null&&DNASeq.innerHTML!=""&&DNASeq.innerHTML.length>0){
  var html="<pre>&#x1F52C; DNA Sample\n";
  var len=nucleotides.length;
  const maxLen=800;
  colorDNA=document.getElementById('colorDNA');
  for(var i=0;i<maxLen&&i<len;i++){
   const n=nucleotides[i];
   switch(n){
    case 'A':
     html+="<span class='nct cA'>A</span>";
     break;
    case 'C':
     html+="<span class='nct cC'>C</span>";
     break;
    case 'G':
     html+="<span class='nct cG'>G</span>"; 
     break;
    case 'T':
     html+="<span class='nct cT'>T</span>"; 
     break;
   }
   if((i+1)%40==0)
    html+="\n"; 
 }
  html+="</pre>";  
  colorDNA.innerHTML=html;
 }
}

function myDNA2RNA(){
 if(DNASeq!=null&&DNASeq.innerHTML!=""&&DNASeq.innerHTML.length>0){
  var nucleotides=DNASeq.innerHTML;
  if(nucleotides.indexOf('A')>-1)
   DNASeq.innerHTML=DNASeq.innerHTML.replaceAll('A','U');
  else
   DNASeq.innerHTML=DNASeq.innerHTML.replaceAll('U','A');
 }
}

function DNAsampleEx(nucleotides){
 if(DNASeq!=null&&DNASeq.innerHTML!=""&&DNASeq.innerHTML.length>0){
  var html="<pre>&#x1F9EA; DNA Sample\n";
  var len=nucleotides.length;
  const maxLen=390;
  colorDNA2=document.getElementById('colorDNA2');
  for(var i=0;i<maxLen&&i<len;i++){
   const n=nucleotides[i];
   switch(n){
    case 'A':
     html+="<span class='nct cA'>__</span>";
     break;
    case 'C':
     html+="<span class='nct cC'>__</span>";
     break;
    case 'G':
     html+="<span class='nct cG'>__</span>"; 
     break;
    case 'T':
     html+="<span class='nct cT'>__</span>"; 
     break;
   }
   if((i+1)%3==0&&(i+1)%15!=0)
    html+="__";
   if((i+1)%15==0)
    html+="\n"; 
 }
  html+="</pre>";  
  colorDNA2.innerHTML=html;
 }
}

function DNASample2Image(nucleotides){
 const canvas=document.createElement("canvas");
 const ctx=canvas.getContext("2d",{willReadFrequently:true});
 const w=350;
 const h=746;
 canvas.width=w;
 canvas.height=h; 
 ctx.fillStyle="black";
 ctx.fillRect(0,0,canvas.width, canvas.height);
 const PI2=2*Math.PI;
 var p=0; //nucletodes index
 var color;
 for(var y=5; y<740;y+=8){
  for(var x=5; x<344;x+=8){
    const n=nucleotides[p];
    switch(n){
     case 'A':color="red";break;
     case 'C':color="yellow";break;
     case 'G':color="green";break;
     case 'T':color="blue";break;
    }
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,3,0,PI2);
    ctx.fill();
    p++;
   }
 }
 return(ctx.getImageData(0,0,canvas.width,canvas.height));
}  

function myPopupDNASample(){
 myPopupCanvas(imgDNASample,"DNA Sample");
}

function aaSample(){
 if(AASeq!=null&&AASeq.innerHTML!=""&&AASeq.innerHTML.length>0){
  myBtnAASample.style.cursor='wait';
  var data=AASample2Image(AASeq.innerHTML);
  setImage('imgAASample',data,"White",14,70);
  var imgtitle=prevTr.querySelector('img').getAttribute('title');
  imgAASample.title=imgtitle+"\n(Amino Acids Sample)"
  myBtnAASample.style.cursor='default'; 
 }
}

function AASample2Image(codons){
 const canvas=document.createElement("canvas");
 const ctx=canvas.getContext("2d",{willReadFrequently:true});
 const w=350;
 const h=746;
 canvas.width=w;
 canvas.height=h; 
 ctx.fillStyle="black";
 ctx.fillRect(0,0,canvas.width, canvas.height);
 
 var startp=getRndStartCodonsSeq(codons.length)-3956; //0;
 if( startp<0)
  startp=0;
 var p=startp; //aa index
 var cnt=0;
 var color;
 const PI2=2*Math.PI;
 for(var y=5; y<740;y+=8){
  for(var x=5; x<344;x+=8){
   const c=codons[p];
   switch(c){
    case 'H': //histidine 255,128,193
     color="rgb(255,128,193)";break;
    case 'E': //glutamic acid 255,162,128
     color="rgb(255,162,128)";break;
    case 'D': //aspartic acid 255,193,128
     color="rgb(255,193,128)";break;
    case 'K': //lysine 255,128,227
     color="rgb(255,128,227)";break;
    case 'C': //cysteine 249,255,128
     color="rgb(249,255,128)";break;
    case 'G': //glycine 217,255,128
     color="rgb(217,255,128)";break;
    case 'A': //alanine 183,255,128
     color="rgb(183,255,128)";break;
    case 'V': //valine 128,255,138
     color="rgb(128,255,138)";break;
    case 'L': //leucine 128,255,172
     color="rgb(128,255,172)";break;
    case 'I': //isoleucine 128,255,206
     color="rgb(128,255,206)";break;
    case 'F': //phenylalanine 128,255,238
     color="rgb(128,255,238)";break;
    case 'W': //tryptophan 128,238,255
     color="rgb(128,238,255)";break;
    case 'S': //serine 128,206,255
     color="rgb(128,206,255)";break;
    case 'T': //threonine 128,172,255
     color="rgb(128,172,255)";break;
    case 'Q': //glutamine 149,128,255
     color="rgb(149,128,255)";break;
    case 'N': //asparagine 183,128,255
     color="rgb(183,128,255)";break;
    case 'Y': //tyrosine 217,128,255
     color="rgb(217,128,255)";break;
    case 'R': //arginine 249,128,255
     color="rgb(249,128,255)";break;
    case 'P': //proline 255,128,162
     color="rgb(255,128,162)";break;
    case 'M': //methionine 149,255,128
     color="rgb(149,255,128)";break;
    case '-': //Stop (Ochre ) 255,128,128 or (Amber) 255,227,128 or (Opal) 128,128,255
     color="rgb(255,128,128)";break;
    default: // Default white
     color="rgb(255,255,255)";break;
   }
   ctx.fillStyle=color;
   ctx.beginPath();
   ctx.arc(x,y,3,0,PI2);
   ctx.fill();
   p++;
   cnt++;
  }
 }
 captionAASample.innerHTML="&#x1F9EA; AA Sample (start at: "+startp+" length: "+cnt+" )";
 return(ctx.getImageData(0,0,canvas.width,canvas.height));
}

function myPopupAASample(){
 myPopupCanvas(imgAASample,"DNA Image");
}

function getRndStartCodonsSeq(max){
 return(Math.floor(Math.random()*max));
}


function myDNA_CGR(){
 if(DNASeq!=null&&DNASeq.innerHTML!=""&&DNASeq.innerHTML.length>0){
  const canvas=document.createElement("canvas");
  const ctx=canvas.getContext("2d",{willReadFrequently:true});
  const w=418;
  const h=418;
  const half=w/2;
  const PI2=2*Math.PI;
  const cYellow="yellow";
  const cGreen="green";
  const cRed="red";
  const cBlue="blue";
  canvas.width=w;
  canvas.height=h; 
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.font="14px verdana";
  // C
  ctx.fillStyle=cYellow;
  ctx.beginPath();
  ctx.arc(5,5,5,0,PI2);
  ctx.fill();  
  ctx.fillText("C",14,10);  
  ctx.strokeStyle=cYellow;
  ctx.moveTo(11,  11);
  ctx.lineTo(half,11)
  ctx.stroke(); 
  ctx.moveTo(11,11);
  ctx.lineTo(11,half)
  ctx.stroke();
  
  // A
  ctx.fillStyle=cRed;
  ctx.beginPath();
  ctx.arc(5,412,5,0,PI2);
  ctx.fill();
  ctx.fillText("A",12,417);
  ctx.strokeStyle=cRed;
  ctx.moveTo(11,  407);
  ctx.lineTo(half,407)
  ctx.stroke();
  ctx.moveTo(11,407);
  ctx.lineTo(11,half)
  ctx.stroke();
  
  //G
  ctx.fillStyle=cGreen;
  ctx.beginPath();
  ctx.arc(412,5,5,0,PI2);
  ctx.fill();
  ctx.fillText("G",392,10);
  ctx.strokeStyle=cGreen;
  ctx.moveTo(407, 11);
  ctx.lineTo(half,11)
  ctx.stroke();
  ctx.moveTo(407,11);
  ctx.lineTo(407,half)
  ctx.stroke();
  
  // T
  ctx.fillStyle=cBlue;
  ctx.beginPath();
  ctx.arc(412,412,5,0,PI2);
  ctx.fill();
  ctx.fillText("T",396,417);
  ctx.strokeStyle=cBlue;
  ctx.moveTo(407,407);
  ctx.lineTo(407,half)
  ctx.stroke();
  ctx.moveTo(407, 407);
  ctx.lineTo(half,407)
  ctx.stroke();
  
  // Cross
  ctx.setLineDash([5,5]);
  ctx.strokeStyle="white";
  ctx.beginPath();
  ctx.moveTo(half-1,  0);
  ctx.lineTo(half-1,417)
  ctx.stroke();
  ctx.moveTo(0,  half-1);
  ctx.lineTo(417,half-1);
  ctx.stroke();
  ctx.closePath();
  
  var x1=208;
  var y1=208;
  var x2,y2,pX,pY;
  const Cx=11;
  const Cy=11;
  const Ax=11;
  const Ay=407;
  const Gx=407;
  const Gy=11;
  const Bx=407;
  const By=407;
  
  var color; 
  var nucleotides=DNASeq.innerHTML;
  var len=16555; //nucleotides.length;
  for(var i=0;i<len;i++){
   const n=nucleotides[i];
   switch(n){
    case 'A':color=cRed;x2=Ax;y2=Ay;break;
    case 'C':color=cYellow;x2=Cx;y2=Cy;break;
    case 'G':color=cGreen;x2=Gx;y2=Gy; break;
    case 'T':color=cBlue;x2=Bx;y2=By;break;
   }
   pX=(x1+x2)/2;
   pY=(y1+y2)/2;
   ctx.fillStyle=color;
   ctx.fillRect(pX,pY,1,1);
   x1=pX;
   y1=pY;
  }
  
  var data=ctx.getImageData(0,0,canvas.width,canvas.height);
  setImage('imgDNA_CGR',data,"White",10,130);
  var imgtitle=prevTr.querySelector('img').getAttribute('title');
  imgDNA_CGR.title=imgtitle+"\n(DNA - Chaos Game Representation)"
  captionDNA_CGR.innerHTML="<a href='"+CGR_DOC+"'>DNA - Chaos Game Representation<br>Sample of 16555 nucleotides (10%)</a>";
 }
}

function clearCGR(){
 const ctx=imgDNA_CGR.getContext("2d",{willReadFrequently:true});
 ctx.fillStyle="black";
 ctx.fillRect(0,0,imgDNA_CGR.width, imgDNA_CGR.height);
 captionDNA_CGR.innerHTML=""; 
}

function myPopupDNA_CGR(){
 myPopupCanvas(imgDNA_CGR,"DNA - Chaos Game Representation");
}

/*//--
function fileToDataUri(field){
 return new Promise((resolve) => {
  const reader=new FileReader();
  reader.addEventListener("load", () => {
   resolve(reader.result);
  });
  reader.readAsDataURL(field);
 });
}

function handleFiles1(files){
 files=[...files];
 files.forEach(manageFile1);
}

async function manageFile1(file){ //DNA 
 const ID=file.name.split('.')[0];
 imgOrigDNA.id=ID;
 imgOrigDNA.title=file.name;
 console.log("*Image: "+file.name)
 imgOrigDNA.alt="";
 imgOrigDNA.addEventListener("load",async function(){
  createDNA(imgOrigDNA);
 });
 imgOrigDNA.src=await fileToDataUri(file);
}

function handleFiles2(files){ //AA
 files=[...files];
 files.forEach(manageFile2);
}

async function manageFile2(file){ 
 const ID=file.name.split('.')[0];
 imgOrigAA.id=ID;
 imgOrigAA.title=file.name;
 console.log("*Image: "+file.name)
 imgOrigAA.alt="";
 imgOrigAA.addEventListener("load",async function(){
  createAA(imgOrigAA);
 });
 imgOrigAA.src=await fileToDataUri(file); 
}

function handleFiles(files){ //Geo
 files=[...files];
 files.forEach(manageFile);
}

async function manageFile(file){ 
const ID=file.name.split('.')[0];
 imgGeo.id=ID;
 imgGeo.title=file.name;
 //console.log("*Image: "+file.name)
 imgGeo.alt="";
 imgGeo.addEventListener("load",async function(){
  var hashCode=hashArtImage(imgGeo);
  geoLink.innerHTML="<a href='"+getGoogleMapsLink(hashCode)+"' style='font-size: 18px;'><img src='forward-arrow-icon.png' alt='Geo Link' style='width:16px;height:16px;'> Altered Card Geo Position</a>";
 });
 imgGeo.src=await fileToDataUri(file);  
}
//---*/

async function myTune(){
 if(prevTr===null)
  return;
 myBtnTune.style.cursor='wait';
 myBtnTune.disabled=true;
 MusicalScore.innerHTML="\u{1F3BC}";
 var imgtitle=prevTr.querySelector('img').getAttribute('title'); 
 var result=imgtitle.indexOf(" ");
 var cardName=imgtitle.substring(result+1);
 if(myChkReverse.checked){
  var rv="";
  for(var i=0;i<cardName.length;i++){
    rv=cardName[i]+rv;
  }
  cardName=rv;
 }
 MusicalScore.innerHTML=await tuneUp(cardName,400,waves[getRadioValue()]);
 canvasTune.title=imgtitle+" \u{1F3BC}";
 setScoreName(imgtitle);
 VFLicense.innerHTML=VFLink;
 myBtnTune.disabled=false;
 myBtnTune.style.cursor='default';
}

function setScoreName(name){
 let tempCanvas=canvasTune.getContext('2d');
 var ch=canvasTune.height;
 var cw=canvasTune.width;
 tempCanvas.font="12px verdana";
 tempCanvas.fillStyle="blue";
 if(!bMobile){
  tempCanvas.fillText(name,40,18);
  tempCanvas.fillText(wmt,40,ch-14);
  tempCanvas.font="8px verdana";
  tempCanvas.fillText("Score drawn by \u00A9 Vex Flow",cw-130,ch-14);
 }
 else{
  tempCanvas.fillText(name+" "+wmt,40,18);
  tempCanvas.font="8px verdana";
  tempCanvas.fillText("Score drawn by \u00A9 Vex Flow",cw-130,18);
 }
}

function myInit(){
 initVars();
 if(bxmlParsed==false){myParseCards();}
 var filter=localStorage.getItem("MiscFilter");
 if(filter!=""&&filter!=null&&filter!="undefined"){
  input.value=filter;
 }
 var savedPrevIx=localStorage.getItem("MiscIndex");
 mySearch();
 if(savedPrevIx!=""&&savedPrevIx!=null&&savedPrevIx!="undefined"){
  prevIx=savedPrevIx;
  var totRows=table.rows.length;
  if(totRows>0){
   showRow(prevIx);
   table.rows[prevIx].scrollIntoView(true,{behavior:"smooth"});
   window.scrollBy(0,-240);
  }
 }
}
function initVars(){
 table=document.getElementById('myTable');
 totalCards=document.getElementById('totalCards');
}
function mySave(){
 try{
  localStorage.setItem("MiscFilter",input.value);
  localStorage.setItem("MiscIndex",prevIx);
 }
 catch(err){console.log(err);} 
}
function getRadioValue(){
 var lev=document.getElementsByName('wave');
 var val=0;
 for(i=0;i<lev.length;i++) {
  if (lev[i].checked){
   val=lev[i].value;
   break;
  }
 }
 return(val);
}
function isMobile(){
 return(window.orientation!=null&&window.orientation!="undefined");
}