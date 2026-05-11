import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, Brain, Cpu, ArrowRight, Zap } from 'lucide-react';
import { aiServicesData } from '../data/aiServices';
import ContactModal from '../components/ContactModal';

const AiService = () => {
  const { slug } = useParams();
  const serviceData = aiServicesData.find(s => s.slug === slug || s.slug === `/${slug}`);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!serviceData) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      <h1 className="text-4xl font-bold text-secondary mb-4">Service Not Found</h1>
      <Link to="/ai-integration-services" className="bg-primary text-white px-8 py-3 rounded-full font-bold">View All AI Services</Link>
    </div>
  );

  const otherServices = aiServicesData.filter(s => s.slug !== slug).slice(0, 4);

  return (
    <div className="font-sans pt-20">

      {/* Modal */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Get Started with ${serviceData.role}`} />

      {/* ── HERO ── */}
      <section className="bg-secondary text-white py-24 px-4 relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={serviceData.bannerImage} alt={serviceData.title}
            onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${slug}/1400/800`; }}
            className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/95 to-secondary/60" />
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-14 items-center">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-slate-400 mb-6 font-semibold flex-wrap gap-1">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={14}/>
              <Link to="/ai-integration-services" className="hover:text-primary transition-colors">AI Services</Link>
              <ChevronRight size={14}/>
              <span className="text-white">{serviceData.role}</span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-primary mb-6">
              <Zap size={12}/> AI-Powered Solution
            </div>

            <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1]">
              {serviceData.title}
            </motion.h1>

            <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
              className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg">
              {serviceData.tagline}
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => setModalOpen(true)}
                className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-xl hover:scale-105 active:scale-100">
                Consult AI Experts
              </button>
              <Link to="/ai-integration-services"
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors">
                All AI Services
              </Link>
            </div>
          </div>

          {/* Right: image + stats */}
          <div className="hidden lg:block relative">
            <img src={serviceData.bannerImage} alt={serviceData.title}
              onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${slug}/900/600`; }}
              className="rounded-3xl shadow-2xl border border-white/10 object-cover w-full h-[420px]"/>
            {/* Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white text-secondary px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center"><CheckCircle2 size={20}/></div>
              <div><div className="text-xl font-black text-primary">99%</div><div className="text-xs text-slate-500 font-semibold">Model Accuracy</div></div>
            </div>
            <div className="absolute -top-4 -right-4 bg-primary text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Brain size={20}/></div>
              <div><div className="text-xl font-black">10x</div><div className="text-xs text-white/70 font-semibold">ROI Average</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESCRIPTION ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-4 py-1.5 rounded-full">Overview</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mt-5 mb-6 leading-tight">
              Why Choose <span className="text-primary">{serviceData.role}</span>?
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{serviceData.description}</p>
            <div className="space-y-3">
              {["Industry-leading AI engineers with proven enterprise deployments.",
                "Proprietary data stays secure — built on your private infrastructure.",
                "From PoC to production in weeks, not months.",
                "24/7 post-deployment monitoring and model maintenance."].map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={20}/>
                  <p className="text-slate-700 font-medium">{p}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {[["99%","Model Accuracy"],["10x","ROI Average"],["24/7","Autonomous Ops"],["SOC2","Compliant"]].map(([val, label], i) => (
              <motion.div key={i} whileInView={{opacity:1,scale:1}} initial={{opacity:0,scale:0.9}} viewport={{once:true}} transition={{delay:i*0.08}}
                className="bg-brand-cream rounded-2xl p-8 text-center border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-black text-primary mb-2">{val}</div>
                <div className="text-sm font-bold text-secondary uppercase tracking-wider">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS WITH IMAGES ── */}
      <section className="py-24 px-4 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-4 py-1.5 rounded-full">What We Deliver</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mt-5 mb-4">
              Our {serviceData.role} Capabilities
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              End-to-end delivery across every dimension of {serviceData.role} — from architecture to deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceData.features.map((f, i) => (
              <motion.div key={i} whileInView={{opacity:1,y:0}} initial={{opacity:0,y:30}} viewport={{once:true}} transition={{delay:i*0.1}}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 group">
                <div className="relative h-52 overflow-hidden">
                  <img src={f.img} alt={f.title}
                    onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${slug}${i}/600/400`; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                  <div className="absolute bottom-4 left-4 w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-white">
                    {i + 1}
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK & USE CASES ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12">
          {/* Tech Stack */}
          <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center">
              <Brain className="mr-3 text-primary" size={24}/> AI Tech Stack
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {serviceData.keySkills.map((skill, i) => (
                <div key={i} className="flex items-center bg-white p-3.5 rounded-xl border border-slate-100 text-sm font-semibold text-slate-700 hover:border-primary/30 hover:shadow-sm transition-all">
                  <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0" size={16}/> {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-secondary p-10 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 rounded-full blur-[80px]"/>
            <h3 className="text-2xl font-bold mb-6 flex items-center relative z-10">
              <Cpu className="mr-3 text-primary" size={24}/> Business Use Cases
            </h3>
            <ul className="space-y-4 relative z-10">
              {serviceData.useCases.map((uc, i) => (
                <li key={i} className="flex items-start bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center mr-3 flex-shrink-0 font-black">{i+1}</div>
                  <span className="text-slate-200 font-medium">{uc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── EXPLORE OTHER AI SERVICES ── */}
      <section className="py-20 px-4 bg-brand-cream border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-secondary mb-8 text-center">Explore Other AI Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherServices.map((s, i) => (
              <Link key={i} to={`/ai/${s.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100 group">
                <div className="h-28 overflow-hidden">
                  <img src={s.bannerImage} alt={s.title}
                    onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${s.slug}/400/200`; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-secondary text-sm leading-tight group-hover:text-primary transition-colors">{s.role}</h4>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/ai-integration-services" className="inline-flex items-center gap-2 font-bold text-primary hover:text-secondary transition-colors">
              View All AI Services <ArrowRight size={18}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-20 px-4 text-center text-white relative overflow-hidden">
        <img src={serviceData.bannerImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10"/>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Transform Your Business with {serviceData.role}</h2>
          <p className="text-lg text-white/80 mb-10">Book a free consultation with our AI Architects and discover how {serviceData.role} can generate massive ROI for your enterprise.</p>
          <button onClick={() => setModalOpen(true)}
            className="bg-white text-secondary px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-sand transition-colors shadow-xl hover:scale-105 active:scale-100 inline-block">
            Schedule AI Consultation
          </button>
        </div>
      </section>

    </div>
  );
};

export default AiService;
