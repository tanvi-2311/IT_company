import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Map, ChevronRight, Globe, Code, Cpu, User } from 'lucide-react';

const Sitemap = () => {
  const sections = [
    {
      title: "Main Pages",
      icon: <Globe size={20} />,
      links: [
        { label: "Home", to: "/" },
        { label: "Portfolio", to: "/portfolio" },
        { label: "Contact Us", to: "/contact" },
      ]
    },
    {
      title: "Talent & Hiring",
      icon: <User size={20} />,
      links: [
        { label: "Hire Dedicated Developers", to: "/hire-dedicated-developers" },
      ]
    },
    {
      title: "AI & Innovation",
      icon: <Cpu size={20} />,
      links: [
        { label: "AI Integration Services", to: "/ai-integration-services" },
        { label: "Generative AI", to: "/ai/generative-ai" },
        { label: "Adaptive AI", to: "/ai/adaptive-ai" },
      ]
    },
    {
      title: "Development Services",
      icon: <Code size={20} />,
      links: [
        { label: "Mobile App Development", to: "/services/mobile-app-development" },
        { label: "Web & CMS Development", to: "/services/web-cms-development" },
        { label: "eCommerce Development", to: "/services/ecommerce-development" },
        { label: "Blockchain Development", to: "/services/blockchain-development" },
      ]
    },
    {
      title: "Legal",
      icon: <Layers size={20} />,
      links: [
        { label: "Privacy Policy", to: "/privacy-policy" },
        { label: "Terms & Conditions", to: "/terms" },
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Map size={28} />
            </div>
            <h1 className="text-4xl font-black text-secondary">Sitemap</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="text-primary">{section.icon}</div>
                  <h2 className="text-xl font-black text-secondary uppercase tracking-wider">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        to={link.to} 
                        className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold group transition-colors"
                      >
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sitemap;
