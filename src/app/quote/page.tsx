'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface FormData {
  ownership: string;
  service: string;
  fullName: string;
  email: string;
  phone: string;
  zip: string;
  bathroomStyle: string;
  urgency: string;
}

interface Question {
  key: keyof FormData;
  label: string;
  placeholder?: string;
  type: 'text' | 'email' | 'tel' | 'select';
  options?: { value: string; label: string }[];
  image: string;
}

export default function QuoteForm() {
  const { language } = useLanguage();

  const [step, setStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ownership: '',
    service: '',
    fullName: '',
    email: '',
    phone: '',
    zip: '',
    bathroomStyle: '',
    urgency: ''
  });

  const questions: Question[] = [
    {
      key: 'ownership',
      label: language === 'es' ? '¿Eres el propietario de la vivienda?' : 'Are you the homeowner?',
      type: 'select',
      options: [
        { value: '', label: language === 'es' ? 'Selecciona' : 'Select' },
        { value: 'yes', label: language === 'es' ? 'Sí, soy el dueño' : 'Yes, I’m the owner' },
        { value: 'no', label: language === 'es' ? 'No, soy inquilino' : 'No, I’m renting' }
      ],
      image: '/bathrooms/experience6.jpg'
    },
    {
      key: 'service',
      label: language === 'es' ? '¿Qué servicio de baño necesitas?' : 'What bathroom service do you need?',
      type: 'select',
      options: [
        { value: '', label: language === 'es' ? 'Selecciona' : 'Select' },
        { value: 'full-remodel', label: language === 'es' ? 'Remodelación Completa' : 'Full Remodel' },
        { value: 'tub-to-shower', label: language === 'es' ? 'Conversión Tina a Ducha' : 'Tub-to-Shower Conversion' },
        { value: 'vanity-upgrade', label: language === 'es' ? 'Cambio de Vanity/Lavamanos' : 'Vanity Upgrade' },
        { value: 'tile-replacement', label: language === 'es' ? 'Cambio de Baldosas' : 'Tile Replacement' }
      ],
      image: '/bathrooms/experience5.jpg'
    },
    {
      key: 'fullName',
      label: language === 'es' ? '¿Cuál es tu nombre completo?' : 'What is your full name?',
      placeholder: language === 'es' ? 'Nombre completo' : 'Full Name',
      type: 'text',
      image: '/bathrooms/experience1.jpg'
    },
    {
      key: 'email',
      label: language === 'es' ? '¿Cuál es tu correo electrónico?' : 'What is your email?',
      placeholder: 'Email',
      type: 'email',
      image: '/bathrooms/experience2.jpg'
    },
    {
      key: 'phone',
      label: language === 'es' ? '¿Cuál es tu número de teléfono?' : 'What is your phone number?',
      placeholder: language === 'es' ? 'Teléfono' : 'Phone',
      type: 'tel',
      image: '/bathrooms/experience3.jpg'
    },
    {
      key: 'zip',
      label: language === 'es' ? '¿Cuál es tu código postal?' : 'What is your ZIP code?',
      placeholder: 'ZIP Code',
      type: 'text',
      image: '/bathrooms/experience4.jpg'
    },
    {
      key: 'bathroomStyle',
      label: language === 'es' ? '¿Qué estilo prefieres?' : 'What style do you prefer?',
      type: 'select',
      options: [
        { value: '', label: language === 'es' ? 'Selecciona' : 'Select' },
        { value: 'modern', label: language === 'es' ? 'Moderno' : 'Modern' },
        { value: 'classic', label: language === 'es' ? 'Clásico' : 'Classic' },
        { value: 'minimal', label: language === 'es' ? 'Minimalista' : 'Minimalist' },
        { value: 'luxury', label: language === 'es' ? 'Lujo' : 'Luxury' },
        { value: 'unknown', label: language === 'es' ? 'No estoy seguro' : 'Not Sure' }
      ],
      image: '/bathrooms/experience7.jpg'
    },
    {
      key: 'urgency',
      label: language === 'es' ? '¿Qué tan pronto necesitas el servicio?' : 'How soon do you need service?',
      type: 'select',
      options: [
        { value: '', label: language === 'es' ? 'Selecciona' : 'Select' },
        { value: 'immediately', label: language === 'es' ? 'Inmediatamente' : 'Immediately' },
        { value: 'week', label: language === 'es' ? 'Dentro de una semana' : 'Within a week' },
        { value: 'month', label: language === 'es' ? 'Dentro de un mes' : 'Within a month' }
      ],
      image: '/bathrooms/experience8.jpg'
    }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const currentKey = questions[step].key;
    const currentValue = formData[currentKey];

    if (!currentValue || currentValue.trim() === '') {
      alert(language === 'es' ? 'Por favor completa este campo.' : 'Please fill out this field.');
      return;
    }

    if (currentKey === 'ownership' && currentValue === 'no') {
      alert(language === 'es' ? 'Lo sentimos, solo propietarios pueden aplicar.' : 'Sorry, homeowners only.');
      return;
    }

    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  const current = questions[step];
  const progress = Math.round(((step + 1) / questions.length) * 100);

  return (
    <section id="quote-wizard" className="max-w-4xl mx-auto px-4 py-10">
      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-3xl shadow-xl text-center"
        >
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            {language === 'es' ? '¡Gracias por tu solicitud!' : 'Thank you for your request!'}
          </h2>
          <p className="text-slate-700 mb-6">
            {language === 'es' ? 'Tu información fue enviada correctamente. Pronto recibirás una respuesta.' : 'Your information has been successfully submitted. We will get back to you soon.'}
          </p>
          <Link href="/" className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition">
            {language === 'es' ? 'Volver al inicio' : 'Back to Home'}
          </Link>
        </motion.div>
      ) : (
        <>
          <div className="mb-4 text-sm font-medium text-slate-700">{progress}%</div>
          <div className="w-full h-2 bg-gray-200 rounded-full mb-8">
            <div className="h-full bg-teal-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>

          <motion.div
            key={current.key}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-xl"
          >
            <div className="w-full md:w-1/2">
              <Image
                src={current.image}
                alt="Question visual"
                width={600}
                height={400}
                className="rounded-xl shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{current.label}</h2>
              {current.type === 'select' ? (
                <select
                  name={current.key}
                  value={formData[current.key]}
                  onChange={handleChange}
                  required
                  aria-label={current.label}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
                >
                  {current.options?.map((opt, idx) => (
                    <option key={idx} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={current.type}
                  name={current.key}
                  placeholder={current.placeholder}
                  value={formData[current.key]}
                  onChange={handleChange}
                  required
                  aria-label={current.label}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base"
                />
              )}

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className="bg-gray-300 hover:bg-gray-400 text-slate-800 font-bold py-2 px-6 rounded-lg transition"
                >
                  {language === 'es' ? 'Atrás' : 'Back'}
                </button>
                <button
                  onClick={handleNext}
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  {step === questions.length - 1 ? (language === 'es' ? 'Enviar' : 'Submit') : (language === 'es' ? 'Siguiente' : 'Next')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
}
