'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { getFormEndpoint } from '@/lib/formConfig';

export default function Form() {
  const { language } = useLanguage();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    zip: '',
    service: '',
    ownership: '',
    bathroomStyle: '',
    customBathroomStyle: '',
    urgency: '',
    customUrgency: '',
  });

  const [isNotEligible, setIsNotEligible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'ownership') {
      if (value === 'no') {
        setIsNotEligible(true);
        alert(language === 'es'
          ? 'Lo sentimos, este formulario es solo para propietarios de vivienda.'
          : 'Sorry, this form is only for homeowners.');
      } else {
        setIsNotEligible(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Formato optimizado para Zapier Webhook
      const formData = {
        // Información básica del lead
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        zipCode: form.zip,
        
        // Detalles del servicio solicitado
        service: form.service,
        ownership: form.ownership,
        bathroomStyle: form.bathroomStyle === 'other' ? form.customBathroomStyle : form.bathroomStyle,
        urgency: form.urgency === 'other' ? form.customUrgency : form.urgency,
        
        // Metadatos para tracking
        timestamp: new Date().toISOString(),
        source: 'TOPTIER BATH PROS Website',
        language: language,
        website: 'toptierbathpros.com',
        
        // Mensaje completo para referencia
        message: `Nuevo lead de TOPTIER BATH PROS:
        
Nombre: ${form.fullName}
Email: ${form.email}
Teléfono: ${form.phone}
Código Postal: ${form.zip}
Servicio: ${form.service}
Propietario: ${form.ownership}
Estilo: ${form.bathroomStyle === 'other' ? form.customBathroomStyle : form.bathroomStyle}
Urgencia: ${form.urgency === 'other' ? form.customUrgency : form.urgency}
Idioma: ${language}
Fecha: ${new Date().toLocaleString()}
Origen: Sitio Web TOPTIER BATH PROS`
      };

      // Enviar a Zapier Webhook
      const response = await fetch(getFormEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Éxito - redirigir a página de agradecimiento
        router.push('/thankyou');
      } else {
        // Si falla, redirigir de todas formas (para testing)
        console.log('Zapier webhook failed, but continuing to thank you page');
        router.push('/thankyou');
      }

    } catch (error) {
      // En caso de error, redirigir a página de agradecimiento
      console.log('Form submission error:', error);
      router.push('/thankyou');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return form.fullName.trim() !== '' &&
           form.email.trim() !== '' &&
           form.phone.trim() !== '' &&
           form.zip.trim() !== '' &&
           form.service !== '' &&
           form.ownership !== '' &&
           form.bathroomStyle !== '' &&
           form.urgency !== '';
  };

  if (isNotEligible) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          {language === 'es' ? 'No Elegible' : 'Not Eligible'}
        </h2>
        <p className="text-gray-700 mb-6">
          {language === 'es' 
            ? 'Lo sentimos, este formulario es solo para propietarios de vivienda.' 
            : 'Sorry, this form is only for homeowners.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {language === 'es' ? 'Solicita tu Cotización Gratuita' : 'Get Your Free Quote'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Nombre Completo' : 'Full Name'} *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Tu nombre completo' : 'Your full name'}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Correo Electrónico' : 'Email'} *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Teléfono' : 'Phone'} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Tu número de teléfono' : 'Your phone number'}
            />
          </div>

          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Código Postal' : 'ZIP Code'} *
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="12345"
            />
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'es' ? 'Servicio Necesario' : 'Service Needed'} *
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">{language === 'es' ? 'Selecciona un servicio' : 'Select a service'}</option>
            <option value="full-remodel">{language === 'es' ? 'Remodelación Completa' : 'Full Remodel'}</option>
            <option value="tub-to-shower">{language === 'es' ? 'Conversión Tina a Ducha' : 'Tub-to-Shower Conversion'}</option>
            <option value="vanity-upgrade">{language === 'es' ? 'Cambio de Vanity/Lavamanos' : 'Vanity Upgrade'}</option>
            <option value="tile-replacement">{language === 'es' ? 'Cambio de Baldosas' : 'Tile Replacement'}</option>
          </select>
        </div>

        <div>
          <label htmlFor="ownership" className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'es' ? '¿Eres el propietario?' : 'Are you the homeowner?'} *
          </label>
          <select
            id="ownership"
            name="ownership"
            value={form.ownership}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">{language === 'es' ? 'Selecciona' : 'Select'}</option>
            <option value="yes">{language === 'es' ? 'Sí, soy el dueño' : 'Yes, I\'m the owner'}</option>
            <option value="no">{language === 'es' ? 'No, soy inquilino' : 'No, I\'m renting'}</option>
          </select>
        </div>

        <div>
          <label htmlFor="bathroomStyle" className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'es' ? 'Estilo Preferido' : 'Preferred Style'} *
          </label>
          <select
            id="bathroomStyle"
            name="bathroomStyle"
            value={form.bathroomStyle}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">{language === 'es' ? 'Selecciona un estilo' : 'Select a style'}</option>
            <option value="modern">{language === 'es' ? 'Moderno' : 'Modern'}</option>
            <option value="classic">{language === 'es' ? 'Clásico' : 'Classic'}</option>
            <option value="minimalist">{language === 'es' ? 'Minimalista' : 'Minimalist'}</option>
            <option value="luxury">{language === 'es' ? 'Lujo' : 'Luxury'}</option>
            <option value="other">{language === 'es' ? 'Otro' : 'Other'}</option>
          </select>
        </div>

        {form.bathroomStyle === 'other' && (
          <div>
            <label htmlFor="customBathroomStyle" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Especifica el estilo' : 'Specify style'}
            </label>
            <input
              type="text"
              id="customBathroomStyle"
              name="customBathroomStyle"
              value={form.customBathroomStyle}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Describe tu estilo preferido' : 'Describe your preferred style'}
            />
          </div>
        )}

        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'es' ? '¿Qué tan pronto necesitas el servicio?' : 'How soon do you need service?'} *
          </label>
          <select
            id="urgency"
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">{language === 'es' ? 'Selecciona' : 'Select'}</option>
            <option value="asap">{language === 'es' ? 'Lo antes posible' : 'As soon as possible'}</option>
            <option value="week">{language === 'es' ? 'Dentro de una semana' : 'Within a week'}</option>
            <option value="month">{language === 'es' ? 'Dentro de un mes' : 'Within a month'}</option>
            <option value="flexible">{language === 'es' ? 'Flexible' : 'Flexible'}</option>
            <option value="other">{language === 'es' ? 'Otro' : 'Other'}</option>
          </select>
        </div>

        {form.urgency === 'other' && (
          <div>
            <label htmlFor="customUrgency" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Especifica el tiempo' : 'Specify timeline'}
            </label>
            <input
              type="text"
              id="customUrgency"
              name="customUrgency"
              value={form.customUrgency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Describe tu timeline' : 'Describe your timeline'}
            />
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {submitMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid() || isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition duration-300"
        >
          {isSubmitting 
            ? (language === 'es' ? 'Enviando...' : 'Submitting...') 
            : (language === 'es' ? 'Solicitar Cotización Gratuita' : 'Get Free Quote')
          }
        </button>

        <p className="text-xs text-gray-600 text-center">
          {language === 'es' 
            ? 'Al enviar este formulario, aceptas ser contactado por TOPTIER BATH PROS por teléfono, SMS o correo electrónico. No se requiere consentimiento como condición de compra.' 
            : 'By submitting this form, you agree to be contacted by TOPTIER BATH PROS via phone, SMS, or email. Consent is not a condition of purchase.'}
        </p>
      </form>
    </div>
  );
}