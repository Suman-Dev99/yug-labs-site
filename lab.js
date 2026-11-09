/* YugLab — Lab Console v2 (admin)
   Create (clickable types) -> Details form -> Plan -> Build (real output) -> Preview -> Quick Edit / AI Assistant (Nemotron 3 Ultra) -> Download */
(function(){
"use strict";
var LS_KEY="yuglab.lab.v2", LS_OLD="yuglab.lab.v1", KEY_LS="yuglab.nemotron.key";
var COSTS={"Website":40,"3D Website":60,"Web App":80,"AI Chatbot":70,"AI Agent":90,"Content":20};
var TYPES=[
 {id:"Website",icon:"🌐",line:"Business sites, portfolios, landing pages",cost:40},
 {id:"3D Website",icon:"🧊",line:"Depth, motion, wow-factor pages",cost:60},
 {id:"Web App",icon:"📱",line:"Booking, dashboards, tools that work",cost:80},
 {id:"AI Chatbot",icon:"💬",line:"Answers from your own business data",cost:70},
 {id:"AI Agent",icon:"🤖",line:"An agent that runs tasks for you",cost:90},
 {id:"Content",icon:"✍️",line:"Posts, descriptions, captions, ads",cost:20}
];
var COLORS={amber:"#F59E0B",blue:"#3B82F6",green:"#22C55E",red:"#EF4444",purple:"#A855F7",pink:"#EC4899",teal:"#14B8A6",orange:"#F97316"};
var CATS={cafe:"Cafe & Food",gym:"Gym & Fitness",fashion:"Fashion & Clothing",salon:"Salon & Beauty",photo:"Photography",agency:"Agency & Tech",generic:"Other Business"};
var THEMES={
  cafe:{tag:"Fresh brews, honest food, slow mornings.",feats:[["☕","Craft Coffee","Small-batch beans, brewed with care."],["🥐","Fresh Bakes","Out of the oven, every single morning."],["🪑","Cosy Corner","Your table is waiting. Stay a while."]],about:"A neighbourhood cafe built on good beans and better conversations."},
  photo:{tag:"Moments, kept forever.",feats:[["📷","Weddings","Your day, told as a story in frames."],["🎞️","Portraits","Honest portraits that look like you."],["🎬","Films","Short films with a photographer's eye."]],about:"A photography studio that believes the best pictures are the true ones."},
  gym:{tag:"Stronger every single day.",feats:[["🏋️","Strength","Coached programs that actually progress."],["🔥","Conditioning","Sweat hard, recover smart."],["🥗","Nutrition","Fuel plans matched to your training."]],about:"A gym for people who show up. No mirrors-for-selfies, just work."},
  fashion:{tag:"Wear the story you want to tell.",feats:[["🧵","Crafted Fabric","Premium cloth, honest stitching."],["✂️","Tailored Fit","Cut to move with you, not against you."],["🌿","Slow Fashion","Made to last seasons, not weeks."]],about:"A clothing label built on craft — designed here, worn everywhere."},
  salon:{tag:"Look good. Feel better.",feats:[["💇","Hair Studio","Cuts and colour by senior stylists."],["💅","Nails & Care","Detail work, done patiently."],["🌸","Skin Rituals","Facials that reset more than skin."]],about:"A salon where the chair time is the best part of your week."},
  agency:{tag:"We build digital products that grow businesses.",feats:[["💡","Strategy","Positioning before pixels."],["🖥️","Design & Build","Websites and products, end to end."],["📈","Growth","Launch is the starting line."]],about:"A digital agency for ambitious brands — small team, senior hands."},
  generic:{tag:"Quality you can feel, service you can trust.",feats:[["⭐","Quality First","Every detail checked, twice."],["⚡","Fast & Reliable","On time, every time."],["🤝","People Who Care","Real humans, real answers."]],about:"A business built on one simple promise — do it properly, or don't do it."}
};

/* ---------- state ---------- */
function load(){try{return JSON.parse(localStorage.getItem(LS_KEY));}catch(e){return null;}}
var state=load();
if(!state){
  state={credits:1000,projects:[],activeId:null};
  try{var old=JSON.parse(localStorage.getItem(LS_OLD));if(old&&old.projects){state.credits=old.credits||1000;old.projects.forEach(function(p){state.projects.push({id:p.id,name:p.name,type:p.type||"Website",status:p.status||"Built",details:null,plan:p.plan||null,html:p.html||"",site:p.site||null});});state.activeId=old.activeId;}}catch(e){}
}
var draft=null; /* creation draft: {type, details:{}} */
function save(){try{localStorage.setItem(LS_KEY,JSON.stringify(state));}catch(e){}}
function $(id){return document.getElementById(id);}
function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}
function active(){for(var i=0;i<state.projects.length;i++)if(state.projects[i].id===state.activeId)return state.projects[i];return null;}
function toast(msg){var t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(function(){t.classList.remove("show");},2200);}
function nemotronKey(){try{return localStorage.getItem(KEY_LS)||"";}catch(e){return "";}}
function setStep(n){document.querySelectorAll("#stepsBar .sb").forEach(function(el){el.classList.toggle("on",+el.getAttribute("data-sb")<=n);});}

/* ---------- create: type cards ---------- */
function renderTypes(){
  $("typeGrid").innerHTML=TYPES.map(function(t){
    return '<button class="type-card" data-type="'+t.id+'"><span class="tcost">'+t.cost+' credits</span><div class="tic">'+t.icon+'</div><h3>'+t.id+'</h3><p>'+t.line+'</p></button>';
  }).join("");
  document.querySelectorAll(".type-card").forEach(function(c){c.onclick=function(){startDraft(c.getAttribute("data-type"));};});
}
function defaultDetails(type){
  if(type==="Website"||type==="3D Website")return {name:"",category:"generic",color:"amber",mode:"dark",sections:["Pricing"],instructions:""};
  if(type==="Web App")return {name:"",purpose:"Booking",features:["Login Screen","Dashboard"],color:"amber",mode:"dark",instructions:""};
  if(type==="AI Chatbot")return {name:"",business:"",tone:"Friendly",data:"",color:"amber",instructions:""};
  if(type==="AI Agent")return {name:"",job:"Research",tools:["Web Search","Reports"],instructions:""};
  return {name:"",kind:"Blog Post",topic:"",tone:"Premium",length:"Long",instructions:""};
}
function startDraft(type){
  draft={type:type,details:defaultDetails(type),projectId:null};
  showView("setup"); renderForm();
}
function showView(v){
  $("createView").style.display=v==="create"?"block":"none";
  $("setupView").style.display=v==="setup"?"block":"none";
  $("workspace").style.display=v==="project"?"block":"none";
}

/* ---------- setup form ---------- */
function field(label,inner){return '<div class="f-field"><label>'+label+'</label>'+inner+'</div>';}
function swatchHTML(sel){return '<div class="swatches">'+Object.keys(COLORS).map(function(k){return '<button class="sw'+(k===sel?" on":"")+'" data-color="'+k+'" style="background:'+COLORS[k]+'" title="'+k+'"></button>';}).join("")+'</div>';}
function checksHTML(options,selected){return '<div class="checks">'+options.map(function(o){return '<button class="chk'+(selected.indexOf(o)>-1?" on":"")+'" data-chk="'+o+'">'+o+'</button>';}).join("")+'</div>';}
function toggleHTML(a,b,sel){return '<div class="toggle-row"><button class="tgl'+(sel===a?" on":"")+'" data-tgl="'+a+'">'+a+'</button><button class="tgl'+(sel===b?" on":"")+'" data-tgl="'+b+'">'+b+'</button></div>';}
function renderForm(){
  var d=draft.details, t=draft.type, H="";
  $("setupTitle").textContent="Create — "+t;
  if(t==="Website"||t==="3D Website"){
    H+=field("Business / Site Name",'<input type="text" id="f_name" placeholder="e.g. Sharma Cafe" value="'+esc(d.name)+'">');
    H+=field("Category",'<select id="f_category">'+Object.keys(CATS).map(function(k){return '<option value="'+k+'"'+(d.category===k?" selected":"")+'>'+CATS[k]+'</option>';}).join("")+'</select>');
    H+=field("Accent Colour",swatchHTML(d.color));
    H+=field("Theme",toggleHTML("dark","light",d.mode));
    H+=field("Sections",checksHTML(["Pricing","Testimonials","Gallery"],d.sections));
  }else if(t==="Web App"){
    H+=field("App Name",'<input type="text" id="f_name" placeholder="e.g. FitBook" value="'+esc(d.name)+'">');
    H+=field("Purpose",'<select id="f_purpose">'+["Booking","Dashboard","Online Store","Task Tracker","Other"].map(function(o){return '<option'+(d.purpose===o?" selected":"")+'>'+o+'</option>';}).join("")+'</select>');
    H+=field("Features",checksHTML(["Login Screen","Dashboard","Search","Forms","Notifications"],d.features));
    H+=field("Accent Colour",swatchHTML(d.color));
    H+=field("Theme",toggleHTML("dark","light",d.mode));
  }else if(t==="AI Chatbot"){
    H+=field("Bot Name",'<input type="text" id="f_name" placeholder="e.g. Cafe Assistant" value="'+esc(d.name)+'">');
    H+=field("Business",'<input type="text" id="f_business" placeholder="e.g. Sharma Cafe, Connaught Place" value="'+esc(d.business)+'">');
    H+=field("Tone",'<select id="f_tone">'+["Friendly","Professional","Hinglish Mix"].map(function(o){return '<option'+(d.tone===o?" selected":"")+'>'+o+'</option>';}).join("")+'</select>');
    H+=field("Bot Knowledge — your business info / FAQs (one fact per line)",'<textarea id="f_data" placeholder="Open 9 AM to 11 PM, all days&#10;Home delivery within 5 km&#10;Cold coffee price is 149 rupees">'+esc(d.data)+'</textarea>');
    H+=field("Accent Colour",swatchHTML(d.color));
  }else if(t==="AI Agent"){
    H+=field("Agent Name",'<input type="text" id="f_name" placeholder="e.g. Research Raj" value="'+esc(d.name)+'">');
    H+=field("Job",'<select id="f_job">'+["Research","Customer Support","Content Writer","Sales Assistant"].map(function(o){return '<option'+(d.job===o?" selected":"")+'>'+o+'</option>';}).join("")+'</select>');
    H+=field("Tools",checksHTML(["Web Search","Documents","Email Drafts","Reports"],d.tools));
  }else{
    H+=field("Title / Name",'<input type="text" id="f_name" placeholder="e.g. Diwali Campaign" value="'+esc(d.name)+'">');
    H+=field("Content Type",'<select id="f_kind">'+["Blog Post","Product Description","Social Captions","Ad Copy"].map(function(o){return '<option'+(d.kind===o?" selected":"")+'>'+o+'</option>';}).join("")+'</select>');
    H+=field("Topic",'<input type="text" id="f_topic" placeholder="e.g. Handmade cold coffee, made fresh daily" value="'+esc(d.topic)+'">');
    H+=field("Tone",'<select id="f_tone">'+["Premium","Friendly","Bold"].map(function(o){return '<option'+(d.tone===o?" selected":"")+'>'+o+'</option>';}).join("")+'</select>');
    H+=field("Length",toggleHTML("Long","Short",d.length));
  }
  H+=field("Instructions (anything specific — offers, style, must-include points)",'<textarea id="f_instructions" placeholder="e.g. Mention the 20% weekday offer. Keep it premium, no slang.">'+esc(d.instructions)+'</textarea>');
  $("formFields").innerHTML=H;
  /* wire dynamic controls */
  document.querySelectorAll(".sw").forEach(function(b){b.onclick=function(){draft.details.color=b.getAttribute("data-color");renderFormKeep();};});
  document.querySelectorAll(".chk").forEach(function(b){b.onclick=function(){var key=(draft.type==="Website"||draft.type==="3D Website")?"sections":(draft.type==="Web App"?"features":"tools");var arr=draft.details[key];var v=b.getAttribute("data-chk");var i=arr.indexOf(v);if(i>-1)arr.splice(i,1);else arr.push(v);b.classList.toggle("on");};});
  document.querySelectorAll(".tgl").forEach(function(b){b.onclick=function(){var v=b.getAttribute("data-tgl");if(draft.type==="Content")draft.details.length=v;else draft.details.mode=v;renderFormKeep();};});
  function renderFormKeep(){collectForm();renderForm();}
  window.__collectForm=collectForm;
}
function collectForm(){
  if(!draft)return; var d=draft.details;
  function v(id){var el=$(id);return el?el.value.trim():"";}
  if($("f_name"))d.name=v("f_name");
  if($("f_category"))d.category=$("f_category").value;
  if($("f_purpose"))d.purpose=$("f_purpose").value;
  if($("f_business"))d.business=v("f_business");
  if($("f_tone"))d.tone=$("f_tone").value;
  if($("f_data"))d.data=$("f_data").value;
  if($("f_job"))d.job=$("f_job").value;
  if($("f_kind"))d.kind=$("f_kind").value;
  if($("f_topic"))d.topic=v("f_topic");
  if($("f_instructions"))d.instructions=$("f_instructions").value;
}

/* ---------- plan ---------- */
function planFor(p){
  var d=p.details||{}, base;
  if(p.type==="AI Chatbot")base=["Bot persona: "+(d.tone||"Friendly")+" tone","Knowledge loaded from your data ("+((d.data||"").split("\n").filter(Boolean).length)+" facts)","Chat widget + quick questions","Test conversations + fixes","Final chatbot package"];
  else if(p.type==="AI Agent")base=["Agent role: "+(d.job||"Research"),"Tools attached: "+((d.tools||[]).join(", ")||"core only"),"Task workflow + step log","Guardrails: agent shows work before finishing","Final agent package"];
  else if(p.type==="Web App")base=["App shell: "+(d.purpose||"App")+" layout","Features: "+((d.features||[]).join(", ")||"core"),"Screens wired + working buttons","Mobile-first QA checks","Final app package"];
  else if(p.type==="Content")base=["Angle: "+(d.kind||"Content")+" on "+(d.topic||"your topic"),"Tone pass: "+(d.tone||"Premium"),"Full draft ("+(d.length||"Long")+")","Polish + headline options","Final content package"];
  else base=["Structure: Home, Features, About, Contact","Design: "+(d.color||"amber")+" accent, "+(d.mode||"dark")+" theme","Sections: "+(((d.sections||[]).join(", "))||"core only"),"Mobile + speed QA checks","Final website package"];
  if(d.instructions)base.push("Your instructions applied: "+(d.instructions.length>60?d.instructions.slice(0,60)+"…":d.instructions));
  return base;
}
function detailChips(p){
  var d=p.details||{}, chips=[];
  function chip(k,v){if(v)chips.push("<span>"+k+": <b>"+esc(v)+"</b></span>");}
  if(p.type==="Website"||p.type==="3D Website"){chip("Category",CATS[d.category]||"");chip("Colour",d.color);chip("Theme",d.mode);chip("Sections",(d.sections||[]).join(", "));}
  else if(p.type==="Web App"){chip("Purpose",d.purpose);chip("Features",(d.features||[]).join(", "));chip("Colour",d.color);chip("Theme",d.mode);}
  else if(p.type==="AI Chatbot"){chip("Business",d.business);chip("Tone",d.tone);chip("Facts",(d.data||"").split("\n").filter(Boolean).length+" lines");}
  else if(p.type==="AI Agent"){chip("Job",d.job);chip("Tools",(d.tools||[]).join(", "));}
  else{chip("Type",d.kind);chip("Topic",d.topic);chip("Tone",d.tone);chip("Length",d.length);}
  if(d.instructions)chip("Instructions",d.instructions.length>40?d.instructions.slice(0,40)+"…":d.instructions);
  return chips.join("");
}

/* ---------- generators ---------- */
function siteFromDetails(p){
  var d=p.details;
  return {name:d.name||p.name,tagline:"Welcome to "+(d.name||p.name),theme:d.category||"generic",colorName:d.color||"amber",dark:d.mode!=="light",fx3d:p.type==="3D Website",sections:{pricing:(d.sections||[]).indexOf("Pricing")>-1,testimonials:(d.sections||[]).indexOf("Testimonials")>-1,gallery:(d.sections||[]).indexOf("Gallery")>-1}};
}
function pageCSS(c,dark,extra){
  var bg=dark?"#0C0E13":"#FAFAF8",panel=dark?"#141821":"#FFFFFF",tx=dark?"#EDF0F5":"#16181D",mut=dark?"#9AA6B5":"#5B6472",line=dark?"#232A38":"#E6E3DC";
  return "*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:"+bg+";color:"+tx+";line-height:1.6}"
  +"header{position:sticky;top:0;background:"+bg+";border-bottom:1px solid "+line+";padding:16px 24px;display:flex;justify-content:space-between;align-items:center;z-index:5}"
  +".logo{font-weight:800;font-size:20px}.logo span{color:"+c+"}nav a{color:"+mut+";text-decoration:none;margin-left:20px;font-size:14.5px}"
  +".hero{text-align:center;padding:88px 24px 64px;background:radial-gradient(560px 280px at 50% -40px,"+c+"26,transparent 70%)}"
  +".hero h1{font-size:clamp(32px,5.5vw,52px);letter-spacing:-.02em;line-height:1.12}.hero h1 em{font-style:normal;color:"+c+"}"
  +".hero p{color:"+mut+";font-size:17.5px;max-width:540px;margin:16px auto 28px}"
  +".btn{display:inline-block;background:"+c+";color:#14100a;font-weight:700;padding:13px 26px;border-radius:999px;text-decoration:none;border:0;cursor:pointer;font-size:15px}.btn.g{background:transparent;color:"+tx+";border:1px solid "+line+";margin-left:10px}"
  +"section{max-width:1040px;margin:0 auto;padding:56px 24px}section h2{text-align:center;font-size:30px;margin-bottom:30px}"
  +".grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}@media(max-width:760px){.grid{grid-template-columns:1fr}}"
  +".card{background:"+panel+";border:1px solid "+line+";border-radius:16px;padding:24px}.card .ic{font-size:26px;margin-bottom:10px}.card h3{margin-bottom:5px}.card p{color:"+mut+";font-size:14.5px}"
  +".card.pop{border-color:"+c+"}.pr{font-size:30px;font-weight:800;margin:6px 0}.tile{font-size:44px;text-align:center;padding:30px 10px}"
  +".about p{color:"+mut+";max-width:640px;margin:0 auto;text-align:center;font-size:16.5px}"
  +"footer{border-top:1px solid "+line+";text-align:center;color:"+mut+";padding:28px;font-size:13.5px}"+(extra||"");
}
function genWebsite(p){
  var s=p.site, th=THEMES[s.theme]||THEMES.generic, c=COLORS[s.colorName]||COLORS.amber;
  var fx=s.fx3d?".hero h1{transform:perspective(600px) rotateX(4deg);text-shadow:0 18px 40px rgba(0,0,0,.45)}.card{transition:.25s}.card:hover{transform:translateY(-6px) perspective(500px) rotateX(3deg)}":"";
  var feats=th.feats.map(function(f){return '<div class="card"><div class="ic">'+f[0]+'</div><h3>'+f[1]+'</h3><p>'+f[2]+'</p></div>';}).join("");
  var pricing=s.sections.pricing?'<section id="pricing"><h2>Pricing</h2><div class="grid"><div class="card"><h3>Essential</h3><div class="pr">₹999</div><p>Everything you need to start.</p></div><div class="card pop"><h3>Signature</h3><div class="pr">₹2,499</div><p>The full experience, most loved.</p></div><div class="card"><h3>Premium</h3><div class="pr">₹4,999</div><p>Top tier, no compromises.</p></div></div></section>':"";
  var testi=s.sections.testimonials?'<section id="love"><h2>Loved by customers</h2><div class="grid"><div class="card"><p>"Exactly what I hoped for — and then some. I keep coming back."</p><b>— Priya S.</b></div><div class="card"><p>"Quality, honesty, and it just feels premium. Rare combination."</p><b>— Rahul M.</b></div><div class="card"><p>"Booked in minutes, delighted for weeks. Highly recommended."</p><b>— Anita D.</b></div></div></section>':"";
  var gallery=s.sections.gallery?'<section id="gallery"><h2>Gallery</h2><div class="grid"><div class="card tile">🌟</div><div class="card tile">🎨</div><div class="card tile">📸</div><div class="card tile">✨</div><div class="card tile">🏆</div><div class="card tile">💎</div></div></section>':"";
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(s.name)+'</title><style>'+pageCSS(c,s.dark,fx)+'</style></head><body>'
  +'<header><div class="logo">'+esc(s.name)+'<span>.</span></div><nav><a href="#features">Features</a><a href="#about">About</a>'+(s.sections.pricing?'<a href="#pricing">Pricing</a>':"")+'<a href="#contact">Contact</a></nav></header>'
  +'<div class="hero"><h1>'+esc(s.name)+'<br><em>'+esc(s.tagline)+'</em></h1><p>'+esc(th.tag)+'</p><a class="btn" href="#contact">Get Started</a><a class="btn g" href="#features">Explore</a></div>'
  +'<section id="features"><h2>What we do</h2><div class="grid">'+feats+'</div></section>'
  +pricing+gallery+testi
  +'<section class="about" id="about"><h2>About</h2><p>'+esc(th.about)+'</p></section>'
  +'<section id="contact" style="text-align:center"><h2>Visit us</h2><p style="color:inherit;opacity:.75">Walk in, call, or message — we reply fast.</p><div style="margin-top:20px"><a class="btn" href="#contact">Contact Now</a></div></section>'
  +'<footer>© 2026 '+esc(s.name)+' · Made with pride in India</footer></body></html>';
}
function genApp(p){
  var d=p.details, c=COLORS[d.color||"amber"], dark=d.mode!=="light";
  var feats=(d.features||[]).map(function(f){return '<div class="acard"><b>'+esc(f)+'</b><span>Active module</span></div>';}).join("");
  var login=(d.features||[]).indexOf("Login Screen")>-1;
  var js='<script>function go(){document.getElementById("login").style.display="none";document.getElementById("dash").style.display="block";}function book(){var b=document.getElementById("bk");b.textContent="✔ Booked — see you soon!";b.style.color="'+c+'";}<\/script>';
  var loginHTML=login?'<div id="login" class="screen"><h2>Welcome back</h2><p class="mut">Login to '+(esc(d.name||"App"))+'</p><input placeholder="Email or phone"><input type="password" placeholder="Password"><button class="btn" style="width:100%" onclick="go()">Login</button></div>':"";
  var dash='<div id="dash" class="screen"'+(login?' style="display:none"':"")+'><h2>'+(d.purpose||"App")+' Dashboard</h2><div class="stats"><div class="stat"><b>128</b><span>Today</span></div><div class="stat"><b>96%</b><span>On time</span></div><div class="stat"><b>4.9★</b><span>Rating</span></div></div><div class="alist">'+feats+'</div><button class="btn" style="width:100%;margin-top:14px" onclick="book()">Book Now</button><p id="bk" class="mut" style="text-align:center;margin-top:10px"></p></div>';
  var css="body{display:flex;justify-content:center;padding:26px 14px}.phone{width:380px;max-width:100%;background:"+(dark?"#11141B":"#fff")+";border:1px solid "+(dark?"#232A38":"#E6E3DC")+";border-radius:28px;padding:24px;box-shadow:0 30px 60px rgba(0,0,0,.35)}.screen h2{font-size:22px;margin-bottom:6px}.mut{opacity:.65;font-size:14px}.phone input{width:100%;padding:12px;border-radius:10px;border:1px solid "+(dark?"#232A38":"#E6E3DC")+";background:transparent;color:inherit;margin:8px 0;font-size:14.5px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:16px 0}.stat{background:"+(dark?"#171B25":"#F4F2ED")+";border-radius:12px;padding:12px;text-align:center}.stat b{display:block;font-size:19px;color:"+c+"}.stat span{font-size:11.5px;opacity:.65}.acard{display:flex;justify-content:space-between;border:1px solid "+(dark?"#232A38":"#E6E3DC")+";border-radius:12px;padding:12px 14px;margin-bottom:9px;font-size:14px}.acard span{opacity:.6;font-size:12.5px}header{display:none}";
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(d.name||"App")+'</title><style>'+pageCSS(c,dark,css)+'</style></head><body><div class="phone"><div class="logo" style="margin-bottom:18px">'+esc(d.name||"App")+'<span>.</span></div>'+loginHTML+dash+'</div>'+js+'</body></html>';
}
function genChatbot(p){
  var d=p.details, c=COLORS[d.color||"amber"];
  var facts=(d.data||"").split("\n").map(function(x){return x.trim();}).filter(Boolean);
  var factsJSON=JSON.stringify(facts), tone=d.tone||"Friendly";
  var greet=tone==="Hinglish Mix"?"Namaste! Main "+(d.name||"Assistant")+" hoon. Kuch bhi puchiye — price, timing, delivery!":(tone==="Professional"?"Good day. I am "+(d.name||"Assistant")+". How may I assist you?":"Hi there! I am "+(d.name||"Assistant")+" — ask me anything about "+(d.business||"us")+"!");
  var js='<script>var FACTS='+factsJSON+';function ans(q){q=q.toLowerCase();var words=q.split(/[^a-z0-9]+/).filter(function(w){return w.length>2;});var best="",score=0;FACTS.forEach(function(f){var s=0;words.forEach(function(w){if(f.toLowerCase().indexOf(w)>-1)s++;});if(s>score){score=s;best=f;}});if(score>0)return best;if(/price|cost|rate|charge/.test(q))return "Our team will confirm exact pricing — meanwhile, anything else I can help with?";if(/time|open|close|hour/.test(q))return "Share your preferred time and we will confirm availability right away.";if(/contact|phone|call/.test(q))return "You can reach the team directly through the Contact section — they reply fast.";return "I can answer from our business information. Try asking about prices, timings, or services.";}function send(){var i=document.getElementById("inp");var t=i.value.trim();if(!t)return;add(t,"me");i.value="";setTimeout(function(){add(ans(t),"bot");},450);}function add(t,w){var m=document.getElementById("msgs");var d=document.createElement("div");d.className="m "+w;d.textContent=t;m.appendChild(d);m.scrollTop=m.scrollHeight;}function chip(t){document.getElementById("inp").value=t;send();}<\/script>';
  var css=".wrap{max-width:520px;margin:0 auto;padding:30px 16px}.box{border:1px solid "+(true?"#232A38":"")+";background:#11141B;border-radius:20px;overflow:hidden}.bhead{background:"+c+";color:#14100a;padding:16px 18px;font-weight:800}.msgs{height:340px;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:9px}.m{max-width:82%;padding:10px 13px;border-radius:13px;font-size:14.5px}.m.bot{background:#1A1F2A;color:#EDF0F5;align-self:flex-start}.m.me{background:"+c+";color:#14100a;align-self:flex-end}.chips{display:flex;gap:8px;padding:0 16px 12px;flex-wrap:wrap}.chip{border:1px solid #2A3242;background:transparent;color:#EDF0F5;border-radius:999px;padding:6px 12px;font-size:13px;cursor:pointer}.brow{display:flex;gap:8px;padding:14px;border-top:1px solid #232A38}.brow input{flex:1;background:#0C0E13;border:1px solid #2A3242;border-radius:999px;color:#fff;padding:11px 15px;outline:none}header{display:none}body{background:#0C0E13;color:#EDF0F5}";
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(d.name||"Chatbot")+'</title><style>'+css+'</style></head><body><div class="wrap"><div class="box"><div class="bhead">💬 '+esc(d.name||"Assistant")+' · '+(esc(d.business||""))+'</div><div class="msgs" id="msgs"><div class="m bot">'+esc(greet)+'</div></div><div class="chips"><button class="chip" onclick="chip(\'What are your prices?\')">Prices</button><button class="chip" onclick="chip(\'What are your timings?\')">Timings</button><button class="chip" onclick="chip(\'How do I contact you?\')">Contact</button></div><div class="brow"><input id="inp" placeholder="Type your question…" onkeydown="if(event.key===\'Enter\')send()"><button class="btn" onclick="send()">Send</button></div></div><p style="text-align:center;opacity:.55;font-size:12.5px;margin-top:12px">Powered by YugLab · Answers from business data</p></div>'+js+'</body></html>';
}
function genAgent(p){
  var d=p.details, stepsJSON=JSON.stringify(["Reading the task","Planning steps",((d.tools||[]).indexOf("Web Search")>-1?"Searching the web":"Reviewing inputs"),"Drafting the output","Self-checking quality","Final report ready"]);
  var js='<script>var STEPS='+stepsJSON+';var JOB='+JSON.stringify(d.job||"Research")+';function run(){var t=document.getElementById("task").value.trim()||"your task";var log=document.getElementById("log");var res=document.getElementById("res");log.innerHTML="";res.style.display="none";var i=0;function next(){if(i>0)log.children[i-1].innerHTML="✔ "+STEPS[i-1];if(i>=STEPS.length){res.style.display="block";document.getElementById("resText").textContent="Completed: "+t+" — structured output prepared with sources and next actions ("+JOB+" mode).";return;}var d2=document.createElement("div");d2.className="step";d2.textContent="⏳ "+STEPS[i];log.appendChild(d2);i++;setTimeout(next,650);}next();}<\/script>';
  var css=".wrap{max-width:640px;margin:0 auto;padding:34px 16px}.box{background:#11141B;border:1px solid #232A38;border-radius:20px;padding:24px}.step{padding:8px 0;border-bottom:1px dashed #232A38;font-size:14.5px;color:#EDF0F5}.rrow{display:flex;gap:9px}.rrow input{flex:1;background:#0C0E13;border:1px solid #2A3242;border-radius:12px;color:#fff;padding:12px 14px;outline:none}body{background:#0C0E13;color:#EDF0F5}header{display:none}.rescard{margin-top:18px;background:#171208;border:1px solid #3a2c10;border-radius:14px;padding:16px;font-size:14.5px}";
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(d.name||"Agent")+'</title><style>'+pageCSS("#F59E0B",true,css)+'</style></head><body><div class="wrap"><div class="box"><h2 style="margin-bottom:4px">🤖 '+esc(d.name||"Agent")+'</h2><p style="opacity:.65;margin-bottom:16px">'+esc(d.job||"Research")+' agent · Tools: '+esc((d.tools||[]).join(", ")||"core")+'</p><div class="rrow"><input id="task" placeholder="Give the agent a task…"><button class="btn" onclick="run()">Run</button></div><div id="log" style="margin-top:14px"></div><div id="res" class="rescard" style="display:none"><b>Result</b><p id="resText" style="margin-top:6px"></p></div></div></div>'+js+'</body></html>';
}
function genContent(p){
  var d=p.details, topic=d.topic||"your product", tone=d.tone||"Premium", kind=d.kind||"Blog Post";
  var heads=["Why "+topic+" deserves a second look","Introducing: "+topic+" — crafted the "+tone.toLowerCase()+" way",topic+": the choice people keep recommending"];
  var body="";
  if(kind==="Social Captions")body=["✨ "+topic+" — and yes, it tastes as good as it looks. Come try it today.","New day, new craving. "+topic+", made fresh, served with pride. 💛","Tag someone who owes you this. 👇 "+topic+" is waiting."].join("\n\n");
  else if(kind==="Ad Copy")body="Headline: "+topic+" — Done Right.\n\nWhy settle for ordinary? "+topic+" brings premium quality, honest pricing and service that actually cares. Limited period offer — act now.\n\nCTA: Order Today";
  else if(kind==="Product Description")body=topic+" is crafted for people who notice details. Premium materials, honest pricing, and a finish that feels a class apart. Whether it is your first time or your fiftieth, expect the same promise every single time: quality you can feel, service you can trust.\n\n• Premium quality, checked twice\n• Honest, transparent pricing\n• Loved and recommended by customers";
  else body="There is a reason people keep coming back to "+topic+". It is not luck, and it is not hype — it is the quiet work of doing simple things properly, every single day.\n\nQuality is not a feature here. It is the habit. From the first step to the final touch, every detail is checked twice, because the people who trust us deserve nothing less.\n\nIf you have been waiting for a sign, this is it. Try "+topic+" once — and you will understand why nobody settles for less afterwards.";
  if(d.length==="Short")body=body.split("\n\n").slice(0,2).join("\n\n");
  if(d.instructions)body+="\n\n— Note applied from your instructions: "+d.instructions;
  var text=heads[0]+"\n\n"+body;
  var css=".doc{max-width:720px;margin:0 auto;padding:44px 22px}.doc h1{font-size:32px;letter-spacing:-.01em;margin-bottom:6px}.meta{opacity:.6;font-size:13px;margin-bottom:26px}.doc pre{white-space:pre-wrap;font-family:inherit;font-size:16.5px;line-height:1.75}header{display:none}";
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(d.name||kind)+'</title><style>'+pageCSS("#F59E0B",true,css)+'</style></head><body><div class="doc"><h1>'+esc(heads[0])+'</h1><div class="meta">'+esc(kind)+' · '+esc(tone)+' tone · via YugLab</div><pre>'+esc(text)+'</pre></div></body></html>';
}
function generate(p){
  if(p.type==="Web App")return genApp(p);
  if(p.type==="AI Chatbot")return genChatbot(p);
  if(p.type==="AI Agent")return genAgent(p);
  if(p.type==="Content")return genContent(p);
  p.site=siteFromDetails(p); return genWebsite(p);
}

/* ---------- projects sidebar ---------- */
function renderProjects(){
  var el=$("projectList"); el.innerHTML="";
  if(!state.projects.length){el.innerHTML='<p style="color:var(--faint);font-size:13px;padding:4px">No projects yet.</p>';return;}
  state.projects.slice().reverse().forEach(function(p){
    var b=document.createElement("button");
    b.className="proj-item"+(p.id===state.activeId?" active":"");
    b.innerHTML=esc(p.name)+'<span class="del" title="Delete">✕</span><small>'+esc(p.type)+" · "+esc(p.status)+"</small>";
    b.querySelector(".del").onclick=function(ev){ev.stopPropagation();if(confirm("Delete project '"+p.name+"'?")){state.projects=state.projects.filter(function(x){return x.id!==p.id;});if(state.activeId===p.id)state.activeId=null;save();renderAll();}};
    b.onclick=function(){state.activeId=p.id;save();renderAll();};
    el.appendChild(b);
  });
}
function renderAll(){
  $("creditsVal").textContent=state.credits;
  renderProjects();
  renderAIStatus();
  var p=active();
  if(draft){showView("setup");return;}
  if(!p){showView("create");return;}
  showView("project");
  $("wsTitle").textContent=p.name; $("wsType").textContent=p.type; $("wsStatus").textContent=p.status;
  var showPlan=!!p.plan&&!p.html, showResult=!!p.html;
  $("planPanel").style.display=showPlan?"block":"none";
  $("resultPanel").style.display=showResult?"block":"none";
  if(showPlan){$("planCost").textContent="Cost: "+COSTS[p.type]+" credits";$("detailSummary").innerHTML=detailChips(p);$("planList").innerHTML=p.plan.map(function(s){return "<li>"+esc(s)+"</li>";}).join("");}
  if(showResult)$("previewFrame").srcdoc=p.html;
  setStep(p.html?5:(p.plan?3:2));
}
function toPlan(){
  collectForm(); var d=draft.details;
  if(!d.name){toast("Give it a name first");return;}
  var p;
  if(draft.projectId){p=state.projects.filter(function(x){return x.id===draft.projectId;})[0];}
  if(!p){p={id:"p"+Date.now(),name:d.name,type:draft.type,status:"Plan ready",details:d,plan:null,html:"",site:null};state.projects.push(p);state.activeId=p.id;}
  else{p.name=d.name;p.details=d;p.type=draft.type;p.html="";p.status="Plan ready";}
  p.plan=planFor(p); draft=null; save(); renderAll(); toast("Plan ready — approve to build");
}
function runBuild(){
  var p=active(); if(!p||!p.plan)return;
  var cost=COSTS[p.type];
  if(state.credits<cost){toast("Not enough credits");return;}
  state.credits-=cost; p.status="Building"; save();
  $("creditsVal").textContent=state.credits; $("wsStatus").textContent="Building";
  $("planPanel").style.display="none"; setStep(4);
  var bp=$("buildPanel"); bp.style.display="block";
  var steps=p.plan.concat(["Package ready"]);
  $("buildSteps").innerHTML=steps.map(function(s,i){return '<div class="build-step" id="bs'+i+'"><span class="st">'+(i+1)+"</span>"+esc(s)+"</div>";}).join("");
  var i=0;
  (function next(){
    if(i>0){var prev=$("bs"+(i-1));prev.classList.remove("active");prev.classList.add("done");prev.querySelector(".st").textContent="✓";}
    if(i>=steps.length){
      p.html=generate(p); p.status="Built — ready"; bp.style.display="none"; save(); renderAll();
      editSay("lab","<b>Lab:</b> Build complete. Preview is live — quick-edit below, download when happy.");
      toast("Build complete ✔"); return;
    }
    $("bs"+i).classList.add("active"); i++; setTimeout(next,400);
  })();
}

/* ---------- quick edit ---------- */
function editSay(who,text){var log=$("editLog");if(!log)return;var d=document.createElement("div");d.className="chat-msg "+who;d.innerHTML=text;log.appendChild(d);log.scrollTop=log.scrollHeight;}
function applyEdit(){
  var p=active(); if(!p||!p.html)return;
  var inp=$("editInput"), text=inp.value.trim(); if(!text)return;
  editSay("user",esc(text)); inp.value="";
  if(state.credits<2){editSay("lab","<b>Lab:</b> 2 credits chahiye is edit ke liye.");return;}
  var t=text.toLowerCase(), done=[];
  if(p.site){
    var s=p.site, colorHit=null;
    for(var k in COLORS)if(t.indexOf(k)>-1)colorHit=k;
    if(/title|name/.test(t)&&/to\s+/.test(t)){var m=text.split(/to\s+/i)[1];if(m){s.name=m.trim().replace(/[".]/g,"");p.name=s.name;done.push("title → <b>"+esc(s.name)+"</b>");}}
    else if(colorHit){s.colorName=colorHit;done.push("colour → <b>"+colorHit+"</b>");}
    else if(/light mode|light theme/.test(t)){s.dark=false;done.push("<b>light mode</b> on");}
    else if(/dark mode|dark theme/.test(t)){s.dark=true;done.push("<b>dark mode</b> on");}
    else if(/add.*pricing/.test(t)){s.sections.pricing=true;done.push("<b>pricing</b> added");}
    else if(/remove.*pricing/.test(t)){s.sections.pricing=false;done.push("pricing removed");}
    else if(/add.*testimonial|add.*review/.test(t)){s.sections.testimonials=true;done.push("<b>testimonials</b> added");}
    else if(/remove.*testimonial|remove.*review/.test(t)){s.sections.testimonials=false;done.push("testimonials removed");}
    else if(/add.*gallery/.test(t)){s.sections.gallery=true;done.push("<b>gallery</b> added");}
    else if(/remove.*gallery/.test(t)){s.sections.gallery=false;done.push("gallery removed");}
  }
  if(!done.length){editSay("lab","<b>Lab:</b> Quick edits abhi website projects par chalte hain (colour, title, sections, light/dark). Bigger changes ke liye neeche <b>Lab Assistant</b> se puchho, ya Edit Details se rebuild karo.");return;}
  state.credits-=2; p.html=genWebsite(p); p.status="Edited"; save(); renderAll();
  editSay("lab","<b>Lab:</b> Done — "+done.join(", ")+". Preview updated. (2 credits)");
}

/* ---------- publish ---------- */
function downloadOut(){
  var p=active(); if(!p||!p.html)return;
  var blob=new Blob([p.html],{type:"text/html"}); var a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=p.name.replace(/\s+/g,"-").toLowerCase()+"-"+p.type.replace(/\s+/g,"-").toLowerCase()+".html"; a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);},2000);
}

/* ---------- Nemotron 3 Ultra ---------- */
function renderAIStatus(){
  var has=!!nemotronKey();
  $("aiStatus").textContent=has?"Connected":"Not connected";
  $("aiKeyInput").style.display=has?"none":"block";
  $("aiSaveBtn").style.display=has?"none":"inline-flex";
  $("aiTestBtn").style.display=has?"inline-flex":"none";
  $("aiForgetBtn").style.display=has?"inline-flex":"none";
  $("aiHint").textContent=has?"Live AI is ON — answers come from Nemotron 3 Ultra.":"Connect Nemotron from the left panel to switch on live AI answers.";
}
function aiSay(who,text){
  var log=$("aiLog"); var d=document.createElement("div");
  d.className="chat-msg "+who; d.innerHTML=text; log.appendChild(d); log.scrollTop=log.scrollHeight; return d;
}
function nemotronChat(messages,maxTokens){
  var key=nemotronKey();
  return fetch("https://integrate.api.nvidia.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+key},body:JSON.stringify({model:"nvidia/nemotron-3-ultra-550b-a55b",messages:messages,temperature:0.6,top_p:0.95,max_tokens:maxTokens||900})})
  .then(function(r){if(!r.ok)throw new Error("HTTP "+r.status);return r.json();})
  .then(function(j){var m=j.choices&&j.choices[0]&&j.choices[0].message;return (m&&(m.content||""))||"(empty reply — try again with a shorter question)";});
}
function aiAsk(){
  var inp=$("aiInput"), q=inp.value.trim(); if(!q)return;
  if(!nemotronKey()){aiSay("lab","<b>Assistant:</b> Pehle left panel se Nemotron connect karo — NVIDIA ki key (nvapi-…) paste karke Connect dabao.");return;}
  aiSay("user",esc(q)); inp.value="";
  var p=active();
  var ctx="You are the Lab Assistant inside YugLab, a creator lab. The user (Suman, founder) is building digital products. Be practical, specific and concise. Current project: "+(p?(p.name+" ("+p.type+", status: "+p.status+")"):"none selected")+".";
  var wait=aiSay("lab","<b>Assistant:</b> Thinking…");
  nemotronChat([{role:"system",content:ctx},{role:"user",content:q}],900)
  .then(function(ans){wait.innerHTML="<b>Assistant (Nemotron):</b> "+esc(ans).replace(/\n/g,"<br>");})
  .catch(function(e){wait.innerHTML="<b>Assistant:</b> Connection issue ("+esc(e.message)+"). Agar key sahi hai to browser CORS rok raha hoga — mujhe batao, Colab route se jod dunga.";});
}
function aiConnect(){
  var v=$("aiKeyInput").value.trim();
  if(v.indexOf("nvapi-")!==0){$("aiMsg").textContent="Ye NVIDIA key nahi lagti — nvapi- se shuru honi chahiye.";return;}
  try{localStorage.setItem(KEY_LS,v);}catch(e){}
  $("aiMsg").textContent="Key saved in this browser. Testing…"; renderAIStatus();
  nemotronChat([{role:"user",content:"Reply in one short line: who are you?"}],300)
  .then(function(ans){$("aiMsg").textContent="✔ Connected. Nemotron says: "+ans.slice(0,120);toast("Nemotron connected ✔");})
  .catch(function(e){$("aiMsg").textContent="Key saved, but test failed ("+e.message+"). Browser CORS ya key check karo.";});
}

/* ---------- wiring ---------- */
$("newProjectBtn").onclick=function(){draft=null;state.activeId=null;save();renderAll();window.scrollTo({top:0,behavior:"smooth"});};
$("toPlanBtn").onclick=toPlan;
$("backToTypesBtn").onclick=function(){draft=null;renderAll();};
$("approveBtn").onclick=runBuild;
$("replanBtn").onclick=function(){var p=active();if(!p)return;draft={type:p.type,details:p.details||defaultDetails(p.type),projectId:p.id};if(p.site&&p.details){}showView("setup");renderForm();};
$("editDetailsBtn").onclick=function(){var p=active();if(!p)return;draft={type:p.type,details:p.details||defaultDetails(p.type),projectId:p.id};showView("setup");renderForm();};
$("editSendBtn").onclick=applyEdit;
$("editInput").addEventListener("keydown",function(e){if(e.key==="Enter")applyEdit();});
$("downloadBtn").onclick=downloadOut;
$("copyBtn").onclick=function(){var p=active();if(p&&p.html&&navigator.clipboard)navigator.clipboard.writeText(p.html).then(function(){toast("Code copied ✔");});};
$("openBtn").onclick=function(){var p=active();if(p&&p.html){var b=new Blob([p.html],{type:"text/html"});window.open(URL.createObjectURL(b),"_blank");}};
$("deleteBtn").onclick=function(){var p=active();if(p&&confirm("Delete project '"+p.name+"'?")){state.projects=state.projects.filter(function(x){return x.id!==p.id;});state.activeId=null;save();renderAll();}};
$("aiSaveBtn").onclick=aiConnect;
$("aiForgetBtn").onclick=function(){try{localStorage.removeItem(KEY_LS);}catch(e){}$("aiKeyInput").value="";$("aiMsg").textContent="Key removed from this browser.";renderAIStatus();};
$("aiTestBtn").onclick=function(){$("aiMsg").textContent="Testing…";nemotronChat([{role:"user",content:"Say OK"}],200).then(function(a){$("aiMsg").textContent="✔ Live: "+a.slice(0,80);}).catch(function(e){$("aiMsg").textContent="Failed: "+e.message;});};
$("aiPill").onclick=function(){$("aiBox").scrollIntoView({behavior:"smooth",block:"center"});};
$("aiSendBtn").onclick=aiAsk;
$("aiInput").addEventListener("keydown",function(e){if(e.key==="Enter")aiAsk();});
renderTypes();
renderAll();
if(active())aiSay("lab","<b>Assistant:</b> Welcome back. Project khula hai — kuch bhi puchho, ya Quick Edit se badlaav karo.");
})();
