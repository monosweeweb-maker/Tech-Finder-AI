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
  Layers
} from 'lucide-react';

/* IMPORTANT FOR VERCEL DEPLOYMENT:
  To make Dark Mode work, your tailwind.config.js MUST have:
  
  export default {
    darkMode: 'class', // <--- Add this line
    content: [ ... ],
    theme: { ... },
    plugins: [],
  }
*/

// --- Constants & Config ---

const COUNTRIES = [
  { code: 'US', name: 'United States', currency: '$', market: 'amazon.com', affiliateTag: 'YOUR_US_TAG', maxLimit: 5000 },
  { code: 'IN', name: 'India', currency: '₹', market: 'amazon.in', affiliateTag: 'monoswee-21', maxLimit: 500000 },
  { code: 'UK', name: 'United Kingdom', currency: '£', market: 'amazon.co.uk', affiliateTag: 'YOUR_UK_TAG-21', maxLimit: 4000 },
  { code: 'CA', name: 'Canada', currency: 'C$', market: 'amazon.ca', affiliateTag: 'YOUR_CA_TAG-20', maxLimit: 6000 },
  { code: 'AU', name: 'Australia', currency: 'A$', market: 'amazon.com.au', affiliateTag: 'YOUR_AU_TAG-22', maxLimit: 7000 },
  { code: 'DE', name: 'Germany', currency: '€', market: 'amazon.de', affiliateTag: 'YOUR_DE_TAG-21', maxLimit: 5000 },
  { code: 'JP', name: 'Japan', currency: '¥', market: 'amazon.co.jp', affiliateTag: 'YOUR_JP_TAG-22', maxLimit: 600000 },
  { code: 'OT', name: 'Other (Global)', currency: '$', market: 'google.com', affiliateTag: '', maxLimit: 5000 }
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
  // --- Core ---
  smartphone: ['Performance (Gaming/Speed)', 'Camera Quality', 'Battery Life', 'Clean Software (UI)', 'Display Quality', 'Build Quality/Design', 'Value for Money', 'Brand Prestige'],
  tablet: ['Display Quality', 'Performance', 'Battery Life', 'Pencil/Stylus Support', 'Weight/Portability', 'Cellular Connectivity'],
  smartwatch: ['Health Tracking', 'Battery Life', 'Style', 'Smart Features', 'Ruggedness'],
  headphones: ['Sound Quality', 'ANC', 'Comfort', 'Battery', 'Mic Quality'],

  // --- Computer ---
  laptop: ['Performance (CPU/GPU)', 'Portability', 'Battery', 'Screen Quality', 'Build Quality'],
  aio: ['Screen Size/Quality', 'Performance', 'Design/Esthetics', 'Space Saving', 'Included Accessories'],
  desktop: ['Raw Performance', 'Upgradability', 'Cooling', 'Aesthetics/RGB', 'Value'],
  gpu: ['Gaming Performance (FPS)', 'VRAM Capacity', 'Ray Tracing', 'Power Efficiency', 'Thermal Performance'],

  // --- Appliances ---
  tv: ['Picture Quality (OLED/QLED)', 'Sound', 'Size', 'Gaming (120Hz)', 'Smart OS'],
  ac: ['Cooling Speed', 'Efficiency (ISEER)', 'Noise', 'Smart Features', 'Durability'],
  washing_machine: ['Wash Quality', 'Efficiency', 'Noise', 'Dryer Capability', 'Programs'],
  fridge: ['Cooling Tech', 'Capacity', 'Efficiency', 'Convertible Modes', 'Design'],
  microwave: ['Cooking Modes', 'Capacity', 'Ease of Use', 'Power Consumption', 'Design'],
  air_fryer: ['Capacity', 'Cooking Speed', 'Cleaning Ease', 'Presets', 'Noise'],
  iron: ['Steam Output', 'Weight', 'Glide', 'Cord Length', 'Heating Speed'],
  dryer: ['Drying Speed', 'Fabric Care', 'Energy Efficiency', 'Capacity', 'Noise'],
  washer_dryer: ['Convenience', 'Wash+Dry Speed', 'Efficiency', 'Capacity', 'Reliability'],

  // --- Smart Home ---
  robot_vac: ['Suction Power', 'Mopping Capability', 'Navigation/Mapping', 'Self-Emptying', 'Obstacle Avoidance'],
  smart_lock: ['Security Features', 'Unlock Methods', 'Connectivity (WiFi/BT)', 'Battery Life', 'Design'],
  smart_curtain: ['Motor Strength', 'Noise Level', 'Battery/Solar', 'Smart Integration', 'Installation Ease'],
  smart_speaker: ['Sound Quality', 'Voice Assistant', 'Microphone Sensitivity', 'Design', 'Ecosystem'],
  smart_light: ['Brightness', 'Color Range', 'Connectivity', 'App Features', 'Lifespan'],

  // --- Personal Care ---
  hair_dryer: ['Drying Speed', 'Heat Protection', 'Weight', 'Attachments', 'Noise'],
  trimmer: ['Battery Life', 'Blade Sharpness', 'Length Settings', 'Waterproof', 'Charging Speed'],
  straightener: ['Heating Speed', 'Plate Material', 'Heat Control', 'Cord Swivel', 'Safety'],

  // --- Auto (Generic Fallback) ---
  automobile: ['Mileage/Range', 'Safety Rating', 'Comfort/Ride Quality', 'Performance/Power', 'Maintenance Cost', 'Features/Tech', 'Resale Value', 'Brand Reliability']
};

