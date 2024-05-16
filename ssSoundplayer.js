// Original JavaScript code by Chirp Internet: www.chirpinternet.eu
// Please acknowledge use of this code by including this header.
function SoundPlayer(audioContext, filterNode){
 this.audioCtx = audioContext;
 this.gainNode = this.audioCtx.createGain();
 if(filterNode){
  // run output through extra filter (already connected to audioContext)
  this.gainNode.connect(filterNode);
 } else {
   this.gainNode.connect(this.audioCtx.destination);
 }
 this.oscillator = null;
}

SoundPlayer.prototype.setFrequency = function(val, when){
 if(this.oscillator !== null){
  if(when){
   this.oscillator.frequency.setValueAtTime(val, this.audioCtx.currentTime + when);
  } else {
    this.oscillator.frequency.setValueAtTime(val, this.audioCtx.currentTime);
  }
 }
 return this;
};

SoundPlayer.prototype.setVolume = function(val, when){
 if(when){
  this.gainNode.gain.exponentialRampToValueAtTime(val, this.audioCtx.currentTime + when);
 } else {
   this.gainNode.gain.setValueAtTime(val, this.audioCtx.currentTime);
 }
 return this;
};

SoundPlayer.prototype.setWaveType = function(waveType){
 this.oscillator.type = waveType;
 return this;
};

SoundPlayer.prototype.play = function(freq, vol, wave, when){
 this.oscillator = this.audioCtx.createOscillator();
 this.oscillator.connect(this.gainNode);
 this.setFrequency(freq);
 if(wave){
  this.setWaveType(wave);
 }
 this.setVolume(1/1000);

 if(when){
  this.setVolume(1/1000, when - 0.02);
  this.oscillator.start(when - 0.02);
  this.setVolume(vol, when);
 } else {
   this.oscillator.start();
   this.setVolume(vol, 0.02);
 }
 return this;
};

SoundPlayer.prototype.stop = function(when){
  if(when){
    this.gainNode.gain.setTargetAtTime(1/1000, this.audioCtx.currentTime + when - 0.05, 0.02);
    this.oscillator.stop(this.audioCtx.currentTime + when);
  } else {
    this.gainNode.gain.setTargetAtTime(1/1000, this.audioCtx.currentTime, 0.02);
    this.oscillator.stop(this.audioCtx.currentTime + 0.05);
  }
  return this;
};

// MyCode
const AudioContext=window.AudioContext||window.webkitAudioContext;
const audio=new AudioContext();
// https://www.michaelnorris.info/theory/frequencytonoteconverter
const arFreqEx=[
[261.626,'C','4'], //DO
[277.180,'C#','4'],//DO# Do Diesis
[293.665,'D','4'], //RE
[311.127,'Eb','4'],//RE#
[329.628,'E','4'], //MI
[349.228,'F','4'], //FA
[369.994,'F#','4'],//FA#
[391.995,'G','4'], //SOL 
[415.305,'G#','4'],//SOL#    
[440.000,'A','4'], //LA 
[466.164,'Bb','4'],//LA#    
[493.883,'B','4'], //SI 
[523.251,'C','5'],   
[554.365,'C#','5'],
[587.330,'D','5'],   
[622.254,'Eb','5'],
[659.255,'E','5'],   
[698.457,'F','5'],   
[739.989,'F#','5'],
[783.991,'G','5'],   
[830.609,'G#','5'],
[880.000,'A','5'],  
[932.328,'Bb','5'],
[987.767,'B','5'],   
[1046.500,'C','6'],   
[1108.730,'C#','6']
]                

function sleep(ms){
 return new Promise(resolve => setTimeout(resolve, ms))
}

async function tuneUp(text,wait=500,wave="square"){
 const compressor=audio.createDynamicsCompressor();
 compressor.connect(audio.destination);
 const len=text.length;
 for(var i=0;i<len;i++){
  var c=text.charCodeAt(i);
  /*
  if(c<65||c>90){
   switch(c){
    case 32:
    case 44:c=81;break;//Q
    default:
     c+=17;
     //c=65;
     break;
   }
  }
  var freqIdx=c-65;
  */
  var freqIdx=Math.round(randomRange(0,25));
  //Score
  const frequency=(arFreqEx[freqIdx][0]);
  var when=0.95;
  if(c==51)
   when=1.40;
  (new SoundPlayer(audio,compressor)).play(frequency,0.5,wave).stop(when);
  await sleep(wait);
 }
}

//const randomRange = (min, max) => min + Math.random() * (max - min)