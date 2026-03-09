'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getFreshBathRemodelEndpoint } from '@/lib/formConfig';
import { isValidZipCode } from '@/lib/authorizedZipCodes';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    TrustedForm?: { getCertUrl?: () => string };
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const BRAND_COLOR = '#5BA3D0';

const STEPS: { key: string; labelEn: string; labelEs: string; type: 'text' | 'email' | 'tel' | 'radio'; placeholderEn?: string; placeholderEs?: string; options?: { value: string; labelEn: string; labelEs: string }[] }[] = [
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
  { key: 'zip_code', labelEn: 'What is your ZIP code?', labelEs: '¿Cuál es tu código postal?', type: 'text', placeholderEn: 'ZIP', placeholderEs: 'Código postal' },
  { key: 'state', labelEn: 'Which state?', labelEs: '¿Estado?', type: 'text', placeholderEn: 'State', placeholderEs: 'Estado' },
  { key: 'address', labelEn: 'What is your street address?', labelEs: '¿Cuál es tu dirección?', type: 'text', placeholderEn: 'Street address', placeholderEs: 'Dirección' },
  { key: 'first_name', labelEn: 'What is your first name?', labelEs: '¿Cuál es tu nombre?', type: 'text', placeholderEn: 'First name', placeholderEs: 'Nombre' },
  { key: 'last_name', labelEn: 'And your last name?', labelEs: '¿Y tu apellido?', type: 'text', placeholderEn: 'Last name', placeholderEs: 'Apellido' },
  { key: 'email_address', labelEn: 'What is your email address?', labelEs: '¿Cuál es tu correo electrónico?', type: 'email', placeholderEn: 'you@email.com', placeholderEs: 'tu@email.com' },
  { key: 'phone_home', labelEn: 'What is your phone number?', labelEs: '¿Cuál es tu número de teléfono?', type: 'tel', placeholderEn: 'Phone', placeholderEs: 'Teléfono' },
];

const FAQS = [
  { q: 'Is the bathroom renovation quote free?', a: 'Yes. We offer free, no-obligation estimates. See what\'s possible for your space before you commit.' },
  { q: 'What bathroom renovation services do you offer?', a: 'Full bathroom remodels, tub-to-shower conversions, vanity upgrades, tile replacement, and more. Tell us your vision.' },
  { q: 'How long does a bathroom renovation take?', a: 'Most projects take 1–3 weeks depending on scope. We\'ll give you a clear timeline during your free estimate.' },
  { q: 'Do you handle permits and inspections?', a: 'Yes. We manage permits and coordinate inspections when required by your local codes.' },
  { q: 'Am I obligated if I submit this form?', a: 'No. This form only requests a free estimate. You decide next steps after we send your quote.' },
];

