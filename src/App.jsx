import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone, Laptop, Headphones, Watch, Camera, Refrigerator, Tv,
  Wind, Thermometer, Waves, ChevronRight, Check, ArrowLeft, Search,
  Cpu, Battery, Aperture, Sparkles, DollarSign, Globe, Loader2,
  ShoppingCart, AlertCircle, ThumbsUp, ThumbsDown, RefreshCcw, Zap,
  Box, Car, Bike, Scissors, Monitor, Tablet, Home, User, MessageSquare,
  Armchair, Lock, Shirt, UtensilsCrossed, Send, Bot, X, Info, Shield,
  Moon, Sun, ArrowRight, BrainCircuit, BarChart3, Layers, Banknote,
  Euro, PoundSterling, JapaneseYen, IndianRupee, Mail, Phone, Linkedin,
  MapPin, Star, Award, CheckCircle2, TrendingUp
} from 'lucide-react';

/* --- API KEY SETUP ---
   For local/Vercel, set VITE_GEMINI_API_KEY in your environment variables.
*/

// --- Constants & Config ---

const CONTACT_INFO = {
  whatsapp: "+91-95312-73486",
  linkedin: "https://www.linkedin.com/in/monoswee-nath/",
  email: "m.nath190702@gmail.com"
};

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
  smartphone: ['Performance', 'Camera', 'Battery', 'Clean UI', 'Display', 'Design', 'Value', 'Brand'],
  tablet: ['Display', 'Performance', 'Battery', 'Stylus', 'Portability', 'Cellular'],
  smartwatch: ['Health', 'Battery', 'Style', 'Smart Features', 'Ruggedness'],
  headphones: ['Sound', 'ANC', 'Comfort', 'Battery', 'Mic'],
  laptop: ['Performance', 'Portability', 'Battery', 'Screen', 'Build'],
  automobile: ['Mileage', 'Safety', 'Comfort', 'Power', 'Maintenance', 'Tech', 'Resale', 'Brand']
};

const PREFERENCE_SUGGESTIONS = {
  smartphone: "e.g., Must have 5G, Prefer Samsung or Pixel, Need headphone jack...",
  laptop: "e.g., Backlit keyboard required, Needs to run Blender, USB-C charging...",
  headphone: "e.g., Multipoint connection, Water resistant for gym, Heavy bass...",
  automobile: "e.g., Sunroof is a must, Boot space for travel, 360 camera...",
  appliance: "e.g., Low noise operation, Inverter technology, 5-star energy rating...",
  default: "Any specific requirements? (Brand preference, color, specific feature...)"
};

// --- Helper Components ---

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

const ScoreBar = ({ label, score }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs font-bold mb-1 text-gray-600 dark:text-gray-300 uppercase tracking-wide">
      <span>{label}</span>
      <span>{score}/10</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500'}`}
        style={{ width: `${score * 10}%` }}
      />
    </div>
  </div>
);

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

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center border border-green-100 dark:border-green-800 animate-in fade-in">
      <div className="inline-block p-3 bg-green-100 dark:bg-green-900/50 rounded-full text-green-600 dark:text-green-400 mb-3"><Check size={24} /></div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Message Sent!</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">Thanks for helping us improve.</p>
    </div>
  );
  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Name</label>
          <input type="text" placeholder="Your Name" required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Phone Number</label>
          <input type="tel" placeholder="+91..." required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Email</label>
        <input type="email" placeholder="your@email.com" required className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Feedback / Issue</label>
        <textarea placeholder="How can we make TechFinder better for you?" rows={3} className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all" />
      </div>
      <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
        Send Feedback <Send size={18} />
      </button>
    </form>
  );
};

// --- API Functions ---

const getApiKey = () => {
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env.VITE_GEMINI_API_KEY || "";
    }
  } catch (e) { }
  return localStorage.getItem('gemini_api_key') || "";
};

const apiKey = "";

