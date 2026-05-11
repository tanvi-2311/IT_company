import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, MessageSquare, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactModal = ({ isOpen, onClose, title = "Feel Free to Contact Us!" }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulate API
    setLoading(false);
    toast.success('Message sent! We will contact you within 24 hours.');
    setForm({ name: '', email: '', phone: '', message: '', service: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[560px] p-8 z-10"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors">
              <X size={18} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={26} className="text-primary" />
              </div>
              <h2 className="text-2xl font-extrabold text-secondary mb-2">{title}</h2>
              <p className="text-slate-500 text-sm">
                We would be happy to hear from you. Mail us your requirements at{' '}
                <a href="mailto:info@vedanco.com" className="text-primary font-semibold hover:underline">info@vedanco.com</a>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Full Name *"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm text-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
                {/* Email */}
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="E-mail *"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm text-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel" name="phone" value={form.phone} onChange={handleChange}
                  placeholder="Contact No. (optional)"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm text-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              {/* Message */}
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3.5 top-4 text-slate-400" />
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Your Message *" rows={3}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm text-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                />
              </div>

              {/* Select Service */}
              <div className="relative">
                <Briefcase size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  name="service" value={form.service} onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-200 text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all appearance-none bg-white"
                >
                  <option value="">Select Service</option>
                  <option>Mobile App Development</option>
                  <option>Web & CMS Development</option>
                  <option>AI & ML Development</option>
                  <option>Blockchain Development</option>
                  <option>eCommerce Development</option>
                  <option>Game Development</option>
                  <option>Hire Dedicated Developer</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="flex-1 py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors">
                  Close
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-secondary transition-colors shadow-lg disabled:opacity-70 flex items-center justify-center gap-2">
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : 'Send Message'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
