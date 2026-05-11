import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData, portfolioCategories } from '../data/portfolioData';

const ProjectCard = ({ project }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] border border-slate-100 group transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative"
    >
      <div className="relative overflow-hidden h-60 bg-slate-100">
        {/* Shimmering Skeleton Loader until image fully loads in memory */}
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 animate-pulse" />
        )}
        
        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
        <img 
          src={project.image} 
          alt={project.title} 
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
            loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'
          }`}
        />
        <div className="absolute top-4 left-4 z-20 flex gap-2 flex-wrap">
          <span className="bg-white/90 backdrop-blur-sm text-secondary text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow">
        <p className="text-sm text-primary font-bold mb-2 tracking-wide uppercase">{project.client}</p>
        <h3 className="text-2xl font-black text-secondary mb-3 group-hover:text-primary transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>
        
        <div className="border-t border-slate-100 pt-6 mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span key={index} className="bg-slate-50 text-slate-600 text-xs font-semibold px-3 py-1 rounded-md border border-slate-100">
                {tag}
              </span>
            ))}
          </div>
          <button className="text-secondary font-bold flex items-center hover:text-primary transition-colors group/btn">
            View Case Study <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(portfolioData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(portfolioData);
    } else {
      setFilteredProjects(portfolioData.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="font-sans bg-white">
      
      {/* Hero Section */}
      <section className="bg-primary text-brand-cream py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-sage rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary rounded-full blur-[150px] translate-y-1/2 -translate-x-1/3 opacity-40"></div>
        </div>
        
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-white/80 mb-6 font-semibold tracking-wide uppercase">
             <Link to="/" className="hover:text-white transition-colors">Home</Link>
             <ChevronRight size={14} />
             <span className="text-white">Portfolio</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight"
          >
            Our Masterpieces
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed max-w-3xl mx-auto"
          >
            Explore our massive catalog of successful, high-performance web and mobile applications engineered for Fortune 500 companies and disruptive startups globally.
          </motion.p>
        </div>
      </section>

      {/* Portfolio Filter and Grid Section */}
      <section className="py-24 px-4 bg-lightbg relative min-h-screen">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-bold text-[15px] transition-all duration-300 shadow-sm ${
                  activeCategory === category 
                  ? 'bg-primary text-white shadow-primary/30 scale-105' 
                  : 'bg-white text-slate-600 hover:text-primary hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-slate-500 text-lg">
              No projects found in this category.
            </div>
          )}

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-24 px-4 text-center text-white border-t-8 border-secondary relative overflow-hidden">
         <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Ready to build your next big app?</h2>
            <p className="text-xl opacity-90 mb-10 font-light">Join the ranks of our successful clients and let us transform your visionary idea into a powerful digital reality.</p>
            <Link to="/contact" className="bg-white text-secondary px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl hover:scale-105 inline-block">
              Start Your Project Today
            </Link>
         </div>
      </section>

    </div>
  );
};

export default Portfolio;
