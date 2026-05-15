import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Heart, ShoppingCart, Share2, CheckCircle2, 
  MapPin, Clock, DollarSign, Award, Briefcase, GraduationCap, 
  ChevronRight, Star, Plus, Minus, Trash2, Check, CheckSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

import developersData from '../data/developers.json';
import API_BASE_URL from '../config/api';

const DeveloperProfile = () => {
  const { talentId } = useParams();
  const navigate = useNavigate();
  const [developer, setDeveloper] = useState(() => developersData.find(d => d.talentId === talentId));
  const [isLoading, setIsLoading] = useState(!developer);
  const [activeTab, setActiveTab] = useState('about');
  
  // Cart/Wishlist states (simplified for now, ideally should come from context/props)
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      fetchDeveloper();
    }
    window.scrollTo(0, 0);
  }, [talentId]);

  const fetchDeveloper = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/developers`);
      const data = await res.json();
      const dev = data.find(d => d.talentId === talentId);
      if (dev) {
        setDeveloper(dev);
      }
    } catch (error) {
      console.log('Using bundled profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatName = (name, showFullName) => {
    if (showFullName) return name;
    if (!name) return '';
    return name.trim().split(' ').map(word => {
      if (word.length <= 2) return word[0] + '*';
      return word[0] + '*'.repeat(word.length - 2) + word[word.length - 1];
    }).join(' ');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold">Loading elite profile...</p>
        </div>
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <h1 className="text-2xl font-black text-secondary mb-4">Profile Not Found</h1>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg">
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: <Briefcase size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Star size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Award size={16} /> },
    { id: 'education', label: 'Education & Certifications', icon: <GraduationCap size={16} /> }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-secondary font-black text-xs hover:bg-slate-200 transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Profile Header Card */}
        <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8 flex flex-col md:row gap-8 items-start md:flex-row">
            
            {/* Left: Avatar */}
            <div className="w-full md:w-[200px] aspect-square rounded-[20px] bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 font-black text-6xl shadow-inner overflow-hidden">
              {developer.name.charAt(0)}
            </div>

            {/* Right: Info & Actions */}
            <div className="flex-1 w-full">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-50 text-orange-600 text-[11px] font-black px-3 py-1 rounded-full border border-orange-100 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                      Available for Work
                    </span>
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-black text-secondary flex items-center gap-2">
                      {formatName(developer.name, developer.showFullName)}
                      {developer.verified && <CheckCircle2 size={24} className="text-blue-500 fill-blue-50" />}
                    </h1>
                    <p className="text-lg font-bold text-slate-500 mt-0.5">{developer.title}</p>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-100 font-bold text-xs">
                      <Briefcase size={14} className="text-emerald-500" />
                      {developer.years} Years+ of experience
                    </div>
                    <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-xl border border-amber-100 font-bold text-xs">
                      <Award size={14} className="text-amber-500" />
                      2+ Projects completed
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2">Skills</span>
                    <div className="flex flex-wrap gap-2">
                      {developer.skills.map((skill, idx) => (
                        <span key={skill} className="text-secondary font-bold text-sm">
                          {skill}{idx < developer.skills.length - 1 ? ' | ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex flex-col items-end gap-6 w-full lg:w-auto">
                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-secondary">${developer.price}</span>
                      <span className="text-slate-400 font-bold text-sm">/hr</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2.5 w-full">
                    <button 
                      onClick={() => { setIsWishlisted(!isWishlisted); toast.success(isWishlisted ? "Removed from Wishlist" : "Added to Wishlist"); }}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all border ${isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-inner' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 shadow-sm'}`}
                    >
                      <Heart size={20} className={isWishlisted ? 'fill-rose-500' : ''} />
                    </button>
                    
                    <button 
                      className="flex items-center gap-2 px-4 h-11 bg-slate-50 border border-slate-200 rounded-xl text-secondary font-black text-xs hover:bg-slate-100 transition-all shadow-sm"
                    >
                      <CheckSquare size={16} />
                      Add to Compare
                    </button>

                    <button 
                      onClick={() => { setIsInCart(!isInCart); toast.success(isInCart ? "Removed from Cart" : "Added to Cart"); }}
                      className={`flex items-center gap-2 px-5 h-11 rounded-xl font-black text-xs transition-all shadow-sm ${isInCart ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100' : 'bg-primary text-white hover:bg-secondary'}`}
                    >
                      {isInCart ? <Trash2 size={16} /> : <Plus size={16} />}
                      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="px-6 md:px-8 border-t border-slate-100 flex items-center justify-between overflow-x-auto no-scrollbar">
            <div className="flex">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-4 text-sm font-black whitespace-nowrap transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
            
            <button className="flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-slate-600 transition-colors py-4 ml-4">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 md:p-10">
          <AnimatePresence mode="wait">
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-secondary">About</h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                      {developer.bio}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">Experience</span>
                    <p className="text-lg font-black text-secondary">{developer.years} Years</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">Hourly rate</span>
                    <p className="text-lg font-black text-secondary">${developer.price}/hr</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">Availability</span>
                    <p className="text-lg font-black text-secondary">
                      {developer.fullTime && developer.partTime ? 'Part Time, Full Time' : developer.fullTime ? 'Full Time' : 'Part Time'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase">Work location</span>
                    <p className="text-lg font-black text-secondary">Remote</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-black text-secondary">Technical Skills</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {developer.skills.map(skill => (
                    <div key={skill} className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3 group hover:border-primary/30 transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <Check size={16} strokeWidth={3} />
                      </div>
                      <span className="font-bold text-secondary">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-black text-secondary">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {developer.projects && developer.projects.length > 0 ? (
                    developer.projects.map((project, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-[24px] space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Briefcase size={24} />
                        </div>
                        <h3 className="text-xl font-black text-secondary">{project.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {project.desc}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                      <p className="text-slate-400 font-bold italic">No projects listed yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <h2 className="text-2xl font-black text-secondary">Education & Certifications</h2>
                <div className="space-y-6">
                  {developer.education && developer.education.length > 0 ? (
                    developer.education.map((edu, idx) => (
                      <div key={idx} className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                          <GraduationCap size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-secondary">{edu.degree}</h3>
                          <p className="text-slate-500 font-bold">{edu.school}</p>
                          <p className="text-xs text-slate-400 mt-1">{edu.year}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                      <p className="text-slate-400 font-bold italic">No education details listed yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default DeveloperProfile;