// --- Custom Dual Slider Component ---
const BudgetSlider = ({ min, max, currency, onChange, limit }) => {
  const getPercent = (value) => Math.round(((value) / limit) * 100);
  const minPercent = getPercent(min);
  const maxPercent = getPercent(max);

  return (
    <div className="w-full px-2 py-4">
      <div className="relative w-full h-12">
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full -translate-y-1/2"></div>
        <div
          className="absolute top-1/2 h-2 bg-blue-600 rounded-full -translate-y-1/2 pointer-events-none z-10"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        ></div>
        <input
          type="range"
          min={0}
          max={limit}
          value={min}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), max - (limit * 0.05));
            onChange(value, max);
          }}
          className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-auto z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
        />
        <input
          type="range"
          min={0}
          max={limit}
          value={max}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), min + (limit * 0.05));
            onChange(min, value);
          }}
          className="absolute top-1/2 left-0 w-full -translate-y-1/2 appearance-none bg-transparent pointer-events-auto z-20 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
        />
      </div>
      <div className="flex justify-between items-center gap-4 mt-2">
        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 font-bold ml-1">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{currency}</span>
            <input
              type="number"
              value={min}
              onChange={(e) => onChange(Number(e.target.value), max)}
              className="w-full pl-8 pr-3 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-gray-400 font-bold ml-1">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{currency}</span>
            <input
              type="number"
              value={max}
              onChange={(e) => onChange(min, Number(e.target.value))}
              className="w-full pl-8 pr-3 py-2 border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- API Logic ---
const apiKey = ""; // <--- PASTE YOUR GOOGLE GEMINI API KEY HERE BEFORE DEPLOYING TO VERCEL

async function fetchRecommendations(formData) {
  if (!apiKey) throw new Error("API Key Missing! Please add your Gemini API Key in the code (Line ~205).");

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
    // Pass the actual error message up
    throw error;
  }
}

async function fetchDeepDive(productName, country) {
  if (!apiKey) return null;
  const prompt = `
    Analyze the "${productName}" for a buyer in ${country}.
    Provide a concise, brutal, and honest analysis in JSON format.
    Output JSON: { "bestFeature": "...", "worstFlaw": "...", "perfectFor": "...", "verdict": "..." }
  `;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } }),
      }
    );
    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (e) { return null; }
}

async function fetchChatResponse(query, contextProducts, countryData) {
  if (!apiKey) return "API Key Missing.";
  const productContext = contextProducts.map(p => {
    const safeName = encodeURIComponent(p.name);
    const affiliateSuffix = countryData.affiliateTag ? `&tag=${countryData.affiliateTag}` : '';
    const buyLink = `https://www.${countryData.market}/s?k=${safeName}${affiliateSuffix}`;
    return `Product: ${p.name}\nPrice: ${p.price}\nDirect Buy Link: ${buyLink}`;
  }).join("\n\n");

  const prompt = `
    You are a TechFinder Personal Shopping Consultant.
    Current Recommended Products:
    ${productContext}
    User Question: "${query}"
    Task: 
    1. Answer specifically about these products. Compare if asked.
    2. Keep it brief (under 60 words).
    3. CRITICAL: If user asks where to buy or shows purchase intent:
       - Use this format: [BUTTON: Buy {ProductName} on Amazon]({DirectBuyLink})
    4. Use *bold* for product names.
  `;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (e) { return "Sorry, I couldn't process that question right now."; }
}

