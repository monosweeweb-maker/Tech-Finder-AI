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
  Send
} from 'lucide-react';

// --- Constants & Config ---

const COUNTRIES = [
  // Added maxLimit for slider scaling
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
  // Convert current values to percentage for slider positioning
  const getPercent = (value) => Math.round(((value) / limit) * 100);

  const minPercent = getPercent(min);
  const maxPercent = getPercent(max);

  return (
    <div className="w-full px-2 py-4">
      <div className="relative w-full h-12">
        {/* Background Track */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded-full -translate-y-1/2"></div>

        {/* Active Range Track */}
        <div
          className="absolute top-1/2 h-2 bg-blue-600 rounded-full -translate-y-1/2 pointer-events-none z-10"
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        ></div>

        {/* Inputs */}
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

      {/* Manual Input Fields */}
      <div className="flex justify-between items-center gap-4 mt-2">
        <div className="flex-1">
          <label className="text-xs text-gray-500 font-bold ml-1">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{currency}</span>
            <input
              type="number"
              value={min}
              onChange={(e) => onChange(Number(e.target.value), max)}
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500 font-bold ml-1">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{currency}</span>
            <input
              type="number"
              value={max}
              onChange={(e) => onChange(min, Number(e.target.value))}
              className="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- API Logic ---

const apiKey = "AIzaSyAxsuhPseAipZ1Ld8jMdv7dz1vSblIsd1c"; // Environment will provide this

async function fetchRecommendations(formData) {
  const currentDate = new Date().toLocaleDateString();

  // Construct the "Product Name" based on selections
  let productQuery = formData.subCategory?.name || formData.category?.name || "Device";

  if (formData.category?.id === 'automobile') {
    productQuery = `${formData.autoUsage} ${formData.autoWheels}-Wheeler ${formData.autoFuel} Vehicle`;
  }

  const categoryId = formData.category?.id;

  // Recency Logic
  let recencyInstruction = "Suggest top-rated, current models available now (released within last 1-2 years).";
  if (categoryId === 'smartphone') {
    recencyInstruction = "Strictly prioritize devices released in the last 6 months.";
  }

  // Formatting Budget for Prompt
  const currencySymbol = formData.country.currency;

  // Check if max budget is set to the limit (implies No Limit)
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
    - If the budget is low, ensure products fit.
    - If "NO UPPER PRICE LIMIT" is set, suggest the absolute best/flagship/luxury options that match priorities.
    - If the max budget is clearly too low for the product (e.g., Ferrari for $1000, or iPhone for $50):
      - Return an EMPTY "results" array.
      - Set "errorType" to "budget_low".
      - Generate a "message" that is a FUNNY, CHEEKY ROAST about the budget being unrealistic.
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

    if (!response.ok) throw new Error("API Request Failed");

    const data = await response.json();
    return JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
}

// --- Components ---

const StepIndicator = ({ currentStep }) => (
  <div className="flex justify-center mb-8">
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${step <= currentStep ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-200 text-gray-500'}`}>
            {step}
          </div>
          {step < 4 && <div className={`w-12 h-1 mx-2 rounded transition-all duration-300 ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  </div>
);

const Card = ({ selected, onClick, children, className = "" }) => (
  <div onClick={onClick} className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 relative overflow-hidden ${selected ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]' : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'} ${className}`}>
    {selected && <div className="absolute top-3 right-3 text-blue-600"><Check size={20} strokeWidth={3} /></div>}
    {children}
  </div>
);

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mt-16 bg-green-50 p-8 rounded-2xl text-center border border-green-100">
        <div className="inline-block p-3 bg-green-100 rounded-full text-green-600 mb-4"><Check size={24} /></div>
        <h3 className="text-xl font-bold text-gray-800">Thank You!</h3>
        <p className="text-gray-600">Your feedback helps us make TechFinder better.</p>
      </div>
    );
  }

  return (
    <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6 text-gray-800">
        <MessageSquare className="text-blue-500" />
        <h3 className="text-xl font-bold">Help us improve</h3>
      </div>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Your Name" required className="p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Email Address" required className="p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <textarea placeholder="Any suggestions or new categories you'd like to see?" rows={3} className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        <button type="submit" className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
          Send Feedback <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const [formData, setFormData] = useState({
    country: null,
    category: null,
    subCategory: null,
    // Auto Specifics
    autoUsage: 'Private',
    autoWheels: '4',
    autoFuel: 'Petrol/Diesel',
    // Standard
    minBudget: 0,
    maxBudget: 1000, // Default initialization
    priority1: '',
    priority2: '',
    priority3: '',
    preferences: ''
  });

  // Reset/Initialize budget when country changes
  useEffect(() => {
    if (formData.country) {
      setFormData(prev => ({
        ...prev,
        minBudget: 0,
        maxBudget: Math.round(prev.country.maxLimit * 0.5) // Start slider at 50%
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
      setError("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setStep(1);
    setRecommendations(null);
    setFormData(prev => ({
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
    }));
  };

  const getPriorities = () => {
    if (formData.category?.id === 'automobile') return PRIORITIES.automobile;
    if (formData.subCategory && PRIORITIES[formData.subCategory.id]) return PRIORITIES[formData.subCategory.id];
    if (formData.category && PRIORITIES[formData.category.id]) return PRIORITIES[formData.category.id];
    return [];
  };

  // --- Render Steps ---

  const renderCountryStep = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Where are you shopping?</h2>
      <p className="text-center text-gray-500 mb-8">This helps us find local availability and pricing.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {COUNTRIES.map((country) => (
          <Card
            key={country.code}
            selected={formData.country?.code === country.code}
            onClick={() => handleSelection('country', country)}
            className="flex flex-col items-center justify-center min-h-[8rem]"
          >
            <span className="text-4xl mb-2">{country.code === 'OT' ? <Globe /> : <span className={`fi fi-${country.code.toLowerCase()}`} />}</span>
            <span className="font-medium text-gray-700 text-center text-sm md:text-base">{country.name}</span>
            <span className="text-xs text-gray-400 mt-1">Currency: {country.currency}</span>
          </Card>
        ))}
      </div>

      <FeedbackForm />
    </div>
  );

  const renderCategoryStep = () => {
    if (formData.category && formData.category.hasSub) {
      const subs = SUB_CATEGORIES[formData.category.id] || [];
      return (
        <div className="animate-in fade-in slide-in-from-right duration-500">
          <div className="flex items-center justify-center mb-2 gap-2 text-blue-600 cursor-pointer" onClick={() => setFormData(p => ({ ...p, category: null }))}>
            <ArrowLeft size={16} /> <span className="text-sm font-medium hover:underline">Back to Categories</span>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Select Type</h2>
          <p className="text-center text-gray-500 mb-8">Specific {formData.category.name} category.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {subs.map((sub) => (
              <Card
                key={sub.id}
                selected={formData.subCategory?.id === sub.id}
                onClick={() => handleSelection('subCategory', sub)}
                className="flex flex-col items-center justify-center min-h-[10rem] hover:bg-gray-50"
              >
                <sub.icon size={48} className={`mb-4 ${formData.subCategory?.id === sub.id ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-semibold text-lg text-center text-gray-700">{sub.name}</span>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">What are you looking for?</h2>
        <p className="text-center text-gray-500 mb-8">Select the type of product you need.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Card
              key={cat.id}
              selected={formData.category?.id === cat.id}
              onClick={() => handleSelection('category', cat)}
              className="flex flex-col items-center justify-center min-h-[10rem] hover:bg-gray-50"
            >
              <cat.icon size={48} className={`mb-4 ${formData.category?.id === cat.id ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="font-semibold text-lg text-center text-gray-700">{cat.name}</span>
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Refine your preferences</h2>
        <p className="text-center text-gray-500 mb-8">Tell us what matters most to you in a {displayCategoryName}.</p>

        <div className="space-y-6 bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">

          {/* Automobile Specific Fields */}
          {isAuto && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div>
                <label className="block text-xs font-bold text-blue-800 mb-1">Usage Type</label>
                <select value={formData.autoUsage} onChange={e => setFormData({ ...formData, autoUsage: e.target.value })} className="w-full p-2 rounded border border-blue-200 text-sm">
                  <option>Private</option>
                  <option>Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-blue-800 mb-1">Wheeler Type</label>
                <select value={formData.autoWheels} onChange={e => setFormData({ ...formData, autoWheels: e.target.value })} className="w-full p-2 rounded border border-blue-200 text-sm">
                  <option value="2">2 Wheeler (Bike/Scooter)</option>
                  <option value="3">3 Wheeler</option>
                  <option value="4">4 Wheeler (Car)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-blue-800 mb-1">Fuel Type</label>
                <select value={formData.autoFuel} onChange={e => setFormData({ ...formData, autoFuel: e.target.value })} className="w-full p-2 rounded border border-blue-200 text-sm">
                  <option>Petrol/Diesel</option>
                  <option>Electric (EV)</option>
                  <option>CNG/Hybrid</option>
                </select>
              </div>
            </div>
          )}

          {/* New Budget Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center">
                <span className="flex items-center"><DollarSign size={16} className="mr-1" /> Price Range</span>
              </label>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, minBudget: 0, maxBudget: prev.country.maxLimit }))}
                className="text-xs bg-gradient-to-r from-gray-900 to-gray-700 text-white px-3 py-1.5 rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center gap-1.5 font-medium border border-gray-600"
              >
                <Sparkles size={12} className="text-yellow-300" /> No Budget Limit
              </button>
            </div>

            <div className="flex justify-between items-end mb-1">
              <span className="text-xs text-gray-400 font-normal">
                {formData.maxBudget >= formData.country.maxLimit ? (
                  <span className="text-green-600 font-bold flex items-center"><Check size={12} className="mr-1" /> Unlocked: Maximum Performance</span>
                ) : (
                  `Max Limit: ${formData.country.currency}${formData.country.maxLimit.toLocaleString()}`
                )}
              </span>
            </div>

            <BudgetSlider
              min={formData.minBudget}
              max={formData.maxBudget}
              limit={formData.country.maxLimit}
              currency={formData.country.currency}
              onChange={(min, max) => setFormData(prev => ({ ...prev, minBudget: min, maxBudget: max }))}
            />
          </div>

          <div className="h-px bg-gray-100 my-4" />

          {/* Priorities */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 flex items-center">
              <Sparkles size={16} className="mr-1" /> What is your #1 Priority?
            </label>
            <select
              value={formData.priority1}
              onChange={(e) => setFormData({ ...formData, priority1: e.target.value })}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Primary Priority</option>
              {priorityOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            {formData.priority1 && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Priority</label>
                <select
                  value={formData.priority2}
                  onChange={(e) => setFormData({ ...formData, priority2: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Secondary Priority</option>
                  {priorityOptions.filter(p => p !== formData.priority1).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            )}

            {formData.priority2 && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tertiary Priority</label>
                <select
                  value={formData.priority3}
                  onChange={(e) => setFormData({ ...formData, priority3: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Tertiary Priority</option>
                  {priorityOptions.filter(p => p !== formData.priority1 && p !== formData.priority2).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            )}
          </div>

          <div className="h-px bg-gray-100 my-4" />

          {/* Open Ended */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Brands or Preferences? (Optional)
            </label>
            <textarea
              value={formData.preferences}
              onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
              placeholder="Any specific requirements..."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 resize-none"
            />
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
          <h3 className="text-xl font-semibold text-gray-800">Analyzing Market Data...</h3>
          <p className="text-gray-500 mt-2">Finding the best matches within {formData.country.currency}{formData.minBudget} - {formData.country.currency}{formData.maxBudget}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">System Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{isBudgetIssue ? "Reality Check!" : "No Matches Found"}</h3>
          <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <p className="text-lg text-gray-700 italic font-medium">"{recommendations.error?.message || "We couldn't find any devices matching your specific criteria."}"</p>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => setStep(3)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Adjust Budget & Preferences</button>
            <button onClick={resetApp} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Start Over</button>
          </div>
        </div>
      );
    }

    const displayCategoryName = formData.category?.id === 'automobile' ? 'Automobile' : (formData.subCategory?.name || formData.category?.name);

    return (
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Perfect Matches</h2>
          <p className="text-gray-600">Based on your preferences for {displayCategoryName} in {formData.country?.name}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-semibold rounded-full border border-blue-100">
            Budget: {formData.country.currency}{formData.minBudget} - {formData.country.currency}{formData.maxBudget}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {recommendations.results.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white relative">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold border border-white/30">{item.matchScore} Match</div>
                <h3 className="text-lg font-bold leading-tight pr-12">{item.name}</h3>
                <div className="flex justify-between items-end mt-2">
                  <span className="text-xl font-bold text-blue-100">{item.price}</span>
                  <span className="text-xs bg-black/20 px-2 py-1 rounded opacity-80">{item.releaseDate}</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4"><p className="text-sm text-gray-600 italic border-l-4 border-blue-500 pl-3 py-1 bg-gray-50 rounded-r">"{item.reason}"</p></div>
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Specs</h4>
                  <div className="flex flex-wrap gap-2">{item.specs.map((spec, i) => (<span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">{spec}</span>))}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div><h4 className="flex items-center text-xs font-bold text-green-600 uppercase tracking-wider mb-2"><ThumbsUp size={12} className="mr-1" /> Pros</h4><ul className="text-xs text-gray-600 space-y-1">{item.pros.map((p, i) => <li key={i}>• {p}</li>)}</ul></div>
                  <div><h4 className="flex items-center text-xs font-bold text-red-500 uppercase tracking-wider mb-2"><ThumbsDown size={12} className="mr-1" /> Cons</h4><ul className="text-xs text-gray-600 space-y-1">{item.cons.map((c, i) => <li key={i}>• {c}</li>)}</ul></div>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <a href={`https://www.${formData.country.market}/s?k=${encodeURIComponent(item.name)}${formData.country.affiliateTag ? `&tag=${formData.country.affiliateTag}` : ''}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium group">
                    Check Price <ShoppingCart size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button onClick={resetApp} className="flex items-center justify-center mx-auto text-gray-500 hover:text-blue-600 transition-colors">
            <RefreshCcw size={16} className="mr-2" /> Start New Search
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans text-slate-800">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkles size={24} fill="currentColor" className="text-blue-500" />
            <h1 className="text-xl font-bold tracking-tight">TechFinder<span className="text-gray-400 font-light">AI</span></h1>
          </div>
          <div className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full">Live Market Data</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 pb-28">
        {step < 4 && <StepIndicator currentStep={step} />}
        <div className="min-h-[500px]">
          {step === 1 && renderCountryStep()}
          {step === 2 && renderCategoryStep()}
          {step === 3 && renderDetailsForm()}
          {step === 4 && renderResults()}
        </div>
      </main>

      {step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 shadow-lg z-40">
          <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
            <button onClick={handleBack} disabled={step === 1} className={`flex items-center px-4 md:px-6 py-3 rounded-lg font-medium transition-colors ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ArrowLeft size={20} className="mr-2" /> Back
            </button>
            {step === 3 ? (
              <button onClick={handleFormSubmit} disabled={!formData.priority1} className={`flex-1 md:flex-none flex items-center justify-center px-4 md:px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${!formData.priority1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-0.5'}`}>
                <span className="hidden md:inline">Find My Device</span><span className="md:hidden">Search</span><Search size={20} className="ml-2" />
              </button>
            ) : (
              (step === 2 && formData.category?.hasSub && !formData.subCategory) ? null : (
                <button onClick={handleNext} disabled={(step === 1 && !formData.country) || (step === 2 && !formData.category)} className={`flex items-center px-6 md:px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all ${(step === 1 && !formData.country) || (step === 2 && !formData.category) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 hover:-translate-y-0.5'}`}>
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