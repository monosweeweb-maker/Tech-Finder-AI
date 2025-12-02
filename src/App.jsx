import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Refrigerator,
  Tv,
  Wind,
  Thermometer,
  Waves,
  ChevronRight,
  Check,
  ArrowLeft,
  Search,
  Cpu,
  Battery,
  Aperture,
  Sparkles,
  DollarSign,
  Globe,
  Loader2,
  ShoppingCart,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  RefreshCcw,
  Zap,
  Box,
  Car,
  Bike,
  Scissors,
  Monitor,
  Tablet,
  Home,
  User,
  MessageSquare,
  Armchair,
  Lock,
  Shirt,
  UtensilsCrossed,
  Droplets,
  Send,
  Bot,
  X,
  Info,
  Shield,
  Moon,
  Sun,
  ArrowRight,
  BrainCircuit,
  BarChart3,
  Layers,
  Banknote,
  Euro,
  PoundSterling,
  JapaneseYen,
  IndianRupee,
  Settings,
  Key
} from 'lucide-react';

/* --- VERCEL / LOCAL DEPLOYMENT INSTRUCTIONS ---
  
  1. API KEY (Method A - Recommended):
     - Create a .env file locally: VITE_GEMINI_API_KEY=AIzaSy...
     - In Vercel Settings > Environment Variables: Add VITE_GEMINI_API_KEY
     
  2. API KEY (Method B - Fallback):
     - If Method A fails, use the new "Settings" gear icon in the UI to paste your key manually.
*/

// --- Constants & Config ---

const COUNTRIES = [
  { code: 'US', name: 'United States', currency: '$', icon: DollarSign, market: 'amazon.com', affiliateTag: 'YOUR_US_TAG', maxLimit: 5000 },
  { code: 'IN', name: 'India', currency: '₹', icon: IndianRupee, market: 'amazon.in', affiliateTag: 'monoswee-21', maxLimit: 500000 },
  { code: 'UK', name: 'United Kingdom', currency: '£', icon: PoundSterling, market: 'amazon.co.uk', affiliateTag: 'YOUR_UK_TAG-21', maxLimit: 4000 },
  { code: 'CA', name: 'Canada', currency: 'C$', icon: DollarSign, market: 'amazon.ca', affiliateTag: 'YOUR_CA_TAG-20', maxLimit: 6000 },
  { code: 'AU', name: 'Australia', currency: 'A$', icon: DollarSign, market: 'amazon.com.au', affiliateTag: 'YOUR_AU_TAG-22', maxLimit: 7000 },
  { code: 'DE', name: 'Germany', currency: '€', icon: Euro, market: 'amazon.de', affiliateTag: 'YOUR_DE_TAG-21', maxLimit: 5000 },
  { code: 'JP', name: 'Japan', currency: '¥', icon: JapaneseYen, market: 'amazon.co.jp', affiliateTag: 'YOUR_JP_TAG-22', maxLimit: 600000 },
  { code: 'OT', name: 'Other (Global)', currency: '$', icon: Banknote, market: 'google.com', affiliateTag: '', maxLimit: 5000 }
];

const CATEGORIES = [
  { id: 'smartphone', name: 'Smartphone', icon: Smartphone, hasSub: false },
  { id: 'tablet', name: 'Tablets', icon: Tablet, hasSub: false },
  { id: 'computer', name: 'Computers & PC', icon: Monitor, hasSub: true },
  { id: 'appliance', name: 'Home Appliances', icon: Refrigerator, hasSub: true },
  { id: 'smart_home', name: 'Smart Home', icon: Home, hasSub: true },
  { id: 'personal_care', name: 'Personal Care', icon: User, hasSub: true },
  { id: 'automobile', name: 'Automobiles', icon: Car, hasSub: false },
  { id: 'smartwatch', name: 'Smartwatch', icon: Watch, hasSub: false },
  { id: 'headphones', name: 'Headphones', icon: Headphones, hasSub: false },
];

