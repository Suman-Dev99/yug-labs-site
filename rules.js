/* YugLab Rulebook Registry — v1.5.0 (Phase 3.1 + 3.2)
   Ek hi source of truth: har creation type ke strict rules yahin data ke roop
   me rehte hain. Validator (Phase 3.4+) isi ko padhega. Console ke type naam
   hi keys hain, taaki generate() seedha lookup kar sake.
   NOTE: Plan me rules/*.json kaha gaya tha — static hosting + sync console
   flow ke kaaran ye JS-data file hai (JSON ka exact mirror; harness ise
   seedha load karke test karta hai). */
window.YUG_RULES = {
  version: "1.5.1",
  universal: {
    forbiddenText: ["lorem ipsum", "your text here", "coming soon", "todo:", "placeholder text", "[object", "undefined"],
    noProviderNames: true,
    noUndefined: true,
    scriptsMustParse: true,
    externalLinksAllowed: false
  },
  types: {
    "Website": {
      id: "website", label: "Premium Website", lane: "website",
      required: ["<header", "<nav", "<h1", "hero", "<footer", "fonts.googleapis.com"],
      forbidden: ["three.min.js", "new Chart(", "getElementById(\"msgs\")", "sidebar"],
      gates: { minBytes: 3000, h1ExactlyOne: true, forms: false, contrast: true },
      acceptance: ["Spine order: header, hero, core, showcase, about, faq, contact, footer", "Picked colour tokens only", "All links in-page (#)", "GSAP reveal + fonts loaded", "Body + button contrast >= 4.5:1"]
    },
    "3D Website": {
      id: "threed", label: "3D Website", lane: "threed",
      required: ["<header", "<h1", "hero", "THREE", "<canvas", "<footer"],
      forbidden: ["new Chart(", "getElementById(\"msgs\")", "sidebar"],
      gates: { minBytes: 4000, h1ExactlyOne: true, forms: false, fallbackRequired: true, contrast: true },
      acceptance: ["Real Three.js scene + WebGL fallback present", "Content readable without the scene", "Glass HUD cards", "Picked colour tints the scene"]
    },
    "Web App": {
      id: "webapp", label: "Web App", lane: "webapp",
      required: ["login", "Chart", "<canvas"],
      forbidden: ["three.min.js", "getElementById(\"msgs\")"],
      gates: { minBytes: 3000, forms: false },
      acceptance: ["Demo-labelled login", "Dashboard with live Chart.js chart", "Working modules with real state", "No marketing hero/testimonials"]
    },
    "AI Chatbot": {
      id: "chatbot", label: "AI Chatbot", lane: "chatbot",
      required: ["msgs", "inp"],
      forbidden: ["three.min.js", "new Chart(", "<canvas"],
      gates: { minBytes: 2000, forms: false },
      acceptance: ["Answers only from supplied business data", "Fixed fallback for out-of-data questions", "Starter questions from the data", "No provider names anywhere"]
    },
    "AI Agent": {
      id: "agent", label: "AI Agent", lane: "agent",
      required: ["STEPS", "resText"],
      forbidden: ["three.min.js", "new Chart(", "getElementById(\"msgs\")"],
      gates: { minBytes: 2500, forms: false },
      acceptance: ["Numbered plan before run", "Step log with status per step", "Structured result summary", "No silent steps"]
    }
  }
};
