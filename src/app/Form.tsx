'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getFormEndpoint } from '@/lib/formConfig';

export default function Form() {
  const { language } = useLanguage();

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
  const [submitMessage, setSubmitMessage] = useState('');

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
      const submittedForm = {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        message: `Service: ${form.service}, Style: ${form.bathroomStyle === 'other' ? form.customBathroomStyle : form.bathroomStyle}, Urgency: ${form.urgency === 'other' ? form.customUrgency : form.urgency}, ZIP: ${form.zip}`,
        service: form.service,
      };

      // Para sitio estático, usar un servicio externo como Formspree, Netlify Forms, o EmailJS
      const response = await fetch(getFormEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submittedForm),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        setForm({
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
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center px-4">
      {isNotEligible ? (
        <div className="w-full max-w-md bg-white/90 p-6 sm:p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 drop-shadow-md">
            {language === 'es' ? 'No puedes continuar' : 'You cannot proceed'}
          </h2>
          <p className="text-slate-700">
            {language === 'es'
              ? 'Este formulario está destinado solo para propietarios de vivienda. Si no eres el dueño, no puedes completar esta solicitud.'
              : 'This form is only for homeowners. If you are not the owner, you cannot complete this request.'}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/90 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-12 drop-shadow-md">
            {language === 'es' ? 'Obtén tu Cotización de Baño' : 'Get Your Bathroom Quote'}
          </h2>
          <p className="text-sm text-gray-700 mb-6 text-center">
            {language === 'es'
              ? 'Completa el formulario y nuestro equipo se pondrá en contacto contigo.'
              : 'Fill in the form and our team will reach out to you shortly.'}
          </p>

          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder={language === 'es' ? 'Nombre completo' : 'Full Name'}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-teal-500 text-base"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={language === 'es' ? 'Correo electrónico' : 'Email Address'}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-teal-500 text-base"
            required
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={language === 'es' ? 'Número de teléfono' : 'Phone Number'}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-teal-500 text-base"
            required
          />
          <input
            type="text"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            placeholder={language === 'es' ? 'Código postal' : 'ZIP Code'}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-teal-500 text-base"
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black text-base"
            required
          >
            <option value="">{language === 'es' ? 'Selecciona un servicio' : 'Select a Service'}</option>
            <option value="full-remodel">{language === 'es' ? 'Remodelación Completa' : 'Full Remodel'}</option>
            <option value="tub-to-shower">{language === 'es' ? 'Conversión Tina a Ducha' : 'Tub-to-Shower Conversion'}</option>
            <option value="vanity-upgrade">{language === 'es' ? 'Cambio de Vanity/Lavamanos' : 'Vanity Upgrade'}</option>
            <option value="tile-replacement">{language === 'es' ? 'Cambio de Baldosas' : 'Tile Replacement'}</option>
          </select>

          <select
            name="ownership"
            value={form.ownership}
            onChange={handleChange}
            className="w-full mb-2 px-4 py-3 rounded-lg border border-black text-black text-base"
            required
          >
            <option value="">{language === 'es' ? '¿Eres el propietario?' : 'Are you the homeowner?'}</option>
            <option value="yes">{language === 'es' ? 'Sí, soy el dueño' : 'Yes, I’m the owner'}</option>
            <option value="no">{language === 'es' ? 'No, soy inquilino' : 'No, I’m renting'}</option>
          </select>

          <select
            name="bathroomStyle"
            value={form.bathroomStyle}
            onChange={handleChange}
            className="w-full mb-2 px-4 py-3 rounded-lg border border-black text-black text-base"
          >
            <option value="">{language === 'es' ? 'Estilo preferido' : 'Preferred Style'}</option>
            <option value="modern">{language === 'es' ? 'Moderno' : 'Modern'}</option>
            <option value="classic">{language === 'es' ? 'Clásico' : 'Classic'}</option>
            <option value="minimal">{language === 'es' ? 'Minimalista' : 'Minimalist'}</option>
            <option value="luxury">{language === 'es' ? 'Lujo' : 'Luxury'}</option>
            <option value="other">{language === 'es' ? 'Otro...' : 'Other...'}</option>
          </select>
          {form.bathroomStyle === 'other' && (
            <input
              type="text"
              name="customBathroomStyle"
              value={form.customBathroomStyle}
              onChange={handleChange}
              placeholder={language === 'es' ? 'Especifica el estilo' : 'Specify style'}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-teal-500 text-base"
              required
            />
          )}

          <select
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            className="w-full mb-2 px-4 py-3 rounded-lg border border-black text-black text-base"
          >
            <option value="">{language === 'es' ? '¿Cuándo necesitas el servicio?' : 'How soon do you need service?'}</option>
            <option value="asap">{language === 'es' ? 'Lo antes posible' : 'As soon as possible'}</option>
            <option value="1week">{language === 'es' ? 'Dentro de una semana' : 'Within a week'}</option>
            <option value="1month">{language === 'es' ? '1 mes o más' : '1 month or later'}</option>
            <option value="other">{language === 'es' ? 'Otro...' : 'Other...'}</option>
          </select>
          {form.urgency === 'other' && (
            <input
              type="text"
              name="customUrgency"
              value={form.customUrgency}
              onChange={handleChange}
              placeholder={language === 'es' ? 'Especifica cuándo' : 'Specify when'}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-teal-500 text-base"
              required
            />
          )}

          {submitStatus === 'success' && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {submitMessage}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {submitMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-bold py-3 rounded-lg transition ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-teal-500 hover:bg-teal-600'
            } text-white`}
          >
            {isSubmitting 
              ? (language === 'es' ? 'Enviando...' : 'Sending...') 
              : (language === 'es' ? 'Enviar Solicitud' : 'Submit Request')
            }
          </button>
          
          {/* TCPA Disclosure */}
          <p className="text-xs text-gray-700 mt-4 text-center leading-relaxed">
            {language === 'es' 
              ? 'Al enviar este formulario, consiento recibir llamadas telefónicas y mensajes de texto de TOPTIER BATH PROS sobre servicios de remodelación de baños, incluyendo a través de sistemas automatizados. El consentimiento no es una condición de compra. Pueden aplicarse tarifas de mensajes y datos.'
              : 'By submitting this form, I consent to receive phone calls and text messages from TOPTIER BATH PROS regarding bathroom remodeling services, including via automated systems. Consent is not a condition of purchase. Message and data rates may apply.'
            }
          </p>
        </form>
      )}
    </div>
  );
}