const SUB_CATEGORIES = {
  computer: [
    { id: 'laptop', name: 'Laptop', icon: Laptop },
    { id: 'aio', name: 'All-in-One PC', icon: Monitor },
    { id: 'desktop', name: 'Desktop PC', icon: Box },
    { id: 'gpu', name: 'Graphics Card', icon: Cpu },
  ],
  appliance: [
    { id: 'tv', name: 'Smart TV', icon: Tv },
    { id: 'fridge', name: 'Refrigerator', icon: Refrigerator },
    { id: 'washing_machine', name: 'Washing Machine', icon: Waves },
    { id: 'ac', name: 'Air Conditioner', icon: Wind },
    { id: 'microwave', name: 'Microwave/Oven', icon: Zap },
    { id: 'air_fryer', name: 'Air Fryer', icon: UtensilsCrossed },
    { id: 'iron', name: 'Iron/Steamer', icon: Shirt },
    { id: 'dryer', name: 'Clothes Dryer', icon: Wind },
    { id: 'washer_dryer', name: 'Washer-Dryer Combo', icon: Waves },
  ],
  smart_home: [
    { id: 'robot_vac', name: 'Robot Vacuum', icon: Zap },
    { id: 'smart_lock', name: 'Smart Lock', icon: Lock },
    { id: 'smart_curtain', name: 'Smart Curtain', icon: Armchair },
    { id: 'smart_speaker', name: 'Smart Speaker', icon: MessageSquare },
    { id: 'smart_light', name: 'Smart Lighting', icon: Zap },
  ],
  personal_care: [
    { id: 'hair_dryer', name: 'Hair Dryer', icon: Wind },
    { id: 'trimmer', name: 'Trimmer/Shaver', icon: Scissors },
    { id: 'straightener', name: 'Hair Straightener', icon: Sparkles },
    { id: 'epilator', name: 'Epilator', icon: Zap },
  ]
};

const PRIORITIES = {
  smartphone: ['Performance (Gaming/Speed)', 'Camera Quality', 'Battery Life', 'Clean Software (UI)', 'Display Quality', 'Build Quality/Design', 'Value for Money', 'Brand Prestige'],
  tablet: ['Display Quality', 'Performance', 'Battery Life', 'Pencil/Stylus Support', 'Weight/Portability', 'Cellular Connectivity'],
  smartwatch: ['Health Tracking', 'Battery Life', 'Style', 'Smart Features', 'Ruggedness'],
  headphones: ['Sound Quality', 'ANC', 'Comfort', 'Battery', 'Mic Quality'],
  laptop: ['Performance (CPU/GPU)', 'Portability', 'Battery', 'Screen Quality', 'Build Quality'],
  aio: ['Screen Size/Quality', 'Performance', 'Design/Esthetics', 'Space Saving', 'Included Accessories'],
  desktop: ['Raw Performance', 'Upgradability', 'Cooling', 'Aesthetics/RGB', 'Value'],
  gpu: ['Gaming Performance (FPS)', 'VRAM Capacity', 'Ray Tracing', 'Power Efficiency', 'Thermal Performance'],
  tv: ['Picture Quality (OLED/QLED)', 'Sound', 'Size', 'Gaming (120Hz)', 'Smart OS'],
  ac: ['Cooling Speed', 'Efficiency (ISEER)', 'Noise', 'Smart Features', 'Durability'],
  washing_machine: ['Wash Quality', 'Efficiency', 'Noise', 'Dryer Capability', 'Programs'],
  fridge: ['Cooling Tech', 'Capacity', 'Efficiency', 'Convertible Modes', 'Design'],
  microwave: ['Cooking Modes', 'Capacity', 'Ease of Use', 'Power Consumption', 'Design'],
  air_fryer: ['Capacity', 'Cooking Speed', 'Cleaning Ease', 'Presets', 'Noise'],
  iron: ['Steam Output', 'Weight', 'Glide', 'Cord Length', 'Heating Speed'],
  dryer: ['Drying Speed', 'Fabric Care', 'Energy Efficiency', 'Capacity', 'Noise'],
  washer_dryer: ['Convenience', 'Wash+Dry Speed', 'Efficiency', 'Capacity', 'Reliability'],
  robot_vac: ['Suction Power', 'Mopping Capability', 'Navigation/Mapping', 'Self-Emptying', 'Obstacle Avoidance'],
  smart_lock: ['Security Features', 'Unlock Methods', 'Connectivity (WiFi/BT)', 'Battery Life', 'Design'],
  smart_curtain: ['Motor Strength', 'Noise Level', 'Battery/Solar', 'Smart Integration', 'Installation Ease'],
  smart_speaker: ['Sound Quality', 'Voice Assistant', 'Microphone Sensitivity', 'Design', 'Ecosystem'],
  smart_light: ['Brightness', 'Color Range', 'Connectivity', 'App Features', 'Lifespan'],
  hair_dryer: ['Drying Speed', 'Heat Protection', 'Weight', 'Attachments', 'Noise'],
  trimmer: ['Battery Life', 'Blade Sharpness', 'Length Settings', 'Waterproof', 'Charging Speed'],
  straightener: ['Heating Speed', 'Plate Material', 'Heat Control', 'Cord Swivel', 'Safety'],
  automobile: ['Mileage/Range', 'Safety Rating', 'Comfort/Ride Quality', 'Performance/Power', 'Maintenance Cost', 'Features/Tech', 'Resale Value', 'Brand Reliability']
};

