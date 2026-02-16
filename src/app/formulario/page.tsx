'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { getFormularioEndpoint } from '@/lib/formConfig';
import { isValidZipCode } from '@/lib/authorizedZipCodes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    TrustedForm?: { getCertUrl?: () => string };
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const STEPS: { key: string; labelEn: string; labelEs: string; type: 'text' | 'email' | 'tel' | 'radio'; placeholderEn?: string; placeholderEs?: string; options?: { value: string; labelEn: string; labelEs: string }[] }[] = [
  { key: 'first_name', labelEn: 'What is your first name?', labelEs: '¿Cuál es tu nombre?', type: 'text', placeholderEn: 'First name', placeholderEs: 'Nombre' },
  { key: 'last_name', labelEn: 'And your last name?', labelEs: '¿Y tu apellido?', type: 'text', placeholderEn: 'Last name', placeholderEs: 'Apellido' },
  { key: 'email_address', labelEn: 'What is your email address?', labelEs: '¿Cuál es tu correo electrónico?', type: 'email', placeholderEn: 'you@email.com', placeholderEs: 'tu@email.com' },
  { key: 'phone_home', labelEn: 'What is your phone number?', labelEs: '¿Cuál es tu número de teléfono?', type: 'tel', placeholderEn: 'Phone', placeholderEs: 'Teléfono' },
  { key: 'address', labelEn: 'What is your street address?', labelEs: '¿Cuál es tu dirección?', type: 'text', placeholderEn: 'Street address', placeholderEs: 'Dirección' },
  { key: 'city', labelEn: 'Which city?', labelEs: '¿En qué ciudad?', type: 'text', placeholderEn: 'City', placeholderEs: 'Ciudad' },
  { key: 'state', labelEn: 'Which state?', labelEs: '¿Estado?', type: 'text', placeholderEn: 'State', placeholderEs: 'Estado' },
  { key: 'zip_code', labelEn: 'What is your ZIP code?', labelEs: '¿Cuál es tu código postal?', type: 'text', placeholderEn: 'ZIP', placeholderEs: 'Código postal' },
  {
    key: 'repair_or_replace',
    labelEn: 'Do you need to repair your existing bathroom or replace/remodel it completely?',
    labelEs: '¿Necesitas reparar tu baño actual o reemplazar/remodelar por completo?',
    type: 'radio',
    options: [
      { value: 'repair', labelEn: 'Repair existing bathroom', labelEs: 'Reparar baño existente' },
      { value: 'replace', labelEn: 'Replace / Full remodel', labelEs: 'Reemplazar / Remodelación completa' },
    ],
  },
];

const OBJECTION_FAQS = [
  { qEn: 'Is the quote really free?', qEs: '¿La cotización es realmente gratis?', aEn: 'Yes. The estimate is free and there is no obligation. We want you to see what’s possible before you decide.', aEs: 'Sí. La cotización es gratis y sin compromiso. Queremos que veas qué es posible antes de decidir.' },
  { qEn: 'Why do you need my phone number?', qEs: '¿Por qué necesitan mi teléfono?', aEn: 'So we can confirm your details and schedule a quick call or visit to give you an accurate quote. We do not spam.', aEs: 'Para confirmar tus datos y coordinar una llamada o visita rápida y darte una cotización precisa. No enviamos spam.' },
  { qEn: 'What areas do you serve?', qEs: '¿En qué zonas trabajan?', aEn: 'We serve multiple states and ZIP codes. Enter your ZIP above to confirm we cover your area.', aEs: 'Trabajamos en varios estados y códigos postales. Ingresa tu ZIP arriba para confirmar que cubrimos tu zona.' },
  { qEn: 'How soon will someone contact me?', qEs: '¿Cuándo me contactan?', aEn: 'Usually within 1 business day. We prioritize requests to get you an answer quickly.', aEs: 'Normalmente en 1 día hábil. Damos prioridad a las solicitudes para responderte rápido.' },
  { qEn: 'Am I obligated if I submit this form?', qEs: '¿Me comprometo a algo al enviar el formulario?', aEn: 'No. Submitting the form only requests a free estimate. You decide next steps after we send your quote.', aEs: 'No. Enviar el formulario solo solicita una cotización gratis. Tú decides los siguientes pasos después de enviarte la cotización.' },
];

