'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Form() {
  const { language } = useLanguage();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    zip: '',
    service: '',
    ownership: '',
    roofType: '',
    customRoofType: '',
    urgency: '',
    customUrgency: '',
  });

  const [isNotEligible, setIsNotEligible] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submittedForm = {
      ...form,
      roofType: form.roofType === 'other' ? form.customRoofType : form.roofType,
      urgency: form.urgency === 'other' ? form.customUrgency : form.urgency,
    };

    console.log('Lead captured:', submittedForm);

    setForm({
      fullName: '',
      email: '',
      phone: '',
      zip: '',
      service: '',
      ownership: '',
      roofType: '',
      customRoofType: '',
      urgency: '',
      customUrgency: '',
    });

    alert(language === 'es' ? '¡Gracias! Hemos recibido tu solicitud.' : 'Thanks! Your request has been submitted.');
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
            {language === 'es' ? 'Obtén tu Cotización Gratuita' : 'Get Your Free Roofing Quote'}
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
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-yellow-500 text-base"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={language === 'es' ? 'Correo electrónico' : 'Email Address'}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-yellow-500 text-base"
            required
          />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder={language === 'es' ? 'Número de teléfono' : 'Phone Number'}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-yellow-500 text-base"
            required
          />
          <input
            type="text"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            placeholder={language === 'es' ? 'Código postal' : 'ZIP Code'}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-yellow-500 text-base"
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black text-base"
            required
          >
            <option value="">{language === 'es' ? 'Selecciona un servicio' : 'Select a Service'}</option>
            <option value="replacement">{language === 'es' ? 'Reemplazo de Techo' : 'Roof Replacement'}</option>
            <option value="repair">{language === 'es' ? 'Reparación' : 'Roof Repair'}</option>
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
            name="roofType"
            value={form.roofType}
            onChange={handleChange}
            className="w-full mb-2 px-4 py-3 rounded-lg border border-black text-black text-base"
          >
            <option value="">{language === 'es' ? 'Tipo de techo' : 'Type of Roof'}</option>
            <option value="asphalt">{language === 'es' ? 'Asfáltico' : 'Asphalt Shingles'}</option>
            <option value="metal">{language === 'es' ? 'Metálico' : 'Metal'}</option>
            <option value="tile">{language === 'es' ? 'Tejas' : 'Tile'}</option>
            <option value="flat">{language === 'es' ? 'Plano / TPO' : 'Flat / TPO'}</option>
            <option value="other">{language === 'es' ? 'Otro...' : 'Other...'}</option>
          </select>
          {form.roofType === 'other' && (
            <input
              type="text"
              name="customRoofType"
              value={form.customRoofType}
              onChange={handleChange}
              placeholder={language === 'es' ? 'Especifica el tipo de techo' : 'Specify roof type'}
              className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-yellow-500 text-base"
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
              className="w-full mb-4 px-4 py-3 rounded-lg border border-black text-black placeholder:text-gray-600 focus:outline-yellow-500 text-base"
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 rounded-lg transition"
          >
            {language === 'es' ? 'Enviar Solicitud' : 'Submit Request'}
          </button>
          
          {/* TCPA Disclosure */}
          <p className="text-xs text-gray-700 mt-4 text-center leading-relaxed">
            {language === 'es' 
              ? 'Al enviar este formulario, consiento recibir llamadas telefónicas y mensajes de texto de Best Deal Roofing sobre servicios de techado, incluyendo a través de sistemas automatizados. El consentimiento no es una condición de compra. Pueden aplicarse tarifas de mensajes y datos.'
              : 'By submitting this form, I consent to receive phone calls and text messages from Best Deal Roofing regarding roofing services, including via automated systems. Consent is not a condition of purchase. Message and data rates may apply.'
            }
          </p>
        </form>
      )}
    </div>
  );
}