async function fetchRecommendations(formData, userKey) {
  const activeKey = userKey || apiKey;
  if (!activeKey) throw new Error("API Key Missing! Please add VITE_GEMINI_API_KEY to your environment variables or paste it in the code.");

  const productQuery = formData.category?.id === 'automobile'
    ? `${formData.autoUsage} ${formData.autoWheels}-Wheeler ${formData.autoFuel} Vehicle`
    : (formData.subCategory?.name || formData.category?.name || "Device");

  const recencyInstruction = formData.category?.id === 'smartphone'
    ? "Strictly prioritize devices released in the last 6 months."
    : "Suggest top-rated models available now (last 1-2 years).";

  const budgetPrompt = formData.maxBudget >= formData.country.maxLimit
    ? `Minimum ${formData.country.currency}${formData.minBudget} (NO UPPER LIMIT - Suggest Flagship/Luxury)`
    : `Between ${formData.country.currency}${formData.minBudget} and ${formData.country.currency}${formData.maxBudget}`;

  const prompt = `
    Role: Expert Shopping Assistant.
    Task: Suggest 3 models of: "${productQuery}" in ${formData.country.name}.
    Constraints: 
    1. Product: ${productQuery} (STRICT).
    2. Budget: ${budgetPrompt} (STRICT).
    3. Priorities: ${formData.priority1}, ${formData.priority2}, ${formData.priority3}.
    4. Rule: ${recencyInstruction}
    
    Output JSON ONLY:
    {
      "results": [
        {
          "name": "Full Name",
          "price": "Exact Price",
          "releaseDate": "Month Year",
          "matchScore": "90%",
          "reason": "Why it fits...",
          "specs": ["Spec1", "Spec2", "Spec3"],
          "pros": ["Pro1", "Pro2"],
          "cons": ["Con1"],
          "scores": { "Performance": 9, "Battery": 8, "Value": 10 } 
        }
      ],
      "error": { "type": "budget_low" | "no_match" | null, "message": "Funny roast if budget is too low." }
    }
    NOTE: "scores" object MUST have 3 keys relevant to the product (e.g. Performance, Battery, Value). Use 1-10 integers.
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${activeKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "API Request Failed");
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) { throw error; }
}

async function fetchDeepDive(productName, country, userKey) {
  const activeKey = userKey || apiKey;
  if (!activeKey) return null;
  const prompt = `Analyze "${productName}" for a buyer in ${country}. Concise, brutal, honest. Output JSON: { "bestFeature": "...", "worstFlaw": "...", "perfectFor": "...", "verdict": "..." }`;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${activeKey}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } })
    });
    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (e) { return null; }
}

async function fetchChatResponse(query, contextProducts, countryData, userKey) {
  const activeKey = userKey || apiKey;
  if (!activeKey) return "API Key Missing.";
  const context = contextProducts.map(p => `Product: ${p.name}, Price: ${p.price}, Link: https://www.${countryData.market}/s?k=${encodeURIComponent(p.name)}`).join("\n");
  const prompt = `TechFinder Consultant. Context: ${context}. Question: "${query}". Answer briefly (<60 words). If purchase intent, use: [BUTTON: Check Price on Amazon]({Link}). DO NOT show raw URL.`;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${activeKey}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (e) { return "Sorry, error processing request."; }
}

// --- Page Components ---

