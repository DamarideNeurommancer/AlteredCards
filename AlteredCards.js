
  var bxmlParsed = false;
  var xmlDoc, Mostra, bSpeech;
  var msgSpeech;
  var xmlCards = "<Cards>" +
`<Card CardID="366980" CardName="Scion of the Ur-Dragon" PageURL="https://www.altersleeves.com/product/c5fuqawihylr8kr/?printing_id=67694" RelatedIDs=""/>` +
`<Card CardID="364457" CardName="Xyris, the Writhing Storm" PageURL="https://www.altersleeves.com/product/u0ded9br8jcxoen/?printing_id=351978" RelatedIDs="364448;364450;"/>` +
`<Card CardID="364450" CardName="Xyris, the Writhing Storm" PageURL="https://www.altersleeves.com/product/8gu38wpsur61ut0/?printing_id=351978" RelatedIDs="364448;364457;"/>` +
`<Card CardID="364448" CardName="Xyris, the Writhing Storm" PageURL="https://www.altersleeves.com/product/d4jd4egltmixcje/?printing_id=351978" RelatedIDs="364450;364457;"/>` +
`<Card CardID="363478" CardName="Alrund, God of the Cosmos" PageURL="https://www.altersleeves.com/product/yj5d5osn8vj2fzb/?printing_id=203750" RelatedIDs="363472;153290;153291;"/>` +
`<Card CardID="363472" CardName="The Raven Man" PageURL="https://www.altersleeves.com/product/sfd7gfloz37a2ny/?printing_id=350082" RelatedIDs="363478;153290;153291;"/>` +
`<Card CardID="363342" CardName="Marit Lage" PageURL="https://www.altersleeves.com/product/faniix0k5rdatjq/?printing_id=356376" RelatedIDs="363340;"/>` +
`<Card CardID="363340" CardName="Marit Lage" PageURL="https://www.altersleeves.com/product/brwqg7vz3f0cr7v/?printing_id=356376" RelatedIDs="363342;"/>` +
`<Card CardID="363047" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/g57wdtq8vdzljdr/?printing_id=349873" RelatedIDs="363051;363049;"/>` +
`<Card CardID="363049" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/gtldwaxcvlvub4i/?printing_id=349873" RelatedIDs="363051;363047;"/>` +
`<Card CardID="363051" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/biqrcp1tlpbhami/?printing_id=349873" RelatedIDs="363049;363047;"/>` +
`<Card CardID="362492" CardName="Elesh Norn, Mother of Machines" PageURL="https://www.altersleeves.com/product/o0jjsxh014xrerq/?printing_id=348795" RelatedIDs="362494;"/>` +
`<Card CardID="362494" CardName="Elesh Norn, Mother of Machines" PageURL="https://www.altersleeves.com/product/vtxpf3msudrqzff/?printing_id=348795" RelatedIDs="362492;"/>` +
`<Card CardID="362496" CardName="Solphim, Mayhem Dominus" PageURL="https://www.altersleeves.com/product/u7xcgnouldm2nyr/?printing_id=357632" RelatedIDs=""/>` +
`<Card CardID="362500" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/qgju8sgvvzpwp2d/?printing_id=349873" RelatedIDs=""/>` +
`<Card CardID="361850" CardName="Consecrated Sphinx" PageURL="https://www.altersleeves.com/product/lxfj8iredudoxgb/?printing_id=352724" RelatedIDs="346762;"/>` +
`<Card CardID="346762" CardName="Consecrated Sphinx" PageURL="https://www.altersleeves.com/product/bay4bkqoby31qgw/?printing_id=171246" RelatedIDs="361850;"/>` +
`<Card CardID="342348" CardName="Neheb, the Eternal" PageURL="https://www.altersleeves.com/product/v8fx8uctufl2wzf/?printing_id=45413" RelatedIDs="342344;"/>` +
`<Card CardID="342344" CardName="Neheb, the Eternal" PageURL="https://www.altersleeves.com/product/dcng4y7hgehdksb/?printing_id=45413" RelatedIDs="342348;"/>` +
`<Card CardID="342342" CardName="Emrakul, the Promised End" PageURL="https://www.altersleeves.com/product/oet8rn4wdq11ykq/?printing_id=49100" RelatedIDs="342340;"/>` +
`<Card CardID="342340" CardName="Emrakul, the Promised End" PageURL="https://www.altersleeves.com/product/thdo0bkbfaqe8pb/?printing_id=49100" RelatedIDs="342342;"/>` +
`<Card CardID="342338" CardName="Ulamog, the Ceaseless Hunger" PageURL="https://www.altersleeves.com/product/2m5hyxawjs8b0v8/?printing_id=155798" RelatedIDs="342336;"/>` +
`<Card CardID="342336" CardName="Ulamog, the Ceaseless Hunger" PageURL="https://www.altersleeves.com/product/nvzvsotsiycdnsn/?printing_id=155798" RelatedIDs="342338;"/>` +
`<Card CardID="334193" CardName="It That Betrays" PageURL="https://www.altersleeves.com/product/esmtzuhwaqvk8ym/?printing_id=51302" RelatedIDs="334217;334213;334209;334197;"/>` +
`<Card CardID="334197" CardName="It That Betrays" PageURL="https://www.altersleeves.com/product/qpupupx4fmkonoe/?printing_id=51302" RelatedIDs="334217;334213;334209;334193;"/>` +
`<Card CardID="334209" CardName="It That Betrays" PageURL="https://www.altersleeves.com/product/j7g7eydejymsaqu/?printing_id=51302" RelatedIDs="334217;334213;334197;334193;"/>` +
`<Card CardID="334213" CardName="It That Betrays" PageURL="https://www.altersleeves.com/product/62ueiutk0r2rlvq/?printing_id=62994" RelatedIDs="334217;334209;334197;334193;"/>` +
`<Card CardID="334217" CardName="It That Betrays" PageURL="https://www.altersleeves.com/product/abrawthxavjet30/?printing_id=62994" RelatedIDs="334213;334209;334197;334193;"/>` +
`<Card CardID="335299" CardName="Rat Colony" PageURL="https://www.altersleeves.com/product/o6uwxgpprq27xfx/?printing_id=42935" RelatedIDs="335322;"/>` +
`<Card CardID="335322" CardName="Rat Colony" PageURL="https://www.altersleeves.com/product/ma7oislgzk06kx1/?printing_id=220171" RelatedIDs="335299;"/>` +
`<Card CardID="335311" CardName="Gyome, Master Chef" PageURL="https://www.altersleeves.com/product/zlweo8ithdl8ppv/?printing_id=191050" RelatedIDs="335326;"/>` +
`<Card CardID="335326" CardName="Gyome, Master Chef" PageURL="https://www.altersleeves.com/product/3izh3rkyjczny9x/?printing_id=191050" RelatedIDs="335311;"/>` +
`<Card CardID="337328" CardName="Kozilek, the Great Distortion" PageURL="https://www.altersleeves.com/product/8ljb816tz5s3vl1/?printing_id=50154" RelatedIDs="337332;"/>` +
`<Card CardID="337332" CardName="Kozilek, the Great Distortion" PageURL="https://www.altersleeves.com/product/2bvzox8hqtq9p2w/?printing_id=50154" RelatedIDs="337328;"/>` +
`<Card CardID="333052" CardName="Moon-Circuit Hacker" PageURL="https://www.altersleeves.com/product/vigokuyqfgobb6g/" RelatedIDs="180363;180361;"/>` +
`<Card CardID="328775" CardName="Guided Passage" PageURL="https://www.altersleeves.com/product/zq7byjnrmtqe6h6/" RelatedIDs="328771;"/>` +
`<Card CardID="328771" CardName="Guided Passage" PageURL="https://www.altersleeves.com/product/ncwj5cjvmmcbwe0/" RelatedIDs="328775;"/>` +
`<Card CardID="325594" CardName="Zurzoth, Chaos Rider" PageURL="https://www.altersleeves.com/product/ektompmvvrwwzet/" RelatedIDs=""/>` +
`<Card CardID="325590" CardName="Yennett, Cryptic Sovereign" PageURL="https://www.altersleeves.com/product/lqejdb7ls2hxnon/" RelatedIDs=""/>` +
`<Card CardID="322410" CardName="Varina, Lich Queen" PageURL="https://www.altersleeves.com/product/ihtfvaikdpnycft/" RelatedIDs="322406;"/>` +
`<Card CardID="322406" CardName="Varina, Lich Queen" PageURL="https://www.altersleeves.com/product/omwnoxeanbhuwhp/" RelatedIDs="322410;"/>` +
`<Card CardID="322367" CardName="Caged Sun" PageURL="https://www.altersleeves.com/product/sb00fpmletreiaj/" RelatedIDs=""/>` +
`<Card CardID="319824" CardName="Yarok, the Desecrated" PageURL="https://www.altersleeves.com/product/8ln9acfrzki3rgl/" RelatedIDs="319814;"/>` +
`<Card CardID="319814" CardName="Yarok, the Desecrated" PageURL="https://www.altersleeves.com/product/bwhkxrmpfbikhaz/" RelatedIDs="319824;"/>` +
`<Card CardID="319810" CardName="Void Winnower" PageURL="https://www.altersleeves.com/product/hyqd6usbsc5nfhr/" RelatedIDs="319806;"/>` +
`<Card CardID="319806" CardName="Void Winnower" PageURL="https://www.altersleeves.com/product/0k8knkdyscp51ll/" RelatedIDs="319810;"/>` +
`<Card CardID="198459" CardName="Burglar Rat" PageURL="https://www.altersleeves.com/product/0tvrxczn5t4afbz" RelatedIDs="198455;198456;198458"/>` +
`<Card CardID="198458" CardName="Burglar Rat" PageURL="https://www.altersleeves.com/product/w7v1hp3sct5fxs2" RelatedIDs="198455;198456;198459;"/>` +
`<Card CardID="198456" CardName="Burglar Rat" PageURL="https://www.altersleeves.com/product/dsomhmr2yxwh6qv" RelatedIDs="198455;198458;198459;"/>` +
`<Card CardID="198455" CardName="Burglar Rat" PageURL="https://www.altersleeves.com/product/gnjv9euvcf6aljt" RelatedIDs="198456;198458;198459;"/>` +
`<Card CardID="198108" CardName="Bitterblossom" PageURL="https://www.altersleeves.com/product/dockvpi7qlxc9ge" RelatedIDs=""/>` +
`<Card CardID="198106" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/ixdwylfqiaw4e1f" RelatedIDs="198102;198103;198105"/>` +
`<Card CardID="198105" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/fdombmarydkrhqz" RelatedIDs="198102;198103;198106;"/>` +
`<Card CardID="198103" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/hxwwvwn7ootwfum" RelatedIDs="198102;198105;198106;"/>` +
`<Card CardID="198102" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/flabijxrd4aq40a" RelatedIDs="198103;198105;198106;"/>` +
`<Card CardID="161108" CardName="Misty Rainforest" PageURL="https://www.altersleeves.com/product/g5icqbxp8vgfp3y" RelatedIDs=""/>` +
`<Card CardID="160717" CardName="Arid Mesa" PageURL="https://www.altersleeves.com/product/88d7gikscrpjvbb" RelatedIDs="160716;"/>` +
`<Card CardID="160592" CardName="Scalding Tarn" PageURL="https://www.altersleeves.com/product/c4zf2uop2whjyum" RelatedIDs=""/>` +
`<Card CardID="160425" CardName="Marsh Flats" PageURL="https://www.altersleeves.com/product/u2bzd1caziebokj" RelatedIDs=""/>` +
`<Card CardID="158655" CardName="Chains of Mephistopheles" PageURL="https://www.altersleeves.com/product/ayoq7j57styccvp" RelatedIDs=""/>` +
`<Card CardID="119791" CardName="Food" PageURL="https://www.altersleeves.com/product/hzyavkwhcm5wirv" RelatedIDs=""/>` +
`<Card CardID="222268" CardName="Jin-Gitaxias, Progress Tyrant" PageURL="https://www.altersleeves.com/product/ifx5056gsd8x7oz" RelatedIDs="222266;"/>` +
`<Card CardID="225196" CardName="Resplendent Angel" PageURL="https://www.altersleeves.com/product/8h02ev9aqbtqxtd" RelatedIDs="225202;225200;225198"/>` +
`<Card CardID="225198" CardName="Platinum Angel" PageURL="https://www.altersleeves.com/product/hsnxzqo31tbqanv" RelatedIDs="225202;225200;225196;"/>` +
`<Card CardID="225200" CardName="Resplendent Angel" PageURL="https://www.altersleeves.com/product/v8kwgi2pbpz5tdj" RelatedIDs="225202;225198;225196;"/>` +
`<Card CardID="225202" CardName="Platinum Angel" PageURL="https://www.altersleeves.com/product/dfoo313xqdcc3lb" RelatedIDs="225200;225198;225196;"/>` +
`<Card CardID="225319" CardName="Selfless Spirit" PageURL="https://www.altersleeves.com/product/olaz7yy3kfdaivr" RelatedIDs="225322;225324;225254;225252"/>` +
`<Card CardID="225252" CardName="Soulherder" PageURL="https://www.altersleeves.com/product/a7ibqgfennwv8wi" RelatedIDs="225322;225324;225254;225319;"/>` +
`<Card CardID="225254" CardName="Soulherder" PageURL="https://www.altersleeves.com/product/yvradvw0ntq888x" RelatedIDs="225322;225324;225252;225319;"/>` +
`<Card CardID="225324" CardName="Crypt Ghast" PageURL="https://www.altersleeves.com/product/db61czlly4o0kx4?printing_id=53502" RelatedIDs="225322;225254;225252;225319;"/>` +
`<Card CardID="225322" CardName="Crypt Ghast" PageURL="https://www.altersleeves.com/product/arxuxyjkm4riyr9?printing_id=53502" RelatedIDs="225324;225254;225252;225319;"/>` +
`<Card CardID="218569" CardName="Rakdos, Lord of Riots" PageURL="https://www.altersleeves.com/product/evetbvd8ihj52zp" RelatedIDs="218570;218573;218574;"/>` +
`<Card CardID="218570" CardName="Rakdos, Lord of Riots" PageURL="https://www.altersleeves.com/product/q4fdxxbdolqfci0" RelatedIDs="218569;218573;218574;"/>` +
`<Card CardID="222271" CardName="Brainstorm" PageURL="https://www.altersleeves.com/product/not4nqgvbln1fsd?printing_id=204058" RelatedIDs="222273;"/>` +
`<Card CardID="222266" CardName="Jin-Gitaxias, Progress Tyrant" PageURL="https://www.altersleeves.com/product/lvvljpfy9nzcb2a?printing_id=218852" RelatedIDs="222268;"/>` +
`<Card CardID="222273" CardName="Brainstorm" PageURL="https://www.altersleeves.com/product/ejfm7at4mpqledp?printing_id=204058" RelatedIDs="222271;"/>` +
`<Card CardID="218573" CardName="Rakdos, Lord of Riots" PageURL="https://www.altersleeves.com/product/deew20uk9wgi6ui" RelatedIDs="218569;218570;218574;"/>` +
`<Card CardID="217775" CardName="Alena, Kessig Trapper" PageURL="https://www.altersleeves.com/product/bijexgc0y4uzgdi?printing_id=166579" RelatedIDs=""/>` +
`<Card CardID="217777" CardName="Brudiclad, Telchor Engineer" PageURL="https://www.altersleeves.com/product/0txgystqidaonen?printing_id=163884" RelatedIDs=""/>` +
`<Card CardID="221452" CardName="Varina, Lich Queen" PageURL="https://www.altersleeves.com/product/fwp0ik5nfuvxkb0?printing_id=41506" RelatedIDs=""/>` +
`<Card CardID="218574" CardName="Rakdos, Lord of Riots" PageURL="https://www.altersleeves.com/product/1s2dddbrttjvj8c?printing_id=39692" RelatedIDs="218569;218570;218573;"/>` +
`<Card CardID="217773" CardName="Halana, Kessig Ranger" PageURL="https://www.altersleeves.com/product/mcr5anq1hyvztgi?printing_id=166497" RelatedIDs=""/>` +
`<Card CardID="215319" CardName="The Meathook Massacre" PageURL="https://www.altersleeves.com/product/032jdhhlo2ctviq?printing_id=203177" RelatedIDs=""/>` +
`<Card CardID="214086" CardName="Chromatic Lantern" PageURL="https://www.altersleeves.com/product/wnxbqshuc2srczi?printing_id=125975" RelatedIDs=""/>` +
`<Card CardID="214161" CardName="Extraplanar Lens" PageURL="https://www.altersleeves.com/product/dmtlmj8hzclqfnn?printing_id=71665" RelatedIDs=""/>` +
`<Card CardID="213844" CardName="Triad of Fates" PageURL="https://www.altersleeves.com/product/ertqmyqxu2ad6u2?printing_id=56249" RelatedIDs="213846;"/>` +
`<Card CardID="213846" CardName="Triad of Fates" PageURL="https://www.altersleeves.com/product/rnenozc6q0rvfnn?printing_id=56249" RelatedIDs="213844;"/>` +
`<Card CardID="172533" CardName="Mana Vault" PageURL="https://www.altersleeves.com/product/tcy8eh9wmq7uwbk" RelatedIDs="169999;170001;170456;170457;172198;172199;172534;172542;172543;"/>` +
`<Card CardID="172198" CardName="Star Compass" PageURL="https://www.altersleeves.com/product/0kn3niydon1nu7a" RelatedIDs="169999;170001;170456;170457;172199;172533;172534;172542;172543;"/>` +
`<Card CardID="170456" CardName="Chromatic Star" PageURL="https://www.altersleeves.com/product/tdtlxxtkb2hwdxz" RelatedIDs="169999;170001;170457;172198;172199;172533;172534;172542;172543;"/>` +
`<Card CardID="169999" CardName="Chromatic Star" PageURL="https://www.altersleeves.com/product/4tlzrbha2ey4nhx" RelatedIDs="170001;170456;170457;172198;172199;172533;172534;172542;172543;"/>` +
`<Card CardID="183259" CardName="Rakdos the Defiler" PageURL="https://www.altersleeves.com/product/qgflq364tfck0oc" RelatedIDs="183256;183257;183260;"/>` +
`<Card CardID="176692" CardName="Mirari's Wake" PageURL="https://www.altersleeves.com/product/tzfgklchqtkncha" RelatedIDs="176684;176686;176687;176688;176689;176690;176693;"/>` +
`<Card CardID="176690" CardName="Mirari's Wake" PageURL="https://www.altersleeves.com/product/lzia9ygbblqcs3w" RelatedIDs="176684;176686;176687;176688;176689;176692;176693;"/>` +
`<Card CardID="176684" CardName="Mirari's Wake" PageURL="https://www.altersleeves.com/product/etfftcsvj4bd4jf" RelatedIDs="176686;176687;176688;176689;176690;176692;176693;"/>` +
`<Card CardID="176333" CardName="Coffin Queen" PageURL="https://www.altersleeves.com/product/ltngbwltobfep2l" RelatedIDs="176330;176332;176334;176335;176336;"/>` +
`<Card CardID="176330" CardName="Queen Marchesa" PageURL="https://www.altersleeves.com/product/b5t6pljsmd3yvav" RelatedIDs="176332;176333;176334;176335;176336;"/>` +
`<Card CardID="177517" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/1xhvxlrs5ko2uuh" RelatedIDs="163293;163295;163643;163645;177518;177520;177521;177522;"/>` +
`<Card CardID="163295" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/k75bpe8qpghfsy2" RelatedIDs="163293;163643;163645;177517;177518;177520;177521;177522;"/>` +
`<Card CardID="163645" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/xzamtsstgolyaiy" RelatedIDs="163293;163295;163643;177517;177518;177520;177521;177522;"/>` +
`<Card CardID="189440" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/gpop2azg9diw0ui" RelatedIDs="189438;189443;189446;189448;189449;189450;189451;"/>` +
`<Card CardID="34365" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/8r31ov5w1pcqhld" RelatedIDs="154124;"/>` +
`<Card CardID="124492" CardName="Elesh Norn, Grand Cenobite" PageURL="https://www.altersleeves.com/product/ecjpcojfudiyyna" RelatedIDs="124491;"/>` +
`<Card CardID="152464" CardName="Mangara of Corondor" PageURL="https://www.altersleeves.com/product/wsbwlktocksxn6h" RelatedIDs="120595;152461;152462;152465;"/>` +
`<Card CardID="156810" CardName="Omniscience" PageURL="https://www.altersleeves.com/product/4zz1gw43dgrieme" RelatedIDs="156805;156806;156807;156808;156809;156813;156814;"/>` +
`<Card CardID="156806" CardName="Omniscience" PageURL="https://www.altersleeves.com/product/1rqdkhaixfl3qnn" RelatedIDs="156805;156807;156808;156809;156810;156813;156814;"/>` +
`<Card CardID="177467" CardName="Remand" PageURL="https://www.altersleeves.com/product/asgbtkz5nzs64h2" RelatedIDs="164984;164986;167179;167184;167187;167188;177463;177464;177499;177501;"/>` +
`<Card CardID="177464" CardName="Remand" PageURL="https://www.altersleeves.com/product/nlyzdxbestnwmlq" RelatedIDs="164984;164986;167179;167184;167187;167188;177463;177467;177499;177501;"/>` +
`<Card CardID="167188" CardName="Rhystic Study" PageURL="https://www.altersleeves.com/product/8mebhl7eprlznqf" RelatedIDs="164984;164986;167179;167184;167187;177463;177464;177467;177499;177501;"/>` +
`<Card CardID="167184" CardName="Rhystic Study" PageURL="https://www.altersleeves.com/product/bnuuqk9qjlqtsyi" RelatedIDs="164984;164986;167179;167187;167188;177463;177464;177467;177499;177501;"/>` +
`<Card CardID="164986" CardName="Rhystic Study" PageURL="https://www.altersleeves.com/product/vfqnfgtmyplvq0d" RelatedIDs="164984;167179;167184;167187;167188;177463;177464;177467;177499;177501;"/>` +
`<Card CardID="190818" CardName="Buried Alive" PageURL="https://www.altersleeves.com/product/g4ncokx7petbzcp" RelatedIDs="190817;190819;"/>` +
`<Card CardID="190817" CardName="Buried Alive" PageURL="https://www.altersleeves.com/product/1fhakeik0bebey6" RelatedIDs="190818;190819;"/>` +
`<Card CardID="167192" CardName="Sylvan Library" PageURL="https://www.altersleeves.com/product/2mpsww6halo3gxg" RelatedIDs="165322;165324;167189;167190;167191;177460;177462;"/>` +
`<Card CardID="167189" CardName="Sylvan Library" PageURL="https://www.altersleeves.com/product/h0b3pj3fgsi6ydk" RelatedIDs="165322;165324;167190;167191;167192;177460;177462;"/>` +
`<Card CardID="165322" CardName="Sylvan Library" PageURL="https://www.altersleeves.com/product/gox5xhvgyr9nw4h" RelatedIDs="165324;167189;167190;167191;167192;177460;177462;"/>` +
`<Card CardID="170008" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/9vgwpsofjkok0cz" RelatedIDs="169013;169015;170005;170006;170007;177297;177299;177300;"/>` +
`<Card CardID="170006" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/ovmuruz6ahvkqjq" RelatedIDs="169013;169015;170005;170007;170008;177297;177299;177300;"/>` +
`<Card CardID="169015" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/adia2kmq1khpbdj" RelatedIDs="169013;170005;170006;170007;170008;177297;177299;177300;"/>` +
`<Card CardID="185875" CardName="Voidmage Apprentice" PageURL="https://www.altersleeves.com/product/o8u3rqw8psd3luu" RelatedIDs="185874;185877;185879;185880;185881;"/>` +
`<Card CardID="185874" CardName="Timestream Navigator" PageURL="https://www.altersleeves.com/product/svy8jpgmmpaxqsx" RelatedIDs="185875;185877;185879;185880;185881;"/>` +
`<Card CardID="183256" CardName="Rakdos the Defiler" PageURL="https://www.altersleeves.com/product/vhlor8tnmgrmt7s" RelatedIDs="183257;183259;183260;"/>` +
`<Card CardID="177502" CardName="Wheel of Fate" PageURL="https://www.altersleeves.com/product/hbkrmel4y7h12uo" RelatedIDs="163639;163641;164285;164286;170041;170043;177503;177505;177510;"/>` +
`<Card CardID="164285" CardName="Wheel of Fortune" PageURL="https://www.altersleeves.com/product/klmjrwiiaz34nrl" RelatedIDs="163639;163641;164286;170041;170043;177502;177503;177505;177510;"/>` +
`<Card CardID="163639" CardName="Wheel of Fortune" PageURL="https://www.altersleeves.com/product/4xn0qyfhx6ibecf" RelatedIDs="163641;164285;164286;170041;170043;177502;177503;177505;177510;"/>` +
`<Card CardID="192800" CardName="Stoneforge Mystic" PageURL="https://www.altersleeves.com/product/y7aenacjcg4ie80" RelatedIDs="192799;192801;192803;192804;192806;192808;192810;"/>` +
`<Card CardID="192799" CardName="Stoneforge Mystic" PageURL="https://www.altersleeves.com/product/42o5lyi9tibxpg4" RelatedIDs="192800;192801;192803;192804;192806;192808;192810;"/>` +
`<Card CardID="154251" CardName="Verdant Catacombs" PageURL="https://www.altersleeves.com/product/s2lu0u7r4lec47o" RelatedIDs="154250;"/>` +
`<Card CardID="178029" CardName="Mana Crypt" PageURL="https://www.altersleeves.com/product/hdbs2k0npj8fgyu" RelatedIDs="178028;178031;"/>` +
`<Card CardID="178028" CardName="Mana Crypt" PageURL="https://www.altersleeves.com/product/3tfydflznjxakdy" RelatedIDs="178029;178031;"/>` +
`<Card CardID="121539" CardName="Mystical Tutor" PageURL="https://www.altersleeves.com/product/7rfqugktnareako" RelatedIDs="121537;121538;"/>` +
`<Card CardID="121538" CardName="Mystical Tutor" PageURL="https://www.altersleeves.com/product/laudttm2swlfu5x" RelatedIDs="121537;121539;"/>` +
`<Card CardID="183270" CardName="Coat of Arms" PageURL="https://www.altersleeves.com/product/xvnfnruxgpknu6o" RelatedIDs="181653;181657;183271;183272;183273;"/>` +
`<Card CardID="181653" CardName="Hatred" PageURL="https://www.altersleeves.com/product/srqrlsjtasw0n1d" RelatedIDs="181657;183270;183271;183272;183273;"/>` +
`<Card CardID="176334" CardName="Coffin Queen" PageURL="https://www.altersleeves.com/product/k6w5avnwbjdmw0r" RelatedIDs="176330;176332;176333;176335;176336;"/>` +
`<Card CardID="176332" CardName="Queen Marchesa" PageURL="https://www.altersleeves.com/product/zcj95zjre9scfmb" RelatedIDs="176330;176333;176334;176335;176336;"/>` +
`<Card CardID="177297" CardName="Phyrexian Reclamation" PageURL="https://www.altersleeves.com/product/hkc1ljnzvdc7ti6" RelatedIDs="169013;169015;170005;170006;170007;170008;177299;177300;"/>` +
`<Card CardID="170007" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/tur2shvvqbor98t" RelatedIDs="169013;169015;170005;170006;170008;177297;177299;177300;"/>` +
`<Card CardID="170005" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/2eotdmszordw5rs" RelatedIDs="169013;169015;170006;170007;170008;177297;177299;177300;"/>` +
`<Card CardID="169013" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/qqkavk5h81t6lrm" RelatedIDs="169015;170005;170006;170007;170008;177297;177299;177300;"/>` +
`<Card CardID="200564" CardName="Promise of Power" PageURL="https://www.altersleeves.com/product/t2klqu5ue0lvv0i" RelatedIDs="200554;200555;200556;200558;200560;200561;200563;200565;200567;200568;200569;"/>` +
`<Card CardID="200563" CardName="Demonic Pact" PageURL="https://www.altersleeves.com/product/klss8zje8y52lft" RelatedIDs="200554;200555;200556;200558;200560;200561;200564;200565;200567;200568;200569;"/>` +
`<Card CardID="192230" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/rt0pijpui0ogemd" RelatedIDs="192217;192221;192223;192232;192236;192237;192238;192240;192241;192242;"/>` +
`<Card CardID="192221" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/vg5axfm1n49wb8u" RelatedIDs="192217;192223;192230;192232;192236;192237;192238;192240;192241;192242;"/>` +
`<Card CardID="192217" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/ttmgxovmctmfxv2" RelatedIDs="192221;192223;192230;192232;192236;192237;192238;192240;192241;192242;"/>` +
`<Card CardID="119704" CardName="Ancient Silverback" PageURL="https://www.altersleeves.com/product/4sesar7eqly2ugq" RelatedIDs="119700;87604;"/>` +
`<Card CardID="124497" CardName="Sheoldred, Whispering One" PageURL="https://www.altersleeves.com/product/qnyowtajdcpyynn" RelatedIDs="124490;"/>` +
`<Card CardID="119708" CardName="Lightning Bolt" PageURL="https://www.altersleeves.com/product/h24meozioinybdk" RelatedIDs="119703;"/>` +
`<Card CardID="177496" CardName="Entomb" PageURL="https://www.altersleeves.com/product/x8rrwceimrhqz4c" RelatedIDs="165423;165425;170034;170035;177317;177318;177495;177497;177498;"/>` +
`<Card CardID="177318" CardName="Entomb" PageURL="https://www.altersleeves.com/product/mt6rye3chhfuo6g" RelatedIDs="165423;165425;170034;170035;177317;177495;177496;177497;177498;"/>` +
`<Card CardID="170034" CardName="Damnation" PageURL="https://www.altersleeves.com/product/rtftryzplt9xnx4" RelatedIDs="165423;165425;170035;177317;177318;177495;177496;177497;177498;"/>` +
`<Card CardID="165425" CardName="Damnation" PageURL="https://www.altersleeves.com/product/bjiffkror5utndm" RelatedIDs="165423;170034;170035;177317;177318;177495;177496;177497;177498;"/>` +
`<Card CardID="185857" CardName="Propaganda" PageURL="https://www.altersleeves.com/product/tk3vo3j5yfllt7j" RelatedIDs="185850;185854;185856;185858;185859;185861;185862;185863;"/>` +
`<Card CardID="185850" CardName="Propaganda" PageURL="https://www.altersleeves.com/product/dgnheekehcmtxt4" RelatedIDs="185854;185856;185857;185858;185859;185861;185862;185863;"/>` +
`<Card CardID="183272" CardName="Coat of Arms" PageURL="https://www.altersleeves.com/product/ldmiut79i4z9dqs" RelatedIDs="181653;181657;183270;183271;183273;"/>` +
`<Card CardID="181657" CardName="Hatred" PageURL="https://www.altersleeves.com/product/atyoxc7hydtskaf" RelatedIDs="181653;183270;183271;183272;183273;"/>` +
`<Card CardID="123814" CardName="Krenko, Mob Boss" PageURL="https://www.altersleeves.com/product/3a326o67lelrvmp" RelatedIDs="123886;"/>` +
`<Card CardID="156809" CardName="Omniscience" PageURL="https://www.altersleeves.com/product/uqh068optu6bvt1" RelatedIDs="156805;156806;156807;156808;156810;156813;156814;"/>` +
`<Card CardID="156805" CardName="Omniscience" PageURL="https://www.altersleeves.com/product/mjnvcb5r7uy14jm" RelatedIDs="156806;156807;156808;156809;156810;156813;156814;"/>` +
`<Card CardID="179144" CardName="Birthing Pod" PageURL="https://www.altersleeves.com/product/mvsofts5y0wamhh" RelatedIDs="179137;179139;179145;179148;179149;"/>` +
`<Card CardID="179137" CardName="Phyrexian Altar" PageURL="https://www.altersleeves.com/product/ap1tkrkayzaurur" RelatedIDs="179139;179144;179145;179148;179149;"/>` +
`<Card CardID="200560" CardName="Lord of the Void" PageURL="https://www.altersleeves.com/product/vzhqiq3gflk4sj5" RelatedIDs="200554;200555;200556;200558;200561;200563;200564;200565;200567;200568;200569;"/>` +
`<Card CardID="200558" CardName="Razaketh, the Foulblooded" PageURL="https://www.altersleeves.com/product/ttfptrojhihy2zy" RelatedIDs="200554;200555;200556;200560;200561;200563;200564;200565;200567;200568;200569;"/>` +
`<Card CardID="159183" CardName="Maelstrom Wanderer" PageURL="https://www.altersleeves.com/product/xvwbonnxjdl00nz" RelatedIDs="159182;159243;164434;164438;"/>` +
`<Card CardID="159182" CardName="Maelstrom Wanderer" PageURL="https://www.altersleeves.com/product/028asndza7uhdbo" RelatedIDs="159183;159243;164434;164438;"/>` +
`<Card CardID="176706" CardName="Glen Elendra Archmage" PageURL="https://www.altersleeves.com/product/8udkfqxigglyfge" RelatedIDs="176523;176525;176530;176532;176700;176701;176702;176703;176705;176708;176709;"/>` +
`<Card CardID="176532" CardName="Spellseeker" PageURL="https://www.altersleeves.com/product/jdq8nomcgr8vic7" RelatedIDs="176523;176525;176530;176700;176701;176702;176703;176705;176706;176708;176709;"/>` +
`<Card CardID="177492" CardName="Nether Void" PageURL="https://www.altersleeves.com/product/kll9r2g6bb7hc4k" RelatedIDs="163770;163774;164290;164291;177491;177493;177494;"/>` +
`<Card CardID="164291" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/wl1qfzwidpcsr3t" RelatedIDs="163770;163774;164290;177491;177492;177493;177494;"/>` +
`<Card CardID="163774" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/jkgaqtxs9vmag5c" RelatedIDs="163770;164290;164291;177491;177492;177493;177494;"/>` +
`<Card CardID="152612" CardName="Vampiric Tutor" PageURL="https://www.altersleeves.com/product/zlpq8k4kq90lkl1" RelatedIDs="152609;152611;152613;161378;161380;"/>` +
`<Card CardID="123575" CardName="Gamble" PageURL="https://www.altersleeves.com/product/pa2joeeecjplem1" RelatedIDs="123576;"/>` +
`<Card CardID="177483" CardName="Phyrexian Tower" PageURL="https://www.altersleeves.com/product/urnuznfhk8azqhw" RelatedIDs="163387;163389;164296;164297;177484;177485;177486;"/>` +
`<Card CardID="164296" CardName="Command Tower" PageURL="https://www.altersleeves.com/product/0yb6robyea9py7n" RelatedIDs="163387;163389;164297;177483;177484;177485;177486;"/>` +
`<Card CardID="163389" CardName="Command Tower" PageURL="https://www.altersleeves.com/product/qb8yz45yh5rml3j" RelatedIDs="163387;164296;164297;177483;177484;177485;177486;"/>` +
`<Card CardID="34948" CardName="Wurmcoil Engine" PageURL="https://www.altersleeves.com/product/qjqykvarjbzdowf" RelatedIDs="85960;154407;34228;"/>` +
`<Card CardID="172524" CardName="Planar Gate" PageURL="https://www.altersleeves.com/product/ypivkw8ducy7sdw" RelatedIDs="169820;169822;170444;170445;172201;172202;172525;177294;177295;"/>` +
`<Card CardID="172202" CardName="Nevinyrral's Disk" PageURL="https://www.altersleeves.com/product/cakqqaea6fkh0au" RelatedIDs="169820;169822;170444;170445;172201;172524;172525;177294;177295;"/>` +
`<Card CardID="170444" CardName="Lightning Greaves" PageURL="https://www.altersleeves.com/product/p5fzqxrdlsmqbqy" RelatedIDs="169820;169822;170445;172201;172202;172524;172525;177294;177295;"/>` +
`<Card CardID="169820" CardName="Lightning Greaves" PageURL="https://www.altersleeves.com/product/vzkcmo1vy6fi2le" RelatedIDs="169822;170444;170445;172201;172202;172524;172525;177294;177295;"/>` +
`<Card CardID="181580" CardName="Isochron Scepter" PageURL="https://www.altersleeves.com/product/laapgpldamfdkot" RelatedIDs="181578;183261;183262;"/>` +
`<Card CardID="189438" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/gwbpjurhgkcbape" RelatedIDs="189440;189443;189446;189448;189449;189450;189451;"/>` +
`<Card CardID="161533" CardName="Kaalia of the Vast" PageURL="https://www.altersleeves.com/product/wxpy0qxewdk2y3p" RelatedIDs="161531;161535;161537;"/>` +
`<Card CardID="86417" CardName="Expedition Map" PageURL="https://www.altersleeves.com/product/pbkdur5gs9qxuti" RelatedIDs="86418;159241;159242;"/>` +
`<Card CardID="164294" CardName="Wrath of God" PageURL="https://www.altersleeves.com/product/bfobki3mdtfqg7s" RelatedIDs="163746;163748;164292;164293;164295;177487;177488;"/>` +
`<Card CardID="164293" CardName="Wrath of God" PageURL="https://www.altersleeves.com/product/elbphzd4hhua4t9" RelatedIDs="163746;163748;164292;164294;164295;177487;177488;"/>` +
`<Card CardID="163748" CardName="Wrath of God" PageURL="https://www.altersleeves.com/product/pcmz5vjizgi75wt" RelatedIDs="163746;164292;164293;164294;164295;177487;177488;"/>` +
`<Card CardID="158853" CardName="Jace, the Mind Sculptor" PageURL="https://www.altersleeves.com/product/ge1kqzxsahdviwh" RelatedIDs="158855;"/>` +
`<Card CardID="176694" CardName="Regrowth" PageURL="https://www.altersleeves.com/product/fdgfcdxi4fcutcx" RelatedIDs="176620;176622;176624;176695;176696;176697;176698;176699;"/>` +
`<Card CardID="176622" CardName="Regrowth" PageURL="https://www.altersleeves.com/product/mc7roqkl7pwoigt" RelatedIDs="176620;176624;176694;176695;176696;176697;176698;176699;"/>` +
`<Card CardID="200551" CardName="Army of the Damned" PageURL="https://www.altersleeves.com/product/vsbvhpzbd6ledyv" RelatedIDs="200538;200540;200541;200542;200543;200544;200546;200547;200548;200550;200552;"/>` +
`<Card CardID="200550" CardName="Waste Not" PageURL="https://www.altersleeves.com/product/uotz5ubfhhoztvm" RelatedIDs="200538;200540;200541;200542;200543;200544;200546;200547;200548;200551;200552;"/>` +
`<Card CardID="177456" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/9uaw61vqzbtlbme" RelatedIDs="165326;165328;167193;167194;177457;177458;177459;"/>` +
`<Card CardID="167193" CardName="Blind Obedience" PageURL="https://www.altersleeves.com/product/ajad3ewuniagj1f" RelatedIDs="165326;165328;167194;177456;177457;177458;177459;"/>` +
`<Card CardID="165326" CardName="Blind Obedience" PageURL="https://www.altersleeves.com/product/bnnhmruk0pryrut" RelatedIDs="165328;167193;167194;177456;177457;177458;177459;"/>` +
`<Card CardID="192237" CardName="Rune-Scarred Demon" PageURL="https://www.altersleeves.com/product/lgcn65npmfap2n6" RelatedIDs="192217;192221;192223;192230;192232;192236;192238;192240;192241;192242;"/>` +
`<Card CardID="192236" CardName="Judith, the Scourge Diva" PageURL="https://www.altersleeves.com/product/kqnfs1zwftjxxvo" RelatedIDs="192217;192221;192223;192230;192232;192237;192238;192240;192241;192242;"/>` +
`<Card CardID="177463" CardName="Remand" PageURL="https://www.altersleeves.com/product/tavprde1u7d4ol0" RelatedIDs="164984;164986;167179;167184;167187;167188;177464;177467;177499;177501;"/>` +
`<Card CardID="167187" CardName="Rhystic Study" PageURL="https://www.altersleeves.com/product/gbm4ukpforafdp2" RelatedIDs="164984;164986;167179;167184;167188;177463;177464;177467;177499;177501;"/>` +
`<Card CardID="167179" CardName="Rhystic Study" PageURL="https://www.altersleeves.com/product/rpitshohpd69ebf" RelatedIDs="164984;164986;167184;167187;167188;177463;177464;177467;177499;177501;"/>` +
`<Card CardID="164984" CardName="Rhystic Study" PageURL="https://www.altersleeves.com/product/qiidpvibg5xb04q" RelatedIDs="164986;167179;167184;167187;167188;177463;177464;177467;177499;177501;"/>` +
`<Card CardID="172525" CardName="Planar Gate" PageURL="https://www.altersleeves.com/product/o2r8tektmuobzs0" RelatedIDs="169820;169822;170444;170445;172201;172202;172524;177294;177295;"/>` +
`<Card CardID="172201" CardName="Nevinyrral's Disk" PageURL="https://www.altersleeves.com/product/kqjtrgp9gq60j68" RelatedIDs="169820;169822;170444;170445;172202;172524;172525;177294;177295;"/>` +
`<Card CardID="170445" CardName="Lightning Greaves" PageURL="https://www.altersleeves.com/product/9den8rq2eoth17z" RelatedIDs="169820;169822;170444;172201;172202;172524;172525;177294;177295;"/>` +
`<Card CardID="169822" CardName="Lightning Greaves" PageURL="https://www.altersleeves.com/product/4marpc3xs3dvqlk" RelatedIDs="169820;170444;170445;172201;172202;172524;172525;177294;177295;"/>` +
`<Card CardID="177151" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/5kb9o8alteentpi" RelatedIDs="177146;177148;177149;177150;177152;177153;177154;"/>` +
`<Card CardID="177149" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/0voib3djhfjt3y5" RelatedIDs="177146;177148;177150;177151;177152;177153;177154;"/>` +
`<Card CardID="177146" CardName="Silence" PageURL="https://www.altersleeves.com/product/5d7b9uhk4ar9qtb" RelatedIDs="177148;177149;177150;177151;177152;177153;177154;"/>` +
`<Card CardID="177520" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/nhiz9i97qhgr4nb" RelatedIDs="163293;163295;163643;163645;177517;177518;177521;177522;"/>` +
`<Card CardID="177518" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/waekv94pupdvnzr" RelatedIDs="163293;163295;163643;163645;177517;177520;177521;177522;"/>` +
`<Card CardID="163293" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/kpkparqndvbkaiy" RelatedIDs="163295;163643;163645;177517;177518;177520;177521;177522;"/>` +
`<Card CardID="185845" CardName="Nekusar, the Mindrazer" PageURL="https://www.altersleeves.com/product/dnhppwblkxua6nd" RelatedIDs="185833;185835;185836;185837;185838;185839;185842;185844;185846;185847;185848;"/>` +
`<Card CardID="185842" CardName="Dark Confidant" PageURL="https://www.altersleeves.com/product/76k2enyvurawhxh" RelatedIDs="185833;185835;185836;185837;185838;185839;185844;185845;185846;185847;185848;"/>` +
`<Card CardID="179142" CardName="Birthing Pod" PageURL="https://www.altersleeves.com/product/ztchdzielvlnmn7" RelatedIDs="179130;179133;179140;179146;179147;"/>` +
`<Card CardID="179133" CardName="Phyrexian Altar" PageURL="https://www.altersleeves.com/product/uoqykqnpmsee0hy" RelatedIDs="179130;179140;179142;179146;179147;"/>` +
`<Card CardID="34942" CardName="Ancient Stirrings" PageURL="https://www.altersleeves.com/product/by1mpunllaukwl1" RelatedIDs="155394;155395;34946;"/>` +
`<Card CardID="177526" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/ds4cn9iz9ws8un7" RelatedIDs="163443;164279;164281;164282;164284;177523;177524;177527;177528;163445;"/>` +
`<Card CardID="177524" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/ptmdqjd1dkdbfrb" RelatedIDs="163443;164279;164281;164282;164284;177523;177526;177527;177528;163445;"/>` +
`<Card CardID="163443" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/fen1jkm6rrycslb" RelatedIDs="164279;164281;164282;164284;177523;177524;177526;177527;177528;163445;"/>` +
`<Card CardID="123883" CardName="Lightning Bolt" PageURL="https://www.altersleeves.com/product/hyrdxqxqit5br6g" RelatedIDs="123880;123881;123882;123884;123885;"/>` +
`<Card CardID="123885" CardName="Lightning Bolt" PageURL="https://www.altersleeves.com/product/ivwl3ftmztr0dor" RelatedIDs="123880;123881;123882;123883;123884;"/>` +
`<Card CardID="206906" CardName="Klothys, God of Destiny" PageURL="https://www.altersleeves.com/product/obxbmwaozfronj2" RelatedIDs="206897;206898;206899;206901;206902;206903;206905;206907;206909;206910;206911;"/>` +
`<Card CardID="206905" CardName="Kruphix, God of Horizons" PageURL="https://www.altersleeves.com/product/e9oiyyyrm6ue0ek" RelatedIDs="206897;206898;206899;206901;206902;206903;206906;206907;206909;206910;206911;"/>` +
`<Card CardID="179944" CardName="Barrin, Master Wizard" PageURL="https://www.altersleeves.com/product/n4lsxew2iwiqykl" RelatedIDs="179939;179940;179942;179943;179945;179946;179947;"/>` +
`<Card CardID="179940" CardName="Bruvac the Grandiloquent" PageURL="https://www.altersleeves.com/product/kjywrrcug4u8xdw" RelatedIDs="179939;179942;179943;179944;179945;179946;179947;"/>` +
`<Card CardID="179939" CardName="Grand Arbiter Augustin IV" PageURL="https://www.altersleeves.com/product/ifawrplcluchjry" RelatedIDs="179940;179942;179943;179944;179945;179946;179947;"/>` +
`<Card CardID="185871" CardName="Edric, Spymaster of Trest" PageURL="https://www.altersleeves.com/product/ebbggf8v9qkukc4" RelatedIDs="185865;185867;185869;185870;185872;"/>` +
`<Card CardID="185867" CardName="Tireless Tracker" PageURL="https://www.altersleeves.com/product/e6oqobvtm2sk76r" RelatedIDs="185865;185869;185870;185871;185872;"/>` +
`<Card CardID="152613" CardName="Vampiric Tutor" PageURL="https://www.altersleeves.com/product/xvtulp0st60uwfl" RelatedIDs="152609;152611;152612;161378;161380;"/>` +
`<Card CardID="34052" CardName="Ghost Quarter" PageURL="https://www.altersleeves.com/product/fi2lxkie7hvlskt" RelatedIDs="85962;"/>` +
`<Card CardID="152465" CardName="Mangara of Corondor" PageURL="https://www.altersleeves.com/product/hiutrhkpv63vmjz" RelatedIDs="120595;152461;152462;152464;"/>` +
`<Card CardID="177475" CardName="Demonic Consultation" PageURL="https://www.altersleeves.com/product/mnn4efrt03c5q9g" RelatedIDs="167007;167009;167169;167170;177470;177476;177477;"/>` +
`<Card CardID="167170" CardName="Counterspell" PageURL="https://www.altersleeves.com/product/78aawbl2lovnjbi" RelatedIDs="167007;167009;167169;177470;177475;177476;177477;"/>` +
`<Card CardID="167009" CardName="Counterspell" PageURL="https://www.altersleeves.com/product/dsjkmxh7tv9nqby" RelatedIDs="167007;167169;167170;177470;177475;177476;177477;"/>` +
`<Card CardID="179945" CardName="Barrin, Master Wizard" PageURL="https://www.altersleeves.com/product/5i1tsxnoucvw8vb" RelatedIDs="179939;179940;179942;179943;179944;179946;179947;"/>` +
`<Card CardID="179943" CardName="Bruvac the Grandiloquent" PageURL="https://www.altersleeves.com/product/cj84zubjuszyuco" RelatedIDs="179939;179940;179942;179944;179945;179946;179947;"/>` +
`<Card CardID="179942" CardName="Grand Arbiter Augustin IV" PageURL="https://www.altersleeves.com/product/92ocm4qgepmzbcw" RelatedIDs="179939;179940;179943;179944;179945;179946;179947;"/>` +
`<Card CardID="151044" CardName="Forest" PageURL="https://www.altersleeves.com/product/lutrsi61nfj1ft5" RelatedIDs=""/>` +
`<Card CardID="189443" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/cvl6ebnwlouqcwh" RelatedIDs="189438;189440;189446;189448;189449;189450;189451;"/>` +
`<Card CardID="34366" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/5zzm2dvbdzgxime" RelatedIDs="154121;"/>` +
`<Card CardID="34002" CardName="Skullclamp" PageURL="https://www.altersleeves.com/product/eebpcfx2lrpqfz8" RelatedIDs="154177;"/>` +
`<Card CardID="192804" CardName="Stoneforge Mystic" PageURL="https://www.altersleeves.com/product/6s2bwte3mgejiyr" RelatedIDs="192799;192800;192801;192803;192806;192808;192810;"/>` +
`<Card CardID="192803" CardName="Stoneforge Mystic" PageURL="https://www.altersleeves.com/product/jplrdlphlnq2u1x" RelatedIDs="192799;192800;192801;192804;192806;192808;192810;"/>` +
`<Card CardID="177319" CardName="Beast Within" PageURL="https://www.altersleeves.com/product/zepv0ptiykmnpi4" RelatedIDs="167200;167202;177320;177321;177322;165421;165419;"/>` +
`<Card CardID="167200" CardName="Berserk" PageURL="https://www.altersleeves.com/product/uzuqxshfpoqr32z" RelatedIDs="167202;177319;177320;177321;177322;165421;165419;"/>` +
`<Card CardID="165419" CardName="Berserk" PageURL="https://www.altersleeves.com/product/lpru5i6bpqjv5kv" RelatedIDs="167200;167202;177319;177320;177321;177322;165421;"/>` +
`<Card CardID="206902" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/c5x9ipn0dy3e3du" RelatedIDs="206897;206898;206899;206901;206903;206905;206906;206907;206909;206910;206911;"/>` +
`<Card CardID="206901" CardName="Enter the Infinite" PageURL="https://www.altersleeves.com/product/e5lrc2b7o8scyef" RelatedIDs="206897;206898;206899;206902;206903;206905;206906;206907;206909;206910;206911;"/>` +
`<Card CardID="181578" CardName="Isochron Scepter" PageURL="https://www.altersleeves.com/product/is75kzeqvn7as7a" RelatedIDs="181580;183261;183262;"/>` +
`<Card CardID="34367" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/drbcxuwykxkf1cr" RelatedIDs="154122;"/>` +
`<Card CardID="194710" CardName="Necropotence" PageURL="https://www.altersleeves.com/product/aithionbinaeeyp" RelatedIDs="194709;194711;194713;194714;194715;194717;194719;"/>` +
`<Card CardID="194709" CardName="Necropotence" PageURL="https://www.altersleeves.com/product/11t1ndchwmklrbm" RelatedIDs="194710;194711;194713;194714;194715;194717;194719;"/>` +
`<Card CardID="119703" CardName="Lightning Bolt" PageURL="https://www.altersleeves.com/product/noashynppapjl7r" RelatedIDs="119708;"/>` +
`<Card CardID="179145" CardName="Birthing Pod" PageURL="https://www.altersleeves.com/product/dfxigecsghp0ard" RelatedIDs="179137;179139;179144;179148;179149;"/>` +
`<Card CardID="179139" CardName="Phyrexian Altar" PageURL="https://www.altersleeves.com/product/t6tbgtte7zqfbpw" RelatedIDs="179137;179144;179145;179148;179149;"/>` +
`<Card CardID="176705" CardName="Glen Elendra Archmage" PageURL="https://www.altersleeves.com/product/6oqv5bj49ldrlfl" RelatedIDs="176523;176525;176530;176532;176700;176701;176702;176703;176706;176708;176709;"/>` +
`<Card CardID="176530" CardName="Spellseeker" PageURL="https://www.altersleeves.com/product/heqfizk8wlbfm75" RelatedIDs="176523;176525;176532;176700;176701;176702;176703;176705;176706;176708;176709;"/>` +
`<Card CardID="194714" CardName="Necropotence" PageURL="https://www.altersleeves.com/product/q2o5k4uiryghkeb" RelatedIDs="194709;194710;194711;194713;194715;194717;194719;"/>` +
`<Card CardID="194713" CardName="Necropotence" PageURL="https://www.altersleeves.com/product/wxqr72cjo2gd1gb" RelatedIDs="194709;194710;194711;194714;194715;194717;194719;"/>` +
`<Card CardID="34228" CardName="Wurmcoil Engine" PageURL="https://www.altersleeves.com/product/f3hgcc3dnkcamdp" RelatedIDs="85960;154407;34948;"/>` +
`<Card CardID="172534" CardName="Mana Vault" PageURL="https://www.altersleeves.com/product/lcqjreb88cf6p8v" RelatedIDs="169999;170001;170456;170457;172198;172199;172533;172542;172543;"/>` +
`<Card CardID="172199" CardName="Star Compass" PageURL="https://www.altersleeves.com/product/brt0ziveb6usoxy" RelatedIDs="169999;170001;170456;170457;172198;172533;172534;172542;172543;"/>` +
`<Card CardID="170457" CardName="Chromatic Star" PageURL="https://www.altersleeves.com/product/dt3cmjmraysuzjm" RelatedIDs="169999;170001;170456;172198;172199;172533;172534;172542;172543;"/>` +
`<Card CardID="170001" CardName="Chromatic Star" PageURL="https://www.altersleeves.com/product/sabgexdqjnf19n4" RelatedIDs="169999;170456;170457;172198;172199;172533;172534;172542;172543;"/>` +
`<Card CardID="201873" CardName="Polluted Bonds" PageURL="https://www.altersleeves.com/product/eo4tkliqikdqqtc" RelatedIDs="128544;128545;128546;176047;176048;201871;201867;201874;154615;"/>` +
`<Card CardID="176698" CardName="Regrowth" PageURL="https://www.altersleeves.com/product/ydjbybuhqyduni1" RelatedIDs="176620;176622;176624;176694;176695;176696;176697;176699;"/>` +
`<Card CardID="176620" CardName="Regrowth" PageURL="https://www.altersleeves.com/product/kx5tjnq3kpwo7ln" RelatedIDs="176622;176624;176694;176695;176696;176697;176698;176699;"/>` +
`<Card CardID="198110" CardName="Bitterblossom" PageURL="https://www.altersleeves.com/product/fy5u1rfx1v6x1ls" RelatedIDs="198111;"/>` +
`<Card CardID="87606" CardName="Liquimetal Coating" PageURL="https://www.altersleeves.com/product/wc32q4z2ietunk2" RelatedIDs="87609;87607;87604;87605;87608;"/>` +
`<Card CardID="87609" CardName="Welding Jar" PageURL="https://www.altersleeves.com/product/wgpulntowou6d8r" RelatedIDs="87606;87607;87604;87605;87608;"/>` +
`<Card CardID="172535" CardName="Replenish" PageURL="https://www.altersleeves.com/product/3umqiekh2pmdkug" RelatedIDs="169340;169342;172205;172206;172207;172208;172536;172537;172538;"/>` +
`<Card CardID="172208" CardName="Land Tax" PageURL="https://www.altersleeves.com/product/4v6bsj1eqiojeis" RelatedIDs="169340;169342;172205;172206;172207;172535;172536;172537;172538;"/>` +
`<Card CardID="172207" CardName="Land Tax" PageURL="https://www.altersleeves.com/product/0y3ix2hn9lvwvo0" RelatedIDs="169340;169342;172205;172206;172208;172535;172536;172537;172538;"/>` +
`<Card CardID="169340" CardName="Smothering Tithe" PageURL="https://www.altersleeves.com/product/ctuag4ibp3wrnkd" RelatedIDs="169342;172205;172206;172207;172208;172535;172536;172537;172538;"/>` +
`<Card CardID="185838" CardName="Surgical Extraction" PageURL="https://www.altersleeves.com/product/kvqpr7v4aggkpcp" RelatedIDs="185833;185835;185836;185837;185839;185842;185844;185845;185846;185847;185848;"/>` +
`<Card CardID="185835" CardName="Skullclamp" PageURL="https://www.altersleeves.com/product/vtzvpn5tpmns8wl" RelatedIDs="185833;185836;185837;185838;185839;185842;185844;185845;185846;185847;185848;"/>` +
`<Card CardID="124529" CardName="Urabrask the Hidden" PageURL="https://www.altersleeves.com/product/lv1j0lwkst0nkf8" RelatedIDs="124528;"/>` +
`<Card CardID="152550" CardName="Mox Opal" PageURL="https://www.altersleeves.com/product/ulzztuzdukrn3w6" RelatedIDs="86705;"/>` +
`<Card CardID="123882" CardName="Lightning Bolt" PageURL="https://www.altersleeves.com/product/bqz8odzhq2ys8al" RelatedIDs="123880;123881;123883;123884;123885;"/>` +
`<Card CardID="123884" CardName="Lightning Bolt" PageURL="https://www.altersleeves.com/product/fiutuhnlzs9nw3h" RelatedIDs="123880;123881;123882;123883;123885;"/>` +
`<Card CardID="34946" CardName="Ancient Stirrings" PageURL="https://www.altersleeves.com/product/aoznglmjm8eszrd" RelatedIDs="155394;155395;34942;"/>` +
`<Card CardID="86423" CardName="Oblivion Stone" PageURL="https://www.altersleeves.com/product/zu5pckl9na5d55y" RelatedIDs="86421;86422;"/>` +
`<Card CardID="177495" CardName="Entomb" PageURL="https://www.altersleeves.com/product/weipfc4inkrkabb" RelatedIDs="165423;165425;170034;170035;177317;177318;177496;177497;177498;"/>` +
`<Card CardID="177317" CardName="Entomb" PageURL="https://www.altersleeves.com/product/jty61er2u9egtcx" RelatedIDs="165423;165425;170034;170035;177318;177495;177496;177497;177498;"/>` +
`<Card CardID="170035" CardName="Damnation" PageURL="https://www.altersleeves.com/product/sile4auikjfxlzw" RelatedIDs="165423;165425;170034;177317;177318;177495;177496;177497;177498;"/>` +
`<Card CardID="165423" CardName="Damnation" PageURL="https://www.altersleeves.com/product/vx2asm1t5mq4kbl" RelatedIDs="165425;170034;170035;177317;177318;177495;177496;177497;177498;"/>` +
`<Card CardID="87029" CardName="Relic of Progenitus" PageURL="https://www.altersleeves.com/product/wbsy8y2etmq7kbu" RelatedIDs="34920;34936;"/>` +
`<Card CardID="119700" CardName="Ancient Silverback" PageURL="https://www.altersleeves.com/product/hrnjyjwdp4rmtkp" RelatedIDs="119704;87604;"/>` +
`<Card CardID="87028" CardName="Karn Liberated" PageURL="https://www.altersleeves.com/product/s5dylh1rlwjnc8z" RelatedIDs="34331;155396;34960;"/>` +
`<Card CardID="34331" CardName="Karn Liberated" PageURL="https://www.altersleeves.com/product/1bkzhazytocrxc0" RelatedIDs="87028;155396;34960;"/>` +
`<Card CardID="172526" CardName="Mind Over Matter" PageURL="https://www.altersleeves.com/product/6jb9urle2ojpw2m" RelatedIDs="169976;169978;170426;170427;170429;170431;172209;172210;172527;172546;172548;"/>` +
`<Card CardID="172209" CardName="Force of Will" PageURL="https://www.altersleeves.com/product/vpsmannkxvrd2wl" RelatedIDs="169976;169978;170426;170427;170429;170431;172210;172526;172527;172546;172548;"/>` +
`<Card CardID="170426" CardName="Cyclonic Rift" PageURL="https://www.altersleeves.com/product/3aafqszvgjztdiq" RelatedIDs="169976;169978;170427;170429;170431;172209;172210;172526;172527;172546;172548;"/>` +
`<Card CardID="169976" CardName="Cyclonic Rift" PageURL="https://www.altersleeves.com/product/ou6zkmtloka3npb" RelatedIDs="169978;170426;170427;170429;170431;172209;172210;172526;172527;172546;172548;"/>` +
`<Card CardID="206910" CardName="Klothys, God of Destiny" PageURL="https://www.altersleeves.com/product/kyhlg4uxmdrfvhm" RelatedIDs="206897;206898;206899;206901;206902;206903;206905;206906;206907;206909;206911;"/>` +
`<Card CardID="206909" CardName="Kruphix, God of Horizons" PageURL="https://www.altersleeves.com/product/40h7d2lbxat1eqx" RelatedIDs="206897;206898;206899;206901;206902;206903;206905;206906;206907;206910;206911;"/>` +
`<Card CardID="185862" CardName="Propaganda" PageURL="https://www.altersleeves.com/product/szmixuaepeugxt5" RelatedIDs="185850;185854;185856;185857;185858;185859;185861;185863;"/>` +
`<Card CardID="185856" CardName="Propaganda" PageURL="https://www.altersleeves.com/product/nsw5e3ezuo7gogc" RelatedIDs="185850;185854;185857;185858;185859;185861;185862;185863;"/>` +
`<Card CardID="176688" CardName="Mirari's Wake" PageURL="https://www.altersleeves.com/product/5ypdv3ugh1xdcvc" RelatedIDs="176684;176686;176687;176689;176690;176692;176693;"/>` +
`<Card CardID="176687" CardName="Mirari's Wake" PageURL="https://www.altersleeves.com/product/6haofquxlc8qaxe" RelatedIDs="176684;176686;176688;176689;176690;176692;176693;"/>` +
`<Card CardID="176686" CardName="Mirari's Wake" PageURL="https://www.altersleeves.com/product/fckhqos4zrme7pt" RelatedIDs="176684;176687;176688;176689;176690;176692;176693;"/>` +
`<Card CardID="33581" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/ickqggrztgvhnhe" RelatedIDs="154123;"/>` +
`<Card CardID="185869" CardName="Edric, Spymaster of Trest" PageURL="https://www.altersleeves.com/product/t4xucqafvwcyklh" RelatedIDs="185865;185867;185870;185871;185872;"/>` +
`<Card CardID="185865" CardName="Tireless Tracker" PageURL="https://www.altersleeves.com/product/ywnpikcugaie17e" RelatedIDs="185867;185869;185870;185871;185872;"/>` +
`<Card CardID="176700" CardName="Windfall" PageURL="https://www.altersleeves.com/product/yytd1elcjrrerv9" RelatedIDs="176523;176525;176530;176532;176701;176702;176703;176705;176706;176708;176709;"/>` +
`<Card CardID="176523" CardName="Windfall" PageURL="https://www.altersleeves.com/product/xnu1l4sdh0hu6dk" RelatedIDs="176525;176530;176532;176700;176701;176702;176703;176705;176706;176708;176709;"/>` +
`<Card CardID="124496" CardName="Vorinclex, Voice of Hunger" PageURL="https://www.altersleeves.com/product/osvi670wkokuqnc" RelatedIDs="124495;"/>` +
`<Card CardID="185847" CardName="Nekusar, the Mindrazer" PageURL="https://www.altersleeves.com/product/xsslfbgh7aw4bqi" RelatedIDs="185833;185835;185836;185837;185838;185839;185842;185844;185845;185846;185848;"/>` +
`<Card CardID="185844" CardName="Dark Confidant" PageURL="https://www.altersleeves.com/product/ifghiy4eud0bhfw" RelatedIDs="185833;185835;185836;185837;185838;185839;185842;185845;185846;185847;185848;"/>` +
`<Card CardID="151118" CardName="Island" PageURL="https://www.altersleeves.com/product/vszcw8x7m1xetv1" RelatedIDs=""/>` +
`<Card CardID="151119" CardName="Island" PageURL="https://www.altersleeves.com/product/o9re4nmqbwba6mn" RelatedIDs=""/>` +
`<Card CardID="206898" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/ipzyrojqqoy1bxk" RelatedIDs="206897;206899;206901;206902;206903;206905;206906;206907;206909;206910;206911;"/>` +
`<Card CardID="206897" CardName="Enter the Infinite" PageURL="https://www.altersleeves.com/product/cckd421fkvk7qns" RelatedIDs="206898;206899;206901;206902;206903;206905;206906;206907;206909;206910;206911;"/>` +
`<Card CardID="177470" CardName="Demonic Consultation" PageURL="https://www.altersleeves.com/product/6w2uersceknyucz" RelatedIDs="167007;167009;167169;167170;177475;177476;177477;"/>` +
`<Card CardID="167169" CardName="Counterspell" PageURL="https://www.altersleeves.com/product/wa3uaowcqaisbk0" RelatedIDs="167007;167009;167170;177470;177475;177476;177477;"/>` +
`<Card CardID="167007" CardName="Counterspell" PageURL="https://www.altersleeves.com/product/zfqzq4xvkfosufl" RelatedIDs="167009;167169;167170;177470;177475;177476;177477;"/>` +
`<Card CardID="200547" CardName="Army of the Damned" PageURL="https://www.altersleeves.com/product/rs93qv6h8uo7iqx" RelatedIDs="200538;200540;200541;200542;200543;200544;200546;200548;200550;200551;200552;"/>` +
`<Card CardID="200546" CardName="Waste Not" PageURL="https://www.altersleeves.com/product/kryubkzmkoqa4m8" RelatedIDs="200538;200540;200541;200542;200543;200544;200547;200548;200550;200551;200552;"/>` +
`<Card CardID="189446" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/bsqalskq56c6hqt" RelatedIDs="189438;189440;189443;189448;189449;189450;189451;"/>` +
`<Card CardID="161537" CardName="Kaalia of the Vast" PageURL="https://www.altersleeves.com/product/yqut0jxkmr0az5y" RelatedIDs="161531;161533;161535;"/>` +
`<Card CardID="185859" CardName="Propaganda" PageURL="https://www.altersleeves.com/product/tscureqzk7qudea" RelatedIDs="185850;185854;185856;185857;185858;185861;185862;185863;"/>` +
`<Card CardID="185854" CardName="Propaganda" PageURL="https://www.altersleeves.com/product/krp6rswop55lzo4" RelatedIDs="185850;185856;185857;185858;185859;185861;185862;185863;"/>` +
`<Card CardID="172527" CardName="Mind Over Matter" PageURL="https://www.altersleeves.com/product/3sguti5lyh245k9" RelatedIDs="169976;169978;170426;170427;170429;170431;172209;172210;172526;172546;172548;"/>` +
`<Card CardID="172210" CardName="Force of Will" PageURL="https://www.altersleeves.com/product/uyixqlmqqbgz2zv" RelatedIDs="169976;169978;170426;170427;170429;170431;172209;172526;172527;172546;172548;"/>` +
`<Card CardID="170427" CardName="Cyclonic Rift" PageURL="https://www.altersleeves.com/product/tkuib8o24qeyq5q" RelatedIDs="169976;169978;170426;170429;170431;172209;172210;172526;172527;172546;172548;"/>` +
`<Card CardID="169978" CardName="Cyclonic Rift" PageURL="https://www.altersleeves.com/product/ipzwafwm9yj8pen" RelatedIDs="169976;170426;170427;170429;170431;172209;172210;172526;172527;172546;172548;"/>` +
`<Card CardID="121510" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/6wj5nudmrcalzef" RelatedIDs="121511;121512;161824;"/>` +
`<Card CardID="121511" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/d0uskltyggtqu3f" RelatedIDs="121510;121512;161824;"/>` +
`<Card CardID="121512" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/mkllv65wijfrf92" RelatedIDs="121510;121511;161824;"/>` +
`<Card CardID="201867" CardName="Imperial Seal" PageURL="https://www.altersleeves.com/product/cd0khrevoqtnusg" RelatedIDs="128544;128545;128546;176047;176048;201871;201873;201874;154615;"/>` +
`<Card CardID="177484" CardName="Phyrexian Tower" PageURL="https://www.altersleeves.com/product/xevbpzngsj4qiu6" RelatedIDs="163387;163389;164296;164297;177483;177485;177486;"/>` +
`<Card CardID="164297" CardName="Command Tower" PageURL="https://www.altersleeves.com/product/z4yakuhsnafmnee" RelatedIDs="163387;163389;164296;177483;177484;177485;177486;"/>` +
`<Card CardID="163387" CardName="Command Tower" PageURL="https://www.altersleeves.com/product/m7hp0qm41qg1gze" RelatedIDs="163389;164296;164297;177483;177484;177485;177486;"/>` +
`<Card CardID="177314" CardName="Ponder" PageURL="https://www.altersleeves.com/product/rlnzhd7csa2sedt" RelatedIDs="169017;169019;177311;177312;177313;177315;177316;"/>` +
`<Card CardID="177312" CardName="Ponder" PageURL="https://www.altersleeves.com/product/hnfni1nzvbzm3cg" RelatedIDs="169017;169019;177311;177313;177314;177315;177316;"/>` +
`<Card CardID="169019" CardName="Intuition" PageURL="https://www.altersleeves.com/product/ru5szqyhnxgjugo" RelatedIDs="169017;177311;177312;177313;177314;177315;177316;"/>` +
`<Card CardID="177152" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/h3w0yz1bkqdwp0h" RelatedIDs="177146;177148;177149;177150;177151;177153;177154;"/>` +
`<Card CardID="177150" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/qjdh2guaozdton2" RelatedIDs="177146;177148;177149;177151;177152;177153;177154;"/>` +
`<Card CardID="177148" CardName="Silence" PageURL="https://www.altersleeves.com/product/mewunczozu51ood" RelatedIDs="177146;177149;177150;177151;177152;177153;177154;"/>` +
`<Card CardID="200568" CardName="Promise of Power" PageURL="https://www.altersleeves.com/product/fofgwaccnzsrqpa" RelatedIDs="200554;200555;200556;200558;200560;200561;200563;200564;200565;200567;200569;"/>` +
`<Card CardID="200567" CardName="Demonic Pact" PageURL="https://www.altersleeves.com/product/csfo37mvypu4olq" RelatedIDs="200554;200555;200556;200558;200560;200561;200563;200564;200565;200568;200569;"/>` +
`<Card CardID="124494" CardName="Jin-Gitaxias, Core Augur" PageURL="https://www.altersleeves.com/product/dupwtbxiaxztslm" RelatedIDs="124493;"/>` +
`<Card CardID="164295" CardName="Wrath of God" PageURL="https://www.altersleeves.com/product/kvxickw3q3dlwqx" RelatedIDs="163746;163748;164292;164293;164294;177487;177488;"/>` +
`<Card CardID="164292" CardName="Wrath of God" PageURL="https://www.altersleeves.com/product/uvxbmxqxw2aifru" RelatedIDs="163746;163748;164293;164294;164295;177487;177488;"/>` +
`<Card CardID="163746" CardName="Wrath of God" PageURL="https://www.altersleeves.com/product/tz5iprhvk3fhjub" RelatedIDs="163748;164292;164293;164294;164295;177487;177488;"/>` +
`<Card CardID="185880" CardName="Voidmage Apprentice" PageURL="https://www.altersleeves.com/product/urstdbbyejq95yv" RelatedIDs="185874;185875;185877;185879;185881;"/>` +
`<Card CardID="185879" CardName="Timestream Navigator" PageURL="https://www.altersleeves.com/product/aoigzbw8aadynsb" RelatedIDs="185874;185875;185877;185880;185881;"/>` +
`<Card CardID="185836" CardName="Surgical Extraction" PageURL="https://www.altersleeves.com/product/ilqivo4qrysghit" RelatedIDs="185833;185835;185837;185838;185839;185842;185844;185845;185846;185847;185848;"/>` +
`<Card CardID="185833" CardName="Skullclamp" PageURL="https://www.altersleeves.com/product/7fpyjmfybov8lrg" RelatedIDs="185835;185836;185837;185838;185839;185842;185844;185845;185846;185847;185848;"/>` +
`<Card CardID="121580" CardName="Enlightened Tutor" PageURL="https://www.altersleeves.com/product/4t8ncu2jaccedid" RelatedIDs="121579;"/>` +
`<Card CardID="179140" CardName="Birthing Pod" PageURL="https://www.altersleeves.com/product/hhsilzmofujsbxv" RelatedIDs="179130;179133;179142;179146;179147;"/>` +
`<Card CardID="179130" CardName="Phyrexian Altar" PageURL="https://www.altersleeves.com/product/ip9swaudvwlihle" RelatedIDs="179133;179140;179142;179146;179147;"/>` +
`<Card CardID="177301" CardName="Disenchant" PageURL="https://www.altersleeves.com/product/n5g9lfu2ygpjwjp" RelatedIDs="168618;168620;170003;170004;177302;177303;177304;"/>` +
`<Card CardID="170003" CardName="Path to Exile" PageURL="https://www.altersleeves.com/product/exprlvukegpwdpl" RelatedIDs="168618;168620;170004;177301;177302;177303;177304;"/>` +
`<Card CardID="168618" CardName="Path to Exile" PageURL="https://www.altersleeves.com/product/8i7ieit4t5spwva" RelatedIDs="168620;170003;170004;177301;177302;177303;177304;"/>` +
`<Card CardID="177308" CardName="Council's Judgment" PageURL="https://www.altersleeves.com/product/opapwxu3i0wsumo" RelatedIDs="169021;169023;170017;177305;177307;177309;177310;"/>` +
`<Card CardID="177307" CardName="Karmic Justice" PageURL="https://www.altersleeves.com/product/adqcotdhorde6db" RelatedIDs="169021;169023;170017;177305;177308;177309;177310;"/>` +
`<Card CardID="169023" CardName="Karmic Justice" PageURL="https://www.altersleeves.com/product/xzsbh5kzosuew0j" RelatedIDs="169021;170017;177305;177307;177308;177309;177310;"/>` +
`<Card CardID="177491" CardName="Nether Void" PageURL="https://www.altersleeves.com/product/llhgg5kzgoipyka" RelatedIDs="163770;163774;164290;164291;177492;177493;177494;"/>` +
`<Card CardID="164290" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/4mn9f3pmttejvbi" RelatedIDs="163770;163774;164291;177491;177492;177493;177494;"/>` +
`<Card CardID="163770" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/urzqgpud7urcxic" RelatedIDs="163774;164290;164291;177491;177492;177493;177494;"/>` +
`<Card CardID="177457" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/9tnp3r0dtxrmy7d" RelatedIDs="165326;165328;167193;167194;177456;177458;177459;"/>` +
`<Card CardID="167194" CardName="Blind Obedience" PageURL="https://www.altersleeves.com/product/zgcblcjedgfnpcg" RelatedIDs="165326;165328;167193;177456;177457;177458;177459;"/>` +
`<Card CardID="165328" CardName="Blind Obedience" PageURL="https://www.altersleeves.com/product/demauts8ngqrdqp" RelatedIDs="165326;167193;167194;177456;177457;177458;177459;"/>` +
`<Card CardID="87605" CardName="Thragtusk" PageURL="https://www.altersleeves.com/product/8matctyi7ste9bq" RelatedIDs="125053;125054;87604;87608;87606;87607;87609;"/>` +
`<Card CardID="87604" CardName="Ancient Silverback" PageURL="https://www.altersleeves.com/product/b6penloahgg5vxq" RelatedIDs="119700;119704;87605;87606;87607;87608;87609;"/>` +
`<Card CardID="192241" CardName="Rune-Scarred Demon" PageURL="https://www.altersleeves.com/product/vngvtsae4tzd5cg" RelatedIDs="192217;192221;192223;192230;192232;192236;192237;192238;192240;192242;"/>` +
`<Card CardID="192240" CardName="Judith, the Scourge Diva" PageURL="https://www.altersleeves.com/product/2q2h3rkn355hftv" RelatedIDs="192217;192221;192223;192230;192232;192236;192237;192238;192241;192242;"/>` +
`<Card CardID="177320" CardName="Beast Within" PageURL="https://www.altersleeves.com/product/svttyascuvbtndj" RelatedIDs="167200;167202;177319;177321;177322;165421;165419;"/>` +
`<Card CardID="167202" CardName="Berserk" PageURL="https://www.altersleeves.com/product/8auggzqbwflsfnt" RelatedIDs="167200;177319;177320;177321;177322;165421;165419;"/>` +
`<Card CardID="165421" CardName="Berserk" PageURL="https://www.altersleeves.com/product/y3agtugtvszpioc" RelatedIDs="167200;167202;177319;177320;177321;177322;165419;"/>` +
`<Card CardID="177503" CardName="Wheel of Fate" PageURL="https://www.altersleeves.com/product/akgt8opws65nlba" RelatedIDs="163639;163641;164285;164286;170041;170043;177502;177505;177510;"/>` +
`<Card CardID="164286" CardName="Wheel of Fortune" PageURL="https://www.altersleeves.com/product/8jteznazzs7jqkc" RelatedIDs="163639;163641;164285;170041;170043;177502;177503;177505;177510;"/>` +
`<Card CardID="163641" CardName="Wheel of Fortune" PageURL="https://www.altersleeves.com/product/m5ttqrrgyhogxhx" RelatedIDs="163639;164285;164286;170041;170043;177502;177503;177505;177510;"/>` +
`<Card CardID="86418" CardName="Expedition Map" PageURL="https://www.altersleeves.com/product/pe0atrp8t1l3omo" RelatedIDs="86417;159241;159242;"/>` +
`<Card CardID="176696" CardName="Regrowth" PageURL="https://www.altersleeves.com/product/fijuafhi1rgnznm" RelatedIDs="176620;176622;176624;176694;176695;176697;176698;176699;"/>` +
`<Card CardID="176624" CardName="Regrowth" PageURL="https://www.altersleeves.com/product/musseu33iokcxmb" RelatedIDs="176620;176622;176694;176695;176696;176697;176698;176699;"/>` +
`<Card CardID="172204" CardName="Rampant Growth" PageURL="https://www.altersleeves.com/product/zltin4qmvwlurme" RelatedIDs="169588;169590;170438;170439;172203;172531;172532;"/>` +
`<Card CardID="170438" CardName="Doubling Season" PageURL="https://www.altersleeves.com/product/fqiyipdpsri0snn" RelatedIDs="169588;169590;170439;172203;172204;172531;172532;"/>` +
`<Card CardID="169588" CardName="Doubling Season" PageURL="https://www.altersleeves.com/product/v2yeige1n1gt3hm" RelatedIDs="169590;170438;170439;172203;172204;172531;172532;"/>` +
`<Card CardID="177523" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/zkphxe8w4tpiadt" RelatedIDs="163443;164279;164281;164282;164284;177524;177526;177527;177528;163445;"/>` +
`<Card CardID="164282" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/e8cycsl9du2lwxq" RelatedIDs="163443;164279;164281;164284;177523;177524;177526;177527;177528;163445;"/>` +
`<Card CardID="163445" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/y7d0zswrsvlwnda" RelatedIDs="163443;164279;164281;164282;164284;177523;177524;177526;177527;177528;"/>` +
`<Card CardID="176047" CardName="Coffin Queen" PageURL="https://www.altersleeves.com/product/eldnupkgaqnsiip" RelatedIDs="128544;128545;128546;176048;201871;201873;201867;201874;154615;"/>` +
`<Card CardID="154615" CardName="Queen Marchesa" PageURL="https://www.altersleeves.com/product/rfkcgc6e9qafs4b" RelatedIDs="128544;128545;128546;176047;176048;201871;201873;201867;201874;"/>` +
`<Card CardID="178794" CardName="Nath of the Gilt-Leaf" PageURL="https://www.altersleeves.com/product/1a7wlgprsb3rjxa" RelatedIDs="178796;178797;178798;"/>` +
`<Card CardID="172528" CardName="Darkness" PageURL="https://www.altersleeves.com/product/mjyv6bkz6xraoq2" RelatedIDs="169852;169854;170450;170451;172155;172200;172530;172544;172545;"/>` +
`<Card CardID="172155" CardName="Skullclamp" PageURL="https://www.altersleeves.com/product/huibrzbm0ys6ssx" RelatedIDs="169852;169854;170450;170451;172200;172528;172530;172544;172545;"/>` +
`<Card CardID="170450" CardName="Diabolic Intent" PageURL="https://www.altersleeves.com/product/4gqkrpmb7zbfvri" RelatedIDs="169852;169854;170451;172155;172200;172528;172530;172544;172545;"/>` +
`<Card CardID="169852" CardName="Diabolic Intent" PageURL="https://www.altersleeves.com/product/ggnwlp7lbr72wrs" RelatedIDs="169854;170450;170451;172155;172200;172528;172530;172544;172545;"/>` +
`<Card CardID="177313" CardName="Ponder" PageURL="https://www.altersleeves.com/product/ttrulusxywr7ino" RelatedIDs="169017;169019;177311;177312;177314;177315;177316;"/>` +
`<Card CardID="177311" CardName="Ponder" PageURL="https://www.altersleeves.com/product/li0htrhchk4pt1q" RelatedIDs="169017;169019;177312;177313;177314;177315;177316;"/>` +
`<Card CardID="169017" CardName="Intuition" PageURL="https://www.altersleeves.com/product/pi3hajkb14f9g46" RelatedIDs="169019;177311;177312;177313;177314;177315;177316;"/>` +
`<Card CardID="178796" CardName="Nath of the Gilt-Leaf" PageURL="https://www.altersleeves.com/product/fbffsh4yoqtxnvr" RelatedIDs="178794;178797;178798;"/>` +
`<Card CardID="200555" CardName="Lord of the Void" PageURL="https://www.altersleeves.com/product/ygkiyeykdi3wlxf" RelatedIDs="200554;200556;200558;200560;200561;200563;200564;200565;200567;200568;200569;"/>` +
`<Card CardID="200554" CardName="Razaketh, the Foulblooded" PageURL="https://www.altersleeves.com/product/wj0nwp4duzbhvys" RelatedIDs="200555;200556;200558;200560;200561;200563;200564;200565;200567;200568;200569;"/>` +
`<Card CardID="176702" CardName="Windfall" PageURL="https://www.altersleeves.com/product/ap3loncyxe9rkoz" RelatedIDs="176523;176525;176530;176532;176700;176701;176703;176705;176706;176708;176709;"/>` +
`<Card CardID="176525" CardName="Windfall" PageURL="https://www.altersleeves.com/product/lti8g8cvski1bac" RelatedIDs="176523;176530;176532;176700;176701;176702;176703;176705;176706;176708;176709;"/>` +
`<Card CardID="177305" CardName="Council's Judgment" PageURL="https://www.altersleeves.com/product/2xswbhpgxzvfkzq" RelatedIDs="169021;169023;170017;177307;177308;177309;177310;"/>` +
`<Card CardID="170017" CardName="Karmic Justice" PageURL="https://www.altersleeves.com/product/pggnwo4mgpfh2po" RelatedIDs="169021;169023;177305;177307;177308;177309;177310;"/>` +
`<Card CardID="169021" CardName="Karmic Justice" PageURL="https://www.altersleeves.com/product/xv1irvzypwg65r6" RelatedIDs="169023;170017;177305;177307;177308;177309;177310;"/>` +
`<Card CardID="167191" CardName="Sylvan Library" PageURL="https://www.altersleeves.com/product/vioc8luhz04hdsc" RelatedIDs="165322;165324;167189;167190;167192;177460;177462;"/>` +
`<Card CardID="167190" CardName="Sylvan Library" PageURL="https://www.altersleeves.com/product/oejd2elt8aeucl9" RelatedIDs="165322;165324;167189;167191;167192;177460;177462;"/>` +
`<Card CardID="165324" CardName="Sylvan Library" PageURL="https://www.altersleeves.com/product/dpjyrovvgjrorss" RelatedIDs="165322;167189;167190;167191;167192;177460;177462;"/>` +
`<Card CardID="207627" CardName="Emrakul, the Aeons Torn" PageURL="https://www.altersleeves.com/product/ffgccigdli4qg04" RelatedIDs="207629;"/>` +
`<Card CardID="200542" CardName="Frankenstein's Monster" PageURL="https://www.altersleeves.com/product/bhccyguij1n8gai" RelatedIDs="200538;200540;200541;200543;200544;200546;200547;200548;200550;200551;200552;"/>` +
`<Card CardID="200541" CardName="Sedris, the Traitor King" PageURL="https://www.altersleeves.com/product/wofiotfbk1oa8we" RelatedIDs="200538;200540;200542;200543;200544;200546;200547;200548;200550;200551;200552;"/>` +
`<Card CardID="200540" CardName="Gravecrawler" PageURL="https://www.altersleeves.com/product/5yomhlwvb2sgdit" RelatedIDs="200538;200541;200542;200543;200544;200546;200547;200548;200550;200551;200552;"/>` +
`<Card CardID="172203" CardName="Rampant Growth" PageURL="https://www.altersleeves.com/product/zwwkajz3wumieya" RelatedIDs="169588;169590;170438;170439;172204;172531;172532;"/>` +
`<Card CardID="170439" CardName="Doubling Season" PageURL="https://www.altersleeves.com/product/ehnmn1y4jkwqfxm" RelatedIDs="169588;169590;170438;172203;172204;172531;172532;"/>` +
`<Card CardID="169590" CardName="Doubling Season" PageURL="https://www.altersleeves.com/product/5qpxbjpxnkjbyo1" RelatedIDs="169588;170438;170439;172203;172204;172531;172532;"/>` +
`<Card CardID="172530" CardName="Darkness" PageURL="https://www.altersleeves.com/product/mxoxzincimcdrek" RelatedIDs="169852;169854;170450;170451;172155;172200;172528;172544;172545;"/>` +
`<Card CardID="172200" CardName="Skullclamp" PageURL="https://www.altersleeves.com/product/x5obgbeaszz4tgb" RelatedIDs="169852;169854;170450;170451;172155;172528;172530;172544;172545;"/>` +
`<Card CardID="170451" CardName="Diabolic Intent" PageURL="https://www.altersleeves.com/product/0zjiweucf34bvr0" RelatedIDs="169852;169854;170450;172155;172200;172528;172530;172544;172545;"/>` +
`<Card CardID="169854" CardName="Diabolic Intent" PageURL="https://www.altersleeves.com/product/wpdaip9glbnx2js" RelatedIDs="169852;170450;170451;172155;172200;172528;172530;172544;172545;"/>` +
`<Card CardID="177302" CardName="Disenchant" PageURL="https://www.altersleeves.com/product/bbviekezbcofsid" RelatedIDs="168618;168620;170003;170004;177301;177303;177304;"/>` +
`<Card CardID="170004" CardName="Path to Exile" PageURL="https://www.altersleeves.com/product/ee4cn5bqsts08d1" RelatedIDs="168618;168620;170003;177301;177302;177303;177304;"/>` +
`<Card CardID="168620" CardName="Path to Exile" PageURL="https://www.altersleeves.com/product/wfly0t69pwh54re" RelatedIDs="168618;170003;170004;177301;177302;177303;177304;"/>` +
`<Card CardID="200538" CardName="Gravecrawler" PageURL="https://www.altersleeves.com/product/sxg9vdoipvmjvcm" RelatedIDs="200540;200541;200542;200543;200544;200546;200547;200548;200550;200551;200552;"/>` +
`<Card CardID="172536" CardName="Replenish" PageURL="https://www.altersleeves.com/product/0v9thsyab4vu4kx" RelatedIDs="169340;169342;172205;172206;172207;172208;172535;172537;172538;"/>` +
`<Card CardID="172206" CardName="Land Tax" PageURL="https://www.altersleeves.com/product/aqmcmbxhojp2f5r" RelatedIDs="169340;169342;172205;172207;172208;172535;172536;172537;172538;"/>` +
`<Card CardID="172205" CardName="Land Tax" PageURL="https://www.altersleeves.com/product/s0kh0kl3aiouwat" RelatedIDs="169340;169342;172206;172207;172208;172535;172536;172537;172538;"/>` +
`<Card CardID="169342" CardName="Smothering Tithe" PageURL="https://www.altersleeves.com/product/ahhemr0vcexpffi" RelatedIDs="169340;172205;172206;172207;172208;172535;172536;172537;172538;"/>` +
`<Card CardID="172542" CardName="Trinisphere" PageURL="https://www.altersleeves.com/product/vsevy4ookat23yr?printing_id=164579" RelatedIDs="169999;170001;170456;170457;172198;172199;172533;172534;172543;"/>` +
`<Card CardID="155118" CardName="Emerald Medallion" PageURL="https://www.altersleeves.com/product/ov1qsegglizi3yk?printing_id=78497" RelatedIDs="155117;"/>` +
`<Card CardID="154817" CardName="Pearl Medallion" PageURL="https://www.altersleeves.com/product/yidn99277fffrev?printing_id=78480" RelatedIDs="154818;"/>` +
`<Card CardID="159245" CardName="Mana Crypt" PageURL="https://www.altersleeves.com/product/nhglrwnfnpyhz8o?printing_id=49220" RelatedIDs=""/>` +
`<Card CardID="120145" CardName="Matter Reshaper" PageURL="https://www.altersleeves.com/product/nohvhsh3hufrr3o?printing_id=50152" RelatedIDs="120007;"/>` +
`<Card CardID="183260" CardName="Rakdos the Defiler" PageURL="https://www.altersleeves.com/product/tezywpta9nugyey?printing_id=39673" RelatedIDs="183256;183257;183259;"/>` +
`<Card CardID="176693" CardName="Commander's Sphere" PageURL="https://www.altersleeves.com/product/ojvl4eert7n9gf8?printing_id=41354" RelatedIDs="176684;176686;176687;176688;176689;176690;176692;"/>` +
`<Card CardID="169139" CardName="Wrenn and Six" PageURL="https://www.altersleeves.com/product/uvhbxnacjfvkrhj?printing_id=38862" RelatedIDs="34610;"/>` +
`<Card CardID="182990" CardName="Leonin Arbiter" PageURL="https://www.altersleeves.com/product/pfgapmkxyfe8ont?printing_id=62047" RelatedIDs="182988;"/>` +
`<Card CardID="124979" CardName="Oketra the True" PageURL="https://www.altersleeves.com/product/utvvpxq55bkhumn?printing_id=46507" RelatedIDs="124927;"/>` +
`<Card CardID="124695" CardName="Kruphix, God of Horizons" PageURL="https://www.altersleeves.com/product/moefnjbn65ebcug?printing_id=55283" RelatedIDs="124694;"/>` +
`<Card CardID="164565" CardName="Thalia, Guardian of Thraben" PageURL="https://www.altersleeves.com/product/vakde0nvzwym60d?printing_id=43447" RelatedIDs="164347;"/>` +
`<Card CardID="176335" CardName="Teysa, Orzhov Scion" PageURL="https://www.altersleeves.com/product/ck74vxqoqecvjjz?printing_id=68504" RelatedIDs="176330;176332;176333;176334;176336;"/>` +
`<Card CardID="177521" CardName="The Immortal Sun" PageURL="https://www.altersleeves.com/product/xvtsb0m1todqn8k?printing_id=43634" RelatedIDs="163293;163295;163643;163645;177517;177518;177520;177522;"/>` +
`<Card CardID="168461" CardName="Craterhoof Behemoth" PageURL="https://www.altersleeves.com/product/hsc7ggglshlzqf4?printing_id=58896" RelatedIDs="168459;169188;170190;192949;"/>` +
`<Card CardID="86912" CardName="Helm of the Host" PageURL="https://www.altersleeves.com/product/rmtcs6omrmulm7w?printing_id=42819" RelatedIDs="86911;"/>` +
`<Card CardID="198115" CardName="Blood Artist" PageURL="https://www.altersleeves.com/product/7ecvu7r1ipzaqqy?printing_id=126955" RelatedIDs="198113;"/>` +
`<Card CardID="33833" CardName="Lake of the Dead" PageURL="https://www.altersleeves.com/product/algfn8nco8m1mrt?printing_id=80470" RelatedIDs=""/>` +
`<Card CardID="189450" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/t4vmxr21pw9ypyv?printing_id=167649" RelatedIDs="189438;189440;189443;189446;189448;189449;189451;"/>` +
`<Card CardID="156808" CardName="Tatyova, Benthic Druid" PageURL="https://www.altersleeves.com/product/wm2oryeddsqtqyb?printing_id=42830" RelatedIDs="156805;156806;156807;156809;156810;156813;156814;"/>` +
`<Card CardID="87583" CardName="Forest" PageURL="https://www.altersleeves.com/product/nlwkm9ctophv8ue?printing_id=50837" RelatedIDs=""/>` +
`<Card CardID="156807" CardName="Tatyova, Benthic Druid" PageURL="https://www.altersleeves.com/product/shzd4iifwu8l8p1?printing_id=42830" RelatedIDs="156805;156806;156808;156809;156810;156813;156814;"/>` +
`<Card CardID="118112" CardName="Endbringer" PageURL="https://www.altersleeves.com/product/wq8swqea5mzu9fs?printing_id=50155" RelatedIDs="120008;"/>` +
`<Card CardID="152535" CardName="Jet Medallion" PageURL="https://www.altersleeves.com/product/sectgp7zhrot2uw?printing_id=53398" RelatedIDs="152536;"/>` +
`<Card CardID="119920" CardName="Savvy Hunter" PageURL="https://www.altersleeves.com/product/hhazkw4fbu3hroo?printing_id=117288" RelatedIDs=""/>` +
`<Card CardID="160614" CardName="Tezzeret, Master of the Bridge" PageURL="https://www.altersleeves.com/product/zoamqmcxdxr6yzt?printing_id=39128" RelatedIDs=""/>` +
`<Card CardID="154124" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/6msgqmnio9eiu5d?printing_id=82921" RelatedIDs="34365;"/>` +
`<Card CardID="124382" CardName="Tishana, Voice of Thunder" PageURL="https://www.altersleeves.com/product/kpngdcgnmd4jiwn?printing_id=44583" RelatedIDs="124381;124383;"/>` +
`<Card CardID="198096" CardName="Mystic Remora" PageURL="https://www.altersleeves.com/product/6dapg49l4oqdruq?printing_id=81727" RelatedIDs="198100;"/>` +
`<Card CardID="155416" CardName="Mox Diamond" PageURL="https://www.altersleeves.com/product/2fkq4wmsmevcstk?printing_id=62152" RelatedIDs=""/>` +
`<Card CardID="124937" CardName="Kefnet the Mindful" PageURL="https://www.altersleeves.com/product/dvahiz8zfl6fmhp?printing_id=46469" RelatedIDs="125009;"/>` +
`<Card CardID="124491" CardName="Elesh Norn, Grand Cenobite" PageURL="https://www.altersleeves.com/product/fvz1gex2ajrlbk3?printing_id=44408" RelatedIDs="124492;"/>` +
`<Card CardID="161380" CardName="Elenda, the Dusk Rose" PageURL="https://www.altersleeves.com/product/lag1heibjetaucq?printing_id=43657" RelatedIDs="152609;152611;152612;152613;161378;"/>` +
`<Card CardID="152462" CardName="Mangara of Corondor" PageURL="https://www.altersleeves.com/product/0kzjm10gn0logag?printing_id=42639" RelatedIDs="120595;152461;152464;152465;"/>` +
`<Card CardID="128065" CardName="God-Eternal Kefnet" PageURL="https://www.altersleeves.com/product/wm30nsxbcbb7xa1?printing_id=39381" RelatedIDs="128151;"/>` +
`<Card CardID="124196" CardName="Plains" PageURL="https://www.altersleeves.com/product/yfqvsca8daq6rp8?printing_id=71995" RelatedIDs="124061;"/>` +
`<Card CardID="178791" CardName="Aetherflux Reservoir" PageURL="https://www.altersleeves.com/product/bnfzt4j63ttru1g?printing_id=48216" RelatedIDs="178789;"/>` +
`<Card CardID="150570" CardName="Sword of Body and Mind" PageURL="https://www.altersleeves.com/product/fjvaf9lkbdzlt9i?printing_id=61853" RelatedIDs="182621;182627;150573;"/>` +
`<Card CardID="34400" CardName="Purphoros, God of the Forge" PageURL="https://www.altersleeves.com/product/i2il6ugv3j44ohw?printing_id=56320" RelatedIDs=""/>` +
`<Card CardID="150572" CardName="Sword of War and Peace" PageURL="https://www.altersleeves.com/product/ayvoas8xr3mh3kf?printing_id=60519" RelatedIDs="150579;182625;182635;"/>` +
`<Card CardID="156814" CardName="Thassa's Oracle" PageURL="https://www.altersleeves.com/product/mjof8hheo7do2sl?printing_id=125260" RelatedIDs="156805;156806;156807;156808;156809;156810;156813;"/>` +
`<Card CardID="172130" CardName="Tamiyo, Field Researcher" PageURL="https://www.altersleeves.com/product/znzrdurgtrtdbym?printing_id=48913" RelatedIDs="172128;"/>` +
`<Card CardID="151036" CardName="Plains" PageURL="https://www.altersleeves.com/product/axqxrzflythf66e?printing_id=150626" RelatedIDs=""/>` +
`<Card CardID="34068" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/rfft9fuu5ltonny?printing_id=40385" RelatedIDs="34103;"/>` +
`<Card CardID="174297" CardName="Ashiok, Dream Render" PageURL="https://www.altersleeves.com/product/fh9zymk8regamdh?printing_id=39184" RelatedIDs="174299;"/>` +
`<Card CardID="128828" CardName="Heliod, Sun-Crowned" PageURL="https://www.altersleeves.com/product/pam5dtzlaq4pfw6?printing_id=125550" RelatedIDs="128829;"/>` +
`<Card CardID="125054" CardName="Thragtusk" PageURL="https://www.altersleeves.com/product/e5r5wo6bveqaffl?printing_id=46914" RelatedIDs="125053;87605;"/>` +
`<Card CardID="206812" CardName="Grim Monolith" PageURL="https://www.altersleeves.com/product/91zgsx7gwbwv779?printing_id=77172" RelatedIDs="206810;"/>` +
`<Card CardID="124770" CardName="Pharika, God of Affliction" PageURL="https://www.altersleeves.com/product/mpimk7b3g5enkq0?printing_id=55281" RelatedIDs="124771;"/>` +
`<Card CardID="33797" CardName="Liliana of the Dark Realms" PageURL="https://www.altersleeves.com/product/h8tcfllzwdxhjzp?printing_id=56740" RelatedIDs=""/>` +
`<Card CardID="177501" CardName="Propaganda" PageURL="https://www.altersleeves.com/product/jir14ngxzdk10fv?printing_id=48024" RelatedIDs="164984;164986;167179;167184;167187;167188;177463;177464;177467;177499;"/>` +
`<Card CardID="194721" CardName="Lightning Greaves" PageURL="https://www.altersleeves.com/product/81jz50n045spask?printing_id=164826" RelatedIDs="194897;"/>` +
`<Card CardID="124927" CardName="Oketra the True" PageURL="https://www.altersleeves.com/product/dwp9mrsvqjmolpp?printing_id=46507" RelatedIDs="124979;"/>` +
`<Card CardID="152547" CardName="Jet Medallion" PageURL="https://www.altersleeves.com/product/jjrrobcbyf3vwqx?printing_id=78488" RelatedIDs="152546;"/>` +
`<Card CardID="189466" CardName="Vilis, Broker of Blood" PageURL="https://www.altersleeves.com/product/iapxnqqayv9wfku?printing_id=38691" RelatedIDs="189462;"/>` +
`<Card CardID="189456" CardName="Ruric Thar, the Unbowed" PageURL="https://www.altersleeves.com/product/ybctnttdbtpwgta?printing_id=57157" RelatedIDs="189453;189458;189460;"/>` +
`<Card CardID="190819" CardName="Buried Alive" PageURL="https://www.altersleeves.com/product/el28dhdjok7zidg?printing_id=40390" RelatedIDs="190817;190818;"/>` +
`<Card CardID="169188" CardName="Craterhoof Behemoth" PageURL="https://www.altersleeves.com/product/5q3o9cnhrobmbof?printing_id=46935" RelatedIDs="168461;168459;170190;192949;"/>` +
`<Card CardID="124807" CardName="Ephara, God of the Polis" PageURL="https://www.altersleeves.com/product/i8tuf3pcncmc5jn?printing_id=55602" RelatedIDs="124806;"/>` +
`<Card CardID="125053" CardName="Thragtusk" PageURL="https://www.altersleeves.com/product/rs22rumck4slbks?printing_id=46914" RelatedIDs="125054;87605;"/>` +
`<Card CardID="123711" CardName="Reality Smasher" PageURL="https://www.altersleeves.com/product/gxh1h1bomefrpsk?printing_id=50151" RelatedIDs="123710;"/>` +
`<Card CardID="158965" CardName="Command Tower" PageURL="https://www.altersleeves.com/product/targx9gzfogkqnc?printing_id=38036" RelatedIDs="158964;"/>` +
`<Card CardID="171965" CardName="Teferi, Master of Time" PageURL="https://www.altersleeves.com/product/zv9fhodqen63omj?printing_id=162502" RelatedIDs="171967;"/>` +
`<Card CardID="177460" CardName="Veil of Summer" PageURL="https://www.altersleeves.com/product/ujdtuutoiodw3ac?printing_id=38615" RelatedIDs="165322;165324;167189;167190;167191;167192;177462;"/>` +
`<Card CardID="177299" CardName="Phyrexian Reclamation" PageURL="https://www.altersleeves.com/product/xaytqxp1kxujm6u?printing_id=166263" RelatedIDs="169013;169015;170005;170006;170007;170008;177297;177300;"/>` +
`<Card CardID="208640" CardName="Kenrith, the Returned King" PageURL="https://www.altersleeves.com/product/mzrbeyeb64wlacj?printing_id=117185" RelatedIDs=""/>` +
`<Card CardID="170689" CardName="Jace, Wielder of Mysteries" PageURL="https://www.altersleeves.com/product/ojcezvny3p0h7jy?printing_id=39380" RelatedIDs=""/>` +
`<Card CardID="124198" CardName="Island" PageURL="https://www.altersleeves.com/product/zirbdnkhzu9pz6h?printing_id=71991" RelatedIDs="124067;"/>` +
`<Card CardID="167611" CardName="Persistent Petitioners" PageURL="https://www.altersleeves.com/product/pwlyjeo8vjibp1k?printing_id=40046" RelatedIDs="167609;"/>` +
`<Card CardID="185877" CardName="Dreamborn Muse" PageURL="https://www.altersleeves.com/product/d6pe1jlfvyjxuz3?printing_id=72588" RelatedIDs="185874;185875;185879;185880;185881;"/>` +
`<Card CardID="151584" CardName="Gishath, Sun's Avatar" PageURL="https://www.altersleeves.com/product/baqisjgpfvxmvjo?printing_id=44591" RelatedIDs="151583;151585;"/>` +
`<Card CardID="164252" CardName="Liliana, the Necromancer" PageURL="https://www.altersleeves.com/product/ejgwy4n0l29gcis?printing_id=41759" RelatedIDs="164248;164256;164258;164260;164262;164264;"/>` +
`<Card CardID="183257" CardName="Rakdos the Defiler" PageURL="https://www.altersleeves.com/product/5sml000mgssbsjo?printing_id=39673" RelatedIDs="183256;183259;183260;"/>` +
`<Card CardID="124061" CardName="Plains" PageURL="https://www.altersleeves.com/product/9uicxhyb6brhsam?printing_id=150626" RelatedIDs="124196;"/>` +
`<Card CardID="128896" CardName="Thassa, Deep-Dwelling" PageURL="https://www.altersleeves.com/product/tvu9nolzcnhbkyt?printing_id=125497" RelatedIDs="128895;"/>` +
`<Card CardID="127806" CardName="The Scorpion God" PageURL="https://www.altersleeves.com/product/mch9how4mvozl7y?printing_id=45371" RelatedIDs="127807;"/>` +
`<Card CardID="124033" CardName="Command Tower" PageURL="https://www.altersleeves.com/product/lkwmfkpa70v3a7c?printing_id=50535" RelatedIDs=""/>` +
`<Card CardID="167961" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/yjlbg4apjyl8gq5?printing_id=47846" RelatedIDs="167963;"/>` +
`<Card CardID="124677" CardName="Mana Vault" PageURL="https://www.altersleeves.com/product/1iggsqqqhyzcieu?printing_id=40249" RelatedIDs=""/>` +
`<Card CardID="182619" CardName="Sword of Fire and Ice" PageURL="https://www.altersleeves.com/product/pjylyrfktlnf3nn?printing_id=163885" RelatedIDs="150575;150463;182631;"/>` +
`<Card CardID="86419" CardName="World Breaker" PageURL="https://www.altersleeves.com/product/cqyirfd1wblowhz?printing_id=50032" RelatedIDs="86409;"/>` +
`<Card CardID="180949" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/boaqrkq0xe5sohu?printing_id=41332" RelatedIDs="180968;"/>` +
`<Card CardID="154651" CardName="Ruby Medallion" PageURL="https://www.altersleeves.com/product/5lrdv8mwl38ljqs?printing_id=53376" RelatedIDs="154650;"/>` +
`<Card CardID="177505" CardName="Spinning Wheel" PageURL="https://www.altersleeves.com/product/jtntdrilpe3j8ey?printing_id=117254" RelatedIDs="163639;163641;164285;164286;170041;170043;177502;177503;177510;"/>` +
`<Card CardID="120007" CardName="Matter Reshaper" PageURL="https://www.altersleeves.com/product/sshqrjwezaccnte?printing_id=50152" RelatedIDs="120145;"/>` +
`<Card CardID="163914" CardName="Trynn, Champion of Freedom" PageURL="https://www.altersleeves.com/product/gyl4sybwyhdvsgx?printing_id=156406" RelatedIDs="163916;"/>` +
`<Card CardID="160591" CardName="Wooded Foothills" PageURL="https://www.altersleeves.com/product/galrmbvyrzqtotr?printing_id=53934" RelatedIDs=""/>` +
`<Card CardID="192801" CardName="Swords to Plowshares" PageURL="https://www.altersleeves.com/product/ldbaux8qo8n33pd?printing_id=82520" RelatedIDs="192799;192800;192803;192804;192806;192808;192810;"/>` +
`<Card CardID="167575" CardName="Sword of Body and Mind" PageURL="https://www.altersleeves.com/product/26kbeuihsvqi6nv?printing_id=163872" RelatedIDs="167573;167583;"/>` +
`<Card CardID="33827" CardName="Narset, Enlightened Master" PageURL="https://www.altersleeves.com/product/gxrcpxyxp1tvxrr?printing_id=53993" RelatedIDs=""/>` +
`<Card CardID="120008" CardName="Endbringer" PageURL="https://www.altersleeves.com/product/rldauqvgj62m3lx?printing_id=50155" RelatedIDs="118112;"/>` +
`<Card CardID="33974" CardName="Urza's Tower" PageURL="https://www.altersleeves.com/product/hqssslnntazpx6e?printing_id=84120" RelatedIDs=""/>` +
`<Card CardID="180963" CardName="Thought Vessel" PageURL="https://www.altersleeves.com/product/pna57epvqakz5xh?printing_id=171920" RelatedIDs="180965;"/>` +
`<Card CardID="124820" CardName="Phenax, God of Deception" PageURL="https://www.altersleeves.com/product/dd893rytmy8d84n?printing_id=55595" RelatedIDs="124819;"/>` +
`<Card CardID="156640" CardName="Chrome Mox" PageURL="https://www.altersleeves.com/product/j1obgshsfiqodti?printing_id=49226" RelatedIDs="156641;"/>` +
`<Card CardID="162181" CardName="Tamiyo, Field Researcher" PageURL="https://www.altersleeves.com/product/sioxztuus9ztzax?printing_id=48913" RelatedIDs=""/>` +
`<Card CardID="33560" CardName="Breya, Etherium Shaper" PageURL="https://www.altersleeves.com/product/pvpzpzeqhpyvwp1?printing_id=48089" RelatedIDs=""/>` +
`<Card CardID="154250" CardName="Verdant Catacombs" PageURL="https://www.altersleeves.com/product/q7jz08utftidj9g?printing_id=46808" RelatedIDs="154251;"/>` +
`<Card CardID="172028" CardName="Karn, the Great Creator" PageURL="https://www.altersleeves.com/product/dmduwakkqmjdce1?printing_id=39438" RelatedIDs="172030;34952;"/>` +
`<Card CardID="163941" CardName="Silvar, Devourer of the Free" PageURL="https://www.altersleeves.com/product/snajrkkypqqeass?printing_id=156397" RelatedIDs="163937;"/>` +
`<Card CardID="176044" CardName="Yarok, the Desecrated" PageURL="https://www.altersleeves.com/product/snqww6e3lplx7oe?printing_id=38592" RelatedIDs="176046;"/>` +
`<Card CardID="166813" CardName="Sliver Queen" PageURL="https://www.altersleeves.com/product/farhmws8iglpqgm?printing_id=78297" RelatedIDs="166810;"/>` +
`<Card CardID="120245" CardName="Scapeshift" PageURL="https://www.altersleeves.com/product/mlocm2gkkcscldv?printing_id=41849" RelatedIDs="120244;120247;33912;"/>` +
`<Card CardID="34067" CardName="Atraxa, Praetors' Voice" PageURL="https://www.altersleeves.com/product/wcwxx1zveabgbpn?printing_id=48090" RelatedIDs=""/>` +
`<Card CardID="167963" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/sgieahzfydlvtr3?printing_id=47846" RelatedIDs="167961;"/>` +
`<Card CardID="178031" CardName="Mana Crypt" PageURL="https://www.altersleeves.com/product/sxrgwi9czovcuju?printing_id=61474" RelatedIDs="178028;178029;"/>` +
`<Card CardID="190821" CardName="Survival of the Fittest" PageURL="https://www.altersleeves.com/product/181kg9yhp9sljvy?printing_id=77988" RelatedIDs="190823;"/>` +
`<Card CardID="121537" CardName="Mystical Tutor" PageURL="https://www.altersleeves.com/product/nmdaeauofue31ji?printing_id=64135" RelatedIDs="121538;121539;"/>` +
`<Card CardID="152536" CardName="Jet Medallion" PageURL="https://www.altersleeves.com/product/8joqovdicbsbztj?printing_id=53398" RelatedIDs="152535;"/>` +
`<Card CardID="161137" CardName="Selvala, Heart of the Wilds" PageURL="https://www.altersleeves.com/product/6ffjciar0ehhvcm?printing_id=48796" RelatedIDs="161135;161148;"/>` +
`<Card CardID="34231" CardName="All Is Dust" PageURL="https://www.altersleeves.com/product/jouviqor6230ykc?printing_id=127543" RelatedIDs=""/>` +
`<Card CardID="183271" CardName="Assassin's Trophy" PageURL="https://www.altersleeves.com/product/h0kvqfck0e6epft?printing_id=41025" RelatedIDs="181653;181657;183270;183272;183273;"/>` +
`<Card CardID="167609" CardName="Persistent Petitioners" PageURL="https://www.altersleeves.com/product/ybbyhmt3l2x8z79?printing_id=40046" RelatedIDs="167611;"/>` +
`<Card CardID="192205" CardName="Sidisi, Brood Tyrant" PageURL="https://www.altersleeves.com/product/osqmu4aotztfmsh?printing_id=53984" RelatedIDs="192207;"/>` +
`<Card CardID="176336" CardName="Teysa, Orzhov Scion" PageURL="https://www.altersleeves.com/product/wrhpikkjsbknzib?printing_id=68504" RelatedIDs="176330;176332;176333;176334;176335;"/>` +
`<Card CardID="167718" CardName="Sword of Light and Shadow" PageURL="https://www.altersleeves.com/product/qaxoye6grmkqk8f?printing_id=164757" RelatedIDs="167714;167716;"/>` +
`<Card CardID="124981" CardName="Hazoret the Fervent" PageURL="https://www.altersleeves.com/product/77qqtofyaj9iaav?printing_id=46392" RelatedIDs="125008;"/>` +
`<Card CardID="34868" CardName="Counterspell" PageURL="https://www.altersleeves.com/product/cxmrzoshomjssaz?printing_id=43433" RelatedIDs=""/>` +
`<Card CardID="177300" CardName="Phyrexian Reclamation" PageURL="https://www.altersleeves.com/product/30mqx2oyykfzghb?printing_id=166263" RelatedIDs="169013;169015;170005;170006;170007;170008;177297;177299;"/>` +
`<Card CardID="162325" CardName="Karlov of the Ghost Council" PageURL="https://www.altersleeves.com/product/bbhwcgt7buuy8pe?printing_id=50770" RelatedIDs="162323;"/>` +
`<Card CardID="182633" CardName="Sword of Light and Shadow" PageURL="https://www.altersleeves.com/product/5lwxr8qfgtiz0il?printing_id=164757" RelatedIDs="150571;150576;182623;"/>` +
`<Card CardID="160589" CardName="Scalding Tarn" PageURL="https://www.altersleeves.com/product/wzo2oz8jkoi8iox?printing_id=63450" RelatedIDs=""/>` +
`<Card CardID="124789" CardName="Xenagos, God of Revels" PageURL="https://www.altersleeves.com/product/j9mxh8eskgqygle?printing_id=55591" RelatedIDs="124788;"/>` +
`<Card CardID="206818" CardName="Magda, Brazen Outlaw" PageURL="https://www.altersleeves.com/product/wgjmp2zhatbvbgw?printing_id=177837" RelatedIDs="206816;"/>` +
`<Card CardID="200565" CardName="Demonic Attorney" PageURL="https://www.altersleeves.com/product/pq29mrwgrfpwch8?printing_id=83092" RelatedIDs="200554;200555;200556;200558;200560;200561;200563;200564;200567;200568;200569;"/>` +
`<Card CardID="192232" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/zqkrkfqijvimxjl?printing_id=126916" RelatedIDs="192217;192221;192223;192230;192236;192237;192238;192240;192241;192242;"/>` +
`<Card CardID="172128" CardName="Tamiyo, Field Researcher" PageURL="https://www.altersleeves.com/product/ftueskch3hobgss?printing_id=48913" RelatedIDs="172130;"/>` +
`<Card CardID="192223" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/1dtsanrnz9q2jc9?printing_id=126916" RelatedIDs="192217;192221;192230;192232;192236;192237;192238;192240;192241;192242;"/>` +
`<Card CardID="119706" CardName="Ezuri, Renegade Leader" PageURL="https://www.altersleeves.com/product/ap6zxqwienk3b8b?printing_id=61942" RelatedIDs="119702;"/>` +
`<Card CardID="124490" CardName="Sheoldred, Whispering One" PageURL="https://www.altersleeves.com/product/vthcrxblgtjfopa?printing_id=44318" RelatedIDs="124497;"/>` +
`<Card CardID="119705" CardName="Cancel" PageURL="https://www.altersleeves.com/product/gby2lxupfngs8fl?printing_id=54364" RelatedIDs="119701;"/>` +
`<Card CardID="117012" CardName="Ugin, the Ineffable" PageURL="https://www.altersleeves.com/product/aozpvgphuk0knyw?printing_id=39436" RelatedIDs=""/>` +
`<Card CardID="127805" CardName="The Scarab God" PageURL="https://www.altersleeves.com/product/9wheqnwgexzhlqo?printing_id=45372" RelatedIDs="127804;"/>` +
`<Card CardID="190823" CardName="Survival of the Fittest" PageURL="https://www.altersleeves.com/product/gdizzutdofchrf8?printing_id=77988" RelatedIDs="190821;"/>` +
`<Card CardID="150576" CardName="Sword of Light and Shadow" PageURL="https://www.altersleeves.com/product/7xr07kt9ioyzmh6?printing_id=56883" RelatedIDs="150571;182623;182633;"/>` +
`<Card CardID="177498" CardName="Disentomb" PageURL="https://www.altersleeves.com/product/ke12ghd68fllne5?printing_id=38490" RelatedIDs="165423;165425;170034;170035;177317;177318;177495;177496;177497;"/>` +
`<Card CardID="185858" CardName="Rite of Replication" PageURL="https://www.altersleeves.com/product/5jpgmhvcya1bdqd?printing_id=50711" RelatedIDs="185850;185854;185856;185857;185859;185861;185862;185863;"/>` +
`<Card CardID="124761" CardName="Mogis, God of Slaughter" PageURL="https://www.altersleeves.com/product/covb8ybkcyopjp4?printing_id=55596" RelatedIDs="124762;"/>` +
`<Card CardID="119644" CardName="Gilded Goose" PageURL="https://www.altersleeves.com/product/1uggt9nuklgmofh?printing_id=117328" RelatedIDs=""/>` +
`<Card CardID="154653" CardName="Ruby Medallion" PageURL="https://www.altersleeves.com/product/xnpbqdhcjysdmv1?printing_id=78475" RelatedIDs="154652;"/>` +
`<Card CardID="151735" CardName="Kess, Dissident Mage" PageURL="https://www.altersleeves.com/product/v1ueueyxieryy94?printing_id=45258" RelatedIDs="151509;151510;"/>` +
`<Card CardID="177405" CardName="Liliana, Dreadhorde General" PageURL="https://www.altersleeves.com/product/9hf1vdqs6rz6yqe?printing_id=39332" RelatedIDs="177407;"/>` +
`<Card CardID="128149" CardName="God-Eternal Rhonas" PageURL="https://www.altersleeves.com/product/2dif8iyb3ts8bdi?printing_id=39260" RelatedIDs="128148;"/>` +
`<Card CardID="86574" CardName="Blast Zone" PageURL="https://www.altersleeves.com/product/1mlyqmkq561k5fo?printing_id=39159" RelatedIDs=""/>` +
`<Card CardID="128969" CardName="Nylea, Keen-Eyed" PageURL="https://www.altersleeves.com/product/tiqge6gh8uccri1?printing_id=125383" RelatedIDs="128970;"/>` +
`<Card CardID="183273" CardName="Assassin's Trophy" PageURL="https://www.altersleeves.com/product/qm5gxhii4tucd2f?printing_id=41025" RelatedIDs="181653;181657;183270;183271;183272;"/>` +
`<Card CardID="34329" CardName="Relentless Rats" PageURL="https://www.altersleeves.com/product/neb9y9ljawxbkfo?printing_id=43378" RelatedIDs=""/>` +
`<Card CardID="154000" CardName="Sylvan Tutor" PageURL="https://www.altersleeves.com/product/xfnxw8mjittud5k?printing_id=79145" RelatedIDs="154001;"/>` +
`<Card CardID="123886" CardName="Krenko, Mob Boss" PageURL="https://www.altersleeves.com/product/qqybedtpgu7yzup?printing_id=58475" RelatedIDs="123814;"/>` +
`<Card CardID="156813" CardName="Thassa's Oracle" PageURL="https://www.altersleeves.com/product/1begyjtn46g0up8?printing_id=125260" RelatedIDs="156805;156806;156807;156808;156809;156810;156814;"/>` +
`<Card CardID="179148" CardName="Phyrexian Altar" PageURL="https://www.altersleeves.com/product/iwzpxaqjyjyywwg?printing_id=74832" RelatedIDs="179137;179139;179144;179145;179149;"/>` +
`<Card CardID="200561" CardName="Spirit of the Night" PageURL="https://www.altersleeves.com/product/qgfuisql1uiixlw?printing_id=80245" RelatedIDs="200554;200555;200556;200558;200560;200563;200564;200565;200567;200568;200569;"/>` +
`<Card CardID="33505" CardName="Commander's Sphere" PageURL="https://www.altersleeves.com/product/zj2otf9ioc7jkqz?printing_id=45090" RelatedIDs=""/>` +
`<Card CardID="159243" CardName="Maelstrom Wanderer" PageURL="https://www.altersleeves.com/product/q9b6or4topynkqq?printing_id=57927" RelatedIDs="159182;159183;164434;164438;"/>` +
`<Card CardID="34956" CardName="Liliana, Death's Majesty" PageURL="https://www.altersleeves.com/product/s7orp7qhtqrpwoi?printing_id=46431" RelatedIDs=""/>` +
`<Card CardID="182621" CardName="Sword of Body and Mind" PageURL="https://www.altersleeves.com/product/vwdyyqjxq82i6qt?printing_id=163872" RelatedIDs="182627;150570;150573;"/>` +
`<Card CardID="192808" CardName="Emry, Lurker of the Loch" PageURL="https://www.altersleeves.com/product/zpvqjpffprybdn9?printing_id=117445" RelatedIDs="192799;192800;192801;192803;192804;192806;192810;"/>` +
`<Card CardID="176709" CardName="Dreamborn Muse" PageURL="https://www.altersleeves.com/product/jfmu2sctgatw6mq?printing_id=72588" RelatedIDs="176523;176525;176530;176532;176700;176701;176702;176703;176705;176706;176708;"/>` +
`<Card CardID="85906" CardName="Shadowborn Apostle" PageURL="https://www.altersleeves.com/product/mvuimffrg0pov2r?printing_id=56728" RelatedIDs=""/>` +
`<Card CardID="177494" CardName="Underworld Dreams" PageURL="https://www.altersleeves.com/product/ljgedgidusvt9kb?printing_id=125447" RelatedIDs="163770;163774;164290;164291;177491;177492;177493;"/>` +
`<Card CardID="33796" CardName="Liliana Vess" PageURL="https://www.altersleeves.com/product/eyccmiw9cacnfmu?printing_id=64300" RelatedIDs="163297;"/>` +
`<Card CardID="192810" CardName="Emry, Lurker of the Loch" PageURL="https://www.altersleeves.com/product/em2glja8tosuso8?printing_id=117445" RelatedIDs="192799;192800;192801;192803;192804;192806;192808;"/>` +
`<Card CardID="150574" CardName="Sword of Feast and Famine" PageURL="https://www.altersleeves.com/product/cckbcz4kqbsibk7?printing_id=60800" RelatedIDs="182617;182629;150399;"/>` +
`<Card CardID="180361" CardName="Opposition Agent" PageURL="https://www.altersleeves.com/product/rxp8co1lzhoixcx?printing_id=171245" RelatedIDs="180363;333052;"/>` +
`<Card CardID="161107" CardName="Misty Rainforest" PageURL="https://www.altersleeves.com/product/qajeipzrnty6n5o?printing_id=46817" RelatedIDs=""/>` +
`<Card CardID="120815" CardName="Arcane Signet" PageURL="https://www.altersleeves.com/product/r6my3gthfvuzmcm?printing_id=37969" RelatedIDs="120816;"/>` +
`<Card CardID="152609" CardName="Vampiric Tutor" PageURL="https://www.altersleeves.com/product/7hpdzkssj38v6ku?printing_id=49333" RelatedIDs="152611;152612;152613;161378;161380;"/>` +
`<Card CardID="86913" CardName="Chromatic Star" PageURL="https://www.altersleeves.com/product/u5ehxjuuprgdm5x?printing_id=66795" RelatedIDs=""/>` +
`<Card CardID="154818" CardName="Pearl Medallion" PageURL="https://www.altersleeves.com/product/k9k5bwcplfsg2ix?printing_id=78480" RelatedIDs="154817;"/>` +
`<Card CardID="123576" CardName="Gamble" PageURL="https://www.altersleeves.com/product/lkmhr7tmtbflqrk?printing_id=40346" RelatedIDs="123575;"/>` +
`<Card CardID="34003" CardName="Thrumming Stone" PageURL="https://www.altersleeves.com/product/x92kfl8l9jxus7r?printing_id=68139" RelatedIDs=""/>` +
`<Card CardID="201874" CardName="Imperial Seal" PageURL="https://www.altersleeves.com/product/meaqvgm2ns2qlas?printing_id=50228" RelatedIDs="128544;128545;128546;176047;176048;201871;201873;201867;154615;"/>` +
`<Card CardID="154650" CardName="Ruby Medallion" PageURL="https://www.altersleeves.com/product/anoljgufrsbbp4p?printing_id=53376" RelatedIDs="154651;"/>` +
`<Card CardID="167426" CardName="Sword of Feast and Famine" PageURL="https://www.altersleeves.com/product/uar5nxza9mrmicz?printing_id=164781" RelatedIDs="167424;167428;"/>` +
`<Card CardID="177485" CardName="Phyrexian Tower" PageURL="https://www.altersleeves.com/product/iqynwu9dmn2wksp?printing_id=40230" RelatedIDs="163387;163389;164296;164297;177483;177484;177486;"/>` +
`<Card CardID="180953" CardName="Arcane Signet" PageURL="https://www.altersleeves.com/product/jjf398u6abfpqjn?printing_id=171906" RelatedIDs="180951;"/>` +
`<Card CardID="154522" CardName="Sapphire Medallion" PageURL="https://www.altersleeves.com/product/rhvskpdk9aquaru?printing_id=53375" RelatedIDs="154521;"/>` +
`<Card CardID="154808" CardName="Pearl Medallion" PageURL="https://www.altersleeves.com/product/25e98jtfbtjnfyj?printing_id=53381" RelatedIDs="154806;"/>` +
`<Card CardID="162237" CardName="Damia, Sage of Stone" PageURL="https://www.altersleeves.com/product/acj5f5s0jx1g9qd?printing_id=60218" RelatedIDs=""/>` +
`<Card CardID="154407" CardName="Wurmcoil Engine" PageURL="https://www.altersleeves.com/product/ygmw5hxr3owrqjw?printing_id=61838" RelatedIDs="85960;34228;34948;"/>` +
`<Card CardID="177294" CardName="Icon of Ancestry" PageURL="https://www.altersleeves.com/product/dihuyr8ztygacnj?printing_id=38583" RelatedIDs="169820;169822;170444;170445;172201;172202;172524;172525;177295;"/>` +
`<Card CardID="183262" CardName="Isochron Scepter" PageURL="https://www.altersleeves.com/product/gdixi3nroxaxt66?printing_id=168172" RelatedIDs="181578;181580;183261;"/>` +
`<Card CardID="189448" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/xusnlwumfrljsnh?printing_id=167649" RelatedIDs="189438;189440;189443;189446;189449;189450;189451;"/>` +
`<Card CardID="124381" CardName="Tishana, Voice of Thunder" PageURL="https://www.altersleeves.com/product/gcifarmeu3uvkw9?printing_id=44583" RelatedIDs="124382;124383;"/>` +
`<Card CardID="161531" CardName="Kaalia of the Vast" PageURL="https://www.altersleeves.com/product/lqlvr5k2zme6anr?printing_id=60203" RelatedIDs="161533;161535;161537;"/>` +
`<Card CardID="120595" CardName="Mangara of Corondor" PageURL="https://www.altersleeves.com/product/orf526c4dkwzmgp?printing_id=42639" RelatedIDs="152461;152462;152464;152465;"/>` +
`<Card CardID="164234" CardName="Ukkima, Stalking Shadow" PageURL="https://www.altersleeves.com/product/h7g1fuquqcjjukz?printing_id=156395" RelatedIDs=""/>` +
`<Card CardID="86576" CardName="Sylvan Scrying" PageURL="https://www.altersleeves.com/product/k0dukanw3ydjaaq?printing_id=50939" RelatedIDs="86575;"/>` +
`<Card CardID="201871" CardName="Polluted Bonds" PageURL="https://www.altersleeves.com/product/uw4jd96hib7hitl?printing_id=65847" RelatedIDs="128544;128545;128546;176047;176048;201873;201867;201874;154615;"/>` +
`<Card CardID="159242" CardName="Expedition Map" PageURL="https://www.altersleeves.com/product/vrmfb9zlsfgpqek?printing_id=51785" RelatedIDs="86417;86418;159241;"/>` +
`<Card CardID="34866" CardName="Mystical Tutor" PageURL="https://www.altersleeves.com/product/uctbr7vljnpepng?printing_id=49383" RelatedIDs=""/>` +
`<Card CardID="158594" CardName="Mox Tantalite" PageURL="https://www.altersleeves.com/product/euzvypraxe9qqja?printing_id=38853" RelatedIDs="158595;"/>` +
`<Card CardID="34864" CardName="Unwinding Clock" PageURL="https://www.altersleeves.com/product/fsd2u7n9c8nhxzw?printing_id=41326" RelatedIDs=""/>` +
`<Card CardID="177488" CardName="Radiant's Judgment" PageURL="https://www.altersleeves.com/product/noml9at1mutlhpv?printing_id=54945" RelatedIDs="163746;163748;164292;164293;164294;164295;177487;"/>` +
`<Card CardID="34102" CardName="Rune-Scarred Demon" PageURL="https://www.altersleeves.com/product/expljf00fp9bmpy?printing_id=44320" RelatedIDs="34000;"/>` +
`<Card CardID="164264" CardName="Lord of the Undead" PageURL="https://www.altersleeves.com/product/abm9uc5jfd6vnbw?printing_id=67005" RelatedIDs="164248;164252;164256;164258;164260;164262;"/>` +
`<Card CardID="158855" CardName="Jace, the Mind Sculptor" PageURL="https://www.altersleeves.com/product/9xr7ylupvtpdyb4?printing_id=49388" RelatedIDs="158853;"/>` +
`<Card CardID="127898" CardName="Mox Diamond" PageURL="https://www.altersleeves.com/product/dfgcwz0oqowypi9?printing_id=78288" RelatedIDs="127899;"/>` +
`<Card CardID="119984" CardName="Giant Opportunity" PageURL="https://www.altersleeves.com/product/lbczrfsxl8lkxb0?printing_id=117329" RelatedIDs=""/>` +
`<Card CardID="119753" CardName="Elspeth, Sun's Champion" PageURL="https://www.altersleeves.com/product/knkllgkb73jdiax?printing_id=56446" RelatedIDs=""/>` +
`<Card CardID="176695" CardName="Regrowth" PageURL="https://www.altersleeves.com/product/nquveg2uthfdfif?printing_id=83904" RelatedIDs="176620;176622;176624;176694;176696;176697;176698;176699;"/>` +
`<Card CardID="125030" CardName="The Locust God" PageURL="https://www.altersleeves.com/product/n3ravusr3rqouaw?printing_id=45378" RelatedIDs="125029;"/>` +
`<Card CardID="200552" CardName="Sarcomancy" PageURL="https://www.altersleeves.com/product/rgj8honooibeusl?printing_id=78626" RelatedIDs="200538;200540;200541;200542;200543;200544;200546;200547;200548;200550;200551;"/>` +
`<Card CardID="177458" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/nv2oytlo0dzwwga?printing_id=50756" RelatedIDs="165326;165328;167193;167194;177456;177457;177459;"/>` +
`<Card CardID="192238" CardName="Infernal Denizen" PageURL="https://www.altersleeves.com/product/btktyprvinzxqwk?printing_id=81678" RelatedIDs="192217;192221;192223;192230;192232;192236;192237;192240;192241;192242;"/>` +
`<Card CardID="177499" CardName="Propaganda" PageURL="https://www.altersleeves.com/product/svsrga6x4qvyeok?printing_id=48024" RelatedIDs="164984;164986;167179;167184;167187;167188;177463;177464;177467;177501;"/>` +
`<Card CardID="170041" CardName="Wheel of Fate" PageURL="https://www.altersleeves.com/product/p9pvqbhmwclwqru?printing_id=47980" RelatedIDs="163639;163641;164285;164286;170043;177502;177503;177505;177510;"/>` +
`<Card CardID="189460" CardName="Ruric Thar, the Unbowed" PageURL="https://www.altersleeves.com/product/cjcd9g2gcqymmez?printing_id=57157" RelatedIDs="189453;189456;189458;"/>` +
`<Card CardID="177295" CardName="Icon of Ancestry" PageURL="https://www.altersleeves.com/product/6xfomllak4r71kf?printing_id=38583" RelatedIDs="169820;169822;170444;170445;172201;172202;172524;172525;177294;"/>` +
`<Card CardID="159342" CardName="Prismatic Vista" PageURL="https://www.altersleeves.com/product/lxsqsvm83se7uvh?printing_id=38835" RelatedIDs=""/>` +
`<Card CardID="150399" CardName="Sword of Feast and Famine" PageURL="https://www.altersleeves.com/product/xu5ujgz1kqumeig?printing_id=60800" RelatedIDs="182617;182629;150574;"/>` +
`<Card CardID="33898" CardName="Void Winnower" PageURL="https://www.altersleeves.com/product/qsr9isb6tsgy8hr?printing_id=51114" RelatedIDs=""/>` +
`<Card CardID="33774" CardName="Erebos, God of the Dead" PageURL="https://www.altersleeves.com/product/xgsocgcj84055yw?printing_id=56370" RelatedIDs="34397;"/>` +
`<Card CardID="124200" CardName="Mountain" PageURL="https://www.altersleeves.com/product/i8648celmdyfhch?printing_id=71983" RelatedIDs="124068;"/>` +
`<Card CardID="119648" CardName="Teferi, Time Raveler" PageURL="https://www.altersleeves.com/product/dcn1qd1imy7zzao?printing_id=39193" RelatedIDs=""/>` +
`<Card CardID="177153" CardName="Arcane Adaptation" PageURL="https://www.altersleeves.com/product/ujyflt37tqqqpuw?printing_id=44767" RelatedIDs="177146;177148;177149;177150;177151;177152;177154;"/>` +
`<Card CardID="179525" CardName="The Great Henge" PageURL="https://www.altersleeves.com/product/fggcp9uezimbcal?printing_id=117327" RelatedIDs="179527;"/>` +
`<Card CardID="170429" CardName="Force of Will" PageURL="https://www.altersleeves.com/product/jh43z983i5f8vmo?printing_id=80623" RelatedIDs="169976;169978;170426;170427;170431;172209;172210;172526;172527;172546;172548;"/>` +
`<Card CardID="194645" CardName="Carpet of Flowers" PageURL="https://www.altersleeves.com/product/hv4kfu536mqhxvk?printing_id=126378" RelatedIDs=""/>` +
`<Card CardID="178272" CardName="Jeweled Lotus" PageURL="https://www.altersleeves.com/product/wgasgteisxxhrvo?printing_id=171379" RelatedIDs="178270;"/>` +
`<Card CardID="86633" CardName="Unwinding Clock" PageURL="https://www.altersleeves.com/product/dc0llmf2b4ihsc3?printing_id=41326" RelatedIDs=""/>` +
`<Card CardID="161756" CardName="Vial Smasher the Fierce" PageURL="https://www.altersleeves.com/product/imiykagcjarjp9b?printing_id=48069" RelatedIDs="161751;"/>` +
`<Card CardID="123592" CardName="Nykthos, Shrine to Nyx" PageURL="https://www.altersleeves.com/product/qwcvltjvq3dgq93?printing_id=56232" RelatedIDs="123593;123598;"/>` +
`<Card CardID="161135" CardName="Selvala, Heart of the Wilds" PageURL="https://www.altersleeves.com/product/xpqm7ccnlktnnnp?printing_id=48796" RelatedIDs="161137;161148;"/>` +
`<Card CardID="124781" CardName="Garruk, Cursed Huntsman" PageURL="https://www.altersleeves.com/product/dw3ditkctyngcxo?printing_id=117297" RelatedIDs="123927;124782;"/>` +
`<Card CardID="194653" CardName="Smothering Tithe" PageURL="https://www.altersleeves.com/product/erp0ibsnpkjueib?printing_id=40068" RelatedIDs="194651;194655;"/>` +
`<Card CardID="177522" CardName="The Immortal Sun" PageURL="https://www.altersleeves.com/product/7k4x4cxbrzm4gkw?printing_id=43634" RelatedIDs="163293;163295;163643;163645;177517;177518;177520;177521;"/>` +
`<Card CardID="34607" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/adonqufgovsi1yl?printing_id=41821" RelatedIDs=""/>` +
`<Card CardID="154652" CardName="Ruby Medallion" PageURL="https://www.altersleeves.com/product/2zzbxgkszvekptv?printing_id=78475" RelatedIDs="154653;"/>` +
`<Card CardID="151038" CardName="Plains" PageURL="https://www.altersleeves.com/product/zdmohw7awtkcoqe?printing_id=150626" RelatedIDs=""/>` +
`<Card CardID="33778" CardName="Arcades, the Strategist" PageURL="https://www.altersleeves.com/product/cgthxr9xqmq13qa?printing_id=41838" RelatedIDs=""/>` +
`<Card CardID="33999" CardName="Edgewalker" PageURL="https://www.altersleeves.com/product/unv05bf9wbkfbjf?printing_id=72341" RelatedIDs=""/>` +
`<Card CardID="151192" CardName="Mountain" PageURL="https://www.altersleeves.com/product/f3dlvhopxkv0a5m?printing_id=150621" RelatedIDs=""/>` +
`<Card CardID="155117" CardName="Emerald Medallion" PageURL="https://www.altersleeves.com/product/locpvjybewxpefy?printing_id=78497" RelatedIDs="155118;"/>` +
`<Card CardID="185846" CardName="Divining Witch" PageURL="https://www.altersleeves.com/product/yzlqwmq7zm0c1uu?printing_id=75598" RelatedIDs="185833;185835;185836;185837;185838;185839;185842;185844;185845;185847;185848;"/>` +
`<Card CardID="179147" CardName="Phyrexian Altar" PageURL="https://www.altersleeves.com/product/drsjctuiug1kxmx?printing_id=74832" RelatedIDs="179130;179133;179140;179142;179146;"/>` +
`<Card CardID="155395" CardName="Ancient Stirrings" PageURL="https://www.altersleeves.com/product/rvslrc8ruidgfrq?printing_id=62827" RelatedIDs="155394;34942;34946;"/>` +
`<Card CardID="164284" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/w088qjp3fcjnhs4?printing_id=81385" RelatedIDs="163443;164279;164281;164282;177523;177524;177526;177527;177528;163445;"/>` +
`<Card CardID="177527" CardName="Call of the Full Moon" PageURL="https://www.altersleeves.com/product/79qlxsbk4zo9d4r?printing_id=51589" RelatedIDs="163443;164279;164281;164282;164284;177523;177524;177526;177528;163445;"/>` +
`<Card CardID="123713" CardName="Chalice of the Void" PageURL="https://www.altersleeves.com/product/kndrprhwiph9tsp?printing_id=43261" RelatedIDs="123712;"/>` +
`<Card CardID="123881" CardName="Lightning Bolt" PageURL="https://www.altersleeves.com/product/7sqbwuc4d1srtsz?printing_id=61523" RelatedIDs="123880;123882;123883;123884;123885;"/>` +
`<Card CardID="120467" CardName="Cavern of Souls" PageURL="https://www.altersleeves.com/product/ijcqz95txazxgeu?printing_id=58842" RelatedIDs=""/>` +
`<Card CardID="206907" CardName="Karona, False God" PageURL="https://www.altersleeves.com/product/x1tahmaebyh4jwe?printing_id=72340" RelatedIDs="206897;206898;206899;206901;206902;206903;206905;206906;206909;206910;206911;"/>` +
`<Card CardID="34950" CardName="Walking Ballista" PageURL="https://www.altersleeves.com/product/oh1mfueaqkmgusf?printing_id=47077" RelatedIDs="34229;"/>` +
`<Card CardID="125008" CardName="Hazoret the Fervent" PageURL="https://www.altersleeves.com/product/7shsudxy1o5cxhv?printing_id=46392" RelatedIDs="124981;"/>` +
`<Card CardID="151509" CardName="Kess, Dissident Mage" PageURL="https://www.altersleeves.com/product/zljk4mmvugtqr88?printing_id=38873" RelatedIDs="151510;151735;"/>` +
`<Card CardID="34867" CardName="Cyclonic Rift" PageURL="https://www.altersleeves.com/product/urteaxyjjzrbvh2?printing_id=47022" RelatedIDs=""/>` +
`<Card CardID="152055" CardName="Edgar Markov" PageURL="https://www.altersleeves.com/product/5cusmypy9ztufkn?printing_id=45261" RelatedIDs="152054;152056;"/>` +
`<Card CardID="179946" CardName="Voidmage Apprentice" PageURL="https://www.altersleeves.com/product/2lpyrmzhvo1wvpl?printing_id=53070" RelatedIDs="179939;179940;179942;179943;179944;179945;179947;"/>` +
`<Card CardID="150425" CardName="Sword of Sinew and Steel" PageURL="https://www.altersleeves.com/product/3qfog3wtqlsrupx?printing_id=38851" RelatedIDs="150577;"/>` +
`<Card CardID="158595" CardName="Mox Tantalite" PageURL="https://www.altersleeves.com/product/8ze96zmtlnfbkf0?printing_id=38853" RelatedIDs="158594;"/>` +
`<Card CardID="161751" CardName="Vial Smasher the Fierce" PageURL="https://www.altersleeves.com/product/bgguz4um86x5z0r?printing_id=48069" RelatedIDs="161756;"/>` +
`<Card CardID="170816" CardName="Tinybones, Trinket Thief" PageURL="https://www.altersleeves.com/product/ipsxaid1ky7rm1t?printing_id=165892" RelatedIDs=""/>` +
`<Card CardID="121592" CardName="Worldly Tutor" PageURL="https://www.altersleeves.com/product/avyjzqqpntbbdxx?printing_id=80136" RelatedIDs=""/>` +
`<Card CardID="206814" CardName="Kels, Fight Fixer" PageURL="https://www.altersleeves.com/product/3r2dma10r8pcrko?printing_id=166126" RelatedIDs=""/>` +
`<Card CardID="167428" CardName="Sword of Feast and Famine" PageURL="https://www.altersleeves.com/product/kfq0pl3do0ebuiq?printing_id=164781" RelatedIDs="167424;167426;"/>` +
`<Card CardID="123593" CardName="Nykthos, Shrine to Nyx" PageURL="https://www.altersleeves.com/product/m6hhcvpao9kwl6z?printing_id=56232" RelatedIDs="123592;123598;"/>` +
`<Card CardID="124694" CardName="Kruphix, God of Horizons" PageURL="https://www.altersleeves.com/product/pxe9wh5wmwsv0vx?printing_id=55283" RelatedIDs="124695;"/>` +
`<Card CardID="128829" CardName="Heliod, Sun-Crowned" PageURL="https://www.altersleeves.com/product/i67axkvdnniuatk?printing_id=125550" RelatedIDs="128828;"/>` +
`<Card CardID="152848" CardName="Cruel Tutor" PageURL="https://www.altersleeves.com/product/zxcqtqy5w29fruz?printing_id=79252" RelatedIDs=""/>` +
`<Card CardID="34397" CardName="Erebos, God of the Dead" PageURL="https://www.altersleeves.com/product/wpqoqtv05qdbmr6?printing_id=56370" RelatedIDs="33774;"/>` +
`<Card CardID="166810" CardName="Sliver Queen" PageURL="https://www.altersleeves.com/product/iurb1qvsvpyue46?printing_id=78297" RelatedIDs="166813;"/>` +
`<Card CardID="34071" CardName="Ignite the Beacon" PageURL="https://www.altersleeves.com/product/hlqhid6r6w40rwi?printing_id=39418" RelatedIDs=""/>` +
`<Card CardID="128152" CardName="God-Eternal Bontu" PageURL="https://www.altersleeves.com/product/5lcnk6ybsxmgn6p?printing_id=39338" RelatedIDs="128095;"/>` +
`<Card CardID="185872" CardName="Zealous Conscripts" PageURL="https://www.altersleeves.com/product/ivrk1m9457wy0d6?printing_id=183644" RelatedIDs="185865;185867;185869;185870;185871;"/>` +
`<Card CardID="154001" CardName="Sylvan Tutor" PageURL="https://www.altersleeves.com/product/vbca4iphy4kndmy?printing_id=79145" RelatedIDs="154000;"/>` +
`<Card CardID="152611" CardName="Vampiric Tutor" PageURL="https://www.altersleeves.com/product/drgd725wwf7doth?printing_id=49333" RelatedIDs="152609;152612;152613;161378;161380;"/>` +
`<Card CardID="33897" CardName="Kozilek, the Great Distortion" PageURL="https://www.altersleeves.com/product/ooiktrgf1i0ltxy?printing_id=50154" RelatedIDs=""/>` +
`<Card CardID="164232" CardName="Cazur, Ruthless Stalker" PageURL="https://www.altersleeves.com/product/ifzydkp1jlaes3z?printing_id=156402" RelatedIDs=""/>` +
`<Card CardID="154498" CardName="Sapphire Medallion" PageURL="https://www.altersleeves.com/product/v6xefxbviam1zix?printing_id=78474" RelatedIDs="154499;"/>` +
`<Card CardID="86422" CardName="Oblivion Stone" PageURL="https://www.altersleeves.com/product/hp5pu1khh3hnnvj?printing_id=42276" RelatedIDs="86421;86423;"/>` +
`<Card CardID="128095" CardName="God-Eternal Bontu" PageURL="https://www.altersleeves.com/product/op5ebaw9s4mqgdz?printing_id=39338" RelatedIDs="128152;"/>` +
`<Card CardID="128954" CardName="Purphoros, Bronze-Blooded" PageURL="https://www.altersleeves.com/product/z2fytgusqjawapn?printing_id=125418" RelatedIDs="128953;"/>` +
`<Card CardID="34962" CardName="Birthing Pod" PageURL="https://www.altersleeves.com/product/k9kb3nbvkm9hk0l?printing_id=60576" RelatedIDs=""/>` +
`<Card CardID="161973" CardName="Kambal, Consul of Allocation" PageURL="https://www.altersleeves.com/product/gfp1knxpg8vccyv?printing_id=48225" RelatedIDs=""/>` +
`<Card CardID="124066" CardName="Swamp" PageURL="https://www.altersleeves.com/product/lpkqqyfdv5tsowm?printing_id=150623" RelatedIDs="124199;"/>` +
`<Card CardID="154499" CardName="Sapphire Medallion" PageURL="https://www.altersleeves.com/product/qlhox6tuxtoqthi?printing_id=78474" RelatedIDs="154498;"/>` +
`<Card CardID="85962" CardName="Ghost Quarter" PageURL="https://www.altersleeves.com/product/geujsggzniavypg?printing_id=53343" RelatedIDs="34052;"/>` +
`<Card CardID="33779" CardName="Jhoira of the Ghitu" PageURL="https://www.altersleeves.com/product/jhxb7xv27j34wkt?printing_id=56923" RelatedIDs=""/>` +
`<Card CardID="152461" CardName="Mangara of Corondor" PageURL="https://www.altersleeves.com/product/1azr1clv2f0vfbz?printing_id=67912" RelatedIDs="120595;152462;152464;152465;"/>` +
`<Card CardID="178270" CardName="Jeweled Lotus" PageURL="https://www.altersleeves.com/product/qmjkszp3dmx7tmv?printing_id=171379" RelatedIDs="178272;"/>` +
`<Card CardID="189472" CardName="Dragonlord Ojutai" PageURL="https://www.altersleeves.com/product/ag2vxspfblkd09z?printing_id=126116" RelatedIDs="189469;"/>` +
`<Card CardID="163937" CardName="Silvar, Devourer of the Free" PageURL="https://www.altersleeves.com/product/7mjl1wabyhjeuve?printing_id=156397" RelatedIDs="163941;"/>` +
`<Card CardID="177477" CardName="Nexus of Fate" PageURL="https://www.altersleeves.com/product/dppkkikrcmesfym?printing_id=41744" RelatedIDs="167007;167009;167169;167170;177470;177475;177476;"/>` +
`<Card CardID="164258" CardName="Coffin Queen" PageURL="https://www.altersleeves.com/product/ljhxyifterqdlw2?printing_id=78666" RelatedIDs="164248;164252;164256;164260;164262;164264;"/>` +
`<Card CardID="190827" CardName="Necromancy" PageURL="https://www.altersleeves.com/product/3dypplmkgi9t5rd?printing_id=167674" RelatedIDs="190825;"/>` +
`<Card CardID="179609" CardName="Ashnod's Altar" PageURL="https://www.altersleeves.com/product/c0wbghifm8cewji?printing_id=49227" RelatedIDs=""/>` +
`<Card CardID="160590" CardName="Windswept Heath" PageURL="https://www.altersleeves.com/product/2o3prboihw4ocz6?printing_id=53935" RelatedIDs=""/>` +
`<Card CardID="119954" CardName="Questing Beast" PageURL="https://www.altersleeves.com/product/u55xutm63uvtumj?printing_id=117317" RelatedIDs=""/>` +
`<Card CardID="154806" CardName="Pearl Medallion" PageURL="https://www.altersleeves.com/product/k1dklc0ncnck87l?printing_id=53381" RelatedIDs="154808;"/>` +
`<Card CardID="182625" CardName="Sword of War and Peace" PageURL="https://www.altersleeves.com/product/oha2lwu8tvnqmhh?printing_id=164610" RelatedIDs="150572;150579;182635;"/>` +
`<Card CardID="179947" CardName="Voidmage Apprentice" PageURL="https://www.altersleeves.com/product/pxt1ecd4lwsnx91?printing_id=53070" RelatedIDs="179939;179940;179942;179943;179944;179945;179946;"/>` +
`<Card CardID="151040" CardName="Forest" PageURL="https://www.altersleeves.com/product/ymaciykymuvbxpf?printing_id=125281" RelatedIDs=""/>` +
`<Card CardID="189449" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/mfj4l2x6yjl1kh0?printing_id=167649" RelatedIDs="189438;189440;189443;189446;189448;189450;189451;"/>` +
`<Card CardID="86408" CardName="Lord of Atlantis" PageURL="https://www.altersleeves.com/product/rknuxvmm5n2kflj?printing_id=82490" RelatedIDs=""/>` +
`<Card CardID="34960" CardName="Karn Liberated" PageURL="https://www.altersleeves.com/product/pxfeuec3t0s4i1l?printing_id=40473" RelatedIDs="87028;34331;155396;"/>` +
`<Card CardID="163916" CardName="Trynn, Champion of Freedom" PageURL="https://www.altersleeves.com/product/4wwzafekobqus8o?printing_id=156406" RelatedIDs="163914;"/>` +
`<Card CardID="33548" CardName="Lord Windgrace" PageURL="https://www.altersleeves.com/product/bkc9yfjirjwk240?printing_id=41511" RelatedIDs=""/>` +
`<Card CardID="34606" CardName="Ramunap Excavator" PageURL="https://www.altersleeves.com/product/r98cdvo4atfimtq?printing_id=45388" RelatedIDs=""/>` +
`<Card CardID="124209" CardName="Athreos, God of Passage" PageURL="https://www.altersleeves.com/product/c1gum01ylncg1xx?printing_id=55289" RelatedIDs="33998;34101;"/>` +
`<Card CardID="154121" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/5sosy3rktaha6zr?printing_id=82921" RelatedIDs="34366;"/>` +
`<Card CardID="124068" CardName="Mountain" PageURL="https://www.altersleeves.com/product/z5syxlnqc71ukxj?printing_id=150621" RelatedIDs="124200;"/>` +
`<Card CardID="190825" CardName="Necromancy" PageURL="https://www.altersleeves.com/product/zta5xfhekm38wut?printing_id=79897" RelatedIDs="190827;"/>` +
`<Card CardID="154177" CardName="Skullclamp" PageURL="https://www.altersleeves.com/product/keb2suooopo4i0n?printing_id=71309" RelatedIDs="34002;"/>` +
`<Card CardID="192806" CardName="Swords to Plowshares" PageURL="https://www.altersleeves.com/product/3w3eivvkxq2c5h6?printing_id=82520" RelatedIDs="192799;192800;192801;192803;192804;192808;192810;"/>` +
`<Card CardID="119891" CardName="The Royal Scions" PageURL="https://www.altersleeves.com/product/7wgxhhxixsq41an?printing_id=117289" RelatedIDs=""/>` +
`<Card CardID="158964" CardName="Command Tower" PageURL="https://www.altersleeves.com/product/vatrmt7akhdh1of?printing_id=38036" RelatedIDs="158965;"/>` +
`<Card CardID="34229" CardName="Walking Ballista" PageURL="https://www.altersleeves.com/product/mhqyvhobdkmxi0l?printing_id=47077" RelatedIDs="34950;"/>` +
`<Card CardID="86911" CardName="Helm of the Host" PageURL="https://www.altersleeves.com/product/oviatdhmelbgm88?printing_id=42819" RelatedIDs="86912;"/>` +
`<Card CardID="33760" CardName="Force of Will" PageURL="https://www.altersleeves.com/product/zwt5ywt3hav0kpp?printing_id=80623" RelatedIDs=""/>` +
`<Card CardID="177321" CardName="Veil of Summer" PageURL="https://www.altersleeves.com/product/7tgoe0rkqcavmjo?printing_id=38615" RelatedIDs="167200;167202;177319;177320;177322;165421;165419;"/>` +
`<Card CardID="160324" CardName="Chains of Mephistopheles" PageURL="https://www.altersleeves.com/product/ulcirvchiv7uqph?printing_id=83414" RelatedIDs="160588;"/>` +
`<Card CardID="119670" CardName="Mind Stone" PageURL="https://www.altersleeves.com/product/dfzolwttisfiqfo?printing_id=44207" RelatedIDs="119669;"/>` +
`<Card CardID="124819" CardName="Phenax, God of Deception" PageURL="https://www.altersleeves.com/product/xkvarep9anuq5he?printing_id=55595" RelatedIDs="124820;"/>` +
`<Card CardID="125029" CardName="The Locust God" PageURL="https://www.altersleeves.com/product/zeq96zgid3gjfyj?printing_id=45378" RelatedIDs="125030;"/>` +
`<Card CardID="128895" CardName="Thassa, Deep-Dwelling" PageURL="https://www.altersleeves.com/product/kpodovuvj5hagfq?printing_id=125497" RelatedIDs="128896;"/>` +
`<Card CardID="164256" CardName="Ghoulcaller Gisa" PageURL="https://www.altersleeves.com/product/bj5yrfgtyaj8h1x?printing_id=53618" RelatedIDs="164248;164252;164258;164260;164262;164264;"/>` +
`<Card CardID="206903" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/vlb0twmu7h75lrl?printing_id=57880" RelatedIDs="206897;206898;206899;206901;206902;206905;206906;206907;206909;206910;206911;"/>` +
`<Card CardID="34069" CardName="Evolution Sage" PageURL="https://www.altersleeves.com/product/ujc8bn5fobyibsa?printing_id=39264" RelatedIDs=""/>` +
`<Card CardID="128639" CardName="Ilharg, the Raze-Boar" PageURL="https://www.altersleeves.com/product/vuall7fxdjuppcb?printing_id=39294" RelatedIDs="128638;"/>` +
`<Card CardID="183261" CardName="Isochron Scepter" PageURL="https://www.altersleeves.com/product/0yskxxfthshodgn?printing_id=168172" RelatedIDs="181578;181580;183262;"/>` +
`<Card CardID="154122" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/ybkpzk67hnhmfub?printing_id=82921" RelatedIDs="34367;"/>` +
`<Card CardID="194711" CardName="Living Death" PageURL="https://www.altersleeves.com/product/r4txtt2wqz2g187?printing_id=60321" RelatedIDs="194709;194710;194713;194714;194715;194717;194719;"/>` +
`<Card CardID="33900" CardName="Urza's Mine" PageURL="https://www.altersleeves.com/product/jb9ynocxvs65hz0?printing_id=84128" RelatedIDs="86991;"/>` +
`<Card CardID="151583" CardName="Gishath, Sun's Avatar" PageURL="https://www.altersleeves.com/product/dzocwatnjddpulc?printing_id=44591" RelatedIDs="151584;151585;"/>` +
`<Card CardID="179004" CardName="Phyrexian Altar" PageURL="https://www.altersleeves.com/product/qeegd5qrxhrqvdn?printing_id=74832" RelatedIDs=""/>` +
`<Card CardID="125009" CardName="Kefnet the Mindful" PageURL="https://www.altersleeves.com/product/rvworc5udmlpe8c?printing_id=46469" RelatedIDs="124937;"/>` +
`<Card CardID="34104" CardName="Karn's Bastion" PageURL="https://www.altersleeves.com/product/1afuq9qy25a8anj?printing_id=39155" RelatedIDs="34072;"/>` +
`<Card CardID="150457" CardName="Sword of Truth and Justice" PageURL="https://www.altersleeves.com/product/gthsjmpwezq2d1v?printing_id=38850" RelatedIDs="150578;"/>` +
`<Card CardID="161981" CardName="Shanna, Sisay's Legacy" PageURL="https://www.altersleeves.com/product/zocy2gicdhuvoa7?printing_id=42832" RelatedIDs="161979;"/>` +
`<Card CardID="167424" CardName="Sword of Feast and Famine" PageURL="https://www.altersleeves.com/product/exbphrrvl8m7m3k?printing_id=164781" RelatedIDs="167426;167428;"/>` +
`<Card CardID="119701" CardName="Cancel" PageURL="https://www.altersleeves.com/product/mbig6sgdpm2rcij?printing_id=54364" RelatedIDs="119705;"/>` +
`<Card CardID="164279" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/yfcjixqxhrzuiuj?printing_id=56994" RelatedIDs="163443;164281;164282;164284;177523;177524;177526;177527;177528;163445;"/>` +
`<Card CardID="124788" CardName="Xenagos, God of Revels" PageURL="https://www.altersleeves.com/product/flnwmbuqbkwdaa3?printing_id=55591" RelatedIDs="124789;"/>` +
`<Card CardID="161148" CardName="Selvala, Heart of the Wilds" PageURL="https://www.altersleeves.com/product/o7hntvjyyxygjz0?printing_id=48796" RelatedIDs="161135;161137;"/>` +
`<Card CardID="179149" CardName="Phyrexian Altar" PageURL="https://www.altersleeves.com/product/sh0hcyfyjwzrhe8?printing_id=74832" RelatedIDs="179137;179139;179144;179145;179148;"/>` +
`<Card CardID="194647" CardName="Necropotence" PageURL="https://www.altersleeves.com/product/qrczlx5imv6xasa?printing_id=81660" RelatedIDs="194649;"/>` +
`<Card CardID="176708" CardName="Dreamborn Muse" PageURL="https://www.altersleeves.com/product/rrhf3maxzx720hi?printing_id=72588" RelatedIDs="176523;176525;176530;176532;176700;176701;176702;176703;176705;176706;176709;"/>` +
`<Card CardID="194715" CardName="Living Death" PageURL="https://www.altersleeves.com/product/vcsxduqw3cs9xry?printing_id=60321" RelatedIDs="194709;194710;194711;194713;194714;194717;194719;"/>` +
`<Card CardID="34398" CardName="Heliod, God of the Sun" PageURL="https://www.altersleeves.com/product/6lazsev9lhmg6h3?printing_id=56438" RelatedIDs=""/>` +
`<Card CardID="208304" CardName="Omnath, Locus of Creation" PageURL="https://www.altersleeves.com/product/qhrkkiqpyjjvqpc?printing_id=166445" RelatedIDs="208302;"/>` +
`<Card CardID="160588" CardName="Chains of Mephistopheles" PageURL="https://www.altersleeves.com/product/pimvqgdbbgs1bby?printing_id=83414" RelatedIDs="160324;"/>` +
`<Card CardID="124065" CardName="Forest" PageURL="https://www.altersleeves.com/product/z4h9vcc6t1lgqtp?printing_id=150619" RelatedIDs="124197;"/>` +
`<Card CardID="85960" CardName="Wurmcoil Engine" PageURL="https://www.altersleeves.com/product/cxjcafvaprisxjm?printing_id=61838" RelatedIDs="154407;34228;34948;"/>` +
`<Card CardID="150463" CardName="Sword of Fire and Ice" PageURL="https://www.altersleeves.com/product/xoehejsxy8qxxve?printing_id=56884" RelatedIDs="150575;182619;182631;"/>` +
`<Card CardID="34952" CardName="Karn, the Great Creator" PageURL="https://www.altersleeves.com/product/bllrkat9bfy38zi?printing_id=39438" RelatedIDs="172028;172030;"/>` +
`<Card CardID="172543" CardName="Trinisphere" PageURL="https://www.altersleeves.com/product/159btrrjtw0ledz?printing_id=164579" RelatedIDs="169999;170001;170456;170457;172198;172199;172533;172534;172542;"/>` +
`<Card CardID="128544" CardName="Lion's Eye Diamond" PageURL="https://www.altersleeves.com/product/8bwjpgashhjh6ko?printing_id=80084" RelatedIDs="128545;128546;176047;176048;201871;201873;201867;201874;154615;"/>` +
`<Card CardID="150577" CardName="Sword of Sinew and Steel" PageURL="https://www.altersleeves.com/product/kfvb4ygut6k38j2?printing_id=38851" RelatedIDs="150425;"/>` +
`<Card CardID="86409" CardName="World Breaker" PageURL="https://www.altersleeves.com/product/oniafgikttsrfn6?printing_id=50032" RelatedIDs="86419;"/>` +
`<Card CardID="160424" CardName="Marsh Flats" PageURL="https://www.altersleeves.com/product/ejhgct41kbdzhdw?printing_id=46818" RelatedIDs=""/>` +
`<Card CardID="124762" CardName="Mogis, God of Slaughter" PageURL="https://www.altersleeves.com/product/kxjzom3mjjwc3ew?printing_id=55596" RelatedIDs="124761;"/>` +
`<Card CardID="128824" CardName="Athreos, Shroud-Veiled" PageURL="https://www.altersleeves.com/product/nl8mi0anknl0x5i?printing_id=125299" RelatedIDs="128739;"/>` +
`<Card CardID="154521" CardName="Sapphire Medallion" PageURL="https://www.altersleeves.com/product/mfhntxmijunmmg6?printing_id=53375" RelatedIDs="154522;"/>` +
`<Card CardID="167583" CardName="Sword of Body and Mind" PageURL="https://www.altersleeves.com/product/jhu2esadwshbklk?printing_id=163872" RelatedIDs="167573;167575;"/>` +
`<Card CardID="127807" CardName="The Scorpion God" PageURL="https://www.altersleeves.com/product/jzfbbjbtomnwpck?printing_id=45371" RelatedIDs="127806;"/>` +
`<Card CardID="151899" CardName="Nekusar, the Mindrazer" PageURL="https://www.altersleeves.com/product/luwjzhuzimrwt2m?printing_id=55976" RelatedIDs="151900;"/>` +
`<Card CardID="194649" CardName="Necropotence" PageURL="https://www.altersleeves.com/product/h16n8nyjibeuzgs?printing_id=81660" RelatedIDs="194647;"/>` +
`<Card CardID="151900" CardName="Nekusar, the Mindrazer" PageURL="https://www.altersleeves.com/product/w0wfj1dsowrxswy?printing_id=55976" RelatedIDs="151899;"/>` +
`<Card CardID="206820" CardName="Nikya of the Old Ways" PageURL="https://www.altersleeves.com/product/nfqephpoiq11nm5?printing_id=39897" RelatedIDs=""/>` +
`<Card CardID="34072" CardName="Karn's Bastion" PageURL="https://www.altersleeves.com/product/xp8n8rjtppro9ir?printing_id=39155" RelatedIDs="34104;"/>` +
`<Card CardID="34103" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/sclsutofj31rtxz?printing_id=40385" RelatedIDs="34068;"/>` +
`<Card CardID="182635" CardName="Sword of War and Peace" PageURL="https://www.altersleeves.com/product/o7pnv2opgg6hb2a?printing_id=164610" RelatedIDs="150572;150579;182625;"/>` +
`<Card CardID="162320" CardName="Trostani, Selesnya's Voice" PageURL="https://www.altersleeves.com/product/96g4b2pjlhzgbxr?printing_id=58006" RelatedIDs=""/>` +
`<Card CardID="119916" CardName="Wicked Wolf" PageURL="https://www.altersleeves.com/product/whymxqw67ajtzkx?printing_id=117307" RelatedIDs=""/>` +
`<Card CardID="155552" CardName="Mox Amber" PageURL="https://www.altersleeves.com/product/pm7orvxwlptjm6l?printing_id=42812" RelatedIDs="155682;"/>` +
`<Card CardID="189462" CardName="Vilis, Broker of Blood" PageURL="https://www.altersleeves.com/product/eldfdmkiyuen6fe?printing_id=38691" RelatedIDs="189466;"/>` +
`<Card CardID="182394" CardName="Muldrotha, the Gravetide" PageURL="https://www.altersleeves.com/product/6zg6aangudl3xxa?printing_id=42837" RelatedIDs="182396;"/>` +
`<Card CardID="151191" CardName="Mountain" PageURL="https://www.altersleeves.com/product/pvs0h9i0wjmwqaq?printing_id=150621" RelatedIDs=""/>` +
`<Card CardID="176699" CardName="Regrowth" PageURL="https://www.altersleeves.com/product/yl7j2gzgxuwbdfe?printing_id=83904" RelatedIDs="176620;176622;176624;176694;176695;176696;176697;176698;"/>` +
`<Card CardID="34053" CardName="Sanctum of Ugin" PageURL="https://www.altersleeves.com/product/hmswj3kk9rasiyw?printing_id=50889" RelatedIDs=""/>` +
`<Card CardID="86575" CardName="Sylvan Scrying" PageURL="https://www.altersleeves.com/product/g6qe83w9c2sqfws?printing_id=50939" RelatedIDs="86576;"/>` +
`<Card CardID="162323" CardName="Karlov of the Ghost Council" PageURL="https://www.altersleeves.com/product/ivgliz0wnt2xpzh?printing_id=50770" RelatedIDs="162325;"/>` +
`<Card CardID="170190" CardName="Craterhoof Behemoth" PageURL="https://www.altersleeves.com/product/b4yky7szajuo7zg?printing_id=46935" RelatedIDs="168461;168459;169188;192949;"/>` +
`<Card CardID="124650" CardName="Atraxa, Praetors' Voice" PageURL="https://www.altersleeves.com/product/ut9hrvojrvpva88?printing_id=48090" RelatedIDs=""/>` +
`<Card CardID="179527" CardName="The Great Henge" PageURL="https://www.altersleeves.com/product/jzzbglohyspvg5b?printing_id=117327" RelatedIDs="179525;"/>` +
`<Card CardID="189458" CardName="Ruric Thar, the Unbowed" PageURL="https://www.altersleeves.com/product/vmpgqh2awbuane1?printing_id=57157" RelatedIDs="189453;189456;189460;"/>` +
`<Card CardID="34401" CardName="Thassa, God of the Sea" PageURL="https://www.altersleeves.com/product/r99a4mhssrawbfn?printing_id=56389" RelatedIDs=""/>` +
`<Card CardID="120816" CardName="Arcane Signet" PageURL="https://www.altersleeves.com/product/o0xrhk3ifudvohu?printing_id=37969" RelatedIDs="120815;"/>` +
`<Card CardID="198111" CardName="Bitterblossom" PageURL="https://www.altersleeves.com/product/zrgxid0dg5n6dyu?printing_id=51927" RelatedIDs="198110;"/>` +
`<Card CardID="33973" CardName="Urza's Power Plant" PageURL="https://www.altersleeves.com/product/bafyjjebov0tqgh?printing_id=84124" RelatedIDs=""/>` +
`<Card CardID="123712" CardName="Chalice of the Void" PageURL="https://www.altersleeves.com/product/lrpqcbc08wqz0uz?printing_id=43261" RelatedIDs="123713;"/>` +
`<Card CardID="87607" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/gzcimuq9amewbg8?printing_id=41821" RelatedIDs="87609;87606;87604;87605;87608;"/>` +
`<Card CardID="172537" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/a7ntkrt1l77xoce?printing_id=127514" RelatedIDs="169340;169342;172205;172206;172207;172208;172535;172536;172538;"/>` +
`<Card CardID="206816" CardName="Magda, Brazen Outlaw" PageURL="https://www.altersleeves.com/product/dh8vrsych7efzk3?printing_id=177837" RelatedIDs="206818;"/>` +
`<Card CardID="180955" CardName="Marble Diamond" PageURL="https://www.altersleeves.com/product/3hzyoyuutqsueg5?printing_id=171536" RelatedIDs="180957;"/>` +
`<Card CardID="185839" CardName="Corpse Dance" PageURL="https://www.altersleeves.com/product/mk6y04g7n8lfgjw?printing_id=78664" RelatedIDs="185833;185835;185836;185837;185838;185842;185844;185845;185846;185847;185848;"/>` +
`<Card CardID="156641" CardName="Chrome Mox" PageURL="https://www.altersleeves.com/product/95bojruiob63ebt?printing_id=49226" RelatedIDs="156640;"/>` +
`<Card CardID="124980" CardName="Rhonas the Indomitable" PageURL="https://www.altersleeves.com/product/6byv6cvfgbjdqv9?printing_id=46346" RelatedIDs="124928;"/>` +
`<Card CardID="170043" CardName="Wheel of Fate" PageURL="https://www.altersleeves.com/product/ts4vcrpkq9zi3gn?printing_id=47980" RelatedIDs="163639;163641;164285;164286;170041;177502;177503;177505;177510;"/>` +
`<Card CardID="33794" CardName="Ugin, the Spirit Dragon" PageURL="https://www.altersleeves.com/product/jng8djxgxclesom?printing_id=52946" RelatedIDs="34332;"/>` +
`<Card CardID="124528" CardName="Urabrask the Hidden" PageURL="https://www.altersleeves.com/product/tbk3mpr9nwkn4r6?printing_id=44274" RelatedIDs="124529;"/>` +
`<Card CardID="127914" CardName="Reaper King" PageURL="https://www.altersleeves.com/product/uar7rvxrbidh767?printing_id=125621" RelatedIDs=""/>` +
`<Card CardID="163297" CardName="Liliana Vess" PageURL="https://www.altersleeves.com/product/c3uzcayxk2tnrcg?printing_id=54535" RelatedIDs="33796;"/>` +
`<Card CardID="86705" CardName="Mox Opal" PageURL="https://www.altersleeves.com/product/zqwuckh43gh77rw?printing_id=51775" RelatedIDs="152550;"/>` +
`<Card CardID="180968" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/fwhxrf2ndbtxvb6?printing_id=41332" RelatedIDs="180949;"/>` +
`<Card CardID="128545" CardName="Lion's Eye Diamond" PageURL="https://www.altersleeves.com/product/sdl0vgjqobb1zjm?printing_id=80084" RelatedIDs="128544;128546;176047;176048;201871;201873;201867;201874;154615;"/>` +
`<Card CardID="128970" CardName="Nylea, Keen-Eyed" PageURL="https://www.altersleeves.com/product/m6ehbjueokzvkam?printing_id=125383" RelatedIDs="128969;"/>` +
`<Card CardID="86424" CardName="Chromatic Sphere" PageURL="https://www.altersleeves.com/product/vbt7t6lzmljhv8a?printing_id=71683" RelatedIDs=""/>` +
`<Card CardID="151510" CardName="Kess, Dissident Mage" PageURL="https://www.altersleeves.com/product/hfwthddealzsnss?printing_id=38873" RelatedIDs="151509;151735;"/>` +
`<Card CardID="123880" CardName="Lightning Bolt" PageURL="https://www.altersleeves.com/product/revirg3rcsxnxmo?printing_id=61523" RelatedIDs="123881;123882;123883;123884;123885;"/>` +
`<Card CardID="155394" CardName="Ancient Stirrings" PageURL="https://www.altersleeves.com/product/w6eqn2vnt965izf?printing_id=62827" RelatedIDs="155395;34942;34946;"/>` +
`<Card CardID="182396" CardName="Muldrotha, the Gravetide" PageURL="https://www.altersleeves.com/product/wiy4vptfqbdmmhz?printing_id=42837" RelatedIDs="182394;"/>` +
`<Card CardID="86421" CardName="Oblivion Stone" PageURL="https://www.altersleeves.com/product/xlk6xadbxgbrfiu?printing_id=71612" RelatedIDs="86422;86423;"/>` +
`<Card CardID="119647" CardName="Oko, Thief of Crowns" PageURL="https://www.altersleeves.com/product/f1dkcw1xlx9g45w?printing_id=117291" RelatedIDs=""/>` +
`<Card CardID="194651" CardName="Smothering Tithe" PageURL="https://www.altersleeves.com/product/dnfs0wegsxpty0s?printing_id=40068" RelatedIDs="194653;194655;"/>` +
`<Card CardID="128739" CardName="Athreos, Shroud-Veiled" PageURL="https://www.altersleeves.com/product/80cnkibpgef6t2e?printing_id=125299" RelatedIDs="128824;"/>` +
`<Card CardID="34610" CardName="Wrenn and Six" PageURL="https://www.altersleeves.com/product/nb0q6d8bcgwhep1?printing_id=38862" RelatedIDs="169139;"/>` +
`<Card CardID="177497" CardName="Disentomb" PageURL="https://www.altersleeves.com/product/8pctksibkofr93d?printing_id=38490" RelatedIDs="165423;165425;170034;170035;177317;177318;177495;177496;177498;"/>` +
`<Card CardID="34936" CardName="Relic of Progenitus" PageURL="https://www.altersleeves.com/product/kgql6ihg485rhvp?printing_id=49214" RelatedIDs="34920;87029;"/>` +
`<Card CardID="119702" CardName="Ezuri, Renegade Leader" PageURL="https://www.altersleeves.com/product/kycstwpyr8mummp?printing_id=61942" RelatedIDs="119706;"/>` +
`<Card CardID="155396" CardName="Karn Liberated" PageURL="https://www.altersleeves.com/product/l3latb7warfybjf?printing_id=60679" RelatedIDs="34331;87028;34960;"/>` +
`<Card CardID="119669" CardName="Mind Stone" PageURL="https://www.altersleeves.com/product/4bojrqlahh9mzug?printing_id=44207" RelatedIDs="119670;"/>` +
`<Card CardID="128638" CardName="Ilharg, the Raze-Boar" PageURL="https://www.altersleeves.com/product/gqn9crywucggp1g?printing_id=39294" RelatedIDs="128639;"/>` +
`<Card CardID="172546" CardName="Chain of Vapor" PageURL="https://www.altersleeves.com/product/eqfieraeobl8l56?printing_id=48034" RelatedIDs="169976;169978;170426;170427;170429;170431;172209;172210;172526;172527;172548;"/>` +
`<Card CardID="34230" CardName="Ulamog, the Ceaseless Hunger" PageURL="https://www.altersleeves.com/product/d5xgtmyutba9ptp?printing_id=51116" RelatedIDs=""/>` +
`<Card CardID="151761" CardName="Meren of Clan Nel Toth" PageURL="https://www.altersleeves.com/product/lmrevmfqfgh5hmy?printing_id=50767" RelatedIDs="151762;"/>` +
`<Card CardID="194643" CardName="Dockside Extortionist" PageURL="https://www.altersleeves.com/product/hb7fpjuoxakb2qt?printing_id=38249" RelatedIDs=""/>` +
`<Card CardID="206911" CardName="Karona, False God" PageURL="https://www.altersleeves.com/product/fp9xnbmmd7kiza6?printing_id=72340" RelatedIDs="206897;206898;206899;206901;206902;206903;206905;206906;206907;206909;206910;"/>` +
`<Card CardID="125011" CardName="Bontu the Glorified" PageURL="https://www.altersleeves.com/product/si54jckfr6bttms?printing_id=46446" RelatedIDs="125010;"/>` +
`<Card CardID="189469" CardName="Dragonlord Ojutai" PageURL="https://www.altersleeves.com/product/qnw7cfvc90rlvdb?printing_id=126116" RelatedIDs="189472;"/>` +
`<Card CardID="153291" CardName="Grim Tutor" PageURL="https://www.altersleeves.com/product/2nm0ci5ww7vebal?printing_id=76401" RelatedIDs="153290;363472;363478;"/>` +
`<Card CardID="124207" CardName="Karametra, God of Harvests" PageURL="https://www.altersleeves.com/product/1o5mnffv1sgo5tq?printing_id=55599" RelatedIDs="124208;"/>` +
`<Card CardID="162189" CardName="Nicol Bolas, God-Pharaoh" PageURL="https://www.altersleeves.com/product/nvyvbgzplrql6k0?printing_id=45377" RelatedIDs=""/>` +
`<Card CardID="182631" CardName="Sword of Fire and Ice" PageURL="https://www.altersleeves.com/product/jdn8e0ss8iksljm?printing_id=163885" RelatedIDs="150575;150463;182619;"/>` +
`<Card CardID="185863" CardName="Rite of Replication" PageURL="https://www.altersleeves.com/product/bplgra3r5kxl57n?printing_id=50711" RelatedIDs="185850;185854;185856;185857;185858;185859;185861;185862;"/>` +
`<Card CardID="128150" CardName="God-Eternal Oketra" PageURL="https://www.altersleeves.com/product/nuqaq4kct7angyq?printing_id=39420" RelatedIDs="128066;"/>` +
`<Card CardID="164347" CardName="Thalia, Guardian of Thraben" PageURL="https://www.altersleeves.com/product/8gep2tyefzqecvd?printing_id=43447" RelatedIDs="164565;"/>` +
`<Card CardID="176689" CardName="Commander's Sphere" PageURL="https://www.altersleeves.com/product/q8k1horfpkfhxsf?printing_id=41354" RelatedIDs="176684;176686;176687;176688;176690;176692;176693;"/>` +
`<Card CardID="154123" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/fcy4snjr0g8mraj?printing_id=82921" RelatedIDs="33581;"/>` +
`<Card CardID="150579" CardName="Sword of War and Peace" PageURL="https://www.altersleeves.com/product/kzschmvrcdqpvf7?printing_id=60519" RelatedIDs="150572;182625;182635;"/>` +
`<Card CardID="128151" CardName="God-Eternal Kefnet" PageURL="https://www.altersleeves.com/product/vr7t8ksliihjpcm?printing_id=39381" RelatedIDs="128065;"/>` +
`<Card CardID="119645" CardName="Nissa, Who Shakes the World" PageURL="https://www.altersleeves.com/product/6fjb8on8vat5gbp?printing_id=39253" RelatedIDs=""/>` +
`<Card CardID="128066" CardName="God-Eternal Oketra" PageURL="https://www.altersleeves.com/product/7hets2v3sjiqlbk?printing_id=39420" RelatedIDs="128150;"/>` +
`<Card CardID="34865" CardName="Sensei's Divining Top" PageURL="https://www.altersleeves.com/product/apb5x2ksofb8lrg?printing_id=49213" RelatedIDs=""/>` +
`<Card CardID="185870" CardName="Zealous Conscripts" PageURL="https://www.altersleeves.com/product/kxdckz3a5xces2q?printing_id=183644" RelatedIDs="185865;185867;185869;185871;185872;"/>` +
`<Card CardID="176701" CardName="Windfall" PageURL="https://www.altersleeves.com/product/eydkhquehwcyz86?printing_id=156284" RelatedIDs="176523;176525;176530;176532;176700;176702;176703;176705;176706;176708;176709;"/>` +
`<Card CardID="128762" CardName="Klothys, God of Destiny" PageURL="https://www.altersleeves.com/product/d7uu13t1b7w1gla?printing_id=125348" RelatedIDs="128823;"/>` +
`<Card CardID="152260" CardName="K'rrik, Son of Yawgmoth" PageURL="https://www.altersleeves.com/product/cxg2lrfyqdozun7?printing_id=38255" RelatedIDs="152415;"/>` +
`<Card CardID="124495" CardName="Vorinclex, Voice of Hunger" PageURL="https://www.altersleeves.com/product/3bzuokzhv5ogsop?printing_id=44237" RelatedIDs="124496;"/>` +
`<Card CardID="152415" CardName="K'rrik, Son of Yawgmoth" PageURL="https://www.altersleeves.com/product/wjjc8iq4tejwah4?printing_id=38255" RelatedIDs="152260;"/>` +
`<Card CardID="185848" CardName="Divining Witch" PageURL="https://www.altersleeves.com/product/nbwuhh3xdbiipru?printing_id=75598" RelatedIDs="185833;185835;185836;185837;185838;185839;185842;185844;185845;185846;185847;"/>` +
`<Card CardID="151117" CardName="Island" PageURL="https://www.altersleeves.com/product/pbvsn6e4elm6kon?printing_id=125287" RelatedIDs=""/>` +
`<Card CardID="153290" CardName="Grim Tutor" PageURL="https://www.altersleeves.com/product/9hvzcdiv2qvey1m?printing_id=76401" RelatedIDs="153291;363472;363478;"/>` +
`<Card CardID="175682" CardName="Channel" PageURL="https://www.altersleeves.com/product/u761emrzgpvxnpu?printing_id=44269" RelatedIDs=""/>` +
`<Card CardID="151037" CardName="Plains" PageURL="https://www.altersleeves.com/product/l8jf4jokwmjec0i?printing_id=150626" RelatedIDs=""/>` +
`<Card CardID="33998" CardName="Athreos, God of Passage" PageURL="https://www.altersleeves.com/product/vd1xigmbwjcow9u?printing_id=55289" RelatedIDs="124209;34101;"/>` +
`<Card CardID="150571" CardName="Sword of Light and Shadow" PageURL="https://www.altersleeves.com/product/phgpgdkfe3hmhos?printing_id=56883" RelatedIDs="150576;182623;182633;"/>` +
`<Card CardID="206899" CardName="Crucible of Worlds" PageURL="https://www.altersleeves.com/product/zm5q4rxyhrqvtjf?printing_id=57880" RelatedIDs="206897;206898;206901;206902;206903;206905;206906;206907;206909;206910;206911;"/>` +
`<Card CardID="34609" CardName="Omnath, Locus of Rage" PageURL="https://www.altersleeves.com/product/rqzmvo5v53tnvps?printing_id=50914" RelatedIDs=""/>` +
`<Card CardID="180951" CardName="Arcane Signet" PageURL="https://www.altersleeves.com/product/surbvyrqnunmqgn?printing_id=171906" RelatedIDs="180953;"/>` +
`<Card CardID="33901" CardName="Urza's Power Plant" PageURL="https://www.altersleeves.com/product/le7znlmpwcjmmi7?printing_id=81311" RelatedIDs="34938;"/>` +
`<Card CardID="167573" CardName="Sword of Body and Mind" PageURL="https://www.altersleeves.com/product/3tvqeuhd6z7hxll?printing_id=163872" RelatedIDs="167575;167583;"/>` +
`<Card CardID="180965" CardName="Thought Vessel" PageURL="https://www.altersleeves.com/product/jmxc7hul50tq5hz?printing_id=171920" RelatedIDs="180963;"/>` +
`<Card CardID="177476" CardName="Nexus of Fate" PageURL="https://www.altersleeves.com/product/kaf2wvkqgwe0cea?printing_id=41744" RelatedIDs="167007;167009;167169;167170;177470;177475;177477;"/>` +
`<Card CardID="200548" CardName="Sarcomancy" PageURL="https://www.altersleeves.com/product/hslefjjmvmszgtb?printing_id=78626" RelatedIDs="200538;200540;200541;200542;200543;200544;200546;200547;200550;200551;200552;"/>` +
`<Card CardID="176046" CardName="Yarok, the Desecrated" PageURL="https://www.altersleeves.com/product/neajzqrddg8fqsx?printing_id=38592" RelatedIDs="176044;"/>` +
`<Card CardID="189451" CardName="Phyrexian Obliterator" PageURL="https://www.altersleeves.com/product/qybpxbuzmdh7byr?printing_id=167649" RelatedIDs="189438;189440;189443;189446;189448;189449;189450;"/>` +
`<Card CardID="161535" CardName="Kaalia of the Vast" PageURL="https://www.altersleeves.com/product/r9ip5tdxtzs7aqj?printing_id=60203" RelatedIDs="161531;161533;161537;"/>` +
`<Card CardID="120395" CardName="Pestilent Spirit" PageURL="https://www.altersleeves.com/product/fhmst4p0e1gps6d?printing_id=40009" RelatedIDs=""/>` +
`<Card CardID="185861" CardName="Rite of Replication" PageURL="https://www.altersleeves.com/product/o4tbxzz6phlc6gx?printing_id=50711" RelatedIDs="185850;185854;185856;185857;185858;185859;185862;185863;"/>` +
`<Card CardID="155114" CardName="Emerald Medallion" PageURL="https://www.altersleeves.com/product/lf1yaujnoddopde?printing_id=53404" RelatedIDs="155116;"/>` +
`<Card CardID="120009" CardName="Thought-Knot Seer" PageURL="https://www.altersleeves.com/product/eluq7gx5wcmshyw?printing_id=50149" RelatedIDs="87584;"/>` +
`<Card CardID="180961" CardName="Sky Diamond" PageURL="https://www.altersleeves.com/product/lf7v1sczsyrb1qf?printing_id=171520" RelatedIDs="180959;"/>` +
`<Card CardID="151762" CardName="Meren of Clan Nel Toth" PageURL="https://www.altersleeves.com/product/yciwofd1hsirvpt?printing_id=45943" RelatedIDs="151761;"/>` +
`<Card CardID="172030" CardName="Karn, the Great Creator" PageURL="https://www.altersleeves.com/product/bmn5wvcxwh16cts?printing_id=39438" RelatedIDs="172028;34952;"/>` +
`<Card CardID="120244" CardName="Scapeshift" PageURL="https://www.altersleeves.com/product/1hiejqwn6x2mcyr?printing_id=41849" RelatedIDs="120245;120247;33912;"/>` +
`<Card CardID="160177" CardName="Bloodstained Mire" PageURL="https://www.altersleeves.com/product/k6kbulccenxksnv?printing_id=53953" RelatedIDs=""/>` +
`<Card CardID="164438" CardName="Maelstrom Wanderer" PageURL="https://www.altersleeves.com/product/jrbejjpklkoci6y?printing_id=58715" RelatedIDs="159182;159183;159243;164434;"/>` +
`<Card CardID="194897" CardName="Lightning Greaves" PageURL="https://www.altersleeves.com/product/iwwnis9sz8oe89e?printing_id=164826" RelatedIDs="194721;"/>` +
`<Card CardID="206893" CardName="Korvold, Fae-Cursed King" PageURL="https://www.altersleeves.com/product/4f4s4jd2xxs61df?printing_id=178425" RelatedIDs="206895;"/>` +
`<Card CardID="87584" CardName="Thought-Knot Seer" PageURL="https://www.altersleeves.com/product/jknwnvv2qdbe7tq?printing_id=50149" RelatedIDs="120009;"/>` +
`<Card CardID="124067" CardName="Island" PageURL="https://www.altersleeves.com/product/k4a9ey6mfw5iisq?printing_id=150625" RelatedIDs="124198;"/>` +
`<Card CardID="161979" CardName="Shanna, Sisay's Legacy" PageURL="https://www.altersleeves.com/product/4cpopygsznlogqq?printing_id=42832" RelatedIDs="161981;"/>` +
`<Card CardID="172548" CardName="Chain of Vapor" PageURL="https://www.altersleeves.com/product/59yb4clml1zdjpc?printing_id=48034" RelatedIDs="169976;169978;170426;170427;170429;170431;172209;172210;172526;172527;172546;"/>` +
`<Card CardID="124208" CardName="Karametra, God of Harvests" PageURL="https://www.altersleeves.com/product/q5h3cx5p5fdi07r?printing_id=55599" RelatedIDs="124207;"/>` +
`<Card CardID="160716" CardName="Arid Mesa" PageURL="https://www.altersleeves.com/product/s9qkzcotn0oovck?printing_id=46828" RelatedIDs="160717;"/>` +
`<Card CardID="161824" CardName="Demonic Tutor" PageURL="https://www.altersleeves.com/product/xopubrlcowfu1hh?printing_id=64574" RelatedIDs="121510;121511;121512;"/>` +
`<Card CardID="124199" CardName="Swamp" PageURL="https://www.altersleeves.com/product/zmb9jqabsmjszoo?printing_id=71987" RelatedIDs="124066;"/>` +
`<Card CardID="177407" CardName="Liliana, Dreadhorde General" PageURL="https://www.altersleeves.com/product/rywpc2o3sntsfhs?printing_id=39332" RelatedIDs="177405;"/>` +
`<Card CardID="128546" CardName="Lion's Eye Diamond" PageURL="https://www.altersleeves.com/product/bqqrj222zupy1mv?printing_id=80084" RelatedIDs="128544;128545;176047;176048;201871;201873;201867;201874;154615;"/>` +
`<Card CardID="150578" CardName="Sword of Truth and Justice" PageURL="https://www.altersleeves.com/product/1kqxqvxvjszfhdf?printing_id=38850" RelatedIDs="150457;"/>` +
`<Card CardID="128823" CardName="Klothys, God of Destiny" PageURL="https://www.altersleeves.com/product/ogglpmqhk3qjiq8?printing_id=125348" RelatedIDs="128762;"/>` +
`<Card CardID="163015" CardName="Vito, Thorn of the Dusk Rose" PageURL="https://www.altersleeves.com/product/yz87qgzym2t8ehu?printing_id=162462" RelatedIDs=""/>` +
`<Card CardID="123497" CardName="Rune-Tail, Kitsune Ascendant" PageURL="https://www.altersleeves.com/product/4cfroe3o4e4plu5?printing_id=70282" RelatedIDs=""/>` +
`<Card CardID="34938" CardName="Urza's Power Plant" PageURL="https://www.altersleeves.com/product/zuojcyrehmusi51?printing_id=84123" RelatedIDs="33901;"/>` +
`<Card CardID="177486" CardName="Phyrexian Tower" PageURL="https://www.altersleeves.com/product/osfmfz9zdq3dgqo?printing_id=40230" RelatedIDs="163387;163389;164296;164297;177483;177484;177485;"/>` +
`<Card CardID="177316" CardName="Force of Negation" PageURL="https://www.altersleeves.com/product/fonln6f6o5kyzkz?printing_id=39027" RelatedIDs="169017;169019;177311;177312;177313;177314;177315;"/>` +
`<Card CardID="177154" CardName="Arcane Adaptation" PageURL="https://www.altersleeves.com/product/kafgribasagmuou?printing_id=44767" RelatedIDs="177146;177148;177149;177150;177151;177152;177153;"/>` +
`<Card CardID="200569" CardName="Demonic Attorney" PageURL="https://www.altersleeves.com/product/ytq9fvprqpzp6ih?printing_id=83092" RelatedIDs="200554;200555;200556;200558;200560;200561;200563;200564;200565;200567;200568;"/>` +
`<Card CardID="164262" CardName="Lord of the Undead" PageURL="https://www.altersleeves.com/product/x5fh1qkv0vizisp?printing_id=67005" RelatedIDs="164248;164252;164256;164258;164260;164264;"/>` +
`<Card CardID="206810" CardName="Grim Monolith" PageURL="https://www.altersleeves.com/product/ykqwcg8quq0xjzy?printing_id=77172" RelatedIDs="206812;"/>` +
`<Card CardID="124493" CardName="Jin-Gitaxias, Core Augur" PageURL="https://www.altersleeves.com/product/xr0ehbncbhmfm8v?printing_id=44364" RelatedIDs="124494;"/>` +
`<Card CardID="177487" CardName="Radiant's Judgment" PageURL="https://www.altersleeves.com/product/i4pddf89iv4cszn?printing_id=54945" RelatedIDs="163746;163748;164292;164293;164294;164295;177488;"/>` +
`<Card CardID="151039" CardName="Forest" PageURL="https://www.altersleeves.com/product/ih6amqyfwn0rof3?printing_id=150619" RelatedIDs=""/>` +
`<Card CardID="206913" CardName="Overwhelmed Apprentice" PageURL="https://www.altersleeves.com/product/9xhu1ge7petinmv?printing_id=117428" RelatedIDs=""/>` +
`<Card CardID="185881" CardName="Dreamborn Muse" PageURL="https://www.altersleeves.com/product/5zi75gnoeck3hbu?printing_id=72588" RelatedIDs="185874;185875;185877;185879;185880;"/>` +
`<Card CardID="185837" CardName="Corpse Dance" PageURL="https://www.altersleeves.com/product/akqozzuihiie6lv?printing_id=78664" RelatedIDs="185833;185835;185836;185838;185839;185842;185844;185845;185846;185847;185848;"/>` +
`<Card CardID="155116" CardName="Emerald Medallion" PageURL="https://www.altersleeves.com/product/cpob0sn5wqu5jxj?printing_id=53404" RelatedIDs="155114;"/>` +
`<Card CardID="34332" CardName="Ugin, the Spirit Dragon" PageURL="https://www.altersleeves.com/product/wodtprllkq4xjgt?printing_id=52946" RelatedIDs="33794;"/>` +
`<Card CardID="124696" CardName="Iroas, God of Victory" PageURL="https://www.altersleeves.com/product/aphaupd01eunugj?printing_id=47913" RelatedIDs="124697;"/>` +
`<Card CardID="170431" CardName="Force of Will" PageURL="https://www.altersleeves.com/product/miefmbjxkjpbspk?printing_id=80623" RelatedIDs="169976;169978;170426;170427;170429;172209;172210;172526;172527;172546;172548;"/>` +
`<Card CardID="127804" CardName="The Scarab God" PageURL="https://www.altersleeves.com/product/lwilq92abvix45u?printing_id=45372" RelatedIDs="127805;"/>` +
`<Card CardID="155682" CardName="Mox Amber" PageURL="https://www.altersleeves.com/product/cabjygyb2icpt0v?printing_id=42812" RelatedIDs="155552;"/>` +
`<Card CardID="124782" CardName="Garruk, Cursed Huntsman" PageURL="https://www.altersleeves.com/product/nqi01arxl9dy2zi?printing_id=117297" RelatedIDs="123927;124781;"/>` +
`<Card CardID="194655" CardName="Smothering Tithe" PageURL="https://www.altersleeves.com/product/rjf7sy7jeqsudvr?printing_id=40068" RelatedIDs="194651;194653;"/>` +
`<Card CardID="121579" CardName="Enlightened Tutor" PageURL="https://www.altersleeves.com/product/1b0b43hrva8y1ws?printing_id=49436" RelatedIDs="121580;"/>` +
`<Card CardID="34402" CardName="Karona, False God" PageURL="https://www.altersleeves.com/product/efonwqwc8hdwz1k?printing_id=72340" RelatedIDs=""/>` +
`<Card CardID="179146" CardName="Phyrexian Altar" PageURL="https://www.altersleeves.com/product/hcfzihdn6jlppza?printing_id=74832" RelatedIDs="179130;179133;179140;179142;179147;"/>` +
`<Card CardID="177303" CardName="Grasp of Fate" PageURL="https://www.altersleeves.com/product/ahp92qdl0ifkoap?printing_id=127415" RelatedIDs="168618;168620;170003;170004;177301;177302;177304;"/>` +
`<Card CardID="194719" CardName="Nekusar, the Mindrazer" PageURL="https://www.altersleeves.com/product/zfmw9w5dlouadzs?printing_id=55772" RelatedIDs="194709;194710;194711;194713;194714;194715;194717;"/>` +
`<Card CardID="128930" CardName="Erebos, Bleak-Hearted" PageURL="https://www.altersleeves.com/product/gmzewwbeuqucllm?printing_id=125475" RelatedIDs="128929;"/>` +
`<Card CardID="189453" CardName="Ruric Thar, the Unbowed" PageURL="https://www.altersleeves.com/product/4egf3noqqalunvz?printing_id=57157" RelatedIDs="189456;189458;189460;"/>` +
`<Card CardID="123927" CardName="Garruk, Cursed Huntsman" PageURL="https://www.altersleeves.com/product/2rzxn3lzeeytuf4?printing_id=117297" RelatedIDs="124781;124782;"/>` +
`<Card CardID="150575" CardName="Sword of Fire and Ice" PageURL="https://www.altersleeves.com/product/zptxtarom2bcxcw?printing_id=56884" RelatedIDs="150463;182619;182631;"/>` +
`<Card CardID="177310" CardName="Honden of Cleansing Fire" PageURL="https://www.altersleeves.com/product/wqioz3b2omz8x1t?printing_id=49432" RelatedIDs="169021;169023;170017;177305;177307;177308;177309;"/>` +
`<Card CardID="177493" CardName="Underworld Dreams" PageURL="https://www.altersleeves.com/product/zkmymyb8rjd7bpg?printing_id=125447" RelatedIDs="163770;163774;164290;164291;177491;177492;177494;"/>` +
`<Card CardID="168459" CardName="Craterhoof Behemoth" PageURL="https://www.altersleeves.com/product/kq8fl949iwqhpsa?printing_id=58896" RelatedIDs="168461;169188;170190;192949;"/>` +
`<Card CardID="151585" CardName="Gishath, Sun's Avatar" PageURL="https://www.altersleeves.com/product/xot5xn7zcnol3vt?printing_id=44591" RelatedIDs="151583;151584;"/>` +
`<Card CardID="152546" CardName="Jet Medallion" PageURL="https://www.altersleeves.com/product/0iihzbhqewhmcs8?printing_id=78488" RelatedIDs="152547;"/>` +
`<Card CardID="182988" CardName="Leonin Arbiter" PageURL="https://www.altersleeves.com/product/85uh26072porll5?printing_id=45233" RelatedIDs="182990;"/>` +
`<Card CardID="34920" CardName="Relic of Progenitus" PageURL="https://www.altersleeves.com/product/6h2qn7oelh2ii3y?printing_id=49214" RelatedIDs="34936;87029;"/>` +
`<Card CardID="177459" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/l96w6fyekmc30qz?printing_id=50756" RelatedIDs="165326;165328;167193;167194;177456;177457;177458;"/>` +
`<Card CardID="34399" CardName="Nylea, God of the Hunt" PageURL="https://www.altersleeves.com/product/wja3sljr3sj6frc?printing_id=56289" RelatedIDs=""/>` +
`<Card CardID="161977" CardName="Elsha of the Infinite" PageURL="https://www.altersleeves.com/product/3bfrcvtem6nij2y?printing_id=38233" RelatedIDs="161975;"/>` +
`<Card CardID="87608" CardName="Phyrexian Metamorph" PageURL="https://www.altersleeves.com/product/k37p43tfggxfteg?printing_id=60638" RelatedIDs="87604;87605;87606;87607;87609;"/>` +
`<Card CardID="192242" CardName="Infernal Denizen" PageURL="https://www.altersleeves.com/product/2hsdnvm1ku8u4sl?printing_id=81678" RelatedIDs="192217;192221;192223;192230;192232;192236;192237;192238;192240;192241;"/>` +
`<Card CardID="124771" CardName="Pharika, God of Affliction" PageURL="https://www.altersleeves.com/product/nsw8r3rev11wxag?printing_id=55281" RelatedIDs="124770;"/>` +
`<Card CardID="177322" CardName="Veil of Summer" PageURL="https://www.altersleeves.com/product/n9z3daqyx7pyckl?printing_id=38615" RelatedIDs="167200;167202;177319;177320;177321;165421;165419;"/>` +
`<Card CardID="160426" CardName="Polluted Delta" PageURL="https://www.altersleeves.com/product/xnnpx53gjpuctsc?printing_id=53944" RelatedIDs=""/>` +
`<Card CardID="127899" CardName="Mox Diamond" PageURL="https://www.altersleeves.com/product/684rttpwvmocfit?printing_id=78288" RelatedIDs="127898;"/>` +
`<Card CardID="182617" CardName="Sword of Feast and Famine" PageURL="https://www.altersleeves.com/product/skjysescio4oizw?printing_id=164781" RelatedIDs="182629;150399;150574;"/>` +
`<Card CardID="177510" CardName="Spinning Wheel" PageURL="https://www.altersleeves.com/product/0nljhfgmjzqluzs?printing_id=117254" RelatedIDs="163639;163641;164285;164286;170041;170043;177502;177503;177505;"/>` +
`<Card CardID="178789" CardName="Aetherflux Reservoir" PageURL="https://www.altersleeves.com/product/c3nrkxwzndueq3i?printing_id=48216" RelatedIDs="178791;"/>` +
`<Card CardID="192207" CardName="Sidisi, Brood Tyrant" PageURL="https://www.altersleeves.com/product/nltbwfrldl4xud3?printing_id=53984" RelatedIDs="192205;"/>` +
`<Card CardID="124811" CardName="Keranos, God of Storms" PageURL="https://www.altersleeves.com/product/ujnp8nomv0vozep?printing_id=55284" RelatedIDs="124810;"/>` +
`<Card CardID="159241" CardName="Expedition Map" PageURL="https://www.altersleeves.com/product/czrufagbdqkwm7t?printing_id=51785" RelatedIDs="86417;86418;159242;"/>` +
`<Card CardID="122559" CardName="Varolz, the Scar-Striped" PageURL="https://www.altersleeves.com/product/g4lt2zz6qibjcah?printing_id=57144" RelatedIDs=""/>` +
`<Card CardID="176697" CardName="Regrowth" PageURL="https://www.altersleeves.com/product/mpbgk13gzoz7qfc?printing_id=56492" RelatedIDs="176620;176622;176624;176694;176695;176696;176698;176699;"/>` +
`<Card CardID="172531" CardName="Arboria" PageURL="https://www.altersleeves.com/product/9aaoes7wnssuw7o?printing_id=83331" RelatedIDs="169588;169590;170438;170439;172203;172204;172532;"/>` +
`<Card CardID="174299" CardName="Ashiok, Dream Render" PageURL="https://www.altersleeves.com/product/4hrixl8uahtlpyj?printing_id=39184" RelatedIDs="174297;"/>` +
`<Card CardID="151190" CardName="Mountain" PageURL="https://www.altersleeves.com/product/ioe4ns1vvb0xqll?printing_id=150621" RelatedIDs=""/>` +
`<Card CardID="120247" CardName="Scapeshift" PageURL="https://www.altersleeves.com/product/1ix91prp50h6j2e?printing_id=41849" RelatedIDs="120244;120245;33912;"/>` +
`<Card CardID="180959" CardName="Sky Diamond" PageURL="https://www.altersleeves.com/product/zxouamldxglp0yx?printing_id=171520" RelatedIDs="180961;"/>` +
`<Card CardID="123738" CardName="Emrakul, the Aeons Torn" PageURL="https://www.altersleeves.com/product/pdsrsjfdjcffaw4?printing_id=51995" RelatedIDs=""/>` +
`<Card CardID="124697" CardName="Iroas, God of Victory" PageURL="https://www.altersleeves.com/product/d0ku3mnpmc3nle2?printing_id=55285" RelatedIDs="124696;"/>` +
`<Card CardID="182627" CardName="Sword of Body and Mind" PageURL="https://www.altersleeves.com/product/739gpmnqsm6t81s?printing_id=163872" RelatedIDs="182621;150570;150573;"/>` +
`<Card CardID="124810" CardName="Keranos, God of Storms" PageURL="https://www.altersleeves.com/product/x7xspa2gorskrp1?printing_id=55284" RelatedIDs="124811;"/>` +
`<Card CardID="34000" CardName="Rune-Scarred Demon" PageURL="https://www.altersleeves.com/product/5jc83uz2lkgpagk?printing_id=44320" RelatedIDs="34102;"/>` +
`<Card CardID="206895" CardName="Korvold, Fae-Cursed King" PageURL="https://www.altersleeves.com/product/kb6c455t15pxaiv?printing_id=178425" RelatedIDs="206893;"/>` +
`<Card CardID="177528" CardName="Call of the Full Moon" PageURL="https://www.altersleeves.com/product/cfefo9lwiaqyccs?printing_id=51589" RelatedIDs="163443;164279;164281;164282;164284;177523;177524;177526;177527;163445;"/>` +
`<Card CardID="208302" CardName="Omnath, Locus of Creation" PageURL="https://www.altersleeves.com/product/vfnlflgq5wtrhtx?printing_id=166445" RelatedIDs="208304;"/>` +
`<Card CardID="163643" CardName="Sol Ring" PageURL="https://www.altersleeves.com/product/3odpme43zia1btm?printing_id=82921" RelatedIDs="163293;163295;163645;177517;177518;177520;177521;177522;"/>` +
`<Card CardID="124806" CardName="Ephara, God of the Polis" PageURL="https://www.altersleeves.com/product/4wx2x4c7qheyxu3?printing_id=55602" RelatedIDs="124807;"/>` +
`<Card CardID="176048" CardName="Dark Confidant" PageURL="https://www.altersleeves.com/product/5vzwrlm2atkdrzk?printing_id=57025" RelatedIDs="128544;128545;128546;176047;201871;201873;201867;201874;154615;"/>` +
`<Card CardID="123598" CardName="Nykthos, Shrine to Nyx" PageURL="https://www.altersleeves.com/product/m6tcbvrb61ahydw?printing_id=56232" RelatedIDs="123592;123593;"/>` +
`<Card CardID="160431" CardName="Flooded Strand" PageURL="https://www.altersleeves.com/product/8ahjhswsfmfmrve?printing_id=53950" RelatedIDs=""/>` +
`<Card CardID="178797" CardName="Nath of the Gilt-Leaf" PageURL="https://www.altersleeves.com/product/lcc6vui3zt5xghg?printing_id=47905" RelatedIDs="178794;178796;178798;"/>` +
`<Card CardID="124383" CardName="Tishana, Voice of Thunder" PageURL="https://www.altersleeves.com/product/t9bq43gmjskmslm?printing_id=44583" RelatedIDs="124381;124382;"/>` +
`<Card CardID="128953" CardName="Purphoros, Bronze-Blooded" PageURL="https://www.altersleeves.com/product/tfokugdzzx15wlo?printing_id=125418" RelatedIDs="128954;"/>` +
`<Card CardID="33896" CardName="All Is Dust" PageURL="https://www.altersleeves.com/product/hitnupfzxew9y4z?printing_id=40477" RelatedIDs=""/>` +
`<Card CardID="128148" CardName="God-Eternal Rhonas" PageURL="https://www.altersleeves.com/product/wjl0sibldgbsegl?printing_id=39260" RelatedIDs="128149;"/>` +
`<Card CardID="128929" CardName="Erebos, Bleak-Hearted" PageURL="https://www.altersleeves.com/product/ttfhq6xbnf2crrl?printing_id=125475" RelatedIDs="128930;"/>` +
`<Card CardID="180363" CardName="Opposition Agent" PageURL="https://www.altersleeves.com/product/xe0jjzm8tgynoru?printing_id=171245" RelatedIDs="180361;333052;"/>` +
`<Card CardID="198100" CardName="Mystic Remora" PageURL="https://www.altersleeves.com/product/jx7cjs7okqbb5dk?printing_id=81727" RelatedIDs="198096;"/>` +
`<Card CardID="181659" CardName="Elder Gargaroth" PageURL="https://www.altersleeves.com/product/jiuhmkmatmxznde?printing_id=162768" RelatedIDs=""/>` +
`<Card CardID="123710" CardName="Reality Smasher" PageURL="https://www.altersleeves.com/product/uotf8fklrfzaa66?printing_id=50151" RelatedIDs="123711;"/>` +
`<Card CardID="34330" CardName="Command Tower" PageURL="https://www.altersleeves.com/product/3qkdbz8rargvpce?printing_id=41314" RelatedIDs=""/>` +
`<Card CardID="125010" CardName="Bontu the Glorified" PageURL="https://www.altersleeves.com/product/frcz1tvfqq5kagu?printing_id=46446" RelatedIDs="125011;"/>` +
`<Card CardID="34101" CardName="Athreos, God of Passage" PageURL="https://www.altersleeves.com/product/scwnguirueiduwb?printing_id=55289" RelatedIDs="124209;33998;"/>` +
`<Card CardID="172544" CardName="Buried Alive" PageURL="https://www.altersleeves.com/product/rd7nzr7p6sywqyu?printing_id=40390" RelatedIDs="169852;169854;170450;170451;172155;172200;172528;172530;172545;"/>` +
`<Card CardID="182629" CardName="Sword of Feast and Famine" PageURL="https://www.altersleeves.com/product/cdv1rjlryox53bx?printing_id=164781" RelatedIDs="182617;150399;150574;"/>` +
`<Card CardID="192949" CardName="Craterhoof Behemoth" PageURL="https://www.altersleeves.com/product/fqaybj9bmrzjodc?printing_id=46935" RelatedIDs="168461;168459;169188;170190;"/>` +
`<Card CardID="124197" CardName="Forest" PageURL="https://www.altersleeves.com/product/wzvejobqgrw7qa9?printing_id=71979" RelatedIDs="124065;"/>` +
`<Card CardID="177315" CardName="Force of Negation" PageURL="https://www.altersleeves.com/product/wkucy2zk5dficcn?printing_id=39027" RelatedIDs="169017;169019;177311;177312;177313;177314;177316;"/>` +
`<Card CardID="178798" CardName="Nath of the Gilt-Leaf" PageURL="https://www.altersleeves.com/product/oyopilau7fn1dvt?printing_id=47905" RelatedIDs="178794;178796;178797;"/>` +
`<Card CardID="164248" CardName="Ghoulcaller Gisa" PageURL="https://www.altersleeves.com/product/ewwujfkwv96nuxm?printing_id=53618" RelatedIDs="164252;164256;164258;164260;164262;164264;"/>` +
`<Card CardID="33912" CardName="Scapeshift" PageURL="https://www.altersleeves.com/product/cugvvbcwfblss4y?printing_id=41849" RelatedIDs="120244;120245;120247;"/>` +
`<Card CardID="167714" CardName="Sword of Light and Shadow" PageURL="https://www.altersleeves.com/product/oqgvcq06vsoqbow?printing_id=164757" RelatedIDs="167716;167718;"/>` +
`<Card CardID="200556" CardName="Spirit of the Night" PageURL="https://www.altersleeves.com/product/hlowmwm8u5wd72f?printing_id=80245" RelatedIDs="200554;200555;200558;200560;200561;200563;200564;200565;200567;200568;200569;"/>` +
`<Card CardID="164281" CardName="Blood Moon" PageURL="https://www.altersleeves.com/product/fseburlrr1nkft1?printing_id=56994" RelatedIDs="163443;164279;164282;164284;177523;177524;177526;177527;177528;163445;"/>` +
`<Card CardID="180957" CardName="Marble Diamond" PageURL="https://www.altersleeves.com/product/s6nxn1cfpi0imi4?printing_id=171536" RelatedIDs="180955;"/>` +
`<Card CardID="176703" CardName="Windfall" PageURL="https://www.altersleeves.com/product/cggtjwfefwas1bq?printing_id=156284" RelatedIDs="176523;176525;176530;176532;176700;176701;176702;176705;176706;176708;176709;"/>` +
`<Card CardID="167716" CardName="Sword of Light and Shadow" PageURL="https://www.altersleeves.com/product/cqu9sbycbxoiwzk?printing_id=164757" RelatedIDs="167714;167718;"/>` +
`<Card CardID="164260" CardName="Coffin Queen" PageURL="https://www.altersleeves.com/product/mufgk62519x2k7x?printing_id=78666" RelatedIDs="164248;164252;164256;164258;164262;164264;"/>` +
`<Card CardID="177309" CardName="Honden of Cleansing Fire" PageURL="https://www.altersleeves.com/product/hqhbzvc6bksn7ww?printing_id=49432" RelatedIDs="169021;169023;170017;177305;177307;177308;177310;"/>` +
`<Card CardID="198113" CardName="Blood Artist" PageURL="https://www.altersleeves.com/product/but7uybznklwytd?printing_id=126955" RelatedIDs="198115;"/>` +
`<Card CardID="33777" CardName="Jodah, Archmage Eternal" PageURL="https://www.altersleeves.com/product/vimhl6q8xoks2rh?printing_id=42838" RelatedIDs=""/>` +
`<Card CardID="124928" CardName="Rhonas the Indomitable" PageURL="https://www.altersleeves.com/product/kpsl6ovvw9owrfm?printing_id=46346" RelatedIDs="124980;"/>` +
`<Card CardID="33761" CardName="Gilded Lotus" PageURL="https://www.altersleeves.com/product/biigsk2nrzbe7of?printing_id=42821" RelatedIDs=""/>` +
`<Card CardID="161975" CardName="Elsha of the Infinite" PageURL="https://www.altersleeves.com/product/vhhje6flamvs4kg?printing_id=38233" RelatedIDs="161977;"/>` +
`<Card CardID="177462" CardName="Veil of Summer" PageURL="https://www.altersleeves.com/product/r3gonea2hyuscgr?printing_id=38615" RelatedIDs="165322;165324;167189;167190;167191;167192;177460;"/>` +
`<Card CardID="156642" CardName="Chrome Mox" PageURL="https://www.altersleeves.com/product/5qoycueanekppiz?printing_id=71682" RelatedIDs=""/>` +
`<Card CardID="163017" CardName="Odric, Lunarch Marshal" PageURL="https://www.altersleeves.com/product/mwthcwdrirxrdga?printing_id=127354" RelatedIDs=""/>` +
`<Card CardID="164434" CardName="Maelstrom Wanderer" PageURL="https://www.altersleeves.com/product/5jtpcmdmrjujyvn?printing_id=58715" RelatedIDs="159182;159183;159243;164438;"/>` +
`<Card CardID="183053" CardName="Vorinclex, Monstrous Raider" PageURL="https://www.altersleeves.com/product/5utud7aa4nk7dvw?printing_id=178614" RelatedIDs=""/>` +
`<Card CardID="207629" CardName="Emrakul, the Aeons Torn" PageURL="https://www.altersleeves.com/product/eatwwll7nfwbss8?printing_id=167744" RelatedIDs="207627;"/>` +
`<Card CardID="152056" CardName="Edgar Markov" PageURL="https://www.altersleeves.com/product/wfgkj0bvlh8nusk?printing_id=45261" RelatedIDs="152054;152055;"/>` +
`<Card CardID="34954" CardName="Vraska, Relic Seeker" PageURL="https://www.altersleeves.com/product/zpe8rubdngokzwy?printing_id=44581" RelatedIDs=""/>` +
`<Card CardID="34070" CardName="Flux Channeler" PageURL="https://www.altersleeves.com/product/mgpqtuv9ixbqf9o?printing_id=39382" RelatedIDs=""/>` +
`<Card CardID="200543" CardName="Sedris, the Traitor King" PageURL="https://www.altersleeves.com/product/ti4aokib7gvrqro?printing_id=64959" RelatedIDs="200538;200540;200541;200542;200544;200546;200547;200548;200550;200551;200552;"/>` +
`<Card CardID="33972" CardName="Urza's Mine" PageURL="https://www.altersleeves.com/product/bjrbiv6wsz20kiv?printing_id=84129" RelatedIDs=""/>` +
`<Card CardID="161378" CardName="Elenda, the Dusk Rose" PageURL="https://www.altersleeves.com/product/z5plgfbdunbkjzf?printing_id=43657" RelatedIDs="152609;152611;152612;152613;161380;"/>` +
`<Card CardID="172532" CardName="Arboria" PageURL="https://www.altersleeves.com/product/qifcq1mhss58nqa?printing_id=83331" RelatedIDs="169588;169590;170438;170439;172203;172204;172531;"/>` +
`<Card CardID="194717" CardName="Nekusar, the Mindrazer" PageURL="https://www.altersleeves.com/product/ypcco1ivtvg6209?printing_id=55772" RelatedIDs="194709;194710;194711;194713;194714;194715;194719;"/>` +
`<Card CardID="172545" CardName="Buried Alive" PageURL="https://www.altersleeves.com/product/6zcys4iqwbiqisi?printing_id=40390" RelatedIDs="169852;169854;170450;170451;172155;172200;172528;172530;172544;"/>` +
`<Card CardID="34940" CardName="Urza's Tower" PageURL="https://www.altersleeves.com/product/zu4krul3imsl3me?printing_id=84120" RelatedIDs="33899;"/>` +
`<Card CardID="177304" CardName="Grasp of Fate" PageURL="https://www.altersleeves.com/product/gtesb8e3haa4mi4?printing_id=127415" RelatedIDs="168618;168620;170003;170004;177301;177302;177303;"/>` +
`<Card CardID="34863" CardName="Urza, Lord High Artificer" PageURL="https://www.altersleeves.com/product/yv1rm6bl22dfzex?printing_id=39004" RelatedIDs=""/>` +
`<Card CardID="152054" CardName="Edgar Markov" PageURL="https://www.altersleeves.com/product/wuc0njjdmajiz3v?printing_id=45261" RelatedIDs="152055;152056;"/>` +
`<Card CardID="86991" CardName="Urza's Mine" PageURL="https://www.altersleeves.com/product/ofelncgbadtyrsj?printing_id=84128" RelatedIDs="33900;"/>` +
`<Card CardID="200544" CardName="Frankenstein's Monster" PageURL="https://www.altersleeves.com/product/pqxxjzqreflep18?printing_id=82843" RelatedIDs="200538;200540;200541;200542;200543;200546;200547;200548;200550;200551;200552;"/>` +
`<Card CardID="34608" CardName="The Gitrog Monster" PageURL="https://www.altersleeves.com/product/p71bcljcdkrhnzb?printing_id=49526" RelatedIDs=""/>` +
`<Card CardID="33899" CardName="Urza's Tower" PageURL="https://www.altersleeves.com/product/76qhsnljcaor91v?printing_id=84120" RelatedIDs="34940;"/>` +
`<Card CardID="123815" CardName="Muldrotha, the Gravetide" PageURL="https://www.altersleeves.com/product/nh8m4ujlndl9iib?printing_id=42837" RelatedIDs=""/>` +
`<Card CardID="172538" CardName="Aura of Silence" PageURL="https://www.altersleeves.com/product/on9mkq4r387i9jd?printing_id=127514" RelatedIDs="169340;169342;172205;172206;172207;172208;172535;172536;172537;"/>` +
`<Card CardID="150573" CardName="Sword of Body and Mind" PageURL="https://www.altersleeves.com/product/g4rurafw01bxlnm?printing_id=61853" RelatedIDs="182621;182627;150570;"/>` +
`<Card CardID="171967" CardName="Teferi, Master of Time" PageURL="https://www.altersleeves.com/product/hckybeiwtggxrgt?printing_id=162502" RelatedIDs="171965;"/>` +
`<Card CardID="182623" CardName="Sword of Light and Shadow" PageURL="https://www.altersleeves.com/product/kgct5aopucly366?printing_id=164757" RelatedIDs="150571;150576;182633;"/>` +
"</Cards>";

 function myParseCards(){
   var parser = new DOMParser();
   xmlDoc = parser.parseFromString(xmlCards,"text/xml");
   bxmlParsed = true;
   
   bSpeech = false;
   if ('speechSynthesis' in window) {
    // Speech Synthesis supported
    bSpeech = true;
    msgSpeech = new SpeechSynthesisUtterance();
    //msgSpeech.rate = 1; // From 0.1 to 10, 1= default
   }
   else
   {
     document.getElementById('myChkSpeakUp').checked = false;
   }   
 } 

 function mySearch(){
  var input, filter, bIsCardID;
  input = document.getElementById("myInput");
  filter = input.value.replaceAll("*"," ").replaceAll("%"," ").trim().toUpperCase();
  bIsCardID = false;
  var numCardID = parseInt(filter);
  if( Number.isInteger(numCardID))
   bIsCardID = true;
  if( bxmlParsed == false){
    myParseCards();
  }
  var table = document.getElementById('myTable');
  table.innerHTML = "";
   
  var CardCnt = 0;
  var catalog = xmlDoc.getElementsByTagName('Cards')[0];
  var totXmlCards = catalog.childElementCount;

  var row, cell;

  for (var i = 0; i < totXmlCards; i++){
   var book = catalog.childNodes[i];
   var CardID = book.attributes[0].nodeValue;
   var CardNAME = book.attributes[1].nodeValue;
   var CardURL = book.attributes[2].nodeValue;
   if (CardNAME.toUpperCase().indexOf(filter) > -1 || CardID == filter){
    CardCnt++;
    row = table.insertRow(-1);
    row.addEventListener('click', function() {
    selectRow(this,'selected');
    });

    cell = row.insertCell(-1);
    // 192x266
    cell.innerHTML = "<a href='" + CardURL + "'><img src='"+ CardID +".jpg' alt='" +CardID + "' style='width:40px;height:52px;border-radius:2px;' title=\"" +CardID + " " + CardNAME + "\"></a>"
    // CardID
    cell = row.insertCell(-1);
    cell.innerHTML = "<font size='1' style='padding: 4px'>" + CardID + "</font>";
    cell.addEventListener('click', function() {
    addToCell(this);
    });
    
    // CardName
    cell = row.insertCell(-1);
    cell.innerHTML = "<font size='2' style='padding: 4px'>" + CardNAME + "</font>";
    cell.addEventListener('click', function() {
    addToCell(this);
    });
    
    cell = row.insertCell(-1);
    cell.innerHTML = "<font size='1' style='visibility:hidden;'>" + i + "</font>";
    cell.innerText = i;
    cell.nodeValue = i;
    cell.hidden = true;
    
    if( bIsCardID == true){
     var RelatedCards = book.attributes[3].nodeValue;
     if( RelatedCards != ""){
      if( RelatedCards[RelatedCards.length-1] == ";"){
       RelatedCards = RelatedCards.substring(0, RelatedCards.length-1);
      }
      var RelatedList = RelatedCards.replace(",",";").split(";");
      var RelatedCount = RelatedList.length;
      var RelatedCnt = 1;
      for(var iRel=0; iRel < RelatedCount; iRel++){
       if (RelatedList[iRel] != ""){
        CardCnt++;
        row = table.insertRow(-1);
        row.addEventListener('click', function() {
         selectRow(this,'selected');
        });
        mySearchCardID(RelatedList[iRel], row);
       }
      }
     }
     break;
    }
    
   }
  }
  document.getElementById('totalCards').innerHTML = "<font size='1'>Found " + CardCnt + (CardCnt!=totXmlCards?  " of " + totXmlCards: "") + " cards in AlterSleeves";
  // Se ci sono carte
  if(CardCnt > 0)
   showRelated(0);
  else{
   var tableimg = document.getElementById('myTableImg');
   tableimg.innerHTML = "";
  }
  //mySetContent(); 
  window.scrollTo(0, 0);
 }

 function addToCell(x, className) {  
  var cell = x.parentNode.cells[3];

  var catalog = xmlDoc.getElementsByTagName('Cards')[0];
  var book = catalog.childNodes[cell.innerHTML];
  var CardID = book.attributes[0].nodeValue;
  var CardNAME = book.attributes[1].nodeValue;
  var CardURL = book.attributes[2].nodeValue;
  
  var tableimg = document.getElementById('myTableImg');
  
  tableimg.innerHTML = "";
  row = tableimg.insertRow(-1);
  cell = row.insertCell(-1);
  cell.innerHTML = "<a href='" + CardURL + "'><img src='"+ CardID +".jpg' alt='" +CardID + "' style='width:96px;height:133px;border-radius:6px;' title=\"" +CardID + " " + CardNAME + "\"><font size='1'><br>" + CardNAME + "</font></a>";
  
  var RelatedCards = book.attributes[3].nodeValue;
  if( RelatedCards != ""){
   if( RelatedCards[RelatedCards.length-1] == ";"){
    RelatedCards = RelatedCards.substring(0, RelatedCards.length-1);
   }
   var RelatedList = RelatedCards.replace(",",";").split(";");
   var RelatedCount = RelatedList.length;
   var RelatedCnt = 1;
   for(var iRel=0; iRel < RelatedCount; iRel++){
    if (RelatedList[iRel] != ""){
     //row = tableimg.insertRow(-1);
     mySearchRelatedID(RelatedList[iRel], row);
    }
   }
  }  
}