// --- Components ---

const StepIndicator = ({ currentStep }) => (
  <div className="flex justify-center mb-8">
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step <= currentStep ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
            {step}
          </div>
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
    {/* Hero */}
    <section className="text-center py-20 px-4">
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6 animate-in fade-in zoom-in duration-500 delay-100 border border-blue-100 dark:border-blue-800">
        <Sparkles size={14} className="mr-2" /> AI-Powered Shopping V2.0
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent pb-2">
        Smart Shopping, <br /> Simplified.
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
        Stop wasting hours watching reviews. Tell us your budget and priorities, and our AI will find the perfect match in seconds.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={onStart} className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2">
          Find My Product <ArrowRight size={20} />
        </button>
        <button onClick={() => { document.getElementById('features').scrollIntoView({ behavior: 'smooth' }); }} className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-lg font-bold rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
          How it works
        </button>
      </div>

      {/* Visual Placeholder */}
      <div className="mt-16 relative max-w-5xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-950 via-transparent to-transparent z-10 h-full w-full pointer-events-none"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 dark:opacity-40 blur-[1px] scale-95 hover:scale-100 hover:opacity-100 hover:blur-0 transition-all duration-700 cursor-default">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4 text-blue-600"><Smartphone size={32} /></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-blue-200 dark:border-blue-900 transform -translate-y-6 md:-translate-y-12 flex flex-col items-center ring-4 ring-blue-50 dark:ring-blue-900/20">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mb-4 text-purple-600"><Laptop size={32} /></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="mt-4 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">98% Match</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mb-4 text-orange-600"><Headphones size={32} /></div>
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </section>

    {/* Value Prop */}
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why use TechFinder AI?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">We combine real-time market data with advanced LLMs to verify that you're getting the best bang for your buck.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-750 transition-colors">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 mb-6"><Zap size={24} /></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Instant Recommendations</h3>
            <p className="text-gray-600 dark:text-gray-400">Get a curated list of the top 3 products that match your specific needs in seconds, not hours.</p>
          </div>
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-750 transition-colors">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 mb-6"><BrainCircuit size={24} /></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Unbiased AI Analysis</h3>
            <p className="text-gray-600 dark:text-gray-400">Our AI analyzes specs, reviews, and hidden flaws to give you the brutal truth about every product.</p>
          </div>
          <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-gray-750 transition-colors">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-green-600 mb-6"><DollarSign size={24} /></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Budget Optimization</h3>
            <p className="text-gray-600 dark:text-gray-400">We respect your wallet. Set a strict range or go limitless, and we'll find the best value for every penny.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: MessageSquare, title: "Personal Consultant", desc: "Chat with AI to compare models." },
            { icon: Layers, title: "Deep Dive Analysis", desc: "Get critical 'Buy or Skip' verdicts." },
            { icon: Globe, title: "Global Support", desc: "Works for Amazon US, India, UK & more." },
            { icon: BarChart3, title: "Live Pricing", desc: "Real-time links to check current deals." }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 border border-gray-200 dark:border-gray-800 rounded-xl hover:shadow-lg transition-all bg-white dark:bg-gray-800">
              <f.icon className="w-8 h-8 text-gray-700 dark:text-gray-300 mb-4" />
              <h4 className="font-bold text-gray-900 dark:text-white">{f.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="text-center pt-20 pb-10 border-t border-gray-200 dark:border-gray-800">
      <p className="text-gray-500 dark:text-gray-400 mb-4">© 2024 TechFinder AI. All rights reserved.</p>
      <button onClick={onPrivacy} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</button>
    </footer>
  </div>
);

const PrivacyPolicy = ({ onBack }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto py-12 px-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 my-8">
    <button onClick={onBack} className="mb-6 flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
      <ArrowLeft size={16} className="mr-2" /> Back to Home
    </button>
    <div className="prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">At TechFinder AI, we prioritize your privacy. This policy outlines how we handle your data.</p>

      <h3 className="text-xl font-bold mt-8 mb-2 text-gray-800 dark:text-gray-200">1. Data Collection</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">We do not store your personal search history, preferences, or chat logs on our servers. All processing is done in real-time using the Gemini API and is transient.</p>

      <h3 className="text-xl font-bold mt-8 mb-2 text-gray-800 dark:text-gray-200">2. Affiliate Links</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">This website uses Amazon Affiliate links. When you click on a "Check on Amazon" button, we may earn a small commission at no extra cost to you. This helps support the development of this free tool.</p>

      <h3 className="text-xl font-bold mt-8 mb-2 text-gray-800 dark:text-gray-200">3. Third-Party Services</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">We use Google's Gemini API for generating recommendations. Please refer to Google's Privacy Policy for how they handle API data.</p>
    </div>
  </div>
);

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="mt-16 bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl text-center border border-green-100 dark:border-green-900">
        <div className="inline-block p-3 bg-green-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-400 mb-4"><Check size={24} /></div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Thank You!</h3>
        <p className="text-gray-600 dark:text-gray-300">Your feedback helps us make TechFinder better.</p>
      </div>
    );
  }
  return (
    <div className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-white">
        <MessageSquare className="text-blue-500" />
        <h3 className="text-xl font-bold">Help us improve</h3>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Your Name" required className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Email Address" required className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <textarea placeholder="Any suggestions or new categories you'd like to see?" rows={3} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        <button type="submit" className="px-6 py-2 bg-gray-900 dark:bg-blue-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors flex items-center gap-2">
          Send Feedback <Send size={16} />
        </button>
      </form>
    </div>
  );
};

