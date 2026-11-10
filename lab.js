/* YugLab — Lab Console v2 (admin)
   Create (clickable types) -> Details form -> Plan -> Build (real output) -> Preview -> Quick Edit / Yug AI -> Download */
(function(){
"use strict";
var LS_KEY="yuglab.lab.v2", LS_OLD="yuglab.lab.v1";
var COSTS={"Website":40,"3D Website":60,"Web App":80,"AI Chatbot":70,"AI Agent":90,"Content":20};
var TYPES=[
 {id:"Website",icon:"🌐",line:"Business sites, portfolios, landing pages",cost:40},
 {id:"3D Website",icon:"🧊",line:"Depth, motion, wow-factor pages",cost:60},
 {id:"Web App",icon:"📱",line:"Booking, dashboards, tools that work",cost:80},
 {id:"AI Chatbot",icon:"💬",line:"Answers from your own business data",cost:70},
 {id:"AI Agent",icon:"🤖",line:"An agent that runs tasks for you",cost:90},
];
var COLORS={mono:"#EDEDED",violet:"#6366F1",amber:"#F59E0B",blue:"#3B82F6",green:"#22C55E",red:"#EF4444",purple:"#A855F7",pink:"#EC4899",teal:"#14B8A6",orange:"#F97316"};
var CATS={cafe:"Cafe",restaurant:"Restaurant",bakery:"Bakery & Sweets",gym:"Gym & Fitness",yoga:"Yoga & Wellness",salon:"Salon & Beauty",spa:"Spa & Massage",fashion:"Fashion & Clothing",jewellery:"Jewellery",photo:"Photography",wedding:"Wedding Planning",events:"Events & Parties",travel:"Travel & Tours",hotel:"Hotel & Stay",realestate:"Real Estate",interior:"Interior Design",school:"School",coaching:"Coaching & Tuition",clinic:"Clinic & Doctor",dental:"Dental Care",pharmacy:"Pharmacy",lawfirm:"Law & Legal",finance:"Finance & Tax (CA)",insurance:"Insurance",agency:"Agency & Marketing",startup:"Startup",saas:"SaaS & Software",store:"Online Store",grocery:"Grocery & Kirana",electronics:"Electronics & Mobiles",auto:"Auto & Garage",pets:"Pets & Vet",construction:"Construction",portfolio:"Portfolio & Freelancer",generic:"Other Business"};
var THEMES={
  cafe:{tag:"Fresh brews, honest food, slow mornings.",feats:[["☕","Craft Coffee","Small-batch beans, brewed with care."],["🥐","Fresh Bakes","Out of the oven, every single morning."],["🪑","Cosy Corner","Your table is waiting. Stay a while."]],about:"A neighbourhood cafe built on good beans and better conversations."},
  photo:{tag:"Moments, kept forever.",feats:[["📷","Weddings","Your day, told as a story in frames."],["🎞️","Portraits","Honest portraits that look like you."],["🎬","Films","Short films with a photographer's eye."]],about:"A photography studio that believes the best pictures are the true ones."},
  gym:{tag:"Stronger every single day.",feats:[["🏋️","Strength","Coached programs that actually progress."],["🔥","Conditioning","Sweat hard, recover smart."],["🥗","Nutrition","Fuel plans matched to your training."]],about:"A gym for people who show up. No mirrors-for-selfies, just work."},
  fashion:{tag:"Wear the story you want to tell.",feats:[["🧵","Crafted Fabric","Premium cloth, honest stitching."],["✂️","Tailored Fit","Cut to move with you, not against you."],["🌿","Slow Fashion","Made to last seasons, not weeks."]],about:"A clothing label built on craft — designed here, worn everywhere."},
  salon:{tag:"Look good. Feel better.",feats:[["💇","Hair Studio","Cuts and colour by senior stylists."],["💅","Nails & Care","Detail work, done patiently."],["🌸","Skin Rituals","Facials that reset more than skin."]],about:"A salon where the chair time is the best part of your week."},
  agency:{tag:"We build digital products that grow businesses.",feats:[["💡","Strategy","Positioning before pixels."],["🖥️","Design & Build","Websites and products, end to end."],["📈","Growth","Launch is the starting line."]],about:"A digital agency for ambitious brands — small team, senior hands."},
  generic:{tag:"Quality you can feel, service you can trust.",feats:[["⭐","Quality First","Every detail checked, twice."],["⚡","Fast & Reliable","On time, every time."],["🤝","People Who Care","Real humans, real answers."]],about:"A business built on one simple promise — do it properly, or don't do it."}
,
  restaurant:{tag:"Dinner, done properly.",feats:[["🍽️","Signature Menu","Recipes refined over years, plated fresh."],["👨‍🍳","Chef's Table","Seasonal specials straight from the kitchen."],["🚗","Easy Takeaway","Hot, packed, and on time."]],about:"A restaurant where every plate leaves the kitchen like it matters — because it does."},
  bakery:{tag:"Warm bread. Sweeter days.",feats:[["🥐","Daily Bakes","Out of the oven at sunrise, every day."],["🎂","Custom Cakes","Your design, our craft, zero shortcuts."],["☕","Coffee & More","Pair it right, start it right."]],about:"A bakery built on butter, patience, and mornings done right."},
  yoga:{tag:"Breathe in. Begin again.",feats:[["🧘","Daily Practice","Flows for every level, every body."],["🌅","Sunrise Batches","Start the day the calm way."],["🕊️","Meditation","Stillness, taught gently."]],about:"A yoga studio where the mat is the easiest place to be yourself."},
  spa:{tag:"Switch off. Sink in.",feats:[["💆","Signature Rituals","Therapies that unwind more than muscles."],["🌿","Natural Oils","Clean ingredients, honest care."],["🕯️","Quiet Rooms","Silence you can feel."]],about:"A spa designed as an exhale — walk in tired, walk out new."},
  jewellery:{tag:"Crafted to be kept.",feats:[["💍","Fine Craft","Hand-finished by master karigars."],["✨","Certified Purity","Every stone and gram, verified."],["🎁","Heirloom Design","Made today, treasured for generations."]],about:"A jewellery house where craft is the family business."},
  wedding:{tag:"Your day, directed beautifully.",feats:[["💐","Full Planning","One team for the whole celebration."],["📋","Vendor Network","Trusted partners, negotiated for you."],["🎉","Zero-Stress Day","You celebrate. We run the show."]],about:"Wedding planners who treat your day like the production it deserves to be."},
  events:{tag:"Events people remember.",feats:[["🎤","Full Production","Stage, sound, lights — handled."],["🎈","Any Scale","Fifty guests or five thousand."],["📅","End-to-End","From invite to goodbye."]],about:"An events team that sweats every detail so your guests only feel the magic."},
  travel:{tag:"Trips that plan themselves.",feats:[["✈️","Custom Itineraries","Built around you, not templates."],["🏝️","Handpicked Stays","Places we would book ourselves."],["🧭","On-Trip Support","Real help, whenever you need it."]],about:"A travel studio crafting journeys, not just bookings."},
  hotel:{tag:"Stay somewhere worth writing home about.",feats:[["🛏️","Rooms With Soul","Comfort in every small detail."],["🍳","Breakfast, Properly","Hot, fresh, and unhurried."],["🛎️","Hosts, Not Staff","Hospitality the old way."]],about:"A hotel that treats every stay like the first."},
  realestate:{tag:"Homes, honestly sold.",feats:[["🏠","Verified Listings","Every property visited and checked."],["📑","Paperwork Handled","Loans, legal, registration — guided."],["🔑","Move-In Ready","Keys without the chaos."]],about:"A real-estate team that sells homes, not pressure."},
  interior:{tag:"Rooms that feel like you.",feats:[["🛋️","Full Interiors","Design to handover, one team."],["🎨","Material Library","Finishes you can touch before you choose."],["📐","3D Previews","See it before we build it."]],about:"An interior studio designing spaces around the people who live in them."},
  school:{tag:"Where bright futures begin.",feats:[["📚","Strong Foundations","Concepts first, marks follow."],["👩‍🏫","Teachers Who Care","Small classes, real attention."],["🏆","Beyond Books","Sports, arts, and confidence."]],about:"A school building curious minds and kind humans."},
  coaching:{tag:"Concepts clear. Ranks follow.",feats:[["🎯","Exam Strategy","Plans built around the paper pattern."],["📝","Weekly Tests","Progress you can measure."],["👨‍🏫","Mentor Access","Doubts cleared the same day."]],about:"A coaching institute obsessed with one thing — your result."},
  clinic:{tag:"Care that listens first.",feats:[["🩺","Honest Consultation","Time to explain, time to hear."],["📅","Easy Appointments","Book in seconds, wait in minutes."],["🧾","Transparent Pricing","Know the cost before the cure."]],about:"A clinic where medicine starts with listening."},
  dental:{tag:"Smiles, engineered gently.",feats:[["🦷","Painless First","Gentle techniques, zero dread."],["✨","Smile Design","Braces, aligners, and makeovers."],["🛡️","Sterile Always","Hospital-grade hygiene, visibly."]],about:"A dental studio making great smiles without the fear."},
  pharmacy:{tag:"Medicines, minus the worry.",feats:[["💊","Genuine Stock","Sourced only from authorised channels."],["🚀","Fast Delivery","At your door in under an hour."],["👨‍⚕️","Pharmacist Advice","Real guidance with every order."]],about:"A pharmacy that treats your health like its own reputation."},
  lawfirm:{tag:"Counsel you can stand on.",feats:[["⚖️","Senior Advocates","Decades in court, on your side."],["📄","Clear Agreements","Contracts in plain language."],["🤝","First Consult Free","Understand your position, free."]],about:"A law practice built on preparation, honesty, and results."},
  finance:{tag:"Money, made simple.",feats:[["📊","Tax & Filing","Accurate, on time, every time."],["💼","Business Advisory","CFO brains for growing companies."],["🔒","Fully Compliant","Zero notices, zero surprises."]],about:"A finance firm that keeps your books clean and your plans clear."},
  insurance:{tag:"Cover that actually covers.",feats:[["🛡️","Right Policy","Fitted to your life, not targets."],["⚡","Claims Support","We fight the paperwork for you."],["👨‍👩‍👧","Family First","Health, life, and everything between."]],about:"Insurance advisors paid in trust, not commissions."},
  startup:{tag:"Built to ship. Born to scale.",feats:[["🚀","MVP Fast","From idea to launch in weeks."],["🧠","Product Thinking","Features users actually need."],["📈","Fundraise Ready","Decks and demos that land."]],about:"A startup studio turning sharp ideas into running products."},
  saas:{tag:"Software your team will love.",feats:[["⚙️","Automate Work","Kill the repetitive tasks."],["📊","Live Dashboards","Numbers that update themselves."],["🔗","Integrations","Plays well with your stack."]],about:"A SaaS product built for teams who would rather be doing real work."},
  store:{tag:"Everything you love, one store.",feats:[["🛍️","Curated Range","Handpicked, quality-checked stock."],["🚚","Fast Dispatch","Packed with care, shipped same day."],["↩️","Easy Returns","Changed your mind? No drama."]],about:"An online store run like a neighbourhood shop — personal, honest, quick."},
  grocery:{tag:"Fresh to your doorstep.",feats:[["🥦","Farm Fresh","Picked this morning, at your door by noon."],["🧺","Daily Essentials","Everything on the list, every time."],["💰","Honest Prices","Market rates, no surprises."]],about:"A grocery service that shops like family."},
  electronics:{tag:"Tech, explained honestly.",feats:[["📱","Latest Range","All major brands, genuine billing."],["🔧","Service Backed","Repairs by certified hands."],["💳","Easy EMI","Take it home today."]],about:"An electronics store where advice comes before sales."},
  auto:{tag:"Your vehicle, expert hands.",feats:[["🔧","Full Service","Diagnostics to detailing, one roof."],["🛠️","Genuine Parts","Warranty on parts and labour."],["⏱️","Same-Day Delivery","Most jobs done before dinner."]],about:"A garage that treats your car like its own."},
  pets:{tag:"Because they are family.",feats:[["🐾","Vet Care","Gentle hands, honest advice."],["✂️","Grooming","Baths, cuts, and happy tails."],["🛒","Food & Toys","Nutrition and fun, curated."]],about:"A pet studio for the ones who love you unconditionally."},
  construction:{tag:"Built right. Built to last.",feats:[["🏗️","Turnkey Projects","Land to keys, single contract."],["📐","Engineered Plans","Structure first, shortcuts never."],["🧱","Quality Materials","Brands specified, bills shown."]],about:"A construction firm whose buildings are its visiting card."},
  portfolio:{tag:"Work that speaks first.",feats:[["🎨","Selected Work","Only the pieces that matter."],["🧑‍🎨","My Process","Brief to delivery, transparently."],["🤝","Open for Projects","One slot a month, done properly."]],about:"A portfolio of work made slowly, carefully, and on purpose."}
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
function setStep(n){document.querySelectorAll("#stepsBar .sb").forEach(function(el){el.classList.toggle("on",+el.getAttribute("data-sb")<=n);});}


/* ---------- preview lock: guard + blob (iframe kabhi parent ko load nahi karega) ---------- */
var PREVIEW_GUARD='<script>(function(){document.addEventListener("click",function(e){var a=e.target&&e.target.closest?e.target.closest("a"):null;if(a){var h=a.getAttribute("href")||"";if(h.charAt(0)!=="#"){e.preventDefault();e.stopPropagation();}}},true);document.addEventListener("submit",function(e){e.preventDefault();},true);window.open=function(){return null;};})();<\/script>';
function previewHTML(html){if(!html)return html;if(html.indexOf("<head>")>-1)return html.replace("<head>","<head>"+PREVIEW_GUARD);return PREVIEW_GUARD+html;}
function blobInto(frame,html){if(!frame)return;if(frame._u)URL.revokeObjectURL(frame._u);frame._u=URL.createObjectURL(new Blob([previewHTML(html)],{type:"text/html"}));frame.src=frame._u;}

/* ---------- create: type cards ---------- */
function renderTypes(){
  $("typeGrid").innerHTML=TYPES.map(function(t){
    return '<button class="type-card" data-type="'+t.id+'"><span class="tcost">'+t.cost+' credits</span><div class="tic">'+t.icon+'</div><h3>'+t.id+'</h3><p>'+t.line+'</p></button>';
  }).join("");
  document.querySelectorAll(".type-card").forEach(function(c){c.onclick=function(){startDraft(c.getAttribute("data-type"));};});
}
function defaultDetails(type){
  if(type==="Website"||type==="3D Website")return {name:"",category:"generic",color:"mono",colorHex:"",mode:"dark",sections:["Pricing"],reviews:"",instructions:""};
  if(type==="Web App")return {name:"",purpose:"Booking",features:["Login Screen","Dashboard"],color:"mono",mode:"dark",instructions:""};
  if(type==="AI Chatbot")return {name:"",business:"",tone:"Friendly",data:"",color:"mono",instructions:""};
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
  $("codeView").style.display=v==="code"?"block":"none";
}

/* ---------- setup form ---------- */
function field(label,inner){return '<div class="f-field"><label>'+label+'</label>'+inner+'</div>';}
function swatchHTML(sel){return '<div class="swatches">'+Object.keys(COLORS).map(function(k){return '<button class="sw'+(k===sel?" on":"")+'" data-color="'+k+'" style="background:'+COLORS[k]+'" title="'+k+'"></button>';}).join("")+'</div>';}
function hexToHsv(hex){hex=String(hex||"").replace("#","");if(hex.length===3)hex=hex.split("").map(function(x){return x+x;}).join("");if(!/^[0-9a-fA-F]{6}$/.test(hex))hex="F59E0B";var r=parseInt(hex.slice(0,2),16)/255,g=parseInt(hex.slice(2,4),16)/255,b=parseInt(hex.slice(4,6),16)/255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b),df=mx-mn,h=0;if(df){if(mx===r)h=((g-b)/df)%6;else if(mx===g)h=(b-r)/df+2;else h=(r-g)/df+4;h*=60;if(h<0)h+=360;}return {h:h,s:mx?df/mx:0,v:mx};}
function hsvToHex(h,s,v){var c=v*s,x=c*(1-Math.abs(((h/60)%2)-1)),m=v-c,r=0,g=0,b=0;if(h<60){r=c;g=x;}else if(h<120){r=x;g=c;}else if(h<180){g=c;b=x;}else if(h<240){g=x;b=c;}else if(h<300){r=x;b=c;}else{r=c;b=x;}function H(n){return ("0"+Math.round((n+m)*255).toString(16)).slice(-2).toUpperCase();}return "#"+H(r)+H(g)+H(b);}
var PRESET_HEX=["#F59E0B","#EDEDED","#22D3EE","#A78BFA","#F472B6","#34D399","#60A5FA","#EF4444","#F97316","#84CC16","#14B8A6","#111111"];
function pickerHTML(d){var cur=(d.colorHex||COLORS[d.color]||"#F59E0B").toUpperCase();return '<div class="cpick" id="cpick"><div class="cp-board" id="cpBoard"><div class="cp-dot" id="cpDot"></div></div><input type="range" class="cp-hue" id="cpHue" min="0" max="360" step="1"><div class="cp-row"><span class="cp-chip" id="cpChip"></span><input type="text" class="cp-hex" id="cpHex" value="'+cur+'" spellcheck="false"><span class="cp-rgb" id="cpRgb"></span></div><div class="cp-pal">'+PRESET_HEX.map(function(hx){return '<button class="cp-p" data-hex="'+hx+'" style="background:'+hx+'" title="'+hx+'"></button>';}).join("")+'</div><p class="cp-note">Drag on the board, slide the hue, or type a HEX code — any colour in the world.</p></div>';}
function initPicker(){var board=$("cpBoard");if(!board||!draft)return;var d=draft.details;var hsv=hexToHsv(d.colorHex||COLORS[d.color]||"#F59E0B");var hue=$("cpHue"),hexIn=$("cpHex"),dot=$("cpDot"),chip=$("cpChip"),rgb=$("cpRgb");hue.value=Math.round(hsv.h);
function paint(){var hex=hsvToHex(hsv.h,hsv.s,hsv.v);board.style.background="linear-gradient(to top,#000,rgba(0,0,0,0)),linear-gradient(to right,#fff,rgba(255,255,255,0)),hsl("+Math.round(hsv.h)+",100%,50%)";dot.style.left=(hsv.s*100)+"%";dot.style.top=((1-hsv.v)*100)+"%";chip.style.background=hex;if(document.activeElement!==hexIn)hexIn.value=hex;rgb.textContent="RGB "+parseInt(hex.slice(1,3),16)+" · "+parseInt(hex.slice(3,5),16)+" · "+parseInt(hex.slice(5,7),16);d.colorHex=hex;}
function fromEvent(e){var r=board.getBoundingClientRect();var x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;hsv.s=Math.min(1,Math.max(0,x));hsv.v=1-Math.min(1,Math.max(0,y));paint();}
board.addEventListener("pointerdown",function(e){try{board.setPointerCapture(e.pointerId);}catch(err){}fromEvent(e);function mv(ev){fromEvent(ev);}function up(){board.removeEventListener("pointermove",mv);board.removeEventListener("pointerup",up);}board.addEventListener("pointermove",mv);board.addEventListener("pointerup",up);});
hue.addEventListener("input",function(){hsv.h=+hue.value;paint();});
hexIn.addEventListener("change",function(){var v=hexIn.value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(v)){hsv=hexToHsv(v);hue.value=Math.round(hsv.h);}paint();});
document.querySelectorAll(".cp-p").forEach(function(b){b.onclick=function(){hsv=hexToHsv(b.getAttribute("data-hex"));hue.value=Math.round(hsv.h);paint();};});
paint();}
function checksHTML(options,selected){return '<div class="checks">'+options.map(function(o){return '<button class="chk'+(selected.indexOf(o)>-1?" on":"")+'" data-chk="'+o+'">'+o+'</button>';}).join("")+'</div>';}
function toggleHTML(a,b,sel){return '<div class="toggle-row"><button class="tgl'+(sel===a?" on":"")+'" data-tgl="'+a+'">'+a+'</button><button class="tgl'+(sel===b?" on":"")+'" data-tgl="'+b+'">'+b+'</button></div>';}
function renderForm(){
  var d=draft.details, t=draft.type, H="";
  $("setupTitle").textContent="Create — "+t;
  if(t==="Website"||t==="3D Website"){
    H+=field("Business / Site Name",'<input type="text" id="f_name" placeholder="e.g. Sharma Cafe" value="'+esc(d.name)+'">');
    H+=field("Category",'<select id="f_category">'+Object.keys(CATS).map(function(k){return '<option value="'+k+'"'+(d.category===k?" selected":"")+'>'+CATS[k]+'</option>';}).join("")+'</select>');
    H+=field("Colour",pickerHTML(d));
    H+=field("Theme",toggleHTML("dark","light",d.mode));
    H+=field("Sections",checksHTML(["Pricing","Testimonials","Gallery"],d.sections));
    H+=field("Your Customer Reviews — real ones only, one per line (Review — Name)",'<textarea id="f_reviews" placeholder="e.g. Best cafe in our area, loved the cold coffee — Priya S.">'+esc(d.reviews||"")+'</textarea>');
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
  initPicker();
  function renderFormKeep(){collectForm();renderForm();}
  window.__collectForm=collectForm;
}
function collectForm(){
  if(!draft)return; var d=draft.details;
  function v(id){var el=$(id);return el?el.value.trim():"";}
  if($("f_name"))d.name=v("f_name");
  if($("f_category"))d.category=$("f_category").value;
  if($("f_reviews"))d.reviews=$("f_reviews").value;
  if($("cpHex")){var hv=$("cpHex").value.trim();if(/^#?[0-9a-fA-F]{6}$/.test(hv))d.colorHex=("#"+hv.replace("#","")).toUpperCase();}
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
  else base=["Structure: Home, Features, About, Contact","Design: "+(d.colorHex||d.color||"mono")+" accent, "+(d.mode||"dark")+" theme","Sections: "+(((d.sections||[]).join(", "))||"core only"),"Mobile + speed QA checks","Final website package"];
  if(d.instructions)base.push("Your instructions applied: "+(d.instructions.length>60?d.instructions.slice(0,60)+"…":d.instructions));
  return base;
}
function detailChips(p){
  var d=p.details||{}, chips=[];
  function chip(k,v){if(v)chips.push("<span>"+k+": <b>"+esc(v)+"</b></span>");}
  if(p.type==="Website"||p.type==="3D Website"){chip("Category",CATS[d.category]||"");chip("Colour",d.colorHex||d.color);chip("Theme",d.mode);chip("Sections",(d.sections||[]).join(", "));}
  else if(p.type==="Web App"){chip("Purpose",d.purpose);chip("Features",(d.features||[]).join(", "));chip("Colour",d.color);chip("Theme",d.mode);}
  else if(p.type==="AI Chatbot"){chip("Business",d.business);chip("Tone",d.tone);chip("Facts",(d.data||"").split("\n").filter(Boolean).length+" lines");}
  else if(p.type==="AI Agent"){chip("Job",d.job);chip("Tools",(d.tools||[]).join(", "));}
  else{chip("Type",d.kind);chip("Topic",d.topic);chip("Tone",d.tone);chip("Length",d.length);}
  if(d.instructions)chip("Instructions",d.instructions.length>40?d.instructions.slice(0,40)+"…":d.instructions);
  return chips.join("");
}

/* ---------- generators ---------- */
function seedOf(name){var h=0;var t=String(name||"");for(var i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))>>>0;return h;}
function variantCSS(c,s){
  var v=".hbadge{display:inline-block;padding:6px 14px;border:1.5px solid "+c+";border-radius:99px;font-size:12.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px}";
  if(s.heroVar===1)v+=".hero{text-align:left;align-items:flex-start}.hero p{margin-left:0;margin-right:0}";
  if(s.heroVar===2)v+=".hero h1{font-size:clamp(46px,7.5vw,78px);letter-spacing:-.02em}";
  if(s.cardVar===1)v+=".card{border-top:3px solid "+c+"}";
  if(s.cardVar===2)v+=".card{border-radius:22px;box-shadow:0 14px 34px rgba(0,0,0,.16)}";
  if(s.btnVar===1)v+=".btn{border-radius:99px}";
  return v;
}
var TYPE_CSS="h1{line-height:1.08}h2{font-size:clamp(26px,3.5vw,36px);line-height:1.15}h3{font-size:18px;line-height:1.3}body{font-size:16.5px;line-height:1.65}";
var SPACE_CSS="section{max-width:1088px;padding:64px 24px}.grid{gap:16px}.card{padding:24px;border-radius:16px}input,select,textarea{border-radius:12px}";
var MOTION_CSS="@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}";
function heroBadgeHTML(s){return s.heroVar===2?'<span class="hbadge">'+esc(CATS[s.theme]||"Business")+'</span>':"";}

function siteFromDetails(p){
  var d=p.details;
  var revs=[];
  if(d.reviews){String(d.reviews).split(/\n+/).forEach(function(line){line=line.trim();if(!line)return;var parts=line.split(/\s+[—–-]\s+/);var nm=parts.length>1?parts.pop().trim():"Customer";var tx=parts.join(" — ").trim();if(tx)revs.push({text:tx.slice(0,200),name:(nm||"Customer").slice(0,40)});});revs=revs.slice(0,3);}
  var seed=seedOf(d.name||p.name);
  return {seed:seed,heroVar:seed%3,cardVar:Math.floor(seed/3)%3,btnVar:Math.floor(seed/9)%2,name:d.name||p.name,tagline:"Welcome to "+(d.name||p.name),theme:d.category||"generic",colorName:d.color||"mono",colorHex:(d.colorHex||""),dark:d.mode!=="light",fx3d:p.type==="3D Website",sections:{pricing:(d.sections||[]).indexOf("Pricing")>-1,testimonials:(d.sections||[]).indexOf("Testimonials")>-1,gallery:(d.sections||[]).indexOf("Gallery")>-1},reviews:revs};
}
function pageCSS(c,dark,extra){
  var T=deriveTokens(c,dark);
  var bg=T.bg,panel=T.surface,tx=T.ink,mut=T.muted,line=T.line;
  return ":root{--bg:"+T.bg+";--surface:"+T.surface+";--ink:"+T.ink+";--muted:"+T.muted+";--line:"+T.line+";--accent:"+T.accent+";--accent-btn:"+T.accentBtn+";--accent-ink:"+T.accentInk+";--accent-text:"+T.accentText+"}*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;background:"+bg+";color:"+tx+";line-height:1.6}"
  +"header{position:sticky;top:0;background:"+bg+";border-bottom:1px solid "+line+";padding:16px 24px;display:flex;justify-content:space-between;align-items:center;z-index:5}"
  +".logo{font-weight:800;font-size:20px}.logo span{color:"+T.accentText+"}nav a{color:"+mut+";text-decoration:none;margin-left:20px;font-size:14.5px}"
  +".hero{text-align:center;padding:88px 24px 64px;background:radial-gradient(560px 280px at 50% -40px,"+c+"26,transparent 70%)}"
  +".hero h1{font-size:clamp(34px,5.5vw,54px);letter-spacing:-.02em;line-height:1.08}.hero h1 em{font-style:normal;color:"+T.accentText+"}"
  +".hero p{color:"+mut+";font-size:17.5px;max-width:540px;margin:16px auto 28px}"
  +".btn{display:inline-block;background:"+T.accentBtn+";color:"+T.accentInk+";font-weight:700;padding:13px 26px;border-radius:999px;text-decoration:none;border:0;cursor:pointer;font-size:15px}.btn.g{background:transparent;color:"+tx+";border:1px solid "+line+";margin-left:10px}"
  +"section{max-width:1040px;margin:0 auto;padding:56px 24px}section h2{text-align:center;font-size:30px;margin-bottom:30px}"
  +".grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}@media(max-width:760px){.grid{grid-template-columns:1fr}}"
  +".card{background:"+panel+";border:1px solid "+line+";border-radius:16px;padding:24px}.card .ic{font-size:26px;margin-bottom:10px}.card h3{margin-bottom:5px}.card p{color:"+mut+";font-size:14.5px}"
  +".card.pop{border-color:"+c+"}.pr{font-size:30px;font-weight:800;margin:6px 0}.tile{font-size:44px;text-align:center;padding:30px 10px}"
  +".about p{color:"+mut+";max-width:640px;margin:0 auto;text-align:center;font-size:16.5px}"
  +"footer{border-top:1px solid "+line+";text-align:center;color:"+mut+";padding:28px;font-size:13.5px}"+(extra||"")+MOTION_CSS;
}
function gen3D(p){
  var s=p.site, th=THEMES[s.theme]||THEMES.generic, c=s.colorHex||COLORS[s.colorName]||COLORS.amber, cInt=c.replace("#","");
  var bpCta=blueprintFor(s.theme).cta;
  var feats=th.feats.map(function(f){return '<div class="card"><div class="ic">'+f[0]+'</div><h3>'+f[1]+'</h3><p>'+f[2]+'</p></div>';}).join("");
  var pricing=s.sections.pricing?'<section id="pricing"><h2>Pricing</h2><div class="grid"><div class="card"><h3>Essential</h3><div class="pr">₹999</div><p>Everything you need to start.</p></div><div class="card pop"><h3>Signature</h3><div class="pr">₹2,499</div><p>The full experience, most loved.</p></div><div class="card"><h3>Premium</h3><div class="pr">₹4,999</div><p>Top tier, no compromises.</p></div></div></section>':"";
  var testi=(s.sections.testimonials&&s.reviews&&s.reviews.length)?'<section id="love"><h2>Loved by customers</h2><div class="grid">'+s.reviews.map(function(r){return '<div class="card"><p>"'+esc(r.text)+'"</p><b>— '+esc(r.name)+'</b></div>';}).join("")+'</div></section>':"";
  var gallery=s.sections.gallery?'<section id="gallery"><h2>Gallery</h2><div class="grid"><div class="card tile">🌟</div><div class="card tile">🎨</div><div class="card tile">📸</div><div class="card tile">✨</div><div class="card tile">🏆</div><div class="card tile">💎</div></div></section>':"";
  var trust='<section id="trust" style="padding-top:34px"><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">'+["Transparent pricing","Personal attention","Quality checked twice","Easy to reach"].map(function(t){return '<span style="border:1px solid '+c+'66;border-radius:999px;padding:8px 16px;font-size:13.5px;font-weight:600">✓ '+t+'</span>';}).join("")+'</div></section>';
  var process='<section id="process"><h2>How it works</h2><div class="grid"><div class="card"><div class="ic">1</div><h3>Reach out</h3><p>Tell us what you need — walk in, call, or message.</p></div><div class="card"><div class="ic">2</div><h3>We plan it together</h3><p>You approve the plan and the full price before we start.</p></div><div class="card"><div class="ic">3</div><h3>Delivered with care</h3><p>Checked twice before it reaches you. That is the habit.</p></div></div></section>';
  var faq='<section id="faq"><h2>Questions</h2><div style="max-width:720px;margin:0 auto;text-align:left"><details style="margin-bottom:10px"><summary style="font-weight:700;cursor:pointer">How do I book or order?</summary><p style="opacity:.8;margin-top:6px">Use the contact section below — we reply fast and confirm everything before we begin.</p></details><details style="margin-bottom:10px"><summary style="font-weight:700;cursor:pointer">How does pricing work?</summary><p style="opacity:.8;margin-top:6px">Pricing depends on what you choose. You always see and approve the full price first — no hidden charges.</p></details><details><summary style="font-weight:700;cursor:pointer">Can I request something custom?</summary><p style="opacity:.8;margin-top:6px">Yes — tell us what you have in mind and we will plan it with you.</p></details></div></section>';
  var css="*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:'Manrope',system-ui,sans-serif;background:#05060A;color:#EDF0F5;line-height:1.6;overflow-x:hidden}"
  +"#gl{position:fixed;inset:0;width:100%;height:100%;z-index:0}"
  +".orb{position:fixed;border-radius:50%;filter:blur(70px);z-index:0;opacity:.5;animation:fl 11s ease-in-out infinite}.orb.a{width:340px;height:340px;background:"+c+";top:-90px;right:-70px}.orb.b{width:260px;height:260px;background:"+c+";bottom:-80px;left:-60px;animation-delay:-5s;opacity:.32}@keyframes fl{50%{transform:translateY(36px) scale(1.07)}}"
  +"header{position:sticky;top:0;z-index:5;display:flex;justify-content:space-between;align-items:center;padding:16px 26px;background:rgba(5,6,10,.55);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08)}"
  +".logo{font-weight:800;font-size:20px}.logo span{color:"+c+"}nav a{color:#9AA6B5;text-decoration:none;margin-left:20px;font-size:14.5px}nav a:hover{color:#fff}"
  +"main{position:relative;z-index:1}.hero{min-height:82vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:70px 24px}"
  +".hero .kick{font-size:12px;letter-spacing:.34em;text-transform:uppercase;color:"+c+";border:1px solid "+c+"66;padding:7px 14px;border-radius:999px;background:rgba(255,255,255,.03)}"
  +".hero h1{font-family:'Fraunces',Georgia,serif;font-size:clamp(38px,7vw,68px);line-height:1.06;letter-spacing:-.01em;margin:22px 0 8px;text-shadow:0 24px 60px rgba(0,0,0,.6)}.hero h1 em{font-style:normal;color:"+c+"}"
  +".hero p{color:#AAB4C4;font-size:17.5px;max-width:560px;margin:10px auto 30px}"
  +".btn{display:inline-block;background:"+deriveTokens(c,s.dark).accentBtn+";color:"+deriveTokens(c,s.dark).accentInk+";font-weight:800;padding:14px 30px;border-radius:999px;text-decoration:none;font-size:15px;box-shadow:0 14px 34px "+c+"44}.btn.g{background:rgba(255,255,255,.05);color:#EDF0F5;border:1px solid rgba(255,255,255,.16);margin-left:10px;box-shadow:none;backdrop-filter:blur(8px)}"
  +"section{max-width:1060px;margin:0 auto;padding:64px 24px}section h2{font-family:'Fraunces',Georgia,serif;text-align:center;font-size:32px;margin-bottom:30px}"
  +".grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}@media(max-width:760px){.grid{grid-template-columns:1fr}}"
  +".card{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:26px;backdrop-filter:blur(12px);transition:.3s}.card:hover{transform:translateY(-6px);border-color:"+c+"88}.card .ic{font-size:27px;margin-bottom:10px}.card p{color:#9AA6B5;font-size:14.5px}.card.pop{border-color:"+c+"}.pr{font-size:30px;font-weight:800;margin:6px 0}.tile{font-size:44px;text-align:center;padding:30px 10px}"
  +".about p{color:#AAB4C4;max-width:640px;margin:0 auto;text-align:center;font-size:16.5px}"
  +"footer{position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.08);text-align:center;color:#8A94A6;padding:28px;font-size:13.5px}";
  var three='<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script><script>try{if(window.THREE){var cv=document.getElementById("gl");var rn=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});var sc=new THREE.Scene();var cm=new THREE.PerspectiveCamera(55,innerWidth/innerHeight,.1,100);cm.position.z=8;var AC=0x'+cInt+';var knot=new THREE.Mesh(new THREE.TorusKnotGeometry(1.7,.52,180,26),new THREE.MeshStandardMaterial({color:AC,metalness:.85,roughness:.25}));knot.position.x=2.6;sc.add(knot);var pg=new THREE.BufferGeometry();var N=420,pos=new Float32Array(N*3);for(var i=0;i<N*3;i++)pos[i]=(Math.random()-.5)*26;pg.setAttribute("position",new THREE.BufferAttribute(pos,3));var pts=new THREE.Points(pg,new THREE.PointsMaterial({color:AC,size:.045,transparent:true,opacity:.85}));sc.add(pts);sc.add(new THREE.AmbientLight(0xffffff,.55));var pl=new THREE.PointLight(AC,1.6,60);pl.position.set(-4,3,6);sc.add(pl);var mx=0,my=0;addEventListener("pointermove",function(e){mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5);});function rs(){rn.setSize(innerWidth,innerHeight);cm.aspect=innerWidth/innerHeight;cm.updateProjectionMatrix();}addEventListener("resize",rs);rs();var orbs=document.querySelectorAll(".orb");orbs.forEach(function(o){o.style.opacity=".18";});(function an(){requestAnimationFrame(an);knot.rotation.x+=.004;knot.rotation.y+=.006;pts.rotation.y+=.0006;cm.position.x+=((mx*1.6)-cm.position.x)*.04;cm.position.y+=((-my*1.1)-cm.position.y)*.04;cm.lookAt(1,0,0);rn.render(sc,cm);})();}}catch(e){}</script>';
  css+=TYPE_CSS;
  css+=SPACE_CSS;
  css+=MOTION_CSS;
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(s.name)+' — 3D</title><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Manrope:wght@400;600;800&display=swap" rel="stylesheet"><style>'+css+variantCSS(c,s)+'</style></head><body>'
  +'<canvas id="gl"></canvas><div class="orb a"></div><div class="orb b"></div>'
  +'<header><div class="logo">'+esc(s.name)+'<span>.</span></div><nav><a href="#features">Features</a><a href="#about">About</a>'+(s.sections.pricing?'<a href="#pricing">Pricing</a>':"")+'<a href="#contact">Contact</a></nav></header>'
  +'<main><div class="hero hv'+s.heroVar+'"><span class="kick">Immersive · 3D</span><h1>'+esc(s.name)+'<br><em>'+esc(th.tag)+'</em></h1><p>'+esc(th.about)+'</p><div><a class="btn" href="#contact">'+esc(bpCta)+'</a><a class="btn g" href="#features">Explore</a></div></div>'
  +trust
  +'<section id="features"><h2>What we do</h2><div class="grid">'+feats+'</div></section>'
  +signatureModule(s.theme)
  +process+pricing+gallery
  +'<section class="about" id="about"><h2>About</h2><p>'+esc(th.about)+'</p></section>'
  +testi+faq
  +'<section id="contact" style="text-align:center"><h2>Visit us</h2><p style="color:#AAB4C4">Walk in, call, or message — we reply fast.</p><div style="margin-top:20px"><a class="btn" href="#contact">Contact Now</a></div></section></main>'
  +'<footer>© 2026 '+esc(s.name)+' · 3D experience by YugLab</footer>'+three+'</body></html>';
}
function genWebsite(p){
  var s=p.site, th=THEMES[s.theme]||THEMES.generic, c=s.colorHex||COLORS[s.colorName]||COLORS.amber;
  var bpCta=blueprintFor(s.theme).cta;
  var fx="body{font-family:'Manrope',system-ui,sans-serif}h1,h2{font-family:'Fraunces',Georgia,serif}"+TYPE_CSS+SPACE_CSS+(s.fx3d?".hero h1{transform:perspective(600px) rotateX(4deg);text-shadow:0 18px 40px rgba(0,0,0,.45)}.card{transition:.25s}.card:hover{transform:translateY(-6px) perspective(500px) rotateX(3deg)}":"");
  var feats=th.feats.map(function(f){return '<div class="card"><div class="ic">'+f[0]+'</div><h3>'+f[1]+'</h3><p>'+f[2]+'</p></div>';}).join("");
  var pricing=s.sections.pricing?'<section id="pricing"><h2>Pricing</h2><div class="grid"><div class="card"><h3>Essential</h3><div class="pr">₹999</div><p>Everything you need to start.</p></div><div class="card pop"><h3>Signature</h3><div class="pr">₹2,499</div><p>The full experience, most loved.</p></div><div class="card"><h3>Premium</h3><div class="pr">₹4,999</div><p>Top tier, no compromises.</p></div></div></section>':"";
  var testi=(s.sections.testimonials&&s.reviews&&s.reviews.length)?'<section id="love"><h2>Loved by customers</h2><div class="grid">'+s.reviews.map(function(r){return '<div class="card"><p>"'+esc(r.text)+'"</p><b>— '+esc(r.name)+'</b></div>';}).join("")+'</div></section>':"";
  var gallery=s.sections.gallery?'<section id="gallery"><h2>Gallery</h2><div class="grid"><div class="card tile">🌟</div><div class="card tile">🎨</div><div class="card tile">📸</div><div class="card tile">✨</div><div class="card tile">🏆</div><div class="card tile">💎</div></div></section>':"";
  var trust='<section id="trust" style="padding-top:34px"><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">'+["Transparent pricing","Personal attention","Quality checked twice","Easy to reach"].map(function(t){return '<span style="border:1px solid '+c+'66;border-radius:999px;padding:8px 16px;font-size:13.5px;font-weight:600">✓ '+t+'</span>';}).join("")+'</div></section>';
  var process='<section id="process"><h2>How it works</h2><div class="grid"><div class="card"><div class="ic">1</div><h3>Reach out</h3><p>Tell us what you need — walk in, call, or message.</p></div><div class="card"><div class="ic">2</div><h3>We plan it together</h3><p>You approve the plan and the full price before we start.</p></div><div class="card"><div class="ic">3</div><h3>Delivered with care</h3><p>Checked twice before it reaches you. That is the habit.</p></div></div></section>';
  var faq='<section id="faq"><h2>Questions</h2><div style="max-width:720px;margin:0 auto;text-align:left"><details style="margin-bottom:10px"><summary style="font-weight:700;cursor:pointer">How do I book or order?</summary><p style="opacity:.8;margin-top:6px">Use the contact section below — we reply fast and confirm everything before we begin.</p></details><details style="margin-bottom:10px"><summary style="font-weight:700;cursor:pointer">How does pricing work?</summary><p style="opacity:.8;margin-top:6px">Pricing depends on what you choose. You always see and approve the full price first — no hidden charges.</p></details><details><summary style="font-weight:700;cursor:pointer">Can I request something custom?</summary><p style="opacity:.8;margin-top:6px">Yes — tell us what you have in mind and we will plan it with you.</p></details></div></section>';
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(s.name)+'</title><link href=\"https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,800&family=Manrope:wght@400;600;800&display=swap\" rel=\"stylesheet\"><style>'+pageCSS(c,s.dark,fx+variantCSS(c,s))+'</style></head><body>'
  +'<header><div class="logo">'+esc(s.name)+'<span>.</span></div><nav><a href="#features">Features</a><a href="#about">About</a>'+(s.sections.pricing?'<a href="#pricing">Pricing</a>':"")+'<a href="#contact">Contact</a></nav></header>'
  +'<div class="hero hv'+s.heroVar+'">'+heroBadgeHTML(s)+'<h1>'+esc(s.name)+'<br><em>'+esc(s.tagline)+'</em></h1><p>'+esc(th.tag)+'</p><a class="btn" href="#contact">'+esc(bpCta)+'</a><a class="btn g" href="#features">Explore</a></div>'
  +trust
  +'<section id="features"><h2>What we do</h2><div class="grid">'+feats+'</div></section>'
  +signatureModule(s.theme)
  +process+pricing+gallery
  +'<section class="about" id="about"><h2>About</h2><p>'+esc(th.about)+'</p></section>'
  +testi+faq
  +'<section id="contact" style="text-align:center"><h2>Visit us</h2><p style="color:inherit;opacity:.75">Walk in, call, or message — we reply fast.</p><div style="margin-top:20px"><a class="btn" href="#contact">Contact Now</a></div></section>'
  +'<footer>© 2026 '+esc(s.name)+' · Made with pride in India</footer><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script><script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script><script>try{if(window.gsap&&window.ScrollTrigger&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.registerPlugin(ScrollTrigger);gsap.utils.toArray("section,.hero h1,.hero p").forEach(function(el){gsap.from(el,{y:26,opacity:0,duration:.8,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 88%"}});});}}catch(e){}</script></body></html>';
}
function genApp(p){
  var d=p.details, c=COLORS[d.color||"mono"], dark=d.mode!=="light";
  var feats=(d.features||[]).map(function(f){return '<div class="acard"><b>'+esc(f)+'</b><span>Active module</span></div>';}).join("");
  var login=(d.features||[]).indexOf("Login Screen")>-1;
  var js='<script>function go(){document.getElementById("login").style.display="none";document.getElementById("dash").style.display="block";}function book(){var b=document.getElementById("bk");b.textContent="✔ Booked — see you soon!";b.style.color="'+c+'";}<\/script>';
  js+='<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"><\/script><script>try{if(window.Chart){var x=document.getElementById("ch");if(x)new Chart(x,{type:"line",data:{labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],datasets:[{data:[12,19,15,25,22,30,28],borderColor:"'+c+'",backgroundColor:"'+c+'33",fill:true,tension:.42,pointRadius:0}]},options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}},responsive:true}});}}catch(e){}<\/script>';
  var loginHTML=login?'<div id="login" class="screen"><h2>Welcome back</h2><p class="mut">Login to '+(esc(d.name||"App"))+'</p><input placeholder="Email or phone"><input type="password" placeholder="Password"><button class="btn" style="width:100%" onclick="go()">Login</button></div>':"";
  var dash='<div id="dash" class="screen"'+(login?' style="display:none"':"")+'><h2>'+(d.purpose||"App")+' Dashboard</h2><canvas id="ch" height="110" style="width:100%;margin:6px 0 4px"></canvas><div class="stats"><div class="stat"><b>128</b><span>Today</span></div><div class="stat"><b>96%</b><span>On time</span></div><div class="stat"><b>4.9★</b><span>Rating</span></div></div><div class="alist">'+feats+'</div><button class="btn" style="width:100%;margin-top:14px" onclick="book()">Book Now</button><p id="bk" class="mut" style="text-align:center;margin-top:10px"></p></div>';
  var css="body{display:flex;justify-content:center;padding:26px 14px}.phone{width:380px;max-width:100%;background:"+(dark?"#11141B":"#fff")+";border:1px solid "+(dark?"#232A38":"#E6E3DC")+";border-radius:28px;padding:24px;box-shadow:0 30px 60px rgba(0,0,0,.35)}.screen h2{font-size:22px;margin-bottom:6px}.mut{opacity:.65;font-size:14px}.phone input{width:100%;padding:12px;border-radius:12px;border:1px solid "+(dark?"#232A38":"#E6E3DC")+";background:transparent;color:inherit;margin:8px 0;font-size:14.5px}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:16px 0}.stat{background:"+(dark?"#171B25":"#F4F2ED")+";border-radius:12px;padding:12px;text-align:center}.stat b{display:block;font-size:19px;color:"+c+"}.stat span{font-size:11.5px;opacity:.65}.acard{display:flex;justify-content:space-between;border:1px solid "+(dark?"#232A38":"#E6E3DC")+";border-radius:12px;padding:12px 14px;margin-bottom:9px;font-size:14px}.acard span{opacity:.6;font-size:12.5px}header{display:none}";
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(d.name||"App")+'</title><style>'+pageCSS(c,dark,css)+'</style></head><body><div class="phone"><div class="logo" style="margin-bottom:18px">'+esc(d.name||"App")+'<span>.</span></div>'+loginHTML+dash+'</div>'+js+'</body></html>';
}
function genChatbot(p){
  var d=p.details, c=COLORS[d.color||"mono"];
  var facts=(d.data||"").split("\n").map(function(x){return x.trim();}).filter(Boolean);
  var factsJSON=JSON.stringify(facts), tone=d.tone||"Friendly";
  var greet=tone==="Hinglish Mix"?"Namaste! Main "+(d.name||"Assistant")+" hoon. Kuch bhi puchiye — price, timing, delivery!":(tone==="Professional"?"Good day. I am "+(d.name||"Assistant")+". How may I assist you?":"Hi there! I am "+(d.name||"Assistant")+" — ask me anything about "+(d.business||"us")+"!");
  var js='<script>var FACTS='+factsJSON+';function ans(q){q=q.toLowerCase();var words=q.split(/[^a-z0-9]+/).filter(function(w){return w.length>2;});var best="",score=0;FACTS.forEach(function(f){var s=0;words.forEach(function(w){if(f.toLowerCase().indexOf(w)>-1)s++;});if(s>score){score=s;best=f;}});if(score>0)return best;if(/price|cost|rate|charge/.test(q))return "Our team will confirm exact pricing — meanwhile, anything else I can help with?";if(/time|open|close|hour/.test(q))return "Share your preferred time and we will confirm availability right away.";if(/contact|phone|call/.test(q))return "You can reach the team directly through the Contact section — they reply fast.";return "I can answer from our business information. Try asking about prices, timings, or services.";}function send(){var i=document.getElementById("inp");var t=i.value.trim();if(!t)return;add(t,"me");i.value="";setTimeout(function(){add(ans(t),"bot");},450);}function add(t,w){var m=document.getElementById("msgs");var d=document.createElement("div");d.className="m "+w;d.textContent=t;m.appendChild(d);m.scrollTop=m.scrollHeight;}function chip(t){document.getElementById("inp").value=t;send();}<\/script>';
  var css=".wrap{max-width:520px;margin:0 auto;padding:30px 16px}.box{border:1px solid "+(true?"#232A38":"")+";background:#11141B;border-radius:20px;overflow:hidden}.bhead{background:"+c+";color:#14100a;padding:16px 18px;font-weight:800}.msgs{height:340px;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:9px}.m{max-width:82%;padding:10px 13px;border-radius:13px;font-size:14.5px}.m.bot{background:#1A1F2A;color:#EDF0F5;align-self:flex-start}.m.me{background:"+c+";color:#14100a;align-self:flex-end}.chips{display:flex;gap:8px;padding:0 16px 12px;flex-wrap:wrap}.chip{border:1px solid #2A3242;background:transparent;color:#EDF0F5;border-radius:999px;padding:6px 12px;font-size:13px;cursor:pointer}.brow{display:flex;gap:8px;padding:14px;border-top:1px solid #232A38}.brow input{flex:1;background:#0C0E13;border:1px solid #2A3242;border-radius:999px;color:#fff;padding:11px 15px;outline:none}header{display:none}body{background:#0C0E13;color:#EDF0F5}";
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(d.name||"Chatbot")+'</title><style>'+css+MOTION_CSS+'</style></head><body><div class="wrap"><div class="box"><div class="bhead">💬 '+esc(d.name||"Assistant")+' · '+(esc(d.business||""))+'</div><div class="msgs" id="msgs"><div class="m bot">'+esc(greet)+'</div></div><div class="chips"><button class="chip" onclick="chip(\'What are your prices?\')">Prices</button><button class="chip" onclick="chip(\'What are your timings?\')">Timings</button><button class="chip" onclick="chip(\'How do I contact you?\')">Contact</button></div><div class="brow"><input id="inp" placeholder="Type your question…" onkeydown="if(event.key===\'Enter\')send()"><button class="btn" onclick="send()">Send</button></div></div><p style="text-align:center;opacity:.55;font-size:12.5px;margin-top:12px">Powered by YugLab · Answers from business data</p></div>'+js+'</body></html>';
}
function genAgent(p){
  var d=p.details, stepsJSON=JSON.stringify(["Reading the task","Planning steps",((d.tools||[]).indexOf("Web Search")>-1?"Searching the web":"Reviewing inputs"),"Drafting the output","Self-checking quality","Final report ready"]);
  var js='<script>var STEPS='+stepsJSON+';var JOB='+JSON.stringify(d.job||"Research")+';function run(){var t=document.getElementById("task").value.trim()||"your task";var log=document.getElementById("log");var res=document.getElementById("res");log.innerHTML="";res.style.display="none";var i=0;function next(){if(i>0)log.children[i-1].innerHTML="✔ "+STEPS[i-1];if(i>=STEPS.length){res.style.display="block";document.getElementById("resText").textContent="Completed: "+t+" — structured output prepared with sources and next actions ("+JOB+" mode).";return;}var d2=document.createElement("div");d2.className="step";d2.textContent="⏳ "+STEPS[i];log.appendChild(d2);i++;setTimeout(next,650);}next();}<\/script>';
  var css=".wrap{max-width:640px;margin:0 auto;padding:34px 16px}.box{background:#11141B;border:1px solid #232A38;border-radius:20px;padding:24px}.step{padding:8px 0;border-bottom:1px dashed #232A38;font-size:14.5px;color:#EDF0F5}.rrow{display:flex;gap:9px}.rrow input{flex:1;background:#0C0E13;border:1px solid #2A3242;border-radius:12px;color:#fff;padding:12px 14px;outline:none}body{background:#0C0E13;color:#EDF0F5}header{display:none}.rescard{margin-top:18px;background:#171208;border:1px solid #3a2c10;border-radius:14px;padding:16px;font-size:14.5px}";
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(d.name||"Agent")+'</title><style>'+pageCSS("#EDEDED",true,css)+'</style></head><body><div class="wrap"><div class="box"><h2 style="margin-bottom:4px">🤖 '+esc(d.name||"Agent")+'</h2><p style="opacity:.65;margin-bottom:16px">'+esc(d.job||"Research")+' agent · Tools: '+esc((d.tools||[]).join(", ")||"core")+'</p><div class="rrow"><input id="task" placeholder="Give the agent a task…"><button class="btn" onclick="run()">Run</button></div><div id="log" style="margin-top:14px"></div><div id="res" class="rescard" style="display:none"><b>Result</b><p id="resText" style="margin-top:6px"></p></div></div></div>'+js+'</body></html>';
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
  return '<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>'+esc(d.name||kind)+'</title><style>'+pageCSS("#EDEDED",true,css)+'</style></head><body><div class="doc"><h1>'+esc(heads[0])+'</h1><div class="meta">'+esc(kind)+' · '+esc(tone)+' tone · via YugLab</div><pre>'+esc(text)+'</pre></div></body></html>';
}
function generate(p){
  if(p.type==="Web App")return genApp(p);
  if(p.type==="AI Chatbot")return genChatbot(p);
  if(p.type==="AI Agent")return genAgent(p);
  if(p.type==="Content")return genContent(p);
  p.site=siteFromDetails(p); return p.type==="3D Website"?gen3D(p):genWebsite(p);
}

/* ---------- contrast helpers (v1.5 Phase 3.5) — WCAG relative luminance ---------- */
function relLum(hex){
  var h=String(hex||"").replace("#",""); if(h.length===3)h=h.split("").map(function(x){return x+x;}).join("");
  if(h.length!==6||/[^0-9a-fA-F]/.test(h))return null;
  var f=function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
  return 0.2126*f(parseInt(h.substr(0,2),16))+0.7152*f(parseInt(h.substr(2,2),16))+0.0722*f(parseInt(h.substr(4,2),16));
}
function contrastRatio(a,b){
  var x=relLum(a),y=relLum(b); if(x===null||y===null)return null;
  return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05);
}
function bestOnAccent(hex){

  var d=contrastRatio("#14100A",hex),w=contrastRatio("#FFFFFF",hex);
  return (w!==null&&d!==null&&w>d)?"#FFFFFF":"#14100A";
}
/* Phase 5.1 — 7-token colour system: HEX -> derived tokens + luminance guard */
function mixHex(a,b,t){function p(h){return [parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];}var x=p(a),y=p(b);var o=x.map(function(v,k){return Math.round(v+(y[k]-v)*t);});return "#"+o.map(function(v){return ("0"+v.toString(16)).slice(-2);}).join("").toUpperCase();}
function accentTextFor(accent,bg){var target=relLum(bg)>0.35?"#000000":"#FFFFFF";var cur=accent;if(contrastRatio(cur,bg)>=4.5)return cur.toUpperCase();for(var i=1;i<=12;i++){cur=mixHex(accent,target,i/12);if(contrastRatio(cur,bg)>=4.5)return cur;}return target;}
function deriveTokens(c,dark){var bg=dark?"#0C0E13":"#FAFAF8";var acc=c.toUpperCase();var btn=acc;if(contrastRatio(bestOnAccent(btn),btn)<4.5){var dir=bestOnAccent(btn)==="#FFFFFF"?"#000000":"#FFFFFF";for(var i=1;i<=12;i++){btn=mixHex(acc,dir,i/12);if(contrastRatio(bestOnAccent(btn),btn)>=4.5)break;}}return {bg:bg,surface:dark?"#141821":"#FFFFFF",ink:dark?"#EDF0F5":"#16181D",muted:dark?"#9AA6B5":"#5B6472",line:dark?"#232A38":"#E6E3DC",accent:acc,accentBtn:btn,accentInk:bestOnAccent(btn),accentText:accentTextFor(acc,bg)};}

function blueprintFor(cat){
  var R=(typeof window!=="undefined"&&window.YUG_RULES)||null;
  var bp=R&&R.blueprints?R.blueprints[cat]:null;
  return bp||{archetype:"other",intent:"",cta:"Get Started",modules:[],noInvent:[]};
}

/* ---------- validator core (v1.5 Phase 3.4) — rules.js (YUG_RULES) se chalta hai ---------- */
function validateBuild(p, html){
  var out=String(html||""), errs=[];
  var R=(typeof window!=="undefined"&&window.YUG_RULES)||null;
  var S=R&&p?R.types[p.type]:null;
  if(!S){ /* legacy/unknown type: sirf basic sanity, hard fail nahi */
    if(out.length<500)errs.push("output too small: "+out.length);
    return {ok:errs.length===0,errors:errs,legacy:true};
  }
  if(out.length<(S.gates.minBytes||0))errs.push("output too small: "+out.length+" < "+S.gates.minBytes);
  S.required.forEach(function(m){if(out.indexOf(m)===-1)errs.push("missing required: "+m);});
  S.forbidden.forEach(function(m){if(out.indexOf(m)>-1)errs.push("forbidden present: "+m);});
  var low=out.toLowerCase();
  (R.universal.forbiddenText||[]).forEach(function(m){if(low.indexOf(m)>-1)errs.push("forbidden text: "+m);});
  if(R.universal.noProviderNames){
    (R.universal.providerPatterns||[]).forEach(function(m){if(low.indexOf(m)>-1)errs.push("provider name leaked: "+m);});
    if(/\bgpt-[0-9]/.test(low))errs.push("provider name leaked: gpt-*");
  }
  if(S.gates.h1ExactlyOne){
    var h1=(out.match(/<h1[\s>]/g)||[]).length;
    if(h1!==1)errs.push("h1 count "+h1+" (exactly 1 required)");
    var ih=out.indexOf("<header"),ihero=out.indexOf('class="hero'),ift=out.indexOf("<footer");
    if(ih>-1&&ihero>-1&&ift>-1&&!(ih<ihero&&ihero<ift))errs.push("section order broken (header < hero < footer)");
  }
  if(R.universal.externalLinksAllowed===false){
    var bad=[];var re=/<a\s[^>]*href="([^"]*)"/gi,m;
    while((m=re.exec(out))){if(m[1].charAt(0)!=="#")bad.push(m[1]);}
    if(bad.length)errs.push("external links not allowed: "+bad.slice(0,3).join(", "));
  }
  var imgTags=out.match(/<img\b[^>]*>/gi)||[];
  imgTags.forEach(function(tag){
    var sm=tag.match(/src="([^"]*)"/i);
    if(sm&&/^(https?:)?\/\//i.test(sm[1]))errs.push("hotlinked image not allowed: "+sm[1].slice(0,60));
    if(!/width=/.test(tag)||!/height=/.test(tag))errs.push("img without dimensions (width+height required)");
    if(!/loading=/.test(tag))errs.push("img without loading attribute (lazy required)");
  });
  var bgUrls=out.match(/url\(\s*["']?https?:\/\/[^)]*\)/gi);
  if(bgUrls&&bgUrls.length)errs.push("hotlinked CSS background not allowed");
  if(S.gates.forms===false&&/<form[\s>]/i.test(out))errs.push("form element not allowed for this type");
  var _bp=R.blueprints&&p&&p.details?R.blueprints[p.details.category]:null;
  var _dm=_bp?(_bp.disclaimerMarker||(_bp.requiresDisclaimer?"not medical advice":null)):null;
  if(_dm&&out.indexOf(_dm)===-1)errs.push("disclaimer missing: "+_dm);
  var userText="";
  if(p&&p.details){for(var _k in p.details){var _v=p.details[_k];if(typeof _v==="string")userText+="\n"+_v;else if(Array.isArray(_v))_v.forEach(function(x){if(typeof x==="string")userText+="\n"+x;});}}
  var visText=out.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<style[\s\S]*?<\/style>/g," ").replace(/<[^>]+>/g," ");
  var CLAIMRULES=[[/((?<![\d,])\d{2,}\+?\s*(happy\s+)?(customers|clients|students|patients|members|projects|users))\b/i,"invented count claim"],[/\b(no\.?\s*1|#1|best in (the )?(city|india|world)|award[- ]winning|top[- ]rated)\b/i,"invented superlative claim"],[/\b\d+(\.\d+)?\s*stars?\b|\brated\s+\d+(\.\d+)?/i,"invented rating claim"],[/\bguaranteed\s+(results?|success|placement|selection|returns?)\b/i,"invented guarantee claim"],[/\bsince\s+(19|20)\d{2}\b/i,"invented founding-year claim"]];
  CLAIMRULES.forEach(function(cr){var re=new RegExp(cr[0].source,"gi");var m;while((m=re.exec(visText))){if(userText.indexOf(m[0])===-1){errs.push(cr[1]+": "+m[0]);break;}}});
  if(S.gates.typography){
    var styleText=(out.match(/<style>([\s\S]*?)<\/style>/g)||[]).join(" ");
    var ALLOWED_FONTS=["Fraunces","Manrope","system-ui","-apple-system","Segoe UI","Roboto","Georgia","serif","sans-serif","monospace"];
    var ffRe=/font-family:([^;}]+)/g, fm2;
    while((fm2=ffRe.exec(styleText))){var fams=fm2[1].split(",").map(function(x){return x.trim().replace(/^["']|["']$/g,"");});for(var fi=0;fi<fams.length;fi++){if(ALLOWED_FONTS.indexOf(fams[fi])===-1)errs.push("font not in type system: "+fams[fi]);}}
    if(p.type==="Website"&&out.indexOf("clamp(34px,5.5vw,54px)")===-1)errs.push("display type scale missing (locked clamp)");
    var lhMatches=out.match(/body\{[^}]*line-height:([0-9.]+)/g);
    if(lhMatches){var lastLh=parseFloat((lhMatches[lhMatches.length-1].match(/line-height:([0-9.]+)/)||[])[1]);if(lastLh&&lastLh<1.5)errs.push("body line-height "+lastLh+" (< 1.5)");}
  }
  if(S.gates.layout){
    if(out.indexOf("section{max-width:1088px;padding:64px 24px}")===-1)errs.push("layout lock missing (container/section rhythm)");
    var radRe=/border-radius:(\d+)px/g, rm;
    var RAD_OK={12:1,16:1,22:1,99:1,999:1};
    while((rm=radRe.exec(out))){if(!RAD_OK[rm[1]])errs.push("radius off-lock: "+rm[1]+"px");}
  }
  if(S.gates.motion){
    if(out.indexOf("@media (prefers-reduced-motion: reduce)")===-1)errs.push("reduced-motion path missing");
    if(/gsap\.(from|to|fromTo)/.test(out)&&out.indexOf('matchMedia("(prefers-reduced-motion: reduce)")')===-1)errs.push("GSAP without reduced-motion guard");
    var codeText=((out.match(/<script>([\s\S]*?)<\/script>/g)||[]).join(" ")+(out.match(/<style>([\s\S]*?)<\/style>/g)||[]).join(" ")).toLowerCase();
    ["bounce","elastic","repeat:-1"].forEach(function(bad){if(codeText.indexOf(bad)>-1)errs.push("banned motion pattern: "+bad);});
  }
  if(S.spine){
    var lastIdx=-1;
    S.spine.forEach(function(sec){
      var markers=Array.isArray(sec.marker)?sec.marker:[sec.marker], idx=-1;
      markers.forEach(function(mk){var i=out.indexOf(mk); if(i>-1&&(idx===-1||i<idx))idx=i;});
      if(idx===-1){ if(sec.required)errs.push("spine section missing: "+sec.key); }
      else{ if(idx<lastIdx)errs.push("spine order broken at: "+sec.key); else lastIdx=idx; }
    });
  }
  var warns=[];
  if(S.gates.maxBytes){
    if(out.length>S.gates.maxBytes)errs.push("page weight "+out.length+" bytes exceeds budget "+S.gates.maxBytes);
    else if(out.length>=S.gates.maxBytes*0.8)warns.push("page weight "+out.length+" near budget "+S.gates.maxBytes);
  }
  if(S.gates.maxExternal!=null){
    var extN=((out.match(/<script[^>]+src="https?:/g)||[]).length)+((out.match(/<link[^>]+href="https?:/g)||[]).length);
    if(extN>S.gates.maxExternal)errs.push("external requests "+extN+" exceed budget "+S.gates.maxExternal);
  }
  if(p&&p.details&&p.details.name&&p.details.name.length>60)warns.push("business name is long ("+p.details.name.length+" chars) — shorter names read better");
  if(R.universal.domChecks){
    var idSeen={}, idDups=[], idRe=/id="([^"]+)"/g, im;
    while((im=idRe.exec(out))){ if(idSeen[im[1]]&&idDups.indexOf(im[1])===-1)idDups.push(im[1]); idSeen[im[1]]=1; }
    idDups.forEach(function(id){errs.push("duplicate id: "+id);});
    ["div","section","header","footer","main","nav","button"].forEach(function(tag){
      var open=(out.match(new RegExp("<"+tag+"[\\s>]","g"))||[]).length;
      var close=(out.match(new RegExp("</"+tag+">","g"))||[]).length;
      if(open!==close)errs.push("unbalanced <"+tag+"> (open "+open+", close "+close+")");
    });
    if(!/name="viewport"/.test(out))errs.push("viewport meta missing");
    var imgRe=/<img\b[^>]*>/gi, ig;
    while((ig=imgRe.exec(out))){ if(!/alt=/.test(ig[0]))errs.push("img without alt attribute"); }
    if(out.indexOf("100vw")>-1)warns.push("100vw used — horizontal overflow risk on scrollbars");
    var fw=out.match(/(?<!max-)(?<!min-)width:\s*([5-9]\d\d|\d{4,})px/g);
    if(fw)warns.push("fixed pixel widths >480px found ("+fw.length+") — check mobile overflow");
  }
  if(S.gates.contrast){
    var bm=out.match(/body\{[^}]*background:(#[0-9a-fA-F]{3,6})[^}]*color:(#[0-9a-fA-F]{3,6})/);
    if(bm){
      var bodyRatio=contrastRatio(bm[2],bm[1]);
      if(bodyRatio!==null&&bodyRatio<4.5)errs.push("body text contrast "+bodyRatio.toFixed(2)+":1 (< 4.5)");
      var tm=out.match(/\.btn\{[^}]*background:(#[0-9a-fA-F]{3,6});color:(#[0-9a-fA-F]{3,6})/);
      if(tm){
        var btnRatio=contrastRatio(tm[2],tm[1]);
        if(btnRatio!==null&&btnRatio<4.5)errs.push("button text contrast "+btnRatio.toFixed(2)+":1 (< 4.5)");
        var tokM=out.match(/--accent-text:(#[0-9a-fA-F]{6})/);
        if(tokM){var atRatio=contrastRatio(tokM[1],bm[1]);if(atRatio!==null&&atRatio<4.5)errs.push("accent-text token contrast "+atRatio.toFixed(2)+":1 (< 4.5)");}
      }
    }
  }
  return {ok:errs.length===0,errors:errs,warnings:warns};
}

/* ---------- auto-fix loop (v1.5 Phase 3.8) — sirf deterministic safe fixes, max 3 rounds ---------- */
function autoFix(html, errors){
  var out=String(html||""), applied=[];
  errors.forEach(function(e){
    if(e==="img without alt attribute"&&applied.indexOf("img-alt")===-1){
      out=out.replace(/<img\b(?![^>]*alt=)[^>]*>/gi,function(t){return t.replace(/<img/i,'<img alt=""');});
      applied.push("img-alt");
    }else if(e==="img without loading attribute (lazy required)"&&applied.indexOf("img-lazy")===-1){
      out=out.replace(/<img\b(?![^>]*loading=)[^>]*>/gi,function(t){return t.replace(/<img/i,'<img loading="lazy"');});
      applied.push("img-lazy");
    }else if(e==="viewport meta missing"&&applied.indexOf("viewport")===-1){
      out=out.replace(/<head>/i,'<head>\n<meta name="viewport" content="width=device-width, initial-scale=1.0">');
      applied.push("viewport");
    }else if(e.indexOf("duplicate id: ")===0){
      var id=e.slice("duplicate id: ".length), n=0;
      out=out.replace(new RegExp('id="'+id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+'"',"g"),function(){ n++; return n===1?('id="'+id+'"'):('id="'+id+'-'+n+'"'); });
      if(n>1)applied.push("dup-id:"+id);
    }else if(e.indexOf("unbalanced <")===0){
      var m=e.match(/unbalanced <(\w+)> \(open (\d+), close (\d+)\)/);
      if(m&&+m[2]>+m[3]){
        var closers=""; for(var i=0;i<(+m[2]-+m[3]);i++)closers+="</"+m[1]+">";
        out=out.replace(/<\/body>/i,closers+"</body>"); if(!/<\/body>/i.test(out))out+=closers;
        applied.push("balance:"+m[1]);
      }
    }
  });
  return {html:out,applied:applied};
}
function validateWithFix(p, html){
  var v=validateBuild(p,html), rounds=0, fixes=[];
  while(!v.ok&&rounds<3){
    var f=autoFix(html,v.errors);
    if(!f.applied.length)break;
    html=f.html; fixes=fixes.concat(f.applied); rounds++;
    v=validateBuild(p,html);
  }
  v.rounds=rounds; v.fixes=fixes; v.html=html;
  return v;
}


/* ---------- archetype modules (Phase 4.3: Culinary + Wellness) ---------- */
function modWrap(title, inner){ return '<section id="module"><h2>'+title+'</h2>'+inner+'</section>'; }
function menuExplorerHTML(){
  var cats={Starters:["Paneer Tikka","Hara Bhara Kebab","Crispy Corn","Spring Rolls"],Mains:["Paneer Butter Masala","Dal Makhani","Veg Biryani","Hakka Noodles"],Breads:["Butter Naan","Garlic Naan","Tandoori Roti","Laccha Paratha"],Desserts:["Gulab Jamun","Kulfi","Brownie Sizzle","Fruit Custard"],Beverages:["Cold Coffee","Masala Chai","Fresh Lime Soda","Sweet Lassi"]};
  var tabs=Object.keys(cats).map(function(k,i){return '<button class="btn'+(i?' g':'')+'" style="padding:8px 16px;font-size:13.5px;margin:0 4px 10px" onclick="modMenu(\''+k+'\',this)">'+k+'</button>';}).join("");
  var js='<script>var MODMENU='+JSON.stringify(cats)+';function modMenu(k,btn){document.getElementById("modMenuList").innerHTML=MODMENU[k].map(function(x){return "<div class=\\"card\\"><h3>"+x+"</h3><p>Ask for today\'s preparation.</p></div>";}).join("");var bs=btn.parentNode.children;for(var i=0;i<bs.length;i++)bs[i].classList.add("g");btn.classList.remove("g");}</'+'script>';
  return modWrap("Explore the menu",'<div style="text-align:center">'+tabs+'</div><div class="grid" id="modMenuList">'+cats.Starters.map(function(x){return '<div class="card"><h3>'+x+'</h3><p>Ask for today&rsquo;s preparation.</p></div>';}).join("")+'</div><p style="text-align:center;opacity:.7;margin-top:14px">Menu changes with the season — prices at the counter, no surprises.</p>')+js;
}
function bookingWidgetHTML(kind){
  var title=kind==="stay"?"Book your stay":(kind==="visit"?"Book a visit":"Book a table");
  var js='<script>function modBook(){var d=document.getElementById("modDate").value;var g=document.getElementById("modGuests").value;var o=document.getElementById("modBookOut");if(!d){o.textContent="Please pick a date first.";return;}o.textContent="✔ Request noted for "+d+" · "+g+" person(s). We will confirm shortly — see you soon!";}</'+'script>';
  return modWrap(title,'<div style="max-width:520px;margin:0 auto;text-align:center"><label style="display:block;margin-bottom:6px;font-weight:600">Pick a date</label><input id="modDate" type="date" style="padding:11px 14px;border-radius:12px;border:1px solid #8884;background:transparent;color:inherit;width:100%;margin-bottom:12px"><label style="display:block;margin-bottom:6px;font-weight:600">'+(kind==="visit"?"People":"Guests")+'</label><select id="modGuests" style="padding:11px 14px;border-radius:12px;border:1px solid #8884;background:transparent;color:inherit;width:100%;margin-bottom:14px"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6+</option></select><button class="btn" onclick="modBook()">Request Booking</button><p id="modBookOut" style="margin-top:14px;font-weight:600"></p></div>')+js;
}
function bmiHTML(){
  var js='<script>function modBMI(){var h=parseFloat(document.getElementById("modH").value);var w=parseFloat(document.getElementById("modW").value);var o=document.getElementById("modBMIOut");if(!h||!w||h<80||h>260||w<20||w>400){o.textContent="Enter a valid height and weight.";return;}var b=w/((h/100)*(h/100));var cat=b<18.5?"Underweight":(b<25?"Healthy range":(b<30?"Overweight":"Obese range"));o.textContent="Your BMI is "+b.toFixed(1)+" — "+cat+". A trainer can turn this number into a plan.";}</'+'script>';
  return modWrap("Know your BMI",'<div style="max-width:520px;margin:0 auto;text-align:center"><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><input id="modH" type="number" placeholder="Height (cm)" style="padding:11px 14px;border-radius:12px;border:1px solid #8884;background:transparent;color:inherit;width:160px"><input id="modW" type="number" placeholder="Weight (kg)" style="padding:11px 14px;border-radius:12px;border:1px solid #8884;background:transparent;color:inherit;width:160px"></div><button class="btn" style="margin-top:14px" onclick="modBMI()">Calculate</button><p id="modBMIOut" style="margin-top:14px;font-weight:600"></p><p style="opacity:.65;font-size:13px">BMI is a general guide, not a medical diagnosis.</p></div>')+js;
}
function scheduleHTML(){
  var days={Mon:["6 AM — Power Yoga","7 AM — Hatha Basics","6 PM — Vinyasa Flow"],Tue:["6 AM — Pranayama","7 AM — Hatha Basics","6 PM — Yin Yoga"],Wed:["6 AM — Power Yoga","7 AM — Meditation","6 PM — Vinyasa Flow"],Thu:["6 AM — Pranayama","7 AM — Hatha Basics","6 PM — Yin Yoga"],Fri:["6 AM — Power Yoga","7 AM — Meditation","6 PM — Vinyasa Flow"],Sat:["7 AM — Weekend Flow","9 AM — Family Yoga","5 PM — Meditation"],Sun:["7 AM — Weekend Flow","9 AM — Family Yoga"]};
  var tabs=Object.keys(days).map(function(k,i){return '<button class="btn'+(i?' g':'')+'" style="padding:8px 14px;font-size:13.5px;margin:0 3px 10px" onclick="modDay(\''+k+'\',this)">'+k+'</button>';}).join("");
  var js='<script>var MODDAYS='+JSON.stringify(days)+';function modDay(k,btn){document.getElementById("modDayList").innerHTML=MODDAYS[k].map(function(x){return "<div class=\\"card\\"><h3>"+x+"</h3></div>";}).join("");var bs=btn.parentNode.children;for(var i=0;i<bs.length;i++)bs[i].classList.add("g");btn.classList.remove("g");}</'+'script>';
  return modWrap("Weekly schedule",'<div style="text-align:center">'+tabs+'</div><div class="grid" id="modDayList">'+days.Mon.map(function(x){return '<div class="card"><h3>'+x+'</h3></div>';}).join("")+'</div><p style="text-align:center;opacity:.7;margin-top:14px">Timings can shift on holidays — confirm on call.</p>')+js;
}
function serviceMenuHTML(kind){
  var items=kind==="finance"?[["Tax Planning","Returns, filed right"],["Loans & Credit","Options, explained plainly"],["Investments","Goals first, products later"],["Business Advisory","From books to boardroom"]]:kind==="auto"?[["General Service","Full check and tune-up"],["Denting & Painting","Body work, clean finish"],["AC Service","Cooling, checked properly"],["Wheels & Brakes","Alignment, tyres, safety"]]:kind==="pets"?[["Grooming","Bath, trim and care"],["Vet Visits","Checkups and vaccination"],["Boarding","Safe stays, happy pets"],["Training","Basics, taught kindly"]]:kind==="dental"?[["Checkup & Cleaning","The six-month habit"],["Braces & Aligners","Straighten, patiently"],["Implants Consult","Know your options first"],["Kids Dentistry","Gentle first visits"]]:kind==="spa"?[["Signature Massage","Slow, deep and unhurried"],["Aromatherapy","Essential oils, calm mind"],["Body Polish","Glow, from head to toe"],["Steam & Soak","Melt the week away"]]:[["Haircut & Styling","Shaped around your face"],["Colour & Care","Rich colour, gentle hands"],["Skin & Facial","Clean, calm, glowing"],["Bridal & Occasions","The full preparation"]];
  return modWrap("Services",'<div class="grid">'+items.map(function(x){return '<div class="card"><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>';}).join("")+'</div><p style="text-align:center;opacity:.7;margin-top:14px">Full price list at the studio — confirmed before we begin, no surprises.</p>');
}
function productGridHTML(){
  var items=[["Fresh Breads","Baked through the morning"],["Cakes & Pastries","For days worth celebrating"],["Cookies & Snacks","Tea-time, sorted"],["Seasonal Specials","Whatever the season gives"]];
  return modWrap("From the oven",'<div class="grid">'+items.map(function(x){return '<div class="card"><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>';}).join("")+'</div><p style="text-align:center;opacity:.7;margin-top:14px">Bakes sell out fast — call ahead for today&rsquo;s stock.</p>');
}

function filterGridHTML(title, groups, note){
  var tabs=Object.keys(groups).map(function(k,i){return '<button class="btn'+(i?' g':'')+'" style="padding:8px 16px;font-size:13.5px;margin:0 4px 10px" onclick="modGrid(\''+k+'\',this)">'+k+'</button>';}).join("");
  var js='<script>var MODGRID='+JSON.stringify(groups)+';function modGrid(k,btn){document.getElementById("modGridList").innerHTML=MODGRID[k].map(function(x){return "<div class=\\"card\\"><h3>"+x+"</h3><p>Ask in store or on call.</p></div>";}).join("");var bs=btn.parentNode.children;for(var i=0;i<bs.length;i++)bs[i].classList.add("g");btn.classList.remove("g");}</'+'script>';
  var first=Object.keys(groups)[0];
  return modWrap(title,'<div style="text-align:center">'+tabs+'</div><div class="grid" id="modGridList">'+groups[first].map(function(x){return '<div class="card"><h3>'+x+'</h3><p>Ask in store or on call.</p></div>';}).join("")+'</div>'+(note?'<p style="text-align:center;opacity:.7;margin-top:14px">'+note+'</p>':""))+js;
}
function categoryGridHTML(title, items, note){
  return modWrap(title,'<div class="grid">'+items.map(function(x){return '<div class="card"><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>';}).join("")+'</div>'+(note?'<p style="text-align:center;opacity:.7;margin-top:14px">'+note+'</p>':""));
}
function disclaimerHTML(kind){
  var t=kind==="financial"?"This website offers general information only. It is not financial advice. Please consult a licensed advisor before investing or buying a policy.":(kind==="legal"?"This website offers general information only. It is not legal advice. A consultation does not by itself create a lawyer-client relationship.":"This website offers general information and appointment booking only. It is not medical advice. For emergencies, contact your nearest hospital.");
  return '<section style="padding-top:0"><p style="text-align:center;opacity:.65;font-size:13px;max-width:640px;margin:0 auto">'+t+'</p></section>';
}
function emiCalcHTML(){
  var js='<script>function modEMI(){var P=parseFloat(document.getElementById("modAmt").value);var R=parseFloat(document.getElementById("modRate").value);var Y=parseFloat(document.getElementById("modYears").value);var o=document.getElementById("modEMIOut");if(!P||P<10000||R<0||R>36||!Y||Y<1||Y>40){o.textContent="Enter a valid amount, rate and tenure.";return;}var r=R/1200;var n=Math.round(Y*12);var emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);var tot=emi*n;var fmt=function(x){return Math.round(x).toLocaleString("en-IN");};o.textContent="Monthly EMI \u2248 \u20B9"+fmt(emi)+" \u00B7 Total interest \u2248 \u20B9"+fmt(tot-P)+" \u00B7 Total payable \u2248 \u20B9"+fmt(tot);}</'+'script>';
  return modWrap("EMI calculator",'<div style="max-width:560px;margin:0 auto;text-align:center"><div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><input id="modAmt" type="number" placeholder="Loan amount (\u20B9)" style="padding:11px 14px;border-radius:12px;border:1px solid #8884;background:transparent;color:inherit;width:170px"><input id="modRate" type="number" placeholder="Interest % / year" style="padding:11px 14px;border-radius:12px;border:1px solid #8884;background:transparent;color:inherit;width:150px"><input id="modYears" type="number" placeholder="Years" style="padding:11px 14px;border-radius:12px;border:1px solid #8884;background:transparent;color:inherit;width:110px"></div><button class="btn" style="margin-top:14px" onclick="modEMI()">Calculate EMI</button><p id="modEMIOut" style="margin-top:14px;font-weight:600"></p><p style="opacity:.65;font-size:13px">Estimate only — your bank&rsquo;s final EMI may differ slightly.</p></div>')+js;
}
function coverCalcHTML(){
  var js='<script>function modCover(){var I=parseFloat(document.getElementById("modInc").value);var o=document.getElementById("modCoverOut");if(!I||I<50000){o.textContent="Enter your yearly income to see the thumb rule.";return;}var fmt=function(x){return Math.round(x).toLocaleString("en-IN");};o.textContent="A common thumb rule is 10-15x yearly income — for \u20B9"+fmt(I)+" that is \u20B9"+fmt(I*10)+" to \u20B9"+fmt(I*15)+" of cover. This is a guide, not a quote.";}</'+'script>';
  return modWrap("How much cover?",'<div style="max-width:520px;margin:0 auto;text-align:center"><input id="modInc" type="number" placeholder="Your yearly income (\u20B9)" style="padding:11px 14px;border-radius:12px;border:1px solid #8884;background:transparent;color:inherit;width:100%;margin-bottom:14px"><button class="btn" onclick="modCover()">See the Thumb Rule</button><p id="modCoverOut" style="margin-top:14px;font-weight:600"></p></div>')+js;
}


function guidedSelectorHTML(){
  var js='<script>var MODGUIDE={info:"Everything essential is on this page. For anything else, reach us from the contact section below.",book:"Booking is easy — tell us your date in the contact section below and we will confirm.",buy:"Tell us what you need in the contact section below — we will reply with details and next steps."};function modGuide(k,btn){document.getElementById("modGuideOut").textContent=MODGUIDE[k]||"";var bs=btn.parentNode.children;for(var i=0;i<bs.length;i++)bs[i].classList.add("g");btn.classList.remove("g");}</'+'script>';
  return modWrap("What do you need?",'<div style="text-align:center"><button class="btn" style="margin:0 4px 10px" onclick="modGuide(\'info\',this)">Information</button><button class="btn g" style="margin:0 4px 10px" onclick="modGuide(\'book\',this)">Book a Service</button><button class="btn g" style="margin:0 4px 10px" onclick="modGuide(\'buy\',this)">Buy / Enquire</button><p id="modGuideOut" style="margin-top:12px;font-weight:600;max-width:560px;margin-left:auto;margin-right:auto"></p></div>')+js;
}
function signatureModule(cat){
  if(cat==="cafe"||cat==="restaurant")return menuExplorerHTML();
  if(cat==="hotel")return bookingWidgetHTML("stay");
  if(cat==="bakery")return productGridHTML();
  if(cat==="gym")return bmiHTML();
  if(cat==="yoga")return scheduleHTML();
  if(cat==="salon")return serviceMenuHTML("salon");
  if(cat==="spa")return serviceMenuHTML("spa");
  if(cat==="fashion")return filterGridHTML("Shop the collection",{Women:["Kurtis & Sets","Sarees & Ethnic Wear","Western Dresses","Handbags"],Men:["Shirts & Tees","Jeans & Trousers","Ethnic Sets","Watches"],"Kids & More":["Kids Wear","Footwear","Accessories","Festive Picks"]});
  if(cat==="jewellery")return filterGridHTML("Collections",{Gold:["Necklaces","Bangles","Earrings","Rings"],Diamond:["Rings","Pendants","Earrings","Bracelets"],Bridal:["Bridal Sets","Mangalsutra","Jhumkas","Anklets"]},"Look for the BIS hallmark when you buy — we are happy to explain it.");
  if(cat==="store")return filterGridHTML("Browse products",{Popular:["Everyday Essentials","New Arrivals","Most Loved","Gift Picks"],Categories:["Home & Living","Personal Care","Stationery","Snacks & Sips"]});
  if(cat==="electronics")return filterGridHTML("Explore the range",{Phones:["Smartphones","Tablets","Accessories","Wearables"],Home:["TVs","Refrigerators","Washing Machines","Air Conditioners"],Audio:["Earbuds","Headphones","Speakers","Soundbars"]});
  if(cat==="grocery")return categoryGridHTML("Shop by category",[["Fruits & Vegetables","Fresh, every morning"],["Atta, Rice & Dal","Daily staples"],["Snacks & Beverages","Tea-time, sorted"],["Household Care","Home essentials"]],"Call for today&rsquo;s prices and availability.");
  if(cat==="auto")return serviceMenuHTML("auto");
  if(cat==="pets")return serviceMenuHTML("pets");
  if(cat==="clinic")return bookingWidgetHTML("visit")+disclaimerHTML();
  if(cat==="dental")return serviceMenuHTML("dental")+disclaimerHTML();
  if(cat==="pharmacy")return categoryGridHTML("Categories",[["Everyday Medicines","Ask our pharmacist"],["Health & Nutrition","Vitamins and care"],["Baby & Mother Care","Gentle essentials"],["Personal Care","Daily hygiene"]],"Carry your prescription for scheduled medicines.")+disclaimerHTML();
  if(cat==="realestate")return emiCalcHTML();
  if(cat==="insurance")return coverCalcHTML()+disclaimerHTML("financial");
  if(cat==="finance")return serviceMenuHTML("finance")+disclaimerHTML("financial");
  if(cat==="lawfirm")return categoryGridHTML("Practice areas",[["Family & Property","Disputes, wills, agreements"],["Corporate","Contracts and compliance"],["Criminal Defence","Representation that prepares"],["Civil Matters","From notices to resolution"]])+disclaimerHTML("legal");
  if(cat==="school")return categoryGridHTML("Programs",[["Early Years","Play, phonics, curiosity"],["Primary","Strong basics, kind teachers"],["Middle School","Concepts that click"],["Senior School","Boards and beyond"]],"Start with an admission enquiry — we will walk you through it.");
  if(cat==="coaching")return categoryGridHTML("Courses & batches",[["Foundation (Class 9-10)","Boards, built step by step"],["Class 11-12 Science","Boards plus entrance, together"],["Competitive Exams","Structured test practice"],["Crash Courses","Short, focused revision"]],"Batch timings confirmed on enquiry.");
  if(cat==="interior")return categoryGridHTML("What we design",[["Living Spaces","Warm, usable, personal"],["Kitchens","Built around how you cook"],["Offices","Work, but beautiful"],["Turnkey Homes","Design to handover"]]);
  if(cat==="construction")return categoryGridHTML("What we build",[["Residential","Homes, built to last"],["Commercial","Offices and retail spaces"],["Renovation","Old spaces, new life"],["Turnkey Projects","One team, start to finish"]],"Estimates after a site visit — no blind quotes.");
  if(cat==="wedding")return categoryGridHTML("Celebrations we craft",[["Weddings","Two families, one day"],["Receptions","The evening everyone remembers"],["Mehendi & Haldi","Colour, music, laughter"],["Destination Weddings","Plans that travel well"]]);
  if(cat==="events")return categoryGridHTML("Events we run",[["Corporate Events","Conferences to offsites"],["Birthdays & Parties","Small joys, done big"],["Exhibitions","Stalls that stand out"],["Live Shows","Stage, sound, crowd"]]);
  if(cat==="travel")return categoryGridHTML("Trip styles",[["Family Trips","Easy plans, happy kids"],["Honeymoons","Slow days, good stays"],["Group Tours","Friends, one plan"],["Custom Itineraries","Built around you"]],"Prices depend on your dates — share them for a real quote.");
  if(cat==="agency")return categoryGridHTML("What we make",[["Brand Identities","Logos that stick"],["Websites","Fast, clean, easy to find"],["Social Campaigns","Content people share"],["Video & Reels","Stories in thirty seconds"]],"Your project could be next — start with a conversation.");
  if(cat==="startup")return categoryGridHTML("What we are building",[["The Problem","Why this needs to exist"],["Our Approach","Different, on purpose"],["Who It Serves","Built for people like you"],["Where We Are","Early — and moving"]]);
  if(cat==="saas")return categoryGridHTML("Why teams switch",[["Fast Setup","Live in days, not months"],["Clear Plans","Everything explained upfront"],["Human Support","Real people, quick answers"],["Grows With You","Start small, scale clean"]],"Plans and pricing on the demo call — no surprises later.");
  if(cat==="portfolio")return categoryGridHTML("Selected work",[["Project One","Replace with your best work"],["Project Two","Show range, not everything"],["Project Three","Your most recent piece"],["Project Four","The one you are proudest of"]],"Swap these placeholders with your real projects — honesty shows.");
  if(cat==="photo")return categoryGridHTML("Portfolio",[["Weddings","Days that fly by"],["Portraits","People, as they are"],["Products","Things, beautifully lit"],["Events","Moments, caught live"]],"Share your date — we will confirm availability.");
  if(cat==="generic")return guidedSelectorHTML();
  return "";
}

/* ---------- build state machine (v1.5 Phase 3.3) ---------- */
var BSTATES=["Draft","Validating","Planning","Building","Checking","Preview","Packaged"];
var BFAIL=["NeedsInput","FailedValidation","FailedBuild"];
function setState(p,s){
  if(!p)return;
  p.state=s; p.stateLog=p.stateLog||[];
  p.stateLog.push({s:s,t:Date.now()});
  if(p.stateLog.length>40)p.stateLog=p.stateLog.slice(-40);
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
  if(showResult)blobInto($("previewFrame"),p.html);
  setStep(p.html?5:(p.plan?3:2));
}
function toPlan(){
  collectForm(); var d=draft.details;
  if(!d.name){toast("Give it a name first");return;}
  var p;
  if(draft.projectId){p=state.projects.filter(function(x){return x.id===draft.projectId;})[0];}
  if(!p){p={id:"p"+Date.now(),name:d.name,type:draft.type,status:"Plan ready",details:d,plan:null,html:"",site:null};state.projects.push(p);state.activeId=p.id;}
  else{p.name=d.name;p.details=d;p.type=draft.type;p.html="";p.status="Plan ready";}
  if(!p.state)setState(p,"Draft");
  setState(p,"Validating");
  p.plan=planFor(p); setState(p,"Planning");
  draft=null; save(); renderAll(); toast("Plan ready — approve to build");
}
function runBuild(){
  var p=active(); if(!p||!p.plan)return;
  var cost=COSTS[p.type];
  if(state.credits<cost){toast("Not enough credits");return;}
  state.credits-=cost; p.status="Building"; setState(p,"Building"); save();
  $("creditsVal").textContent=state.credits; $("wsStatus").textContent="Building";
  $("planPanel").style.display="none"; setStep(4);
  var bp=$("buildPanel"); bp.style.display="block";
  var steps=p.plan.concat(["Package ready"]);
  $("buildSteps").innerHTML=steps.map(function(s,i){return '<div class="build-step" id="bs'+i+'"><span class="st">'+(i+1)+"</span>"+esc(s)+"</div>";}).join("");
  var i=0;
  (function next(){
    if(i>0){var prev=$("bs"+(i-1));prev.classList.remove("active");prev.classList.add("done");prev.querySelector(".st").textContent="✓";}
    if(i>=steps.length){
      try{p.html=generate(p);}catch(e){setState(p,"FailedBuild");p.status="Failed";bp.style.display="none";save();renderAll();toast("Build failed — please try again");return;}
      setState(p,"Checking");
      var v=validateWithFix(p,p.html);
      if(v.fixes&&v.fixes.length)p.html=v.html;
      p.checks={ok:v.ok,errors:v.errors,warnings:v.warnings||[],rounds:v.rounds||0,fixes:v.fixes||[],at:Date.now(),rules:(window.YUG_RULES||{}).version||"?"};
      if(!v.ok){setState(p,"FailedValidation");p.status="Failed";bp.style.display="none";save();renderAll();toast("Build failed checks: "+(v.errors[0]||"unknown"));return;}
      setState(p,"Preview"); setState(p,"Packaged");
      p.status="Built — ready"; bp.style.display="none"; save(); renderAll();
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
    var s=p.site, colorHit=null, hexHit=text.match(/#([0-9a-fA-F]{6})\b/);
    for(var k in COLORS)if(t.indexOf(k)>-1)colorHit=k;
    if(hexHit){s.colorHex="#"+hexHit[1].toUpperCase();done.push("colour → <b>#"+hexHit[1].toUpperCase()+"</b>");}
    else if(/title|name/.test(t)&&/to\s+/.test(t)){var m=text.split(/to\s+/i)[1];if(m){s.name=m.trim().replace(/[".]/g,"");p.name=s.name;done.push("title → <b>"+esc(s.name)+"</b>");}}
    else if(colorHit){s.colorName=colorHit;s.colorHex="";done.push("colour → <b>"+colorHit+"</b>");}
    else if(/light mode|light theme/.test(t)){s.dark=false;done.push("<b>light mode</b> on");}
    else if(/dark mode|dark theme/.test(t)){s.dark=true;done.push("<b>dark mode</b> on");}
    else if(/add.*pricing/.test(t)){s.sections.pricing=true;done.push("<b>pricing</b> added");}
    else if(/remove.*pricing/.test(t)){s.sections.pricing=false;done.push("pricing removed");}
    else if(/add.*testimonial|add.*review/.test(t)){s.sections.testimonials=true;done.push("<b>testimonials</b> added");}
    else if(/remove.*testimonial|remove.*review/.test(t)){s.sections.testimonials=false;done.push("testimonials removed");}
    else if(/add.*gallery/.test(t)){s.sections.gallery=true;done.push("<b>gallery</b> added");}
    else if(/remove.*gallery/.test(t)){s.sections.gallery=false;done.push("gallery removed");}
  }
  if(!done.length){editSay("lab","<b>Lab:</b> Quick edits work on website projects — colour (name or #hex), title, sections, light/dark. For bigger changes, ask the Lab Assistant below or rebuild via Edit Details.");return;}
  state.credits-=2; p.html=(p.type==="3D Website"?gen3D(p):genWebsite(p)); p.status="Edited"; save(); renderAll();
  editSay("lab","<b>Lab:</b> Done — "+done.join(", ")+". Preview updated. (2 credits)");
}

/* ---------- publish ---------- */
function downloadOut(){
  var p=active(); if(!p||!p.html)return;
  var blob=new Blob([p.html],{type:"text/html"}); var a=document.createElement("a");
  a.href=URL.createObjectURL(blob); a.download=p.name.replace(/\s+/g,"-").toLowerCase()+"-"+p.type.replace(/\s+/g,"-").toLowerCase()+".html"; a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);},2000);
}

/* ---------- Yug AI (backend-powered, no keys in browser) ---------- */
function renderAIStatus(){}
function aiSay(who,text){
  var log=$("aiLog"); var d=document.createElement("div");
  d.className="chat-msg "+who; d.innerHTML=text; log.appendChild(d); log.scrollTop=log.scrollHeight; return d;
}
var AI_READY=null;
function checkAI(){
  fetch("/api/health").then(function(r){return r.json();}).then(function(j){
    AI_READY=!!j.ai;
    $("aiStatus").textContent=AI_READY?"Online":"Setup pending";var _pl=$("aiPill");if(_pl)_pl.classList.toggle("live",AI_READY);
    var m=$("aiMsg"); if(m)m.textContent=AI_READY?"Yug AI is live — built into this Lab. No setup, no keys.":"Yug AI is being switched on. One backend step is pending with the admin.";
    var h=$("aiHint"); if(h)h.textContent=AI_READY?"Ask Yug AI anything — ideas, copy, fixes, next steps.":"Yug AI will start answering here as soon as setup completes.";
  }).catch(function(){ var s=$("aiStatus"); if(s)s.textContent="…"; });
}
function yugChat(messages,maxTokens){
  return fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:messages,max_tokens:maxTokens||900})})
  .then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.code||("HTTP "+r.status));return j;});})
  .then(function(j){return j.content||"(empty reply — try once more)";});
}
function aiAsk(){
  var inp=$("aiInput"), q=inp.value.trim(); if(!q)return;
  aiSay("user",esc(q)); inp.value="";
  if(AI_READY===false){aiSay("lab","<b>Yug AI:</b> Switching on — one admin step is pending. Live answers here soon.");return;}
  var p=active();
  var ctx="You are Yug AI, the built-in intelligence of YugLab (a creator lab). The user is Suman, the founder, building digital products. Be practical, specific and concise. Current project: "+(p?(p.name+" ("+p.type+", status: "+p.status+")"):"none selected")+".";
  var wait=aiSay("lab","<b>Yug AI:</b> Thinking…");
  yugChat([{role:"system",content:ctx},{role:"user",content:q}],900)
  .then(function(ans){wait.innerHTML="<b>Yug AI:</b> "+esc(ans).replace(/\n/g,"<br>");})
  .catch(function(e){wait.innerHTML="<b>Yug AI:</b> Connection issue ("+esc(e.message)+"). Try again.";});
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
$("aiPill").onclick=function(){$("aiBox").scrollIntoView({behavior:"smooth",block:"center"});};
$("aiSendBtn").onclick=aiAsk;
$("aiInput").addEventListener("keydown",function(e){if(e.key==="Enter")aiAsk();});
renderTypes();
renderAll();
checkAI();
if(active())aiSay("lab","<b>Assistant:</b> Welcome back. Project khula hai — kuch bhi puchho, ya Quick Edit se badlaav karo.");

/* ---------- Code Studio — multi-file, extension = language ---------- */
var cmEditor=null, cmLoading=false, csProjectId=null;
var csFiles=[], csActive="";
var RUN_LANGS={py:{lang:"python",label:"Python"},js:{lang:"javascript",label:"JavaScript"},ts:{lang:"typescript",label:"TypeScript"},java:{lang:"java",label:"Java"},c:{lang:"c",label:"C"},cpp:{lang:"c++",label:"C++"},cc:{lang:"c++",label:"C++"},go:{lang:"go",label:"Go"},rs:{lang:"rust",label:"Rust"},php:{lang:"php",label:"PHP"},rb:{lang:"ruby",label:"Ruby"},kt:{lang:"kotlin",label:"Kotlin"},swift:{lang:"swift",label:"Swift"},cs:{lang:"csharp",label:"C#"},sql:{lang:"sql",label:"SQL"},sh:{lang:"bash",label:"Bash"},r:{lang:"r",label:"R"},lua:{lang:"lua",label:"Lua"}};
var CM_MAP={html:{mode:"htmlmixed",file:"htmlmixed/htmlmixed.min.js",label:"HTML"},css:{mode:"css",file:"css/css.min.js",label:"CSS"},js:{mode:"javascript",file:"javascript/javascript.min.js",label:"JavaScript"},ts:{mode:"javascript",file:"javascript/javascript.min.js",label:"TypeScript"},json:{mode:"application/json",file:"javascript/javascript.min.js",label:"JSON"},py:{mode:"python",file:"python/python.min.js",label:"Python"},java:{mode:"text/x-java",file:"clike/clike.min.js",label:"Java"},c:{mode:"text/x-csrc",file:"clike/clike.min.js",label:"C"},cpp:{mode:"text/x-c++src",file:"clike/clike.min.js",label:"C++"},cc:{mode:"text/x-c++src",file:"clike/clike.min.js",label:"C++"},cs:{mode:"text/x-csharp",file:"clike/clike.min.js",label:"C#"},go:{mode:"go",file:"go/go.min.js",label:"Go"},rs:{mode:"rust",file:"rust/rust.min.js",label:"Rust"},php:{mode:"php",file:"php/php.min.js",label:"PHP"},rb:{mode:"ruby",file:"ruby/ruby.min.js",label:"Ruby"},sql:{mode:"text/x-sql",file:"sql/sql.min.js",label:"SQL"},sh:{mode:"shell",file:"shell/shell.min.js",label:"Shell"},md:{mode:"markdown",file:"markdown/markdown.min.js",label:"Markdown"},xml:{mode:"xml",file:"xml/xml.min.js",label:"XML"},svg:{mode:"xml",file:"xml/xml.min.js",label:"SVG"},yaml:{mode:"yaml",file:"yaml/yaml.min.js",label:"YAML"},yml:{mode:"yaml",file:"yaml/yaml.min.js",label:"YAML"}};
var EXT_DOT={py:"#4FC3F7",js:"#F7DF1E",ts:"#42A5F5",html:"#FF7043",css:"#42A5F5",java:"#EF5350",cpp:"#9575CD",c:"#90A4AE",go:"#4DD0E1",rs:"#FF8A65",php:"#9575CD",rb:"#E57373",json:"#FFD54F",md:"#B0BEC5",sql:"#FFD54F",sh:"#81C784"};
function extOf(name){var p=name.lastIndexOf(".");return p>0?name.slice(p+1).toLowerCase():"";}
function langLabel(name){var e=extOf(name);if(CM_MAP[e])return CM_MAP[e].label;if(RUN_LANGS[e])return RUN_LANGS[e].label;return "Text";}
function starterFor(name){
  var e=extOf(name);
  var S={
   py:'# Python — press Run\nname = input("Your name: ")\nprint("Hello,", name)\nfor i in range(1, 4):\n    print("Line", i)',
   js:'// JavaScript — press Run\nconst nums = [3, 7, 2, 9];\nconsole.log("Squares:", nums.map(n => n * n));',
   html:'<!DOCTYPE html>\n<html>\n<head><title>Page</title><link rel="stylesheet" href="style.css"></head>\n<body><h1>Hello from YugLab</h1><script src="app.js"></script></body>\n</html>',
   css:'body { font-family: system-ui; background: #0B0F14; color: #E8EDF3; }\nh1 { color: #F59E0B; }',
   java:'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello from Java");\n  }\n}',
   cpp:'#include <iostream>\nint main() { std::cout << "Hello from C++" << std::endl; return 0; }',
   c:'#include <stdio.h>\nint main() { printf("Hello from C\\n"); return 0; }',
   go:'package main\n\nimport "fmt"\n\nfunc main() { fmt.Println("Hello from Go") }',
   rs:'fn main() { println!("Hello from Rust"); }',
   php:'<?php echo "Hello from PHP"; ?>',
   rb:'puts "Hello from Ruby"',
   sql:'SELECT "Hello from SQL" AS greeting;',
   sh:'echo "Hello from Bash"',
   md:'# Notes\n\nWrite here.'
  };
  return S[e]!==undefined?S[e]:"";
}
var CS_LS="yuglab_cs_v1";
function csPersist(){if(csProjectId)return;try{localStorage.setItem(CS_LS,JSON.stringify({files:csFiles,active:csActive}));}catch(e){}}
function csLoad(){
  try{var s=JSON.parse(localStorage.getItem(CS_LS));if(s&&s.files&&s.files.length){csFiles=s.files;csActive=s.active||s.files[0].name;return;}}catch(e){}
  csFiles=[{name:"main.py",content:starterFor("main.py")},{name:"index.html",content:starterFor("index.html")},{name:"style.css",content:starterFor("style.css")},{name:"app.js",content:starterFor("app.js")}];
  csActive="main.py";
}
function codeGet(){return cmEditor?cmEditor.getValue():$("codeEditor").value;}
function codeSet(v){if(cmEditor)cmEditor.setValue(v);else $("codeEditor").value=v;}
function csSyncEditor(){for(var i=0;i<csFiles.length;i++)if(csFiles[i].name===csActive)csFiles[i].content=codeGet();}
var CM_BASE="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/";
var cmModesLoaded={};
function loadScriptOnce(src){return new Promise(function(res){var s=document.createElement("script");s.src=src;s.onload=res;s.onerror=res;document.head.appendChild(s);});}
function loadCM(cb){
  if(window.CodeMirror)return cb();
  if(cmLoading){setTimeout(function(){loadCM(cb);},350);return;}
  cmLoading=true;
  ["codemirror.min.css","theme/material-darker.min.css"].forEach(function(f){var l=document.createElement("link");l.rel="stylesheet";l.href=CM_BASE+f;document.head.appendChild(l);});
  var files=["codemirror.min.js","mode/xml/xml.min.js","mode/css/css.min.js","mode/javascript/javascript.min.js","mode/htmlmixed/htmlmixed.min.js"];
  (function next(i){if(i>=files.length){cmLoading=false;return cb();}var s=document.createElement("script");s.src=CM_BASE+files[i];s.onload=function(){next(i+1);};s.onerror=function(){next(i+1);};document.head.appendChild(s);})(0);
}
function ensureMode(name){
  var e=extOf(name),m=CM_MAP[e];
  if(!cmEditor||!m)return Promise.resolve();
  if(cmModesLoaded[m.file]){cmEditor.setOption("mode",m.mode);return Promise.resolve();}
  return loadScriptOnce(CM_BASE+"mode/"+m.file).then(function(){cmModesLoaded[m.file]=1;if(cmEditor)cmEditor.setOption("mode",m.mode);});
}
function initCM(){if(cmEditor||!window.CodeMirror)return;cmEditor=CodeMirror.fromTextArea($("codeEditor"),{theme:"material-darker",lineNumbers:true,indentUnit:2,tabSize:2});}
function renderFileList(){
  $("fileList").innerHTML=csFiles.map(function(f){
    return '<button class="cs-file'+(f.name===csActive?" on":"")+'" data-file="'+esc(f.name)+'"><span class="cs-dot" style="background:'+(EXT_DOT[extOf(f.name)]||"#9E9E9E")+'"></span><span class="cs-fname">'+esc(f.name)+'</span><span class="cs-del" data-del="'+esc(f.name)+'" title="Delete">✕</span></button>';
  }).join("");
  document.querySelectorAll(".cs-file").forEach(function(b){b.onclick=function(ev){if(ev.target.getAttribute("data-del"))return;switchFile(b.getAttribute("data-file"));};});
  document.querySelectorAll(".cs-del").forEach(function(x){x.onclick=function(ev){ev.stopPropagation();deleteFile(x.getAttribute("data-del"));};});
}
function switchFile(name){
  csSyncEditor();csActive=name;
  var f=null;for(var i=0;i<csFiles.length;i++)if(csFiles[i].name===name)f=csFiles[i];
  $("csTabName").textContent=name;$("csLangBadge").textContent=langLabel(name);
  renderFileList();codeSet(f?f.content:"");
  ensureMode(name).then(function(){if(cmEditor)cmEditor.refresh();});
  csPersist();
}
function openCodeStudio(files,active,projectId){
  csProjectId=projectId||null;csFiles=files;csActive=active;
  $("csSave").classList.toggle("hidden",!csProjectId);
  $("csMode").textContent=csProjectId?"Project":"Playground";
  showView("code");
  loadCM(function(){initCM();renderFileList();switchFile(csActive);if(cmEditor)cmEditor.refresh();});
}
function openPlayground(){csLoad();openCodeStudio(csFiles,csActive,null);}
function openProjectCode(){
  var p=active();if(!p)return;
  var files=[{name:"index.html",content:p.html||""}].concat(p.files||[]);
  openCodeStudio(files,"index.html",p.id);
}
function newFile(){
  var name=prompt("File name — extension decides the language (e.g. script.py, page.html, Main.java):");
  if(!name)return;name=name.trim();if(!name)return;
  for(var i=0;i<csFiles.length;i++)if(csFiles[i].name===name){switchFile(name);return;}
  csSyncEditor();csFiles.push({name:name,content:starterFor(name)});switchFile(name);csPersist();
}
function deleteFile(name){
  if(csFiles.length<=1){toast("At least one file must stay.");return;}
  if(!confirm("Delete "+name+"?"))return;
  csFiles=csFiles.filter(function(f){return f.name!==name;});
  if(csActive===name)csActive=csFiles[0].name;
  switchFile(csActive);csPersist();
}
function csRunCode(){
  csSyncEditor();
  var name=csActive,e=extOf(name),out=$("codeOut"),st=$("csStatus");
  var code=codeGet();
  if(e==="html"||e==="htm"){$("csPreviewWrap").classList.remove("hidden");blobInto($("csPreview"),code);out.textContent="// Rendered below.";st.textContent="HTML · Preview";return;}
  $("csPreviewWrap").classList.add("hidden");
  var rl=RUN_LANGS[e];
  if(!rl){out.textContent="// "+langLabel(name)+" files do not run. Press Run on a code file (Python, JavaScript, Java, C, C++, Go, Rust, ...).";st.textContent=langLabel(name)+" · View only";return;}
  st.textContent="Running…";out.textContent="// running…";
  fetch("/api/run",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({language:rl.lang,code:code,stdin:$("codeStdin").value})})
  .then(function(r){return r.json().then(function(j){return {r:r,j:j};});})
  .then(function(x){
    if(!x.r.ok)throw new Error(x.j.code||("HTTP "+x.r.status));
    var txt=(x.j.stdout||"");if(x.j.stderr)txt+=(txt?"\n":"")+x.j.stderr;
    out.textContent=txt||"(no output)";
    st.textContent=rl.label+" · "+(x.j.status||"")+(x.j.time?" · "+x.j.time+"s":"")+" · exit "+x.j.exit;
    csPersist();
  })
  .catch(function(err){out.textContent="// Run failed: "+err.message+"\n// The free runner may be busy — try again in a moment.";st.textContent="Error";});
}
$("openPlayground").onclick=openPlayground;
$("codeBtn").onclick=openProjectCode;
$("csNewFile").onclick=newFile;
$("csBack").onclick=function(){csSyncEditor();csPersist();var p=active();if(csProjectId&&p&&p.id===csProjectId){openWorkspace(p);}else{showView("create");}};
$("csRun").onclick=csRunCode;
$("csClear").onclick=function(){$("codeOut").textContent="";$("csStatus").textContent="";};
$("csSave").onclick=function(){
  var p=active();if(!p||p.id!==csProjectId)return;
  csSyncEditor();
  var others=[];
  csFiles.forEach(function(f){if(f.name==="index.html")p.html=f.content;else others.push(f);});
  p.files=others;save();blobInto($("previewFrame"),p.html);toast("Saved.");
};
})();