const BudgetSlider = ({ min, max, currency, onChange, limit }) => {
  const getPercent = (value) => Math.round(((value) / limit) * 100);
  const minPercent = getPercent(min);
  const maxPercent = getPercent(max);

  return (
    <div className="w-full px-2 py-4">
      <div className="relative w-full h-12">
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full -translate-y-1/2"></div>
        <div className="absolute top-1/2 h-2 bg-blue-600 rounded-full -translate-y-1/2 pointer-events-none z-10" style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}></div>
        <input type="range" min={0} max={limit} value={min} onChange={(e) => { const value = Math.min(Number(e.target.value), max - (limit * 0.05)); onChange(value, max); }} className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-auto z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 transition-all" />
        <input type="range" min={0} max={limit} value={max} onChange={(e) => { const value = Math.max(Number(e.target.value), min + (limit * 0.05)); onChange(min, value); }} className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-auto z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 transition-all" />
      </div>
      <div className="flex justify-between items-center gap-4 mt-2">
        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 font-bold ml-1">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{currency}</span>
            <input type="number" value={min} onChange={(e) => onChange(Number(e.target.value), max)} className="w-full pl-8 pr-3 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 font-bold ml-1">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{currency}</span>
            <input type="number" value={max} onChange={(e) => onChange(min, Number(e.target.value))} className="w-full pl-8 pr-3 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- API Helper ---
// Helper to safely get API key from environment (Vite) or local storage
const getApiKey = () => {
  let key = "";
  // Try to get from Vite Env
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      key = import.meta.env.VITE_GEMINI_API_KEY || "";
    }
  } catch (e) { console.log("Env read error (expected in some environments)"); }

  // If not found in env, check local storage
  if (!key) {
    key = localStorage.getItem('gemini_api_key') || "";
  }
  return key;
};

