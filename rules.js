/* YugLab Rulebook Registry — v1.5.0 (Phase 3.1 + 3.2)
   Ek hi source of truth: har creation type ke strict rules yahin data ke roop
   me rehte hain. Validator (Phase 3.4+) isi ko padhega. Console ke type naam
   hi keys hain, taaki generate() seedha lookup kar sake.
   NOTE: Plan me rules/*.json kaha gaya tha — static hosting + sync console
   flow ke kaaran ye JS-data file hai (JSON ka exact mirror; harness ise
   seedha load karke test karta hai). */
window.YUG_RULES = {
  version: "1.5.10",
  universal: {
    forbiddenText: ["lorem ipsum", "your text here", "coming soon", "todo:", "placeholder text", "[object", "undefined"],
    noProviderNames: true,
    providerPatterns: ["nemotron", "nvidia", "openrouter", "judge0", "piston", "nvapi", "deepseek", "llama", "mistral", "chatgpt", "openai", "anthropic", "gemini", "hugging face", "huggingface", "claude"],
    domChecks: true,
    noUndefined: true,
    scriptsMustParse: true,
    externalLinksAllowed: false
  },
  types: {
    "Website": {
      id: "website", label: "Premium Website", lane: "website",
      required: ["<header", "<nav", "<h1", "hero", "<footer", "fonts.googleapis.com"],
      forbidden: ["three.min.js", "new Chart(", "getElementById(\"msgs\")", "sidebar"],
      gates: { minBytes: 4500, h1ExactlyOne: true, forms: false, contrast: true, typography: true, layout: true, motion: true },
      spine: [
        { key: "header", marker: "<header", required: true },
        { key: "hero", marker: "class=\"hero", required: true },
        { key: "trust", marker: "id=\"trust\"", required: true },
        { key: "core", marker: "id=\"features\"", required: true },
        { key: "process", marker: "id=\"process\"", required: true },
        { key: "showcase", marker: ["id=\"pricing\"", "id=\"gallery\""], required: false },
        { key: "about", marker: "id=\"about\"", required: true },
        { key: "testimonials", marker: "id=\"love\"", required: false },
        { key: "faq", marker: "id=\"faq\"", required: true },
        { key: "contact", marker: "id=\"contact\"", required: true },
        { key: "footer", marker: "<footer", required: true }
      ],
      acceptance: ["Canonical 11-section spine in order (archetype required/optional from Phase 4.2)", "Picked colour tokens only", "All links in-page (#)", "GSAP reveal + fonts loaded", "Body + button contrast >= 4.5:1"]
    },
    "3D Website": {
      id: "threed", label: "3D Website", lane: "threed",
      required: ["<header", "<h1", "hero", "THREE", "<canvas", "<footer"],
      forbidden: ["new Chart(", "getElementById(\"msgs\")", "sidebar"],
      gates: { minBytes: 4000, h1ExactlyOne: true, forms: false, fallbackRequired: true, contrast: true, typography: true, layout: true, motion: true },
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

/* Phase 4.2 — Archetypes + Blueprints (35 categories ka data; modules 4.3-4.6 me implement honge) */
window.YUG_RULES.archetypes = {
 "culinary": "Culinary & Hospitality",
 "wellness": "Wellness & Beauty",
 "retail": "Retail & Commerce",
 "healthcare": "Healthcare",
 "advisory": "Advisory & Education",
 "property_events": "Property & Events",
 "digital": "Digital & B2B",
 "other": "Other Business"
};
window.YUG_RULES.blueprints = {
 "cafe": {
  "archetype": "culinary",
  "intent": "Show the menu and make booking effortless",
  "cta": "Book a Table",
  "modules": [
   "menu-grid",
   "table-booking",
   "gallery-strip"
  ],
  "noInvent": [
   "dish prices (unless the owner gave them)",
   "opening hours",
   "ratings or review counts"
  ]
 },
 "restaurant": {
  "archetype": "culinary",
  "intent": "Turn visitors into reservations",
  "cta": "Book a Table",
  "modules": [
   "menu-grid",
   "table-booking",
   "chef-specials"
  ],
  "noInvent": [
   "dish prices (unless the owner gave them)",
   "opening hours",
   "ratings or review counts"
  ]
 },
 "bakery": {
  "archetype": "culinary",
  "intent": "Show fresh bakes and take orders",
  "cta": "Order Fresh",
  "modules": [
   "product-grid",
   "order-enquiry",
   "gallery-strip"
  ],
  "noInvent": [
   "prices (unless the owner gave them)",
   "delivery promises",
   "ratings"
  ]
 },
 "hotel": {
  "archetype": "culinary",
  "intent": "Show rooms and drive direct bookings",
  "cta": "Book Your Stay",
  "modules": [
   "room-cards",
   "booking-enquiry",
   "gallery-strip"
  ],
  "noInvent": [
   "room tariffs (unless given)",
   "star ratings",
   "availability claims"
  ]
 },
 "gym": {
  "archetype": "wellness",
  "intent": "Convert visitors into members",
  "cta": "Join Now",
  "modules": [
   "bmi-calculator",
   "class-schedule",
   "trainer-cards"
  ],
  "noInvent": [
   "member counts",
   "guaranteed results",
   "prices (unless given)"
  ]
 },
 "yoga": {
  "archetype": "wellness",
  "intent": "Fill classes with calm, clear info",
  "cta": "Book a Session",
  "modules": [
   "class-schedule",
   "trainer-cards",
   "session-booking"
  ],
  "noInvent": [
   "health cure claims",
   "certifications (unless given)",
   "prices (unless given)"
  ]
 },
 "salon": {
  "archetype": "wellness",
  "intent": "Show services and fill appointments",
  "cta": "Book Appointment",
  "modules": [
   "service-menu",
   "appointment-booking",
   "gallery-strip"
  ],
  "noInvent": [
   "prices (unless given)",
   "product brand claims",
   "ratings"
  ]
 },
 "spa": {
  "archetype": "wellness",
  "intent": "Sell relaxation, book sessions",
  "cta": "Book a Session",
  "modules": [
   "service-menu",
   "session-booking",
   "gallery-strip"
  ],
  "noInvent": [
   "therapy cure claims",
   "prices (unless given)",
   "ratings"
  ]
 },
 "fashion": {
  "archetype": "retail",
  "intent": "Show the collection, drive enquiries",
  "cta": "Explore Styles",
  "modules": [
   "collection-grid",
   "size-guide",
   "enquiry-form"
  ],
  "noInvent": [
   "prices (unless given)",
   "discount claims",
   "stock claims"
  ]
 },
 "jewellery": {
  "archetype": "retail",
  "intent": "Build trust, invite store visits",
  "cta": "Book a Visit",
  "modules": [
   "collection-grid",
   "gold-rate-note",
   "visit-booking"
  ],
  "noInvent": [
   "gold rates or prices",
   "purity guarantees beyond BIS hallmark",
   "exchange offers"
  ]
 },
 "store": {
  "archetype": "retail",
  "intent": "Present products and take enquiries",
  "cta": "Enquire Now",
  "modules": [
   "product-grid",
   "enquiry-form",
   "gallery-strip"
  ],
  "noInvent": [
   "prices (unless given)",
   "delivery promises",
   "stock claims"
  ]
 },
 "grocery": {
  "archetype": "retail",
  "intent": "Daily needs, easy repeat orders",
  "cta": "Order on Call",
  "modules": [
   "category-grid",
   "order-enquiry",
   "delivery-area-note"
  ],
  "noInvent": [
   "prices (unless given)",
   "delivery time promises",
   "stock claims"
  ]
 },
 "electronics": {
  "archetype": "retail",
  "intent": "Show range, specs and service trust",
  "cta": "Enquire Now",
  "modules": [
   "product-grid",
   "emi-note",
   "service-enquiry"
  ],
  "noInvent": [
   "prices (unless given)",
   "warranty terms",
   "discount claims"
  ]
 },
 "auto": {
  "archetype": "retail",
  "intent": "Book services and build garage trust",
  "cta": "Book a Service",
  "modules": [
   "service-menu",
   "service-booking",
   "gallery-strip"
  ],
  "noInvent": [
   "prices (unless given)",
   "repair guarantees",
   "ratings"
  ]
 },
 "pets": {
  "archetype": "retail",
  "intent": "Care services pet parents can trust",
  "cta": "Book a Visit",
  "modules": [
   "service-menu",
   "visit-booking",
   "gallery-strip"
  ],
  "noInvent": [
   "medical claims",
   "prices (unless given)",
   "ratings"
  ]
 },
 "clinic": {
  "archetype": "healthcare",
  "intent": "Help patients book a visit with trust",
  "cta": "Book a Visit",
  "modules": [
   "doctor-cards",
   "appointment-enquiry",
   "timing-note"
  ],
  "noInvent": [
   "diagnosis or treatment claims",
   "doctor credentials (unless given)",
   "patient counts or success rates"
  ]
 },
 "dental": {
  "archetype": "healthcare",
  "intent": "Make dental visits feel easy",
  "cta": "Book a Checkup",
  "modules": [
   "service-menu",
   "appointment-enquiry",
   "care-guide"
  ],
  "noInvent": [
   "treatment outcomes",
   "prices (unless given)",
   "doctor credentials (unless given)"
  ]
 },
 "pharmacy": {
  "archetype": "healthcare",
  "intent": "Fast, trusted medicine enquiries",
  "cta": "Order on Call",
  "modules": [
   "category-grid",
   "order-enquiry",
   "delivery-area-note"
  ],
  "noInvent": [
   "medicine prices (unless given)",
   "delivery time promises",
   "medical advice"
  ]
 },
 "lawfirm": {
  "archetype": "advisory",
  "intent": "Present practice areas, invite consultation",
  "cta": "Request Consultation",
  "modules": [
   "practice-areas",
   "consultation-enquiry",
   "process-steps"
  ],
  "noInvent": [
   "case outcomes or win rates",
   "fees (unless given)",
   "bar council claims"
  ]
 },
 "finance": {
  "archetype": "advisory",
  "intent": "Explain services, invite a consultation",
  "cta": "Book a Consultation",
  "modules": [
   "service-menu",
   "consultation-enquiry",
   "process-steps"
  ],
  "noInvent": [
   "return or profit promises",
   "fees (unless given)",
   "licence or registration numbers"
  ]
 },
 "insurance": {
  "archetype": "advisory",
  "intent": "Explain cover simply, capture enquiries",
  "cta": "Request a Quote",
  "modules": [
   "plan-explainer",
   "quote-enquiry",
   "process-steps"
  ],
  "noInvent": [
   "premium amounts",
   "guaranteed claim approval",
   "insurer names (unless given)"
  ]
 },
 "school": {
  "archetype": "advisory",
  "intent": "Admissions info parents can trust",
  "cta": "Admission Enquiry",
  "modules": [
   "program-cards",
   "admission-enquiry",
   "gallery-strip"
  ],
  "noInvent": [
   "results or rank claims",
   "fees (unless given)",
   "affiliation claims (unless given)"
  ]
 },
 "coaching": {
  "archetype": "advisory",
  "intent": "Courses and batches, clearly explained",
  "cta": "Enquire Now",
  "modules": [
   "course-cards",
   "batch-schedule",
   "enquiry-form"
  ],
  "noInvent": [
   "results or selection claims",
   "fees (unless given)",
   "faculty credentials (unless given)"
  ]
 },
 "realestate": {
  "archetype": "property_events",
  "intent": "Showcase projects, book site visits",
  "cta": "Book a Site Visit",
  "modules": [
   "emi-calculator",
   "project-cards",
   "visit-booking"
  ],
  "noInvent": [
   "prices (unless given)",
   "possession dates",
   "RERA numbers",
   "appreciation promises"
  ]
 },
 "interior": {
  "archetype": "property_events",
  "intent": "Show portfolio, book consultations",
  "cta": "Book a Consultation",
  "modules": [
   "portfolio-grid",
   "consultation-enquiry",
   "process-steps"
  ],
  "noInvent": [
   "project prices (unless given)",
   "completion timelines",
   "brand tie-ups"
  ]
 },
 "construction": {
  "archetype": "property_events",
  "intent": "Show capability, win project enquiries",
  "cta": "Request an Estimate",
  "modules": [
   "project-grid",
   "estimate-enquiry",
   "process-steps"
  ],
  "noInvent": [
   "project costs (unless given)",
   "completion guarantees",
   "licence numbers"
  ]
 },
 "wedding": {
  "archetype": "property_events",
  "intent": "Show celebrations, start planning talks",
  "cta": "Start Planning",
  "modules": [
   "gallery-strip",
   "package-enquiry",
   "process-steps"
  ],
  "noInvent": [
   "package prices (unless given)",
   "vendor tie-ups",
   "ratings"
  ]
 },
 "events": {
  "archetype": "property_events",
  "intent": "Show past events, take bookings",
  "cta": "Start Planning",
  "modules": [
   "gallery-strip",
   "booking-enquiry",
   "process-steps"
  ],
  "noInvent": [
   "prices (unless given)",
   "client names (unless given)",
   "ratings"
  ]
 },
 "travel": {
  "archetype": "property_events",
  "intent": "Inspire trips, capture enquiries",
  "cta": "Plan My Trip",
  "modules": [
   "trip-cards",
   "enquiry-form",
   "gallery-strip"
  ],
  "noInvent": [
   "package prices (unless given)",
   "guaranteed availability",
   "visa promises"
  ]
 },
 "agency": {
  "archetype": "digital",
  "intent": "Show work, start project conversations",
  "cta": "Start a Project",
  "modules": [
   "portfolio-grid",
   "enquiry-form",
   "process-steps"
  ],
  "noInvent": [
   "client names or results (unless given)",
   "pricing",
   "team size claims"
  ]
 },
 "startup": {
  "archetype": "digital",
  "intent": "Tell the story, capture interest",
  "cta": "Get in Touch",
  "modules": [
   "feature-grid",
   "enquiry-form",
   "process-steps"
  ],
  "noInvent": [
   "funding or valuation claims",
   "user numbers",
   "revenue claims"
  ]
 },
 "saas": {
  "archetype": "digital",
  "intent": "Explain the product, request demos",
  "cta": "Request a Demo",
  "modules": [
   "feature-grid",
   "demo-enquiry",
   "pricing-note"
  ],
  "noInvent": [
   "customer counts",
   "uptime guarantees",
   "pricing (unless given)"
  ]
 },
 "portfolio": {
  "archetype": "digital",
  "intent": "Show the work, get hired",
  "cta": "Start a Project",
  "modules": [
   "portfolio-grid",
   "enquiry-form",
   "gallery-strip"
  ],
  "noInvent": [
   "client names (unless given)",
   "income claims",
   "ratings"
  ]
 },
 "photo": {
  "archetype": "digital",
  "intent": "Show the portfolio, book shoots",
  "cta": "Book a Shoot",
  "modules": [
   "gallery-strip",
   "booking-enquiry",
   "package-note"
  ],
  "noInvent": [
   "prices (unless given)",
   "publication claims",
   "ratings"
  ]
 },
 "generic": {
  "archetype": "other",
  "intent": "A clear, trustworthy business presence",
  "cta": "Get in Touch",
  "modules": [
   "feature-grid",
   "enquiry-form",
   "process-steps"
  ],
  "noInvent": [
   "prices (unless given)",
   "ratings or review counts",
   "customer numbers"
  ]
 }
};
/* Phase 4.4 — Healthcare disclaimer rule */
["clinic","dental","pharmacy"].forEach(function(k){ if(window.YUG_RULES.blueprints[k]) window.YUG_RULES.blueprints[k].requiresDisclaimer = true; });
/* Phase 4.5 — Advisory disclaimer markers */
window.YUG_RULES.blueprints.finance.disclaimerMarker = "not financial advice";
window.YUG_RULES.blueprints.insurance.disclaimerMarker = "not financial advice";
window.YUG_RULES.blueprints.lawfirm.disclaimerMarker = "not legal advice";
