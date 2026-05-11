import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-slate-300 pt-20 pb-8 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              {/* Circular V Badge */}
              <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
                <svg viewBox="0 0 40 40" width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 10 L20 32 L33 10" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              {/* Text */}
              <div className="flex flex-col leading-none">
                <span className="text-[26px] font-black text-white tracking-tight leading-none">Vedanco</span>
                <span className="text-[0.6rem] font-semibold text-primary tracking-widest mt-0.5 uppercase">Rooted Here. Rising Worldwide.</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Hyperlink InfoSystem is a renowned mobile app development company & the best IT Software Solutions provider based in New York, USA & India, established in 2011.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Facebook size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Twitter size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Linkedin size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Instagram size={18}/></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Youtube size={18}/></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white text-lg font-bold mb-6 border-l-4 border-primary pl-3">About</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/about" className="hover:text-primary transition-colors">Who We Are</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services We Offer</Link></li>
              <li><Link to="/industries" className="hover:text-primary transition-colors">Industries We Serve</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/career" className="hover:text-primary transition-colors">Career</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-6 border-l-4 border-primary pl-3">Services</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/services" className="hover:text-primary transition-colors">Mobile App Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Web & CMS Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">eCommerce Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">AI & ML Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Blockchain Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Game Development</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Salesforce Solutions</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">IoT & Embedded</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-bold mb-6 border-l-4 border-primary pl-3">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-start">
                <MapPin className="mr-3 text-primary shrink-0" size={20}/>
                <span>One World Trade Center, 285 Fulton Street suite 8500, New York, NY 10007, USA</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-primary shrink-0" size={20}/>
                <span>+1 (309) 791-4105</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-primary shrink-0" size={20}/>
                <span>+91 8000-161-161</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-primary shrink-0" size={20}/>
                <span>info@hyperlinkinfosystem.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Hyperlink InfoSystem. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms & Conditions</Link>
            <Link to="/sitemap" className="hover:text-primary">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