const LandingPage = ({ onStart, onPrivacy, onContact }) => (
  <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
    {/* Hero */}
    <section className="text-center pt-10 pb-20 px-4 min-h-[70vh] flex flex-col items-center relative overflow-hidden">
      {/* Adjusted gradient: Lighter color (blue-50), positioned higher (-top-16), and behind the header */}
      <div className="absolute -top-16 inset-x-0 h-[80vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-transparent to-transparent dark:from-blue-900/20 pointer-events-none"></div>
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-bold mb-8 animate-in fade-in zoom-in duration-500 delay-100 border border-blue-100 dark:border-blue-800 shadow-sm relative z-10">
        <Sparkles size={16} className="mr-2 text-yellow-500" /> AI-Powered Shopping Assistant
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent leading-tight max-w-4xl relative z-10">
        Stop Searching. <br /> Start Buying Smart.
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
        The only AI that combines real-time market data, unbiased reviews, and your personal preferences to find the perfect product in seconds.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
        <button onClick={onStart} className="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2">
          Find My Product <ArrowRight size={20} />
        </button>
        <button onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-lg font-bold rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
          See How It Works
        </button>
      </div>
    </section>

    {/* How It Works - Fancy */}
    <section id="how-it-works" className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How TechFinder Works</h2>
          <p className="text-gray-600 dark:text-gray-400">Your journey to the perfect product in 3 simple steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-gray-700 dark:to-gray-700 -z-10 rounded-full"></div>

          {[
            { icon: Globe, title: "1. Select Region", desc: "Choose your country to get accurate local pricing and availability." },
            { icon: BrainCircuit, title: "2. Define Needs", desc: "Tell our AI your budget, priorities, and must-have features." },
            { icon: Award, title: "3. Get Ranked Results", desc: "Instant, unbiased top 3 recommendations with deep analysis." }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-2xl border-2 border-blue-100 dark:border-gray-700 flex items-center justify-center shadow-lg mb-6 group-hover:-translate-y-2 transition-transform duration-300 relative">
                <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform -z-10"></div>
                <step.icon size={40} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Stats / Trusted By */}
    <section className="py-20 px-4 bg-blue-600 dark:bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-500/50">
        <div className="p-4">
          <div className="text-4xl font-bold mb-2 flex justify-center items-center gap-2"><TrendingUp /> 98%</div>
          <p className="text-blue-100">Match Accuracy</p>
        </div>
        <div className="p-4">
          <div className="text-4xl font-bold mb-2">10k+</div>
          <p className="text-blue-100">Products Analyzed</p>
        </div>
        <div className="p-4">
          <div className="text-4xl font-bold mb-2">Instant</div>
          <p className="text-blue-100">AI Recommendations</p>
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: MessageSquare, title: "Personal Consultant", desc: "Chat with AI to compare models directly." },
            { icon: Layers, title: "Deep Dive Analysis", desc: "Get critical 'Buy or Skip' verdicts." },
            { icon: Globe, title: "Global Support", desc: "Works for Amazon US, India, UK & more." },
            { icon: BarChart3, title: "Live Pricing", desc: "Real-time links to check current deals." }
          ].map((f, i) => (
            <div key={i} className="p-8 border border-gray-100 dark:border-gray-800 rounded-2xl hover:shadow-xl transition-all bg-white dark:bg-gray-800 group hover:-translate-y-1">
              <f.icon className="w-10 h-10 text-gray-700 dark:text-gray-300 mb-6 group-hover:text-blue-600 transition-colors" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{f.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Feedback Section */}
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/30">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Help Us Improve</h2>
        <p className="text-gray-600 dark:text-gray-400">Your feedback shapes the future of TechFinder AI.</p>
      </div>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
        <FeedbackForm />
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12 px-6 m-4 rounded-3xl shadow-sm">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-blue-500" fill="currentColor" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">TechFinder<span className="text-gray-400 font-light">AI</span></span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">Your personal AI shopping assistant. Making tech buying simple, smart, and unbiased.</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><button onClick={onStart} className="hover:text-blue-600">Start Search</button></li>
            <li><button onClick={onContact} className="hover:text-blue-600">Contact Us</button></li>
            <li><button onClick={onPrivacy} className="hover:text-blue-600">Privacy Policy</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">Connect</h4>
          <div className="flex gap-4">
            <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600"><Linkedin size={20} /></a>
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-400 hover:text-blue-600"><Mail size={20} /></a>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto pt-8 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-400">
        <p>© 2024 TechFinder AI. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

const ContactPage = ({ onBack }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto py-12 px-6">
    <button onClick={onBack} className="mb-8 flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
      <ArrowLeft size={18} className="mr-2" /> Back to Home
    </button>

    <div className="grid md:grid-cols-2 gap-12 items-start">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Have a question, suggestion, or just want to say hi? We'd love to hear from you.</p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-green-600 shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">WhatsApp / Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">{CONTACT_INFO.whatsapp}</p>
              <p className="text-xs text-gray-400 mt-1">Available Mon-Fri, 9am - 6pm IST</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
              <Linkedin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">LinkedIn</h3>
              <a href={CONTACT_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">Connect on LinkedIn</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Email</h3>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600">{CONTACT_INFO.email}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Raise a Concern</h3>
        <FeedbackForm />
      </div>
    </div>
  </div>
);

const PrivacyPolicy = ({ onBack }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto py-12 px-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 my-8">
    <button onClick={onBack} className="mb-6 flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"><ArrowLeft size={16} className="mr-2" /> Back to Home</button>
    <div className="prose dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Effective Date: {new Date().getFullYear()}</p>

      <h3 className="text-xl font-bold mt-8 mb-2 text-gray-800 dark:text-gray-200">1. Information We Collect</h3>
      <p className="text-gray-600 dark:text-gray-300">
        TechFinder AI is a privacy-first application. We do not store your personal search history, product preferences, or chat logs on our servers.
        All data is processed in real-time using the Google Gemini API and is transient.
      </p>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        If you choose to use our Feedback or Contact forms, we collect the <strong>Name, Email Address, and Phone Number</strong> you provide solely for the purpose of responding to your inquiry or improving our services. This data is not shared with third parties for marketing purposes.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2 text-gray-800 dark:text-gray-200">2. Affiliate Disclosure</h3>
      <p className="text-gray-600 dark:text-gray-300">This website participates in the Amazon Services LLC Associates Program. When you click on "Check on Amazon" links, we may earn a small commission at no additional cost to you. This supports the maintenance of this free tool.</p>

      <h3 className="text-xl font-bold mt-8 mb-2 text-gray-800 dark:text-gray-200">3. Third-Party Services</h3>
      <p className="text-gray-600 dark:text-gray-300">We utilize Google's Gemini API for generating AI recommendations. Please refer to Google's Privacy Policy regarding their data handling practices.</p>

      <h3 className="text-xl font-bold mt-8 mb-2 text-gray-800 dark:text-gray-200">4. Contact Us</h3>
      <p className="text-gray-600 dark:text-gray-300">If you have any questions about this Privacy Policy, please contact us via the details provided on our Contact page.</p>
    </div>
  </div>
);

const DeepDiveModal = ({ product, isOpen, onClose, apiKey }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (isOpen && product) { setLoading(true); setAnalysis(null); fetchDeepDive(product.name, "your region", apiKey).then(data => { setAnalysis(data); setLoading(false); }); } }, [isOpen, product, apiKey]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[60] p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-5 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-2"><Sparkles size={18} className="text-yellow-400" /><h3 className="font-bold tracking-wide">AI DEEP DIVE</h3></div>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20} /></button>
        </div>
        <div className="p-6 overflow-y-auto">
          <h4 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 text-center leading-tight">{product.name}</h4>
          {loading ? (
            <div className="flex flex-col items-center py-12">
              <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">Analyzing specs, reviews & hidden flaws...</p>
            </div>
          ) : analysis ? (
            <div className="grid gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold uppercase text-xs mb-2"><ThumbsUp size={14} /> The Good</div>
                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">{analysis.bestFeature}</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800/50">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-bold uppercase text-xs mb-2"><ThumbsDown size={14} /> The Bad</div>
                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">{analysis.worstFlaw}</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold uppercase text-xs mb-2"><User size={14} /> Ideal User</div>
                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">{analysis.perfectFor}</p>
              </div>
              <div className="mt-4 p-4 bg-gray-900 dark:bg-white rounded-xl text-center shadow-lg">
                <span className="text-xs text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest block mb-1">Final Verdict</span>
                <span className="text-lg font-bold text-white dark:text-gray-900">{analysis.verdict}</span>
              </div>
            </div>
          ) : <p className="text-center text-red-500">Analysis failed.</p>}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

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
  const [userApiKey, setUserApiKey] = useState("");

  // Load API Key
  useEffect(() => {
    const stored = localStorage.getItem('gemini_api_key');
    if (stored) setUserApiKey(stored);
    else setUserApiKey(getApiKey());
  }, []);

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

  const renderCountryStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Where are you shopping?</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">This helps us find local availability and pricing.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {COUNTRIES.map((country) => (
          <div key={country.code} onClick={() => handleSelection('country', country)} className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center min-h-[8rem] ${formData.country?.code === country.code ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'}`}>
            <span className="text-4xl mb-2">{country.code === 'OT' ? <Globe /> : <span className={`fi fi-${country.code.toLowerCase()}`} />}</span>
            <span className="font-medium text-gray-700 dark:text-gray-200 text-center text-sm md:text-base">{country.name}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Currency: {country.currency}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCategoryStep = () => {
    if (formData.category && formData.category.hasSub) {
      return (
        <div className="animate-in fade-in slide-in-from-right duration-500">
          <div className="flex items-center justify-center mb-2 gap-2 text-blue-600 dark:text-blue-400 cursor-pointer" onClick={() => setFormData(p => ({ ...p, category: null }))}><ArrowLeft size={16} /> <span className="text-sm font-medium hover:underline">Back to Categories</span></div>
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Select Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{SUB_CATEGORIES[formData.category.id].map((sub) => (<div key={sub.id} onClick={() => handleSelection('subCategory', sub)} className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center min-h-[10rem] ${formData.subCategory?.id === sub.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'}`}><sub.icon size={48} className="mb-4 text-blue-600 dark:text-blue-400" /><span className="font-semibold text-lg text-center text-gray-700 dark:text-gray-200">{sub.name}</span></div>))}</div>
        </div>
      );
    }
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">What are you looking for?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{CATEGORIES.map((cat) => (<div key={cat.id} onClick={() => handleSelection('category', cat)} className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center min-h-[10rem] ${formData.category?.id === cat.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300'}`}><cat.icon size={48} className="mb-4 text-blue-600 dark:text-blue-400" /><span className="font-semibold text-lg text-center text-gray-700 dark:text-gray-200">{cat.name}</span></div>))}</div>
      </div>
    );
  };

  const renderDetailsForm = () => {
    const priorityOptions = formData.category?.id === 'automobile' ? PRIORITIES.automobile : (formData.subCategory && PRIORITIES[formData.subCategory.id]) || PRIORITIES[formData.category.id];
    const CurrencyIcon = formData.country?.icon || DollarSign;
    const prefPlaceholder = PREFERENCE_SUGGESTIONS[formData.category?.id] || PREFERENCE_SUGGESTIONS.default;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto pb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-3">
            Design Your Perfect Match
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Tell us what matters, and we'll find the needle in the haystack.</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700 shadow-2xl rounded-3xl overflow-hidden p-8 ring-1 ring-gray-900/5">

          {/* Automobile Specifics - The Fancy Pill/Grid Layout */}
          {formData.category?.id === 'automobile' && (
            <div className="mb-8 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Car size={16} /> Vehicle Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Usage</label>
                  <div className="flex flex-col gap-2">
                    {['Private', 'Commercial'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFormData({ ...formData, autoUsage: opt })}
                        className={`py-2 px-3 text-sm rounded-lg border transition-all ${formData.autoUsage === opt ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Wheels</label>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: '2 Wheeler', val: '2' },
                      { label: '4 Wheeler', val: '4' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setFormData({ ...formData, autoWheels: opt.val })}
                        className={`py-2 px-3 text-sm rounded-lg border transition-all ${formData.autoWheels === opt.val ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-300'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Fuel</label>
                  <div className="flex flex-col gap-2">
                    {['Petrol/Diesel', 'Electric'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFormData({ ...formData, autoFuel: opt })}
                        className={`py-2 px-3 text-sm rounded-lg border transition-all ${formData.autoFuel === opt ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-300'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Budget Section */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <label className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                    <CurrencyIcon size={18} />
                  </div>
                  Budget Range
                </label>
              </div>
              <button
                onClick={() => setFormData({ ...formData, minBudget: 0, maxBudget: formData.country.maxLimit })}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 ${formData.maxBudget >= formData.country.maxLimit
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
              >
                <Sparkles size={12} fill="currentColor" />
                {formData.maxBudget >= formData.country.maxLimit ? 'Budget Unlocked' : 'Unlock No Limit'}
              </button>
            </div>

            <div className="px-2">
              <BudgetSlider
                min={formData.minBudget}
                max={formData.maxBudget}
                limit={formData.country.maxLimit}
                currency={formData.country.currency}
                onChange={(min, max) => setFormData({ ...formData, minBudget: min, maxBudget: max })}
              />
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent my-8" />

          {/* Priorities Section */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white mb-6">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                <Layers size={18} />
              </div>
              What matters most?
            </label>

            <div className="space-y-4">
              {['1', '2', '3'].map((n, i) => {
                const show = i === 0 || formData[`priority${i}`];
                if (!show) return null;

                return (
                  <div key={n} className="group relative animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 z-10 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                      {n}
                    </div>
                    <select
                      value={formData[`priority${n}`]}
                      onChange={(e) => setFormData({ ...formData, [`priority${n}`]: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl appearance-none cursor-pointer focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-800 transition-all font-medium text-gray-700 dark:text-gray-200 hover:border-purple-300"
                    >
                      <option value="">Select Priority {n}...</option>
                      {priorityOptions.filter(p => [1, 2, 3].every(x => x === parseInt(n) || formData[`priority${x}`] !== p)).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none rotate-90" size={16} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferences Textarea */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur"></div>
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Any specific wishes?</label>
              <textarea
                value={formData.preferences}
                onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                placeholder={prefPlaceholder}
                className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-gray-700 dark:text-white placeholder-gray-400"
              />
              <Sparkles className="absolute right-4 bottom-4 text-gray-300 dark:text-gray-600 group-hover:text-yellow-400 transition-colors" size={20} />
            </div>
          </div>

        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (loading) return <div className="flex flex-col items-center py-20"><Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" /><p className="text-gray-500 dark:text-gray-400">Finding the best matches...</p></div>;
    if (error) return <div className="text-center py-20 px-4"><AlertCircle size={40} className="mx-auto text-red-500 mb-4" /><p className="text-red-500 mb-6">{error}</p><button onClick={handleFormSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Try Again</button></div>;
    if (!recommendations?.results?.length) return <div className="text-center py-20"><p className="text-xl font-bold dark:text-white">No matches found.</p><button onClick={() => setStep(3)} className="mt-4 text-blue-600">Adjust Filters</button></div>;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
        <div className="text-center mb-10"><h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Top Recommendations</h2></div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {recommendations.results.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white relative">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold">{item.matchScore} Match</div>
                <h3 className="text-lg font-bold pr-12 leading-tight">{item.name}</h3>
                <div className="flex justify-between items-end mt-2"><span className="text-xl font-bold">{item.price}</span><span className="text-xs opacity-80">{item.releaseDate}</span></div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm italic text-gray-600 dark:text-gray-300 mb-4 border-l-4 border-blue-500 pl-3">"{item.reason}"</p>
                {/* Score Bars */}
                {item.scores && (
                  <div className="mb-4 space-y-1 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    {Object.entries(item.scores).map(([k, v]) => <ScoreBar key={k} label={k} score={v} />)}
                  </div>
                )}
                <div className="mb-4 flex flex-wrap gap-2">{item.specs.slice(0, 4).map((s, i) => <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded font-medium dark:text-gray-300">{s}</span>)}</div>
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                  <button onClick={() => setDeepDiveProduct(item)} className="w-full py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"><Bot size={16} /> AI Deep Dive</button>
                  <a href={`https://www.${formData.country.market}/s?k=${encodeURIComponent(item.name)}${formData.country.affiliateTag ? `&tag=${formData.country.affiliateTag}` : ''}`} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-[#FFD814] hover:bg-[#F7CA00] text-black rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm border border-[#FCD200]">Check on Amazon <ShoppingCart size={16} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white flex items-center gap-2"><Bot size={20} /><span className="font-bold">AI Consultant</span></div>
          <div className="p-4 h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900 space-y-3">
            {!chatHistory.length && <p className="text-center text-gray-400 text-sm mt-10">Ask me anything about these products!</p>}
            {chatHistory.map((m, i) => (
              <div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm ${m.type === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-bl-none'}`}>
                  {m.type === 'ai' ? <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*(.*?)\*/g, '<b>$1</b>').replace(/\[BUTTON:\s*([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" class="block mt-2 bg-[#FFD814] text-black px-4 py-2 rounded-full font-bold text-center no-underline text-xs hover:bg-[#F7CA00] border border-[#FCD200]">$1</a>').replace(/\[(?!BUTTON:)(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-500 hover:underline">$1</a>') }} /> : m.text}
                </div>
              </div>
            ))}
            {chatLoading && <Loader2 className="w-5 h-5 animate-spin text-purple-600" />}
          </div>
          <form onSubmit={handleChatSubmit} className="p-3 bg-white dark:bg-gray-800 border-t dark:border-gray-700 flex gap-2">
            <input value={chatQuery} onChange={e => setChatQuery(e.target.value)} placeholder="Ask a follow-up..." className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none" />
            <button disabled={chatLoading} className="p-2 bg-purple-600 text-white rounded-lg"><Send size={18} /></button>
          </form>
        </div>
        <div className="mt-8 text-center"><button onClick={resetApp} className="text-gray-500 hover:text-blue-600 flex items-center justify-center mx-auto gap-2"><RefreshCcw size={16} /> Start New Search</button></div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-slate-800'}`}>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetApp}>
            <Sparkles size={24} className="text-blue-500" fill="currentColor" />
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">TechFinder<span className="text-gray-400 font-light">AI</span></h1>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 pb-28">
        {step > 0 && <StepIndicator currentStep={step} />}
        <div className="min-h-[500px]">
          {step === 'privacy' && <PrivacyPolicy onBack={() => setStep(0)} />}
          {step === 'contact' && <ContactPage onBack={() => setStep(0)} />}
          {step === 0 && <LandingPage onStart={() => setStep(1)} onPrivacy={() => setStep('privacy')} onContact={() => setStep('contact')} />}
          {step === 1 && renderCountryStep()}
          {step === 2 && renderCategoryStep()}
          {step === 3 && renderDetailsForm()}
          {step === 4 && renderResults()}
        </div>
      </main>

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