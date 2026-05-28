import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, Heart, CheckSquare, Square, ShoppingCart, 
  Trash2, X, Star, CheckCircle2, ChevronDown, ChevronUp, Sparkles, 
  HelpCircle, ArrowRight, UserCheck, RefreshCw, Layers, Award, Cpu, Shield,
  Check, Filter
} from 'lucide-react';
import ContactModal from '../components/ContactModal';
import toast from 'react-hot-toast';

const allSkillsList = [
  "Java (Core)", "C", "C++", "ReactJS", "PHP", "Python", 
  "iOS", "Swift", "Android", "Flutter", "Dart", "Node.js", 
  "UI/UX", "Blockchain", "Golang", "AI & ML Development", 
  "Wordpress", "QA", "Firebase", "React Native"
];

const expRangesList = [
  { label: "0-5", min: 0, max: 5 },
  { label: "6-10", min: 6, max: 10 },
  { label: "11-15", min: 11, max: 15 },
  { label: "16-20", min: 16, max: 20 },
  { label: "21+", min: 21, max: 99 }
];

import developersData from '../data/developers.json';
import API_BASE_URL from '../config/api';

const HireDedicatedDevelopers = () => {
  const navigate = useNavigate();
  const formatName = (name, showFullName) => {
    if (showFullName) return name;
    if (!name) return '';
    return name.trim().split(' ').map(word => {
      if (word.length <= 2) return word[0] + '*';
      return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
    }).join(' ');
  };

  const [initialDevelopers, setInitialDevelopers] = useState(developersData);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  useEffect(() => {
    // Attempt to fetch fresh data from local server if available (for Admin Panel sync)
    if (window.location.hostname === 'localhost') {
      fetch(`${API_BASE_URL}/developers`)
        .then(res => {
          if (!res.ok) throw new Error('API response error');
          return res.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            setInitialDevelopers(data);
          } else {
            console.log('Received data is not an array, using bundled developers data');
          }
        })
        .catch(err => console.log('Using bundled developers data:', err));
    }
  }, []);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedExpRanges, setSelectedExpRanges] = useState([]);
  
  // Sort States
  const [sortBy, setSortBy] = useState('default'); 

  // UI States
  const [skillsExpanded, setSkillsExpanded] = useState(true);
  const [expExpanded, setExpExpanded] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [hireMessage, setHireMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const exists = prev.includes(id);
      if (exists) {
        toast.success("Removed from Wishlist");
        return prev.filter(item => item !== id);
      } else {
        toast.success("Added to Wishlist");
        return [...prev, id];
      }
    });
  };

  const toggleCompare = (id) => {
    setCompareList(prev => {
      const exists = prev.includes(id);
      if (exists) {
        toast.success("Removed from Comparison");
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 4) {
          toast.error("You can compare up to 4 developers at a time.");
          return prev;
        }
        toast.success("Added to Comparison");
        return [...prev, id];
      }
    });
  };

  const toggleCart = (dev) => {
    setCart(prev => {
      const exists = prev.some(item => item.id === dev.id);
      if (exists) {
        toast.success(`Removed ${dev.name} from Cart`);
        return prev.filter(item => item.id !== dev.id);
      } else {
        toast.success(`Added ${dev.name} to Cart`);
        const today = new Date().toISOString().split('T')[0];
        return [...prev, { ...dev, startDate: today, workMode: 'Full-time', durationDays: 30 }];
      }
    });
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleExpToggle = (label) => {
    setSelectedExpRanges(prev => 
      prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]
    );
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSkillSearchQuery('');
    setSelectedSkills([]);
    setSelectedExpRanges([]);
    setSortBy('default');
    toast.success("All filters reset");
  };

  const filteredDevelopers = useMemo(() => {
    return initialDevelopers.filter(dev => {
      // Main Search
      if (searchQuery && !dev.name.toLowerCase().includes(searchQuery.toLowerCase()) && !dev.skillHeading.toLowerCase().includes(searchQuery.toLowerCase()) && !dev.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Skills filter
      if (selectedSkills.length > 0) {
        const hasSkill = dev.skills.some(skill => selectedSkills.includes(skill));
        if (!hasSkill) return false;
      }

      // Experience Range filter
      if (selectedExpRanges.length > 0) {
        const matchExp = selectedExpRanges.some(range => {
          if (range === '0-5') return dev.experience >= 0 && dev.experience <= 5;
          if (range === '6-10') return dev.experience >= 6 && dev.experience <= 10;
          if (range === '11-15') return dev.experience >= 11 && dev.experience <= 15;
          if (range === '16-20') return dev.experience >= 16 && dev.experience <= 20;
          if (range === '21+') return dev.experience >= 21;
          return false;
        });
        if (!matchExp) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'years') return b.years - a.years;
      if (sortBy === 'verified') return (b.verified === true ? 1 : 0) - (a.verified === true ? 1 : 0);
      return a.id - b.id;
    });
  }, [initialDevelopers, searchQuery, selectedSkills, selectedExpRanges, sortBy]);

  const displayedSkills = useMemo(() => {
    return allSkillsList.filter(skill => skill.toLowerCase().includes(skillSearchQuery.toLowerCase()));
  }, [skillSearchQuery]);

  const [checkoutMode, setCheckoutMode] = useState('hire'); 

  const updateCartItem = (id, field, value) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const grandTotalAmount = useMemo(() => {
    return cart.reduce((sum, item) => {
      const hoursPerDay = item.workMode === 'Part-time' ? 4 : 8;
      const days = Number(item.durationDays) || 30;
      return sum + (item.price * hoursPerDay * days);
    }, 0);
  }, [cart]);

  const handleProceedToHire = () => {
    if (cart.length === 0) return;
    if (checkoutMode === 'hire') {
      const devListStr = cart.map(item => `${formatName(item.name, item.showFullName)} [ID: ${item.talentId}] (${item.skillHeading}, ${item.workMode}, ${item.durationDays} Days, Start: ${item.startDate || 'Immediate'}) - $${item.price * (item.workMode === 'Part-time' ? 4 : 8) * (item.durationDays || 30)}`).join('\n• ');
      setHireMessage(`I would like to hire the following dedicated developers:\n• ${devListStr}\n\nGrand Total Amount: $${grandTotalAmount} (inc. taxes)`);
    } else {
      const devListStr = cart.map(item => `${formatName(item.name, item.showFullName)} [ID: ${item.talentId}] (${item.skillHeading}, $${item.price}/hr, Start: ${item.startDate || 'Immediate'})`).join('\n• ');
      setHireMessage(`I would like to schedule an interview with the following dedicated developers:\n• ${devListStr}\n\n(Note: Interview deposit is fully refundable)`);
    }
    setCartDrawerOpen(false);
    setModalOpen(true);
  };

  const steps = [
    { step: "01", title: "Select Developers", desc: "Browse our top 1% pre-vetted catalog and add candidates to your cart or compare list." },
    { step: "02", title: "Review Bandwidth", desc: "Estimate hourly pricing and confirm full-time or part-time availability instantly." },
    { step: "03", title: "Instant Onboarding", desc: "Submit your selection for a risk-free 2-week trial and start development within 48 hours." },
    { step: "04", title: "Seamless Delivery", desc: "Manage your developers directly using your preferred agile tools under strict NDAs." }
  ];

  const engagementModels = [
    {
      title: "Full-Time Dedicated",
      hours: "160 Hours / Month",
      desc: "Perfect for long-term projects requiring a dedicated, fully integrated software engineer.",
      features: ["8 Hours / Day, 5 Days / Week", "Direct real-time communication", "Dedicated Project Manager", "Monthly billing cycle", "Instant replacement guarantee"],
      badge: "Most Popular",
      badgeColor: "bg-primary text-white"
    },
    {
      title: "Part-Time Dedicated",
      hours: "80 Hours / Month",
      desc: "Ideal for ongoing maintenance, MVP iterations, and steady long-term scaling.",
      features: ["4 Hours / Day, 5 Days / Week", "Direct chat & video meetings", "Flexible working hours", "Monthly billing cycle", "Strict NDA adherence"],
      badge: "Flexible",
      badgeColor: "bg-secondary text-white"
    },
    {
      title: "Hourly / Milestone",
      hours: "Pay As You Go",
      desc: "Best for specific feature development, bug fixing, and dynamic project requirements.",
      features: ["Tracked down to the exact minute", "Pay only for completed milestones", "Flexible resource allocation", "Weekly or milestone billing", "Complete source code ownership"],
      badge: "Dynamic",
      badgeColor: "bg-brand-sand text-secondary font-bold"
    }
  ];

  const comparisonData = [
    { feature: "Time to Onboard", trad: "2 - 3 Months", ved: "48 Hours" },
    { feature: "Hiring Fee & Overhead", trad: "20% - 30% of annual salary", ved: "$0 Hiring Fee" },
    { feature: "Vetting Quality", trad: "Manual CV filtering", ved: "AI-Powered + 5-Stage Technical Vetting" },
    { feature: "Replacement Policy", trad: "Difficult & time-consuming", ved: "Instant Replacement Guarantee" },
    { feature: "Contract Flexibility", trad: "Rigid employment contracts", ved: "Highly flexible engagement models" },
    { feature: "Payroll & Compliance", trad: "Managed by your HR team", ved: "100% Handled by Vedanco" }
  ];

  const faqs = [
    {
      q: "What happens if we require dedicated developers or project managers for our app development needs?",
      a: "Vedanco provides elite dedicated developers and project managers ready to assist you at your beck and call. You can seamlessly integrate them into your team for custom architecture designs, feature enhancements, enterprise scaling, and ongoing dedicated maintenance."
    },
    {
      q: "How does the risk-free 2-week trial work?",
      a: "We want you to be 100% confident in your hiring decision. If you are not completely satisfied with the dedicated developer's performance within the first 14 days, you will not be billed, and we will instantly replace them with another elite candidate."
    },
    {
      q: "Do I have complete IP ownership of the source code?",
      a: "Yes, absolutely. All intellectual property rights, source code, and project documentation belong entirely to you from day one. We enforce strict Non-Disclosure Agreements (NDAs) to guarantee absolute confidentiality."
    },
    {
      q: "How do I communicate with my dedicated developers?",
      a: "You can manage your dedicated developers directly using your preferred communication and project management tools, including Slack, Microsoft Teams, Jira, Trello, Zoom, and Google Meet."
    },
    {
      q: "Can I scale my dedicated team up or down as requirements change?",
      a: "Yes! Our flexible engagement models allow you to scale your team size up or down with minimal notice, ensuring you always have the optimal engineering bandwidth for your project lifecycle."
    }
  ];

  return (
    <div className="font-sans bg-slate-50 min-h-screen text-secondary pb-20">
      {/* Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Hire Dedicated Developers — Let's Talk!"
        initialMessage={hireMessage}
      />

      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-secondary text-white text-center py-2.5 px-4 text-xs md:text-sm font-semibold shadow-inner flex items-center justify-center gap-2">
        <Sparkles size={16} className="text-brand-sand animate-pulse" />
        <span>Vedanco Talent Marketplace • Pre-Vetted Top 1% Dedicated Coders • Onboard within 48 Hours</span>
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping ml-1" />
      </div>

      {/* Top Marketplace Navigation Bar */}
      <div className="bg-white border-b border-slate-200 relative z-10 shadow-sm">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-md flex-shrink-0">
              V
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black text-secondary leading-tight">Hire Coders Marketplace</h1>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Explore &amp; Onboard Top 1% Pre-Vetted Developers</p>
            </div>
          </div>

          {/* Right Counters / Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
            <button 
              onClick={() => toast("Wishlist contains your saved profiles. Add them to cart to proceed!", { icon: "❤️" })}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold transition-all shadow-sm ${wishlist.length > 0 ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
            >
              <Heart size={14} className={wishlist.length > 0 ? 'fill-rose-500 text-rose-500 animate-bounce' : ''} />
              <span className="hidden sm:inline">Wish List</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${wishlist.length > 0 ? 'bg-rose-500 text-white' : 'bg-slate-300 text-slate-700'}`}>
                {wishlist.length}
              </span>
            </button>

            <button 
              onClick={() => setCompareModalOpen(true)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold transition-all shadow-sm ${compareList.length > 0 ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
            >
              <SlidersHorizontal size={14} className={compareList.length > 0 ? 'text-blue-600' : ''} />
              <span className="hidden sm:inline">In Comparison</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${compareList.length > 0 ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-700'}`}>
                {compareList.length}
              </span>
            </button>

            <button 
              onClick={() => setCartDrawerOpen(true)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border text-xs font-black transition-all shadow-md ${cart.length > 0 ? 'bg-primary border-primary text-white hover:bg-secondary' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
            >
              <ShoppingCart size={14} className={cart.length > 0 ? 'animate-pulse' : ''} />
              <span className="hidden sm:inline">My Cart</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${cart.length > 0 ? 'bg-brand-sand text-secondary' : 'bg-slate-300 text-slate-700'}`}>
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog Area */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Column: Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <span className="font-black text-lg text-secondary flex items-center gap-2">
                  <Filter size={18} className="text-primary" /> Filters
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                    {selectedSkills.length + selectedExpRanges.length}
                  </span>
                </span>
                {(selectedSkills.length > 0 || selectedExpRanges.length > 0 || searchQuery || skillSearchQuery || sortBy !== 'default') && (
                  <button onClick={resetAllFilters} className="text-xs font-bold text-rose-500 hover:underline">
                    Clear All
                  </button>
                )}
              </div>

              {/* Sidebar Top Search */}
              <div className="relative mb-6">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search developers..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Skills / Technologies Accordion */}
              <div className="border-t border-slate-100 pt-6 mb-6">
                <div 
                  onClick={() => setSkillsExpanded(!skillsExpanded)}
                  className="flex justify-between items-center cursor-pointer select-none mb-4 group"
                >
                  <span className="font-extrabold text-secondary text-sm group-hover:text-primary transition-colors flex items-center gap-2">
                    Skills / Technologies 
                    {selectedSkills.length > 0 && (
                      <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {selectedSkills.length}
                      </span>
                    )}
                  </span>
                  {skillsExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>

                <AnimatePresence>
                  {skillsExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                      {/* Inner Skill Search */}
                      <div className="relative mb-4">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          value={skillSearchQuery}
                          onChange={e => setSkillSearchQuery(e.target.value)}
                          placeholder="Search skills..."
                          className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-medium"
                        />
                      </div>

                      <div className="space-y-2.5 max-h-[260px] overflow-y-auto styled-scrollbar pr-2">
                        {displayedSkills.map((skill) => {
                          const isChecked = selectedSkills.includes(skill);
                          return (
                            <label key={skill} className="flex items-center gap-3 cursor-pointer group text-sm font-medium text-slate-600 hover:text-secondary">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white group-hover:border-primary'}`}>
                                {isChecked && <Check size={12} strokeWidth={3} />}
                              </div>
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={() => handleSkillToggle(skill)}
                                className="sr-only"
                              />
                              <span className="select-none text-xs sm:text-sm">{skill}</span>
                            </label>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Experience Range Accordion */}
              <div className="border-t border-slate-100 pt-6">
                <div 
                  onClick={() => setExpExpanded(!expExpanded)}
                  className="flex justify-between items-center cursor-pointer select-none mb-4 group"
                >
                  <span className="font-extrabold text-secondary text-sm group-hover:text-primary transition-colors flex items-center gap-2">
                    Experience Range
                    {selectedExpRanges.length > 0 && (
                      <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {selectedExpRanges.length}
                      </span>
                    )}
                  </span>
                  {expExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>

                <AnimatePresence>
                  {expExpanded && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden space-y-2.5 pr-2">
                      {expRangesList.map((range) => {
                        const isChecked = selectedExpRanges.includes(range.label);
                        return (
                          <label key={range.label} className="flex items-center gap-3 cursor-pointer group text-sm font-medium text-slate-600 hover:text-secondary">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white group-hover:border-primary'}`}>
                              {isChecked && <Check size={12} strokeWidth={3} />}
                            </div>
                            <input 
                              type="checkbox" 
                              checked={isChecked}
                              onChange={() => handleExpToggle(range.label)}
                              className="sr-only"
                            />
                            <span className="select-none text-xs sm:text-sm">{range.label} Years</span>
                          </label>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Need Custom Developer Box */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <h3 className="font-black text-xl mb-2">Need a custom team?</h3>
              <p className="text-xs text-slate-200 leading-relaxed mb-6">Let our AI match you with the exact talent profile within 2 hours.</p>
              <button 
                onClick={() => { setHireMessage('I need a custom dedicated engineering team.'); setModalOpen(true); }}
                className="w-full py-3 bg-brand-sand text-secondary font-black rounded-xl text-xs hover:bg-white transition-all shadow-md"
              >
                Request Custom Staffing
              </button>
            </div>
          </div>

          {/* Right Column: Results & Catalog Grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Top Sort Bar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs md:text-sm font-black px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  • {filteredDevelopers.length} Results
                </span>
              </div>

              {/* Search & Sort By Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap">Sort By:</span>
                  <select 
                    value={sortBy} 
                    onChange={e => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs md:text-sm font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="default">Default Match</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="years">Experience: High to Low</option>
                    <option value="verified">Verified Only</option>
                  </select>
                </div>

                <button 
                  onClick={resetAllFilters}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw size={12} /> Reset All
                </button>
              </div>
            </div>

            {/* Developer Cards Grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDevelopers.map(dev => {
                const inCart = cart.some(item => item.id === dev.id);
                const inWish = wishlist.includes(dev.id);
                const inComp = compareList.includes(dev.id);

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={dev.id}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                    onClick={() => navigate(`/developer/${dev.talentId}`)}
                  >
                    <div className="p-6 pb-4">
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 font-black text-lg flex-shrink-0 shadow-inner">
                            {dev.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 font-black text-secondary text-base md:text-lg">
                              <span>{formatName(dev.name, dev.showFullName)}</span>
                              {dev.verified && <CheckCircle2 size={16} className="text-blue-500 fill-blue-50" />}
                            </div>
                            <span className="text-xs font-bold text-slate-500">{dev.title}</span>
                          </div>
                        </div>

                        {/* Hourly Rate Badge */}
                        <div className="text-right flex-shrink-0">
                          <span className="text-lg font-black text-secondary">${dev.price}</span>
                          <span className="text-xs text-slate-400 font-bold">/hr</span>
                        </div>
                      </div>

                      {/* Tags Row */}
                      <div className="flex flex-wrap gap-1.5 mb-5 border-b border-slate-100 pb-4 items-center">
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-md border border-blue-200">ID: {dev.talentId}</span>
                        {dev.partTime && <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-amber-200">Part Time</span>}
                        {dev.fullTime && <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-emerald-200">Full Time</span>}
                        <span className="bg-primary/5 text-primary text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-primary/10">{dev.years} Years+</span>
                      </div>

                      {/* Main Skill Heading */}
                      <h4 className="text-base font-black text-secondary mb-2 flex items-center gap-2 group-hover:text-primary transition-colors">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        {dev.skillHeading}
                      </h4>

                      {/* Short Bio */}
                      <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-3">
                        {dev.bio}
                      </p>
                    </div>

                    {/* Bottom Actions Bar */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* Wishlist Button */}
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(dev.id); }}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm ${inWish ? 'bg-rose-50 border border-rose-200 text-rose-500' : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-600'}`}
                          title="Wishlist"
                        >
                          <Heart size={16} className={inWish ? 'fill-rose-500' : ''} />
                        </button>

                        {/* Compare Checkbox */}
                        <label className="flex items-center gap-2 cursor-pointer select-none bg-white border border-slate-200 px-2.5 py-1.5 rounded-xl shadow-sm hover:border-blue-200 transition-colors">
                          <input 
                            type="checkbox" 
                            checked={inComp}
                            onChange={(e) => { e.stopPropagation(); toggleCompare(dev.id); }}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${inComp ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'}`}>
                            {inComp && <Check size={12} strokeWidth={3} />}
                          </div>
                          <span className="text-[11px] font-extrabold text-slate-600 whitespace-nowrap">Add to Compare</span>
                        </label>
                      </div>

                      {/* Add to Cart Button */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleCart(dev); }}
                        className={`flex-1 py-2.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md ${inCart ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-primary text-white hover:bg-secondary shadow-primary/20'}`}
                      >
                        <ShoppingCart size={14} />
                        <span>{inCart ? 'Added to Cart' : 'Add to Cart'}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredDevelopers.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <Search size={28} />
                </div>
                <h3 className="text-xl font-black text-secondary mb-2">No developers found matching your criteria.</h3>
                <p className="text-xs md:text-sm text-slate-500 mb-6 max-w-md mx-auto">Try broadening your filters, searching for a different skill, or request a custom talent match.</p>
                <button onClick={resetAllFilters} className="px-6 py-3 bg-primary text-white rounded-full font-bold text-xs shadow-md hover:bg-secondary">
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Cart Modal Popup (Exact 247Coders e-Commerce Replica) */}
      <AnimatePresence>
        {cartDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
            onClick={() => setCartDrawerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="p-6 md:p-8 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setCartDrawerOpen(false)} 
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-black transition-colors"
                  >
                    <ArrowRight size={14} className="rotate-180" /> Back
                  </button>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-secondary">My Cart</h2>
                    <p className="text-xs md:text-sm font-bold text-blue-600">{cart.length} Developer{cart.length !== 1 ? 's' : ''} in your cart</p>
                  </div>
                </div>
                <button onClick={() => setCartDrawerOpen(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Main Cart Body */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-slate-50/50">
                {cart.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <ShoppingCart size={64} className="mx-auto mb-4 opacity-40" />
                    <p className="font-extrabold text-secondary text-lg">Your cart is currently empty.</p>
                    <p className="text-xs sm:text-sm mt-1 text-slate-500">Browse our top 1% pre-vetted marketplace to add developers.</p>
                    <button onClick={() => setCartDrawerOpen(false)} className="mt-6 px-6 py-3 bg-primary text-white rounded-full text-xs font-bold shadow-md hover:bg-secondary">
                      Explore Developers
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Items Table */}
                    <div className="lg:col-span-7 space-y-4">
                      {cart.map(item => {
                        const hoursPerDay = item.workMode === 'Part-time' ? 4 : 8;
                        const days = Number(item.durationDays) || 30;
                        const itemTotal = item.price * hoursPerDay * days;

                        return (
                          <div key={item.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                            {/* Header Info */}
                            <div className="flex items-center justify-between gap-3 w-full md:w-auto border-b border-slate-100 md:border-0 pb-3 md:pb-0">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 text-white font-black flex items-center justify-center text-lg flex-shrink-0 shadow-md">
                                  {item.name.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-black text-secondary text-base">{formatName(item.name, item.showFullName)}</h4>
                                  <p className="text-xs text-slate-500 font-medium">{item.title}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 md:hidden">
                                <span className="text-lg font-black text-secondary">${item.price}</span>
                                <span className="text-xs text-slate-400 font-bold">/hr</span>
                              </div>
                            </div>

                            {/* Hourly Price (Desktop) */}
                            <div className="hidden md:flex items-center gap-1 flex-shrink-0">
                              <span className="text-xl font-black text-secondary">${item.price}</span>
                              <span className="text-xs text-slate-400 font-bold">/hr</span>
                            </div>

                            {/* Controls Group */}
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 w-full md:w-auto md:flex-1 md:justify-end">
                              {/* Start Date */}
                              <div className="flex flex-col">
                                <span className="text-[10px] font-extrabold text-slate-400 mb-1">Start Date</span>
                                <input 
                                  type="date" 
                                  value={item.startDate || ''} 
                                  onChange={e => updateCartItem(item.id, 'startDate', e.target.value)}
                                  className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-secondary outline-none w-full"
                                />
                              </div>

                              {/* Work Mode */}
                              <div className="flex flex-col">
                                <span className="text-[10px] font-extrabold text-slate-400 mb-1">Work Mode</span>
                                <select 
                                  value={item.workMode || 'Full-time'} 
                                  onChange={e => updateCartItem(item.id, 'workMode', e.target.value)}
                                  className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-secondary outline-none w-full"
                                >
                                  <option value="Full-time">Full-time (8h)</option>
                                  <option value="Part-time">Part-time (4h)</option>
                                </select>
                              </div>

                              {/* Duration Days */}
                              <div className="flex flex-col">
                                <span className="text-[10px] font-extrabold text-slate-400 mb-1">Duration</span>
                                <select 
                                  value={item.durationDays || 30} 
                                  onChange={e => updateCartItem(item.id, 'durationDays', Number(e.target.value))}
                                  className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-secondary outline-none w-full"
                                >
                                  <option value={15}>15 Days</option>
                                  <option value={30}>30 Days</option>
                                  <option value={60}>60 Days</option>
                                  <option value={90}>90 Days</option>
                                </select>
                              </div>

                              {/* Total item calculation */}
                              <div className="flex items-center justify-between sm:justify-start gap-2 col-span-2 sm:col-span-1 mt-2 sm:mt-0">
                                <div className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl border border-blue-100 font-black text-xs sm:text-sm">
                                  <span>${itemTotal} Total</span>
                                </div>

                                {/* Remove Button */}
                                <button 
                                  onClick={() => toggleCart(item)}
                                  className="w-9 h-9 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500 flex items-center justify-center transition-colors flex-shrink-0"
                                  title="Remove item"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {/* Right Summary Checkout Panel */}
                    <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-lg flex flex-col justify-between">
                      <div>
                        <h3 className="font-black text-secondary text-base mb-4">Would you like to hire developers or schedule an interview?</h3>
                        
                        {/* Option 1: Hire Developers */}
                        <label 
                          className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all mb-4 ${checkoutMode === 'hire' ? 'bg-blue-50/60 border-blue-600 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checkoutMode === 'hire' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-400 bg-white'}`}>
                              {checkoutMode === 'hire' && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className="font-extrabold text-secondary text-sm">Hire Developers</span>
                          </div>
                          <input 
                            type="radio" 
                            name="checkoutMode" 
                            checked={checkoutMode === 'hire'} 
                            onChange={() => setCheckoutMode('hire')}
                            className="sr-only" 
                          />
                        </label>

                        {/* Option 2: Schedule an Interview */}
                        <label 
                          className={`flex flex-col p-4 rounded-2xl border cursor-pointer transition-all mb-6 ${checkoutMode === 'interview' ? 'bg-blue-50/60 border-blue-600 shadow-sm' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checkoutMode === 'interview' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-400 bg-white'}`}>
                                {checkoutMode === 'interview' && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <span className="font-extrabold text-secondary text-sm">Schedule an Interview</span>
                            </div>
                            <input 
                              type="radio" 
                              name="checkoutMode" 
                              checked={checkoutMode === 'interview'} 
                              onChange={() => setCheckoutMode('interview')}
                              className="sr-only" 
                            />
                          </div>
                          <p className="text-[11px] text-slate-500 pl-8 leading-relaxed">Any amount paid to schedule an interview shall be fully refundable.</p>
                        </label>
                      </div>

                      <div className="border-t border-slate-200 pt-6 mt-6 space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-extrabold text-slate-500">Total Amount</span>
                          <div className="text-right">
                            <span className="text-2xl font-black text-secondary">${grandTotalAmount}</span>
                            <span className="text-xs text-slate-400 font-bold ml-1">(inc. taxes)</span>
                          </div>
                        </div>

                        <button 
                          onClick={handleProceedToHire}
                          className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                        >
                          <span>Proceed to Payment</span>
                          <ArrowRight size={18} />
                        </button>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal Popup */}
      <AnimatePresence>
        {compareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setCompareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
                <span className="text-xl font-black text-secondary flex items-center gap-2">
                  <SlidersHorizontal size={22} className="text-blue-600" /> Comparing Developers ({compareList.length}/4)
                </span>
                <button onClick={() => setCompareModalOpen(false)} className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-auto styled-scrollbar pb-4">
                {compareList.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <SlidersHorizontal size={48} className="mx-auto mb-4 opacity-40" />
                    <p className="font-extrabold text-secondary text-base">No developers added to comparison.</p>
                    <p className="text-xs mt-1 text-slate-500">Check the 'Add to Compare' box on developer cards to compare skills.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {compareList.map(id => {
                      const dev = initialDevelopers.find(d => d.id === id);
                      if (!dev) return null;
                      const inCart = cart.some(item => item.id === dev.id);

                      return (
                        <div key={dev.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between relative">
                          <button onClick={() => toggleCompare(dev.id)} className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-600 flex items-center justify-center">
                            <X size={14} />
                          </button>

                          <div>
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg mb-4">
                              {dev.name.charAt(0)}
                            </div>
                            <h4 className="font-black text-secondary text-base">{dev.name}</h4>
                            <p className="text-xs font-bold text-slate-500 mb-2">{dev.title}</p>
                            <span className="text-lg font-black text-primary block mb-4">${dev.price}/hr</span>

                            <div className="space-y-3 border-t border-slate-200 pt-4 mb-6">
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 block uppercase">Primary Skills:</span>
                                <span className="text-xs font-black text-secondary">{dev.skillHeading}</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 block uppercase">Experience:</span>
                                <span className="text-xs font-bold text-secondary">{dev.experience} Years</span>
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-slate-400 block uppercase">Bio:</span>
                                <p className="text-xs text-slate-600 line-clamp-4 mt-0.5">{dev.bio}</p>
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => { toggleCart(dev); setCompareModalOpen(false); }}
                            className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm ${inCart ? 'bg-emerald-600 text-white' : 'bg-primary text-white hover:bg-secondary'}`}
                          >
                            <ShoppingCart size={14} />
                            <span>{inCart ? 'Added to Cart' : 'Add to Cart'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Retained Premium Sections: AI Workflow, Engagement Models, Comparison Table, FAQs */}
      
      {/* AI-Powered Hiring Process Section */}
      <section className="py-20 md:py-28 px-4 bg-white mt-12 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-primary bg-primary/10 px-4 py-2 rounded-full uppercase tracking-wider">
              Seamless Workflow
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary mt-4 mb-6 leading-tight">
              Our 4-Step AI-Powered <br />
              <span className="text-primary">Hiring Process</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We streamline developer recruitment so you can focus entirely on building your product without administrative bottlenecks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((st, i) => (
              <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group">
                <div className="text-4xl font-black text-primary/20 mb-6 group-hover:text-primary transition-colors">
                  {st.step}
                </div>
                <h3 className="text-xl font-black text-secondary mb-4 group-hover:text-primary transition-colors">
                  {st.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => { setHireMessage('I would like to onboard dedicated developers today.'); setModalOpen(true); }}
              className="bg-primary text-white px-10 py-5 rounded-full font-extrabold text-lg hover:bg-secondary transition-all shadow-xl hover:scale-105 active:scale-100 inline-flex items-center gap-3"
            >
              <span>Onboard Developers Today</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="py-20 md:py-28 px-4 bg-slate-100 border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-primary bg-primary/10 px-4 py-2 rounded-full uppercase tracking-wider">
              Flexible Engagement
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary mt-4 mb-6 leading-tight">
              Tailored Engagement Models <br />
              <span className="text-primary">For Every Project</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Choose the perfect working arrangement tailored precisely to your project scale, technical complexity, and budgetary goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {engagementModels.map((model, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-6 right-6">
                  <span className={`text-xs px-3 py-1 rounded-full font-bold shadow-sm ${model.badgeColor}`}>
                    {model.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-secondary mb-2">
                    {model.title}
                  </h3>
                  <div className="text-lg font-extrabold text-primary mb-4">
                    {model.hours}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8">
                    {model.desc}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {model.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-slate-700 text-sm font-medium">
                        <CheckCircle2 size={18} className="text-green-500 mr-3 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => { setHireMessage(`I am interested in the ${model.title} model.`); setModalOpen(true); }}
                  className="w-full py-4 bg-primary text-white hover:bg-secondary rounded-xl font-bold text-base transition-colors shadow-md hover:shadow-lg"
                >
                  Select Model
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-secondary mb-6 leading-tight">
              Why Choose Vedanco <br />
              <span className="text-primary">Dedicated Developers?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Compare traditional recruitment with our streamlined dedicated hiring platform and see the monumental difference.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-6 md:p-8 font-black text-secondary text-sm md:text-lg">
              <div className="col-span-4">Hiring Aspect</div>
              <div className="col-span-4 text-slate-500">Traditional Hiring</div>
              <div className="col-span-4 text-primary flex items-center gap-2">
                <Sparkles size={20} /> Vedanco Dedicated Hiring
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {comparisonData.map((row, i) => (
                <div key={i} className="grid grid-cols-12 p-6 md:p-8 items-center hover:bg-slate-50/50 transition-colors">
                  <div className="col-span-4 font-extrabold text-secondary text-sm md:text-base">
                    {row.feature}
                  </div>
                  <div className="col-span-4 text-slate-500 text-xs md:text-sm pr-4">
                    {row.trad}
                  </div>
                  <div className="col-span-4 text-primary font-bold text-xs md:text-sm flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
                    <span>{row.ved}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 md:py-28 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-extrabold text-primary bg-primary/10 px-4 py-2 rounded-full uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary mt-4 mb-6 leading-tight">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Everything you need to know about hiring dedicated developers, project managers, and managing your extended engineering team.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors focus:outline-none"
                >
                  <span className="text-base md:text-lg font-bold text-secondary">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-300 flex-shrink-0 ${openFaq === i ? 'rotate-180 bg-primary text-white' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 md:p-8 pt-0 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/30">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 mt-12 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                <HelpCircle size={28} />
              </div>
              <div>
                <h4 className="font-extrabold text-secondary text-lg">Have a specific question?</h4>
                <p className="text-xs sm:text-sm text-slate-500">Reach out to our experts and get answers within 2 hours.</p>
              </div>
            </div>
            <button 
              onClick={() => { setHireMessage('I have a specific question about hiring dedicated talent.'); setModalOpen(true); }}
              className="bg-primary hover:bg-secondary text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex-shrink-0"
            >
              Ask An Expert
            </button>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-secondary py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
            Ready to build your dream <br />
            <span className="text-brand-sand">software engineering team?</span>
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Get instant access to top 1% pre-vetted dedicated developers, AI engineers, and project managers within 48 hours.
          </p>
          <button
            onClick={() => { setHireMessage('I am ready to build my dream software engineering team.'); setModalOpen(true); }}
            className="bg-brand-sand text-secondary px-10 py-5 rounded-full font-extrabold text-lg hover:bg-white transition-all shadow-2xl hover:scale-105 active:scale-100 flex items-center gap-3 mx-auto"
          >
            <span>Schedule A Strategy Call</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HireDedicatedDevelopers;