export default function FreshBathRemodelPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({
    first_name: '', last_name: '', email_address: '', phone_home: '',
    address: '', state: '', zip_code: '', repair_or_replace: '',
  });
  const [zipCodeError, setZipCodeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const tfRef = useRef<HTMLInputElement>(null);
  const [tfToken, setTfToken] = useState('');
  const hasSubmitted = useRef(false);

  useEffect(() => {
    setForm((p) => ({ ...p, landing_page: typeof window !== 'undefined' ? window.location.href : '' }));
  }, []);

  useEffect(() => {
    if (!tfRef.current) return;
    const apply = () => {
      try {
        const val = (typeof window !== 'undefined' && window.TrustedForm?.getCertUrl?.()) || '';
        if (val && tfRef.current) { tfRef.current.value = val; setTfToken(val); }
      } catch {}
    };
    apply();
    const id = setInterval(apply, 300);
    return () => clearInterval(id);
  }, []);

  const validateZipCode = (z: string) => isValidZipCode(z);

  async function waitForJornayaToken(max = 2000): Promise<string> {
    const start = Date.now();
    const poll = async (): Promise<string> => {
      const inp = document.getElementById('leadid_token') as HTMLInputElement | null;
      if (inp?.value?.trim()) return inp.value.trim();
      if (Date.now() - start >= max) return '';
      await new Promise((r) => setTimeout(r, 150));
      return poll();
    };
    return poll();
  }

  async function waitForTrustedFormToken(max = 2000): Promise<string> {
    const start = Date.now();
    const poll = async (): Promise<string> => {
      const val = tfRef.current?.value?.trim() || (typeof window !== 'undefined' && window.TrustedForm?.getCertUrl?.()) || '';
      if (val) return val;
      if (Date.now() - start >= max) return '';
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
      setZipCodeError('Out of coverage area');
      return;
    }
    setZipCodeError('');
    if (!value || (typeof value === 'string' && !value.trim())) {
      alert('Please complete this field.');
      return;
    }
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (hasSubmitted.current || isSubmitting) return;
    if (!validateZipCode(form.zip_code)) {
      setZipCodeError('Out of coverage area');
      return;
    }
    hasSubmitted.current = true;
    setIsSubmitting(true);
    await waitForTrustedFormToken(2000);
    await waitForJornayaToken(2000);
    const tcpaText = 'By clicking Submit, You agree to give express consent to receive marketing communications regarding Home Improvement services by automatic dialing system and pre-recorded calls and artificial voice messages from Home Services Partners at the phone number and E-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do not Call Registry. SMS/MMS and data messaging rates may apply. You understand that my consent here is not a condition for buying any goods or services. You agree to the Privacy Policy and Terms & Conditions.';
    const payload = {
      lp_campaign_id: 'Provided', lp_campaign_key: 'Provided', lp_s1: 'Provided', lp_s2: 'freshbathrenovations',
      lp_response: 'JSON', city: '', state: form.state, zip_code: form.zip_code, first_name: form.first_name,
      last_name: form.last_name, address: form.address, phone_home: form.phone_home, email_address: form.email_address,
      repair_or_replace: form.repair_or_replace, tcpaText, 'consent-language': true,
      trusted_form_cert_id: tfRef.current?.value || tfToken || '',
      jornaya_lead_id: (document.getElementById('leadid_token') as HTMLInputElement)?.value || '',
      landing_page: form.landing_page || (typeof window !== 'undefined' ? window.location.href : ''),
      bathroomStyle: '', urgency: '', ownership: 'yes', timestamp: new Date().toISOString(),
      source: 'Fresh Bath Renovations', language: 'en', website: 'toptierbathpros.com',
    };
    try {
      const res = await fetch(getFreshBathRemodelEndpoint(), {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (res.ok && typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'lead_submit', form_id: 'fresh_bath_remodel',
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

  const label = currentStep?.labelEn ?? '';
  const placeholder = currentStep?.placeholderEn ?? '';

  return (
    <>
      <Script
        id="meta-pixel-freshbath"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1149265126710788'); fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1149265126710788&ev=PageView&noscript=1" alt="" />
      </noscript>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/freshbathremodel" className="flex items-center gap-3">
              <Image src="/freshbath/logo.png" alt="Fresh Bath Renovations" width={56} height={56} className="object-contain" />
              <div>
                <p className="text-lg font-bold text-slate-900 leading-tight">FRESH BATH</p>
                <p className="text-sm font-bold uppercase tracking-wide" style={{ color: BRAND_COLOR }}>RENOVATIONS</p>
              </div>
            </Link>
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">← Back to Main</Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-10 md:py-14">
          {/* Hero */}
          <section className="text-center mb-10 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Bathroom Renovation <span style={{ color: BRAND_COLOR }}>Quote</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Get a free, no-obligation estimate for your bathroom renovation. Tell us your project in a few simple steps.
            </p>
          </section>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: BRAND_COLOR }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 mb-8">
            <input ref={tfRef} type="hidden" id="xxTrustedFormCertUrl" name="xxTrustedFormCertUrl" />
            <input id="leadid_token" type="hidden" name="universal_leadid" />

            <AnimatePresence mode="wait">
              {!submitted && currentStep && (
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }} className="min-h-[120px]">
                  <label className="block text-lg font-semibold text-slate-800 mb-4">{label}</label>
                  {currentStep.type === 'radio' && currentStep.options ? (
                    <div className="space-y-3">
                      {currentStep.options.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-[#5BA3D0] hover:bg-sky-50/50 cursor-pointer transition" style={{ borderColor: value === opt.value ? BRAND_COLOR : undefined, backgroundColor: value === opt.value ? `${BRAND_COLOR}10` : undefined }}>
                          <input type="radio" name={currentStep.key} value={opt.value} checked={value === opt.value} onChange={(e) => setForm((f) => ({ ...f, [currentStep.key]: e.target.value }))} className="text-[#5BA3D0] focus:ring-[#5BA3D0]" />
                          <span className="text-slate-700">{opt.labelEn}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={currentStep.type}
                      value={value}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, [currentStep.key]: e.target.value }));
                        if (currentStep.key === 'zip_code') setZipCodeError(e.target.value.trim() && !validateZipCode(e.target.value.trim()) ? 'Out of coverage area' : '');
                      }}
                      placeholder={placeholder}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#5BA3D0] focus:border-[#5BA3D0]"
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
                  <button type="button" onClick={() => setStep((s) => s - 1)} className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50">Back</button>
                )}
                <button
                  type="button"
                  onClick={isLastStep ? handleSubmit : handleNext}
                  disabled={isSubmitting}
                  className="flex-1 text-white font-semibold py-2.5 px-5 rounded-xl transition disabled:opacity-60"
                  style={{ backgroundColor: BRAND_COLOR }}
                >
                  {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit' : 'Next'}
                </button>
              </div>
            )}
          </div>

          {/* TCPA */}
          <label className="bg-slate-50 p-4 rounded-xl border border-slate-200 block mb-10" data-tf-element-role="consent-language">
            <span className="text-xs leading-relaxed text-slate-700">
              By clicking Submit, You agree to give express consent to receive marketing communications regarding Home Improvement services by automatic dialing system and pre-recorded calls and artificial voice messages from <Link href="/partners" className="underline font-medium" style={{ color: BRAND_COLOR }}>Home Services Partners</Link> at the phone number and E-mail address provided by you, including wireless numbers, if applicable, even if you have previously registered the provided number on the Do not Call Registry. SMS/MMS and data messaging rates may apply. You understand that my consent here is not a condition for buying any goods or services. You agree to the <Link href="/privacy-policy" className="underline" target="_blank" rel="noreferrer">Privacy Policy</Link> and <Link href="/terms" className="underline" target="_blank" rel="noreferrer">Terms &amp; Conditions</Link>.
            </span>
          </label>

          {/* FAQ */}
          <section className="border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <details key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm group">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-slate-800">
                    {faq.q}
                    <span className="ml-2 transition-transform group-open:rotate-180" style={{ color: BRAND_COLOR }}>▼</span>
                  </summary>
                  <p className="mt-2 text-slate-600 text-sm">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-12 py-6 text-center text-sm text-slate-500 border-t border-slate-200">
            <p>© Fresh Bath Renovations. Bathroom remodeling &amp; renovation services.</p>
            <p className="mt-1">
              <Link href="/" className="underline hover:text-slate-700">TopTier Bath Pros</Link> · <Link href="/privacy-policy" className="underline hover:text-slate-700">Privacy</Link> · <Link href="/terms" className="underline hover:text-slate-700">Terms</Link>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