const DeepDiveModal = ({ product, isOpen, onClose }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      setLoading(true);
      setAnalysis(null);
      fetchDeepDive(product.name, "your region").then(data => { setAnalysis(data); setLoading(false); });
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2"><Sparkles size={18} className="text-yellow-400" /><h3 className="font-bold">AI Deep Dive by TechFinder</h3></div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-6">
          <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4 text-center">{product.name}</h4>
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
              <p className="text-sm text-gray-500 dark:text-gray-400">Generating Critical Analysis...</p>
            </div>
          ) : analysis ? (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <div className="text-xs font-bold text-green-700 dark:text-green-400 uppercase mb-1">⭐ Best Feature</div>
                <p className="text-sm text-gray-800 dark:text-gray-200">{analysis.bestFeature}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800">
                <div className="text-xs font-bold text-red-700 dark:text-red-400 uppercase mb-1">⚠️ Worst Flaw</div>
                <p className="text-sm text-gray-800 dark:text-gray-200">{analysis.worstFlaw}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase mb-1">👤 Perfect For</div>
                <p className="text-sm text-gray-800 dark:text-gray-200">{analysis.perfectFor}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
                <span className="inline-block px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-bold rounded-full">Verdict: {analysis.verdict}</span>
              </div>
            </div>
          ) : <p className="text-center text-red-500">Failed to analyze.</p>}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState(0); // 0 = Landing Page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [deepDiveProduct, setDeepDiveProduct] = useState(null);
  const [chatQuery, setChatQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark Mode Toggle Logic
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const [formData, setFormData] = useState({
    country: null,
    category: null,
    subCategory: null,
    autoUsage: 'Private',
    autoWheels: '4',
    autoFuel: 'Petrol/Diesel',
    minBudget: 0,
    maxBudget: 1000,
    priority1: '',
    priority2: '',
    priority3: '',
    preferences: ''
  });

  useEffect(() => {
    if (formData.country) {
      setFormData(prev => ({
        ...prev,
        minBudget: 0,
        maxBudget: Math.round(prev.country.maxLimit * 0.5)
      }));
    }
  }, [formData.country]);

  const handleSelection = (field, value) => {
    if (field === 'category') {
      if (value.hasSub) {
        setFormData(prev => ({ ...prev, category: value, subCategory: null }));
        return;
      } else {
        setFormData(prev => ({ ...prev, category: value, subCategory: null }));
        setTimeout(() => setStep(prev => prev + 1), 350);
        return;
      }
    }
    if (field === 'subCategory') {
      setFormData(prev => ({ ...prev, subCategory: value }));
      setTimeout(() => setStep(prev => prev + 1), 350);
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => setStep(prev => prev + 1), 350);
  };

  const handleNext = () => {
    if (step === 1 && !formData.country) return;
    if (step === 2) {
      if (!formData.category) return;
      if (formData.category.hasSub && !formData.subCategory) return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 2 && formData.category?.hasSub) {
      setFormData(prev => ({ ...prev, category: null, subCategory: null }));
      return;
    }
    setStep(step - 1);
  };

  const handleFormSubmit = async () => {
    if (!formData.priority1) return;
    setLoading(true);
    setError(null);
    setStep(4);
    try {
      const results = await fetchRecommendations(formData);
      setRecommendations(results);
    } catch (err) {
      // Set the specific error message to display to the user
      setError(err.message || "Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    const userQ = chatQuery;
    setChatQuery("");
    setChatHistory(prev => [...prev, { type: 'user', text: userQ }]);
    setChatLoading(true);
    const response = await fetchChatResponse(userQ, recommendations.results, formData.country);
    setChatHistory(prev => [...prev, { type: 'ai', text: response }]);
    setChatLoading(false);
  };

  const resetApp = () => {
    setStep(0); // Reset to Landing Page
    setRecommendations(null);
    setChatHistory([]);
    setFormData(prev => ({
      country: null, category: null, subCategory: null, autoUsage: 'Private', autoWheels: '4', autoFuel: 'Petrol/Diesel', minBudget: 0, maxBudget: 1000, priority1: '', priority2: '', priority3: '', preferences: ''
    }));
  };

  const getPriorities = () => {
    if (formData.category?.id === 'automobile') return PRIORITIES.automobile;
    if (formData.subCategory && PRIORITIES[formData.subCategory.id]) return PRIORITIES[formData.subCategory.id];
    if (formData.category && PRIORITIES[formData.category.id]) return PRIORITIES[formData.category.id];
    return [];
  };

  const renderCountryStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Where are you shopping?</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">This helps us find local availability and pricing.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {COUNTRIES.map((country) => (
          <Card
            key={country.code}
            selected={formData.country?.code === country.code}
            onClick={() => handleSelection('country', country)}
            className="flex flex-col items-center justify-center min-h-[8rem]"
          >
            <span className="text-4xl mb-2">{country.code === 'OT' ? <Globe /> : <span className={`fi fi-${country.code.toLowerCase()}`} />}</span>
            <span className="font-medium text-gray-700 dark:text-gray-200 text-center text-sm md:text-base">{country.name}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Currency: {country.currency}</span>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCategoryStep = () => {
    if (formData.category && formData.category.hasSub) {
      const subs = SUB_CATEGORIES[formData.category.id] || [];
      return (
        <div className="animate-in fade-in slide-in-from-right duration-500">
          <div className="flex items-center justify-center mb-2 gap-2 text-blue-600 dark:text-blue-400 cursor-pointer" onClick={() => setFormData(p => ({ ...p, category: null }))}>
            <ArrowLeft size={16} /> <span className="text-sm font-medium hover:underline">Back to Categories</span>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Select Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {subs.map((sub) => (
              <Card
                key={sub.id}
                selected={formData.subCategory?.id === sub.id}
                onClick={() => handleSelection('subCategory', sub)}
                className="flex flex-col items-center justify-center min-h-[10rem]"
              >
                <sub.icon size={48} className={`mb-4 ${formData.subCategory?.id === sub.id ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-semibold text-lg text-center text-gray-700 dark:text-gray-200">{sub.name}</span>
              </Card>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">What are you looking for?</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Select the type of product you need.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Card
              key={cat.id}
              selected={formData.category?.id === cat.id}
              onClick={() => handleSelection('category', cat)}
              className="flex flex-col items-center justify-center min-h-[10rem]"
            >
              <cat.icon size={48} className={`mb-4 ${formData.category?.id === cat.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="font-semibold text-lg text-center text-gray-700 dark:text-gray-200">{cat.name}</span>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderDetailsForm = () => {
    const priorityOptions = getPriorities();
    const isAuto = formData.category?.id === 'automobile';
    const displayCategoryName = isAuto ? 'Automobile' : (formData.subCategory?.name || formData.category?.name);

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto pb-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Refine your preferences</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Tell us what matters most to you in a {displayCategoryName}.</p>

        <div className="space-y-6 bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">

          {isAuto && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-900">
              {['Usage', 'Wheels', 'Fuel'].map(label => (
                <div key={label}>
                  <label className="block text-xs font-bold text-blue-800 dark:text-blue-300 mb-1">{label} Type</label>
                  <select className="w-full p-2 rounded border border-blue-200 dark:border-blue-800 dark:bg-gray-800 dark:text-white text-sm"
                    onChange={e => setFormData({ ...formData, [`auto${label}`]: e.target.value })}>
                    {label === 'Usage' && <><option>Private</option><option>Commercial</option></>}
                    {label === 'Wheels' && <><option value="2">2 Wheeler</option><option value="3">3 Wheeler</option><option value="4">4 Wheeler</option></>}
                    {label === 'Fuel' && <><option>Petrol/Diesel</option><option>Electric (EV)</option><option>CNG/Hybrid</option></>}
                  </select>
                </div>
              ))}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <span className="flex items-center text-lg font-bold mr-2 text-blue-600 dark:text-blue-400">{formData.country.currency}</span> <span className="flex items-center">Price Range</span>
              </label>
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, minBudget: 0, maxBudget: prev.country.maxLimit }))} className="text-xs bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-600 text-white px-3 py-1.5 rounded-full hover:shadow-lg transition-all flex items-center gap-1.5 font-medium border border-gray-600">
                <Sparkles size={12} className="text-yellow-300" /> No Budget Limit
              </button>
            </div>
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs text-gray-400 font-normal">
                {formData.maxBudget >= formData.country.maxLimit ? (
                  <span className="text-green-600 font-bold flex items-center"><Check size={12} className="mr-1" /> Unlocked: Maximum Performance</span>
                ) : `Max Limit: ${formData.country.currency}${formData.country.maxLimit.toLocaleString()}`}
              </span>
            </div>
            <BudgetSlider min={formData.minBudget} max={formData.maxBudget} limit={formData.country.maxLimit} currency={formData.country.currency} onChange={(min, max) => setFormData(prev => ({ ...prev, minBudget: min, maxBudget: max }))} />
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

          <div className="space-y-4">
            {['1', '2', '3'].map((num, i) => (
              (i === 0 || formData[`priority${i}`]) && (
                <div key={num} className="animate-in fade-in slide-in-from-top-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center mb-1">
                    {i === 0 && <Sparkles size={16} className="mr-1" />} {i === 0 ? 'Primary' : i === 1 ? 'Secondary' : 'Tertiary'} Priority
                  </label>
                  <select
                    value={formData[`priority${num}`]}
                    onChange={(e) => setFormData({ ...formData, [`priority${num}`]: e.target.value })}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white"
                  >
                    <option value="">Select Priority</option>
                    {priorityOptions.filter(p => [1, 2, 3].filter(n => n !== parseInt(num)).every(n => formData[`priority${n}`] !== p)).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              )
            ))}
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specific Preferences? (Optional)</label>
            <textarea value={formData.preferences} onChange={(e) => setFormData({ ...formData, preferences: e.target.value })} placeholder="Any specific requirements..." className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 resize-none dark:text-white" />
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 animate-pulse">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Analyzing Market Data...</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Finding the best matches within {formData.country.currency}{formData.minBudget} - {formData.country.currency}{formData.maxBudget}</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-20 px-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle size={32} /></div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">System Error</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900 font-mono text-sm max-w-lg mx-auto">{error}</p>
          <button onClick={handleFormSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Try Again</button>
        </div>
      );
    }
    if (recommendations && (!recommendations.results || recommendations.results.length === 0)) {
      const isBudgetIssue = recommendations.error?.type === 'budget_low';
      return (
        <div className="text-center py-16 px-4 animate-in fade-in zoom-in duration-500">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${isBudgetIssue ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
            {isBudgetIssue ? <span className="text-4xl">💸</span> : <Search size={40} />}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{isBudgetIssue ? "Reality Check!" : "No Matches Found"}</h3>
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 italic font-medium">"{recommendations.error?.message || "We couldn't find any devices matching your specific criteria."}"</p>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setStep(3)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Adjust Budget & Preferences</button>
            <button onClick={resetApp} className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">Start Over</button>
          </div>
        </div>
      );
    }

    const displayCategoryName = formData.category?.id === 'automobile' ? 'Automobile' : (formData.subCategory?.name || formData.category?.name);

    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Perfect Matches</h2>
          <p className="text-gray-600 dark:text-gray-400">Based on your preferences for {displayCategoryName} in {formData.country?.name}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {recommendations.results.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white relative">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold border border-white/30">{item.matchScore} Match</div>
                <h3 className="text-lg font-bold leading-tight pr-12">{item.name}</h3>
                <div className="flex justify-between items-end mt-2"><span className="text-xl font-bold text-blue-100">{item.price}</span><span className="text-xs bg-black/20 px-2 py-1 rounded opacity-80">{item.releaseDate}</span></div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4"><p className="text-sm text-gray-600 dark:text-gray-300 italic border-l-4 border-blue-500 pl-3 py-1 bg-gray-50 dark:bg-gray-700 rounded-r">"{item.reason}"</p></div>
                <div className="mb-4"><h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Specs</h4><div className="flex flex-wrap gap-2">{item.specs.map((spec, i) => (<span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium">{spec}</span>))}</div></div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div><h4 className="flex items-center text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider mb-2"><ThumbsUp size={12} className="mr-1" /> Pros</h4><ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">{item.pros.map((p, i) => <li key={i}>• {p}</li>)}</ul></div>
                  <div><h4 className="flex items-center text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wider mb-2"><ThumbsDown size={12} className="mr-1" /> Cons</h4><ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">{item.cons.map((c, i) => <li key={i}>• {c}</li>)}</ul></div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                  <button onClick={() => setDeepDiveProduct(item)} className="flex items-center justify-center w-full py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors font-medium text-sm"><Bot size={16} className="mr-2" /> AI Deep Dive</button>
                  <a href={`https://www.${formData.country.market}/s?k=${encodeURIComponent(item.name)}${formData.country.affiliateTag ? `&tag=${formData.country.affiliateTag}` : ''}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-3 bg-gray-900 dark:bg-blue-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors font-medium group">Check on Amazon <ShoppingCart size={16} className="ml-2 group-hover:translate-x-1 transition-transform" /></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2"><Bot className="w-5 h-5" /><span className="font-bold">TechFinder AI Personal Consultant</span></div>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Ask about these results</span>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-[150px] max-h-[300px] overflow-y-auto space-y-4">
            {chatHistory.length === 0 && <div className="text-center text-gray-400 py-8 text-sm"><p>Not sure which one to pick?</p><p>Ask me anything! e.g., "Which has the best battery?"</p></div>}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.type === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-bl-none shadow-sm'}`}>
                  {msg.type === 'ai' ? <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*(.*?)\*/g, '<b>$1</b>').replace(/\[BUTTON:\s*(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow-sm flex items-center gap-2 w-fit no-underline"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg> $1</a>').replace(/\[(?!BUTTON:)(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 font-semibold">$1</a>') }} /> : msg.text}
                </div>
              </div>
            ))}
            {chatLoading && <div className="flex justify-start"><div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg rounded-bl-none shadow-sm"><Loader2 className="w-4 h-4 animate-spin text-purple-600" /></div></div>}
          </div>
          <form onSubmit={handleChatSubmit} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
            <input type="text" value={chatQuery} onChange={(e) => setChatQuery(e.target.value)} placeholder="Ask a follow-up question..." className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm" />
            <button type="submit" disabled={chatLoading} className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300"><Send size={18} /></button>
          </form>
        </div>
        <div className="mt-12 text-center">
          <button onClick={resetApp} className="flex items-center justify-center mx-auto text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors"><RefreshCcw size={16} className="mr-2" /> Start New Search</button>
        </div>
      </div>
    );
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
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="hidden md:block text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
              Live Market Data
            </div>
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

      <DeepDiveModal product={deepDiveProduct} isOpen={!!deepDiveProduct} onClose={() => setDeepDiveProduct(null)} />

      {step > 0 && step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-40">
          <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
            <button onClick={handleBack} disabled={step === 1} className={`flex items-center px-4 md:px-6 py-3 rounded-lg font-medium transition-colors ${step === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
            {step === 3 ? (
              <button onClick={handleFormSubmit} disabled={!formData.priority1} className={`flex-1 md:flex-none flex items-center justify-center px-4 md:px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${!formData.priority1 ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-0.5'}`}>
                <span className="hidden md:inline">Find My Device</span><span className="md:hidden">Search</span><Search size={20} className="ml-2" />
              </button>
            ) : (
              (step === 2 && formData.category?.hasSub && !formData.subCategory) ? null : (
                <button onClick={handleNext} disabled={(step === 1 && !formData.country) || (step === 2 && !formData.category)} className={`flex items-center px-6 md:px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${(step === 1 && !formData.country) || (step === 2 && !formData.category) ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-0.5'}`}>
                  Next <ChevronRight size={20} className="ml-1" />
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}