import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find(s => s.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!service) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-20">
      <h1 className="text-4xl font-bold text-secondary mb-4">Service Not Found</h1>
      <p className="text-slate-500 mb-8">We couldn't find the service page you're looking for.</p>
      <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold">Back to Home</Link>
    </div>
  );

  return (
    <div className="font-sans pt-20">

      {/* ── HERO ── */}
      <section className="relative bg-secondary text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.bannerImage}
            alt={service.title}
            onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${slug}/1400/800`; }}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/60"/>
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-semibold uppercase tracking-wide">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14}/>
            <Link to="/" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight size={14}/>
            <span className="text-white">{service.title}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map(t => (
                  <span key={t} className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                {service.title}
              </motion.h1>
              <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
                className="text-lg text-slate-300 mb-10 leading-relaxed">
                {service.tagline}
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg">
                  Start Your Project
                </Link>
                <Link to="/portfolio" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors">
                  View Portfolio
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {service.stats.map((s, i) => (
                <motion.div key={i} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.1+i*0.08}}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center hover:bg-white/10 transition-colors">
                  <div className="text-3xl font-black text-brand-sand mb-1">{s.val}</div>
                  <div className="text-sm text-slate-400 font-semibold">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DESCRIPTION ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-4 py-1.5 rounded-full">Overview</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mt-5 mb-6 leading-tight">
              Why Choose Us for <span className="text-primary">{service.title}?</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{service.description}</p>
            <div className="space-y-3">
              {["Top 1% vetted engineers with deep domain expertise",
                "Agile sprints with weekly progress demos",
                "Full IP ownership and NDA protection",
                "Post-launch support and maintenance included"].map((p,i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={20}/>
                  <p className="text-slate-700 font-medium">{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={service.bannerImage}
              alt={service.title}
              onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${slug}/1200/800`; }}
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-5 -right-5 bg-secondary text-white px-5 py-4 rounded-2xl shadow-xl">
              <div className="text-2xl font-black text-brand-sand">{service.stats[0].val}</div>
              <div className="text-xs text-white/70">{service.stats[0].label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES / SUB-SERVICES ── */}
      <section className="py-24 px-4 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-4 py-1.5 rounded-full">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mt-5 mb-4">Our {service.title} Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Every engagement is tailored to your unique requirements, technology stack and business goals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.features.map((f, i) => (
              <motion.div key={i} whileInView={{opacity:1,y:0}} initial={{opacity:0,y:30}} viewport={{once:true}} transition={{delay:i*0.1}}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.title}
                    onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${slug}${i}/600/400`; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
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

      {/* ── PROCESS ── */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-4 py-1.5 rounded-full">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mt-5">Our Development Process</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {service.process.map((step, i) => (
              <motion.div key={i} whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} viewport={{once:true}} transition={{delay:i*0.08}}
                className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary font-black text-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                  {i + 1}
                </div>
                <p className="font-bold text-secondary text-sm leading-tight group-hover:text-primary transition-colors">{step}</p>
                {i < service.process.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-7 text-slate-300">
                    <ArrowRight size={16}/>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-20 px-4 bg-brand-cream border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-secondary mb-10">Technologies We Use</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {service.techStack.map((tech, i) => (
              <motion.span key={i} whileInView={{opacity:1,scale:1}} initial={{opacity:0,scale:0.8}} viewport={{once:true}} transition={{delay:i*0.05}}
                className="bg-white text-secondary font-bold px-5 py-2.5 rounded-full border border-slate-200 shadow-sm hover:border-primary hover:text-primary hover:shadow-md transition-all cursor-default">
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER SERVICES ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-extrabold text-secondary mb-8 text-center">Explore Other Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {servicesData.filter(s => s.slug !== slug).map((s, i) => (
              <Link key={i} to={`/services/${s.slug}`}
                className="bg-brand-cream border border-slate-100 rounded-xl p-4 text-center hover:border-primary/30 hover:shadow-md transition-all group">
                <div className="font-bold text-secondary text-sm group-hover:text-primary transition-colors leading-tight">{s.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={service.bannerImage} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Ready to Start Your {service.title} Project?</h2>
          <p className="text-lg text-white/80 mb-10">Get a free consultation with our experts and a detailed project proposal within 24 hours.</p>
          <Link to="/contact" className="bg-white text-secondary px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-sand transition-colors shadow-xl hover:scale-105 inline-block">
            Get A Free Quote
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;
