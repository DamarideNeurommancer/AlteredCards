var input=document.getElementById("myInput");
const table=document.getElementById('myTable');
const totalCards=document.getElementById('totalCards');
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
const seqLength=document.getElementById("seqLength");
const DNASeq=document.getElementById("DNASeq");

const nucleotidesBits=[["00","A"],["01","C"],["10","G"],["11","T"]];

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
 
   cell=row.insertCell(-1);
   cell.innerHTML="<font size='1' style='visibility:hidden;'>"+i+"</font>";
   cell.innerText=i;
   cell.nodeValue=i;
   cell.hidden=true;
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
 }   
 var imgurl=tr.querySelector('img').getAttribute('src');
 obj.style.backgroundImage="url('"+ imgurl+"')";
 // Da qui devi chiamare il caricamento delle immagini originali
 showOriginalImages();  
}

function myHelp(){
 var sHelp ="Search by Card-Name or Card-ID that is a numeric value.\nWhen searching by Card-ID you get the card and all its related cards if any.\nAll cards are displayed when a blank search field is given.\nYou can hit 'RETURN' at the end of input text avoiding 'Search' button.\nClick on Card-Id/Card-Name columns in cards list to get the image of that card and its related cards in the bottom panel (horizontally scrollable).In the 'Zoom In' popup you have links to Alter Sleeves and to Scryfall";
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
 modal.style.display="block";
 modalImg.src=img;
 modalImg.alt=imgtitle;
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

/*function mySimilar()
{
 if(prevTr===null)
  return;
 var imgtitle=prevTr.querySelector('img').getAttribute('title');
 var result=imgtitle.indexOf(" ");
 var cardID=imgtitle.substr(0,result);
 location.href="SearchByImage.html?id="+cardID;
}*/


function openTab(evt, tabName) {
  // Declare all variables
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
  if(tabName=="Search"){
   try{
    if(prevIx!=null){
     showRow(prevIx);
     table.rows[prevIx].scrollIntoView(true,{behavior:"smooth"});
     window.scrollBy(0,-240);
    }
  }
  catch{;}
 }
}

function showRow(index){
 selectRow(table.rows[index],'selected');
}

function showOriginalImages(){
 showCardImage(imgGeo,192,266,captionGeo);
 showCardImage(imgOrigDNA,192,266,captionDNA);
 showCardImage(imgDNAColor,192,266,null,"DNA Color");
 showCardImage(imgDNABW,192,266,null,"DNA Paths");
}

function showCardImage(elem,w,h,caption,title=""){
 if(prevTr===null)
  return;
 var img=prevTr.querySelector('img').getAttribute('src');
 var imgtitle=prevTr.querySelector('img').getAttribute('title'); 
 var url=prevTr.querySelector('a').getAttribute('href');
    
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
  geoLink.innerHTML="<a href='"+getGoogleMapsLink(hashCode)+"' style='font-size: 18px;'><img src='forward-arrow-icon.png' alt='Geo Link' style='width:16px;height:16px;'> Geo Position</a>";
});

