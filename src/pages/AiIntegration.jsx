import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Users, Lightbulb, Database, Network, MessageSquare, Bot, Building2, Server, Eye, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const AiIntegration = () => {
  const aiServices = [
    { title: "AI Agent Development", description: "Build autonomous AI agents capable of understanding goals, making decisions, and executing complex workflows without human intervention.", icon: <Bot size={40} className="text-primary mb-4" /> },
    { title: "AI Integration", description: "Seamlessly integrate advanced Artificial Intelligence capabilities into your existing software infrastructure to automate processes and boost efficiency.", icon: <BrainCircuit size={40} className="text-primary mb-4" /> },
    { title: "AI Staffing", description: "Hire top-tier AI experts, prompt engineers, and machine learning specialists on demand to scale your internal development teams.", icon: <Users size={40} className="text-primary mb-4" /> },
    { title: "AI Consulting", description: "Strategic consulting to identify AI opportunities, define roadmaps, and transform your business processes using intelligent technologies.", icon: <Lightbulb size={40} className="text-primary mb-4" /> },
    { title: "LLM Integration", description: "Integrate powerful Large Language Models (like GPT-4, Llama, Claude) into your applications to enhance text processing and generation.", icon: <Network size={40} className="text-primary mb-4" /> },
    { title: "LLM Development", description: "Develop, fine-tune, and train custom Large Language Models tailored to your specific industry data and unique business requirements.", icon: <Cpu size={40} className="text-primary mb-4" /> },
    { title: "Generative AI", description: "Harness the power of Generative AI to create automated content, realistic images, synthetic data, and personalized user experiences.", icon: <MessageSquare size={40} className="text-primary mb-4" /> },
    { title: "Agentic AI Development", description: "Create goal-driven AI systems that exhibit high degrees of autonomy, problem-solving skills, and dynamic decision-making capabilities.", icon: <Layers size={40} className="text-primary mb-4" /> },
    { title: "Enterprise AI Integration", description: "Deploy scalable, highly secure AI solutions tailored for enterprise-grade systems, ensuring compliance and robust performance.", icon: <Building2 size={40} className="text-primary mb-4" /> },
    { title: "AI Data Engineering", description: "Build strong data foundations. We handle data extraction, cleaning, pipelines, and vector databases necessary for robust AI training.", icon: <Database size={40} className="text-primary mb-4" /> },
    { title: "Multimodal AI Development", description: "Develop AI systems capable of processing and understanding multiple data types simultaneously, including text, audio, images, and video.", icon: <Eye size={40} className="text-primary mb-4" /> },
    { title: "MLOps & Model Deployment", description: "Securely deploy machine learning models into production and manage their complete lifecycle, monitoring, and continuous integration.", icon: <Server size={40} className="text-primary mb-4" /> }
  ];

  return (
    <div className="font-sans">
      {/* Page Header */}
      <section className="bg-secondary text-white pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
          >
            AI Integration Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-light"
          >
            Leverage advanced AI integration services to streamline operations, boost efficiency, and accelerate innovation with our experienced AI integration experts.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-lightbg px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4">Our AI Integration Solutions</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We offer a comprehensive suite of AI & Machine Learning services to help you stay ahead of the curve.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiServices.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 px-4 text-center text-white">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to integrate AI into your business?</h2>
            <p className="text-lg opacity-90 mb-8">Discuss your requirements with our AI experts today.</p>
            <Link to="/contact" className="bg-white text-secondary px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg inline-block">
              Get A Free Quote
            </Link>
         </div>
      </section>
    </div>
  );
};

export default AiIntegration;
