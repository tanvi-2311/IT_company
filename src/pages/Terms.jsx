import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, CheckCircle2, AlertCircle } from 'lucide-react';

const Terms = () => {
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
              <Scale size={28} />
            </div>
            <h1 className="text-4xl font-black text-secondary">Terms & Conditions</h1>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
            <section className="space-y-4">
              <p className="text-lg leading-relaxed">
                Welcome to Vedanco. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
              </p>
              <p className="text-sm italic text-slate-400">Last updated: May 16, 2026</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
                <CheckCircle2 size={20} className="text-primary" />
                1. Use of Services
              </h2>
              <p>
                Our services are provided for professional business use. You agree not to misuse our services or help anyone else do so. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
                <FileText size={20} className="text-primary" />
                2. Intellectual Property
              </h2>
              <p>
                The content, design, logos, and software on this website are the property of Vedanco Technologies Pvt. Ltd. and are protected by international copyright laws. Reproduction is prohibited other than in accordance with the copyright notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
                <AlertCircle size={20} className="text-primary" />
                3. Limitation of Liability
              </h2>
              <p>
                Vedanco will not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of our services. We strive for accuracy but do not guarantee that the website is free of errors.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-secondary flex items-center gap-2">
                <CheckCircle2 size={20} className="text-primary" />
                4. Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the courts in Ahmedabad, Gujarat.
              </p>
            </section>

            <section className="space-y-4 border-t border-slate-100 pt-8">
              <h2 className="text-2xl font-black text-secondary">Inquiries</h2>
              <p>
                For any questions regarding these terms, please reach out to us at <strong>info@vedanco.com</strong>.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