function getGoogleMapsLink(hashCode){
  var firstHalfHash=hashCode.substring(0,9);
  var secondHalfHash=hashCode.substring(9,18);
  var frazFirstHalf=hashCode.substring(18,27);
  var frazSecondHalf=hashCode.substring(27);
  var dddLat=parseInt("0x"+firstHalfHash,16);
  var dddLon=parseInt("0x"+secondHalfHash,16);
  var dddLatFraz=parseInt("0x"+frazFirstHalf,16);
  var dddLonFraz=parseInt("0x"+frazSecondHalf,16);
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
  var gmapslink="https://www.google.com/maps?q="+lastC1+","+lastC2+"&ll="+lastC1+","+lastC2+"&z=1";
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

 let result = [];
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

 // Compare medians across four horizontal bands
 for(let i=0;i<4;i++){
  let m=this.median(blocks.slice(i*bandsize,(i+1)*bandsize));
      
  for(let j=i*bandsize;j<(i+1)*bandsize;j++){
   let v=blocks[j];
   // Output a 1 if the block is brighter than the median.
   // With images dominated by black or white, the median may
   // end up being 0 or the max value, and thus having a lot
   // of blocks of value equal to the median.  To avoid
   // generating hashes of all zeros or ones, in that case output
   // 0 if the median is in the lower value space, 1 otherwise
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
    
function handleFiles(files){
 files=[...files];
 files.forEach(manageFile);
}

async function manageFile(file){
let img=document.createElement('img')
 const ID=file.name.split('.')[0];
 img.id=ID;
 img.title=file.name;
 img.alt="";
 img.addEventListener("load",async function(){
  var hashCode=hashArtImage(img);
  geoLink.innerHTML="<a href='"+getGoogleMapsLink(hashCode)+"' style='font-size: 18px;'><img src='forward-arrow-icon.png' alt='Geo Link' style='width:16px;height:16px;'> Geo Position</a>";
 });
 img.src=await fileToDataUri(file);
}

function fileToDataUri(field){
 return new Promise((resolve) => {
  const reader=new FileReader();
  reader.addEventListener("load", () => {
   resolve(reader.result);
  });
  reader.readAsDataURL(field);
 });
}  

async function createDNA(originalImage){
 var data=getArtImageData(originalImage);
 var seqDNA=getDNASequence(data);
 seqLength.innerHTML="Length: "+(seqDNA.length)+ " nucleotides";
 DNASeq.innerHTML=seqDNA;
 imgDNAColor.src=await drawDNA(originalImage,seqDNA);
 imgDNABW.src=await drawDNABW(imgDNAColor);
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
  //seq+=conv2nucleotides(rb)+conv2nucleotides(gb)+conv2nucleotides(bb);
 }
 seq=conv2nucleotides(bits);
 //console.log("I: "+i + "pixels.length: "+pixels.length+ " cycles:"+cnt+ " SeqLen: "+seq.length);
 return(seq);  
}

const zeroPad=(num,places)=>String(num).padStart(places,'0');
function conv2nucleotides(val)
{
 //if(val.length<8)
  //val=zeroPad(val,8);
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
 //if(outSeq.length!=4)
 // console.warn("Error val:"+val);
 return(outSeq);
}

function dec2bin(dec){
 return zeroPad((dec>>>0).toString(2),8);
}

function handleFiles1(files){
 files=[...files];
 files.forEach(manageFile1);
}

async function manageFile1(file){
let img=document.createElement('img')
 const ID=file.name.split('.')[0];
 img.id=ID;
 img.title=file.name;
 console.log("*Image: "+file.name)
 img.alt="";
 img.addEventListener("load",async function(){
  createDNA(img);
 });
 img.src=await fileToDataUri(file);
}

async function drawDNA(originalImage,nucleotides){
 const canvas=document.createElement("canvas");
 const context=canvas.getContext("2d",{willReadFrequently:true});
 const w=350;
 const h=473;
 canvas.width=w;
 canvas.height=h;
 context.drawImage(originalImage,0,0,w,h,0,0,w,h);
 var data=context.getImageData(0,0,canvas.width,canvas.height);
 context.putImageData(emboss(DNA2Image(data,nucleotides)),0,0);
 return canvas.toDataURL();
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

async function drawDNABW(originalImage){
 const canvas=document.createElement("canvas");
 const context=canvas.getContext("2d",{willReadFrequently:true});
 const w=350;
 const h=473;
 canvas.width=w;
 canvas.height=h;
 context.drawImage(originalImage,0,0,w,h,0,0,w,h);
 var data=context.getImageData(0,0,canvas.width,canvas.height);
 context.putImageData(emboss(canny(data)),0,0);
 return canvas.toDataURL();
}
function myPopupDNAC(){
 myPopupDNA(imgDNAColor,"DNA Color")
}
function myPopupDNABW(){
 myPopupDNA(imgDNABW,"DNA B&W")
}

function myPopupDNA(imgDNA, title){
 if(imgDNA===null)
  return;
 var img=imgDNA.src;
 var imgtitle=title; 
 var url=""; 
 modal.style.display="block";
 modalImg.src=img;
 modalImg.alt=imgtitle;
 captionText.innerHTML="<a href='"+url+"' style='font-size: 16px;'>"+modalImg.alt+"</a>";
 scryfall.innerHTML="";
}
function drawBlurred(originalImage){
 const canvas=document.createElement("canvas");
 const context=canvas.getContext("2d",{willReadFrequently:true});
 const w=350;
 const h=488;
 canvas.width=w;
 canvas.height=h;
 context.drawImage(originalImage,0,0,w,h,0,0,w,h);
 var data=context.getImageData(0,0,canvas.width,canvas.height);
 context.putImageData(gaussianBlur(data),0,0);
 return canvas.toDataURL();
}

imgOrigDNA.addEventListener('load',function(){
  createDNA(imgOrigDNA);
});