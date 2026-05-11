import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, ArrowRight, Building2, HeartPulse, Wallet, ShoppingCart, GraduationCap, Truck, Activity } from 'lucide-react';
import { industryFeaturesData } from '../data/industryFeatures';

const IconComponent = ({ name, size = 32 }) => {
  const icons = { Building2: <Building2 size={size}/>, HeartPulse: <HeartPulse size={size}/>, Wallet: <Wallet size={size}/>, ShoppingCart: <ShoppingCart size={size}/>, GraduationCap: <GraduationCap size={size}/>, Truck: <Truck size={size}/> };
  return icons[name] || <Activity size={size}/>;
};

const IndustryFeature = () => {
  const { slug } = useParams();
  const industryData = industryFeaturesData.find(ind => ind.slug === slug || ind.slug === `/${slug}`);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!industryData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-secondary mb-4">Industry Not Found</h1>
      <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold">Return Home</Link>
    </div>
  );

  return (
    <div className="font-sans pt-20 bg-white">
      {/* Hero */}
      <section className="bg-[#0B1B3D] text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center space-x-2 text-sm text-slate-400 mb-6 uppercase tracking-wide">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight size={14}/>
              <span>Industries</span>
              <ChevronRight size={14}/>
              <span className="text-white">{industryData.role}</span>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20"
            >
              <IconComponent name={industryData.iconName} size={32}/>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {industryData.title}
            </motion.h1>
            <p className="text-slate-300 text-lg mb-8">{industryData.tagline}</p>
          </div>
          <div className="md:w-1/2">
            <img src={industryData.bannerImage} alt={industryData.title} className="rounded-3xl shadow-2xl border border-white/10 object-cover w-full h-[400px]"/>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-secondary mb-6">Transforming the <span className="text-primary">{industryData.role}</span> Sector</h2>
            <div className="w-20 h-1.5 bg-primary mb-8 rounded-full"></div>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{industryData.description}</p>
            <Link to="/contact" className="inline-flex items-center font-bold text-primary hover:text-secondary transition-colors text-lg">
              Consult our Industry Experts <ArrowRight className="ml-2" size={20}/>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {industryData.keyPoints.map((point, i) => (
              <div key={i} className="bg-lightbg p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-brand-sage text-primary flex items-center justify-center rounded-full mb-4 font-bold">{i+1}</div>
                <p className="font-bold text-secondary text-lg leading-tight">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-secondary mb-4">Our Core Solutions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">We deliver custom-tailored software solutions for {industryData.role}.</p>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {industryData.highlights.map((h, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-start hover:-translate-y-1 transition-transform">
                <CheckCircle2 className="text-primary mb-4" size={24}/>
                <h4 className="font-bold text-slate-800 text-lg leading-snug">{h}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Innovate Your Business</h2>
          <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">Partner with us to build state-of-the-art software solutions tailored for the {industryData.role} industry.</p>
          <Link to="/contact" className="bg-white text-secondary px-10 py-4 rounded-full font-extrabold text-lg hover:bg-slate-100 transition-colors shadow-lg inline-block">Request A Quote</Link>
        </div>
      </section>
    </div>
  );
};

export default IndustryFeature;