export default function FormularioPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({
    first_name: '',
    last_name: '',
    email_address: '',
    phone_home: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    repair_or_replace: '',
  });
  const [zipCodeError, setZipCodeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const tfRef = useRef<HTMLInputElement>(null);
  const [tfToken, setTfToken] = useState('');
  const hasSubmitted = useRef(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, landing_page: typeof window !== 'undefined' ? window.location.href : '' }));
  }, []);

  useEffect(() => {
    if (!tfRef.current) return;
    const apply = () => {
      try {
        const val = (typeof window !== 'undefined' && window.TrustedForm?.getCertUrl?.()) || '';
        if (val && tfRef.current) {
          tfRef.current.value = val;
          setTfToken(val);
        }
      } catch {}
    };
    apply();
    const id = setInterval(apply, 300);
    return () => clearInterval(id);
  }, []);

  const validateZipCode = (zip: string) => isValidZipCode(zip);

  async function waitForJornayaToken(maxWait = 2000): Promise<string> {
    const start = Date.now();
    const poll = async (): Promise<string> => {
      const input = document.getElementById('leadid_token') as HTMLInputElement | null;
      const val = input?.value?.trim() || '';
      if (val) return val;
      if (Date.now() - start >= maxWait) return '';
      await new Promise((r) => setTimeout(r, 150));
      return poll();
    };
    return poll();
  }

  async function waitForTrustedFormToken(maxWait = 2000): Promise<string> {
    const start = Date.now();
    const poll = async (): Promise<string> => {
      const val = tfRef.current?.value?.trim() || (typeof window !== 'undefined' && window.TrustedForm?.getCertUrl?.()) || '';
      if (val) return val;
      if (Date.now() - start >= maxWait) return '';
      await new Promise((r) => setTimeout(r, 150));
      return poll();
    };
    return poll();
  }

  const currentStep = STEPS[step];
  const progress = Math.round(((step + 1) / STEPS.length) * 100);
  const isLastStep = step === STEPS.length - 1;
  const value = form[currentStep?.key ?? ''] ?? '';

  const handleNext = () => {
    if (currentStep.key === 'zip_code' && form.zip_code && !validateZipCode(form.zip_code)) {
      setZipCodeError(language === 'es' ? 'Fuera de cobertura' : 'Out of coverage area');
      return;
    }
    setZipCodeError('');
    if (!value || (typeof value === 'string' && !value.trim())) {
      alert(language === 'es' ? 'Por favor completa este campo.' : 'Please fill out this field.');
      return;
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (hasSubmitted.current || isSubmitting) return;
    if (!validateZipCode(form.zip_code)) {
      setZipCodeError(language === 'es' ? 'Fuera de cobertura' : 'Out of coverage area');
      return;
    }
    hasSubmitted.current = true;
    setIsSubmitting(true);
    await waitForTrustedFormToken(2000);
    const jornayaToken = await waitForJornayaToken(2000);
    const tcpaText = 'By clicking Submit, You agree to give express consent to receive marketing communications regarding Home Improvement services by automatic dialing system and pre-recorded calls and artificial voice messages from Home Services Partners at the phone number and E-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do not Call Registry. SMS/MMS and data messaging rates may apply. You understand that my consent here is not a condition for buying any goods or services. You agree to the Privacy Policy and Terms & Conditions.';
    const payload = {
      lp_campaign_id: process.env.NEXT_PUBLIC_LP_CAMPAIGN_ID || 'Provided',
      lp_campaign_key: process.env.NEXT_PUBLIC_LP_CAMPAIGN_KEY || 'Provided',
      lp_s1: process.env.NEXT_PUBLIC_LP_S1 || 'Provided',
      lp_s2: process.env.NEXT_PUBLIC_LP_S2 || 'toptierbathpros',
      lp_response: 'JSON',
      city: form.city,
      state: form.state,
      zip_code: form.zip_code,
      first_name: form.first_name,
      last_name: form.last_name,
      address: form.address,
      phone_home: form.phone_home,
      email_address: form.email_address,
      repair_or_replace: form.repair_or_replace,
      tcpaText,
      'consent-language': true,
      trusted_form_cert_id: tfRef.current?.value || tfToken || '',
      jornaya_lead_id: jornayaToken || (document.getElementById('leadid_token') as HTMLInputElement)?.value || '',
      landing_page: form.landing_page || (typeof window !== 'undefined' ? window.location.href : ''),
      bathroomStyle: '',
      urgency: '',
      ownership: 'yes',
      timestamp: new Date().toISOString(),
      source: 'TOPTIER BATH PROS Formulario',
      language,
      website: 'toptierbathpros.com',
    };
    try {
      const res = await fetch(getFormularioEndpoint(), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (res.ok && typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'lead_submit',
          form_id: 'formulario_landing',
          form_type: 'bathroom_remodeling_quote',
          lead_data: { first_name: form.first_name, last_name: form.last_name, email: form.email_address, phone: form.phone_home, service: form.repair_or_replace, zip_code: form.zip_code },
        });
      }
      setSubmitted(true);
      router.push('/thankyou');
    } catch {
      setSubmitted(true);
      router.push('/thankyou');
    } finally {
      setIsSubmitting(false);
    }
  };

  const label = (currentStep && (language === 'es' ? currentStep.labelEs : currentStep.labelEn)) || '';
  const placeholder = currentStep?.placeholderEn || currentStep?.placeholderEs || '';

  return (
    <>
      {/* Meta Pixel - only on this page */}
      <Script
        id="meta-pixel-formulario"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1149265126710788');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1149265126710788&ev=PageView&noscript=1" alt="" />
      </noscript>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 px-4 py-8 md:py-12 max-w-2xl mx-auto w-full">
          {/* Title & Subtitle */}
          <div className="text-center mb-8 md:mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {language === 'es' ? 'Cotización de Baño' : 'Bathroom Quote'}
            </h1>
            <p className="text-lg text-slate-600">
              {language === 'es'
                ? 'Cuéntanos tu proyecto en pocos pasos y recibe tu cotización sin compromiso.'
                : 'Tell us about your project in a few steps and get your free, no-obligation quote.'}
            </p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-1">
              <span>{language === 'es' ? 'Progreso' : 'Progress'}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Conversational form - one question per step */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 mb-10">
            <input ref={tfRef} type="hidden" id="xxTrustedFormCertUrl" name="xxTrustedFormCertUrl" />
            <input id="leadid_token" type="hidden" name="universal_leadid" />

            <AnimatePresence mode="wait">
              {!submitted && currentStep && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="min-h-[120px]"
                >
                  <label className="block text-lg font-semibold text-slate-800 mb-4">{label}</label>
                  {currentStep.type === 'radio' && currentStep.options ? (
                    <div className="space-y-3">
                      {currentStep.options.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 cursor-pointer transition">
                          <input
                            type="radio"
                            name={currentStep.key}
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={(e) => setForm((f) => ({ ...f, [currentStep.key]: e.target.value }))}
                            className="text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-slate-700">{language === 'es' ? opt.labelEs : opt.labelEn}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={currentStep.type}
                      value={value}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, [currentStep.key]: e.target.value }));
                        if (currentStep.key === 'zip_code') {
                          const z = e.target.value.trim();
                          setZipCodeError(z && !validateZipCode(z) ? (language === 'es' ? 'Fuera de cobertura' : 'Out of coverage area') : '');
                        }
                      }}
                      placeholder={placeholder}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      autoFocus
                    />
                  )}
                  {currentStep.key === 'zip_code' && zipCodeError && <p className="mt-2 text-sm text-red-600">{zipCodeError}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            {!submitted && (
              <div className="flex gap-3 mt-6">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    {language === 'es' ? 'Atrás' : 'Back'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={isLastStep ? handleSubmit : handleNext}
                  disabled={isSubmitting}
                  className="flex-1 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-semibold py-2.5 px-5 rounded-xl transition"
                >
                  {isSubmitting
                    ? (language === 'es' ? 'Enviando...' : 'Submitting...')
                    : isLastStep
                      ? (language === 'es' ? 'Enviar' : 'Submit')
                      : (language === 'es' ? 'Siguiente' : 'Next')}
                </button>
              </div>
            )}
          </div>

          {/* TCPA Consent - debajo del form con hipervínculos */}
          <label className="bg-gray-50 p-4 rounded-lg border border-gray-200 block mb-10" data-tf-element-role="consent-language">
            <span className="text-xs leading-relaxed text-gray-700">
              By clicking Submit, You agree to give express consent to receive marketing communications regarding Home Improvement services by automatic dialing system and pre-recorded calls and artificial voice messages from <Link href="/partners" className="underline text-teal-600 hover:text-teal-800">Home Services Partners</Link> at the phone number and E-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do not Call Registry. SMS/MMS and data messaging rates may apply. You understand that my consent here is not a condition for buying any goods or services. You agree to the <Link href="/privacy-policy" className="underline text-teal-600 hover:text-teal-800" target="_blank" rel="noreferrer">Privacy Policy</Link> and <Link href="/terms" className="underline text-teal-600 hover:text-teal-800" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link>.
            </span>
          </label>

          {/* Q&A Objeciones */}
          <section className="border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              {language === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
            </h2>
            <div className="space-y-3">
              {OBJECTION_FAQS.map((faq, idx) => (
                <details key={idx} className="bg-white/90 text-slate-900 p-4 rounded-xl shadow border border-slate-100 group">
                  <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                    <span>{language === 'es' ? faq.qEs : faq.qEn}</span>
                    <span className="text-teal-500 group-open:rotate-180 transition-transform ml-2">▼</span>
                  </summary>
                  <p className="mt-2 text-slate-600 text-sm">{language === 'es' ? faq.aEs : faq.aEn}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
