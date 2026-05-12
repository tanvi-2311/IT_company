import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ArrowRight, Send, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const socialLinks = [
    { icon: <Facebook size={18}/>, href: "https://www.facebook.com/vedanco", label: "Facebook" },
    { icon: <Linkedin size={18}/>, href: "https://www.linkedin.com/company/vedanco", label: "LinkedIn" },
    { icon: <Instagram size={18}/>, href: "https://www.instagram.com/vedanco", label: "Instagram" },
  ];

  const footerLinks = {
    Company: [
      { label: "Who We Are", to: "/about/who-we-are" },
      { label: "Services We Offer", to: "/services" },
      { label: "Industries We Serve", to: "/industries" },
      { label: "Portfolio", to: "/about/portfolio" },
      { label: "Careers", to: "/about/careers" },
    ],
    Services: [
      { label: "Mobile App Development", to: "/services/mobile-app-development" },
      { label: "Web & CMS Development", to: "/services/web-cms-development" },
      { label: "eCommerce Development", to: "/services/ecommerce-development" },
      { label: "AI & ML Development", to: "/ai/generative-ai" },
      { label: "Blockchain Development", to: "/services/blockchain-development" },
      { label: "Game Development", to: "/services/game-development" },
      { label: "Salesforce Solutions", to: "/services/salesforce-solutions" },
    ],
  };

  return (
    <footer className="bg-secondary text-slate-300 pt-24 pb-8 font-sans relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-sand/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top: Newsletter banner */}
        <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/30 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles size={22} className="text-brand-sand" />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg leading-tight">Stay Ahead of the Curve</h4>
              <p className="text-slate-400 text-sm">Get the latest in tech, AI, and product insights — weekly.</p>
            </div>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
              <span className="w-5 h-5 rounded-full bg-green-400/20 flex items-center justify-center">✓</span>
              Subscribed! Thanks for joining.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="newsletter-input md:w-64"
                required
              />
              <button type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_25px_rgba(35,75,47,0.4)] hover:-translate-y-0.5 flex items-center gap-1.5 whitespace-nowrap">
                <Send size={14}/> Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 mb-5 group select-none">
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm relative overflow-hidden select-none group-hover:shadow-md transition-shadow">
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                  <text x="50" y="75" textAnchor="middle" fontSize="72" fontWeight="bold" fontFamily="Georgia, 'Times New Roman', Times, serif" fill="#123C24">V</text>
                </svg>
              </div>
              <span className="text-[28px] font-bold text-white font-serif tracking-tight leading-none">Vedanco</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Vedanco is a renowned mobile app development company &amp; the best IT Software Solutions provider based in Gujarat, India, dedicated to driving digital transformation worldwide.
            </p>

            {/* Social icons with hover animations */}
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((s, i) => (
                <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-colors duration-300">
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white text-base font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full inline-block"/>
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.Company.map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 transition-opacity text-primary flex-shrink-0"/>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="text-white text-base font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full inline-block"/>
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.Services.map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-white hover:pl-1 transition-all duration-200 flex items-center gap-1 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 transition-opacity text-primary flex-shrink-0"/>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-base font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-5 bg-primary rounded-full inline-block"/>
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/40 transition-colors mt-0.5">
                  <MapPin size={15} className="text-primary"/>
                </div>
                <span className="text-sm text-slate-400 leading-relaxed">Gandhinagar, Infocity, Ahmedabad, Gujarat, India - 382007</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/40 transition-colors">
                  <Phone size={15} className="text-primary"/>
                </div>
                <a href="tel:+919510774987" className="text-sm text-slate-400 hover:text-white transition-colors">+91 9510774987</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/40 transition-colors">
                  <Mail size={15} className="text-primary"/>
                </div>
                <a href="mailto:info@vedanco.com" className="text-sm text-slate-400 hover:text-white transition-colors">info@vedanco.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Vedanco Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