async function fetchRecommendations(formData, apiKey) {
  if (!apiKey) throw new Error("API Key Missing! Please configure it in Settings (Gear Icon) or check your Environment Variables.");

  const currentDate = new Date().toLocaleDateString();
  let productQuery = formData.subCategory?.name || formData.category?.name || "Device";

  if (formData.category?.id === 'automobile') {
    productQuery = `${formData.autoUsage} ${formData.autoWheels}-Wheeler ${formData.autoFuel} Vehicle`;
  }

  const categoryId = formData.category?.id;
  let recencyInstruction = "Suggest top-rated, current models available now (released within last 1-2 years).";
  if (categoryId === 'smartphone') {
    recencyInstruction = "Strictly prioritize devices released in the last 6 months.";
  }

  const currencySymbol = formData.country.currency;
  const isNoLimit = formData.maxBudget >= formData.country.maxLimit;
  const budgetPrompt = isNoLimit
    ? `Minimum ${currencySymbol}${formData.minBudget} (NO UPPER PRICE LIMIT - Suggest the best possible options regardless of cost)`
    : `Between ${currencySymbol}${formData.minBudget} and ${currencySymbol}${formData.maxBudget}`;

  const prompt = `
    Role: Expert Shopping Assistant.
    Current Date: ${currentDate}.
    
    Task: Suggest exactly 3 models of: "${productQuery}" for a user in ${formData.country.name}.
    
    User Constraints:
    1. Product: ${productQuery} (STRICTLY ENFORCE THIS).
    2. Budget Range: ${budgetPrompt} (STRICTLY ENFORCE).
    3. Priorities: 1. ${formData.priority1}, 2. ${formData.priority2}, 3. ${formData.priority3}.
    4. Preferences: ${formData.preferences || "None specified"}.
    5. Internal Rule: ${recencyInstruction}
    
    CRITICAL LOGIC:
    - If "NO UPPER PRICE LIMIT" is set, suggest the absolute best/flagship/luxury options.
    - If the max budget is clearly too low for the product:
      - Return an EMPTY "results" array.
      - Set "errorType" to "budget_low".
      - Generate a FUNNY, CHEEKY ROAST about the budget.
    - If valid, return standard JSON.
    
    Output Format: JSON Object ONLY.
    {
      "results": [
        {
          "name": "Full Name",
          "price": "Exact Price",
          "releaseDate": "Date",
          "matchScore": "90%",
          "reason": "Why it fits...",
          "specs": ["Spec 1", "Spec 2"],
          "pros": ["Pro 1"],
          "cons": ["Con 1"]
        }
      ],
      "error": {
        "type": "budget_low" | "no_match" | null,
        "message": "Only required if results array is empty."
      }
    }
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        }),
      }
    );
    if (!response.ok) throw new Error("API Request Failed. Check your API Key or Quota.");
    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}

async function fetchDeepDive(productName, country, apiKey) {
  if (!apiKey) return null;
  const prompt = `Analyze the "${productName}" for a buyer in ${country}. Provide a concise, brutal, and honest analysis in JSON format. Output JSON: { "bestFeature": "...", "worstFlaw": "...", "perfectFor": "...", "verdict": "..." }`;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } }) });
    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (e) { return null; }
}

async function fetchChatResponse(query, contextProducts, countryData, apiKey) {
  if (!apiKey) return "API Key Missing.";
  const productContext = contextProducts.map(p => {
    const safeName = encodeURIComponent(p.name);
    const affiliateSuffix = countryData.affiliateTag ? `&tag=${countryData.affiliateTag}` : '';
    const buyLink = `https://www.${countryData.market}/s?k=${safeName}${affiliateSuffix}`;
    return `Product: ${p.name}\nPrice: ${p.price}\nDirect Buy Link: ${buyLink}`;
  }).join("\n\n");

  const prompt = `You are a TechFinder Personal Shopping Consultant. Context: ${productContext}. User Question: "${query}". Task: Answer briefly. If purchase intent, use: [BUTTON: Buy {ProductName} on Amazon]({DirectBuyLink}). Use *bold* for product names.`;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (e) { return "Sorry, I couldn't process that question right now."; }
}

// --- Components ---

const SettingsModal = ({ isOpen, onClose, currentKey, onSave }) => {
  const [keyInput, setKeyInput] = useState(currentKey);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2"><Settings size={18} /> Settings</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><X size={20} /></button>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Google Gemini API Key</label>
          <div className="relative">
            <Key size={16} className="absolute left-3 top-3 text-gray-400" />
            <input type="password" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} placeholder="AIzaSy..." className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
          </div>
          <p className="text-xs text-gray-400 mt-2">Enter your API key here if environment variables are not working. It is stored locally in your browser.</p>
        </div>
        <button onClick={() => { onSave(keyInput); onClose(); }} className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">Save Settings</button>
      </div>
    </div>
  );
};

