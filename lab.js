/* YugLab — Lab Console engine (front-end, admin build)
   Goal -> Plan -> Approve -> Build (real generated website) -> Preview -> Chat Edit -> Download */
(function(){
"use strict";
var LS_KEY="yuglab.lab.v1";
var COSTS={"Website":40,"3D Website":60,"Web App":80,"AI Chatbot":70,"AI Agent":90,"Content":20};
var COLORS={amber:"#F59E0B",blue:"#3B82F6",green:"#22C55E",red:"#EF4444",purple:"#A855F7",pink:"#EC4899",teal:"#14B8A6",orange:"#F97316"};

var state=load()||{credits:1000,projects:[],activeId:null};
function load(){try{return JSON.parse(localStorage.getItem(LS_KEY));}catch(e){return null;}}
function save(){try{localStorage.setItem(LS_KEY,JSON.stringify(state));}catch(e){}}
function $(id){return document.getElementById(id);}
function active(){for(var i=0;i<state.projects.length;i++)if(state.projects[i].id===state.activeId)return state.projects[i];return null;}
function esc(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;");}

/* ---------- type + theme detection ---------- */
function detectType(goal){
  var g=goal.toLowerCase();
  if(/chatbot|chat bot/.test(g))return "AI Chatbot";
  if(/agent/.test(g))return "AI Agent";
  if(/\bapp\b|web app/.test(g))return "Web App";
  if(/3d/.test(g))return "3D Website";
  if(/content|blog|article/.test(g))return "Content";
  return "Website";
}
function detectTheme(goal){
  var g=goal.toLowerCase();
  if(/coffee|cafe|restaurant|food|bakery/.test(g))return "cafe";
  if(/photo|photograph/.test(g))return "photo";
  if(/gym|fitness|yoga/.test(g))return "gym";
  if(/fashion|clothing|boutique|wear/.test(g))return "fashion";
  if(/salon|beauty|spa/.test(g))return "salon";
  if(/tech|software|agency|startup/.test(g))return "agency";
  return "generic";
}
function detectColor(goal,def){
  var g=goal.toLowerCase();
  for(var k in COLORS)if(g.indexOf(k)>-1)return k;
  return def||"amber";
}
var THEMES={
  cafe:{tag:"Fresh brews, honest food, slow mornings.",feats:[["☕","Craft Coffee","Small-batch beans, brewed with care."],["🥐","Fresh Bakes","Out of the oven, every single morning."],["🪑","Cosy Corner","Your table is waiting. Stay a while."]],about:"A neighbourhood cafe built on good beans and better conversations."},
  photo:{tag:"Moments, kept forever.",feats:[["📷","Weddings","Your day, told as a story in frames."],["🎞️","Portraits","Honest portraits that look like you."],["🎬","Films","Short films with a photographer's eye."]],about:"A photography studio that believes the best pictures are the true ones."},
  gym:{tag:"Stronger every single day.",feats:[["🏋️","Strength","Coached programs that actually progress."],["🔥","Conditioning","Sweat hard, recover smart."],["🥗","Nutrition","Fuel plans matched to your training."]],about:"A gym for people who show up. No mirrors-for-selfies, just work."},
  fashion:{tag:"Wear the story you want to tell.",feats:[["🧵","Crafted Fabric","Premium cloth, honest stitching."],["✂️","Tailored Fit","Cut to move with you, not against you."],["🌿","Slow Fashion","Made to last seasons, not weeks."]],about:"A clothing label built on craft — designed here, worn everywhere."},
  salon:{tag:"Look good. Feel better.",feats:[["💇","Hair Studio","Cuts and colour by senior stylists."],["💅","Nails & Care","Detail work, done patiently."],["🌸","Skin Rituals","Facials that reset more than skin."]],about:"A salon where the chair time is the best part of your week."},
  agency:{tag:"We build digital products that grow businesses.",feats:[["💡","Strategy","Positioning before pixels."],["🖥️","Design & Build","Websites and products, end to end."],["📈","Growth","Launch is the starting line."]],about:"A digital agency for ambitious brands — small team, senior hands."},
  generic:{tag:"Quality you can feel, service you can trust.",feats:[["⭐","Quality First","Every detail checked, twice."],["⚡","Fast & Reliable","On time, every time."],["🤝","People Who Care","Real humans, real answers."]],about:"A business built on one simple promise — do it properly, or don't do it."}
};

/* ---------- plan ---------- */
function makePlan(p){
  var t=p.type, steps;
  if(t==="AI Chatbot")steps=["Knowledge base from your data","Conversation flows + fallback answers","Chat widget design","Test conversations + fixes","Final package + embed code"];
  else if(t==="AI Agent")steps=["Goal + tools mapping","Workflow design","Guardrails + approvals","Test runs + fixes","Final agent package"];
  else if(t==="Content")steps=["Topic + audience map","Outline approval","Full draft","Edit pass","Final content package"];
  else steps=["Page structure: Home, Features, About, Contact","Design system: "+p.site.colorName+" accent, "+(p.site.dark?"dark":"light")+" theme","Hero + sections build","Mobile + speed checks (QA)","Final website package"];
  return steps;
}

/* ---------- site generator ---------- */
function generateSite(p){
  var s=p.site, th=THEMES[s.theme]||THEMES.generic, c=COLORS[s.colorName]||COLORS.amber;
  var bg=s.dark?"#0C0E13":"#FAFAF8", panel=s.dark?"#141821":"#FFFFFF", tx=s.dark?"#EDF0F5":"#16181D", mut=s.dark?"#9AA6B5":"#5B6472", line=s.dark?"#232A38":"#E6E3DC";
  function feats(){return th.feats.map(function(f){return '<div class="card"><div class="ic">'+f[0]+'</div><h3>'+f[1]+'</h3><p>'+f[2]+'</p></div>';}).join("");}
  var pricing = s.sections.pricing ? '<section id="pricing"><h2>Pricing</h2><div class="grid"><div class="card"><h3>Essential</h3><div class="pr">₹999</div><p>Everything you need to start.</p></div><div class="card pop"><h3>Signature</h3><div class="pr">₹2,499</div><p>The full experience, most loved.</p></div><div class="card"><h3>Premium</h3><div class="pr">₹4,999</div><p>Top tier, no compromises.</p></div></div></section>' : "";
  var testi = s.sections.testimonials ? '<section id="love"><h2>Loved by customers</h2><div class="grid"><div class="card"><p>"Exactly what I hoped for — and then some. I keep coming back."</p><b>— Priya S.</b></div><div class="card"><p>"Quality, honesty, and it just feels premium. Rare combination."</p><b>— Rahul M.</b></div><div class="card"><p>"Booked in minutes, delighted for weeks. Highly recommended."</p><b>— Anita D.</b></div></div></section>' : "";
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
  +'<title>'+esc(s.name)+'</title><style>'
  +"*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:"+bg+";color:"+tx+";line-height:1.6}"
  +"header{position:sticky;top:0;background:"+bg+";border-bottom:1px solid "+line+";padding:16px 24px;display:flex;justify-content:space-between;align-items:center}"
  +".logo{font-weight:800;font-size:20px}.logo span{color:"+c+"}nav a{color:"+mut+";text-decoration:none;margin-left:20px;font-size:14.5px}"
  +".hero{text-align:center;padding:88px 24px 64px;background:radial-gradient(560px 280px at 50% -40px,"+c+"26,transparent 70%)}"
  +".hero h1{font-size:clamp(32px,5.5vw,52px);letter-spacing:-.02em;line-height:1.1}.hero h1 em{font-style:normal;color:"+c+"}"
  +".hero p{color:"+mut+";font-size:17.5px;max-width:520px;margin:16px auto 28px}"
  +".btn{display:inline-block;background:"+c+";color:#14100a;font-weight:700;padding:13px 26px;border-radius:999px;text-decoration:none}.btn.g{background:transparent;color:"+tx+";border:1px solid "+line+";margin-left:10px}"
  +"section{max-width:1040px;margin:0 auto;padding:56px 24px}section h2{text-align:center;font-size:30px;margin-bottom:30px;letter-spacing:-.01em}"
  +".grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}@media(max-width:760px){.grid{grid-template-columns:1fr}}"
  +".card{background:"+panel+";border:1px solid "+line+";border-radius:16px;padding:24px}.card .ic{font-size:26px;margin-bottom:10px}.card h3{margin-bottom:5px}.card p{color:"+mut+";font-size:14.5px}"
  +".card.pop{border-color:"+c+"}.pr{font-size:30px;font-weight:800;margin:6px 0}.about p{color:"+mut+";max-width:640px;margin:0 auto;text-align:center;font-size:16.5px}"
  +"footer{border-top:1px solid "+line+";text-align:center;color:"+mut+";padding:28px;font-size:13.5px}"
  +'</style></head><body>'
  +'<header><div class="logo">'+esc(s.name)+'<span>.</span></div><nav><a href="#features">Features</a><a href="#about">About</a>'+(s.sections.pricing?'<a href="#pricing">Pricing</a>':"")+'<a href="#contact">Contact</a></nav></header>'
  +'<div class="hero"><h1>'+esc(s.name)+'<br><em>'+esc(s.tagline)+'</em></h1><p>'+esc(s.tagline2||th.tag)+'</p><a class="btn" href="#contact">Get Started</a><a class="btn g" href="#features">Explore</a></div>'
  +'<section id="features"><h2>What we do</h2><div class="grid">'+feats()+'</div></section>'
  +pricing+testi
  +'<section class="about" id="about"><h2>About</h2><p>'+esc(th.about)+'</p></section>'
  +'<section id="contact" style="text-align:center"><h2>Visit us</h2><p style="color:'+mut+'">Walk in, call, or message — we reply fast.</p><div style="margin-top:20px"><a class="btn" href="#contact">Contact Now</a></div></section>'
  +'<footer>© 2026 '+esc(s.name)+' · Made with pride in India</footer>'
  +'</body></html>';
}
function defaultSite(name,goal){
  var theme=detectTheme(goal||""), th=THEMES[theme];
  return {name:name,tagline:"Welcome to "+name,tagline2:th.tag,theme:theme,colorName:detectColor(goal||"","amber"),dark:!(/light theme|light mode/.test((goal||"").toLowerCase())),sections:{pricing:false,testimonials:false}};
}

/* ---------- UI rendering ---------- */
function renderProjects(){
  var el=$("projectList"); el.innerHTML="";
  if(!state.projects.length){el.innerHTML='<p style="color:var(--faint);font-size:13px;padding:4px">No projects yet.</p>';return;}
  state.projects.slice().reverse().forEach(function(p){
    var b=document.createElement("button");
    b.className="proj-item"+(p.id===state.activeId?" active":"");
    b.innerHTML=esc(p.name)+"<small>"+esc(p.type)+" · "+esc(p.status)+"</small>";
    b.onclick=function(){state.activeId=p.id;save();renderAll();};
    el.appendChild(b);
  });
}
function renderAll(){
  $("creditsVal").textContent=state.credits;
  renderProjects();
  var p=active();
  $("emptyState").style.display=p?"none":"block";
  $("workspace").style.display=p?"block":"none";
  if(!p)return;
  $("wsTitle").textContent=p.name;
  $("wsType").textContent=p.type;
  $("wsStatus").textContent=p.status;
  $("goalInput").value=p.goal||"";
  $("planPanel").style.display=p.plan?"block":"none";
  if(p.plan){
    $("planCost").textContent="Cost: "+COSTS[p.type]+" credits";
    $("planList").innerHTML=p.plan.map(function(s){return "<li>"+esc(s)+"</li>";}).join("");
  }
  $("buildPanel").style.display="none";
  $("resultPanel").style.display=p.html?"block":"none";
  if(p.html)$("previewFrame").srcdoc=p.html;
}
function chatSay(who,text){
  var log=$("chatLog");var d=document.createElement("div");
  d.className="chat-msg "+who; d.innerHTML=text; log.appendChild(d); log.scrollTop=log.scrollHeight;
}

/* ---------- actions ---------- */
function newProject(){
  var name=prompt("Project name:","My Website");
  if(!name)return;
  var p={id:"p"+Date.now(),name:name,goal:"",type:"Website",status:"Draft",plan:null,html:"",site:defaultSite(name,"")};
  state.projects.push(p); state.activeId=p.id; save(); renderAll();
  $("goalInput").focus();
}
function makePlan(){
  var p=active(); if(!p)return;
  var goal=$("goalInput").value.trim();
  if(!goal){alert("State your goal first — one line is enough.");return;}
  p.goal=goal; p.type=detectType(goal); p.site=defaultSite(p.name,goal); p.plan=makePlan(p); p.status="Plan ready";
  save(); renderAll();
}
function runBuild(){
  var p=active(); if(!p||!p.plan)return;
  var cost=COSTS[p.type];
  if(state.credits<cost){alert("Not enough credits for this build.");return;}
  state.credits-=cost; p.status="Building"; save(); renderAll();
  $("planPanel").style.display="none";
  var bp=$("buildPanel"); bp.style.display="block";
  var steps=p.plan.concat(["Package ready"]);
  bp.querySelector("#buildSteps").innerHTML=steps.map(function(s,i){return '<div class="build-step" id="bs'+i+'"><span class="st">'+(i+1)+'</span>'+esc(s)+'</div>';}).join("");
  var i=0;
  (function next(){
    if(i>0){var prev=$("bs"+(i-1));prev.classList.remove("active");prev.classList.add("done");prev.querySelector(".st").textContent="✓";}
    if(i>=steps.length){
      p.html=generateSite(p); p.status="Built — ready to publish"; save(); renderAll();
      $("resultPanel").style.display="block";
      chatSay("lab","<b>Lab:</b> Build complete. Preview is live above — tell me any change, or download it.");
      return;
    }
    $("bs"+i).classList.add("active"); i++; setTimeout(next,420);
  })();
}
function applyEdit(){
  var p=active(); if(!p||!p.html)return;
  var inp=$("chatInput"), text=inp.value.trim(); if(!text)return;
  chatSay("user",esc(text)); inp.value="";
  if(state.credits<2){chatSay("lab","<b>Lab:</b> Credits khatm — edit ke liye 2 credits chahiye.");return;}
  var t=text.toLowerCase(), s=p.site, done=[];
  var colorHit=null; for(var k in COLORS)if(t.indexOf(k)>-1)colorHit=k;
  if(/title|name/.test(t)&&/to\s+/.test(t)){var m=text.split(/to\s+/i)[1]; if(m){s.name=m.trim().replace(/[".]/g,"");done.push("title changed to <b>"+esc(s.name)+"</b>");}}
  else if(colorHit){s.colorName=colorHit;done.push("accent colour changed to <b>"+colorHit+"</b>");}
  else if(/light mode|light theme/.test(t)){s.dark=false;done.push("switched to <b>light mode</b>");}
  else if(/dark mode|dark theme/.test(t)){s.dark=true;done.push("switched to <b>dark mode</b>");}
  else if(/add.*pricing|pricing.*add/.test(t)){s.sections.pricing=true;done.push("<b>pricing section</b> added");}
  else if(/remove.*pricing/.test(t)){s.sections.pricing=false;done.push("pricing section removed");}
  else if(/add.*testimonial|add.*review/.test(t)){s.sections.testimonials=true;done.push("<b>testimonials</b> added");}
  else if(/remove.*testimonial|remove.*review/.test(t)){s.sections.testimonials=false;done.push("testimonials removed");}
  else if(/tagline/.test(t)&&/to\s+/.test(t)){var m2=text.split(/to\s+/i)[1]; if(m2){s.tagline=m2.trim();done.push("tagline updated");}}
  if(!done.length){chatSay("lab","<b>Lab:</b> Ye samajh nahi aaya. Try: \"make it blue\", \"change title to Sharma Cafe\", \"add pricing section\", \"light mode\".");return;}
  state.credits-=2; p.html=generateSite(p); p.status="Edited"; save(); renderAll();
  chatSay("lab","<b>Lab:</b> Done — "+done.join(", ")+". Preview updated. (2 credits)");
}
function downloadSite(){
  var p=active(); if(!p||!p.html)return;
  var blob=new Blob([p.html],{type:"text/html"}); var a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=p.name.replace(/\s+/g,"-").toLowerCase()+"-website.html"; a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);},2000);
}

/* ---------- wire up ---------- */
$("newProjectBtn").onclick=newProject;
$("emptyNewBtn").onclick=newProject;
$("planBtn").onclick=makePlan;
$("approveBtn").onclick=runBuild;
$("replanBtn").onclick=makePlan;
$("chatSendBtn").onclick=applyEdit;
$("chatInput").addEventListener("keydown",function(e){if(e.key==="Enter")applyEdit();});
$("goalInput").addEventListener("keydown",function(e){if(e.key==="Enter")makePlan();});
$("downloadBtn").onclick=downloadSite;
$("copyBtn").onclick=function(){var p=active(); if(p&&p.html&&navigator.clipboard)navigator.clipboard.writeText(p.html).then(function(){alert("Website code copied.");});};
$("openBtn").onclick=function(){var p=active(); if(p&&p.html){var blob=new Blob([p.html],{type:"text/html"});window.open(URL.createObjectURL(blob),"_blank");}};
document.querySelectorAll(".chip").forEach(function(ch){ch.onclick=function(){var p=active(); if(!p){newProject(); p=active(); if(!p)return;} $("goalInput").value=ch.getAttribute("data-goal"); makePlan();};});
renderAll();
})();
