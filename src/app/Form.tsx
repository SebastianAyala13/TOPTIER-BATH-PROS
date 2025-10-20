'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getFormEndpoint } from '@/lib/formConfig';

declare global {
  interface Window {
    TrustedForm?: {
      getCertUrl?: () => string;
    };
    dataLayer?: Record<string, unknown>[];
    jornaya_lead_id?: string;
    leadid_token?: string;
    jornayaLeadId?: string;
    leadId?: string;
    jornaya_token?: string;
  }
}

export default function Form() {
  const { language } = useLanguage();
  const router = useRouter();
  
  // Log para verificar cuántas instancias se montan
  useEffect(() => {
    console.log('🔧 Form component mounted - timestamp:', new Date().toISOString());
    return () => {
      console.log('🔧 Form component unmounted - timestamp:', new Date().toISOString());
    };
  }, []);

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email_address: '',
    phone_home: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    repair_or_replace: '',
    ownership: '',
    bathroomStyle: '',
    customBathroomStyle: '',
    urgency: '',
    customUrgency: '',
    tcpaText: '',
    trusted_form_cert_id: '',
    landing_page: '',
    universal_leadid: '',
  });

  const [isNotEligible, setIsNotEligible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage] = useState('');
  const [tfToken, setTfToken] = useState('');
  const tfHiddenRef = useRef<HTMLInputElement>(null);
  const hasSubmitted = useRef(false); // Prevenir envíos duplicados
  const formRef = useRef<HTMLFormElement>(null);

  // TrustedForm integration
  useEffect(() => {
    if (!tfHiddenRef.current) return;
    
    // Set landing page
    setForm(prev => ({ ...prev, landing_page: window.location.href }));
    
    const applyFromGlobal = () => {
      try {
        const val = (window.TrustedForm && window.TrustedForm.getCertUrl && window.TrustedForm.getCertUrl()) || '';
        if (val) {
          if (tfHiddenRef.current) tfHiddenRef.current.value = val;
          setTfToken(val);
          setForm(prev => ({ ...prev, trusted_form_cert_id: val }));
        }
      } catch {}
    };
    
    applyFromGlobal();
    
    const obs = new MutationObserver(() => {
      if (tfHiddenRef.current?.value) {
        setTfToken(tfHiddenRef.current.value);
        setForm(prev => ({ ...prev, trusted_form_cert_id: tfHiddenRef.current?.value || '' }));
      }
    });
    
    obs.observe(tfHiddenRef.current, { attributes: true, attributeFilter: ['value'] });
    const id = setInterval(applyFromGlobal, 300);
    
    return () => { obs.disconnect(); clearInterval(id); };
  }, []);

  // Jornaya LeadID integration: observar y registrar cambios del token
  useEffect(() => {
    const input = document.getElementById('leadid_token') as HTMLInputElement | null;
    if (!input) return;

    const logCurrent = () => {
      if (input && input.value) {
        console.log('🔎 Jornaya lead token detectado:', input.value);
      } else {
        console.log('⌛ Jornaya lead token aún no disponible');
      }
    };

    // Log inicial y cada cambio del atributo value
    logCurrent();
    const observer = new MutationObserver(() => {
      console.log('✳️ Cambio detectado en leadid_token:', input.value);
    });
    observer.observe(input, { attributes: true, attributeFilter: ['value'] });

    // Poll suave por si el script actualiza por JS sin mutación de atributo
    const intervalId = setInterval(logCurrent, 500);

    return () => {
      observer.disconnect();
      clearInterval(intervalId);
    };
  }, []);

  // Función para Jornaya Lead ID - EXACTA del patrón exitoso con debug
  async function waitForJornayaToken(maxWaitMs = 2000) {
    const start = Date.now()
    const poll = async (): Promise<string> => {
      const leadIdInput = document.getElementById('leadid_token') as HTMLInputElement
      const val = leadIdInput?.value || ''
      console.log('🔍 Jornaya token polling:', val) // DEBUG
      if (val) {
        return val
      }
      if (Date.now() - start >= maxWaitMs) return ''
      await new Promise(r => setTimeout(r, 150))
      return poll()
    }
    return poll()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));

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

  async function waitForTrustedFormToken(maxWaitMs = 2000) {
    const start = Date.now();
    const poll = async (): Promise<string> => {
      const hiddenVal = tfHiddenRef.current?.value || '';
      let fromApi = '';
      try { 
        fromApi = (window.TrustedForm && window.TrustedForm.getCertUrl && window.TrustedForm.getCertUrl()) || '';
      } catch {}
      
      const val = hiddenVal || fromApi;
      if (val) {
        if (!hiddenVal && tfHiddenRef.current) tfHiddenRef.current.value = val;
        setTfToken(val);
        setForm(prev => ({ ...prev, trusted_form_cert_id: val }));
        return val;
      }
      
      if (Date.now() - start >= maxWaitMs) return '';
      await new Promise(r => setTimeout(r, 150));
      return poll();
    };
    return poll();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevenir envíos duplicados
    if (hasSubmitted.current || isSubmitting) {
      console.log('🚫 Form submission blocked - already submitted or submitting');
      return;
    }
    
    hasSubmitted.current = true;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    const formEl = e.currentTarget as HTMLFormElement;
    
    // ESPERAR AMBOS TOKENS ANTES DE CONTINUAR
    await waitForTrustedFormToken(2000);
    const jornayaToken = await waitForJornayaToken(2000);
    
    console.log('🔍 Jornaya token capturado:', jornayaToken); // DEBUG
    
    const f = new FormData(formEl);
    
    // VERIFICAR QUE EL TOKEN ESTÉ EN FormData
    const formDataJornaya = f.get('universal_leadid')?.toString() || '';
    console.log('🔍 Jornaya desde FormData:', formDataJornaya); // DEBUG

    try {
      // Set TCPA text
      const tcpaText = 'By clicking Submit, You agree to give express consent to receive marketing communications regarding Home Improvement services by automatic dialing system and pre-recorded calls and artificial voice messages from Home Services Partners at the phone number and E-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do not Call Registry. SMS/MMS and data messaging rates may apply. You understand that my consent here is not a condition for buying any goods or services. You agree to the Privacy Policy and Terms & Conditions.';
      
      // Normalización de campos derivados
      const normalizedBathroomStyle = form.bathroomStyle === 'other' ? form.customBathroomStyle : form.bathroomStyle;
      const normalizedUrgency = form.urgency === 'other' ? form.customUrgency : form.urgency;

      // Payload completo según patrón exitoso
      const payload = {
        // Campaign fields
        lp_campaign_id: process.env.NEXT_PUBLIC_LP_CAMPAIGN_ID || 'Provided',
        lp_campaign_key: process.env.NEXT_PUBLIC_LP_CAMPAIGN_KEY || 'Provided', 
        lp_s1: process.env.NEXT_PUBLIC_LP_S1 || 'Provided',
        lp_s2: process.env.NEXT_PUBLIC_LP_S2 || 'toptierbathpros',
        lp_response: 'JSON',
        
        // Contact and address data
        city: form.city,
        state: form.state,
        zip_code: form.zip_code,
        first_name: form.first_name,
        last_name: form.last_name,
        address: form.address,
        phone_home: form.phone_home,
        email_address: form.email_address,
        
        // Service and consent
        repair_or_replace: form.repair_or_replace,
        tcpaText: tcpaText,
        "consent-language": true,
        
        // Tracking and metadata - EXACTO DEL PATRÓN EXITOSO
        trusted_form_cert_id: (tfHiddenRef.current?.value || tfToken || f.get('trusted_form_cert_id')?.toString() || ''),
        jornaya_lead_id: jornayaToken || formDataJornaya, // USAR TOKEN CAPTURADO PRIMERO, LUEGO FormData
        landing_page: form.landing_page || window.location.href,
        
        // Legacy fields for compatibility
        bathroomStyle: normalizedBathroomStyle,
        urgency: normalizedUrgency,
        ownership: form.ownership,
        timestamp: new Date().toISOString(),
        source: 'TOPTIER BATH PROS Website',
        language,
        website: 'toptierbathpros.com',
      };

      console.log('🔍 Payload completo antes de enviar:', payload); // DEBUG
      console.log('🔍 Token Jornaya final en payload:', payload.jornaya_lead_id); // DEBUG ADICIONAL

      // Enviar a Zapier Webhook (formato JSON para mejor organización)
      const response = await fetch(getFormEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        
        // Disparar Custom Event para GTM (solo una vez)
        if (typeof window !== 'undefined' && window.dataLayer) {
          const eventData = {
            event: 'lead_submit',
            form_id: 'toptier_bath_pros_form',
            form_type: 'bathroom_remodeling_quote',
            lead_data: {
              first_name: form.first_name,
              last_name: form.last_name,
              email: form.email_address,
              phone: form.phone_home,
              service: form.repair_or_replace,
              zip_code: form.zip_code
            }
          };
          
          window.dataLayer.push(eventData);
          console.log('✅ Custom GTM event pushed: lead_submit');
          console.log('📊 Event data:', eventData);
          console.log('📊 Total dataLayer events:', window.dataLayer.length);
        } else {
          console.log('❌ dataLayer not available');
        }
        
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
      hasSubmitted.current = false; // Reset para permitir reintento según patrón exitoso
      router.push('/thankyou');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return form.first_name.trim() !== '' &&
           form.last_name.trim() !== '' &&
           form.email_address.trim() !== '' &&
           form.phone_home.trim() !== '' &&
           form.address.trim() !== '' &&
           form.city.trim() !== '' &&
           form.state.trim() !== '' &&
           form.zip_code.trim() !== '' &&
           form.repair_or_replace !== '' &&
           true; // No checkbox required
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
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-3" data-tf-element-role="offer">
        {/* Hidden TrustedForm field */}
        <input ref={tfHiddenRef} type="hidden" name="trusted_form_cert_id" />
        
        {/* Hidden Jornaya Lead ID field (sin value para permitir escritura del script) */}
        <input id="leadid_token" type="hidden" name="universal_leadid" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
              {language === 'es' ? 'Nombre' : 'First Name'} *
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Tu nombre' : 'Your first name'}
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Apellido' : 'Last Name'} *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Tu apellido' : 'Your last name'}
            />
          </div>

          <div>
            <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Correo Electrónico' : 'Email'} *
            </label>
            <input
              type="email"
              id="email_address"
              name="email_address"
              value={form.email_address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone_home" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Teléfono' : 'Phone'} *
            </label>
            <input
              type="tel"
              id="phone_home"
              name="phone_home"
              value={form.phone_home}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Tu número de teléfono' : 'Your phone number'}
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'es' ? 'Dirección' : 'Address'} *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder={language === 'es' ? 'Tu dirección completa' : 'Your complete address'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Ciudad' : 'City'} *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Ciudad' : 'City'}
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Estado' : 'State'} *
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={language === 'es' ? 'Estado' : 'State'}
            />
          </div>

          <div>
            <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'es' ? 'Código Postal' : 'ZIP Code'} *
            </label>
            <input
              type="text"
              id="zip_code"
              name="zip_code"
              value={form.zip_code}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="12345"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {language === 'es' ? 'Servicio de Interés' : 'Service of Interest'} *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="repair_or_replace"
                value="repair"
                checked={form.repair_or_replace === 'repair'}
                onChange={handleChange}
                className="mr-3 text-teal-500 focus:ring-teal-500"
              />
              <span>{language === 'es' ? 'Reparar baño existente' : 'Repair existing bathroom'}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="repair_or_replace"
                value="replace"
                checked={form.repair_or_replace === 'replace'}
                onChange={handleChange}
                className="mr-3 text-teal-500 focus:ring-teal-500"
              />
              <span>{language === 'es' ? 'Reemplazar/Remodelar baño completo' : 'Replace/Remodel complete bathroom'}</span>
            </label>
          </div>
        </div>

        {submitStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {submitMessage}
          </div>
        )}

        <label className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-3 block" data-tf-element-role="consent-language">
          <span className="text-xs leading-relaxed text-gray-700">
            By clicking Submit, You agree to give express consent to receive marketing communications regarding Home Improvement services by automatic dialing system and pre-recorded calls and artificial voice messages from <Link href="/partners" className="underline text-teal-600 hover:text-teal-800">Home Services Partners</Link> at the phone number and E-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do not Call Registry. SMS/MMS and data messaging rates may apply. You understand that my consent here is not a condition for buying any goods or services. You agree to the{' '}
            <a className="underline" href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a> and{' '}
            <a className="underline ml-1" href="/terms-conditions" target="_blank" rel="noreferrer">Terms & Conditions</a>.
          </span>
        </label>

        <input
          type="submit"
          name="submit"
          data-tf-element-role="submit"
          disabled={!isFormValid() || isSubmitting}
          className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition duration-300 text-sm cursor-pointer"
          value={isSubmitting ? (language === 'es' ? 'Enviando...' : 'Submitting...') : 'Submit'}
        />
      </form>
    </div>
  );
}