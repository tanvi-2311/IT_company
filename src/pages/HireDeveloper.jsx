import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Code, Terminal, Cpu, Lightbulb, Users } from 'lucide-react';
import { hireDevelopersData } from '../data/hireDevelopers';
import ContactModal from '../components/ContactModal';

const HireDeveloper = () => {
  const { slug } = useParams();
  const developerData = hireDevelopersData.find(dev => dev.slug === `/${slug}` || dev.slug === slug);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const getBannerImage = (role) => {
    if(role.includes("Java")) return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80";
    if(role.includes("Android") || role.includes("iOS")) return "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80";
    if(role.includes("React") || role.includes("UI")) return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80";
    if(role.includes("AI")) return "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80"; // Modern AI/Neural Network
    if(role.includes("Blockchain")) return "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80"; // Decentralized Network/Blockchain
    if(role.includes("Python")) return "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1200&q=80";
    return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80";
  };

  if (!developerData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-secondary mb-4">Role Not Found</h1>
      <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold">Return Home</Link>
    </div>
  );

  return (
    <div className="font-sans pt-20">
      {/* Contact Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Hire ${developerData.role}s — Let's Talk!`}
      />

      {/* Hero */}
      <section className="bg-secondary text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center space-x-2 text-sm text-slate-400 mb-6">
              <Link to="/" className="hover:text-primary">Home</Link>
              <ChevronRight size={14} />
              <span>Hire Developers</span>
              <ChevronRight size={14} />
              <span className="text-white">{developerData.role}</span>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {developerData.title}
            </motion.h1>
            <p className="text-slate-300 text-lg mb-8">{developerData.tagline}</p>
            <div className="flex gap-4 flex-wrap">
              {/* Hire Now → opens modal */}
              <button
                onClick={() => setModalOpen(true)}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg hover:scale-105 active:scale-100"
              >
                Hire Now
              </button>
              <Link to="/portfolio" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors">
                View Portfolio
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <motion.img initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              src={getBannerImage(developerData.role)} alt={developerData.title}
              onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${slug}/900/500`; }}
              className="rounded-2xl shadow-2xl border border-white/10 object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Why Hire */}
      <section className="py-20 px-4 bg-lightbg">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-secondary mb-6">Why Hire {developerData.role}s From Us?</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{developerData.description}</p>
            <div className="space-y-4">
              {["Top 1% vetted developers with proven track records.", "Flexible engagement models tailored to your project scope.", "Strict NDA adherence and high-level data security protocols."].map((p, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle2 className="text-primary mt-1 mr-3 flex-shrink-0" size={20}/>
                  <p className="text-slate-700 font-medium">{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[{icon:<Code size={32}/>, label:"Clean Code"},{icon:<Terminal size={32}/>, label:"Robust Architecture"},{icon:<Lightbulb size={32}/>, label:"Innovation"},{icon:<Users size={32}/>, label:"Dedicated Team"}].map(({icon, label}) => (
              <div key={label} className="bg-white p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-sage rounded-full flex items-center justify-center mb-4 text-primary">{icon}</div>
                <h3 className="font-bold text-secondary">{label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Use Cases */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-secondary mb-4">Technical Expertise</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Our {developerData.role}s are highly proficient in modern tools and industry-standard frameworks.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
              <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center"><Cpu className="mr-3 text-primary" size={24}/> Key Technologies</h3>
              <ul className="space-y-4">
                {developerData.keySkills.map((skill, i) => (
                  <li key={i} className="flex items-center text-slate-700 text-lg font-medium bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <CheckCircle2 className="text-green-500 mr-3" size={20}/> {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-secondary p-10 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full blur-[80px]"></div>
              <h3 className="text-2xl font-bold mb-6 relative z-10 flex items-center"><CheckCircle2 className="mr-3 text-primary" size={24}/> Common Use Cases</h3>
              <ul className="space-y-6 relative z-10">
                {developerData.useCases.map((uc, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-4 mt-1 flex-shrink-0 font-bold text-primary">{i+1}</div>
                    <span className="text-lg text-slate-300 font-medium">{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to scale your team?</h2>
          <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">Get access to pre-vetted, top-tier {developerData.role}s within 48 hours.</p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-white text-secondary px-10 py-5 rounded-full font-extrabold text-lg hover:bg-slate-100 transition-colors shadow-xl hover:scale-105 active:scale-100"
          >
            Schedule A Free Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default HireDeveloper;
