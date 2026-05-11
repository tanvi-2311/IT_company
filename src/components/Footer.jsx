import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-slate-300 pt-20 pb-8 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-white/10 pb-16">
          
          <div className="lg:col-span-1">
            {/* Logo — Vedanco (Classical Serif Corporate Identity) */}
            <Link to="/" className="flex items-center gap-3 mb-6 group select-none">
              {/* Perfectly proportioned, distortion-free classic serif V badge */}
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm relative overflow-hidden select-none">
                <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                  <text x="50" y="75" textAnchor="middle" fontSize="72" fontWeight="bold" fontFamily="Georgia, 'Times New Roman', Times, serif" fill="#123C24">V</text>
                </svg>
              </div>
              {/* Serif Wordmark */}
              <span className="text-[28px] font-bold text-white font-serif tracking-tight leading-none">Vedanco</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Vedanco is a renowned mobile app development company & the best IT Software Solutions provider based in Gujarat, India, dedicated to driving digital transformation.
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
                <span>Gandhinagar, Infocity, Gandhinagar Ahmedabad, Gujarat, India - 382007</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-primary shrink-0" size={20}/>
                <span>+91 9510774987</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-primary shrink-0" size={20}/>
                <span>info@vedanco.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Vedanco. All rights reserved.</p>
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