// ... [StepIndicator, Card, LandingPage, PrivacyPolicy, FeedbackForm Components remain same] ...
// Re-declaring for clarity in single file logic
const StepIndicator = ({ currentStep }) => (
  <div className="flex justify-center mb-8">
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step <= currentStep ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{step}</div>
          {step < 4 && <div className={`w-12 h-1 mx-2 rounded transition-all duration-300 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
        </div>
      ))}
    </div>
  </div>
);
const Card = ({ selected, onClick, children, className = "" }) => (
  <div onClick={onClick} className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 relative overflow-hidden ${selected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md transform scale-[1.02]' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 hover:shadow-sm'} ${className}`}>
    {selected && <div className="absolute top-3 right-3 text-blue-600 dark:text-blue-400"><Check size={20} strokeWidth={3} /></div>}
    {children}
  </div>
);
const LandingPage = ({ onStart, onPrivacy }) => (
  <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
    <section className="text-center py-20 px-4">
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6 animate-in fade-in zoom-in duration-500 delay-100 border border-blue-100 dark:border-blue-800"><Sparkles size={14} className="mr-2" /> AI-Powered Shopping V2.0</div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent pb-2">Smart Shopping, <br /> Simplified.</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">Stop wasting hours watching reviews. Tell us your budget and priorities, and our AI will find the perfect match.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onStart} className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2">Find My Product <ArrowRight size={20} /></button>
        <button onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-lg font-bold rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">How it works</button>
      </div>
    </section>
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{ icon: MessageSquare, title: "Personal Consultant", desc: "Chat with AI to compare models." }, { icon: Layers, title: "Deep Dive Analysis", desc: "Get critical 'Buy or Skip' verdicts." }, { icon: Globe, title: "Global Support", desc: "Works for Amazon US, India, UK & more." }, { icon: BarChart3, title: "Live Pricing", desc: "Real-time links to check current deals." }].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition-all bg-white dark:bg-gray-800">
              <f.icon className="w-8 h-8 text-gray-700 dark:text-gray-300 mb-4" /><h4 className="font-bold text-gray-900 dark:text-white">{f.title}</h4><p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <footer className="text-center pt-20 pb-10 border-t border-gray-200 dark:border-gray-800"><p className="text-gray-500 dark:text-gray-400 mb-4">© 2024 TechFinder AI. All rights reserved.</p><button onClick={onPrivacy} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</button></footer>
  </div>
);
const PrivacyPolicy = ({ onBack }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto py-12 px-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 my-8">
    <button onClick={onBack} className="mb-6 flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"><ArrowLeft size={16} className="mr-2" /> Back to Home</button>
    <div className="prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">At TechFinder AI, we prioritize your privacy.</p>
      <h3 className="text-xl font-bold mt-8 mb-2 text-gray-800 dark:text-gray-200">1. Data Collection</h3><p className="text-gray-600 dark:text-gray-300 mb-4">We do not store your personal search history, preferences, or chat logs on our servers. All processing is done in real-time using the Gemini API.</p>
      <h3 className="text-xl font-bold mt-8 mb-2 text-gray-800 dark:text-gray-200">2. Affiliate Links</h3><p className="text-gray-600 dark:text-gray-300 mb-4">This website uses Amazon Affiliate links. We may earn a small commission at no extra cost to you.</p>
    </div>
  </div>
);
const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (<div className="mt-16 bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl text-center border border-green-100 dark:border-green-900"><div className="inline-block p-3 bg-green-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-400 mb-4"><Check size={24} /></div><h3 className="text-xl font-bold text-gray-800 dark:text-white">Thank You!</h3></div>);
  return (<div className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"><h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Help us improve</h3><form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><input type="text" placeholder="Your Name" required className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg w-full dark:text-white" /><textarea placeholder="Suggestions?" rows={3} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg dark:text-white" /><button type="submit" className="px-6 py-2 bg-gray-900 dark:bg-blue-600 text-white rounded-lg">Send Feedback</button></form></div>);
};
const DeepDiveModal = ({ product, isOpen, onClose, apiKey }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (isOpen && product) { setLoading(true); setAnalysis(null); fetchDeepDive(product.name, "your region", apiKey).then(data => { setAnalysis(data); setLoading(false); }); } }, [isOpen, product, apiKey]);
  if (!isOpen) return null;
  return (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"><div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-6 relative"><button onClick={onClose} className="absolute top-4 right-4"><X size={20} /></button><h4 className="text-lg font-bold text-center mb-4 dark:text-white">{product.name}</h4>{loading ? <Loader2 className="animate-spin mx-auto text-blue-600" /> : analysis ? <div className="space-y-4 text-sm dark:text-gray-300"><p><strong>⭐ Best:</strong> {analysis.bestFeature}</p><p><strong>⚠️ Worst:</strong> {analysis.worstFlaw}</p><p><strong>👤 For:</strong> {analysis.perfectFor}</p><p className="font-bold text-center">Verdict: {analysis.verdict}</p></div> : <p className="text-center text-red-500">Failed.</p>}</div></div>);
};

