'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function ThankYouPage() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Thank You!',
      subtitle: 'Your request has been submitted successfully',
      message: 'We have received your bathroom remodeling request and will contact you within 24 hours to discuss your project.',
      nextSteps: 'What happens next?',
      steps: [
        'We will review your request and contact you within 24 hours',
        'Schedule a free consultation at your home',
        'Provide a detailed quote for your bathroom remodel',
        'Begin your dream bathroom transformation'
      ],
      backHome: 'Back to Home',
      contactUs: 'Contact Us'
    },
    es: {
      title: '¡Gracias!',
      subtitle: 'Tu solicitud ha sido enviada exitosamente',
      message: 'Hemos recibido tu solicitud de remodelación de baño y te contactaremos dentro de 24 horas para discutir tu proyecto.',
      nextSteps: '¿Qué sigue?',
      steps: [
        'Revisaremos tu solicitud y te contactaremos dentro de 24 horas',
        'Programaremos una consulta gratuita en tu hogar',
        'Te proporcionaremos una cotización detallada para tu remodelación',
        'Comenzaremos la transformación de tu baño soñado'
      ],
      backHome: 'Volver al Inicio',
      contactUs: 'Contáctanos'
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {t.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-teal-600 font-semibold mb-6"
          >
            {t.subtitle}
          </motion.p>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            {t.message}
          </motion.p>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-50 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.nextSteps}</h3>
            <div className="space-y-4">
              {t.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-left">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              {t.backHome}
            </Link>
            <Link
              href="/#contact"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
            >
              {t.contactUs}
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-sm text-gray-600 mb-4">
              {language === 'es' ? 'Confianza y Garantía:' : 'Trust & Guarantee:'}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="flex items-center space-x-2">
                <Image src="/certified.png" alt="Certified" width={24} height={24} />
                <span className="text-sm text-gray-600">
                  {language === 'es' ? 'Certificado' : 'Certified'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/insured.png" alt="Insured" width={24} height={24} />
                <span className="text-sm text-gray-600">
                  {language === 'es' ? 'Asegurado' : 'Insured'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/warranty.png" alt="Warranty" width={24} height={24} />
                <span className="text-sm text-gray-600">
                  {language === 'es' ? 'Garantía' : 'Warranty'}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
