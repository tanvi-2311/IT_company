import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 md:p-12"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield size={28} />
            </div>
            <h1 className="text-4xl font-black text-secondary">Privacy Policy</h1>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
            <section className="space-y-4">
              <p className="text-lg leading-relaxed">
                At Vedanco, we prioritize your privacy and the security of your data. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website or use our services.
              </p>
              <p className="text-sm italic text-slate-400">Last updated: May 16, 2026</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
                <Eye size={20} className="text-primary" />
                1. Information We Collect
              </h2>
              <p>
                We may collect personal information such as your name, email address, and phone number when you contact us or subscribe to our newsletter. We also collect non-personal data like browser type and IP addresses for analytical purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
                <Lock size={20} className="text-primary" />
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and improve our IT and software development services.</li>
                <li>To communicate with you regarding projects or inquiries.</li>
                <li>To send newsletters and promotional materials (if subscribed).</li>
                <li>To enhance website performance and user experience.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                3. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="space-y-4 border-t border-slate-100 pt-8">
              <h2 className="text-2xl font-black text-secondary">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <strong>Email:</strong> info@vedanco.com
                <br />
                <strong>Address:</strong> Gandhinagar, Infocity, Ahmedabad, Gujarat, India - 382007
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
