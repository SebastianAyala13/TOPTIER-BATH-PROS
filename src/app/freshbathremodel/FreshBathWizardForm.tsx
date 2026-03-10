'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getFreshBathRemodelEndpoint } from '@/lib/formConfig';
import { isValidZipCode } from '@/lib/authorizedZipCodes';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND_COLOR = '#5BA3D0';

const STEPS: { key: string; labelEn: string; type: 'text' | 'email' | 'tel' | 'radio'; placeholderEn?: string; options?: { value: string; labelEn: string }[] }[] = [
  { key: 'repair_or_replace', labelEn: 'Do you need to repair your existing bathroom or replace/remodel it completely?', type: 'radio', options: [{ value: 'repair', labelEn: 'Repair existing bathroom' }, { value: 'replace', labelEn: 'Replace / Full remodel' }] },
  { key: 'zip_code', labelEn: 'What is your ZIP code?', type: 'text', placeholderEn: 'ZIP' },
  { key: 'state', labelEn: 'Which state?', type: 'text', placeholderEn: 'State' },
  { key: 'address', labelEn: 'What is your street address?', type: 'text', placeholderEn: 'Street address' },
  { key: 'first_name', labelEn: 'What is your first name?', type: 'text', placeholderEn: 'First name' },
  { key: 'last_name', labelEn: 'And your last name?', type: 'text', placeholderEn: 'Last name' },
  { key: 'email_address', labelEn: 'What is your email address?', type: 'email', placeholderEn: 'you@email.com' },
  { key: 'phone_home', labelEn: 'What is your phone number?', type: 'tel', placeholderEn: 'Phone' },
];

export default function FreshBathWizardForm({ compact = false }: { compact?: boolean }) {
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
        const val = (typeof window !== 'undefined' && (window as { TrustedForm?: { getCertUrl?: () => string } }).TrustedForm?.getCertUrl?.()) || '';
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
      const val = tfRef.current?.value?.trim() || (typeof window !== 'undefined' && (window as { TrustedForm?: { getCertUrl?: () => string } }).TrustedForm?.getCertUrl?.()) || '';
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
      if (res.ok && typeof window !== 'undefined' && (window as { dataLayer?: unknown[] }).dataLayer) {
        (window as { dataLayer: unknown[] }).dataLayer.push({
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
    <div className={compact ? 'space-y-3' : 'space-y-4'}>
      <input ref={tfRef} type="hidden" id="xxTrustedFormCertUrl" name="xxTrustedFormCertUrl" />
      <input id="leadid_token" type="hidden" name="universal_leadid" />

      {!compact && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-slate-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: BRAND_COLOR }} initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!submitted && currentStep && (
          <motion.div key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
            <label className={`block font-semibold text-slate-800 mb-2 ${compact ? 'text-sm' : 'text-base'}`}>{label}</label>
            {currentStep.type === 'radio' && currentStep.options ? (
              <div className="space-y-2">
                {currentStep.options.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 p-2 rounded-lg border cursor-pointer hover:bg-slate-50" style={{ borderColor: value === opt.value ? BRAND_COLOR : undefined, backgroundColor: value === opt.value ? `${BRAND_COLOR}15` : undefined }}>
                    <input type="radio" name={currentStep.key} value={opt.value} checked={value === opt.value} onChange={(e) => setForm((f) => ({ ...f, [currentStep.key]: e.target.value }))} className="text-[#5BA3D0] focus:ring-[#5BA3D0]" />
                    <span className="text-sm text-slate-700">{opt.labelEn}</span>
                  </label>
                ))}
              </div>
            ) : (
              <input
                type={currentStep.type}
                value={value}
                onChange={(e) => {
                  setForm((f) => ({ ...f, [currentStep.key]: e.target.value }));
                  if (currentStep.key === 'zip_code') setZipCodeError(e.target.value.trim() && !validateZipCode(e.target.value.trim()) ? 'Out of coverage' : '');
                }}
                placeholder={placeholder}
                className={`w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#5BA3D0] focus:border-[#5BA3D0] ${compact ? 'text-sm' : ''}`}
              />
            )}
            {currentStep.key === 'zip_code' && zipCodeError && <p className="mt-1 text-xs text-red-600">{zipCodeError}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && (
        <div className="flex gap-2 pt-2">
          {step > 0 && (
            <button type="button" onClick={() => setStep((s) => s - 1)} className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm">Back</button>
          )}
          <button
            type="button"
            onClick={isLastStep ? handleSubmit : handleNext}
            disabled={isSubmitting}
            className="flex-1 text-white font-semibold py-2 px-4 rounded-lg text-sm transition disabled:opacity-60"
            style={{ backgroundColor: BRAND_COLOR }}
          >
            {isSubmitting ? 'Submitting...' : isLastStep ? 'Submit' : 'Next'}
          </button>
        </div>
      )}

      <label className="block" data-tf-element-role="consent-language">
        <span className="text-[10px] leading-relaxed text-slate-600">
          By submitting, you agree to receive marketing from <Link href="/partners" className="underline" style={{ color: BRAND_COLOR }}>Home Services Partners</Link>. <Link href="/privacy-policy" className="underline" target="_blank" rel="noreferrer">Privacy</Link> · <Link href="/terms" className="underline" target="_blank" rel="noreferrer">Terms</Link>.
        </span>
      </label>
    </div>
  );
}
