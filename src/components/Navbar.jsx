import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [forceClose, setForceClose] = useState(false);
  const location = useLocation();

  const handleMenuClick = () => {
    setForceClose(true);
    setTimeout(() => setForceClose(false), 400);
  };

  // Accordion component for mobile menu
  const MobileAccordion = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    return (
      <div className="border-b border-slate-100 last:border-0">
        <button onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-3.5 px-2 text-base font-semibold text-secondary hover:text-primary transition-colors">
          {title}
          <ChevronDown size={18} className={`transition-transform duration-300 ${open ? 'rotate-180 text-primary' : ''}`} />
        </button>
        {open && (
          <div className="pb-2 pl-2 grid grid-cols-2 gap-1">
            {children}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (currentScrollY / docHeight) * 100 : 0;
      setScrollProgress(progress);

      // Glassmorphism activation threshold
      if (currentScrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY + 5) {
          setHidden(true);
        } else if (currentScrollY < lastScrollY - 5) {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setHidden(false); // Reset to visible on navigation
  }, [location]);

  // A completely upgraded, premium Menu Item Component
  const RichMenuItem = ({ to, img, title, desc, onClick }) => {
    const isExternal = to.startsWith('http');
    const content = (
      <>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover/item:scale-y-100 transition-transform origin-center duration-300"></div>
        <div className="relative overflow-hidden rounded-xl mr-5 flex-shrink-0 shadow-sm group-hover/item:shadow-md transition-shadow">
          <img src={img} alt={title}
               onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${encodeURIComponent(title)}/80/80`; }}
               className="w-16 h-16 object-cover group-hover/item:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-extrabold text-secondary text-[16px] group-hover/item:text-primary transition-colors mb-1 flex items-center justify-between">
            {title}
            <ChevronRight size={16} className="opacity-0 -translate-x-3 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-primary" />
          </h4>
          <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">{desc}</p>
        </div>
      </>
    );

    const className = "flex items-center p-4 rounded-xl bg-slate-50/50 border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 group/item relative overflow-hidden text-left w-full";

    if (isExternal) {
      return (
        <button 
          onClick={(e) => { 
            e.preventDefault(); 
            window.open(to, '_blank'); 
            if(onClick) onClick(); 
          }} 
          className={className}
        >
          {content}
        </button>
      );
    }

    return (
      <Link to={to} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  };

  // Data Arrays for Mega Menus
  const aboutLinks = [
    { to: "/about/who-we-are", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&q=80", title: "Who We Are", desc: "Meet the trailblazers building next-gen tech." },
    { to: "/about/portfolio", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=150&q=80", title: "Portfolio", desc: "Explore our successful worldwide projects." },
    { to: "/about/testimonials", img: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=150&q=80", title: "Testimonials", desc: "Hear from our happy global clients." },
    { to: "/about/careers", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=150&q=80", title: "Careers", desc: "Join our fast-growing tech team." },
    { to: "/about/events-and-life", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=150&q=80", title: "Events & Life", desc: "Glimpse into our vibrant workplace." },
  ];

  const aiLinks = [
    { to: "/ai/generative-ai", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150&q=80", title: "Generative AI", desc: "Create intelligent content, images, and tools." },
    { to: "/ai/llm-development", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&q=80", title: "LLM Development", desc: "Custom large language models tailored for you." },
    { to: "/ai/llm-integration", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=150&q=80", title: "LLM Integration", desc: "Integrate powerful LLMs into your applications." },
    { to: "/ai/ai-agent-development", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&q=80", title: "AI Agent Development", desc: "Autonomous agents executing complex goals." },
    { to: "/ai/agentic-ai", img: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=150&q=80", title: "Agentic AI Development", desc: "Goal-driven AI systems with dynamic decision-making." },
    { to: "/ai/enterprise-ai", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=150&q=80", title: "Enterprise AI Integration", desc: "Scalable, secure AI for large corporations." },
    { to: "/ai/ai-data-engineering", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&q=80", title: "AI Data Engineering", desc: "Robust data pipelines and vector databases." },
    { to: "/ai/multimodal-ai", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&q=80", title: "Multimodal AI", desc: "Process text, audio, images, and video seamlessly." },
    { to: "/ai/mlops", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&q=80", title: "MLOps Services", desc: "Deploy and maintain models in production." },
    { to: "/ai/ai-staffing", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&q=80", title: "AI Staffing", desc: "Hire top-tier AI and ML engineers." },
    { to: "/ai/ai-consulting", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80", title: "AI Consulting", desc: "Strategic AI transformation roadmaps." },
    { to: "/ai/ai-integration", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80", title: "AI Integration", desc: "Automate processes across software infrastructure." }
  ];

  const servicesLinks = [
    { to: "/services/mobile-app-development", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150&q=80", title: "Mobile App Development", desc: "iOS, Android, React Native & Flutter" },
    { to: "/services/web-cms-development", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&q=80", title: "Web & CMS Development", desc: "High-performance modern websites." },
    { to: "/services/ecommerce-development", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=150&q=80", title: "eCommerce Solutions", desc: "Scalable digital storefronts like Magento & Shopify." },
    { to: "/services/blockchain-development", img: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?w=150&q=80", title: "Blockchain Development", desc: "Smart contracts, DApps, Crypto & Web3." },
    { to: "/services/salesforce-solutions", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&q=80", title: "Salesforce Solutions", desc: "Enterprise CRM integration and consulting." },
    { to: "/services/iot-embedded", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80", title: "IoT & Embedded", desc: "Smart device connectivity and IoT Dashboards." },
    { to: "/services/game-development", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&q=80", title: "Game Development", desc: "Unity 3D, Unreal Engine & Metaverse games." },
    { to: "/services/cloud-technologies", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&q=80", title: "Cloud Technologies", desc: "AWS, Azure, Migration and DevOps solutions." },
    { to: "/services/ui-ux-design", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&q=80", title: "UI/UX Design", desc: "Wireframing, prototyping and rich user interfaces." }
  ];

  const hireLinks = [
    { to: "/hire/hire-android-developers", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&q=80", title: "Hire Android Developers", desc: "Expert Kotlin and Java app coders." },
    { to: "/hire/hire-ios-developers", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=150&q=80", title: "Hire iOS Developers", desc: "Top-tier Swift and Objective-C experts." },
    { to: "/hire/hire-react-native-developers", img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=150&q=80", title: "Hire React Native Devs", desc: "Cross-platform mobile specialists." },
    { to: "/hire/hire-reactjs-developers", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=150&q=80", title: "Hire ReactJS Developers", desc: "React frontend UI/UX engineers." },
    { to: "/hire/hire-nodejs-developers", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150&q=80", title: "Hire Node.js Developers", desc: "Scalable backend API engineers." },
    { to: "/hire/hire-python-developers", img: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=150&q=80", title: "Hire Python Developers", desc: "Python, Django, and Data experts." },
    { to: "/hire/hire-java-developers", img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&q=80", title: "Hire Java Developers", desc: "Enterprise software Java developers." },
    { to: "/hire/hire-php-developers", img: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=150&q=80", title: "Hire PHP Developers", desc: "PHP and Laravel framework specialists." },
    { to: "/hire/hire-golang-developers", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150&q=80", title: "Hire Golang Developers", desc: "High-performance Go developers." },
    { to: "/hire/hire-ai-developers", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=150&q=80", title: "Hire AI Developers", desc: "LLM, ML, and Data Science experts." },
    { to: "/hire/hire-blockchain-developers", img: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?w=150&q=80", title: "Hire Blockchain Devs", desc: "Smart contract and Web3 engineers." },
    { to: "/hire/hire-ui-ux-designers", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&q=80", title: "Hire UI/UX Designers", desc: "Creative designers for stunning visuals." },
  ];

  const industryLinks = [
    { to: "/industry/real-estate", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=150&q=80", title: "Real Estate", desc: "PropTech, smart contracts, virtual tours." },
    { to: "/industry/healthcare", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=150&q=80", title: "Healthcare", desc: "Telemedicine and health data systems." },
    { to: "/industry/fintech", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150&q=80", title: "Fintech", desc: "Secure banking and finance apps." },
    { to: "/industry/retail-ecommerce", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=150&q=80", title: "Retail & eCommerce", desc: "Shopping platforms and POS systems." },
    { to: "https://vedanco-global-campus-git-main-tanvipatel373-8191s-projects.vercel.app/", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=150&q=80", title: "Education", desc: "EdTech and e-learning portals." },
    { to: "/industry/logistics", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150&q=80", title: "Logistics", desc: "Supply chain tracking and management." }
  ];

  const resourceLinks = [
    { to: "/resource/blog", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=150&q=80", title: "Blog", desc: "Latest tech news, guides, and updates." },
    { to: "/resource/case-studies", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&q=80", title: "Case Studies", desc: "In-depth analysis of our successful projects." },
    { to: "/resource/press-release", img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=150&q=80", title: "Press Release", desc: "Company announcements and media coverage." },
    { to: "/resource/events", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=150&q=80", title: "Events", desc: "Upcoming webinars and tech conferences." },
    { to: "/resource/brochures", img: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=150&q=80", title: "Brochures", desc: "Download our company profiles and services." },
    { to: "/resource/whitepapers", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&q=80", title: "Whitepapers", desc: "Deep dive into tech trends and research." }
  ];


  // Active link check
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Main Navbar with Glassmorphism & Scroll Progress */}
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed w-full z-50 top-0 transition-all duration-500 ${
          scrolled 
            ? 'navbar-glass' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-brand-sand to-primary z-50"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[80px] relative">
          
          {/* Logo — Vedanco (Classical Serif Corporate Identity) */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group select-none">
            {/* Perfectly proportioned, distortion-free classic serif V badge */}
            <div className="w-11 h-11 rounded-full bg-[#123C24] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow relative overflow-hidden select-none">
              <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                <text x="50" y="75" textAnchor="middle" fontSize="72" fontWeight="bold" fontFamily="Georgia, 'Times New Roman', Times, serif" fill="#fcfaf2">V</text>
              </svg>
            </div>
            {/* Serif Wordmark */}
            <span className="text-[28px] font-bold text-[#123C24] font-serif tracking-tight leading-none">Vedanco</span>
          </Link>
                   {/* Desktop Menu */}
          <div className="hidden lg:flex items-center h-full">
            
            {/* AI Mega Menu */}
            <div className="group h-full flex items-center px-4 cursor-pointer">
              <Link to="/ai-integration-services" className="text-secondary font-semibold text-[15px] flex items-center group-hover:text-primary transition-colors">
                AI <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
              </Link>
              <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-[1100px] max-w-[95vw] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-2xl border-t-4 border-primary transition-all duration-300 flex overflow-hidden ${forceClose ? 'hidden opacity-0 invisible pointer-events-none' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="p-8 w-full max-h-[75vh] overflow-y-auto styled-scrollbar bg-slate-50/30">
                  <h3 className="text-xl font-black text-secondary mb-6 flex items-center"><div className="w-2 h-6 bg-primary mr-3 rounded-full"></div> Artificial Intelligence Services</h3>
                  <div className="grid grid-cols-3 gap-5">
                    {aiLinks.map((link, i) => (
                      <RichMenuItem key={i} to={link.to} img={link.img} title={link.title} desc={link.desc} onClick={handleMenuClick} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Services Mega Menu */}
            <div className="group h-full flex items-center px-4 cursor-pointer">
              <span className="text-secondary font-semibold text-[15px] flex items-center group-hover:text-primary transition-colors">
                Services <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
              </span>
              <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-[1100px] max-w-[95vw] bg-white shadow-2xl rounded-b-xl border-t-2 border-primary transition-all duration-300 flex overflow-hidden ${forceClose ? 'hidden opacity-0 invisible pointer-events-none' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="p-8 w-full max-h-[75vh] overflow-y-auto styled-scrollbar">
                  <h3 className="text-lg font-bold text-secondary mb-6 border-b pb-2">World-Class IT Services</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {servicesLinks.map((link, i) => (
                      <RichMenuItem key={i} to={link.to} img={link.img} title={link.title} desc={link.desc} onClick={handleMenuClick} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hire Resources Mega Menu */}
            <div className="group h-full flex items-center px-4 cursor-pointer">
              <span className="text-secondary font-semibold text-[15px] flex items-center group-hover:text-primary transition-colors">
                Hire Resources <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
              </span>
              <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-[1000px] max-w-[95vw] bg-white shadow-2xl rounded-b-xl border-t-2 border-primary transition-all duration-300 flex overflow-hidden ${forceClose ? 'hidden opacity-0 invisible pointer-events-none' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="p-8 w-full max-h-[75vh] overflow-y-auto styled-scrollbar">
                  <div className="mb-6 border-b pb-4 flex justify-between items-center">
                    <Link to="/hire-dedicated-developers" onClick={handleMenuClick} className="group/head flex items-center gap-2">
                      <div className="w-2 h-6 bg-primary rounded-full"></div>
                      <span className="text-xl font-black text-secondary group-hover/head:text-primary transition-colors">Hire Dedicated Tech Experts</span>
                    </Link>
                    <Link to="/hire-dedicated-developers" onClick={handleMenuClick} className="text-xs font-bold text-white bg-primary hover:bg-secondary transition-colors px-4 py-2 rounded-full flex items-center gap-1 shadow-sm">
                      Top 1% Talent &amp; Teams <ArrowRight size={12} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                     {hireLinks.map((link, i) => (
                      <RichMenuItem key={i} to={link.to} img={link.img} title={link.title} desc={link.desc} onClick={handleMenuClick} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Industries Mega Menu */}
            <div className="group h-full flex items-center px-4 cursor-pointer">
              <span className="text-secondary font-semibold text-[15px] flex items-center group-hover:text-primary transition-colors">
                Industries <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
              </span>
              <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-[950px] max-w-[95vw] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-2xl border-t-4 border-primary transition-all duration-300 flex overflow-hidden ${forceClose ? 'hidden opacity-0 invisible pointer-events-none' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="p-8 w-full max-h-[75vh] overflow-y-auto bg-slate-50/30">
                  <h3 className="text-xl font-black text-secondary mb-6 flex items-center"><div className="w-2 h-6 bg-primary mr-3 rounded-full"></div> Solutions Across Industries</h3>
                  <div className="grid grid-cols-2 gap-5">
                    {industryLinks.map((link, i) => (
                      <RichMenuItem key={i} to={link.to} img={link.img} title={link.title} desc={link.desc} onClick={handleMenuClick} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Mega Menu */}
            <div className="group h-full flex items-center px-4 cursor-pointer">
              <span className="text-secondary font-semibold text-[15px] flex items-center group-hover:text-primary transition-colors">
                Resources <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
              </span>
              <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-[950px] max-w-[95vw] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-2xl border-t-4 border-primary transition-all duration-300 flex flex-col overflow-hidden ${forceClose ? 'hidden opacity-0 invisible pointer-events-none' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                 <div className="p-8 w-full max-h-[75vh] overflow-y-auto bg-slate-50/30">
                   <h3 className="text-xl font-black text-secondary mb-6 flex items-center"><div className="w-2 h-6 bg-primary mr-3 rounded-full"></div> Insights &amp; Resources</h3>
                   <div className="grid grid-cols-2 gap-5">
                      {resourceLinks.map((link, i) => (
                        <RichMenuItem key={i} to={link.to} img={link.img} title={link.title} desc={link.desc} onClick={handleMenuClick} />
                      ))}
                   </div>
                 </div>
              </div>
            </div>

            {/* About Us Mega Menu — last before CTA */}
            <div className="group h-full flex items-center px-4 cursor-pointer">
              <span className="text-secondary font-semibold text-[15px] flex items-center group-hover:text-primary transition-colors">
                About Us <ChevronDown size={16} className="ml-1 transition-transform group-hover:rotate-180" />
              </span>
              <div className={`absolute top-[80px] left-1/2 -translate-x-1/2 w-[950px] max-w-[95vw] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-2xl border-t-4 border-primary transition-all duration-300 flex overflow-hidden ${forceClose ? 'hidden opacity-0 invisible pointer-events-none' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                <div className="w-1/3 bg-slate-50 p-8 border-r border-slate-100 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-black text-secondary mb-4 leading-tight">Empowering Global Enterprises</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">Discover our journey, our team of experts, and the impact we've made worldwide over the last decade.</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" alt="Team" className="rounded-xl shadow-md w-full h-40 object-cover" />
                </div>
                <div className="w-2/3 p-8 grid grid-cols-2 gap-4 bg-white">
                  {aboutLinks.map((link, i) => (
                    <RichMenuItem key={i} to={link.to} img={link.img} title={link.title} desc={link.desc} onClick={handleMenuClick} />
                  ))}
                </div>
              </div>
            </div>


            <Link to="/contact"
              className={`font-semibold text-[15px] hover:text-primary transition-colors px-4 relative ${
                isActive('/contact') ? 'text-primary' : 'text-secondary'
              }`}>
              Contact Us
              {isActive('/contact') && (
                <motion.div layoutId="activeNav" className="absolute -bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full" />
              )}
            </Link>

            <button onClick={() => setIsQuoteOpen(true)}
              className="ml-2 relative group bg-primary text-white px-6 py-2.5 rounded-full font-bold text-[15px] transition-all duration-300 shadow-md hover:shadow-[0_8px_30px_rgba(35,75,47,0.4)] hover:-translate-y-0.5 overflow-hidden">
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles size={14} className="opacity-70" />
                Get A Free Quote
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-secondary p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Premium Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="px-4 py-3 space-y-1">

              {/* AI Services */}
              <MobileAccordion title="AI Services">
                {aiLinks.map((link, i) => (
                  <Link key={i} to={link.to} onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    {link.title}
                  </Link>
                ))}
              </MobileAccordion>

              {/* Services */}
              <MobileAccordion title="Services">
                {servicesLinks.map((link, i) => (
                  <Link key={i} to={link.to} onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    {link.title}
                  </Link>
                ))}
              </MobileAccordion>

              {/* Hire Resources */}
              <MobileAccordion title="Hire Resources">
                <Link to="/hire-dedicated-developers" onClick={() => setIsOpen(false)}
                  className="block py-2.5 px-3 text-sm font-bold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-between mb-1">
                  <span>Hire Dedicated Developers</span>
                  <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded font-black uppercase tracking-wider">Top 1%</span>
                </Link>
                {hireLinks.map((link, i) => (
                  <Link key={i} to={link.to} onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    {link.title}
                  </Link>
                ))}
              </MobileAccordion>

              {/* Industries */}
              <MobileAccordion title="Industries">
                {industryLinks.map((link, i) => (
                  link.to.startsWith('http') ? (
                    <button key={i} onClick={() => { window.open(link.to, '_blank'); setIsOpen(false); }}
                      className="block py-2 px-3 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors text-left w-full">
                      {link.title}
                    </button>
                  ) : (
                    <Link key={i} to={link.to} onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                      {link.title}
                    </Link>
                  )
                ))}
              </MobileAccordion>

              {/* Resources */}
              <MobileAccordion title="Resources">
                {resourceLinks.map((link, i) => (
                  <Link key={i} to={link.to} onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    {link.title}
                  </Link>
                ))}
              </MobileAccordion>

              {/* About Us */}
              <MobileAccordion title="About Us">
                {aboutLinks.map((link, i) => (
                  <Link key={i} to={link.to} onClick={() => setIsOpen(false)}
                    className="block py-2 px-3 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                    {link.title}
                  </Link>
                ))}
              </MobileAccordion>

              {/* Direct Links */}
              <Link to="/contact" onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 py-3 px-3 text-base font-semibold text-secondary hover:text-primary border-t border-slate-100 mt-2">
                Contact Us
              </Link>

              <button onClick={() => { setIsQuoteOpen(true); setIsOpen(false); }}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-base hover:bg-secondary transition-colors shadow-md mt-2">
                Get A Free Quote
              </button>
            </div>
          </div>
        )}
      </motion.nav>
      
      {/* Contact Modal Popup */}
      <ContactModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} title="Request A Free Quote!" />
    </>
  );
};

export default Navbar;
