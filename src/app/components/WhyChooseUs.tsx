'use client';

import { CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function WhyChooseUs() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Why Homeowners Trust TOPTIER BATH PROS',
      features: [
        {
          icon: <ShieldCheck className="w-8 h-8 text-teal-400" />,
          title: 'Certified & Insured',
          description: 'Bathroom remodeling specialists with 10+ years of experience.',
        },
        {
          icon: <Zap className="w-8 h-8 text-teal-400" />,
          title: 'Fast Turnaround',
          description: 'Quick design, material sourcing and installation without delays.',
        },
        {
          icon: <CheckCircle className="w-8 h-8 text-teal-400" />,
          title: 'Premium Warranty',
          description: 'Warranties available on materials and workmanship.',
        },
      ],
    },
    es: {
      title: 'Por qué confían en TOPTIER BATH PROS',
      features: [
        {
          icon: <ShieldCheck className="w-8 h-8 text-teal-400" />,
          title: 'Certificados y Asegurados',
          description: 'Especialistas en remodelación de baños con más de 10 años de experiencia.',
        },
        {
          icon: <Zap className="w-8 h-8 text-teal-400" />,
          title: 'Ejecución Rápida',
          description: 'Diseño, selección de materiales e instalación sin demoras.',
        },
        {
          icon: <CheckCircle className="w-8 h-8 text-teal-400" />,
          title: 'Garantía Premium',
          description: 'Garantías disponibles en materiales y mano de obra.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section
      id="benefits"
      className="relative py-20 px-6 text-center text-white overflow-hidden"
    >
      {/* Overlay para mejorar contraste del texto */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5 }}
          className="text-3xl sm:text-4xl font-bold mb-12"
        >
          {t.title}
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-10 text-left">
          {t.features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ amount: 0.5 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
