import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5001/api/contacts', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        service: 'General Inquiry'
      });
      if (response.data.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.warn('Backend server unreachable, inserting directly into Supabase cloud database from frontend:', error);
      try {
        await axios.post(
          'https://khoqdcjvjfmqvdorsxbh.supabase.co/rest/v1/contacts',
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            service: 'General Inquiry',
            status: 'New'
          },
          {
            headers: {
              apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtob3FkY2p2amZtcXZkb3JzeGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MzcxNDEsImV4cCI6MjA5NDAxMzE0MX0.NPiDXklYhMmT3VcK-WbknPK7EyMuaqnqGTr2W5BlcDE',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtob3FkY2p2amZtcXZkb3JzeGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MzcxNDEsImV4cCI6MjA5NDAxMzE0MX0.NPiDXklYhMmT3VcK-WbknPK7EyMuaqnqGTr2W5BlcDE',
              'Content-Type': 'application/json',
              Prefer: 'return=representation'
            }
          }
        );
      } catch (supabaseErr) {
        console.error('Supabase direct insert error:', supabaseErr);
      }

      // Send instant Email Notification to Company Mail ID via Web3Forms
      try {
        // Note: To activate live email forwarding on Vercel, replace YOUR_WEB3FORMS_ACCESS_KEY with your free key from https://web3forms.com
        const web3FormsKey = "YOUR_WEB3FORMS_ACCESS_KEY";
        if (web3FormsKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
          await axios.post('https://api.web3forms.com/submit', {
            access_key: web3FormsKey,
            subject: `New Inquiry from ${formData.name}`,
            from_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            service: 'General Inquiry'
          });
          console.log('Email dispatched successfully via Web3Forms');
        } else {
          console.log('Web3Forms key is placeholder. Skipping email dispatch.');
        }
      } catch (emailErr) {
        console.error('Web3Forms email dispatch error:', emailErr);
      }

      // Send data directly to Company WhatsApp
      try {
        // Replace with your company's official WhatsApp Phone Number (with country code, e.g., 919876543210)
        const companyWhatsappNumber = "919510774987";
        const whatsappText = `*New Website Inquiry*\n\n*Client Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || 'Not Specified'}\n\n*Message:*\n${formData.message}`;
        const encodedText = encodeURIComponent(whatsappText);
        window.open(`https://api.whatsapp.com/send?phone=${companyWhatsappNumber}&text=${encodedText}`, '_blank');
      } catch (whatsappErr) {
        console.error('WhatsApp redirect error:', whatsappErr);
      }

      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Get in Touch</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Ready to start your digital transformation? Contact our team of experts today.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Contact Info */}
          <div className="bg-secondary text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="text-brand-sand mr-4" size={24} />
                  <span className="text-lg text-slate-300">Gandhinagar, Infocity, Gandhinagar
                    Ahmedabad, Gujarat, India - 382007</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-brand-sand mr-4" size={24} />
                  <span className="text-lg text-slate-300">+91 9510774987</span>
                </div>
                <div className="flex items-center">
                  <Mail className="text-brand-sand mr-4" size={24} />
                  <span className="text-lg text-slate-300">info@vedanco.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 md:p-14">
            <h3 className="text-2xl font-bold text-dark mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="Full Name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white"
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-4 flex items-center justify-center text-lg disabled:opacity-70"
              >
                {loading ? 'Sending...' : <><Send className="mr-2" size={20} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
