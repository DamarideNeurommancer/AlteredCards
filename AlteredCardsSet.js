var bxmlParsed=false;
var xmlDoc,catalog,totXmlCards;
const xmlCards=`<Cards><C I="399250" N="Flubs, the Fool" U="4of3amymcgtgxdo" R="1"/><C I="169976" N="Cyclonic Rift" U="ou6zkmtloka3npb" R="1"/><C I="169978" N="Cyclonic Rift" U="ipzwafwm9yj8pen" R="1"/><C I="170426" N="Cyclonic Rift" U="3aafqszvgjztdiq" R="1"/><C I="170427" N="Cyclonic Rift" U="tkuib8o24qeyq5q" R="1"/><C I="170429" N="Force of Will" U="jh43z983i5f8vmo" R="1"/><C I="172209" N="Force of Will" U="vpsmannkxvrd2wl" R="1"/><C I="172210" N="Force of Will" U="uyixqlmqqbgz2zv" R="1"/><C I="172526" N="Mind Over Matter" U="6jb9urle2ojpw2m" R="1"/><C I="172527" N="Mind Over Matter" U="3sguti5lyh245k9" R="1"/><C I="172546" N="Chain of Vapor" U="eqfieraeobl8l56" R="1"/><C I="172548" N="Chain of Vapor" U="59yb4clml1zdjpc" R="1"/><C I="170431" N="Force of Will" U="miefmbjxkjpbspk" R="1"/><C I="400342" N="Urza, Lord High Artificer" U="huv3v5msppyinzr" R="1"/><C I="400341" N="Nekusar, the Mindrazer" U="1cbbk7hpcfik2mp" R="1"/><C I="400340" N="Urza, Lord High Artificer" U="3ss01gw0g72do2z" R="1"/><C I="400339" N="Urza, Lord High Artificer" U="pxpeobwxoodeoyh" R="1"/><C I="400338" N="Nekusar, the Mindrazer" U="sjv6ozdyasb9nse" R="1"/><C I="400337" N="Urza, Lord High Artificer" U="kk7oqgtvf3wjqsv" R="1"/><C I="167007" N="Counterspell" U="zfqzq4xvkfosufl" R="1"/><C I="167009" N="Counterspell" U="dsjkmxh7tv9nqby" R="1"/><C I="167169" N="Counterspell" U="wa3uaowcqaisbk0" R="1"/><C I="167170" N="Counterspell" U="78aawbl2lovnjbi" R="1"/><C I="177470" N="Demonic Consultation" U="6w2uersceknyucz" R="1"/><C I="177475" N="Demonic Consultation" U="mnn4efrt03c5q9g" R="1"/><C I="177477" N="Nexus of Fate" U="dppkkikrcmesfym" R="1"/><C I="177476" N="Nexus of Fate" U="kaf2wvkqgwe0cea" R="1"/><C I="169017" N="Intuition" U="pi3hajkb14f9g46" R="1"/><C I="169019" N="Intuition" U="ru5szqyhnxgjugo" R="1"/><C I="177311" N="Ponder" U="li0htrhchk4pt1q" R="1"/><C I="177312" N="Ponder" U="hnfni1nzvbzm3cg" R="1"/><C I="177313" N="Ponder" U="ttrulusxywr7ino" R="1"/><C I="177314" N="Ponder" U="rlnzhd7csa2sedt" R="1"/><C I="177316" N="Force of Negation" U="fonln6f6o5kyzkz" R="1"/><C I="177315" N="Force of Negation" U="wkucy2zk5dficcn" R="1"/><C I="165322" N="Sylvan Library" U="gox5xhvgyr9nw4h" R="1"/><C I="165324" N="Sylvan Library" U="dpjyrovvgjrorss" R="1"/><C I="167189" N="Sylvan Library" U="h0b3pj3fgsi6ydk" R="1"/><C I="167190" N="Sylvan Library" U="oejd2elt8aeucl9" R="1"/><C I="167191" N="Sylvan Library" U="vioc8luhz04hdsc" R="1"/><C I="167192" N="Sylvan Library" U="2mpsww6halo3gxg" R="1"/><C I="177460" N="Veil of Summer" U="ujdtuutoiodw3ac" R="1"/><C I="177462" N="Veil of Summer" U="r3gonea2hyuscgr" R="1"/><C I="165326" N="Blind Obedience" U="bnnhmruk0pryrut" R="1"/><C I="165328" N="Blind Obedience" U="demauts8ngqrdqp" R="1"/><C I="167193" N="Blind Obedience" U="ajad3ewuniagj1f" R="1"/><C I="167194" N="Blind Obedience" U="zgcblcjedgfnpcg" R="1"/><C I="177456" N="Aura of Silence" U="9uaw61vqzbtlbme" R="1"/><C I="177457" N="Aura of Silence" U="9tnp3r0dtxrmy7d" R="1"/><C I="177458" N="Aura of Silence" U="nv2oytlo0dzwwga" R="1"/><C I="177459" N="Aura of Silence" U="l96w6fyekmc30qz" R="1"/><C I="169340" N="Smothering Tithe" U="ctuag4ibp3wrnkd" R="1"/><C I="169342" N="Smothering Tithe" U="ahhemr0vcexpffi" R="1"/><C I="172205" N="Land Tax" U="s0kh0kl3aiouwat" R="1"/><C I="172206" N="Land Tax" U="aqmcmbxhojp2f5r" R="1"/><C I="172207" N="Land Tax" U="0y3ix2hn9lvwvo0" R="1"/><C I="172208" N="Land Tax" U="4v6bsj1eqiojeis" R="1"/><C I="172535" N="Replenish" U="3umqiekh2pmdkug" R="1"/><C I="172536" N="Replenish" U="0v9thsyab4vu4kx" R="1"/><C I="172537" N="Aura of Silence" U="a7ntkrt1l77xoce" R="1"/><C I="172538" N="Aura of Silence" U="on9mkq4r387i9jd" R="1"/><C I="169588" N="Doubling Season" U="v2yeige1n1gt3hm" R="1"/><C I="169590" N="Doubling Season" U="5qpxbjpxnkjbyo1" R="1"/><C I="170438" N="Doubling Season" U="fqiyipdpsri0snn" R="1"/><C I="170439" N="Doubling Season" U="ehnmn1y4jkwqfxm" R="1"/><C I="172203" N="Rampant Growth" U="zwwkajz3wumieya" R="1"/><C I="172204" N="Rampant Growth" U="zltin4qmvwlurme" R="1"/><C I="172531" N="Arboria" U="9aaoes7wnssuw7o" R="1"/><C I="172532" N="Arboria" U="qifcq1mhss58nqa" R="1"/><C I="169820" N="Lightning Greaves" U="vzkcmo1vy6fi2le" R="1"/><C I="169822" N="Lightning Greaves" U="4marpc3xs3dvqlk" R="1"/><C I="170444" N="Lightning Greaves" U="p5fzqxrdlsmqbqy" R="1"/><C I="170445" N="Lightning Greaves" U="9den8rq2eoth17z" R="1"/><C I="172201" N="Nevinyrral's Disk" U="kqjtrgp9gq60j68" R="1"/><C I="172202" N="Nevinyrral's Disk" U="cakqqaea6fkh0au" R="1"/><C I="172524" N="Planar Gate" U="ypivkw8ducy7sdw" R="1"/><C I="172525" N="Planar Gate" U="o2r8tektmuobzs0" R="1"/><C I="177294" N="Icon of Ancestry" U="dihuyr8ztygacnj" R="1"/><C I="177295" N="Icon of Ancestry" U="6xfomllak4r71kf" R="1"/><C I="400348" N="Fierce Empath" U="qwmwtg0sy860bdx" R="1"/><C I="400347" N="Vigor" U="6lxzvqen4rafs9j" R="1"/><C I="400346" N="Go-Shintai of Life's Origin" U="csx2turbon1spac" R="1"/><C I="400345" N="Fierce Empath" U="ezkienjmqa2ynoe" R="1"/><C I="400344" N="Vigor" U="ag2qypbmkfz9gm3" R="1"/><C I="400343" N="Go-Shintai of Life's Origin" U="r6ulkmxt7hjxhua" R="1"/><C I="167200" N="Berserk" U="uzuqxshfpoqr32z" R="1"/><C I="167202" N="Berserk" U="8auggzqbwflsfnt" R="1"/><C I="177319" N="Beast Within" U="zepv0ptiykmnpi4" R="1"/><C I="177320" N="Beast Within" U="svttyascuvbtndj" R="1"/><C I="177321" N="Veil of Summer" U="7tgoe0rkqcavmjo" R="1"/><C I="165421" N="Berserk" U="y3agtugtvszpioc" R="1"/><C I="165419" N="Berserk" U="lpru5i6bpqjv5kv" R="1"/><C I="177322" N="Veil of Summer" U="n9z3daqyx7pyckl" R="1"/><C I="168618" N="Path to Exile" U="8i7ieit4t5spwva" R="1"/><C I="168620" N="Path to Exile" U="wfly0t69pwh54re" R="1"/><C I="170003" N="Path to Exile" U="exprlvukegpwdpl" R="1"/><C I="170004" N="Path to Exile" U="ee4cn5bqsts08d1" R="1"/><C I="177301" N="Disenchant" U="n5g9lfu2ygpjwjp" R="1"/><C I="177302" N="Disenchant" U="bbviekezbcofsid" R="1"/><C I="177303" N="Grasp of Fate" U="ahp92qdl0ifkoap" R="1"/><C I="177304" N="Grasp of Fate" U="gtesb8e3haa4mi4" R="1"/><C I="163639" N="Wheel of Fortune" U="4xn0qyfhx6ibecf" R="1"/><C I="163641" N="Wheel of Fortune" U="m5ttqrrgyhogxhx" R="1"/><C I="164285" N="Wheel of Fortune" U="klmjrwiiaz34nrl" R="1"/><C I="164286" N="Wheel of Fortune" U="8jteznazzs7jqkc" R="1"/><C I="170041" N="Wheel of Fate" U="p9pvqbhmwclwqru" R="1"/><C I="170043" N="Wheel of Fate" U="ts4vcrpkq9zi3gn" R="1"/><C I="177502" N="Wheel of Fate" U="hbkrmel4y7h12uo" R="1"/><C I="177503" N="Wheel of Fate" U="akgt8opws65nlba" R="1"/><C I="177505" N="Spinning Wheel" U="jtntdrilpe3j8ey" R="1"/><C I="177510" N="Spinning Wheel" U="0nljhfgmjzqluzs" R="1"/><C I="169021" N="Karmic Justice" U="xv1irvzypwg65r6" R="1"/><C I="169023" N="Karmic Justice" U="xzsbh5kzosuew0j" R="1"/><C I="170017" N="Karmic Justice" U="pggnwo4mgpfh2po" R="1"/><C I="177305" N="Council's Judgment" U="2xswbhpgxzvfkzq" R="1"/><C I="177307" N="Karmic Justice" U="adqcotdhorde6db" R="1"/><C I="177308" N="Council's Judgment" U="opapwxu3i0wsumo" R="1"/><C I="177310" N="Honden of Cleansing Fire" U="wqioz3b2omz8x1t" R="1"/><C I="177309" N="Honden of Cleansing Fire" U="hqhbzvc6bksn7ww" R="1"/><C I="169852" N="Diabolic Intent" U="ggnwlp7lbr72wrs" R="1"/><C I="169854" N="Diabolic Intent" U="wpdaip9glbnx2js" R="1"/><C I="170450" N="Diabolic Intent" U="4gqkrpmb7zbfvri" R="1"/><C I="170451" N="Diabolic Intent" U="0zjiweucf34bvr0" R="1"/><C I="172155" N="Skullclamp" U="huibrzbm0ys6ssx" R="1"/><C I="172200" N="Skullclamp" U="x5obgbeaszz4tgb" R="1"/><C I="172528" N="Darkness" U="mjyv6bkz6xraoq2" R="1"/><C I="172530" N="Darkness" U="mxoxzincimcdrek" R="1"/><C I="172544" N="Buried Alive" U="rd7nzr7p6sywqyu" R="1"/><C I="172545" N="Buried Alive" U="6zcys4iqwbiqisi" R="1"/><C I="165423" N="Damnation" U="vx2asm1t5mq4kbl" R="1"/><C I="165425" N="Damnation" U="bjiffkror5utndm" R="1"/><C I="170034" N="Damnation" U="rtftryzplt9xnx4" R="1"/><C I="170035" N="Damnation" U="sile4auikjfxlzw" R="1"/><C I="177317" N="Entomb" U="jty61er2u9egtcx" R="1"/><C I="177318" N="Entomb" U="mt6rye3chhfuo6g" R="1"/><C I="177495" N="Entomb" U="weipfc4inkrkabb" R="1"/><C I="177496" N="Entomb" U="x8rrwceimrhqz4c" R="1"/><C I="177498" N="Disentomb" U="ke12ghd68fllne5" R="1"/><C I="177497" N="Disentomb" U="8pctksibkofr93d" R="1"/><C I="164984" N="Rhystic Study" U="qiidpvibg5xb04q" R="1"/><C I="164986" N="Rhystic Study" U="vfqnfgtmyplvq0d" R="1"/><C I="167179" N="Rhystic Study" U="rpitshohpd69ebf" R="1"/><C I="167184" N="Rhystic Study" U="bnuuqk9qjlqtsyi" R="1"/><C I="167187" N="Rhystic Study" U="gbm4ukpforafdp2" R="1"/><C I="167188" N="Rhystic Study" U="8mebhl7eprlznqf" R="1"/><C I="177463" N="Remand" U="tavprde1u7d4ol0" R="1"/><C I="177464" N="Remand" U="nlyzdxbestnwmlq" R="1"/><C I="177467" N="Remand" U="asgbtkz5nzs64h2" R="1"/><C I="177501" N="Propaganda" U="jir14ngxzdk10fv" R="1"/><C I="177499" N="Propaganda" U="svsrga6x4qvyeok" R="1"/><C I="169013" N="Demonic Tutor" U="qqkavk5h81t6lrm" R="1"/><C I="169015" N="Demonic Tutor" U="adia2kmq1khpbdj" R="1"/><C I="170005" N="Demonic Tutor" U="2eotdmszordw5rs" R="1"/><C I="170006" N="Demonic Tutor" U="ovmuruz6ahvkqjq" R="1"/><C I="170007" N="Demonic Tutor" U="tur2shvvqbor98t" R="1"/><C I="170008" N="Demonic Tutor" U="9vgwpsofjkok0cz" R="1"/><C I="177297" N="Phyrexian Reclamation" U="hkc1ljnzvdc7ti6" R="1"/><C I="177299" N="Phyrexian Reclamation" U="xaytqxp1kxujm6u" R="1"/><C I="177300" N="Phyrexian Reclamation" U="30mqx2oyykfzghb" R="1"/><C I="163387" N="Command Tower" U="m7hp0qm41qg1gze" R="1"/><C I="163389" N="Command Tower" U="qb8yz45yh5rml3j" R="1"/><C I="164296" N="Command Tower" U="0yb6robyea9py7n" R="1"/><C I="164297" N="Command Tower" U="z4yakuhsnafmnee" R="1"/><C I="177483" N="Phyrexian Tower" U="urnuznfhk8azqhw" R="1"/><C I="177484" N="Phyrexian Tower" U="xevbpzngsj4qiu6" R="1"/><C I="177485" N="Phyrexian Tower" U="iqynwu9dmn2wksp" R="1"/><C I="177486" N="Phyrexian Tower" U="osfmfz9zdq3dgqo" R="1"/><C I="400354" N="Gray Merchant of Asphodel" U="hhkrdmylkdr583c" R="1"/><C I="400353" N="Gray Merchant of Asphodel" U="kjfw99qczxevxe9" R="1"/><C I="400352" N="Gray Merchant of Asphodel" U="xirmug2vnl59gc9" R="1"/><C I="400351" N="Gray Merchant of Asphodel" U="ahpvebemozctrew" R="1"/><C I="400350" N="Gray Merchant of Asphodel" U="un9xbuyynu7hydp" R="1"/><C I="400349" N="Gray Merchant of Asphodel" U="b0jkt0xungiv7rp" R="1"/><C I="169999" N="Chromatic Star" U="4tlzrbha2ey4nhx" R="1"/><C I="170001" N="Chromatic Star" U="sabgexdqjnf19n4" R="1"/><C I="170456" N="Chromatic Star" U="tdtlxxtkb2hwdxz" R="1"/><C I="170457" N="Chromatic Star" U="dt3cmjmraysuzjm" R="1"/><C I="172198" N="Star Compass" U="0kn3niydon1nu7a" R="1"/><C I="172199" N="Star Compass" U="brt0ziveb6usoxy" R="1"/><C I="172533" N="Mana Vault" U="tcy8eh9wmq7uwbk" R="1"/><C I="172534" N="Mana Vault" U="lcqjreb88cf6p8v" R="1"/><C I="172542" N="Trinisphere" U="vsevy4ookat23yr" R="1"/><C I="172543" N="Trinisphere" U="159btrrjtw0ledz" R="1"/><C I="163443" N="Blood Moon" U="fen1jkm6rrycslb" R="1"/><C I="164279" N="Blood Moon" U="yfcjixqxhrzuiuj" R="1"/><C I="164282" N="Blood Moon" U="e8cycsl9du2lwxq" R="1"/><C I="164284" N="Blood Moon" U="w088qjp3fcjnhs4" R="1"/><C I="177523" N="Blood Moon" U="zkphxe8w4tpiadt" R="1"/><C I="177524" N="Blood Moon" U="ptmdqjd1dkdbfrb" R="1"/><C I="177526" N="Blood Moon" U="ds4cn9iz9ws8un7" R="1"/><C I="177527" N="Call of the Full Moon" U="79qlxsbk4zo9d4r" R="1"/><C I="177528" N="Call of the Full Moon" U="cfefo9lwiaqyccs" R="1"/><C I="163445" N="Blood Moon" U="y7d0zswrsvlwnda" R="1"/><C I="164281" N="Blood Moon" U="fseburlrr1nkft1" R="1"/><C I="400360" N="Guiding Spirit" U="clyvzgmlhtpqhao" R="1"/><C I="400359" N="Heliod, God of the Sun" U="ceskxkpmiwjluob" R="1"/><C I="400358" N="Heliod, Sun-Crowned" U="4vlq254oufdumyv" R="1"/><C I="400357" N="Guiding Spirit" U="sumwy7hxcdgcbzf" R="1"/><C I="400356" N="Heliod, God of the Sun" U="0fjhx657zz1oqey" R="1"/><C I="400355" N="Heliod, Sun-Crowned" U="pgs06cezygzkfbd" R="1"/><C I="163293" N="Sol Ring" U="kpkparqndvbkaiy" R="1"/><C I="163295" N="Sol Ring" U="k75bpe8qpghfsy2" R="1"/><C I="163645" N="Sol Ring" U="xzamtsstgolyaiy" R="1"/><C I="177517" N="Sol Ring" U="1xhvxlrs5ko2uuh" R="1"/><C I="177518" N="Sol Ring" U="waekv94pupdvnzr" R="1"/><C I="177520" N="Sol Ring" U="nhiz9i97qhgr4nb" R="1"/><C I="177521" N="The Immortal Sun" U="xvtsb0m1todqn8k" R="1"/><C I="177522" N="The Immortal Sun" U="7k4x4cxbrzm4gkw" R="1"/><C I="163643" N="Sol Ring" U="3odpme43zia1btm" R="1"/><C I="163746" N="Wrath of God" U="tz5iprhvk3fhjub" R="1"/><C I="163748" N="Wrath of God" U="pcmz5vjizgi75wt" R="1"/><C I="164292" N="Wrath of God" U="uvxbmxqxw2aifru" R="1"/><C I="164293" N="Wrath of God" U="elbphzd4hhua4t9" R="1"/><C I="164294" N="Wrath of God" U="bfobki3mdtfqg7s" R="1"/><C I="164295" N="Wrath of God" U="kvxickw3q3dlwqx" R="1"/><C I="177488" N="Radiant's Judgment" U="noml9at1mutlhpv" R="1"/><C I="177487" N="Radiant's Judgment" U="i4pddf89iv4cszn" R="1"/><C I="163770" N="Crucible of Worlds" U="urzqgpud7urcxic" R="1"/><C I="163774" N="Crucible of Worlds" U="jkgaqtxs9vmag5c" R="1"/><C I="164290" N="Crucible of Worlds" U="4mn9f3pmttejvbi" R="1"/><C I="164291" N="Crucible of Worlds" U="wl1qfzwidpcsr3t" R="1"/><C I="177491" N="Nether Void" U="llhgg5kzgoipyka" R="1"/><C I="177492" N="Nether Void" U="kll9r2g6bb7hc4k" R="1"/><C I="177494" N="Underworld Dreams" U="ljgedgidusvt9kb" R="1"/><C I="177493" N="Underworld Dreams" U="zkmymyb8rjd7bpg" R="1"/><C I="404519" N="Mockingbird" U="lnlhoing8m5bohj" R="2"/><C I="404518" N="Mockingbird" U="ivwow0iihscjq3e" R="2"/><C I="396679" N="Pearl Medallion" U="uvn6znozi7gbhpr" R="2"/><C I="396677" N="Sapphire Medallion" U="cbyzlrtt0a25phf" R="2"/><C I="396675" N="Ruby Medallion" U="uk9w0am9g8axs5o" R="2"/><C I="396673" N="Emerald Medallion" U="sv7wvcxr0nyfk3m" R="2"/><C I="396671" N="Jet Medallion" U="3ifoi6n2bljvdro" R="2"/><C I="180959" N="Sky Diamond" U="zxouamldxglp0yx" R="2"/><C I="180961" N="Sky Diamond" U="lf7v1sczsyrb1qf" R="2"/><C I="180965" N="Thought Vessel" U="jmxc7hul50tq5hz" R="2"/><C I="180951" N="Arcane Signet" U="surbvyrqnunmqgn" R="2"/><C I="180968" N="Sol Ring" U="fwhxrf2ndbtxvb6" R="2"/><C I="180955" N="Marble Diamond" U="3hzyoyuutqsueg5" R="2"/><C I="180957" N="Marble Diamond" U="s6nxn1cfpi0imi4" R="2"/><C I="180953" N="Arcane Signet" U="jjf398u6abfpqjn" R="2"/><C I="180963" N="Thought Vessel" U="pna57epvqakz5xh" R="2"/><C I="180949" N="Sol Ring" U="boaqrkq0xe5sohu" R="2"/><C I="182623" N="Sword of Light and Shadow" U="kgct5aopucly366" R="3"/><C I="150573" N="Sword of Body and Mind" U="g4rurafw01bxlnm" R="3"/><C I="167716" N="Sword of Light and Shadow" U="cqu9sbycbxoiwzk" R="3"/><C I="167714" N="Sword of Light and Shadow" U="oqgvcq06vsoqbow" R="3"/><C I="182629" N="Sword of Feast and Famine" U="cdv1rjlryox53bx" R="3"/><C I="182627" N="Sword of Body and Mind" U="739gpmnqsm6t81s" R="3"/><C I="182617" N="Sword of Feast and Famine" U="skjysescio4oizw" R="3"/><C I="150575" N="Sword of Fire and Ice" U="zptxtarom2bcxcw" R="3"/><C I="150578" N="Sword of Truth and Justice" U="1kqxqvxvjszfhdf" R="3"/><C I="167573" N="Sword of Body and Mind" U="3tvqeuhd6z7hxll" R="3"/><C I="150571" N="Sword of Light and Shadow" U="phgpgdkfe3hmhos" R="3"/><C I="150579" N="Sword of War and Peace" U="kzschmvrcdqpvf7" R="3"/><C I="182631" N="Sword of Fire and Ice" U="jdn8e0ss8iksljm" R="3"/><C I="182635" N="Sword of War and Peace" U="o7pnv2opgg6hb2a" R="3"/><C I="167583" N="Sword of Body and Mind" U="jhu2esadwshbklk" R="3"/><C I="150577" N="Sword of Sinew and Steel" U="kfvb4ygut6k38j2" R="3"/><C I="150463" N="Sword of Fire and Ice" U="xoehejsxy8qxxve" R="3"/><C I="167424" N="Sword of Feast and Famine" U="exbphrrvl8m7m3k" R="3"/><C I="150457" N="Sword of Truth and Justice" U="gthsjmpwezq2d1v" R="3"/><C I="192806" N="Swords to Plowshares" U="3w3eivvkxq2c5h6" R="3"/><C I="182625" N="Sword of War and Peace" U="oha2lwu8tvnqmhh" R="3"/><C I="167428" N="Sword of Feast and Famine" U="kfq0pl3do0ebuiq" R="3"/><C I="150425" N="Sword of Sinew and Steel" U="3qfog3wtqlsrupx" R="3"/><C I="150399" N="Sword of Feast and Famine" U="xu5ujgz1kqumeig" R="3"/><C I="167426" N="Sword of Feast and Famine" U="uar5nxza9mrmicz" R="3"/><C I="150574" N="Sword of Feast and Famine" U="cckbcz4kqbsibk7" R="3"/><C I="182621" N="Sword of Body and Mind" U="vwdyyqjxq82i6qt" R="3"/><C I="150576" N="Sword of Light and Shadow" U="7xr07kt9ioyzmh6" R="3"/><C I="182633" N="Sword of Light and Shadow" U="5lwxr8qfgtiz0il" R="3"/><C I="167718" N="Sword of Light and Shadow" U="qaxoye6grmkqk8f" R="3"/><C I="167575" N="Sword of Body and Mind" U="26kbeuihsvqi6nv" R="3"/><C I="192801" N="Swords to Plowshares" U="ldbaux8qo8n33pd" R="3"/><C I="182619" N="Sword of Fire and Ice" U="pjylyrfktlnf3nn" R="3"/><C I="150572" N="Sword of War and Peace" U="ayvoas8xr3mh3kf" R="3"/><C I="150570" N="Sword of Body and Mind" U="fjvaf9lkbdzlt9i" R="3"/><C I="369691" N="Sword of Forge and Frontier" U="gafccjbflvnqkdf" R="3"/><C I="369693" N="Sword of Forge and Frontier" U="3f2mkpmmulwtfn4" R="3"/><C I="369706" N="Sword of Hearth and Home" U="vh4gmmuh88r5204" R="3"/><C I="369708" N="Sword of Hearth and Home" U="7ulqsvpoo4bmgq9" R="3"/><C I="373284" N="Sword of Once and Future" U="izcd36idnktviff" R="3"/><C I="373288" N="Sword of Once and Future" U="nwa3hp3hizqmmyu" R="3"/><C I="373301" N="Sword of Dungeons &amp; Dragons" U="movcxxtlnv65rw3" R="3"/><C I="373303" N="Sword of Dungeons &amp; Dragons" U="wcxlw5ovsuoz2lc" R="3"/><C I="393949" N="Sword of Wealth and Power" U="zoevos61jp8f8hz" R="3"/><C I="374070" N="Sol Ring" U="gbjogtyplt2owi3" R="4"/><C I="374068" N="Commander's Sphere" U="z9pmifxjppxluxf" R="4"/><C I="374072" N="Helm of the Host" U="zsopq7hfypfmdw0" R="4"/><C I="374074" N="Crucible of Worlds" U="uldfmxabaxua0lt" R="4"/><C I="374076" N="Thought Vessel" U="gsdiiacb4ymxayx" R="4"/><C I="124061" N="Plains" U="9uicxhyb6brhsam" R="5"/><C I="124196" N="Plains" U="yfqvsca8daq6rp8" R="5"/><C I="151036" N="Plains" U="axqxrzflythf66e" R="5"/><C I="151037" N="Plains" U="l8jf4jokwmjec0i" R="5"/><C I="151038" N="Plains" U="zdmohw7awtkcoqe" R="5"/><C I="124066" N="Swamp" U="lpkqqyfdv5tsowm" R="5"/><C I="124199" N="Swamp" U="zmb9jqabsmjszoo" R="5"/><C I="87583" N="Forest" U="nlwkm9ctophv8ue" R="5"/><C I="124065" N="Forest" U="z4h9vcc6t1lgqtp" R="5"/><C I="124197" N="Forest" U="wzvejobqgrw7qa9" R="5"/><C I="151039" N="Forest" U="ih6amqyfwn0rof3" R="5"/><C I="151040" N="Forest" U="ymaciykymuvbxpf" R="5"/><C I="151044" N="Forest" U="lutrsi61nfj1ft5" R="5"/><C I="161107" N="Misty Rainforest" U="qajeipzrnty6n5o" R="5"/><C I="161108" N="Misty Rainforest" U="g5icqbxp8vgfp3y" R="5"/><C I="124068" N="Mountain" U="z5syxlnqc71ukxj" R="5"/><C I="124200" N="Mountain" U="i8648celmdyfhch" R="5"/><C I="151190" N="Mountain" U="ioe4ns1vvb0xqll" R="5"/><C I="151191" N="Mountain" U="pvs0h9i0wjmwqaq" R="5"/><C I="151192" N="Mountain" U="f3dlvhopxkv0a5m" R="5"/><C I="124067" N="Island" U="k4a9ey6mfw5iisq" R="5"/><C I="124198" N="Island" U="zirbdnkhzu9pz6h" R="5"/><C I="151117" N="Island" U="pbvsn6e4elm6kon" R="5"/><C I="151118" N="Island" U="vszcw8x7m1xetv1" R="5"/><C I="151119" N="Island" U="o9re4nmqbwba6mn" R="5"/><C I="124196" N="Plains" U="yfqvsca8daq6rp8" R="5"/><C I="124197" N="Forest" U="wzvejobqgrw7qa9" R="5"/><C I="124198" N="Island" U="zirbdnkhzu9pz6h" R="5"/><C I="124199" N="Swamp" U="zmb9jqabsmjszoo" R="5"/><C I="124200" N="Mountain" U="i8648celmdyfhch" R="5"/><C I="383260" N="Divine Intervention" U="txcf7olwyopjki5" R="6"/><C I="383254" N="Crucible of Worlds" U="neymihw5hpbdonq" R="6"/><C I="87607" N="Crucible of Worlds" U="gzcimuq9amewbg8" R="6"/><C I="383256" N="Karona, False God" U="czqnrded8xtrscl" R="6"/><C I="383252" N="Karona, False God" U="1e4pqhlytcscmw0" R="6"/><C I="87609" N="Welding Jar" U="wgpulntowou6d8r" R="6"/><C I="87606" N="Liquimetal Coating" U="wc32q4z2ietunk2" R="6"/><C I="87604" N="Ancient Silverback" U="b6penloahgg5vxq" R="6"/><C I="119700" N="Ancient Silverback" U="hrnjyjwdp4rmtkp" R="6"/><C I="119704" N="Ancient Silverback" U="4sesar7eqly2ugq" R="6"/><C I="87605" N="Thragtusk" U="8matctyi7ste9bq" R="6"/><C I="87608" N="Phyrexian Metamorph" U="k37p43tfggxfteg" R="6"/><C I="119702" N="Ezuri, Renegade Leader" U="kycstwpyr8mummp" R="6"/><C I="119706" N="Ezuri, Renegade Leader" U="ap6zxqwienk3b8b" R="6"/><C I="152550" N="Mox Opal" U="ulzztuzdukrn3w6" R="7"/><C I="86705" N="Mox Opal" U="zqwuckh43gh77rw" R="7"/><C I="155416" N="Mox Diamond" U="2fkq4wmsmevcstk" R="7"/><C I="127899" N="Mox Diamond" U="684rttpwvmocfit" R="7"/><C I="127898" N="Mox Diamond" U="dfgcwz0oqowypi9" R="7"/><C I="156641" N="Chrome Mox" U="95bojruiob63ebt" R="7"/><C I="156640" N="Chrome Mox" U="j1obgshsfiqodti" R="7"/><C I="156642" N="Chrome Mox" U="5qoycueanekppiz" R="7"/><C I="155682" N="Mox Amber" U="cabjygyb2icpt0v" R="7"/><C I="155552" N="Mox Amber" U="pm7orvxwlptjm6l" R="7"/><C I="158595" N="Mox Tantalite" U="8ze96zmtlnfbkf0" R="7"/><C I="158594" N="Mox Tantalite" U="euzvypraxe9qqja" R="7"/><C I="155117" N="Emerald Medallion" U="locpvjybewxpefy" R="7"/><C I="155118" N="Emerald Medallion" U="ov1qsegglizi3yk" R="7"/><C I="155116" N="Emerald Medallion" U="cpob0sn5wqu5jxj" R="7"/><C I="155114" N="Emerald Medallion" U="lf1yaujnoddopde" R="7"/><C I="154817" N="Pearl Medallion" U="yidn99277fffrev" R="7"/><C I="154818" N="Pearl Medallion" U="k9k5bwcplfsg2ix" R="7"/><C I="154808" N="Pearl Medallion" U="25e98jtfbtjnfyj" R="7"/><C I="154806" N="Pearl Medallion" U="k1dklc0ncnck87l" R="7"/><C I="152546" N="Jet Medallion" U="0iihzbhqewhmcs8" R="7"/><C I="152547" N="Jet Medallion" U="jjrrobcbyf3vwqx" R="7"/><C I="152536" N="Jet Medallion" U="8joqovdicbsbztj" R="7"/><C I="152535" N="Jet Medallion" U="sectgp7zhrot2uw" R="7"/><C I="154652" N="Ruby Medallion" U="2zzbxgkszvekptv" R="7"/><C I="154653" N="Ruby Medallion" U="xnpbqdhcjysdmv1" R="7"/><C I="154651" N="Ruby Medallion" U="5lrdv8mwl38ljqs" R="7"/><C I="154650" N="Ruby Medallion" U="anoljgufrsbbp4p" R="7"/><C I="154498" N="Sapphire Medallion" U="v6xefxbviam1zix" R="7"/><C I="154499" N="Sapphire Medallion" U="qlhox6tuxtoqthi" R="7"/><C I="154522" N="Sapphire Medallion" U="rhvskpdk9aquaru" R="7"/><C I="154521" N="Sapphire Medallion" U="mfhntxmijunmmg6" R="7"/><C I="385527" N="Subtlety" U="q8unnctdm1go9iy" R="8"/><C I="385525" N="Subtlety" U="ezwwdarpapucs2j" R="8"/><C I="385521" N="Endurance" U="ay4h4uyyhlx8qeo" R="8"/><C I="385519" N="Endurance" U="tuc1lyjzcnakyc3" R="8"/><C I="385508" N="Grief" U="oe9oczhlduuyado" R="8"/><C I="385506" N="Grief" U="bzmfawej5ge7nep" R="8"/><C I="385336" N="Fury" U="wbvft7ggrbv3exo" R="8"/><C I="385334" N="Fury" U="ottdyxj7xikokly" R="8"/><C I="385271" N="Solitude" U="h6ucs5o2x5kco3n" R="8"/><C I="385269" N="Solitude" U="lvnzvhsd82cqnqa" R="8"/><C I="1" N="The lighthouse at the end of Reality" U="https://www.inkedgaming.com/products/the-lighthouse-at-the-end-of-reality-playmat?variant=40719087894728" R="9"/><C I="2" N="Observer" U="https://www.inkedgaming.com/products/observer-playmat?variant=40719080063176" R="9"/><C I="3" N="Kosmos" U="https://www.inkedgaming.com/products/damaride-neurommancer-playmat?variant=41206404120776" R="9"/><C I="4" N="Medusa" U="https://www.inkedgaming.com/products/medusa-trophy-playmat?variant=40719071936712" R="9"/><C I="5" N="Him that slept beneath" U="https://www.inkedgaming.com/products/him-that-slept-beneath-playmat?variant=41293708263624" R="9"/><C I="6" N="Foreteller's Delight" U="https://www.inkedgaming.com/products/foreteller-s-delight-playmat?variant=41206217474248" R="9"/><C I="7" N="Multiplicatio" U="https://www.inkedgaming.com/products/multipactio-playmat?variant=41494771073224" R="9"/><C I="8" N="GraveyardGang" U="https://www.mythicgaming.com/product/playmat-graveyardgang" R="9"/></Cards>`;
const URLRoot="https://www.altersleeves.com/product/";
const main=document.getElementById('main');
const sideBar=document.getElementById("mySidebar");
var table=document.getElementById('myTable');
var totCards=document.getElementById('totalCards');
var myCols=document.getElementById('myColumns');
const header=document.getElementById('myHeader');
var bRequest=false;
var bMobile=false;
var imgW=192;
var imgH=266;
isMobile();
function myParseCards(){
 var parser=new DOMParser();
 xmlDoc=parser.parseFromString(xmlCards,"text/xml");
 catalog=xmlDoc.getElementsByTagName('Cards')[0];
 totXmlCards=catalog.childElementCount;
 bxmlParsed=true;
}

