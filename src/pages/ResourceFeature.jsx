import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, ArrowRight, Library, PenTool, FileBarChart, Megaphone, Calendar, BookOpen, FileText } from 'lucide-react';
import { resourceFeaturesData } from '../data/resourceFeatures';

const IconComponent = ({ name, size = 32 }) => {
  const icons = { PenTool: <PenTool size={size}/>, FileBarChart: <FileBarChart size={size}/>, Megaphone: <Megaphone size={size}/>, Calendar: <Calendar size={size}/>, BookOpen: <BookOpen size={size}/>, FileText: <FileText size={size}/> };
  return icons[name] || <Library size={size}/>;
};

const ResourceFeature = () => {
  const { slug } = useParams();
  const resourceData = resourceFeaturesData.find(r => r.slug === slug || r.slug === `/${slug}`);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!resourceData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-secondary mb-4">Resource Not Found</h1>
      <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold">Return Home</Link>
    </div>
  );

  return (
    <div className="font-sans pt-20 bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-secondary to-slate-800 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] translate-y-1/2 translate-x-1/4 opacity-30"></div>
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center space-x-2 text-sm text-slate-400 mb-6 uppercase tracking-wide">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight size={14}/>
              <span>Resources</span>
              <ChevronRight size={14}/>
              <span className="text-white">{resourceData.role}</span>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary mb-6 border border-white/20"
            >
              <IconComponent name={resourceData.iconName} size={32}/>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {resourceData.title}
            </motion.h1>
            <p className="text-slate-300 text-lg mb-8">{resourceData.tagline}</p>
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center">
              Access {resourceData.role} <ArrowRight className="ml-2" size={20}/>
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src={resourceData.bannerImage}
              alt={resourceData.title}
              onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${resourceData.slug}/900/500`; }}
              className="rounded-3xl shadow-2xl border-4 border-white/5 object-cover w-full h-[450px]"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-secondary mb-6">Knowledge is <span className="text-primary">Power</span></h2>
            <div className="w-20 h-1.5 bg-primary mb-8 rounded-full"></div>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{resourceData.description}</p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start">
              <Library className="text-primary mr-4 flex-shrink-0" size={28}/>
              <div>
                <h4 className="font-bold text-secondary mb-2">Free & Open Access</h4>
                <p className="text-sm text-slate-500">All our resources, research papers, and technical tutorials are completely free to access and download.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resourceData.keyPoints.map((point, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-primary/30 transition-colors group">
                <div className="w-10 h-10 bg-brand-sage text-primary flex items-center justify-center rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={20}/>
                </div>
                <p className="font-bold text-slate-800 text-lg leading-tight">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 px-4 bg-lightbg">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-secondary mb-4">What You'll Discover</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Key topics covered in our {resourceData.role.toLowerCase()} section.</p>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {resourceData.highlights.map((h, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="w-2 h-2 bg-primary rounded-full mb-4"></div>
                <h4 className="font-bold text-secondary text-lg leading-snug">{h}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-20 px-4 text-center text-white border-t-4 border-primary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Stay Ahead of the Curve</h2>
          <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">Subscribe to receive the latest {resourceData.role.toLowerCase()} and tech insights directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4">
            <input type="email" placeholder="Enter your work email" className="px-6 py-4 rounded-full text-slate-800 w-full focus:outline-none focus:ring-2 focus:ring-primary"/>
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-colors flex-shrink-0">Subscribe Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourceFeature;
