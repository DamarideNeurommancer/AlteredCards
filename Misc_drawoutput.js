function drawOutput(output){
 VF=Vex.Flow;
 var lineArray=output.split("\n");
 var numRows=lineArray.length;
 var numNotes=0;
 var headers=lineArray[0].split("\t");
 var numCols=headers.length;
 var noteNameCol=1;
 var octaveCol=2;
 var renderer = new Vex.Flow.Renderer(canvasTune,VF.Renderer.Backends.CANVAS);
 renderer.resize(800,140); 
 var context=renderer.getContext();  
 context.setFont("Arial",10,"").setBackgroundFillStyle("#eed");
 var stave=new VF.Stave(10,10,750);
 stave.addTimeSignature("4/4");
 var firstClef="";
 var currClef="";
 var noteArray=new Array;
 var textArray=new Array;
 var ottava;
 for(var i=1;i<numRows;i++){
  var row=lineArray[i];
	var data=row.split("\t");
	if(data.length==numCols){	
	 var acc="n";
	 var noteStr=data[noteNameCol].trim();
	 var octave=data[octaveCol].trim();
	 var noteName=noteStr.charAt(0);
	 if(noteStr.length>1){
	  acc=noteStr.charAt(1);
	 }
	 var key;
	 if(octave>6){				
	 	key=noteName+"/"+(octave-1);
		ottava=new VF.TextNote({text:'8va',font: {family:'Times New Roman',size:12,weight:''},duration:'q'}).setLine(-2).setStave(stave).setJustification(VF.TextNote.Justification.LEFT);
		textArray.push(ottava);
	} else {
		key=noteName+"/"+octave;
		ottava=new VF.TextNote({text:'',font: {family:'Times New Roman',size:12,weight:''},duration:'q'}).setLine(1).setStave(stave).setJustification(VF.TextNote.Justification.LEFT);
		textArray.push(ottava);
	}
	var theClef="treble";
	if(octave<4) theClef="bass";
	 if(theClef!=currClef){
		if(firstClef==""){
	 	firstClef=theClef;
		stave.addClef(theClef);
	 } else {
		 var clef=new VF.ClefNote(theClef,"small");
		 noteArray.push(clef);
	 }
	 currClef=theClef;
	}
	var note=new VF.StaveNote({clef:theClef,keys:[key],duration:"q",auto_stem:true});
	if(acc!="") note.addAccidental(0,new VF.Accidental(acc));
	 noteArray.push(note);
	 numNotes ++;
	}
 }
 var voice=new VF.Voice({num_beats: numNotes, beat_value: 4}).addTickables(noteArray);
 var textVoice=new VF.Voice({num_beats:numNotes,beat_value:4}).addTickables(textArray);
 stave.setContext(context).draw();
 textArray.forEach(function(b){b.setContext(context)})
 var formatter=new VF.Formatter().joinVoices([voice,textVoice]).format([voice,textVoice],600);
 voice.draw(context,stave);
 for(var l=0;l<numNotes;l++){
 	var y=noteArray[l].getYs()[0];
	var line=-2;
	if(y < 70){
	 line=(y-80)/8;
	}
	textArray[l].setLine(line);
 }
 textArray.forEach(function(b){b.draw()});
}