function mySearch(MaxColumns){
 if(MaxColumns===null||MaxColumns==undefined||MaxColumns==="undefined"){
  if(!bMobile)
   MaxColumns=6;
  else
   MaxColumns=2;
  myCols.value=MaxColumns;
 }
 if(MaxColumns<=0)
  return;
 var setNo="1";
 if(MaxColumns!="undefined"){
  var myList=document.getElementById("mySets");
  setNo=(myList.selectedIndex+1).toString();  
 }
 if(bRequest==false){
  table=document.getElementById('myTable');
  totCards=document.getElementById('totalCards');
  myCols=document.getElementById('myColumns');
  var params=new URL(document.location).searchParams;
  var setID=params.get("set");
  if(setID!=""&&setID!=null){
   setID=Number(setID);
   if(setID>=1&&setID<=9){
    setNo=setID;
    myList.value=setNo;
    bRequest=true;
   }
  }
 }
 if(bxmlParsed==false){myParseCards();}
 table.innerHTML="";
 var CardCnt=0;
 var nCols=6;
 if(MaxColumns>0)
  nCols=MaxColumns;
 else
  nCols=myCols.value;

 var row,cell;
 for(var i=0;i<totXmlCards;i++){
  var book=catalog.childNodes[i];
  var CardID=book.attributes[0].nodeValue;
  var CardNAME=book.attributes[1].nodeValue;
  var CardSet=book.attributes[3].nodeValue;
  if(CardSet===setNo){
   var CardURL=(CardID>100?URLRoot:"")+book.attributes[2].nodeValue;
   CardCnt++;
   if((CardCnt % nCols==1) || nCols==1)
    row=table.insertRow(-1);
   else
    row=table.rows[table.rows.length-1];

   cell=row.insertCell(-1);
   cell.innerHTML="<a href='"+CardURL+"'><img src='"+CardID+(CardID>100?".jpg":".webp")+"' alt='"+CardID+"' style='width:"+imgW+"px;height:"+imgH+"px;border-radius:10px;' title=\""+CardID+" "+CardNAME+"\"><font size='1'><br>"+CardNAME+"</font></a>";
  }
 }
 totCards.innerHTML="<font size='1'>Found "+CardCnt+" cards in this Set";
 window.scrollTo(0,0);
}

function myHelp(){
 var sHelp="Select a set.\nDefault and max value for 'columns per row' is 6, changing that value redisplays the set.\nFor set 'Lands' try with 5 as 'colums per row' to see that different cards create panoramic views (e.g. the last 5 cards).";
 try{
  Swal.fire({
   title: "<span><a href='https://www.altersleeves.com/browse/?browse_type=by&artist_id=16'><img src='dada_logo.jpg' alt='' width='80' height='104' title='Alters by DamarideNeurommancer' style='border-radius:6px;align:center;'/></a></span>",
   html: "<span style='color:Black'><b>"+sHelp.replaceAll('\n','<br>')+"</b></span>",
   confirmButtonColor: "Black",
   padding: 1,
   position: 'top-left',
  })
 }
 catch{
  alert(sHelp);
 }
}

function columnsValueChange(){
 mySearch(myCols.value);
}

window.onscroll=function(){myFunction()};
var sticky=header.offsetTop;
function myFunction(){
 if(window.pageYOffset>sticky){
  header.classList.add('sticky');
 }else{
   header.classList.remove('sticky');
 }
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
function isMobile(){
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