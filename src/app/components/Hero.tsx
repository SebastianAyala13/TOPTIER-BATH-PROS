import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import Link from 'next/link';

export default function Hero() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Transform your bathroom with',
      highlight: 'premium remodeling experts',
      subtitle: 'Design, materials, and installation — on time and stress-free.',
      cta: 'Start Your Quote',
    },
    es: {
      title: 'Transforma tu baño con',
      highlight: 'expertos en remodelación',
      subtitle: 'Diseño, materiales e instalación — a tiempo y sin estrés.',
      cta: 'Comenzar Cotización',
    },
  };

  const t = content[language];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex items-center justify-center px-6"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0 pointer-events-none"
        src="/bathroom-hero.mp4"
      />
      <div className="absolute inset-0 bg-slate-900/50 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          {t.title}{' '}
          <span className="text-teal-400">{t.highlight}</span>
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-300">{t.subtitle}</p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="#form-section"
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl transition inline-block"
          >
            {t.cta}
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
