'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaDollarSign, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function Promotions() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: '🔥 Bathroom Promotions',
      cards: [
        {
          icon: <FaDollarSign className="text-4xl text-green-600 mb-4" />,
          title: 'No Initial Cost',
          description: 'Start your bathroom project without paying upfront.',
        },
        {
          icon: <FaHandshake className="text-4xl text-blue-600 mb-4" />,
          title: 'Financing Option',
          description: 'Flexible plans adjusted to your budget.',
        },
        {
          icon: <FaShieldAlt className="text-4xl text-purple-600 mb-4" />,
          title: 'Extended Warranty',
          description: 'Coverage on materials and workmanship.',
        },
      ],
    },
    es: {
      title: '🔥 Promociones para Baños',
      cards: [
        {
          icon: <FaDollarSign className="text-4xl text-green-600 mb-4" />,
          title: 'Sin Costo Inicial',
          description: 'Inicia tu remodelación de baño sin pago por adelantado.',
        },
        {
          icon: <FaHandshake className="text-4xl text-blue-600 mb-4" />,
          title: 'Opción de Financiamiento',
          description: 'Planes flexibles ajustados a tu presupuesto.',
        },
        {
          icon: <FaShieldAlt className="text-4xl text-purple-600 mb-4" />,
          title: 'Garantía Extendida',
          description: 'Cobertura en materiales y mano de obra.',
        },
      ],
    },
  };

  const t = content[language];

  return (
    <section className="relative bg-teal-50 py-20 px-4 sm:px-8 text-center overflow-hidden" id="promotions">
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/bg-promo.jpg"
          alt="Promotions background bathrooms"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-teal-600 mb-10"
        >
          {t.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-800"
        >
          {t.cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl"
            >
              {card.icon}
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-slate-600">{card.description}</p>
              <a href="#lead-form" className="mt-4 inline-block text-teal-700 hover:text-teal-800 font-semibold text-sm">Get my quote</a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