export default function App() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [deepDiveProduct, setDeepDiveProduct] = useState(null);
  const [chatQuery, setChatQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userApiKey, setUserApiKey] = useState("");

  // Load API Key
  useEffect(() => {
    const stored = localStorage.getItem('gemini_api_key');
    if (stored) setUserApiKey(stored);
    else setUserApiKey(getApiKey());
  }, []);

  const handleSaveKey = (key) => {
    localStorage.setItem('gemini_api_key', key);
    setUserApiKey(key);
  };

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const [formData, setFormData] = useState({
    country: null, category: null, subCategory: null, autoUsage: 'Private', autoWheels: '4', autoFuel: 'Petrol/Diesel', minBudget: 0, maxBudget: 1000, priority1: '', priority2: '', priority3: '', preferences: ''
  });

  useEffect(() => {
    if (formData.country) setFormData(prev => ({ ...prev, minBudget: 0, maxBudget: Math.round(prev.country.maxLimit * 0.5) }));
  }, [formData.country]);

  const handleSelection = (field, value) => {
    if (field === 'category') {
      if (value.hasSub) { setFormData(prev => ({ ...prev, category: value, subCategory: null })); return; }
      else { setFormData(prev => ({ ...prev, category: value, subCategory: null })); setTimeout(() => setStep(prev => prev + 1), 350); return; }
    }
    if (field === 'subCategory') { setFormData(prev => ({ ...prev, subCategory: value })); setTimeout(() => setStep(prev => prev + 1), 350); return; }
    setFormData(prev => ({ ...prev, [field]: value })); setTimeout(() => setStep(prev => prev + 1), 350);
  };

  const handleNext = () => {
    if (step === 1 && !formData.country) return;
    if (step === 2) { if (!formData.category) return; if (formData.category.hasSub && !formData.subCategory) return; }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 2 && formData.category?.hasSub) { setFormData(prev => ({ ...prev, category: null, subCategory: null })); return; }
    setStep(step - 1);
  };

  const handleFormSubmit = async () => {
    if (!formData.priority1) return;
    setLoading(true); setError(null); setStep(4);
    try {
      const results = await fetchRecommendations(formData, userApiKey);
      setRecommendations(results);
    } catch (err) {
      setError(err.message || "Failed to generate recommendations. Please try again.");
    } finally { setLoading(false); }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    const userQ = chatQuery; setChatQuery(""); setChatHistory(prev => [...prev, { type: 'user', text: userQ }]); setChatLoading(true);
    const response = await fetchChatResponse(userQ, recommendations.results, formData.country, userApiKey);
    setChatHistory(prev => [...prev, { type: 'ai', text: response }]); setChatLoading(false);
  };

  const resetApp = () => {
    setStep(0); setRecommendations(null); setChatHistory([]);
    setFormData(prev => ({ country: null, category: null, subCategory: null, autoUsage: 'Private', autoWheels: '4', autoFuel: 'Petrol/Diesel', minBudget: 0, maxBudget: 1000, priority1: '', priority2: '', priority3: '', preferences: '' }));
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-slate-800'}`}>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={resetApp}>
            <Sparkles size={24} className="text-blue-500" fill="currentColor" />
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">TechFinder<span className="text-gray-400 font-light">AI</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowSettings(true)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"><Settings size={20} /></button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 pb-28">
        {step > 0 && <StepIndicator currentStep={step} />}
        <div className="min-h-[500px]">
          {step === 'privacy' && <PrivacyPolicy onBack={() => setStep(0)} />}
          {step === 0 && <LandingPage onStart={() => setStep(1)} onPrivacy={() => setStep('privacy')} />}
          {step === 1 && renderCountryStep()}
          {step === 2 && renderCategoryStep()}
          {step === 3 && renderDetailsForm()}
          {step === 4 && renderResults()}
        </div>
      </main>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} currentKey={userApiKey} onSave={handleSaveKey} />
      <DeepDiveModal product={deepDiveProduct} isOpen={!!deepDiveProduct} onClose={() => setDeepDiveProduct(null)} apiKey={userApiKey} />

      {step > 0 && step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-40">
          <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
            <button onClick={handleBack} disabled={step === 1} className={`flex items-center px-4 md:px-6 py-3 rounded-lg font-medium transition-colors ${step === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}><ArrowLeft size={20} className="mr-2" /> Back</button>
            {step === 3 ? (
              <button onClick={handleFormSubmit} disabled={!formData.priority1} className={`flex-1 md:flex-none flex items-center justify-center px-4 md:px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${!formData.priority1 ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-0.5'}`}><span className="hidden md:inline">Find My Device</span><span className="md:hidden">Search</span><Search size={20} className="ml-2" /></button>
            ) : (
              (step === 2 && formData.category?.hasSub && !formData.subCategory) ? null : <button onClick={handleNext} disabled={(step === 1 && !formData.country) || (step === 2 && !formData.category)} className={`flex items-center px-6 md:px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${(step === 1 && !formData.country) || (step === 2 && !formData.category) ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-0.5'}`}>Next <ChevronRight size={20} className="ml-1" /></button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}