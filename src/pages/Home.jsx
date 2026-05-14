import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Users, Award, Globe, Zap, Shield, Clock, Code, Smartphone, Box, ShoppingCart, Gamepad2, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactModal from '../components/ContactModal';
import ScrollSection from '../components/ScrollSection';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const services = [
    { slug: "mobile-app-development", icon: <Smartphone size={32}/>, title: "Mobile App Development", desc: "Native iOS & Android apps and cross-platform solutions using React Native & Flutter that users love.", tags: ["iOS","Android","Flutter","React Native"], color: "bg-blue-50 text-blue-600", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80" },
    { slug: "web-cms-development", icon: <Globe size={32}/>, title: "Web & CMS Development", desc: "High-performance, SEO-optimised websites and enterprise web applications built with modern frameworks.", tags: ["React","Next.js","Laravel","WordPress"], color: "bg-purple-50 text-purple-600", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80" },
    { slug: "ecommerce-development", icon: <ShoppingCart size={32}/>, title: "eCommerce Development", desc: "Scalable, conversion-optimised online stores that handle millions of transactions without breaking a sweat.", tags: ["Shopify","Magento","WooCommerce"], color: "bg-orange-50 text-orange-600", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
    { slug: "ai-ml-development", icon: <Brain size={32}/>, title: "AI & ML Development", desc: "Custom LLMs, generative AI tools, intelligent automation and machine learning pipelines for enterprises.", tags: ["GPT-4","LangChain","TensorFlow"], color: "bg-cyan-50 text-cyan-600", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80" },
    { slug: "blockchain-development", icon: <Box size={32}/>, title: "Blockchain Development", desc: "Smart contracts, DeFi platforms, NFT marketplaces and private blockchain networks built for scale.", tags: ["Solidity","Web3.js","Ethereum"], color: "bg-green-50 text-green-600", img: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&q=80" },
    { slug: "game-development", icon: <Gamepad2 size={32}/>, title: "Game Development", desc: "Immersive 2D/3D games, AR/VR experiences and metaverse apps engineered with Unity and Unreal Engine.", tags: ["Unity 3D","Unreal","AR/VR"], color: "bg-red-50 text-red-600", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80" },
  ];

  const whyUs = [
    { icon: <Users size={28}/>, title: "1200+ Expert Developers", desc: "A global bench of pre-vetted engineers across every technology stack, ready to deploy in 48 hours.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80" },
    { icon: <Award size={28}/>, title: "Award-Winning Quality", desc: "Top-rated on Clutch & GoodFirms. We deliver enterprise-grade software that wins awards and retains clients.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80" },
    { icon: <Shield size={28}/>, title: "Enterprise-Grade Security", desc: "SOC2, GDPR, HIPAA-compliant architectures. Your data is always protected with bank-grade security protocols.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=700&q=80" },
    { icon: <Clock size={28}/>, title: "On-Time Delivery", desc: "Agile sprints with transparent project tracking. We ship on schedule — every single time.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80" },
  ];

  const projects = [
    { title: "FinTrack Banking App", cat: "Mobile Apps", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80", tags: ["React Native","Fintech"], desc: "Processes $50M+ in daily transactions with biometric auth." },
    { title: "Nexus AI Dashboard", cat: "AI & Analytics", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80", tags: ["ML","AWS"], desc: "Real-time enterprise analytics for Fortune 500 clients." },
    { title: "Vogue eCommerce", cat: "eCommerce", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&q=80", tags: ["Shopify Plus","Next.js"], desc: "45% increase in mobile conversion for luxury retailer." },
  ];

  const testimonials = [
    { name: "James Carter", role: "CTO, FinEdge Inc.", avatar: "https://randomuser.me/api/portraits/men/32.jpg", review: "Vedanco delivered a flawless mobile banking app ahead of schedule. Their AI team is world-class — absolute professionals!", rating: 5 },
    { name: "Sarah Mitchell", role: "CEO, RetailX", avatar: "https://randomuser.me/api/portraits/women/44.jpg", review: "Our eCommerce revenue doubled in 6 months after launch. The Shopify Plus store they built is lightning-fast and stunning.", rating: 5 },
    { name: "Rohan Mehta", role: "Founder, MediCare+", avatar: "https://randomuser.me/api/portraits/men/68.jpg", review: "Building a HIPAA-compliant telemedicine platform is no joke. They nailed it — compliance, UX and performance all together.", rating: 5 },
  ];

  const techs = [
    { name: "React", logo: "https://cdn.worldvectorlogo.com/logos/react-2.svg" },
    { name: "Node.js", logo: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" },
    { name: "Flutter", logo: "https://cdn.worldvectorlogo.com/logos/flutter.svg" },
    { name: "Python", logo: "https://cdn.worldvectorlogo.com/logos/python-5.svg" },
    { name: "AWS", logo: "https://cdn.worldvectorlogo.com/logos/aws-2.svg" },
    { name: "Kubernetes", logo: "https://cdn.worldvectorlogo.com/logos/kubernets.svg" },
    { name: "TensorFlow", logo: "https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg" },
    { name: "Solidity", logo: "https://cdn.worldvectorlogo.com/logos/solidity.svg" },
  ];

  return (
    <div className="w-full font-sans">

      {/* ── HERO ── */}
      <ScrollSection>
        <section className="animated-gradient text-white pt-40 pb-24 px-4 relative overflow-hidden min-h-[92vh] flex items-center">
          <div className="absolute inset-0 hero-grid opacity-40 z-0" />
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/40 blur-[130px] float-orb-1 z-0" />
          <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] rounded-full bg-brand-sand/20 blur-[100px] float-orb-2 z-0" />
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-white/5 blur-[80px] float-orb-3 z-0" />
          <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=60" alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-[0.04]" />

          <div className="max-w-[1200px] mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{duration:0.5}}
                className="inline-flex items-center bg-white/10 border border-white/25 backdrop-blur-sm px-5 py-2 rounded-full text-xs font-bold mb-8 uppercase tracking-widest gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                Top-Rated IT Agency · Clutch 2024
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" transition={{duration:0.6,delay:0.1}}
                className="text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold mb-6 leading-[1.08] tracking-tight">
                We Build Digital Products That <span className="text-gradient">Change Industries</span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="show" transition={{duration:0.6,delay:0.2}}
                className="text-lg text-white/75 mb-10 max-w-xl leading-relaxed">
                Vedanco is a premier IT company delivering world-class mobile apps, AI systems, blockchain platforms, and enterprise web solutions across USA, India &amp; UAE.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{duration:0.5,delay:0.3}} className="flex flex-wrap gap-4">
                <Link to="/contact" className="group relative bg-brand-sand text-secondary px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">Start Your Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/></span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>
                <Link to="/portfolio" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                  View Our Work
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{duration:0.6,delay:0.5}}
                className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {["men/32","women/44","men/68"].map((p,i)=>(
                    <img key={i} src={`https://randomuser.me/api/portraits/${p}.jpg`} className="w-10 h-10 rounded-full border-2 border-white/60 object-cover" alt="client" loading="lazy"/>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_,i)=><Star key={i} size={14} className="fill-yellow-400 text-yellow-400"/>)}</div>
                  <p className="text-sm text-white/60">Trusted by <span className="font-bold text-white">2700+</span> clients worldwide</p>
                </div>
              </motion.div>
            </div>

            {/* Premium Dashboard Mockup */}
            <motion.div initial={{opacity:0,x:60}} animate={{opacity:1,x:0}} transition={{duration:0.9,ease:[0.22,1,0.36,1]}} className="hidden lg:block relative">
              <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-3xl scale-110" />
              <div className="dashboard-mockup rounded-3xl p-5 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400/80"/><div className="w-3 h-3 rounded-full bg-yellow-400/80"/><div className="w-3 h-3 rounded-full bg-green-400/80"/>
                  <div className="flex-1 bg-white/10 rounded-full h-5 ml-4 px-3 flex items-center">
                    <span className="text-[10px] text-white/50">app.vedanco.com/dashboard</span>
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80" alt="Dashboard" loading="lazy"
                  className="rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)] border border-white/10 object-cover w-full h-[340px]"/>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[["4500+","Projects"],["2700+","Clients"],["98%","Retention"]].map(([n,l])=>(
                    <div key={l} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <div className="text-white font-black text-lg">{n}</div>
                      <div className="text-white/50 text-[10px] font-semibold uppercase tracking-wider">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div animate={{y:[0,-8,0]}} transition={{duration:3,repeat:Infinity,ease:"easeInOut"}}
                className="absolute -bottom-5 -left-8 bg-white text-secondary px-4 py-3 rounded-xl shadow-2xl z-20 flex items-center gap-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg"><CheckCircle size={16}/></div>
                <div><div className="text-base font-black">4500+</div><div className="text-[10px] text-slate-500 font-semibold">Apps Delivered</div></div>
              </motion.div>
              <motion.div animate={{y:[0,8,0]}} transition={{duration:4,repeat:Infinity,ease:"easeInOut",delay:1}}
                className="absolute -top-4 -right-6 bg-white/15 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-xl shadow-xl z-20 flex items-center gap-3">
                <div className="bg-brand-sand/20 p-2 rounded-lg"><Award size={16} className="text-brand-sand"/></div>
                <div><div className="text-base font-black">12+</div><div className="text-[10px] text-white/60 font-semibold">Years Experience</div></div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ScrollSection>



      {/* ── SERVICES ── */}
      <ScrollSection>
        <section className="py-28 bg-brand-cream px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-primary uppercase tracking-[0.25em] bg-primary/10 px-4 py-1.5 rounded-full">What We Build</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mt-5 mb-4">End-to-End Digital Services</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">From idea to launch to scale — we cover every layer of your digital stack with elite engineers.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s,i)=>(
                <motion.div key={i} whileInView={{opacity:1,y:0}} initial={{opacity:0,y:30}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.07}}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 group overflow-hidden cursor-pointer"
                  style={{transition:'all 0.4s cubic-bezier(0.34,1.56,0.64,1)'}}
                  whileHover={{y:-8,scale:1.01,boxShadow:'0 25px 60px -10px rgba(35,75,47,0.18)',borderColor:'rgba(35,75,47,0.2)'}}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={s.img} alt={s.title}
                      onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${s.slug}/600/300`; }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                    <div className={`absolute top-4 left-4 w-12 h-12 ${s.color} rounded-xl flex items-center justify-center shadow-lg`}>{s.icon}</div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {s.tags.map(t=><span key={t} className="bg-slate-50 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full border border-slate-100">{t}</span>)}
                    </div>
                    <Link to={`/services/${s.slug}`} className="text-primary font-bold flex items-center gap-1 text-sm hover:gap-3 transition-all">
                      Learn More <ArrowRight size={16}/>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* ── WHY US ── */}
      <ScrollSection>
        <section className="py-28 bg-white px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-[0.25em] bg-primary/10 px-4 py-1.5 rounded-full">Why Vedanco</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mt-5 mb-6 leading-tight">
                  We Don't Just Write Code.<br/>We <span className="text-primary">Engineer Growth.</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  We combine deep technical expertise with strategic business thinking. Every line of code is written with your ROI in mind. That's why 98% of our clients come back for their next project.
                </p>
                <div className="space-y-4">
                  {["Top 1% globally vetted engineers across all stacks","Transparent Agile delivery with weekly demos","Strict IP protection & NDAs from day one","24/7 support during and after project launch"].map((p,i)=>(
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-primary mt-0.5 flex-shrink-0" size={20}/>
                      <p className="text-slate-700 font-medium">{p}</p>
                    </div>
                  ))}
                </div>
                <Link to="/about/who-we-are" className="mt-8 inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold hover:bg-secondary transition-colors shadow-lg">
                  About Vedanco <ArrowRight size={18}/>
                </Link>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" alt="Our team" className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"/>
                <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-6 rounded-2xl shadow-xl text-center">
                  <div className="text-4xl font-black text-brand-sand">98%</div>
                  <div className="text-sm text-white/70 mt-1">Client Retention</div>
                </div>
              </div>
            </div>

            {/* Why Us Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map((w,i)=>(
                <motion.div key={i} whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} viewport={{once:true}} transition={{delay:i*0.1}}
                  className="group rounded-2xl overflow-hidden border border-slate-100 bg-white cursor-pointer"
                  whileHover={{y:-6,boxShadow:'0 20px 50px -8px rgba(35,75,47,0.14)',borderColor:'rgba(35,75,47,0.18)'}}>
                  <div className="relative h-36 overflow-hidden">
                    <img src={w.img} alt={w.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
                    <div className="absolute bottom-3 left-3 bg-primary/90 p-2.5 rounded-xl text-white">{w.icon}</div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{w.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* ── PORTFOLIO PREVIEW ── */}
      <ScrollSection>
        <section className="py-28 bg-brand-cream px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-[0.25em] bg-primary/10 px-4 py-1.5 rounded-full">Our Work</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mt-5">Featured Projects</h2>
              </div>
              <Link to="/portfolio" className="flex items-center gap-2 font-bold text-primary hover:text-secondary transition-colors whitespace-nowrap">
                View All Projects <ArrowRight size={18}/>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((p,i)=>(
                <motion.div key={i} whileInView={{opacity:1,scale:1}} initial={{opacity:0,scale:0.95}} viewport={{once:true}} transition={{delay:i*0.1}}
                  className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                  <div className="relative h-56 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-secondary text-xs font-bold px-3 py-1 rounded-full">{p.cat}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-slate-500 text-sm mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map(t=><span key={t} className="bg-slate-50 text-xs font-semibold px-3 py-1 rounded-full border border-slate-100 text-slate-600">{t}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* ── TESTIMONIALS ── */}
      <ScrollSection>
        <section className="py-28 bg-secondary px-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/3"/>
          <div className="max-w-[1200px] mx-auto relative z-10">
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-brand-sand uppercase tracking-[0.25em] bg-white/10 px-4 py-1.5 rounded-full">Client Love</span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-5">What Our Clients Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t,i)=>(
                <motion.div key={i} whileInView={{opacity:1,y:0}} initial={{opacity:0,y:30}} viewport={{once:true}} transition={{delay:i*0.1}}
                  className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-white/25 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                  <div className="flex gap-1 mb-5">{[...Array(t.rating)].map((_,j)=><Star key={j} size={16} className="fill-yellow-400 text-yellow-400"/>)}</div>
                  <p className="text-slate-300 text-[15px] leading-relaxed mb-6 italic">"{t.review}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary"/>
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* ── TECH STACK ── */}
      <ScrollSection>
        <section className="py-20 bg-white px-4">
          <div className="max-w-[1200px] mx-auto text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Technologies We Master</p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-center">
              {techs.map((t,i)=>(
                <motion.div key={i} whileInView={{opacity:1,scale:1}} initial={{opacity:0,scale:0.8}} viewport={{once:true}} transition={{delay:i*0.05}}
                  className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-primary/30 group-hover:shadow-md transition-all p-3">
                    <img src={t.logo} alt={t.name} className="w-full h-full object-contain"/>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">{t.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollSection>

      {/* ── CTA ── */}
      <ScrollSection>
        <section className="cta-gradient py-32 px-4 relative overflow-hidden">
          {/* Animated orbs */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/60 rounded-full blur-[120px] float-orb-1" />
          <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-brand-sand/15 rounded-full blur-[100px] float-orb-2" />
          <div className="absolute inset-0 hero-grid opacity-20" />
          <div className="max-w-3xl mx-auto text-center text-white relative z-10">
            <motion.span whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} viewport={{once:true}}
              className="inline-block text-xs font-bold text-brand-sand uppercase tracking-[0.25em] bg-white/10 border border-brand-sand/20 px-5 py-2 rounded-full mb-8">
              Start Your Journey
            </motion.span>
            <motion.h2 whileInView={{opacity:1,y:0}} initial={{opacity:0,y:30}} viewport={{once:true}} transition={{delay:0.1}}
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-[1.05] tracking-tight">
              Ready to Build Something <span className="text-gradient">Extraordinary?</span>
            </motion.h2>
            <motion.p whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} viewport={{once:true}} transition={{delay:0.2}}
              className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 2700+ businesses that trust Vedanco to turn their bold ideas into world-class digital products.
            </motion.p>
            <motion.div whileInView={{opacity:1,y:0}} initial={{opacity:0,y:20}} viewport={{once:true}} transition={{delay:0.3}}
              className="flex flex-wrap gap-5 justify-center">
              <button onClick={() => setIsModalOpen(true)}
                className="group relative bg-brand-sand text-secondary px-10 py-4 rounded-full font-bold text-lg shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(205,191,168,0.4)]">
                <span className="relative z-10 flex items-center gap-2">Get A Free Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/></span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
              <Link to="/portfolio" className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                See Our Work
              </Link>
            </motion.div>
          </div>
        </section>
      </ScrollSection>

      {/* Contact & Quote Modal Overlay */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request A Free Quote!" />

    </div>
  );
};

export default Home;
