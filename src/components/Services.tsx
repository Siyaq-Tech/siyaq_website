import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';

const Services: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="services" dir={isRTL ? 'rtl' : 'ltr'} className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.span variants={fadeInUp} className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            {t.services.badge}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-medium text-black mb-4">
            {t.services.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-500 text-base max-w-2xl">{t.services.subtitle}</motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.services.items.map((service, index) => (
            <motion.div
              variants={fadeInUp}
              key={index}
              className="relative group p-[1px] overflow-hidden"
            >
              {/* Default Border (static) */}
              <div className="absolute inset-0 border border-gray-200 group-hover:opacity-0 transition-opacity duration-300" />
              
              {/* Animated Spinning Border Layer */}
              <div className="absolute inset-[-150%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
                 <div 
                   className="w-full h-full animate-[spin_4s_linear_infinite]" 
                   style={{ background: 'conic-gradient(from 90deg at 50% 50%, #ffffff 0%, #000000 50%, #ffffff 100%)' }} 
                 />
              </div>

              {/* Card Content (covers the center) */}
              <div className="relative z-10 h-full p-8 bg-white">
                <div className="w-10 h-10 mb-6 bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors duration-500">
                  <span className="text-sm font-medium">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-xl font-medium text-black mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
