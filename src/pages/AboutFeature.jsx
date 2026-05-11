import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, ArrowRight, Users, Briefcase, MessageSquare, Rocket, Calendar } from 'lucide-react';
import { aboutFeaturesData } from '../data/aboutFeatures';

const IconComponent = ({ name, size = 32 }) => {
  const icons = { Users: <Users size={size}/>, Briefcase: <Briefcase size={size}/>, MessageSquare: <MessageSquare size={size}/>, Rocket: <Rocket size={size}/>, Calendar: <Calendar size={size}/> };
  return icons[name] || <Users size={size}/>;
};

const AboutFeature = () => {
  const { slug } = useParams();
  const featureData = aboutFeaturesData.find(f => f.slug === slug || f.slug === `/${slug}`);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!featureData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-secondary mb-4">Page Not Found</h1>
      <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold">Return Home</Link>
    </div>
  );

  return (
    <div className="font-sans pt-20 bg-white">
      {/* Hero */}
      <section className="bg-secondary text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-white rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] translate-y-1/3"></div>
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center space-x-2 text-sm text-slate-400 mb-6 uppercase tracking-wide">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight size={14}/>
              <span>About Us</span>
              <ChevronRight size={14}/>
              <span className="text-white">{featureData.title}</span>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20"
            >
              <IconComponent name={featureData.iconName} size={32}/>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {featureData.title}
            </motion.h1>
            <p className="text-slate-300 text-lg mb-8">{featureData.tagline}</p>
          </div>
          <div className="md:w-1/2 relative">
            <img
              src={featureData.bannerImage}
              alt={featureData.title}
              onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${featureData.slug}/900/500`; }}
              className="rounded-3xl shadow-2xl border-4 border-white/10 object-cover w-full h-[400px]"
            />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white text-secondary p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden sm:block"
            >
              <div className="flex items-center text-primary font-bold mb-2"><CheckCircle2 size={20} className="mr-2"/> Verified</div>
              <p className="text-sm font-semibold">Award-winning global IT services and solutions.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-secondary mb-6">Driving Digital <span className="text-primary">Transformation</span></h2>
            <div className="w-20 h-1.5 bg-primary mb-8 rounded-full"></div>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{featureData.description}</p>
            <Link to="/contact" className="inline-flex items-center font-bold text-primary hover:text-secondary transition-colors text-lg">
              Get in touch with our team <ArrowRight className="ml-2" size={20}/>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featureData.keyPoints.map((point, i) => (
              <div key={i} className="bg-lightbg p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow group">
                <CheckCircle2 className="text-primary mb-4 w-10 h-10 group-hover:scale-110 transition-transform"/>
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
            <h2 className="text-3xl font-extrabold text-secondary mb-4">Key Highlights</h2>
          </div>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {featureData.highlights.map((h, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-brand-sage text-primary rounded-full flex items-center justify-center mb-4 font-bold text-xl">{i+1}</div>
                <h4 className="font-bold text-slate-800">{h}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-20 px-4 text-center text-white border-t-4 border-primary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to Work With Us?</h2>
          <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">Whether you're looking to build your next big project or join our growing team, we'd love to hear from you.</p>
          <Link to="/contact" className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg inline-block">Contact Us Today</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutFeature;
