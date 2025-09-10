'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function BannerConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accepted = localStorage.getItem('cookieConsent');
      if (!accepted) {
        setVisible(true);
      }
    }
  }, []);

  const acceptConsent = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookieConsent', 'true');
    }
    setVisible(false);
  };

  if (!visible) return null;

  const text = {
    en: {
      message:
        'By using this site, you agree to our use of cookies for performance, analytics, and marketing purposes. By submitting any form, you also agree to be contacted via phone, SMS, or email by TOPTIER BATH PROS or its partners. Message/data rates may apply.',
      button: 'I Agree',
    },
    es: {
      message:
        'Al usar este sitio, acepta nuestro uso de cookies para fines de rendimiento, análisis y marketing. Al enviar cualquier formulario, también acepta ser contactado por teléfono, SMS o correo electrónico por TOPTIER BATH PROS o sus socios. Se pueden aplicar tarifas de mensajes/datos.',
      button: 'Acepto',
    },
  };

  const t = text[language];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-sm p-4 z-50">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-center sm:text-left">{t.message}</p>
        <button
          onClick={acceptConsent}
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded transition"
        >
          {t.button}
        </button>
      </div>
    </div>
  );
}
