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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/20"
        >
          {/* Success Icon con efecto de pulso */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 relative"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg relative">
              {/* Efecto de pulso */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-ping opacity-20"></div>
              <svg className="w-16 h-16 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>

          {/* Title con gradiente */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6"
          >
            {t.title}
          </motion.h1>

          {/* Destacado de 24 horas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-8 py-4 rounded-2xl mb-8 inline-block shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xl font-bold">
                  {language === 'es' ? 'Te llamaremos dentro de 24 horas' : 'We will call you within 24 hours'}
                </p>
                <p className="text-sm opacity-90">
                  {language === 'es' ? '¡No te pierdas nuestra llamada!' : "Don't miss our call!"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-teal-600 font-semibold mb-6"
          >
            {t.subtitle}
          </motion.p>

          {/* Message mejorado */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {language === 'es' 
              ? 'Hemos recibido tu solicitud de remodelación de baño y nuestro equipo de expertos se pondrá en contacto contigo dentro de las próximas 24 horas para discutir tu proyecto y programar una consulta gratuita.'
              : 'We have received your bathroom remodeling request and our team of experts will contact you within the next 24 hours to discuss your project and schedule a free consultation.'
            }
          </motion.p>

          {/* Next Steps mejorado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-gray-50 to-teal-50 rounded-3xl p-8 mb-8 border border-teal-100"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">{t.nextSteps}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {t.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-white rounded-2xl shadow-sm"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {index === 0 && (language === 'es' ? 'Llamada en 24 horas' : 'Call within 24 hours')}
                      {index === 1 && (language === 'es' ? 'Consulta gratuita' : 'Free consultation')}
                      {index === 2 && (language === 'es' ? 'Cotización detallada' : 'Detailed quote')}
                      {index === 3 && (language === 'es' ? 'Transformación' : 'Transformation')}
                    </h4>
                    <p className="text-gray-600 text-sm">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons mejorados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{t.backHome}</span>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-bold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{t.contactUs}</span>
            </Link>
          </motion.div>

          {/* Trust Badges mejorados */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 border border-teal-100"
          >
            <p className="text-lg font-semibold text-gray-800 mb-6">
              🏆 {language === 'es' ? 'Confianza y Garantía' : 'Trust & Guarantee'}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm">
                <Image src="/certified.png" alt="Certified" width={32} height={32} />
                <span className="text-sm font-medium text-gray-700">
                  {language === 'es' ? 'Certificado' : 'Certified'}
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm">
                <Image src="/insured.png" alt="Insured" width={32} height={32} />
                <span className="text-sm font-medium text-gray-700">
                  {language === 'es' ? 'Asegurado' : 'Insured'}
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm">
                <Image src="/warranty.png" alt="Warranty" width={32} height={32} />
                <span className="text-sm font-medium text-gray-700">
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