let prevIx=null;
let prevTr=null;
function selectRow(tr, className){
  let ix = tr.rowIndex;
  if (ix === prevIx) {
    tr.className += className;
    prevIx = ix;
    prevTr = tr;
  }
  else {

    if (prevTr) {
      prevTr.className = prevTr.className.replace(className,"");
    }

    tr.className += className;
    prevIx = ix;
    prevTr = tr;
  }

  var imgurl = tr.querySelector('img').getAttribute('src');
  var obj = document.getElementById('center-header');
  obj.style.backgroundPosition = "center";    // netti al centro
  obj.style.backgroundImage = "url('"+ imgurl+"')"; // questa immagine
  obj.style.backgroundRepeat = "repeat-y"; // non ripetere come tiles
  
  if( bSpeech == true)
  {
    var bSpeakUp = document.getElementById('myChkSpeakUp').checked;
    if(bSpeakUp == true){
     msgSpeech.text = tr.cells[2].innerText;
     speechSynthesis.speak(msgSpeech);
    }
  }  
}

function showRelated(index) {
  var table = document.getElementById('myTable');
  var rowMaster = table.rows[index];
  var xmlindex = rowMaster.cells[3].innerText;
  selectRow(rowMaster, 'selected');
     
  var catalog = xmlDoc.getElementsByTagName('Cards')[0];
  var book = catalog.childNodes[xmlindex];
  var CardID = book.attributes[0].nodeValue;
  var CardNAME = book.attributes[1].nodeValue;
  var CardURL = book.attributes[2].nodeValue;
  var tableimg = document.getElementById('myTableImg');
  tableimg.innerHTML = "";
  var row = tableimg.insertRow(-1);
  cell = row.insertCell(-1);
  cell.innerHTML = "<a href='" + CardURL + "'><img src='"+ CardID +".jpg' alt='" +CardID + "' style='width:96px;height:133px;border-radius:6px;' title=\"" +CardID + " " + CardNAME + "\"><font size='1'><br>" + CardNAME + "</font></a>";
  
  var RelatedCards = book.attributes[3].nodeValue;
  if( RelatedCards != ""){
   if( RelatedCards[RelatedCards.length-1] == ";"){
    RelatedCards = RelatedCards.substring(0, RelatedCards.length-1);
   }
   var RelatedList = RelatedCards.replace(",",";").split(";");
   var RelatedCount = RelatedList.length;
   var RelatedCnt = 1;
   for(var iRel=0; iRel < RelatedCount; iRel++){
    if (RelatedList[iRel] != ""){
     mySearchRelatedID(RelatedList[iRel], row);
    }
   }
  }
}
 
 function mySearchRelatedID(Look4CardID, lastRow){
  var catalog = xmlDoc.getElementsByTagName('Cards')[0];
  for (var i = 0; i < catalog.childElementCount; i++){
   var book = catalog.childNodes[i];
   var CardID = book.attributes[0].nodeValue;
   if (CardID === Look4CardID){
    var CardNAME = book.attributes[1].nodeValue;
    var CardURL = book.attributes[2].nodeValue;
    // Card Thumbnail
    cell = lastRow.insertCell(-1);
    // 192x266
    cell.innerHTML = "<a href='" + CardURL + "'><img src='"+ CardID +".jpg' alt='" +CardID + "' style='width:96px;height:133px;border-radius:6px;' title=\"" +CardID + " " + CardNAME + "\"><font size='1'><br>" + CardNAME + "</font></a>";    
    break;
   }
  }
 }

 function mySearchCardID(Look4CardID, lastRow){
  var catalog = xmlDoc.getElementsByTagName('Cards')[0];
  for (var i = 0; i < catalog.childElementCount; i++){
   var book = catalog.childNodes[i];
   var CardID = book.attributes[0].nodeValue;
   if (CardID === Look4CardID){
    var CardNAME = book.attributes[1].nodeValue;
    var CardURL = book.attributes[2].nodeValue;

    cell = lastRow.insertCell(-1);
    // 192x266
    cell.innerHTML = "<a href='" + CardURL + "'><img src='"+ CardID +".jpg' alt='" +CardID + "' style='width:40px;height:52px;border-radius:2px;' title=\"" +CardID + " " + CardNAME + "\"></a>"
    // CardID
    cell = lastRow.insertCell(-1);
    cell.innerHTML = "<font size='1' style='padding: 4px'>" + CardID + "</font>";
    cell.addEventListener('click', function() {
    addToCell(this);
    });
    // CardName
    cell = lastRow.insertCell(-1);
    cell.innerHTML = "<font size='2' style='padding: 4px'>" + CardNAME + "</font>";
    cell.addEventListener('click', function() {
    addToCell(this);
    });
    
    cell = lastRow.insertCell(-1);
    cell.innerHTML = "<font size='1' style='visibility:hidden;'>" + i + "</font>";
    cell.innerText = i;
    cell.nodeValue = i;
    cell.hidden = true;
      
    break;
   }
  }
 }

 function myHelp(){
  document.getElementById('myBtnHelp').style.color='#000000';
  document.getElementById('myBtnHelp').style.background='#ffffff';
  alert("Search by Card-Name or card-ID.\nCard-ID is a numeric value shown in the tooltip.\nWhen searching by Card-ID you get the card and all its related cards if any.\nAll cards are displayed when a blank search field is given.\nYou can hit 'RETURN' at the end of input text avoiding 'Search' button.\nClick on Card-id/Card-Name columns in cards list to get the image of that card and its related cards in the bottom panel.");
 }

 function getRndInt(max){
  return (Math.floor(Math.random() * max) +1);
 }

 function myRndSearch(){
  if( bxmlParsed == false){
    myParseCards();
  }
  var catalog = xmlDoc.getElementsByTagName('Cards')[0];
  var totXmlCards = catalog.childElementCount;
  var rndCard = getRndInt(totXmlCards);

  var bAppendResult = document.getElementById('myChkAppend').checked;
  var CardCnt = 0;

  var table = document.getElementById('myTable');
  var totRows = 0;
  var totaleCards = 0;
  if( bAppendResult == false)
  {
   table.innerHTML = "";
   //prevIx = null;
   //prevTr = null;
  }
  else{
   totRows = table.rows.length;
   CardCnt = table.rows[totRows-1].cells.length;
  }
  document.getElementById('totalCards').innerHTML = "<font size='1'>Found " + (totRows+1) + " of " + totXmlCards + " cards in AlterSleeves";

  var book = catalog.childNodes[rndCard];
  var CardID = book.attributes[0].nodeValue;
  var CardNAME = book.attributes[1].nodeValue;
  var CardURL = book.attributes[2].nodeValue;
  var row,cell;
  CardCnt++;
  
  row = table.insertRow(-1);
  row.addEventListener('click', function() {
  selectRow(this,'selected');
  });
  // Card Thumbnail
  cell = row.insertCell(-1);
  // 192x266
  cell.innerHTML = "<a href='" + CardURL + "'><img src='"+ CardID +".jpg' alt='" +CardID + "' style='width:40px;height:52px;border-radius:2px;' title=\"" +CardID + " " + CardNAME + "\">"
  // CardID
  cell = row.insertCell(-1);
  //cell.innerHTML = "<a href='" + CardURL + "'><font size='1'>" + CardID + "</font></a>";
  cell.innerHTML = "<font size='1' style='padding: 4px'>" + CardID + "</font>";
  cell.addEventListener('click', function() {
  addToCell(this);
  });
  // CardName
  cell = row.insertCell(-1);
  //cell.innerHTML = "<a href='" + CardURL + "'><font size='1'>" + CardNAME + "</font></a>";
  cell.innerHTML = "<font size='2' style='padding: 4px'>" + CardNAME + "</font>";
  cell.addEventListener('click', function() {
  addToCell(this);
  });
  
  cell = row.insertCell(-1);
  
  cell.innerHTML = "<font size='1' style='visibility:hidden;'>" + rndCard + "</font>";
  cell.innerText = rndCard;
  cell.nodeValue = rndCard;
  cell.hidden = true;    
  
  if( bAppendResult == false)
   showRelated(0);
  else{
   totRows = table.rows.length;
   showRelated(totRows-1);
  
  }
  row.scrollIntoView({behavior: "smooth"});                         
 }

